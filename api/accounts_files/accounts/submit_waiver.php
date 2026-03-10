<?php
require "../../../ajaxconfig.php";
@session_start();
$user_id = $_SESSION['user_id'];

$userid = $_POST['id'];
$line = $_POST['line'];
$branch = $_POST['branch'];
$no_of_bills = $_POST['no_of_bills'];
$collected_amnt = str_replace(',', '', $_POST['collected_amnt']);
$cash_type = $_POST['cash_type'];

$qry = $pdo->query("INSERT INTO `accounts_waiver_entry`( `user_id`, `line`, `branch`, `coll_mode`,  `no_of_bills`, `waiver_amount`, `insert_login_id`, `created_on`) VALUES ('$userid','$line','$branch','$cash_type','$no_of_bills','$collected_amnt','$user_id',now())");

$stmt = $pdo->query("SELECT invoice_id FROM expenses WHERE invoice_id != '' ORDER BY id DESC LIMIT 1");
$last = $stmt->fetch(PDO::FETCH_ASSOC);

if ($last) {
    $prefix = substr($last['invoice_id'], 0, 4);
    $number = substr($last['invoice_id'], 4, 3);
    $invoice_no_final = $prefix . str_pad($number + 1, 3, '0', STR_PAD_LEFT);
} else {
    $invoice_no_final = date('ym') . "001";
}
$selectStmt = $pdo->query("SELECT id FROM branch_creation WHERE branch_name = '$branch'");
$branchRow = $selectStmt->fetch(PDO::FETCH_ASSOC);
$branchId = $branchRow['id']; // Get only id value
$insertStmt = $pdo->query("
        INSERT INTO expenses
        (coll_mode, bank_id, invoice_id, branch, expenses_category, description, amount,
          history_id, insert_login_id, created_on)
        VALUES
        ('$cash_type', 0, '$invoice_no_final', '$branchId', 17, 'Waiver Amount', '$collected_amnt',0, '$user_id', now())");

if ($qry && $insertStmt) {
    $result = 1;
} else {
    $result = 2;
}

echo json_encode($result);
