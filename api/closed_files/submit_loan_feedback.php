<?php
require '../../ajaxconfig.php';
@session_start();
$cus_id = $_POST['cus_id'];
$feedback_label = $_POST['feedback_label'];
$feedback_remark = $_POST['feedback_remark'];
$cus_feedback = $_POST['cus_feedback'];
$feedbackID = $_POST['feedbackID'];
$user_id = $_SESSION['user_id'];
$cus_profile_id = $_POST['cus_profile_id'];
$result = 0;
if ($feedbackID != '') {
    $qry = $pdo->query("UPDATE `loan_summary_feedback` SET `cus_id`='$cus_id',`cus_profile_id`='$cus_profile_id',`feedback_label`='$feedback_label',`feedback_remark`='$feedback_remark',`cus_feedback`='$cus_feedback',`update_login_id`='$user_id',updated_on = now() WHERE `id`='$feedbackID'");

    if ($qry) {
        $result = 2; //update
    }
} else {
    $qry = $pdo->query("INSERT INTO `loan_summary_feedback`(`cus_id`,`cus_profile_id`,`feedback_label`, `feedback_remark`,`cus_feedback`,`insert_login_id`,`created_on`) VALUES ('$cus_id','$cus_profile_id','$feedback_label','$feedback_remark', '$cus_feedback','$user_id',now())");

    if ($qry) {
        $result = 1; //Insert
    }
}

echo json_encode($result);
