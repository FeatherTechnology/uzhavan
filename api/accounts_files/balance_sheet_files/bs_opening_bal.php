<?php
require "../../../ajaxconfig.php";

$type = $_POST['type'];
$user_id = ($_POST['user_id'] != '') ? $userwhere = " AND insert_login_id = '" . $_POST['user_id'] . "' " : $userwhere = ''; //for user based

if ($type == 'today') {
    $current_date = date('Y-m-d');
    $where = " DATE(created_on) <='$current_date' - INTERVAL 1 DAY $userwhere";
    $bwhere = " DATE(trans_date) <='$current_date' - INTERVAL 1 DAY $userwhere";
    $bhwhere = " DATE(created_date) <='$current_date' - INTERVAL 1 DAY $userwhere";
} else if ($type == 'day') {
    $from_date = $_POST['from_date'];
    $to_date = $_POST['to_date'];
    //$where = " (DATE(created_on) >= '$from_date' && DATE(created_on) <= '$from_date' ) $userwhere ";
    $where = " DATE(created_on) <= DATE('$from_date') - INTERVAL 1 DAY $userwhere";
    $bwhere = " DATE(trans_date) <= DATE('$from_date') - INTERVAL 1 DAY $userwhere";
    $bhwhere = " DATE(created_date) <= DATE('$from_date') - INTERVAL 1 DAY $userwhere";
} else if ($type == 'month') {
    // Get the selected month and subtract one month
    $selectedMonth = $_POST['month'];
    $previousMonth = date('Y-m', strtotime('-1 month', strtotime($selectedMonth)));
    // Extract year and month parts
    $year  = date('Y', strtotime($previousMonth));
    $month = date('m', strtotime($previousMonth));
    // Build your filter clause
    $where = "(
        YEAR(created_on) < '$year'
        OR (
            YEAR(created_on) = '$year'
            AND MONTH(created_on) <= '$month'
        )
    ) $userwhere";
    $bwhere = "(
        YEAR(trans_date) < '$year'
        OR (
            YEAR(trans_date) = '$year'
            AND MONTH(trans_date) <= '$month'
        )
    ) $userwhere";
    $bhwhere = "(
        YEAR(created_date) < '$year'
        OR (
            YEAR(created_date) = '$year'
            AND MONTH(created_date) <= '$month'
        )
    ) $userwhere";
}
$op_data = array();
$op_data[0]['hand_cash'] = 0;
$op_data[0]['bank_cash'] = 0;

//Collection credit.
$c_cr_h_qry = $pdo->query("SELECT SUM(collection_amnt) AS coll_cr_amnt FROM accounts_collect_entry WHERE coll_mode = 1 AND $where "); //Hand Cash
if ($c_cr_h_qry->rowCount() > 0) {
    $c_cr_h = $c_cr_h_qry->fetch()['coll_cr_amnt'];
} else {
    $c_cr_h = 0;
}
$c_w_cr_h_qry = $pdo->query("SELECT SUM(waiver_amount) AS coll_waiver_amnt FROM accounts_waiver_entry WHERE coll_mode = 1 AND $where "); //Hand Cash
if ($c_w_cr_h_qry->rowCount() > 0) {
    $c_w_cr_h = $c_w_cr_h_qry->fetch()['coll_waiver_amnt'];
} else {
    $c_w_cr_h = 0;
}

// $c_cr_b_qry = $pdo->query("SELECT SUM(collection_amnt) AS coll_cr_amnt FROM accounts_collect_entry WHERE coll_mode = 2 AND $where "); //Hand Cash
// if ($c_cr_b_qry->rowCount() > 0) {
//     $c_cr_b = $c_cr_b_qry->fetch()['coll_cr_amnt'];
// } else {
//     $c_cr_b = 0;
// }
// Loan Issue
$s_db_h_qry = $pdo->query("SELECT COALESCE(SUM(cash),0) AS settlr_cr_amnt FROM loan_issue WHERE  $where "); //Hand Cash
if ($s_db_h_qry->rowCount() > 0) {
    $s_db_h = $s_db_h_qry->fetch()['settlr_cr_amnt'];
} else {
    $s_db_h = 0;
}
// $s_cr_b_qry = $pdo->query("SELECT COALESCE(SUM(cheque_val) + SUM(transaction_val),0) AS settlr_br_amnt FROM loan_issue WHERE $where"); //Hand Cash
// if ($s_cr_b_qry->rowCount() > 0) {
//     $s_cr_b = $s_cr_b_qry->fetch()['settlr_br_amnt'];
// } else {
//     $s_cr_b= 0;
// }
//Expenses Debit.
$e_dr_h_qry = $pdo->query("SELECT SUM(amount) AS exp_dr_amnt FROM expenses WHERE coll_mode = 1 AND $where "); //Hand Cash
if ($e_dr_h_qry->rowCount() > 0) {
    $e_dr_h = $e_dr_h_qry->fetch()['exp_dr_amnt'];
} else {
    $e_dr_h = 0;
}

