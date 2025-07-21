<?php
require '../../ajaxconfig.php';
@session_start();

$response = [];

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    // Prepare and execute the PDO query
    $query = $pdo->prepare("SELECT u.name AS user_name, r.role AS role_name FROM users u 
        LEFT JOIN role r ON u.role = r.id WHERE u.id = :user_id");

    $query->execute(['user_id' => $user_id]);

    $result = $query->fetch(PDO::FETCH_ASSOC);
    if ($result) {
        $response = $result;
    }
}

echo json_encode($response);
