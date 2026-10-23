
<?php
include '../../../ajaxconfig.php';

$to_date = $_POST['to_date'] ?? date('Y-m-d');

/* ---------------- GET ALL BANK IDS ---------------- */

$bankQry = $pdo->query("SELECT id FROM bank_creation ORDER BY id");
$bank_ids = $bankQry->fetchAll(PDO::FETCH_COLUMN);

/* ---------------- OPENING BALANCE FUNCTION ---------------- */

function getOpeningBalance($pdo, $op_date, $bank_ids)
{
    $record = [];

    /* ---------------- HAND CASH CREDIT ---------------- */

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
                WHERE coll_mode = 1 AND type = 1 AND DATE(created_on) < :date3
            ) AS hand_credit
    ");

    $handCreditQry->execute([
        ':date1' => $op_date,
        ':date2' => $op_date,
        ':date3' => $op_date
    ]);

    $handCredit = (float) $handCreditQry->fetchColumn();

    /* ---------------- HAND CASH DEBIT ---------------- */

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
            ) AS hand_debit
    ");

    $handDebitQry->execute([
        ':date1' => $op_date,
        ':date2' => $op_date,
        ':date3' => $op_date
    ]);

    $handDebit = (float) $handDebitQry->fetchColumn();

    /* ---------------- HAND CASH OPENING ---------------- */

    $hand_opening = $handCredit - $handDebit;

    /* ---------------- BANK OPENING BALANCE ---------------- */

    $bank_total = 0;

    $bankStmt = $pdo->prepare("SELECT balance FROM bank_clearance
        WHERE bank_id = :bank_id 
        AND DATE(trans_date) < :op_date
        ORDER BY trans_date DESC, id DESC
        LIMIT 1
    ");

    foreach ($bank_ids as $bank_id) {

        $bankStmt->execute([
            ':bank_id' => $bank_id,
            ':op_date' => $op_date
        ]);

        $balance = $bankStmt->fetchColumn();

        if ($balance !== false) {
            $bank_total += (float) $balance;
        }
    }

    /* ---------------- FINAL RECORD ---------------- */

    $record['hand_opening'] = round($hand_opening, 2);
    $record['bank_opening'] = round($bank_total, 2);

    $record['total_opening'] = round(
        $record['hand_opening'] + $record['bank_opening'],
        2
    );

    return $record;
}

/* ---------------- GET DATA & SEND RESPONSE ---------------- */

$opening = getOpeningBalance($pdo, $to_date, $bank_ids);

$response = [
    "data" => [
        [
            "sno"           => 1,
            "opening_label" => "Opening Balance",
            "hand_cash"     => $opening['hand_opening'],
            "bank_cash"     => $opening['bank_opening'],
            "total"         => $opening['total_opening']
        ]
    ]
];

header('Content-Type: application/json');
echo json_encode($response);
?>
