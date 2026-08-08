<?php
require "../../../ajaxconfig.php";
$user_id = ($_POST['user_id'] != '') ? $_POST['user_id'] : '';

$type = $_POST['type'];

if ($type == 'today') {
    $where = " DATE(coll_date) = CURRENT_DATE  ";

} else if ($type == 'day') {
    $from_date = $_POST['from_date'];
    $to_date = $_POST['to_date'];

    $where = " (DATE(coll_date) >= DATE('$from_date') && DATE(coll_date) <= DATE('$to_date'))  ";

} else if ($type == 'month') {
    $month = date('m', strtotime($_POST['month']));
    $year = date('Y', strtotime($_POST['month']));

    $where = " (MONTH(coll_date) = '$month' && YEAR(coll_date) = '$year')  ";
    
}
getDetials($pdo, $where);
function getDetials($pdo,$where)
{

    $qry = $pdo->query("SELECT lelc.interest_rate, lelc.total_amnt, SUM(coll.due_amt_track) AS due_amt_track
    FROM collection coll 
    JOIN loan_entry_loan_calculation lelc ON coll.cus_id = lelc.cus_profile_id 
    JOIN customer_status cs ON coll.cus_id = cs.cus_id 
    WHERE cs.status >= 7
    AND $where 
    GROUP BY coll.cus_id");
    $interest = 0;
    while($row = $qry->fetch()){
        $interest_calc= $row['interest_rate'] / $row['total_amnt'];
        $interest += round($row['due_amt_track'] * $interest_calc, 1);
    }

    $response['split_interest'] = round($interest);

    echo json_encode($response);
}

// Close the database connection
$connect = null;
