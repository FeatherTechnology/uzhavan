<?php
require "../../../ajaxconfig.php";
$response = array();
$id = $_POST['id'];
if ($id != '0' && $id != '') {
    $qry = $pdo->query("SELECT cus_id  FROM customer_profile WHERE cus_id = '$id'");
    $qry_info = $qry->fetch();
    $auto_cus_id = $qry_info['cus_id'];
} else {
    $qry = $pdo->query("SELECT MAX(cus_id) as cus_id FROM customer_profile");
    $row = $qry->fetch(PDO::FETCH_ASSOC);
    if ($row["cus_id"] !='') {
        // If  codes exist, generate a new branch code
        $ac2 = $row["cus_id"];
        $appno2 = ($ac2);
        $appno2 = $appno2 + 1;
        $auto_cus_id = $appno2;
    } else {
        // If no branch codes exist, set an initial one
        $initialapp = "1001";
        $auto_cus_id = $initialapp;
    }
}
$response['cus_id'] = $auto_cus_id;
echo json_encode($response);
?>






