<?php
require '../../../ajaxconfig.php';

$id = $_POST['id'];

try {

    $pdo->beginTransaction();

    /* 🔹 Get Expense Data */
    $expStmt = $pdo->prepare("
        SELECT id, amount, bank_id, trans_id, history_id 
        FROM other_transaction 
        WHERE id = :id
    ");

    $expStmt->execute([':id' => $id]);
    $otherData = $expStmt->fetch(PDO::FETCH_ASSOC);

    if (!$otherData) {
        throw new Exception("Other transaction record not found");
    }

    $amt        = (float)$otherData['amount'];
    $bank_id    = $otherData['bank_id'];
    $trans_id   = $otherData['trans_id'];
    $history_id = $otherData['history_id'];

    /* ===========================================
       IF BANK MODE → Reverse Bank Transaction
    ============================================*/
    if (!empty($bank_id)) {

        /* 🔹 Get Bank Clearance */
        $bankStmt = $pdo->prepare("
            SELECT id, transaction_amount 
            FROM bank_clearance 
            WHERE bank_id = :bank_id 
            AND trans_id = :trans_id
            LIMIT 1
        ");

        $bankStmt->execute([
            ':bank_id' => $bank_id,
            ':trans_id' => $trans_id
        ]);

        $bankData = $bankStmt->fetch(PDO::FETCH_ASSOC);

        if (!$bankData) {
            throw new Exception("Bank transaction not found");
        }

        $currentValue = (float)$bankData['transaction_amount'];
        $clearance_id = $bankData['id'];

        /* 🔹 Add Back Amount */
        $newValue = $currentValue + $amt;

        /* 🔹 Update Bank Clearance */
        $updateStmt = $pdo->prepare("
            UPDATE bank_clearance
            SET transaction_amount = :newValue,
                clr_status = CASE WHEN ROUND(:newValue,2)=0 THEN 1 ELSE 0 END
            WHERE id = :id
        ");

        $updateStmt->execute([
            ':newValue' => $newValue,
            ':id' => $clearance_id
        ]);

        /* 🔹 Delete Cleared History */
        $deleteHistory = $pdo->prepare("
            DELETE FROM cleared_bank_stmt_history
            WHERE id = :history_id
        ");

        $deleteHistory->execute([
            ':history_id' => $history_id
        ]);
    }

    /* ===========================================
       DELETE Other Transaction (ALWAYS)
    ============================================*/
    $deleteExp = $pdo->prepare("DELETE FROM other_transaction WHERE id = :id");
    $deleteExp->execute([':id' => $id]);

    $pdo->commit();

    echo json_encode(['status' => 1]);

} catch (Exception $e) {

    $pdo->rollBack();

    echo json_encode([
        'status' => 2,
        'message' => $e->getMessage()
    ]);
}

$pdo = null;
?>


