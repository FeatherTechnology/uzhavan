<?php
require '../../ajaxconfig.php';
$concern_to = $_POST['concern_to'];
$qry = $pdo->query("
    SELECT r.role
    FROM users u
    JOIN role r ON u.role = r.id
    WHERE u.id = '$concern_to'
");

if ($qry->rowCount() > 0) {
    $result = $qry->fetchAll(PDO::FETCH_ASSOC);
}
$pdo = null; //Close connection.

echo json_encode($result);