<?php
require '../../ajaxconfig.php';

$cus_id = $_POST['cus_id'];
$doc_name              = $_POST['doc_name'];
$sign_type             = $_POST['sign_type'];
$signType_relationship = $_POST['signType_relationship'];
$doc_Count             = $_POST['doc_Count'];
$cus_profile_id        = $_POST['cus_profile_id'];
$signedID              = $_POST['signedID'];

if ($sign_type == '1') {
    $qry = $pdo->query("SELECT fam.id from family_info fam JOIN customer_profile cp on cp.guarantor_name = fam.id where cp.id = '$cus_profile_id'");
    $signType_relationship = $qry->fetch()['id'];
}
$result = 0;
if ($signedID == '') {

    $insertqry = $pdo->query("INSERT INTO `signed_doc_info`(`cus_id`,`doc_name`, `sign_type`, `signType_relationship`, `doc_Count`, `cus_profile_id`) VALUES ('$cus_id','$doc_name','$sign_type','$signType_relationship','$doc_Count','$cus_profile_id')");
    if ($insertqry) {
        $result = 1;
    }
} else {
    $update = $pdo->query("UPDATE `signed_doc_info` SET `cus_id`='$cus_id',`doc_name`='$doc_name',`sign_type`='$sign_type',`signType_relationship`='$signType_relationship',`doc_Count`='$doc_Count' WHERE `id`='$signedID' ");
    if ($update) {
        $result = 2;
    }
}
echo json_encode($result);

// Close the database connection
$pdo = null;
