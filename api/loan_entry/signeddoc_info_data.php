<?php
require '../../ajaxconfig.php';

$id = $_POST['id'];
$signedDoc = array();

$signedDocInfo = $pdo->query("SELECT * FROM signed_doc_info WHERE id = '$id'");
$sign_details = $signedDocInfo->fetch();

$signedDoc['id'] = $sign_details['id'];
$signedDoc['doc_name'] = $sign_details['doc_name'];
$signedDoc['sign_type'] = $sign_details['sign_type'];
$signedDoc['signType_relationship'] = $sign_details['signType_relationship'];
$signedDoc['doc_Count'] = $sign_details['doc_Count'];
$signedDoc['guar_name'] = '';
$signedDoc['signType_cus_name'] = '';

if ($signedDoc['sign_type'] == '0') {
    // Get customer name
    $qry = $pdo->query("SELECT cus_name FROM customer_profile WHERE cus_id = '{$sign_details['cus_id']}'");
    if ($qry->rowCount() > 0) {
        $signedDoc['signType_cus_name'] = $qry->fetch()['cus_name'];
    }
}

if ($signedDoc['sign_type'] == '1') {
    $qry = $pdo->query("SELECT fam_name, fam_relationship FROM family_info WHERE id = '{$signedDoc['signType_relationship']}'");
    if ($qry->rowCount() > 0) {
        $row = $qry->fetch();
        $signedDoc['guar_name'] = $row['fam_name'];
    }
}

if ($signedDoc['sign_type'] == '2' || $signedDoc['sign_type'] == '3') {
    $selected_id = $signedDoc['signType_relationship'];

    $qry = $pdo->query("SELECT fam_name, fam_relationship, id FROM family_info WHERE cus_id = '{$sign_details['cus_id']}'");
    $holder_name = [];

    while ($row = $qry->fetch()) {
        $holder_name[] = array(
            "name" => $row['fam_name'],
            "relationship" => $row['fam_relationship'],
            "id" => $row['id']
        );
    }

    $signedDoc['holder_name'] = $holder_name;
    $signedDoc['selected_relationship'] = $selected_id; // ✅ ADD THIS LINE
}
// Fetch uploaded file names
$updresult = [];
$qry2 = $pdo->query("SELECT uploads FROM `signed_upload` WHERE signed_info_id ='$id'");
if ($qry2->rowCount() > 0) {
    $updresult = $qry2->fetchAll(PDO::FETCH_ASSOC);
}

$pdo = null;

// Return both signedDoc and uploads as a single JSON object
echo json_encode([
    'signedDoc' => $signedDoc,
    'upd' => $updresult
]);

