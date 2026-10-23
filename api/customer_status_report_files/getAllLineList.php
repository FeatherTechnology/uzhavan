<?php
require '../../ajaxconfig.php';

$sql = "SELECT id, linename
        FROM line_name_creation
        WHERE status = 1
        ORDER BY linename ASC";

$stmt = $pdo->prepare($sql);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
