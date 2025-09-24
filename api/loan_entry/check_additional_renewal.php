<?php
require '../../ajaxconfig.php';

$cus_id = $_POST['cus_id'];

$result = '';
$qry = $pdo->query("SELECT * FROM `customer_status` WHERE cus_id = '$cus_id' AND status IN (7, 8,15,16) ");
if ($qry->rowCount() >0) {
    $result = "Additional"; //Additional
}else{
    $qry = $pdo->query("SELECT * FROM `customer_status` WHERE cus_id = '$cus_id' AND status >= 9 AND status IN (13,14)");
    if($qry->rowCount()>0){
        $result = "Renewal";
    }
}
$pdo = null; //Close connection.

echo json_encode($result);