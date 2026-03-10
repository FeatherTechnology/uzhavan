<?php
require "../../../ajaxconfig.php";

$op_data = array();
$op_data[0]['hand_cash'] = 0;
$op_data[0]['bank_cash'] = 0;
$current_date = date('Y-m-d');
//Collection credit.
$c_cr_h_qry = $pdo->query("SELECT SUM(collection_amnt) AS coll_cr_amnt FROM accounts_collect_entry WHERE coll_mode = 1 AND DATE(created_on) <= '$current_date' - INTERVAL 1 DAY "); //Hand Cash
if ($c_cr_h_qry->rowCount() > 0) {
    $c_cr_h = $c_cr_h_qry->fetch()['coll_cr_amnt'];
} else {
    $c_cr_h = 0;
}

$c_w_cr_h_qry = $pdo->query("SELECT SUM(waiver_amount) AS coll_w_cr_amnt FROM accounts_waiver_entry WHERE coll_mode = 1 AND DATE(created_on) <= '$current_date' - INTERVAL 1 DAY "); //Hand Cash
if ($c_w_cr_h_qry->rowCount() > 0) {
    $c_w_cr_h = $c_w_cr_h_qry->fetch()['coll_w_cr_amnt'];
} else {
    $c_w_cr_h = 0;
}

// $c_cr_b_qry = $pdo->query("SELECT SUM(collection_amnt) AS coll_cr_amnt FROM accounts_collect_entry WHERE coll_mode = 2 AND DATE(created_on) <= '$current_date' - INTERVAL 1 DAY "); //Hand Cash
// if ($c_cr_b_qry->rowCount() > 0) {
//     $c_cr_b = $c_cr_b_qry->fetch()['coll_cr_amnt'];
// } else {
//     $c_cr_b = 0;
// }

// Loan Issue
$s_db_h_qry = $pdo->query("SELECT COALESCE(SUM(cash),0) AS settlr_cr_amnt FROM loan_issue WHERE DATE(created_on)<= '$current_date' - INTERVAL 1 DAY "); //Hand Cash
if ($s_db_h_qry->rowCount() > 0) {
    $s_db_h = $s_db_h_qry->fetch()['settlr_cr_amnt'];
} else {
    $s_db_h = 0;
}
// $s_cr_b_qry = $pdo->query("SELECT COALESCE(SUM(cheque_val) + SUM(transaction_val),0) AS settlr_br_amnt FROM loan_issue WHERE DATE(created_on) <= '$current_date' - INTERVAL 1 DAY"); //Hand Cash
// if ($s_cr_b_qry->rowCount() > 0) {
//     $s_cr_b = $s_cr_b_qry->fetch()['settlr_br_amnt'];
// } else {
//     $s_cr_b= 0;
// }
//Expenses Debit.
$e_dr_h_qry = $pdo->query("SELECT SUM(amount) AS exp_dr_amnt FROM expenses WHERE coll_mode = 1 AND DATE(created_on) <= '$current_date' - INTERVAL 1 DAY"); //Hand Cash
if ($e_dr_h_qry->rowCount() > 0) {
    $e_dr_h = $e_dr_h_qry->fetch()['exp_dr_amnt'];
} else {
    $e_dr_h = 0;
}

// $e_dr_b_qry = $pdo->query("SELECT SUM(amount) AS exp_dr_amnt FROM expenses WHERE coll_mode = 2 AND DATE(created_on) <= '$current_date' - INTERVAL 1 DAY "); //Hand Cash
// if ($e_dr_b_qry->rowCount() > 0) {
//     $e_dr_b = $e_dr_b_qry->fetch()['exp_dr_amnt'];
// } else {
//     $e_dr_b = 0;
// }

//Other Transaction Credit / Debit.
$ot_cr_h_qry = $pdo->query("SELECT SUM(amount) AS ot_amnt FROM other_transaction WHERE coll_mode = 1 AND type = 1 AND DATE(created_on) <= '$current_date' - INTERVAL 1 DAY "); //Hand Cash //credit
if ($ot_cr_h_qry->rowCount() > 0) {
    $ot_cr_h = $ot_cr_h_qry->fetch()['ot_amnt'];
} else {
    $ot_cr_h = 0;
}

$ot_dr_h_qry = $pdo->query("SELECT SUM(amount) AS ot_amnt FROM other_transaction WHERE coll_mode = 1 AND type = 2 AND DATE(created_on) <= '$current_date' - INTERVAL 1 DAY"); //Hand Cash //debit
if ($ot_dr_h_qry->rowCount() > 0) {
    $ot_dr_h = $ot_dr_h_qry->fetch()['ot_amnt'];
} else {
    $ot_dr_h = 0;
}

// $ot_cr_b_qry = $pdo->query("SELECT SUM(amount) AS ot_amnt FROM other_transaction WHERE coll_mode = 2 AND type = 1 AND DATE(created_on) <= '$current_date' - INTERVAL 1 DAY "); //Bank Cash //credit
// if ($ot_cr_b_qry->rowCount() > 0) {
//     $ot_cr_b = $ot_cr_b_qry->fetch()['ot_amnt'];
// } else {
//     $ot_cr_b = 0;
// }

// $ot_dr_b_qry = $pdo->query("SELECT SUM(amount) AS ot_amnt FROM other_transaction WHERE coll_mode = 2 AND type = 2 AND DATE(created_on) <= '$current_date' - INTERVAL 1 DAY"); //Bank Cash //debit
// if ($ot_dr_b_qry->rowCount() > 0) {
//     $ot_dr_b = $ot_dr_b_qry->fetch()['ot_amnt'];
// } else {
//     $ot_dr_b = 0;
// }

$bank_qry = $pdo->query("
    SELECT SUM(balance) AS total_balance
    FROM (
        SELECT balance
        FROM bank_clearance bc1
        WHERE DATE(trans_date) <= '$current_date' - INTERVAL 1 DAY
        AND id = (
            SELECT id
            FROM bank_clearance bc2
            WHERE bc2.bank_id = bc1.bank_id
            AND DATE(trans_date) <= '$current_date' - INTERVAL 1 DAY
            ORDER BY trans_date DESC, id DESC
            LIMIT 1
        )
    ) AS last_balances
");

$total_balance = $bank_qry->fetch()['total_balance'] ?? 0;

$hand_cr = intval($c_cr_h) + intval($ot_cr_h) + intval($c_w_cr_h);
$hand_dr = intval($e_dr_h) + intval($ot_dr_h) + intval($s_db_h);
// $bank_cr = intval($c_cr_b) + intval($ot_cr_b);
// $bank_dr = intval($e_dr_b) + intval($ot_dr_b) + intval($s_cr_b);

$op_data[0]['hand_cash'] = intval($hand_cr) - intval($hand_dr);
$op_data[0]['bank_cash'] = ($total_balance);
$op_data[0]['opening_balance'] = $op_data[0]['hand_cash'] + $op_data[0]['bank_cash'];

echo json_encode($op_data);
