<?php
require '../../../ajaxconfig.php';
@session_start();
$user_id = $_SESSION['user_id'];

$cus_prof_id= $_POST['cus_prof_id'];

$result = array();

$qry = $pdo->query("UPDATE `customer_profile` SET `payment_mode_status`='1', `payment_type`= null, `payment_mode`= null, `bank_id`= null, `issue_person`= null, `issue_relationship`= null, `update_login_id`='$user_id', `updated_on`=now() WHERE `id`='$cus_prof_id'");

if($qry){
    $result = 0;
}

$pdo=null; //Close Connection.
echo json_encode($result);
?>