<?php
require '../../ajaxconfig.php';

$result = [];

if (isset($_POST['assign_to']) && !empty($_POST['assign_to'])) {
    // multiple roles passed (ex: Director,Admin,Manager)
    $roles = explode(',', $_POST['assign_to']); // split into array
} else {
    // default: only Staff
    $roles = ['Staff'];
}

$placeholders = rtrim(str_repeat('?,', count($roles)), ','); 
$qry = $pdo->prepare("
    SELECT u.id, u.name
    FROM users u
    JOIN role r ON u.role = r.id
    WHERE r.role IN ($placeholders)
");
$qry->execute($roles);

if ($qry->rowCount() > 0) {
    $result = $qry->fetchAll(PDO::FETCH_ASSOC);
}

$pdo = null;
echo json_encode($result);
