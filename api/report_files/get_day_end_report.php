<?php
session_start();
include '../../ajaxconfig.php';
require_once '../../include/views/money_format_india.php';

$userid  = '';

$userQry = $pdo->query("SELECT id FROM bank_creation WHERE 1");

$bank_ids = [];
while ($row = $userQry->fetch()) {
    $bank_ids[] = $row['id'];
}

sort($bank_ids);
$bank_details = implode(',', $bank_ids);

if (isset($_POST['search_date']) && $_POST['search_date'] != '') {
    $search_date = $_POST['search_date'];
    $date = new DateTime($search_date);
    $full_date = $date->format('Y-m-d');
    $till_now_date = $date->format('Y-m-01');
}

$record = getOpeningBalance($pdo, $full_date, $bank_ids);
$hand_opening_balance = $record['hand_opening'];
$bank_opening = $record['bank_opening'];

$closing_record = getClosingBalance($pdo, $full_date, $bank_ids);
$hand_closing_balance = $closing_record['hand_cash_closing'] + $hand_opening_balance;

$records = getOtherTransactionBalance($pdo, $full_date, $bank_ids, $till_now_date);
$hand = $records['hand_summary'];

$h_collection               = $hand['accounts_collect_entry'];
$h_issued                   = $hand['loan_issue'];
$h_hand_expense             = $hand['expenses'];
$h_deposite                 = $hand['ot_hcr_deposit'] - $hand['ot_hdb_deposit'];
$h_exchange                 = $hand['ot_hcr_exchange'] - $hand['ot_hdb_exchange'];
$h_el                       = $hand['ot_hcr_el'] - $hand['ot_hdb_el'];
$h_invest                   = $hand['ot_hcr_invest'] - $hand['ot_hdb_invest'];
$h_contra                   = $hand['ot_hcr_bank_withdraw'] - $hand['ot_hcr_bank_deposit'];
$h_till_now_collection      = $hand['till_now_hand_collection'];
$h_till_now_loan_issued     = $hand['till_now_hand_loan_issued'];
$h_till_now_hand_expense    = $hand['till_now_hand_hexpense'];
$hand_other_income          = $hand['ot_hcr_other_income'];

$bankData = $records['banks'];
$bank_total_collection = 0;
$bank_total_loan_issed = 0;
$bank_total_expense = 0;

foreach ($records['banks'] as $bank) {
    $bank_total_collection += (float) $bank['total_collection'];
    $bank_total_loan_issed += (float) $bank['total_loan_issued'];
    $bank_total_expense += (float) $bank['bexpense_amt_upto_date'];
}

$collection_till_now = $h_till_now_collection + $bank_total_collection;
$loan_issue_till_now = $h_till_now_loan_issued + $bank_total_loan_issed;
$expense_till_now = $h_till_now_hand_expense + $bank_total_expense;

?>

