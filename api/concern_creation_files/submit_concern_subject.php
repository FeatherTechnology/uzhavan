<?php
require "../../ajaxconfig.php";
@session_start();
$user_id = $_SESSION['user_id'];
$con_sub = $_POST['con_sub'];
$id = $_POST['id'];

$qry = $pdo->query("SELECT * FROM `concern_subject` WHERE REPLACE(TRIM(concern_subject), ' ', '') = REPLACE(TRIM('$con_sub'), ' ', '') ");
if ($qry->rowCount() > 0) {
    $result = 0; //already Exists.

} else {
    if ($id != '0' && $id != '') {
        $pdo->query("UPDATE `concern_subject` SET `concern_subject`='$con_sub',`update_login_id`='$user_id',`updated_on`=now() WHERE `con_sub_id`='$id' ");
        $result = 1; //update

    } else {
        $pdo->query("INSERT INTO `concern_subject`(`concern_subject`, `insert_login_id`, `created_on`) VALUES ('$con_sub','$user_id', now())");
        $result = 2; //Insert
    }
}

echo json_encode($result);
