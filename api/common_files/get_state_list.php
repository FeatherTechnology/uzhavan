<?php
require '../../ajaxconfig.php';

$qry = $pdo->query("SELECT id, state_name FROM states WHERE status = 1 ");
if ($qry->rowCount() > 0) {
    $response = $qry->fetchAll(PDO::FETCH_ASSOC);
}
$pdo = null; //Close Connection

echo json_encode($response);