<table class="table custom-table">
    <thead>
        <th width='150'></th>
        <th>Hand Cash</th>
        <?php foreach ($record['banks'] as $bank): ?>
            <th><?php echo $bank['bank_name']; ?></th>
        <?php endforeach; ?>
        <th>Total</th>
        <th>Till Now</th>
    </thead>

    <tbody>
        <tr>
            <td><b>Opening Balance</b></td>
            <td><?php echo moneyFormatIndia($hand_opening_balance); ?></td>
            <?php
            $total = $hand_opening_balance;
            foreach ($record['banks'] as $bank):
                $total += $bank['bank_opening'];
            ?>
                <td><?php echo moneyFormatIndia($bank['bank_opening']); ?></td>
            <?php endforeach; ?>
            <td><?php echo moneyFormatIndia($total); ?></td>
            <td></td>
        </tr>

        <tr>
            <td><b>Collection</b></td>
            <td><?php echo moneyFormatIndia($h_collection); ?></td>
            <?php
            $total_collection = $h_collection;
            foreach ($bankData as $bank):
                $total_collection += $bank['collection_on_date'];
            ?>
                <td><?php echo moneyFormatIndia($bank['collection_on_date']); ?></td>
            <?php endforeach; ?>
            <td><?php echo moneyFormatIndia($total_collection); ?></td>
            <td><?php echo moneyFormatIndia($collection_till_now); ?></td>
        </tr>

        <tr>
            <td><b>Deposit</b></td>
            <td><?php echo moneyFormatIndia($h_deposite); ?></td>
            <?php
            $total_deposite = $h_deposite;
            foreach ($bankData as $bank):
                $diff = $bank['db_deposit_amt'];
                $total_deposite += $diff;
            ?>
                <td><?php echo moneyFormatIndia($diff); ?></td>
            <?php endforeach; ?>
            <td><?php echo moneyFormatIndia($total_deposite); ?></td>
            <td></td>
        </tr>

        <tr>
            <td><b>Exchange</b></td>
            <td><?php echo moneyFormatIndia($h_exchange); ?></td>
            <?php
            $total_exchange = $h_exchange;
            foreach ($bankData as $bank):
                $diff = $bank['cr_bexchange'] - $bank['db_bexchange'];
                $total_exchange += $diff;
            ?>
                <td><?php echo moneyFormatIndia($diff); ?></td>
            <?php endforeach; ?>
            <td><?php echo moneyFormatIndia($total_exchange); ?></td>
            <td></td>
        </tr>

        <tr>
            <td><b>EL</b></td>
            <td><?php echo moneyFormatIndia($h_el); ?></td>
            <?php
            $total_el = $h_el;
            foreach ($bankData as $bank):
                $diff = $bank['cr_bel_amt_on_date'] - $bank['db_bel_amt_on_date'];
                $total_el += $diff;
            ?>
                <td><?php echo moneyFormatIndia($diff); ?></td>
            <?php endforeach; ?>
            <td><?php echo moneyFormatIndia($total_el); ?></td>
            <td></td>
        </tr>

        <tr>
            <td><b>Investment</b></td>
            <td><?php echo moneyFormatIndia($h_invest); ?></td>
            <?php
            $total_invest = $h_invest;
            foreach ($bankData as $bank):
                $diff = $bank['cr_binvest'] - $bank['db_binvest'];
                $total_invest += $diff;
            ?>
                <td><?php echo moneyFormatIndia($diff); ?></td>
            <?php endforeach; ?>
            <td><?php echo moneyFormatIndia($total_invest); ?></td>
            <td></td>
        </tr>

        <tr>
            <td><b>Other Income</b></td>
            <td><?php echo moneyFormatIndia($hand_other_income); ?></td>
            <?php
            $total_other_income = $hand_other_income;
            foreach ($bankData as $bank):
                $total_other_income += $bank['bank_other_income'];
            ?>
                <td><?php echo moneyFormatIndia($bank['bank_other_income']); ?></td>
            <?php endforeach; ?>
            <td><?php echo moneyFormatIndia($total_other_income); ?></td>
            <td></td>
        </tr>

        <tr>
            <td><b>Contra</b></td>
            <td><?php echo moneyFormatIndia($h_contra); ?></td>
            <?php
            $total_contra = $h_contra;
            foreach ($bankData as $bank):
                $diff = 0;
            ?>
                <td><?php echo moneyFormatIndia($diff); ?></td>
            <?php endforeach; ?>
            <td><?php echo moneyFormatIndia($total_contra); ?></td>
            <td></td>
        </tr>

        <tr>
            <td><b>Bank Unbilled</b></td>
            <td><?php echo moneyFormatIndia(0); ?></td>
            <?php
            $total_exchange = $h_exchange;
            foreach ($bankData as $bank):
                $diff = $bank['cr_bUnBilled'] - $bank['db_bUnBilled'];
                $total_exchange += $diff;
            ?>
                <td><?php echo moneyFormatIndia($diff); ?></td>
            <?php endforeach; ?>
            <td><?php echo moneyFormatIndia($total_exchange); ?></td>
            <td></td>
        </tr>

        <tr>
            <td><b>Loan Issue</b></td>
            <td><?php echo moneyFormatIndia(-$h_issued); ?></td>
            <?php
            $total_loan_issue = $h_issued;
            foreach ($bankData as $bank):
                $total_loan_issue += $bank['loan_issue_on_date'];
            ?>
                <td><?php echo moneyFormatIndia(-$bank['loan_issue_on_date']); ?></td>
            <?php endforeach; ?>
            <td><?php echo moneyFormatIndia(-$total_loan_issue); ?></td>
            <td><?php echo moneyFormatIndia(-$loan_issue_till_now); ?></td>
        </tr>

        <tr>
            <td><b>Expenses</b></td>
            <td><?php echo moneyFormatIndia(-$h_hand_expense); ?></td>
            <?php
            $total_exp = $h_hand_expense;
            foreach ($bankData as $bank):
                $total_exp += $bank['bexpense_amt'];
            ?>
                <td><?php echo moneyFormatIndia(-$bank['bexpense_amt']); ?></td>
            <?php endforeach; ?>
            <td><?php echo moneyFormatIndia(-$total_exp); ?></td>
            <td><?php echo moneyFormatIndia(-$expense_till_now); ?></td>
        </tr>
    </tbody>

    <tfoot>
        <tr style="font-weight:bold; background:#f0f0f0;">
            <td>Closing Balance</td>

            <td>
                <?php
                $hand_total = $hand_closing_balance;
                echo moneyFormatIndia($hand_total);
                ?>
            </td>

            <?php
            $grand_total = $hand_total;

            foreach ($closing_record['banks'] as $bank) {
                $bank_closing = $bank['bank_closing'] + $bank_opening;

                $grand_total += $bank_closing;

                echo "<td>" . moneyFormatIndia($bank_closing) . "</td>";
            }
            ?>

            <td><?php echo moneyFormatIndia($grand_total); ?></td>
            <td></td>
        </tr>
    </tfoot>

