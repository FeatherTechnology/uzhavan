<?php

require "../../../ajaxconfig.php";
@session_start();

header('Content-Type: application/json; charset=utf-8');

$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
    http_response_code(401);
    echo json_encode([
        'status' => 0,
        'error' => 'User session expired. Please log in again.'
    ]);
    exit;
}

// GET POST VALUES
$customer_profile_id = $_POST['customer_profile_id'] ?? '';
$cus_id = $_POST['cus_id'] ?? '';
$loan_id_calc = $_POST['loan_id_calc'] ?? '';
$loan_category_calc = $_POST['loan_category_calc'] ?? '';
$category_info_calc = $_POST['category_info_calc'] ?? '';
$loan_amount_calc = $_POST['loan_amount_calc'] ?? '';
$profit_type_calc = $_POST['profit_type_calc'] ?? '';
$due_method_calc = $_POST['due_method_calc'] ?? '';
$due_type_calc = $_POST['due_type_calc'] ?? '';
$profit_method_calc = $_POST['profit_method_calc'] ?? '';
$scheme_due_method_calc = $_POST['scheme_due_method_calc'] ?? '';
$scheme_day_calc = $_POST['scheme_day_calc'] ?? '';
$month_dates = $_POST['month_dates'] ?? '';
$scheme_name_calc = $_POST['scheme_name_calc'] ?? '';
$interest_rate_calc = $_POST['interest_rate_calc'] ?? '';
$due_period_calc = $_POST['due_period_calc'] ?? '';
$doc_charge_calc = $_POST['doc_charge_calc'] ?? '';
$processing_fees_calc = $_POST['processing_fees_calc'] ?? '';
$loan_amnt_calc = $_POST['loan_amnt_calc'] ?? '';
$principal_amnt_calc = $_POST['principal_amnt_calc'] ?? '';
$interest_amnt_calc = $_POST['interest_amnt_calc'] ?? '';
$total_amnt_calc = $_POST['total_amnt_calc'] ?? '';
$due_amnt_calc = $_POST['due_amnt_calc'] ?? '';
$doc_charge_calculate = $_POST['doc_charge_calculate'] ?? '';
$processing_fees_calculate = $_POST['processing_fees_calculate'] ?? '';
$net_cash_calc = $_POST['net_cash_calc'] ?? '';
$loan_date_calc = $_POST['loan_date_calc'] ?? '';
$due_startdate_calc = $_POST['due_startdate_calc'] ?? '';
$maturity_date_calc = $_POST['maturity_date_calc'] ?? '';
$collection_method = $_POST['collection_method'] ?? '';
$referred_calc = $_POST['referred_calc'] ?? '';
$agent_id_calc = $_POST['agent_id_calc'] ?? '';
$agent_name_calc = $_POST['agent_name_calc'] ?? '';
$id = $_POST['id'] ?? '';
$cus_status = $_POST['cus_status'] ?? 0;

if ($profit_type_calc == '1') {
    $due_method_calc = '';
}

$status = 0;
$last_id = null;
$lockAcquired = false;
$transactionStarted = false;

