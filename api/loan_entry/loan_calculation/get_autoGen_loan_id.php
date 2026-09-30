<?php
require "../../../ajaxconfig.php";

$id = $_POST['id'] ?? '';

if ($id != '0' && $id != '') {

    $qry = $pdo->query("SELECT loan_id FROM loan_entry_loan_calculation WHERE id = '$id' AND loan_id != '' AND loan_id IS NOT NULL");

    $qry_info = $qry->fetch(PDO::FETCH_ASSOC);

    $loan_ID_final = $qry_info['loan_id'] ?? '';
} else {

    $qry = $pdo->query("SELECT MAX(CAST(loan_id AS UNSIGNED)) AS max_number FROM loan_entry_loan_calculation WHERE loan_id != '' AND loan_id IS NOT NULL");

    $row = $qry->fetch(PDO::FETCH_ASSOC);

    if (!empty($row['max_number'])) {
        $loan_ID_final = $row['max_number'] + 1;
    } else {
        $loan_ID_final = 101;
    }
}

echo json_encode($loan_ID_final);
