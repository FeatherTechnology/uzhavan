<?php
require '../../ajaxconfig.php';

$cus_id = $_POST['cus_id'];
$qry = $pdo->query("SELECT * FROM `customer_register` WHERE cus_id = '$cus_id'");
if ($qry->rowCount() > 0) {
    $result = $qry->fetch(PDO::FETCH_ASSOC); // ✅ fetch only one row

    // Get guarantor name from customer_profile
    $gu_query = $pdo->query("SELECT cp.guarantor_name, cp.gu_pic 
                             FROM customer_profile cp 
                             WHERE cp.cus_id = '$cus_id' 
                             ORDER BY cp.id DESC LIMIT 1");
    if ($gu_query->rowCount() > 0) {
        $gu_data = $gu_query->fetch(PDO::FETCH_ASSOC);
        $result['guarantor_name'] = $gu_data['guarantor_name'];
        $result['gu_pic'] = $gu_data['gu_pic'];
    } else {
        $result['guarantor_name'] = '';
        $result['gu_pic'] = '';
    }
}
$pdo = null;

echo json_encode([$result]); // ✅ wrap in array for JS compatibility

