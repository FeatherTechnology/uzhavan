<?php
require "../../../ajaxconfig.php";
@session_start();
$user_id = $_SESSION['user_id'];

$coll_mode = $_POST['coll_mode'];
$bank_id = $_POST['bank_id'];
$invoice_id = $_POST['invoice_id'];
$branch_name = $_POST['branch_name'];
$expenses_category = $_POST['expenses_category'];
$agent_name = $_POST['agent_name'];
$expenses_total_issued = $_POST['expenses_total_issued'];
$expenses_total_amnt = $_POST['expenses_total_amnt'];
$description = $_POST['description'];
$expenses_amnt = $_POST['expenses_amnt'];
$expenses_trans_id = $_POST['expenses_trans_id'];
$expenses_trans_date = !empty($_POST['expenses_trans_date'])
    ? date('Y-m-d', strtotime($_POST['expenses_trans_date']))
    : '';
// If bank mode (2), use transaction date
// Otherwise use current date
$created_on = ($coll_mode == '2') 
                ? $expenses_trans_date 
                : date('Y-m-d H:i:s');
try {

    $pdo->beginTransaction();

    /* ================= GENERATE INVOICE ================= */
    $stmt = $pdo->query("SELECT invoice_id FROM expenses WHERE invoice_id != '' ORDER BY id DESC LIMIT 1");
    $last = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($last) {
        $prefix = substr($last['invoice_id'], 0, 4);
        $number = substr($last['invoice_id'], 4, 3);
        $invoice_no_final = $prefix . str_pad($number + 1, 3, '0', STR_PAD_LEFT);
    } else {
        $invoice_no_final = date('ym') . "001";
    }

    /* ================= BANK TRANSACTION MODE ================= */
    if (!empty($bank_id)) {

        // 🔍 Check available amount
        $chkStmt = $pdo->prepare("
            SELECT transaction_amount, id 
            FROM bank_clearance 
            WHERE bank_id = :bank_id 
            AND trans_id = :trans_id 
            AND transaction_amount > 0
            LIMIT 1
        ");

        $chkStmt->execute([
            ':bank_id' => $bank_id,
            ':trans_id' => $expenses_trans_id
        ]);

        $chk = $chkStmt->fetch(PDO::FETCH_ASSOC);

        if (!$chk) {
            throw new Exception("Invalid Transaction Id");
        }

        $available_amt = (float)$chk['transaction_amount'];

        if ($expenses_amnt > $available_amt) {
            throw new Exception("Transaction Amount Mismatched");
        }

        $new_amount = $available_amt - $expenses_amnt;

        // ✅ Update bank statement
        $updateStmt = $pdo->prepare("
            UPDATE bank_clearance 
            SET transaction_amount = :new_amount,
                clr_status = CASE WHEN ROUND(:new_amount,2)=0 THEN 1 ELSE clr_status END,
                update_login_id = :user_id,
                updated_date = NOW()
            WHERE bank_id = :bank_id 
            AND trans_id = :trans_id
        ");

        $updateStmt->execute([
            ':new_amount' => $new_amount,
            ':user_id' => $user_id,
            ':bank_id' => $bank_id,
            ':trans_id' => $expenses_trans_id
        ]);

        // ✅ History Insert
        $historyStmt = $pdo->prepare("
            INSERT INTO cleared_bank_stmt_history
            (bank_stmt_id, transaction_amount, type, screens,insert_login_id, created_date)
            VALUES (:bank_stmt_id, :transaction_amount, 2, 'Bank Expense', :user_id, NOW())
        ");

        $historyStmt->execute([
            ':bank_stmt_id' => $chk['id'],
            ':transaction_amount' => $expenses_amnt,
            ':user_id' => $user_id
        ]);
        $history_id = $pdo->lastInsertId();
    }

    /* ================= INSERT EXPENSE ================= */
    $insertStmt = $pdo->prepare("
        INSERT INTO expenses
        (coll_mode, bank_id, invoice_id, branch, expenses_category,
         agent_id, total_issued, total_amount, description, amount,
         trans_id, trans_date, history_id, insert_login_id, created_on)
        VALUES
        (:coll_mode, :bank_id, :invoice_id, :branch, :expenses_category,
         :agent_id, :total_issued, :total_amount, :description, :amount,
         :trans_id, :trans_date, :history_id, :user_id, :created_on)
    ");

    $insertStmt->execute([
        ':coll_mode' => $coll_mode,
        ':bank_id' => $bank_id,
        ':invoice_id' => $invoice_no_final,
        ':branch' => $branch_name,
        ':expenses_category' => $expenses_category,
        ':agent_id' => $agent_name,
        ':total_issued' => $expenses_total_issued,
        ':total_amount' => $expenses_total_amnt,
        ':description' => $description,
        ':amount' => $expenses_amnt,
        ':trans_id' => $expenses_trans_id,
        ':trans_date' => $expenses_trans_date,
        ':history_id' => $history_id ?? '',
        ':user_id' => $user_id,
        ':created_on' => $created_on
    ]);


    $pdo->commit();

    echo json_encode(['status' => 'success']);

} catch (Exception $e) {

    $pdo->rollBack();
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}

$pdo = null;
?>
