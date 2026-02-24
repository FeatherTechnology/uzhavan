<?php
include("../../../ajaxconfig.php");
@session_start();

$user_id = $_SESSION["user_id"];
/* =============================== DATE PARSER =============================== */
function parseExcelDate($value)
{
    if (empty($value)) return null;

    $value = trim($value);

    // 1️⃣ Excel numeric date
    if (is_numeric($value) && $value > 59) {
        $unixTimestamp = ($value - 25569) * 86400;
        $dt = new DateTime("@$unixTimestamp");
        $dt->setTimezone(new DateTimeZone('Asia/Kolkata'));
        return $dt;
    }

    // 2️⃣ ISO string date
    $dt = DateTime::createFromFormat(
        'Y-m-d H:i:s',
        $value,
        new DateTimeZone('Asia/Kolkata')
    );

    if ($dt !== false) {
        return $dt;
    }

    return null;
}
/* =============================== END DATE PARSER =============================== */

$bank_id   = $_POST['bank_id'];
$bank_name = $_POST['bank_short_name'] ?? '';

$response = [
    'status'    => 'error',
    'inserted'  => 0,
    'error_row' => null,
    'message'   => ''
];

$inserted = 0;
$excel_row_no = 0;
$last_balance_qry = $pdo->query(" SELECT balance FROM bank_clearance WHERE bank_id = '$bank_id' ORDER BY id DESC LIMIT 1 ");

$running_balance = ($row = $last_balance_qry->fetch(PDO::FETCH_ASSOC)) ? floatval($row['balance']) : 0;

require_once('../../../vendor/csvreader/php-excel-reader/excel_reader2.php');
require_once('../../../vendor/csvreader/SpreadsheetReader.php');
if (isset($_FILES["file"]["type"])) {

    $allowedFileType = [
        'application/vnd.ms-excel',
        'text/xls',
        'text/xlsx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (in_array($_FILES["file"]["type"], $allowedFileType)) {
       

        $targetPath = '../../../uploads/bank_stmt/' . $_FILES['file']['name'];
        move_uploaded_file($_FILES['file']['tmp_name'], $targetPath);

        $Reader = new SpreadsheetReader($targetPath);
        $sheetCount = count($Reader->sheets());

        for ($i = 0; $i < $sheetCount; $i++) {
            $Reader->ChangeSheet($i);

            foreach ($Reader as $Row) {
                $excel_row_no++;

                // Skip header
                if (empty($Row[0]) || stripos($Row[0], 'date') !== false) {
                    continue;
                }

                /* =============================== DATE =============================== */
                $dt = parseExcelDate($Row[0]);
                if (!$dt){
                     echo json_encode([
                        'status'    => 'error',
                        'inserted'  => $inserted,
                        'error_row' => $excel_row_no,
                        'message'   => "Invalid date Time format at row $excel_row_no"
                    ]);
                    exit;
                };

                $trans_datetime    = $dt->format('Y-m-d H:i:s');
                $trans_date        = $dt->format('Y-m-d');
                $trans_date_for_id = $dt->format('dmY');

                /* =============================== VALUES =============================== */
                $narration = isset($Row[1]) ? $pdo->quote(trim($Row[1])) : "''";
                $credit    = isset($Row[2]) ? floatval(str_replace(',', '', $Row[2])) : 0;
                $debit     = isset($Row[3]) ? floatval(str_replace(',', '', $Row[3])) : 0;
                $excel_balance = isset($Row[4]) ? floatval(str_replace(',', '', $Row[4])) : 0;

                if ($credit <= 0 && $debit <= 0) continue;

                /* =============================== BALANCE CHECK =============================== */
                $expected_balance = $running_balance + $credit - $debit;

                if (round($expected_balance, 2) != round($excel_balance, 2)) {
                    echo json_encode([
                        'status'    => 'balance_mismatch',
                        'inserted'  => $inserted,
                        'error_row' => $excel_row_no,
                        'message'   => "Balance mismatch at row $excel_row_no"
                    ]);
                    exit;
                }

                /* =============================== TRANS ID =============================== */
                $type = ($credit > 0) ? 'CR' : 'DB';

                $run_qry = $pdo->query("
                    SELECT MAX(CAST(SUBSTRING_INDEX(trans_id, '-', -1) AS UNSIGNED)) AS last_no
                    FROM bank_clearance
                    WHERE bank_id = '$bank_id'
                    AND DATE(trans_date) = '$trans_date'
                    AND trans_id LIKE '{$bank_name}{$type}-%'
                ");

                $last_no = $run_qry->fetch(PDO::FETCH_ASSOC)['last_no'] ?? 0;
                $run_no  = str_pad($last_no + 1, 3, '0', STR_PAD_LEFT);

                $auto_trans_id = $pdo->quote(
                    $bank_name . $type . '-' . $trans_date_for_id . '-' . $run_no
                );

                $transaction_amount = ($credit > 0) ? $credit : $debit;
                /* =============================== INSERT =============================== */
                $insert = $pdo->query("
                    INSERT INTO bank_clearance (
                        bank_id, trans_date, narration, trans_id,
                        credit, debit, balance, transaction_amount,
                        insert_login_id, created_date
                    ) VALUES (
                        '$bank_id', '$trans_datetime', $narration, $auto_trans_id,
                        '$credit', '$debit', '$excel_balance', '$transaction_amount',
                        '$user_id', NOW()
                    )
                ");

                if ($insert) {
                    $inserted++;
                    $running_balance = $excel_balance;
                }
            }
        }

        // ✅ Success Response
        echo json_encode([
            'status'   => 'success',
            'inserted' => $inserted,
            'message'  => 'All rows inserted successfully'
        ]);

    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid file type']);
    }

} else {
    echo json_encode(['status' => 'error', 'message' => 'No file uploaded']);
}

$pdo = null;
?>
