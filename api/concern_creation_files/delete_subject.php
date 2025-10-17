

<?php
require "../../ajaxconfig.php";

$id = $_POST['id'];

$checkQry = $pdo->query("SELECT * FROM concern_creation WHERE con_sub = '$id'");

if ($checkQry->rowCount() > 0) {
    $result = 0; //Already added in Concern Creation.
} else {
    $qry = $pdo->query("UPDATE `concern_subject` SET status = 1  WHERE con_sub_id = '$id'");
    $result = 1; // Disabled
}

$pdo = null; // Close Connection

echo json_encode($result);
