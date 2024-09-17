<?php
require '../../ajaxconfig.php';
@session_start();
$cus_id = $_POST['cus_id']; 
$cus_profile_id= $_POST['cus_profile_id'];
$feed_label = $_POST['feed_label'];
$feedback=$_POST['feedback'];
$remark=$_POST['remark'];
$user_id = $_SESSION['user_id'];
$feedback_id = $_POST['feedback_id'];

if($feedback_id !=''){
    $qry = $pdo->query("UPDATE `feedback_info` SET `cus_id`='$cus_id',`cus_profile_id`='$cus_profile_id',`feed_label`='$feed_label',`feedback`='$feedback',`remark`='$remark',`update_login_id`='$user_id',updated_on = now() WHERE `id`='$feedback_id'");
    $result = 0; //update

}else{
    $qry = $pdo->query("INSERT INTO `feedback_info`(`cus_id`,`cus_profile_id`,`feed_label`, `feedback`,`remark`,`insert_login_id`,`created_on`) VALUES ('$cus_id','$cus_profile_id','$feed_label','$feedback', '$remark','$user_id',now())");
    $result = 1; //Insert
}

echo json_encode($result);
?>