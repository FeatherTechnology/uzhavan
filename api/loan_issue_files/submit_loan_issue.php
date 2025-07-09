<?php
require "../../ajaxconfig.php";
@session_start();
$user_id = $_SESSION['user_id'];

$cus_id = $_POST['cus_id'];
$cus_profile_id = $_POST['cus_profile_id'];
$loan_amnt = $_POST['loan_amnt'];
$interest_rate_calc = $_POST['interest_rate_calc'];
$due_period_calc = $_POST['due_period_calc'];
$doc_charge_calc = $_POST['doc_charge_calc'];
$processing_fees_calc = $_POST['processing_fees_calc'];
$principal_amnt_calc = $_POST['principal_amnt_calc'];
$interest_amnt_calc = $_POST['interest_amnt_calc'];
$total_amnt_calc = $_POST['total_amnt_calc'];
$due_amnt_calc = $_POST['due_amnt_calc'];
$doc_charge_calculate = $_POST['doc_charge_calculate'];
$processing_fees_calculate = $_POST['processing_fees_calculate'];
$net_cash_calc = $_POST['net_cash_calc'];
$due_startdate = $_POST['due_startdate'];
$maturity_date = $_POST['maturity_date'];
$bal_net_cash = $_POST['bal_net_cash'];
$bal_amount = !empty($_POST['bal_amount']) ? $_POST['bal_amount'] : 0;
$payment_type = $_POST['payment_type'];
$payment_mode = $_POST['payment_mode'];
$bank_name = $_POST['bank_names'];
$cash = $_POST['cash'];
$issue_date = $_POST['issue_date'];
$issue_person = $_POST['issue_person'];
$issue_relationship = $_POST['issue_relationship'];


if ($payment_mode == '1') {
    $qry = $pdo->query("INSERT INTO `loan_issue`(`cus_id`, `cus_profile_id`, `loan_amnt`, `net_cash`,`net_bal_cash`,`payment_type`, `payment_mode`, `bank_name`,`cash`, `balance_amount`, `issue_date`, `issue_person`, `relationship`, `insert_login_id`, `created_on`) VALUES ('$cus_id','$cus_profile_id','$loan_amnt','$net_cash_calc','$bal_net_cash','$payment_type','$payment_mode','$bank_name','$cash','$bal_amount','$issue_date','$issue_person','$issue_relationship','$user_id',now())");
} else {
    $qry = $pdo->query("UPDATE `customer_profile` SET `payment_mode_status`='2', `payment_type`='$payment_type', `payment_mode`='$payment_mode', `bank_id`='$bank_name', `issue_person`='$issue_person', `issue_relationship`='$issue_relationship', `update_login_id`='$user_id', `updated_on`=now() WHERE `id`='$cus_profile_id' "); 
}

$qry = $pdo->query("UPDATE `loan_entry_loan_calculation` SET `interest_rate`='$interest_rate_calc', `due_period`='$due_period_calc', `doc_charge`='$doc_charge_calc', `processing_fees`='$processing_fees_calc', `principal_amnt`='$principal_amnt_calc', `interest_amnt`='$interest_amnt_calc', `total_amnt`='$total_amnt_calc', `due_amnt`='$due_amnt_calc', `doc_charge_calculate`='$doc_charge_calculate', `processing_fees_calculate`='$processing_fees_calculate', `net_cash`='$net_cash_calc', `due_startdate`='$due_startdate',`maturity_date`='$maturity_date',`update_login_id`='$user_id',`updated_on`=now() WHERE `cus_profile_id`='$cus_profile_id' ");

if ($payment_type == "1" && $payment_mode == '1') {
    // Check if balance_amount is zero
    if ($bal_amount == 0) {
        $qry = $pdo->query("UPDATE `customer_status` SET `status`='7',`coll_status`='Current',`update_login_id`='$user_id',`updated_on`=now() WHERE `cus_profile_id`='$cus_profile_id' "); //Loan Issued.
    }
} else if ($payment_type == "2" && $payment_mode == '1') {
    $qry = $pdo->query("UPDATE `customer_status` SET `status`='7',`coll_status`='Current',`update_login_id`='$user_id',`updated_on`=now() WHERE `cus_profile_id`='$cus_profile_id' "); //Loan Issued.
}

if ($qry) {
    $result = 1;
} else {
    $result = 0;
}

echo json_encode($result);
$pdo = null; //Close Connection
