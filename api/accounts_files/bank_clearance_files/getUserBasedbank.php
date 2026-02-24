<?php
include "../../../ajaxconfig.php";
@session_start();
$user_id = $_SESSION['user_id'];


    // 🔹 Get user's bank_access
    $userQry = $pdo->query("SELECT bank_access FROM users WHERE id = '$user_id'");
    $userData = $userQry->fetch(PDO::FETCH_ASSOC);

    $bank_access = $userData['bank_access'];

    if (!empty($bank_access)) {

        // 🔹 Show only allowed banks
        $qry = $pdo->query("
            SELECT id, bank_name, account_number,bank_short_name
            FROM bank_creation 
            WHERE status = 1 
            AND id IN ($bank_access)
        ");

    } else {

        // 🔹 If NULL, return empty
        $qry = null;
    }

$response = [];

if ($qry && $qry->rowCount() > 0) {
    $response = $qry->fetchAll(PDO::FETCH_ASSOC);
}

echo json_encode($response);