</table>

<?php

// Function to get opening balance
function getOpeningBalance($pdo, $full_date, $bank_detail)
{
    $record = [];

    // HAND CASH OPENING
    // Include transactions before the selected date.

    $handCreditQry = $pdo->prepare("SELECT
            (
                SELECT COALESCE(SUM(collection_amnt), 0)
                FROM accounts_collect_entry
                WHERE coll_mode = 1 AND DATE(created_on) < :date1
            ) +
            (
                SELECT COALESCE(SUM(waiver_amount), 0)
                FROM accounts_waiver_entry
                WHERE coll_mode = 1 AND DATE(created_on) < :date2
            ) +
            (
                SELECT COALESCE(SUM(amount), 0)
                FROM other_transaction
                WHERE coll_mode = 1
                AND type = 1 AND DATE(created_on) < :date3
            ) AS hand_credits
    ");

    $handCreditQry->execute([
        ':date1' => $full_date,
        ':date2' => $full_date,
        ':date3' => $full_date
    ]);

    $handCredit = (float) $handCreditQry->fetchColumn();

    // HAND CASH DEBIT
    $handDebitQry = $pdo->prepare("SELECT
            (
                SELECT COALESCE(SUM(amount), 0)
                FROM expenses
                WHERE coll_mode = 1 AND DATE(created_on) < :date1
            ) +
            (
                SELECT COALESCE(SUM(amount), 0)
                FROM other_transaction
                WHERE coll_mode = 1 AND type = 2 AND DATE(created_on) < :date2
            ) +
            (
                SELECT COALESCE(SUM(cash), 0)
                FROM loan_issue
                WHERE DATE(created_on) < :date3
            ) AS hand_debits
    ");

    $handDebitQry->execute([
        ':date1' => $full_date,
        ':date2' => $full_date,
        ':date3' => $full_date
    ]);

    $handDebit = (float) $handDebitQry->fetchColumn();

    $record['hand_opening'] = $handCredit - $handDebit;

    // BANK OPENING: GET THE LATEST BALANCE FOR EACH BANK
    $record['banks'] = [];
    $record['bank_opening'] = 0;

    foreach ($bank_detail as $val) {

        $bankNameQry = $pdo->prepare("SELECT bank_name FROM bank_creation WHERE id = :bank_id");

        $bankNameQry->execute([':bank_id' => $val]);

        $bank_name = $bankNameQry->fetchColumn();

        $bankQry = $pdo->prepare("SELECT balance FROM bank_clearance
            WHERE bank_id = :bank_id
            AND DATE(trans_date) < :full_date
            ORDER BY trans_date DESC, id DESC
            LIMIT 1
        ");

        $bankQry->execute([
            ':bank_id' => $val,
            ':full_date' => $full_date
        ]);

        $row = $bankQry->fetch(PDO::FETCH_ASSOC);

        $bank_opening = ($row !== false)
            ? (float) $row['balance']
            : 0;

        $record['banks'][] = [
            'bank_id' => $val,
            'bank_name' => $bank_name,
            'bank_opening' => $bank_opening
        ];

        // Add each bank's latest balance to the total.
        $record['bank_opening'] += $bank_opening;
    }

    // TOTAL OPENING BALANCE
    $record['opening_balance'] = $record['hand_opening'] + $record['bank_opening'];

    return $record;
}

// Function to get closing balance
function getClosingBalance($pdo, $full_date, $bank_detail)
{
    $record = [];

    // HAND CASH CREDIT
    $handCreditQry = $pdo->prepare("SELECT
            (
                SELECT COALESCE(SUM(collection_amnt), 0)
                FROM accounts_collect_entry
                WHERE coll_mode = 1 AND DATE(created_on) = :date1
            ) +
            (
                SELECT COALESCE(SUM(waiver_amount), 0)
                FROM accounts_waiver_entry
                WHERE coll_mode = 1 AND DATE(created_on) = :date2
            ) +
            (
                SELECT COALESCE(SUM(amount), 0)
                FROM other_transaction
                WHERE coll_mode = 1 AND type = 1 AND DATE(created_on) = :date3
            ) AS hand_credits
    ");

    $handCreditQry->execute([
        ':date1' => $full_date,
        ':date2' => $full_date,
        ':date3' => $full_date
    ]);

    $handCredit = (float) $handCreditQry->fetchColumn();

    // HAND CASH DEBIT
    $handDebitQry = $pdo->prepare("SELECT
            (
                SELECT COALESCE(SUM(amount), 0)
                FROM expenses
                WHERE coll_mode = 1 AND DATE(created_on) = :date1
            ) +
            (
                SELECT COALESCE(SUM(amount), 0)
                FROM other_transaction
                WHERE coll_mode = 1 AND type = 2 AND DATE(created_on) = :date2
            ) +
            (
                SELECT COALESCE(SUM(cash), 0)
                FROM loan_issue
                WHERE DATE(created_on) = :date3
            ) AS hand_debits
    ");

    $handDebitQry->execute([
        ':date1' => $full_date,
        ':date2' => $full_date,
        ':date3' => $full_date
    ]);

    $handDebit = (float) $handDebitQry->fetchColumn();

    $record['hand_cash_closing'] = $handCredit - $handDebit;

    // BANK CLOSING: LATEST BALANCE FOR EACH BANK ON THE SELECTED DATE
    $record['banks'] = [];
    $record['bank_cash_closing'] = 0;

    foreach ($bank_detail as $val) {

        $bankNameQry = $pdo->prepare("SELECT bank_name FROM bank_creation WHERE id = :bank_id");

        $bankNameQry->execute([':bank_id' => $val]);

        $bank_name = $bankNameQry->fetchColumn();

        $bankQry = $pdo->prepare("SELECT balance FROM bank_clearance
            WHERE bank_id = :bank_id
            AND DATE(trans_date) = :full_date
            ORDER BY trans_date DESC, id DESC
            LIMIT 1
        ");

        $bankQry->execute([':bank_id' => $val, ':full_date' => $full_date]);

        $row = $bankQry->fetch(PDO::FETCH_ASSOC);

        $bank_closing = ($row !== false) ? (float) $row['balance'] : 0;

        $record['banks'][] = [
            'bank_id' => $val,
            'bank_name' => $bank_name,
            'bank_closing' => $bank_closing
        ];

        $record['bank_cash_closing'] += $bank_closing;
    }

    // TOTAL CLOSING BALANCE
    $record['closing_balance'] = $record['hand_cash_closing'] + $record['bank_cash_closing'];

    return $record;
}

// Function to get other transaction balance
function getOtherTransactionBalance($pdo, $full_date, $bank_detail, $till_now_date)
{
    $bank_detail = implode(',', $bank_detail);

    $handcollection = $pdo->query("SELECT
    (SELECT COALESCE(SUM(collection_amnt), 0) FROM accounts_collect_entry WHERE date(created_on) = '$full_date') AS accounts_collect_entry,
    (SELECT COALESCE(SUM(net_cash), 0) FROM loan_issue WHERE date(created_on) = '$full_date') AS loan_issue,
    (SELECT COALESCE(SUM(amount), 0) FROM expenses WHERE date(created_on) = '$full_date') AS expenses,
    (SELECT COALESCE(SUM(amount), 0) FROM other_transaction WHERE trans_cat = '1' AND coll_mode = '1' AND type = '1' AND date(created_on) = '$full_date') AS ot_hcr_deposit,
    (SELECT COALESCE(SUM(amount), 0) FROM other_transaction WHERE trans_cat = '1' AND coll_mode = '1' AND type = '2' AND date(created_on) = '$full_date') AS ot_hdb_deposit,
    (SELECT COALESCE(SUM(amount), 0) FROM other_transaction WHERE trans_cat = '2' AND coll_mode = '1' AND type = '1' AND date(created_on) = '$full_date') AS ot_hcr_invest,
    (SELECT COALESCE(SUM(amount), 0) FROM other_transaction WHERE trans_cat = '2' AND coll_mode = '1' AND type = '2' AND date(created_on) = '$full_date') AS ot_hdb_invest,
    (SELECT COALESCE(SUM(amount), 0) FROM other_transaction WHERE trans_cat = '3' AND coll_mode = '1' AND type = '1' AND date(created_on) = '$full_date') AS ot_hcr_el,
    (SELECT COALESCE(SUM(amount), 0) FROM other_transaction WHERE trans_cat = '3' AND coll_mode = '1' AND type = '2' AND date(created_on) = '$full_date') AS ot_hdb_el,
    (SELECT COALESCE(SUM(amount), 0) FROM other_transaction WHERE trans_cat = '4' AND coll_mode = '1' AND type = '1' AND date(created_on) = '$full_date') AS ot_hcr_exchange,
    (SELECT COALESCE(SUM(amount), 0) FROM other_transaction WHERE trans_cat = '4' AND coll_mode = '1' AND type = '2' AND date(created_on) = '$full_date') AS ot_hdb_exchange,
    (SELECT COALESCE(SUM(amount), 0) FROM other_transaction WHERE trans_cat = '5' AND coll_mode = '1' AND type = '2' AND date(created_on) = '$full_date') AS ot_hcr_bank_deposit,
    (SELECT COALESCE(SUM(amount), 0) FROM other_transaction WHERE trans_cat = '6' AND coll_mode = '1' AND type = '1' AND date(created_on) = '$full_date') AS ot_hcr_bank_withdraw,
    (SELECT COALESCE(SUM(amount), 0) FROM other_transaction WHERE trans_cat = '8' AND coll_mode = '1' AND type = '1' AND date(created_on) = '$full_date') AS ot_hcr_other_income,

    (SELECT COALESCE(SUM(collection_amnt), 0) FROM accounts_collect_entry WHERE DATE(created_on) BETWEEN '$till_now_date 00:00:00 ' AND '$full_date 23:59:59') AS till_now_hand_collection,

    (SELECT COALESCE(SUM(net_cash), 0) FROM loan_issue WHERE DATE(created_on) BETWEEN '$till_now_date 00:00:00 ' AND '$full_date 23:59:59') AS till_now_hand_loan_issued,

    (SELECT COALESCE(SUM(amount), 0) FROM expenses WHERE DATE(created_on) BETWEEN '$till_now_date 00:00:00 ' AND '$full_date 23:59:59') AS till_now_hand_hexpense
    
");

    $handCollection = $handcollection->fetch(PDO::FETCH_ASSOC);

    $bankQry = $pdo->query("SELECT
    bn.bank_name,
    bn.id AS bank_id,
    
    COALESCE(bc_on.collection_on_date, 0)       AS collection_on_date,
    COALESCE(bi_on.loan_issue_on_date, 0)       AS loan_issue_on_date,
    COALESCE(be_on.bexpense_amt, 0)             AS bexpense_amt,
    COALESCE(bd_on.db_deposit_amt, 0)           AS db_deposit_amt,
    COALESCE(bex_on.cr_bexchange, 0)            AS cr_bexchange,
    COALESCE(dbex_on.db_bexchange, 0)           AS db_bexchange,
    COALESCE(bel_on.cr_bel_amt_on_date, 0)      AS cr_bel_amt_on_date,
    COALESCE(dbel_on.db_bel_amt_on_date, 0)     AS db_bel_amt_on_date,
    COALESCE(crinv_on.cr_binvest, 0)            AS cr_binvest,
    COALESCE(dbinv_on.db_binvest, 0)            AS db_binvest,
    COALESCE(boti_on.bank_other_income, 0)      AS bank_other_income,
    COALESCE(bunbill_on.cr_bUnBilled, 0)        AS cr_bUnBilled,
    COALESCE(dbunbill_on.db_bUnBilled, 0)       AS db_bUnBilled,

    total_coll.total_collection,
    total_loan.total_loan_issued,
    total_bexp.bexpense_amt_upto_date

FROM bank_creation bn

LEFT JOIN (SELECT bank_id, SUM(CASE WHEN DATE(created_date) = '$full_date' THEN total_paid_track END) AS collection_on_date FROM collection WHERE 1 GROUP BY bank_id ) bc_on    ON bc_on.bank_id = bn.id

LEFT JOIN ( SELECT bank_name, SUM(CASE WHEN DATE(created_on) = '$full_date' THEN COALESCE(cheque_val, 0) + COALESCE(transaction_val, 0) END) AS loan_issue_on_date FROM loan_issue WHERE 1 GROUP BY bank_name ) bi_on ON bi_on.bank_name = bn.id

LEFT JOIN ( SELECT bank_id, SUM(CASE WHEN created_on = '$full_date' THEN amount END) AS bexpense_amt FROM expenses WHERE 1 GROUP BY bank_id ) be_on  ON be_on.bank_id = bn.id

LEFT JOIN ( SELECT bank_id, SUM(CASE WHEN created_on = '$full_date' THEN amount END) AS cr_binvest FROM other_transaction WHERE trans_cat = '2' AND coll_mode = '2' AND type = '1' GROUP BY bank_id ) crinv_on ON crinv_on.bank_id = bn.id

LEFT JOIN ( SELECT bank_id, SUM(CASE WHEN created_on = '$full_date' THEN amount END) AS db_binvest FROM other_transaction WHERE trans_cat = '2' AND coll_mode = '2' AND type = '2' GROUP BY bank_id ) dbinv_on ON dbinv_on.bank_id = bn.id

LEFT JOIN ( SELECT bank_id, SUM(CASE WHEN created_on = '$full_date' THEN amount END) AS cr_bel_amt_on_date FROM other_transaction WHERE trans_cat = '3' AND coll_mode = '2' AND type = '1' GROUP BY bank_id ) bel_on ON bel_on.bank_id = bn.id

LEFT JOIN ( SELECT bank_id, SUM(CASE WHEN created_on = '$full_date' THEN amount END) AS db_bel_amt_on_date FROM other_transaction WHERE trans_cat = '3' AND coll_mode = '2' AND type = '2' GROUP BY bank_id ) dbel_on ON dbel_on.bank_id = bn.id

LEFT JOIN ( SELECT bank_id AS bank_id, SUM(CASE WHEN created_on = '$full_date' THEN amount END) AS cr_bexchange FROM other_transaction WHERE trans_cat = '4' AND coll_mode = '2' AND type = '1' GROUP BY bank_id ) bex_on ON bex_on.bank_id = bn.id

LEFT JOIN ( SELECT bank_id AS bank_id, SUM(CASE WHEN created_on = '$full_date' THEN amount END) AS db_bexchange FROM other_transaction WHERE trans_cat = '4' AND coll_mode = '2' AND type = '2' GROUP BY bank_id ) dbex_on ON dbex_on.bank_id = bn.id

LEFT JOIN ( SELECT bank_id, SUM(CASE WHEN created_on = '$full_date' THEN amount END) AS db_deposit_amt FROM other_transaction WHERE trans_cat = '5' AND coll_mode = '2' AND type = '2' GROUP BY bank_id ) bd_on  ON bd_on.bank_id = bn.id

LEFT JOIN ( SELECT bank_id AS bank_id, SUM(CASE WHEN created_on = '$full_date' THEN amount END) AS bank_other_income FROM other_transaction WHERE trans_cat = '8' AND coll_mode = '2' AND type = '1' GROUP BY bank_id ) boti_on ON boti_on.bank_id = bn.id

LEFT JOIN ( SELECT bank_id AS bank_id, SUM(CASE WHEN created_on = '$full_date' THEN amount END) AS cr_bUnBilled FROM other_transaction WHERE trans_cat = '9' AND coll_mode = '2' AND type = '1' GROUP BY bank_id ) bunbill_on ON bunbill_on.bank_id = bn.id

LEFT JOIN ( SELECT bank_id AS bank_id, SUM(CASE WHEN created_on = '$full_date' THEN amount END) AS db_bUnBilled FROM other_transaction WHERE trans_cat = '9' AND coll_mode = '2' AND type = '2' GROUP BY bank_id ) dbunbill_on ON dbunbill_on.bank_id = bn.id

-- cumulative subqueries
LEFT JOIN ( SELECT bank_id, COALESCE(SUM(total_paid_track),0) AS total_collection FROM collection WHERE 1 AND DATE(created_date) BETWEEN '$till_now_date 00:00:00 ' AND '$full_date 23:59:59' AND bank_id IN ($bank_detail)  GROUP BY bank_id ) total_coll ON total_coll.bank_id = bn.id

LEFT JOIN ( SELECT bank_name, COALESCE(SUM(COALESCE(cheque_val, 0) + COALESCE(transaction_val, 0)),0) AS total_loan_issued FROM loan_issue WHERE 1 AND DATE(created_on) BETWEEN '$till_now_date 00:00:00 ' AND '$full_date 23:59:59'AND bank_name IN ($bank_detail) GROUP BY bank_name ) total_loan  ON total_loan.bank_name = bn.id

LEFT JOIN ( SELECT bank_id, COALESCE(SUM(amount),0) AS bexpense_amt_upto_date FROM expenses WHERE 1 AND DATE(created_on) BETWEEN '$till_now_date 00:00:00 ' AND '$full_date 23:59:59'AND bank_id IN ($bank_detail) GROUP BY bank_id ) total_bexp  ON total_bexp.bank_id = bn.id

WHERE bn.id IN ($bank_detail)
ORDER BY bn.id;

");

    $banks = [];
    while ($bank = $bankQry->fetch(PDO::FETCH_ASSOC)) {
        $banks[] = $bank; // Append each row directly
    }

    return [
        'hand_summary' => $handCollection,
        'banks' => $banks
    ];
}

// Close the database connection
$pdo = null;
?>