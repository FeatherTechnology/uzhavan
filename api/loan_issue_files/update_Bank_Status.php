<?php 
require '../../ajaxconfig.php';

$id = $_POST['id'];
$issue_status = $_POST['issue_status'];
$cusid = $_POST['cusid'];

$select = $pdo->query("UPDATE bank_info SET  issue_status = '1' where cus_id = '$cusid' AND id !='$id' "); //to remove previous bank info issue status.
$select = $pdo->query("UPDATE bank_info SET  issue_status = '$issue_status' where id ='$id' ");

if ($select) {
	$message = "Bank Selected Successfully";
}

echo json_encode($message);

// Close the database connection
$pdo = null;

