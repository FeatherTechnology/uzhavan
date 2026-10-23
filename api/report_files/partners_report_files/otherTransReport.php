<?php
include '../../../ajaxconfig.php';

$to_date = $_POST['to_date'] ?? date('Y-m-d') . ' 23:59:59';
$from_date = date('Y-m-d 00:00:00', strtotime($to_date));

$data = [];
$sno = 1;

$total_credit = 0;
$total_debit  = 0;

/* ========================== EL ========================== */

// EL CREDIT
$el_credit = (float)$pdo->query("SELECT ROUND(COALESCE(SUM(amount), 0), 2) FROM other_transaction
    WHERE trans_cat = '3'
    AND coll_mode IN ('1', '2')
    AND type = '1'
    AND DATE(created_on) BETWEEN '$from_date' AND '$to_date'
")->fetchColumn();

// EL DEBIT
$el_debit = (float)$pdo->query("SELECT ROUND(COALESCE(SUM(amount), 0), 2) FROM other_transaction
    WHERE trans_cat = '3'
    AND coll_mode IN ('1', '2')
    AND type = '2'
    AND DATE(created_on) BETWEEN '$from_date' AND '$to_date'
")->fetchColumn();

$data[] = [
    "sno"      => $sno++,
    "fullname" => "EL",
    "credit"   => $el_credit,
    "debit"    => $el_debit
];

$total_credit += $el_credit;
$total_debit  += $el_debit;

/* ========================== INVESTMENT ========================== */

// INVESTMENT CREDIT
$inv_credit = (float)$pdo->query("SELECT ROUND(COALESCE(SUM(amount), 0), 2) FROM other_transaction
    WHERE trans_cat = '2'
    AND coll_mode IN ('1', '2')
    AND type = '1'
    AND DATE(created_on) BETWEEN '$from_date' AND '$to_date'
")->fetchColumn();

// INVESTMENT DEBIT
$inv_debit = (float)$pdo->query("SELECT ROUND(COALESCE(SUM(amount), 0), 2) FROM other_transaction
    WHERE trans_cat = '2'
    AND coll_mode IN ('1', '2')
    AND type = '2'
    AND DATE(created_on) BETWEEN '$from_date' AND '$to_date'
")->fetchColumn();

$data[] = [
    "sno"      => $sno++,
    "fullname" => "Investment",
    "credit"   => $inv_credit,
    "debit"    => $inv_debit
];

$total_credit += $inv_credit;
$total_debit  += $inv_debit;

/* ========================== DEPOSIT ========================== */

// DEPOSIT CREDIT
$dep_credit = (float)$pdo->query("SELECT ROUND(COALESCE(SUM(amount), 0), 2) FROM other_transaction
    WHERE trans_cat = '1'
    AND coll_mode IN ('1', '2')
    AND type = '1'
    AND DATE(created_on) BETWEEN '$from_date' AND '$to_date'
")->fetchColumn();

// DEPOSIT DEBIT
$dep_debit = (float)$pdo->query("SELECT ROUND(COALESCE(SUM(amount), 0), 2)
    FROM other_transaction
    WHERE trans_cat = '1'
    AND coll_mode IN ('1', '2')
    AND type = '2'
    AND DATE(created_on) BETWEEN '$from_date' AND '$to_date'
")->fetchColumn();

$data[] = [
    "sno"      => $sno++,
    "fullname" => "Deposit",
    "credit"   => $dep_credit,
    "debit"    => $dep_debit
];

$total_credit += $dep_credit;
$total_debit  += $dep_debit;

/* ========================== EXPENSE (DEBIT ONLY) ========================== */

$exp_debit = (float)$pdo->query("SELECT ROUND(COALESCE(SUM(amount), 0), 2) FROM expenses
    WHERE DATE(created_on) BETWEEN '$from_date' AND '$to_date'
")->fetchColumn();

$data[] = [
    "sno"      => $sno++,
    "fullname" => "Expenses",
    "credit"   => 0,
    "debit"    => $exp_debit
];

$total_debit += $exp_debit;

/* ========================== TOTAL========================== */
$data[] = [
    "sno"      => "",
    "fullname" => "Total",
    "credit"   => $total_credit,
    "debit"    => $total_debit
];

echo json_encode(["data" => $data]);
