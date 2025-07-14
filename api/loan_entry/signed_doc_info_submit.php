<?php
require '../../ajaxconfig.php';

$cus_id = $_POST['cus_id'];
$doc_name              = $_POST['doc_name'];
$sign_type             = $_POST['sign_type'];
$signType_relationship = $_POST['signType_relationship'];
$doc_Count             = $_POST['doc_Count'];
$cus_profile_id        = $_POST['cus_profile_id'];
$signedID              = $_POST['signedID'];
$sign_upload_edit = $_POST['sign_upload_edit'];

if ($sign_type == '1') {
    $qry = $pdo->query("SELECT fam.id from family_info fam JOIN customer_profile cp on cp.guarantor_name = fam.id where cp.id = '$cus_profile_id'");
    $signType_relationship = $qry->fetch()['id'];
}
$result = 0;
if ($signedID == '') {
    $insertqry = $pdo->query("INSERT INTO `signed_doc_info`(`cus_id`,`doc_name`, `sign_type`, `signType_relationship`, `doc_Count`, `cus_profile_id`) VALUES ('$cus_id','$doc_name','$sign_type','$signType_relationship','$doc_Count','$cus_profile_id')");
    if ($insertqry) {
        $result = 1;
        $last_id = $pdo->lastInsertId();
    }
} else {
    $pdo->query("DELETE FROM `signed_upload` WHERE signed_info_id = '$signedID'");
    if (isset($_POST['sign_upload_edit']) && !empty($_POST['sign_upload_edit'])) {
        $existingUploads = explode(',', $_POST['sign_upload_edit']);
        foreach ($existingUploads as $file) {
            $file = trim($file);
            if ($file !== '') {
                $pdo->query("INSERT INTO `signed_upload`(`cus_id`, `cus_profile_id`, `signed_info_id`, `uploads`) VALUES ('$cus_id','$cus_profile_id','$signedID','$file')");
            }
        }
    }

    $update = $pdo->query("UPDATE `signed_doc_info` SET `cus_id`='$cus_id',`doc_name`='$doc_name',`sign_type`='$sign_type',`signType_relationship`='$signType_relationship',`doc_Count`='$doc_Count' WHERE `id`='$signedID' ");
    if ($update) {
        $result = 2;
    }
    $last_id = $signedID;
}
if (!empty($_FILES['sign_upload']['name'])) {
    $filesArray = $_FILES['sign_upload']; //files passed as array

    foreach ($filesArray['name'] as $key => $val) {
        $fileName = basename($filesArray['name'][$key]);
        $targetFilePath = "../../uploads/loan_issue/signed_info/" . $fileName;

        $fileExtension = pathinfo($targetFilePath, PATHINFO_EXTENSION);

        $uniqueFileName = uniqid() . '.' . $fileExtension;
        while (file_exists("../../uploads/loan_issue/signed_info/" . $uniqueFileName)) {
            $uniqueFileName = uniqid() . '.' . $fileExtension;
        }

        // Upload file to server  
        if (move_uploaded_file($filesArray["tmp_name"][$key], "../../uploads/loan_issue/signed_info/" . $uniqueFileName)) {
            $update =  $pdo->query("INSERT INTO `signed_upload`(`cus_id`, `cus_profile_id`, `signed_info_id`, `uploads`) VALUES ('$cus_id','$cus_profile_id','$last_id','$uniqueFileName')");
        }
    }
}
echo json_encode($result);

// Close the database connection
$pdo = null;
