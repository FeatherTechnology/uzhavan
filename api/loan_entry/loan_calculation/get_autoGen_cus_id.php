<?php
require "../../../ajaxconfig.php";

$response = array();
$id = $_POST['id'] ?? '';

if ($id != '0' && $id != '') {

    $qry = $pdo->query("SELECT cus_id FROM customer_profile WHERE cus_id = '$id' AND cus_id != '' AND cus_id IS NOT NULL");
    $qry_info = $qry->fetch(PDO::FETCH_ASSOC);

    $auto_cus_id = $qry_info['cus_id'];
} else {

    $qry = $pdo->query("SELECT MAX(CAST(cus_id AS UNSIGNED)) AS max_number FROM customer_profile WHERE cus_id != '' AND cus_id IS NOT NULL");

    $row = $qry->fetch(PDO::FETCH_ASSOC);

    if (!empty($row['max_number'])) {
        $auto_cus_id = $row['max_number'] + 1;
    } else {
        $auto_cus_id = 1001;
    }
}

$response['cus_id'] = $auto_cus_id;
echo json_encode($response);
