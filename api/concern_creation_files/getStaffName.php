<?php
require '../../ajaxconfig.php';
@session_start();
$user_id = $_SESSION['user_id'];
$result = [];

if (isset($_POST['assign_to']) && !empty($_POST['assign_to'])) {

    // multiple designation passed (ex: Director,Admin,Manager)
    $designation = $_POST['assign_to']; 
    $con = "d.id = '$designation'"; 

} else {
    // default: only current user
    $con = "u.id = '$user_id'"; 
}

$qry = $pdo->query("
    SELECT u.id, u.name
    FROM users u
    JOIN designation d ON u.designation = d.id
    WHERE $con
");

if ($qry->rowCount() > 0) {
    $result = $qry->fetchAll(PDO::FETCH_ASSOC);
}

$pdo = null;
echo json_encode($result);

