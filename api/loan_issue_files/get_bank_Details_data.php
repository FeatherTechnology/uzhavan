<?php
require '../../ajaxconfig.php';

$cus_id = $_POST['cus_id'];

$qry = $pdo->query("SELECT bank_name, branch_name, acc_holder_name, acc_number, ifsc_code
FROM bank_info  WHERE cus_id = '$cus_id' AND issue_status = 2 ");

if ($qry->rowCount() > 0) {
    $result = $qry->fetchAll(PDO::FETCH_ASSOC);
}

$pdo = null; //Close connection.

echo json_encode($result);
