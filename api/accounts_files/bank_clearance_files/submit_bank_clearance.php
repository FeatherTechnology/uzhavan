<?php
require "../../../ajaxconfig.php";
session_start();
$user_id = $_SESSION['user_id'];

$credit = 0;
$debit = 0;

$bank_id = $_POST['bank_id'];
$bank_short_name = $_POST['bank_short_name'];
$acc_no = $_POST['acc_no'];
$trans_date = $_POST['transaction_date'];
$trans_time = $_POST['trans_time'];
$narration = $_POST['narration'];
$crdb = $_POST['cr_dr'];
$amt = $_POST['amount'];
$balance = $_POST['balance'];
if ($crdb == 1) {
    $credit = $amt;
} else if ($crdb == 2) {
    $debit = $amt;
}
if ($credit <= 0 && $debit <= 0) {
    echo json_encode(['status'=>'error','message'=>'Invalid amount']);
    exit;
}

/* =============================== DATE & TIME HANDLING ================================ */
$dt = new DateTime($trans_date, new DateTimeZone('Asia/Kolkata'));

$trans_date_only    = $dt->format('Y-m-d');
$trans_date_for_id  = $dt->format('dmY');

/* ===============================  GET LAST RUNNING BALANCE ================================ */


/* ===============================  GET LAST RUNNING BALANCE ================================ */
$lastBalQry = $pdo->query(" SELECT balance  FROM bank_clearance  WHERE bank_id = '$bank_id' ORDER BY id DESC LIMIT 1");

$running_balance = 0;
if ($row = $lastBalQry->fetch(PDO::FETCH_ASSOC)) {
    $running_balance = floatval($row['balance']);
}

/* =============================== BALANCE VALIDATION ================================ */
$expected_balance = $running_balance + $credit - $debit;

if (round($expected_balance, 2) != round($balance, 2)) {
    echo json_encode([
        'status' => 'balance_mismatch',
        'message' => "Balance mismatch. Expected $expected_balance but got $balance"
    ]);
    exit;
}
/* =============================== TRANSACTION TYPE & AUTO ID ================================ */
$type = ($credit > 0) ? 'CR' : 'DB';

$runQry = $pdo->query(" SELECT MAX(CAST(SUBSTRING_INDEX(trans_id, '-', -1) AS UNSIGNED)) AS last_no
    FROM bank_clearance
    WHERE bank_id = '$bank_id' AND DATE(trans_date) = '$trans_date_only' AND trans_id LIKE '{$bank_short_name}{$type}-%' ");

$last_no = $runQry->fetch(PDO::FETCH_ASSOC)['last_no'] ?? 0;
$run_no  = str_pad($last_no + 1, 3, '0', STR_PAD_LEFT);

$auto_trans_id = $bank_short_name.$type.'-'.$trans_date_for_id.'-'.$run_no;
$transaction_amount = ($credit > 0) ? $credit : $debit;
$trans_datetime = $trans_date_only.' '.$trans_time;

/* =============================== INSERT DATA ================================ */

$qry = $pdo->query("INSERT INTO `bank_clearance`(`bank_id`, `trans_date`, `narration`,`trans_id`, `credit`, `debit`, `balance`, `transaction_amount`,`insert_login_id`, `created_date`) 
VALUES ('$bank_id','$trans_datetime','$narration','$auto_trans_id','$credit','$debit','$balance','$transaction_amount','$user_id',now() )");

if ($qry) {
    echo json_encode([
        'status'  => 'success',
        'message' => 'Transaction details added successfully'
    ]);
} else {
    echo json_encode([
        'status'  => 'error',
        'message' => 'Failed to insert transaction'
    ]);
}

