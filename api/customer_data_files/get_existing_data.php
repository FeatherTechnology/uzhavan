<?php
require '../../ajaxconfig.php';
@session_start();
$user_id = $_SESSION['user_id'];
if (isset($_POST['cus_id'])) {
    $cus_id = $_POST['cus_id'];
}
if (isset($_POST['cus_profile_id'])) {
    $cus_profile_id = $_POST['cus_profile_id'];
}
if (isset($_POST['status'])) {
    $status = $_POST['status'];
}
if (isset($_POST['label'])) {
    $label = $_POST['label'];
}
if (isset($_POST['remark'])) {
    $remark = $_POST['remark'];
}
if (isset($_POST['follow_date'])) {
    $follow_date = $_POST['follow_date'];
}
if (isset($_POST['orgin_table'])) {
    $orgin_table = $_POST['orgin_table'];
}

if ($orgin_table == 'existing') {
    $cs_sts = 1;
} else if ($orgin_table == 'repromotion') {
    $cs_sts = 2;
}else{
    $cs_sts = '';
}
if ($cs_sts != ''){
$qry1 = $pdo->query("INSERT INTO `promotion_customer`(`cus_id`, `cus_profile_id`,`status`, `label`, `remark`, `follow_date`,`c_sts`, `insert_login_id`, `created_on` ) VALUES ('$cus_id','$cus_profile_id','$status','$label','$remark','$follow_date','$cs_sts','$user_id',CURRENT_TIMESTAMP())");
}else{
$qry1 = $pdo->query("INSERT INTO `new_cus_promo`( `promo_id`,`status`, `label`, `remark`, `follow_date`, `insert_login_id`, `created_on` ) VALUES ('$cus_profile_id','$status','$label','$remark','$follow_date','$user_id',CURRENT_TIMESTAMP())");
}
if ($qry1) {
    $result = 1; // Insert successful
} else {
    $result = 2;
}

echo json_encode($result);
