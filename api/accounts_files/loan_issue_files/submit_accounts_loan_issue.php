<?php
require '../../../ajaxconfig.php';
@session_start();
$user_id = $_SESSION['user_id'];

$cus_id = $_POST['cus_id'];
$cus_profile_id = $_POST['cus_profile_id'];
$loan_amnt = $_POST['loan_amnt'];
$net_cash_calc = $_POST['net_cash_calc'];
$due_amnt_calc = $_POST['due_amnt_calc'];
$total_amnt_calc = $_POST['total_amnt_calc'];
$bal_net_cash = $_POST['bal_net_cash'];
$payment_type = $_POST['payment_type'];
$payment_mode = $_POST['payment_mode'];
$bank_name = $_POST['bank_names'];
$due_startdate = $_POST['due_startdate'];
$chequeno = $_POST['chequeno'];
$chequeValue = $_POST['chequeValue'];
$chequeRemark = $_POST['chequeRemark'];
$transaction_id = $_POST['transaction_id'];
$transaction_value = $_POST['transaction_value'];
$transaction_remark = $_POST['transaction_remark'];
$bal_amount = !empty($_POST['bal_amount']) ? $_POST['bal_amount'] : 0;
$issue_date = $_POST['issue_date'];
$issue_person = $_POST['issue_person'];
$issue_relationship = $_POST['issue_relationship'];
$current_date = date('Y-m-d');
$qry = $pdo->query("INSERT INTO `loan_issue`(`cus_id`, `cus_profile_id`, `loan_amnt`, `net_cash`,`net_bal_cash`,`payment_type`, `payment_mode`, `bank_name`, `cheque_val`,`transaction_val`, `cheque_no`, `cheque_remark`, `tran_remark`, `transaction_id`, `balance_amount`, `issue_date`, `issue_person`, `relationship`, `insert_login_id`, `created_on`) VALUES ('$cus_id','$cus_profile_id','$loan_amnt','$net_cash_calc','$bal_net_cash','$payment_type','$payment_mode','$bank_name', '$chequeValue','$transaction_value', '$chequeno', '$chequeRemark', '$transaction_remark', '$transaction_id', '$bal_amount', '$issue_date','$issue_person','$issue_relationship','$user_id',now())");

if ((strtotime($due_startdate) > strtotime($current_date))) {
    $cus_payable = '0';
} else {
    $cus_payable = $due_amnt_calc;
}
if ($payment_type == "1") {
    if ($bal_amount == 0) {
        $qry = $pdo->query("UPDATE `customer_status` SET `status`='7', `coll_status`='Current',`payable_amnt`='$cus_payable',`bal_amnt`='$total_amnt_calc', `update_login_id`='$user_id', `updated_on`=NOW() WHERE `cus_profile_id`='$cus_profile_id'");
    }
} elseif ($payment_type == "2") {
    $qry = $pdo->query("UPDATE `customer_status` SET `status`='7', `coll_status`='Current',`payable_amnt`='$cus_payable',`bal_amnt`='$total_amnt_calc', `update_login_id`='$user_id', `updated_on`=NOW() WHERE `cus_profile_id`='$cus_profile_id'");
}

if ($qry) {
    $result = 1;
} else {
    $result = 0;
}

echo json_encode($result);
$pdo = null; //Close Connection