try {

    // START TRANSACTION
    $pdo->beginTransaction();
    $transactionStarted = true;

    // GENERATE LOAN ID SAFELY Use a dedicated lock name for loan ID generation. All endpoints generating loan IDs must use this same name.
    if ($id == '') {

        $lockStmt = $pdo->query("SELECT GET_LOCK('loan_id_generation', 10)");

        $lockResult = $lockStmt->fetchColumn();

        if ((string)$lockResult !== '1') {
            throw new Exception(
                'Unable to generate Loan ID. Please try again.'
            );
        }

        $lockAcquired = true;

        // Calculate MAX only after acquiring the lock.
        $maxStmt = $pdo->query("SELECT MAX(CAST(loan_id AS UNSIGNED)) AS max_number
            FROM loan_entry_loan_calculation
            WHERE loan_id IS NOT NULL
              AND loan_id != ''
        ");

        $row = $maxStmt->fetch(PDO::FETCH_ASSOC);

        $maxNumber = (int)($row['max_number'] ?? 0);

        $loan_id_calc = ($maxNumber > 0)
            ? $maxNumber + 1
            : 101;
    }

    // INSERT NEW LOAN CALCULATION
    if ($id == '') {

        $insertStmt = $pdo->prepare("INSERT INTO loan_entry_loan_calculation (
                cus_profile_id,
                cus_id,
                loan_id,
                loan_category,
                category_info,
                loan_amount,
                profit_type,
                due_method,
                due_type,
                month_date,
                profit_method,
                scheme_due_method,
                scheme_day,
                scheme_name,
                interest_rate,
                due_period,
                doc_charge,
                processing_fees,
                loan_amnt,
                principal_amnt,
                interest_amnt,
                total_amnt,
                due_amnt,
                doc_charge_calculate,
                processing_fees_calculate,
                net_cash,
                loan_date,
                due_startdate,
                maturity_date,
                collection_method,
                referred,
                agent_id,
                agent_name,
                insert_login_id,
                created_on
            ) VALUES (
                :customer_profile_id,
                :cus_id,
                :loan_id,
                :loan_category,
                :category_info,
                :loan_amount,
                :profit_type,
                :due_method,
                :due_type,
                :month_date,
                :profit_method,
                :scheme_due_method,
                :scheme_day,
                :scheme_name,
                :interest_rate,
                :due_period,
                :doc_charge,
                :processing_fees,
                :loan_amnt,
                :principal_amnt,
                :interest_amnt,
                :total_amnt,
                :due_amnt,
                :doc_charge_calculate,
                :processing_fees_calculate,
                :net_cash,
                :loan_date,
                :due_startdate,
                :maturity_date,
                :collection_method,
                :referred,
                :agent_id,
                :agent_name,
                :user_id,
                NOW()
            )
        ");

        $insertStmt->execute([
            ':customer_profile_id' => $customer_profile_id,
            ':cus_id' => $cus_id,
            ':loan_id' => $loan_id_calc,
            ':loan_category' => $loan_category_calc,
            ':category_info' => $category_info_calc,
            ':loan_amount' => $loan_amount_calc,
            ':profit_type' => $profit_type_calc,
            ':due_method' => $due_method_calc,
            ':due_type' => $due_type_calc,
            ':month_date' => $month_dates,
            ':profit_method' => $profit_method_calc,
            ':scheme_due_method' => $scheme_due_method_calc,
            ':scheme_day' => $scheme_day_calc,
            ':scheme_name' => $scheme_name_calc,
            ':interest_rate' => $interest_rate_calc,
            ':due_period' => $due_period_calc,
            ':doc_charge' => $doc_charge_calc,
            ':processing_fees' => $processing_fees_calc,
            ':loan_amnt' => $loan_amnt_calc,
            ':principal_amnt' => $principal_amnt_calc,
            ':interest_amnt' => $interest_amnt_calc,
            ':total_amnt' => $total_amnt_calc,
            ':due_amnt' => $due_amnt_calc,
            ':doc_charge_calculate' => $doc_charge_calculate,
            ':processing_fees_calculate' => $processing_fees_calculate,
            ':net_cash' => $net_cash_calc,
            ':loan_date' => $loan_date_calc,
            ':due_startdate' => $due_startdate_calc,
            ':maturity_date' => $maturity_date_calc,
            ':collection_method' => $collection_method,
            ':referred' => $referred_calc,
            ':agent_id' => $agent_id_calc,
            ':agent_name' => $agent_name_calc,
            ':user_id' => $user_id
        ]);

        $status = 1;
        $last_id = $pdo->lastInsertId();
    } else {

        // UPDATE EXISTING LOAN CALCULATION Do not generate a new loan ID during an update.
        $updateStmt = $pdo->prepare("UPDATE loan_entry_loan_calculation
            SET
                cus_profile_id = :customer_profile_id,
                cus_id = :cus_id,
                loan_id = :loan_id,
                loan_category = :loan_category,
                category_info = :category_info,
                loan_amount = :loan_amount,
                profit_type = :profit_type,
                due_method = :due_method,
                month_date = :month_date,
                due_type = :due_type,
                profit_method = :profit_method,
                scheme_due_method = :scheme_due_method,
                scheme_day = :scheme_day,
                scheme_name = :scheme_name,
                interest_rate = :interest_rate,
                due_period = :due_period,
                doc_charge = :doc_charge,
                processing_fees = :processing_fees,
                loan_amnt = :loan_amnt,
                principal_amnt = :principal_amnt,
                interest_amnt = :interest_amnt,
                total_amnt = :total_amnt,
                due_amnt = :due_amnt,
                doc_charge_calculate = :doc_charge_calculate,
                processing_fees_calculate = :processing_fees_calculate,
                net_cash = :net_cash,
                loan_date = :loan_date,
                due_startdate = :due_startdate,
                maturity_date = :maturity_date,
                collection_method = :collection_method,
                referred = :referred,
                agent_id = :agent_id,
                agent_name = :agent_name,
                update_login_id = :user_id,
                updated_on = NOW()
            WHERE id = :id
        ");

        $updateStmt->execute([
            ':customer_profile_id' => $customer_profile_id,
            ':cus_id' => $cus_id,
            ':loan_id' => $loan_id_calc,
            ':loan_category' => $loan_category_calc,
            ':category_info' => $category_info_calc,
            ':loan_amount' => $loan_amount_calc,
            ':profit_type' => $profit_type_calc,
            ':due_method' => $due_method_calc,
            ':month_date' => $month_dates,
            ':due_type' => $due_type_calc,
            ':profit_method' => $profit_method_calc,
            ':scheme_due_method' => $scheme_due_method_calc,
            ':scheme_day' => $scheme_day_calc,
            ':scheme_name' => $scheme_name_calc,
            ':interest_rate' => $interest_rate_calc,
            ':due_period' => $due_period_calc,
            ':doc_charge' => $doc_charge_calc,
            ':processing_fees' => $processing_fees_calc,
            ':loan_amnt' => $loan_amnt_calc,
            ':principal_amnt' => $principal_amnt_calc,
            ':interest_amnt' => $interest_amnt_calc,
            ':total_amnt' => $total_amnt_calc,
            ':due_amnt' => $due_amnt_calc,
            ':doc_charge_calculate' => $doc_charge_calculate,
            ':processing_fees_calculate' => $processing_fees_calculate,
            ':net_cash' => $net_cash_calc,
            ':loan_date' => $loan_date_calc,
            ':due_startdate' => $due_startdate_calc,
            ':maturity_date' => $maturity_date_calc,
            ':collection_method' => $collection_method,
            ':referred' => $referred_calc,
            ':agent_id' => $agent_id_calc,
            ':agent_name' => $agent_name_calc,
            ':user_id' => $user_id,
            ':id' => $id
        ]);

        $status = 2;
        $last_id = $id;
    }

    // UPDATE CUSTOMER STATUS Keep this inside the transaction so the loan save and customer status update succeed or fail together.
    $statusStmt = $pdo->prepare("UPDATE customer_status
        SET
            loan_calculation_id = :loan_calculation_id,
            status = :cus_status,
            update_login_id = :user_id,
            updated_on = NOW()
        WHERE cus_profile_id = :customer_profile_id
          AND status = 1
    ");

    $statusStmt->execute([
        ':loan_calculation_id' => $last_id,
        ':cus_status' => $cus_status,
        ':user_id' => $user_id,
        ':customer_profile_id' => $customer_profile_id
    ]);

    // COMMIT
    $pdo->commit();
    $transactionStarted = false;

    $result = [
        'status' => $status,
        'last_id' => $last_id,
        'loan_id' => $loan_id_calc
    ];
} catch (Throwable $e) {

    if ($transactionStarted && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);

    $result = [
        'status' => 0,
        'error' => $e->getMessage()
    ];
} finally {

    // Release the lock after commit or rollback.
    if ($lockAcquired) {
        try {
            $pdo->query("SELECT RELEASE_LOCK('loan_id_generation')");
        } catch (Throwable $releaseError) {
            error_log(
                'Loan ID lock release failed: ' . $releaseError->getMessage()
            );
        }
    }

    $pdo = null;
}

echo json_encode($result);
?>
