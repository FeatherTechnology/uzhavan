<?php
require '../../ajaxconfig.php';

$userid = $_POST['userid'];
$cp_id = $_POST['cp_id'];
$sub_sts = $_POST['follow_cus_sts'];
$bal_amt = $_POST['bal_amt'];
$payable_amnts = $_POST['payable'];
$curdate = date('Y-m-d');

$qry = $pdo->query("SELECT  lc.due_startdate, lc.scheme_due_method
        FROM loan_entry_loan_calculation lc JOIN customer_status cs ON lc.cus_profile_id = cs.cus_profile_id
        WHERE lc.cus_profile_id='$cp_id' ");
$row = $qry->fetch();
// If Due start from date is greater than curdate means payable is "0". For example curdate is "11-03-2025" and the due start date is "01-04-2025" the payable is 0 till april.
if ($row['scheme_due_method'] == '2') { // Weekly
    // Use 'o-W' for year + ISO week number (e.g., 2025-14)
    $due_start = date('o-W', strtotime($row['due_startdate']));
    $cur_week = date('o-W', strtotime($curdate));
    
    if ($due_start > $cur_week) {
        $payable_amnts = '0';
    }

} else if ($row['scheme_due_method'] == '3') { // Daily
    $due_start = date('Y-m-d', strtotime($row['due_startdate']));
    $cur_day = date('Y-m-d', strtotime($curdate));

    if ($due_start > $cur_day) {
        $payable_amnts = '0';
    }

} else { // Monthly (default)
    $due_start = date('Y-m', strtotime($row['due_startdate']));
    $cur_month = date('Y-m', strtotime($curdate));

    if ($due_start > $cur_month) {
        $payable_amnts = '0';
    }
}
// last paid Date
$lpdqry = $pdo->query("SELECT
        CASE 
            WHEN DAYOFMONTH(MAX(coll_date)) BETWEEN 1 AND 10 THEN '1' 
            WHEN DAYOFMONTH(MAX(coll_date)) BETWEEN 11 AND 15 THEN '2' 
            WHEN DAYOFMONTH(MAX(coll_date)) BETWEEN 16 AND 20 THEN '3' 
            WHEN DAYOFMONTH(MAX(coll_date)) BETWEEN 21 AND 25 THEN '4' 
            WHEN DAYOFMONTH(MAX(coll_date)) BETWEEN 26 AND 31 THEN '5' 
            ELSE '0' 
        END AS date_range
    FROM collection 
    WHERE `cus_profile_id`='$cp_id' ");

$lpd = $lpdqry->fetch()['date_range'];
// Current Month Paid or Not
$cmpqry = $pdo->query("SELECT COALESCE(SUM(due_amt_track), 0) AS total_due_paid FROM collection WHERE YEAR(coll_date) = YEAR(CURDATE()) AND MONTH(coll_date) = MONTH(CURDATE()) AND `cus_profile_id`='$cp_id' ");
$cmp = $cmpqry->fetch()['total_due_paid'];
$paid_status = ($cmp > 0) ? '1' : '2'; //1  => YES, 2 => NO.

$query = $pdo->query("UPDATE `customer_status` SET `coll_status`='$sub_sts',`payable_amnt` = '$payable_amnts', `bal_amnt`='$bal_amt',`last_paid_date`= '$lpd', `current_month_paid`='$paid_status', `insert_login_id`='$userid', `created_on`=NOW() WHERE `cus_profile_id`='$cp_id' ");

echo json_encode($query ? 1 : 2);
