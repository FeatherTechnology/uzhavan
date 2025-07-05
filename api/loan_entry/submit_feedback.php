<?php
require '../../ajaxconfig.php';
@session_start();
$cus_id = $_POST['cus_id'];
$feedback_label = $_POST['feedback_label'];
$feedback = $_POST['feedback'];
$cus_remark = $_POST['cus_remark'];
$add_feedBack = $_POST['add_feedBack'];
$user_id = $_SESSION['user_id'];
$cus_profile_id = $_POST['cus_profile_id'];
$result = 0;
if ($add_feedBack != '') {
    $qry = $pdo->query("UPDATE `cus_feedback` SET `cus_id`='$cus_id',`cus_profile_id`='$cus_profile_id',`feedback_label`='$feedback_label',`feedback`='$feedback',`cus_remark`='$cus_remark',`update_login_id`='$user_id',updated_on = now() WHERE `id`='$add_feedBack'");

    if ($qry) {
        $result = 2; //update
    }
} else {
    $qry = $pdo->query("INSERT INTO `cus_feedback`(`cus_id`,`cus_profile_id`,`feedback_label`, `feedback`,`cus_remark`,`insert_login_id`,`created_on`) VALUES ('$cus_id','$cus_profile_id','$feedback_label','$feedback', '$cus_remark','$user_id',now())");

    if ($qry) {
        $result = 1; //Insert
    }
}

echo json_encode($result);
