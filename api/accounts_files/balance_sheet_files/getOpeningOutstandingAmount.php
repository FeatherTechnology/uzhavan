<?php
require "../../../ajaxconfig.php";

$user_id = ($_POST['user_id'] != '') ? $_POST['user_id'] : '';

$type = $_POST['type'];

if ($type == 'today') {
    $to_date = date('Y-m-d', strtotime('-1 day'));

} else if ($type == 'day') {
    $to_date = date('Y-m-d', strtotime($_POST['from_date'].'-1 day'));

} else if ($type == 'month') {
    $month = date('m', strtotime($_POST['month']));
    if ($month == 01) {
        $month = 12;
    }
    if ($month == 12) {
        $year = date('Y', strtotime($_POST['month'])) - 1;
    } else {
        $year = date('Y', strtotime($_POST['month']));
    }
    
    $to_date = date('Y-m-t', strtotime($_POST['month'].'-01 -1 month'));

}

getDetials($pdo, $to_date);


function getDetials($pdo,  $to_date)
{
    $qry =  $pdo->query("SELECT  lelc.total_amnt, c.due_amt_track, lelc.principal_amnt, c.princ_amt_track
                            FROM  loan_entry_loan_calculation lelc 
                            LEFT JOIN customer_status cs on cs.cus_profile_id = lelc.cus_profile_id
                            LEFT JOIN loan_issue li on li.cus_profile_id = lelc.cus_profile_id
                            LEFT JOIN ( SELECT c.cus_profile_id, SUM(c.due_amt_track) AS due_amt_track, SUM(c.princ_amt_track) AS princ_amt_track FROM collection c WHERE (date(coll_date) <= '$to_date') GROUP BY c.cus_profile_id ) c ON c.cus_profile_id = lelc.cus_profile_id 
                            
                            WHERE cs.status =7 OR (cs.status > 7 &&  date(cs.closed_date) > date('$to_date') && date(li.issue_date) <=date('$to_date') )");

    $balance_amount = 0;
    while($row = $qry->fetch()){
            $balance_amount += intVal($row['total_amnt']) - intVal($row['due_amt_track']);  

    };

    $response['opening_outstanding'] = $balance_amount;

    echo json_encode($response);
}

// Close the database connection
$connect = null;
