<?php
require '../../ajaxconfig.php';

$aadhar_num = $_POST['aadhar_num'];
$result = array();

$qry = $pdo->query("SELECT * FROM `customer_register` WHERE aadhar_num ='$aadhar_num' ORDER BY id DESC LIMIT 1");
if ($qry->rowCount() > 0) {
    $result = $qry->fetch(PDO::FETCH_ASSOC); // use fetch (not fetchAll) for single record

    $cus_id = $result['cus_id'];

    // Get guarentor name from customer_profile
    $gu_query = $pdo->query("SELECT cp.guarantor_name,cp.gu_pic FROM customer_profile cp WHERE cp.cus_id = '$cus_id' ORDER BY cp.id DESC LIMIT 1");
    if ($gu_query->rowCount() > 0) {
        $gu_data = $gu_query->fetch(PDO::FETCH_ASSOC);
        $result['guarantor_name'] = $gu_data['guarantor_name'];
        $result['gu_pic'] = $gu_data['gu_pic'];
    } else {
        $result['guarantor_name'] = '';
    }
} else {
    $result = 'New';
}

$pdo = null;

echo json_encode($result);
