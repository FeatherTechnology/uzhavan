

<?php
require "../../ajaxconfig.php";

$id = $_POST['id'];

$qry = $pdo->query("UPDATE `concern_creation` SET con_status = 2  WHERE id = '$id'");
if ($qry) {
    $result = 1;
} else {
    $result = 2;
}



$pdo = null; // Close Connection

echo json_encode($result);
