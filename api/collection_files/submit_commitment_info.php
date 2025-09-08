<?php
require '../../ajaxconfig.php';
@session_start();
$user_id = $_SESSION['user_id'];

$cp_id = $_POST['cp_id'];
$cus_id = $_POST['cus_id'];
$follow_up_date = !empty($_POST['follow_up_date']) ? DateTime::createFromFormat('d-m-Y', $_POST['follow_up_date'])->format('Y-m-d') : null;
$follow_type = $_POST['follow_type'];
$follow_status = $_POST['follow_status'];
$follow_person_name = $_POST['follow_person_name'];
$person_name = '';

if ($follow_person_name == 3) {
    $person_name = $_POST['person_name1']; // Family Member
} elseif ($follow_person_name == 1 || $follow_person_name == 2) {
    $person_name = $_POST['person_name']; // Customer or Guarantor
}

$relationship = $_POST['relationship'];
$commitment_date = !empty($_POST['commitment_date']) ? $_POST['commitment_date'] : '0000-00-00';
$remark = $_POST['remark'];
$user_type = $_POST['user_type'];
$user_name = $_POST['user_name'];
$hint = $_POST['hint'];
$comm_err = isset($_POST['comm_err']) ? $_POST['comm_err'] : '';
$response = 0;

$qry = $pdo->query("INSERT INTO `commitment`(`cus_profile_id`, `cus_id`, `follow_up_date`, `follow_type`, `follow_status`, `follow_person_name`, `person_name`, `relationship`, `commitment_date`, `remark`, `hint`,`comm_err`, `user_type`, `user_name`, `insert_login_id`, `created_date`) VALUES ('$cp_id', '$cus_id', '$follow_up_date', '$follow_type', '$follow_status', '$follow_person_name', '$person_name','$relationship', '$commitment_date', '$remark', '$hint', '$comm_err','$user_type', '$user_name', '$user_id',now())");

if ($qry) {
    $response = 1;
}

$pdo = null; //Connection Close.
echo json_encode($response);
