<?php
require "../../../ajaxconfig.php";
@session_start();
$user_id = $_SESSION['user_id'];

$coll_mode = $_POST['coll_mode'];
$bank_id = $_POST['bank_id'];
$trans_category = $_POST['trans_category'];
$other_trans_name = $_POST['other_trans_name'];
$cat_type = $_POST['cat_type'];
$other_ref_id = $_POST['other_ref_id'];
$other_trans_id = $_POST['other_trans_id'];
// $other_user_name = $_POST['other_user_name'];
$other_amnt = $_POST['other_amnt'];
$other_remark = $_POST['other_remark'];
$other_trans_date = !empty($_POST['other_trans_date'])
    ? date('Y-m-d', strtotime($_POST['other_trans_date']))
    : '';
// If bank mode (2), use transaction date
// Otherwise use current date
$created_on = ($coll_mode == '2')
    ? $other_trans_date
    : date('Y-m-d H:i:s');

try {

    $pdo->beginTransaction();

    $transcat = ["1" => 'DEP', "2" => 'INV', "3" => 'EL', "4" => 'EXC', "5" => 'BDEP', "6" => 'BWDL', "7" => 'ADV', "8" => 'INC', "9" => 'UBL'];
    $trans = $transcat[$trans_category];

    $qry = $pdo->query("SELECT id,ref_id FROM other_transaction WHERE trans_cat ='$trans_category' AND ref_id !='' ORDER BY id DESC LIMIT 1");
    if ($qry->rowCount() > 0) {
        $last_ref_id = $qry->fetch()['ref_id'];
        $ref_s = ltrim(strstr($last_ref_id, '-'), '-');
        $ref = $ref_s + 1;
        $ref_id = $trans . '-' . $ref;
    } else {
        $ref_id = $trans . '-101';
    }

    /* ================= BANK TRANSACTION MODE ================= */
    if (!empty($bank_id)) {
        $type = ($cat_type == '1') ? 'CR' : 'DB';

        $categories = [
            '1' => 'Deposit',
            '2' => 'Investment',
            '3' => 'El',
            '4' => 'Exchange',
            '9' => 'Bank Unbilled'
        ];

        if (isset($categories[$trans_category])) {

            $screen = $categories[$trans_category] . ' ' . $type;
        } elseif ($trans_category == '5') {

            $screen = 'Bank Deposit DB';
        } elseif ($trans_category == '6') {

            $screen = 'Bank Withdrawal CR';
        } elseif ($trans_category == '8') {

            $screen = 'Other Income CR';
        } else {

            $screen = '';
        }
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
            ':trans_id' => $other_trans_id
        ]);

        $chk = $chkStmt->fetch(PDO::FETCH_ASSOC);

        if (!$chk) {
            throw new Exception("Invalid Transaction Id");
        }

        $available_amt = (float)$chk['transaction_amount'];

        if ($other_amnt > $available_amt) {
            throw new Exception("Transaction Amount Mismatched");
        }

        $new_amount = $available_amt - $other_amnt;

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
            ':trans_id' => $other_trans_id
        ]);

        // ✅ History Insert
        $historyStmt = $pdo->prepare("
            INSERT INTO cleared_bank_stmt_history
            (bank_stmt_id, transaction_amount, type, screens,insert_login_id, created_date)
            VALUES (:bank_stmt_id, :transaction_amount, :cat_type, :screen, :user_id, NOW())
        ");

        $historyStmt->execute([
            ':bank_stmt_id' => $chk['id'],
            ':transaction_amount' => $other_amnt,
            ':cat_type' => $cat_type,
            ':screen' => $screen,
            ':user_id' => $user_id
        ]);
        $history_id = $pdo->lastInsertId();
    }

    /* ================= INSERT EXPENSE ================= */
    $insertStmt = $pdo->prepare("
        INSERT INTO other_transaction
        (coll_mode, bank_id, trans_cat, name, type,
         ref_id, trans_id, trans_date,amount, history_id,remark, insert_login_id, created_on)
        VALUES
        (:coll_mode, :bank_id, :trans_cat, :name, :type,
         :ref_id, :trans_id, :trans_date, :amount, :history_id, :remark, :user_id, :created_on)
    ");

    $insertStmt->execute([
        ':coll_mode' => $coll_mode,
        ':bank_id' => $bank_id,
        ':trans_cat' => $trans_category,
        ':name' => $other_trans_name,
        ':type' => $cat_type,
        ':ref_id' => $other_ref_id,
        ':trans_id' => $other_trans_id,
        ':amount' => $other_amnt,
        ':trans_date' => $other_trans_date,
        ':history_id' => $history_id ?? '',
        ':remark' => $other_remark,
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
