<?php
require '../../ajaxconfig.php';

$id = $_POST['id'];
$result = 0;
$qry = $pdo->query("SELECT uploads FROM `signed_upload` WHERE signed_info_id ='$id'");
if ($qry->rowCount() > 0) {
    while ($row = $qry->fetch()) {
        if ($row['uploads']) {
            unlink("../../uploads/loan_issue/signed_info/" . $row['uploads']);
        }
    }
}

    $qry = $pdo->query("DELETE FROM `signed_doc_info` WHERE id='$id'");
    $pdo->query("DELETE FROM `signed_upload` WHERE signed_info_id = '$id'");
    if ($qry) {
        $result = 1;
    }else{
        $result = 2;
    }

$pdo = null; //Close connection.

echo json_encode($result);