<?php
require "../../ajaxconfig.php";

$role_arr = [];

// Allowed list
$assign_des = [];
if (isset($_POST['assign_des']) && !empty($_POST['assign_des'])) {
    $assign_des = explode(',', $_POST['assign_des']);
}

// Selected designation id (during edit)
$selected_id = isset($_POST['selected_id']) ? $_POST['selected_id'] : '';

$queryParts = [];
$params = [];

// Part 1: Fetch allowed designations
if (!empty($assign_des)) {
    $placeholders = rtrim(str_repeat('?,', count($assign_des)), ',');
    $queryParts[] = "SELECT id, designation FROM designation WHERE designation IN ($placeholders)";
    $params = array_merge($params, $assign_des);
}

// Part 2: Fetch selected designation if not included
if (!empty($selected_id)) {
    $queryParts[] = "SELECT id, designation FROM designation WHERE id = ?";
    $params[] = $selected_id;
}

// Combine queries using UNION
$sql = implode(" UNION ", $queryParts);

$qry = $pdo->prepare($sql);
$qry->execute($params);

$role_arr = $qry->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($role_arr);
$pdo = null;
?>

