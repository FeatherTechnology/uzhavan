
<?php
include '../../../ajaxconfig.php';

$to_date = $_POST['to_date'] ?? date('Y-m-d');

$data = [];

/* ---------------- HAND CASH CREDIT ---------------- */

$handCreditQry = $pdo->prepare("SELECT
        (
            SELECT COALESCE(SUM(collection_amnt), 0)
            FROM accounts_collect_entry
            WHERE coll_mode = 1 AND DATE(created_on) <= :date1
        ) +
        (
            SELECT COALESCE(SUM(waiver_amount), 0)
            FROM accounts_waiver_entry
            WHERE coll_mode = 1 AND DATE(created_on) <= :date2
        ) +
        (
            SELECT COALESCE(SUM(amount), 0)
            FROM other_transaction
            WHERE coll_mode = 1 AND type = 1 AND DATE(created_on) <= :date3
        ) AS hand_credit
");

$handCreditQry->execute([
    ':date1' => $to_date,
    ':date2' => $to_date,
    ':date3' => $to_date
]);

$handCredit = (float) $handCreditQry->fetchColumn();

/* ---------------- HAND CASH DEBIT ---------------- */

$handDebitQry = $pdo->prepare("SELECT
        (
            SELECT COALESCE(SUM(amount), 0)
            FROM expenses
            WHERE coll_mode = 1 AND DATE(created_on) <= :date1
        ) +
        (
            SELECT COALESCE(SUM(amount), 0)
            FROM other_transaction
            WHERE coll_mode = 1 AND type = 2 AND DATE(created_on) <= :date2
        ) +
        (
            SELECT COALESCE(SUM(cash), 0)
            FROM loan_issue
            WHERE DATE(created_on) <= :date3
        ) AS hand_debit
");

$handDebitQry->execute([
    ':date1' => $to_date,
    ':date2' => $to_date,
    ':date3' => $to_date
]);

$handDebit = (float) $handDebitQry->fetchColumn();

/* ---------------- BANK CASH CLOSING ---------------- */

$bank_total = 0;

$bankQry = $pdo->query("SELECT id FROM bank_creation");

$bankStmt = $pdo->prepare("SELECT balance FROM bank_clearance
    WHERE bank_id = :bank_id
    AND DATE(trans_date) <= :to_date
    ORDER BY trans_date DESC, id DESC
    LIMIT 1
");

while ($bank = $bankQry->fetch(PDO::FETCH_ASSOC)) {

    $bankStmt->execute([
        ':bank_id' => $bank['id'],
        ':to_date' => $to_date
    ]);

    $balance = $bankStmt->fetchColumn();

    if ($balance !== false) {
        $bank_total += (float) $balance;
    }
}

$bank_closing = round($bank_total, 2);

/* ---------------- FINAL CLOSING BALANCE ---------------- */

$hand_closing = round($handCredit - $handDebit, 2);

$data[] = [
    "sno"           => 1,
    "closing_label" => "Closing Balance",
    "hand_cash"     => $hand_closing,
    "bank_cash"     => $bank_closing,
    "total"         => round($hand_closing + $bank_closing, 2)
];

header('Content-Type: application/json');

echo json_encode(["data" => $data]);
?>
