<?php
require '../../ajaxconfig.php';

$cus_id = $_POST['cus_id'];
$result = array();
$qry = $pdo->query("SELECT * FROM `customer_profile` WHERE cus_id='$cus_id' ORDER BY id DESC LIMIT 1");
if ($qry->rowCount() > 0) {
    $result = $qry->fetchAll(PDO::FETCH_ASSOC);
}else{
    $result = 'New';
}
$pdo = null; //Close connection.

echo json_encode($result);