<?php
require "../../../ajaxconfig.php";
$type = $_POST['type'];
$user_id = ($_POST['user_id'] != '') ? $userwhere = " AND insert_login_id = '" . $_POST['user_id'] . "' " : $userwhere = ''; //for user based

if ($type == 'today') {
    $where = " DATE(created_on) = CURRENT_DATE $userwhere";
    // $collwhere = " DATE(created_date) = CURRENT_DATE $userwhere";
    // $bwhere = " DATE(trans_date) <= CURRENT_DATE $userwhere";
    // $bswhere = " DATE(created_date) <= CURRENT_DATE $userwhere";
    // $acc_where = " DATE(ac.created_on) = CURRENT_DATE $userwhere";
    // $cwhere = " DATE(c.coll_date) = CURRENT_DATE $userwhere";

} else if ($type == 'day') {
    $from_date = $_POST['from_date'];
    $to_date = $_POST['to_date'];
    $where = " (DATE(created_on) >= '$from_date' && DATE(created_on) <= '$to_date' ) $userwhere ";
    // $collwhere = " (DATE(created_date) >= '$from_date' && DATE(created_date) <= '$to_date' ) $userwhere ";
    // $bwhere = " DATE(trans_date) <= '$to_date' $userwhere ";
    // $bswhere = " DATE(created_date) <= '$to_date' $userwhere ";
    // $acc_where = " DATE(ac.created_on) >= '$from_date' AND DATE(ac.created_on) <= '$to_date' $userwhere";
    // $cwhere = " DATE(c.coll_date) >= '$from_date' AND DATE(c.coll_date) <= '$to_date' $userwhere";

}

$result = array();
//Credit
$qry = $pdo->query("SELECT COALESCE(SUM(collection_amnt),0) AS coll_amnt_cr FROM `accounts_collect_entry` WHERE  $where "); //Deposit 
if ($qry->rowCount() > 0) {
    $collcr = $qry->fetch(PDO::FETCH_ASSOC)['coll_amnt_cr'];
}

$qry = $pdo->query("SELECT COALESCE(SUM(waiver_amount),0) AS waiver_cr FROM `accounts_waiver_entry` WHERE $where "); //Waiver
if ($qry->rowCount() > 0) {
    $waivercr = $qry->fetch(PDO::FETCH_ASSOC)['waiver_cr'];
}

//Credit
$qry = $pdo->query("SELECT COALESCE(SUM(amount),0) AS dep_cr FROM `other_transaction` WHERE coll_mode = '1' AND trans_cat ='1' AND type = '1' AND $where "); //Deposit 
if ($qry->rowCount() > 0) {
    $depcr = $qry->fetch(PDO::FETCH_ASSOC)['dep_cr'];
}

$qry2 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS inv_cr FROM `other_transaction` WHERE  coll_mode = '1' AND trans_cat ='2' AND type = '1' AND $where "); //Investment
if ($qry2->rowCount() > 0) {
    $invcr = $qry2->fetch(PDO::FETCH_ASSOC)['inv_cr'];
} 

$qry3 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS el_cr FROM `other_transaction` WHERE  coll_mode = '1' AND trans_cat ='3' AND type = '1' AND $where "); //EL
if ($qry3->rowCount() > 0) {
    $elcr = $qry3->fetch(PDO::FETCH_ASSOC)['el_cr'];
} 

$qry4 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS exc_cr FROM `other_transaction` WHERE coll_mode = '1' AND trans_cat ='4' AND type = '1' AND $where "); //Exchange
if ($qry4->rowCount() > 0) {
    $exccr = $qry4->fetch(PDO::FETCH_ASSOC)['exc_cr'];
} 

$qry5 = $pdo->query("SELECT COALESCE(SUM(contra),0) AS contra_cr FROM
(
    SELECT SUM(amount) AS contra FROM `other_transaction` WHERE coll_mode = '1' AND trans_cat ='5' AND type = '1' AND $where
	UNION ALL
	SELECT SUM(amount) AS contra FROM `other_transaction` WHERE coll_mode = '1' AND trans_cat ='6' AND type = '1' AND $where 
)AS subquery ");  //Bank Deposit //Bank Withdrawal
if ($qry5->rowCount() > 0) {
    $contracr = $qry5->fetch(PDO::FETCH_ASSOC)['contra_cr'];
} 

$qry6 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS oi_dr FROM `other_transaction` WHERE coll_mode = '1' AND trans_cat ='8' AND type = '1' AND $where "); //Other Income 
if ($qry6->rowCount() > 0) {
    $oicr = $qry6->fetch(PDO::FETCH_ASSOC)['oi_dr'];
}

//Debit
$qry = $pdo->query("SELECT COALESCE(SUM(amount),0) AS dep_dr FROM `other_transaction` WHERE coll_mode = '1' AND trans_cat ='1' AND type = '2' AND $where "); //Deposit 
if ($qry->rowCount() > 0) {
    $depdr = $qry->fetch(PDO::FETCH_ASSOC)['dep_dr'];
}

$qry2 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS inv_dr FROM `other_transaction` WHERE coll_mode = '1' AND trans_cat ='2' AND type = '2' AND $where "); //Investment
if ($qry2->rowCount() > 0) {
    $invdr = $qry2->fetch(PDO::FETCH_ASSOC)['inv_dr'];
}

$qry3 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS el_dr FROM `other_transaction` WHERE  coll_mode = '1' AND trans_cat ='3' AND type = '2' AND $where "); //EL
if ($qry3->rowCount() > 0) {
    $eldr = $qry3->fetch(PDO::FETCH_ASSOC)['el_dr'];
}

$qry4 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS exc_dr FROM `other_transaction` WHERE coll_mode = '1' AND trans_cat ='4' AND type = '2' AND $where "); //Exchange
if ($qry4->rowCount() > 0) {
    $excdr = $qry4->fetch(PDO::FETCH_ASSOC)['exc_dr'];
}

$qry5 = $pdo->query("SELECT COALESCE(SUM(contra),0) AS contra_dr FROM
(
    SELECT SUM(amount) AS contra FROM `other_transaction` WHERE coll_mode = '1' AND trans_cat ='5' AND type = '2' AND $where
	UNION ALL
	SELECT SUM(amount) AS contra FROM `other_transaction` WHERE coll_mode = '1' AND trans_cat ='6' AND type = '2' AND $where 
)AS subquery ");  //Bank Deposit //Bank Withdrawal
if ($qry5->rowCount() > 0) {
    $contradr = $qry5->fetch(PDO::FETCH_ASSOC)['contra_dr'];
} 

$qry6 = $pdo->query("SELECT COALESCE(SUM(cash) ,0) AS adv_dr FROM `loan_issue` WHERE payment_mode = '1' AND $where "); //Loan Advance 
if ($qry6->rowCount() > 0) {
    $advdr = $qry6->fetch(PDO::FETCH_ASSOC)['adv_dr'];
}
$qry7 = $pdo->query("SELECT COALESCE(SUM(amount),0) AS exp_dr FROM `expenses` WHERE  coll_mode = '1' AND $where "); //Expenses 
if ($qry7->rowCount() > 0) {
    $expdr = $qry7->fetch(PDO::FETCH_ASSOC)['exp_dr'];
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

$result[0]['due'] = $collcr;
$result[0]['waiver'] = $waivercr;


echo json_encode($result);