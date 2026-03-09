<?php
require "../../../ajaxconfig.php";
$type = $_POST['type'];
$user_id = ($_POST['user_id'] != '') ? $userwhere = " AND insert_login_id = '" . $_POST['user_id'] . "' " : $userwhere = ''; //for user based

if ($type == 'today') {
    $where = " DATE(created_on) = CURRENT_DATE $userwhere";
    $collwhere = " DATE(created_date) = CURRENT_DATE $userwhere";
    $bwhere = " DATE(trans_date) <= CURRENT_DATE $userwhere";
    $bswhere = " DATE(created_date) <= CURRENT_DATE $userwhere";
    $acc_where = " DATE(ac.created_on) = CURRENT_DATE $userwhere";
    $cwhere = " DATE(c.coll_date) = CURRENT_DATE $userwhere";

} else if ($type == 'day') {
    $from_date = $_POST['from_date'];
    $to_date = $_POST['to_date'];
    $where = " (DATE(created_on) >= '$from_date' && DATE(created_on) <= '$to_date' ) $userwhere ";
    $collwhere = " (DATE(created_date) >= '$from_date' && DATE(created_date) <= '$to_date' ) $userwhere ";
    $bwhere = " DATE(trans_date) <= '$to_date' $userwhere ";
    $bswhere = " DATE(created_date) <= '$to_date' $userwhere ";
    $acc_where = " DATE(ac.created_on) >= '$from_date' AND DATE(ac.created_on) <= '$to_date' $userwhere";
    $cwhere = " DATE(c.coll_date) >= '$from_date' AND DATE(c.coll_date) <= '$to_date' $userwhere";

} else if ($type == 'month') {
    $month = date('m', strtotime($_POST['month']));
    $year = date('Y', strtotime($_POST['month']));
    $where = " (MONTH(created_on) = '$month' AND YEAR(created_on) = $year) $userwhere";
    $collwhere = " (MONTH(created_date) = '$month' AND YEAR(created_date) = $year) $userwhere";
    $bwhere = " (MONTH(trans_date) <= '$month' AND YEAR(trans_date) <= $year) $userwhere";
    $bswhere = " (MONTH(created_date) <= '$month' AND YEAR(created_date) <= $year) $userwhere";
$acc_where = " (MONTH(ac.created_on) = '$month' AND YEAR(ac.created_on) = $year) $userwhere";
    $cwhere = " (MONTH(c.coll_date) = '$month' AND YEAR(c.coll_date) = $year) $userwhere";
}


$result = array();
//Credit
$qry = $pdo->query("SELECT COALESCE(SUM(amount),0) AS dep_cr FROM `other_transaction` WHERE trans_cat ='1' AND type = '1' AND $where "); //Deposit 
if ($qry->rowCount() > 0) {
    $depcr = $qry->fetch(PDO::FETCH_ASSOC)['dep_cr'];
}

$qry2 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS inv_cr FROM `other_transaction` WHERE trans_cat ='2' AND type = '1' AND $where "); //Investment
if ($qry2->rowCount() > 0) {
    $invcr = $qry2->fetch(PDO::FETCH_ASSOC)['inv_cr'];
} 

$qry3 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS el_cr FROM `other_transaction` WHERE trans_cat ='3' AND type = '1' AND $where "); //EL
if ($qry3->rowCount() > 0) {
    $elcr = $qry3->fetch(PDO::FETCH_ASSOC)['el_cr'];
} 

$qry4 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS exc_cr FROM `other_transaction` WHERE trans_cat ='4' AND type = '1' AND $where "); //Exchange
if ($qry4->rowCount() > 0) {
    $exccr = $qry4->fetch(PDO::FETCH_ASSOC)['exc_cr'];
} 