// $e_dr_b_qry = $pdo->query("SELECT SUM(amount) AS exp_dr_amnt FROM expenses WHERE coll_mode = 2 AND $where "); //Hand Cash
// if ($e_dr_b_qry->rowCount() > 0) {
//     $e_dr_b = $e_dr_b_qry->fetch()['exp_dr_amnt'];
// } else {
//     $e_dr_b = 0;
// }

//Other Transaction Credit / Debit.
$ot_cr_h_qry = $pdo->query("SELECT SUM(amount) AS ot_amnt FROM other_transaction WHERE coll_mode = 1 AND type = 1 AND $where "); //Hand Cash //credit
if ($ot_cr_h_qry->rowCount() > 0) {
    $ot_cr_h = $ot_cr_h_qry->fetch()['ot_amnt'];
} else {
    $ot_cr_h = 0;
}

$ot_dr_h_qry = $pdo->query("SELECT SUM(amount) AS ot_amnt FROM other_transaction WHERE coll_mode = 1 AND type = 2 AND $where "); //Hand Cash //debit
if ($ot_dr_h_qry->rowCount() > 0) {
    $ot_dr_h = $ot_dr_h_qry->fetch()['ot_amnt'];
} else {
    $ot_dr_h = 0;
}

// $ot_cr_b_qry = $pdo->query("SELECT SUM(amount) AS ot_amnt FROM other_transaction WHERE coll_mode = 2 AND type = 1 AND $where "); //Bank Cash //credit
// if ($ot_cr_b_qry->rowCount() > 0) {
//     $ot_cr_b = $ot_cr_b_qry->fetch()['ot_amnt'];
// } else {
//     $ot_cr_b = 0;
// }

// $ot_dr_b_qry = $pdo->query("SELECT SUM(amount) AS ot_amnt FROM other_transaction WHERE coll_mode = 2 AND type = 2 AND $where "); //Bank Cash //debit
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
        WHERE $bwhere
        AND id = (
            SELECT id
            FROM bank_clearance bc2
            WHERE bc2.bank_id = bc1.bank_id
            AND $bwhere
            ORDER BY trans_date DESC, id DESC
            LIMIT 1
        )
    ) AS last_balances
");
$total_balance = $bank_qry->fetch()['total_balance'] ?? 0;
$hand_cr = intval($c_cr_h) + intval($ot_cr_h)+ intval($c_w_cr_h) ;
$hand_dr = intval($e_dr_h) + intval($ot_dr_h) + intval($s_db_h);
// $bank_cr = intval($c_cr_b) + intval($ot_cr_b);
// $bank_dr = intval($e_dr_b) + intval($ot_dr_b) +intval($s_cr_b);

// Previous Uncleared Balance
$prevStmtQry = $pdo->query("
            SELECT 
                COALESCE(SUM(credit),0) AS stmt_credit,
                COALESCE(SUM(debit),0)  AS stmt_debit
            FROM bank_clearance 
           WHERE $bwhere
        ");
$prevStmt = $prevStmtQry->fetch(PDO::FETCH_ASSOC);

$prevClearQry = $pdo->query("
            SELECT 
                COALESCE(SUM(CASE WHEN type = 1 THEN transaction_amount ELSE 0 END),0) AS clear_credit,
                COALESCE(SUM(CASE WHEN type = 2 THEN transaction_amount ELSE 0 END),0) AS clear_debit
            FROM cleared_bank_stmt_history
           WHERE $bhwhere
        ");

$prevClear = $prevClearQry->fetch(PDO::FETCH_ASSOC);

$previous_uncleared_credit = round($prevStmt['stmt_credit'] - $prevClear['clear_credit'], 2);
$previous_uncleared_debit  = round($prevStmt['stmt_debit']  - $prevClear['clear_debit'], 2);


$op_data[0]['hand_cash'] = intval($hand_cr) - intval($hand_dr);
$op_data[0]['bank_cash'] = ($total_balance);
$op_data[0]['opening_balance'] = $op_data[0]['hand_cash'] + $op_data[0]['bank_cash'];
$op_data[0]['previous_uncleared_credit'] = $previous_uncleared_credit;
$op_data[0]['previous_uncleared_debit'] = $previous_uncleared_debit;

echo json_encode($op_data);
