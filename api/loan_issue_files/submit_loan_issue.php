<?php
require "../../ajaxconfig.php";
@session_start();
$user_id = $_SESSION['user_id'];

$cus_id = $_POST['cus_id'];
$cus_profile_id = $_POST['cus_profile_id'];
$loan_amnt = $_POST['loan_amnt'];
$due_startdate = $_POST['due_startdate'];
$maturity_date = $_POST['maturity_date'];
$net_cash = $_POST['net_cash'];
$payment_mode = $_POST['payment_mode'];
$transaction_id = $_POST['transaction_id'];
$chequeno = $_POST['chequeno'];
$issue_amount = $_POST['issue_amount'];
$issue_date = $_POST['issue_date'];
$issue_person = $_POST['issue_person'];
$issue_relationship = $_POST['issue_relationship'];

$qry = $pdo->query("INSERT INTO `loan_issue`(`cus_id`, `cus_profile_id`, `loan_amnt`, `net_cash`, `payment_mode`, `issue_amnt`, `transaction_id`, `cheque_no`, `issue_date`, `issue_person`, `relationship`, `insert_login_id`, `created_on`) VALUES ('$cus_id','$cus_profile_id','$loan_amnt','$net_cash','$payment_mode','$issue_amount','$transaction_id','$chequeno','$issue_date','$issue_person','$issue_relationship','$user_id',now())");

$qry2 = $pdo->query("UPDATE `loan_entry_loan_calculation` SET `due_startdate`='$due_startdate',`maturity_date`='$maturity_date',`update_login_id`='$user_id',`updated_on`=now() WHERE `cus_profile_id`='$cus_profile_id' ");

$qry3 = $pdo->query("UPDATE `customer_status` SET `status`='7',`update_login_id`='$user_id',`updated_on`=now() WHERE `cus_profile_id`='$cus_profile_id' "); //Loan Issued.

// $qry = $pdo->query("SELECT cus_name, mobile1 FROM `customer_profile` WHERE `id` = '$cus_profile_id' ");
// $row = $qry->fetch_assoc();
// $customer_name = $row['cus_name'];
// $cus_mobile1 = $row['mobile1'];

// $message = "";
// $templateid	= ''; //FROM DLT PORTAL.
// // Account details
// $apiKey = '';
// // Message details
// $sender = '';
// // Prepare data for POST request
// $data = 'access_token='.$apiKey.'&to='.$cus_mobile1.'&message='.$message.'&service=T&sender='.$sender.'&template_id='.$templateid;
// // Send the GET request with cURL
// $url = 'https://sms.messagewall.in/api/v2/sms/send?'.$data; 
// $response = file_get_contents($url);  
// // Process your response here
// return $response; 

if ($qry && $qry2 && $qry3) {
    $result = 1;
} else {
    $result = 0;
}

echo json_encode($result);