$qry5 = $pdo->query("SELECT COALESCE(SUM(contra),0) AS contra_cr FROM
(
    SELECT SUM(amount) AS contra FROM `other_transaction` WHERE trans_cat ='5' AND type = '1' AND $where
	UNION ALL
	SELECT SUM(amount) AS contra FROM `other_transaction` WHERE trans_cat ='6' AND type = '1' AND $where 
)AS subquery ");  //Bank Deposit //Bank Withdrawal
if ($qry5->rowCount() > 0) {
    $contracr = $qry5->fetch(PDO::FETCH_ASSOC)['contra_cr'];
} 

$qry6 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS oi_dr FROM `other_transaction` WHERE trans_cat ='8' AND type = '1' AND $where "); //Other Income 
if ($qry6->rowCount() > 0) {
    $oicr = $qry6->fetch(PDO::FETCH_ASSOC)['oi_dr'];
}

//Debit
$qry = $pdo->query("SELECT COALESCE(SUM(amount),0) AS dep_dr FROM `other_transaction` WHERE trans_cat ='1' AND type = '2' AND $where "); //Deposit 
if ($qry->rowCount() > 0) {
    $depdr = $qry->fetch(PDO::FETCH_ASSOC)['dep_dr'];
}

$qry2 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS inv_dr FROM `other_transaction` WHERE trans_cat ='2' AND type = '2' AND $where "); //Investment
if ($qry2->rowCount() > 0) {
    $invdr = $qry2->fetch(PDO::FETCH_ASSOC)['inv_dr'];
}

$qry3 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS el_dr FROM `other_transaction` WHERE trans_cat ='3' AND type = '2' AND $where "); //EL
if ($qry3->rowCount() > 0) {
    $eldr = $qry3->fetch(PDO::FETCH_ASSOC)['el_dr'];
}

$qry4 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS exc_dr FROM `other_transaction` WHERE trans_cat ='4' AND type = '2' AND $where "); //Exchange
if ($qry4->rowCount() > 0) {
    $excdr = $qry4->fetch(PDO::FETCH_ASSOC)['exc_dr'];
}

$qry5 = $pdo->query("SELECT COALESCE(SUM(contra),0) AS contra_dr FROM
(
    SELECT SUM(amount) AS contra FROM `other_transaction` WHERE trans_cat ='5' AND type = '2' AND $where
	UNION ALL
	SELECT SUM(amount) AS contra FROM `other_transaction` WHERE trans_cat ='6' AND type = '2' AND $where 
)AS subquery ");  //Bank Deposit //Bank Withdrawal
if ($qry5->rowCount() > 0) {
    $contradr = $qry5->fetch(PDO::FETCH_ASSOC)['contra_dr'];
} 

$qry6 = $pdo->query("SELECT COALESCE(SUM(IFNULL(cash,0)) + SUM(IFNULL(cheque_val,0)) + SUM(IFNULL(transaction_val,0)),0) AS adv_dr FROM `loan_issue` WHERE $where "); //Loan Advance 
if ($qry6->rowCount() > 0) {
    $advdr = $qry6->fetch(PDO::FETCH_ASSOC)['adv_dr'];
}
$qry7 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS exp_dr FROM `expenses` WHERE $where "); //Expenses 
if ($qry7->rowCount() > 0) {
    $expdr = $qry7->fetch(PDO::FETCH_ASSOC)['exp_dr'];
}

$qry8 = $pdo->query("SELECT COALESCE(SUM(due_amt_track),0) AS due, COALESCE(SUM(total_waiver),0) AS waiver,COALESCE(SUM(princ_amt_track),0) AS princ, COALESCE(SUM(int_amt_track),0) AS intrst, COALESCE(SUM(penalty_track),0) AS penalty, COALESCE(SUM(coll_charge_track),0) AS fine FROM `collection` WHERE $collwhere  "); //Collection 
if ($qry8->rowCount() > 0) {
    $row = $qry8->fetch(PDO::FETCH_ASSOC);
    $due = $row['due'];
    $waiver = $row['waiver'];
    $princ = $row['princ'];
    $intrst = $row['intrst'];
    $penalty = $row['penalty'];
    $fine = $row['fine'];
}
 // ---------- CURRENT (Between Opening & Closing Date) ----------
        $currStmtQry = $pdo->query("
            SELECT 
                COALESCE(SUM(credit),0) AS stmt_credit,
                COALESCE(SUM(debit),0)  AS stmt_debit
            FROM bank_clearance  
            WHERE $bwhere
        ");
        $currStmt = $currStmtQry->fetch(PDO::FETCH_ASSOC);

        $currClearQry = $pdo->query("
            SELECT 
                COALESCE(SUM(CASE WHEN type = 1 THEN transaction_amount ELSE 0 END),0) AS clear_credit,
                COALESCE(SUM(CASE WHEN type = 2 THEN transaction_amount ELSE 0 END),0) AS clear_debit
            FROM cleared_bank_stmt_history
            WHERE $bswhere
        ");

        $currClear = $currClearQry->fetch(PDO::FETCH_ASSOC);
        
        $current_uncleared_credit = round($currStmt['stmt_credit'] - $currClear['clear_credit'], 2);
        $current_uncleared_debit  = round($currStmt['stmt_debit']  - $currClear['clear_debit'], 2);

// Circular Collection
$qry = $pdo->query("
SELECT 
    COALESCE(SUM(c.total_paid_track),0) AS collection_amount,

    COALESCE((
        SELECT SUM(ac.collection_amnt)
        FROM accounts_collect_entry ac
        WHERE ac.user_id = u.id
        AND $acc_where
    ),0) AS account_amount,

    (
        COALESCE(SUM(c.total_paid_track),0) -
        COALESCE((
            SELECT SUM(ac.collection_amnt)
            FROM accounts_collect_entry ac
            WHERE ac.user_id = u.id
            AND $acc_where
        ),0)
    ) AS final_amount

FROM users u
LEFT JOIN collection c 
    ON c.insert_login_id = u.id 
    AND coll_mode = '1'
    AND $cwhere

LEFT JOIN line_name_creation lnc 
    ON c.line = lnc.id

LEFT JOIN branch_creation bc 
    ON c.branch = bc.id

GROUP BY u.id
ORDER BY u.id ASC
");

$result = $qry->fetchAll(PDO::FETCH_ASSOC);
$grand_total = 0;
foreach ($result as $row) {
    $grand_total += $row['final_amount'];
}
// Circular Waiver
$qry = $pdo->query("
SELECT 
    COALESCE(SUM(c.total_waiver),0) AS collection_amount,

    COALESCE((
        SELECT SUM(ac.waiver_amount)
        FROM accounts_waiver_entry ac
        WHERE ac.user_id = u.id
        AND $acc_where
    ),0) AS account_amount,

    (
        COALESCE(SUM(c.total_waiver),0) -
        COALESCE((
            SELECT SUM(ac.waiver_amount)
            FROM accounts_waiver_entry ac
            WHERE ac.user_id = u.id
            AND $acc_where
        ),0)
    ) AS final_waiver_amount

FROM users u
LEFT JOIN collection c 
    ON c.insert_login_id = u.id 
    AND coll_mode = '1'
    AND $cwhere

LEFT JOIN line_name_creation lnc 
    ON c.line = lnc.id

LEFT JOIN branch_creation bc 
    ON c.branch = bc.id

GROUP BY u.id
ORDER BY u.id ASC
");

$result = $qry->fetchAll(PDO::FETCH_ASSOC);
$grand_waiver_total = 0;
foreach ($result as $row) {
    $grand_waiver_total += $row['final_waiver_amount'];
}
$result[0]['depcr'] = $depcr;
$result[0]['invcr'] = $invcr;
$result[0]['elcr']  = $elcr;
$result[0]['exccr'] = $exccr;
$result[0]['contracr'] = $contracr;
$result[0]['oicr'] = $oicr;

$result[0]['depdr'] = $depdr;
$result[0]['invdr'] = $invdr;
$result[0]['eldr']  = $eldr;
$result[0]['excdr'] = $excdr;
$result[0]['contradr'] = $contradr;
$result[0]['advdr'] = $advdr;
$result[0]['expdr'] = $expdr;

$result[0]['due'] = $due;
$result[0]['waiver'] = $waiver;
$result[0]['princ'] = $princ;
$result[0]['intrst'] = $intrst;
$result[0]['penalty'] = $penalty;
$result[0]['fine'] = $fine;
$result[0]['current_uncleared_credit'] = $current_uncleared_credit;
$result[0]['current_uncleared_debit'] = $current_uncleared_debit;
$result[0]['circular_total_debit'] = $grand_total;
$result[0]['circular_total_waiver'] = $grand_waiver_total;

echo json_encode($result);