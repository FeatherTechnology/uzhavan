<?php
require '../../ajaxconfig.php';

session_start();

$user_id = $_SESSION['user_id'];

$userid = (!empty($_POST['id'])) ? $_POST['id'] : $user_id;

$result = [];   // Initialize

$qry = $pdo->query("SELECT * FROM users WHERE id='$userid'");

if ($qry->rowCount() > 0) {
    $result = $qry->fetchAll(PDO::FETCH_ASSOC);
}

$pdo = null;

echo json_encode($result);