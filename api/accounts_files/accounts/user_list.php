<?php
require "../../../ajaxconfig.php";

$result = array();

$qry = $pdo->query("SELECT id, name FROM users where FIND_IN_SET('15', screens) ORDER BY name ASC");
if ($qry->rowCount() > 0) {
    $result = $qry->fetchAll(PDO::FETCH_ASSOC);
}

$pdo = null; //close connection.
echo json_encode($result);
