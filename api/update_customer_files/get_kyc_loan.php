<?php
require '../../ajaxconfig.php';

$response =array();
$cus_id = $_POST['cus_id'];
$qry = $pdo->query("SELECT lelc.cus_profile_id, lelc.loan_id ,cp.guarantor_name,cp.gu_pic FROM  loan_entry_loan_calculation lelc LEFT JOIN Customer_status cs ON lelc.id = cs.loan_calculation_id JOIN customer_profile cp ON lelc.cus_profile_id = cp.id WHERE cs.cus_id = '$cus_id' AND cs.status = 
7 ");
if ($qry->rowCount() > 0) {
    $response = $qry->fetchAll(PDO::FETCH_ASSOC);
}
$pdo = null; //Close Connection

echo json_encode($response);