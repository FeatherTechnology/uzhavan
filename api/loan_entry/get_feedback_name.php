<?php
require "../../ajaxconfig.php";
$result = array();


$id = $_POST['id'];

$qry = $pdo->query("SELECT * FROM `cus_feedback_name` WHERE id = '$id'");
if ($qry->rowCount() > 0) {
    $result = $qry->fetchAll(PDO::FETCH_ASSOC);
}
$pdo = null;
echo json_encode($result);
