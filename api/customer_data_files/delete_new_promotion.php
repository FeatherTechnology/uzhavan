<?php
require '../../ajaxconfig.php';

$id = $_POST['id'];

$qry = $pdo->query("DELETE FROM `customer_data` WHERE `id` = '$id'");

if ($qry) {
    $result = '1'; // Success
} else {
    $result = '0'; //Failed
}

$pdo = null; // Close Connection

echo json_encode($result); // Failure