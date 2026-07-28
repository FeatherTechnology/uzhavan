<?php
require '../../ajaxconfig.php';

$response = array();

if (isset($_POST['cus_id'])) {
    $cus_id = $_POST['cus_id'];
    $profile_id = $_POST['profile_id'];

    // Get loan count and first loan date
    $stmt = $pdo->prepare("
            SELECT cp.id, cp.cus_id, cp.loan_count, cp.first_loan_date
                FROM customer_profile cp
                INNER JOIN customer_status cs
                    ON cp.id = cs.cus_profile_id
                WHERE cp.cus_id = ?
                    AND cs.status >= 7
                    AND cs.status NOT IN (13, 14)
                ORDER BY cp.id DESC
                LIMIT 1; ");
    $stmt->execute([$cus_id]);

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $response['loan_count'] = (int)$row['loan_count'] + 1;
        $response['first_loan_date'] = $row['first_loan_date'] ? date('Y-m-d', strtotime($row['first_loan_date'])) : '';
        if (!empty($row['first_loan_date'])) {

            $now = new DateTime();

            $firstLoanDate = new DateTime($row['first_loan_date']);

            $diff = $firstLoanDate->diff($now);

            $years = $diff->y;
            $months = $diff->m;

            $response['travel'] = $years . ' Years, ' . $months . ' Months';
        } else {

            $response['travel'] = '';
        }

    } else {
        
        $stmt = $pdo->prepare("  SELECT cp.id, cp.cus_id, cp.loan_count, cp.first_loan_date
                FROM customer_profile cp
                WHERE cp.id = ? ");
        $stmt->execute([$profile_id]);
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $response['loan_count'] = $row['loan_count'];
            $response['first_loan_date'] = $row['first_loan_date'] ? date('Y-m-d', strtotime($row['first_loan_date'])) : '';
            if (!empty($row['first_loan_date'])) {

                $now = new DateTime();

                $firstLoanDate = new DateTime($row['first_loan_date']);

                $diff = $firstLoanDate->diff($now);

                $years = $diff->y;
                $months = $diff->m;

                $response['travel'] = $years . ' Years, ' . $months . ' Months';
            } else {

                $response['travel'] = '';
            }
        }
    }
} else {
    $response['loan_count'] = '';
    $response['first_loan_date'] = '';
    $response['first_loan'] = '';
    $response['travel'] = '';
}

$pdo = null; // Close connection
echo json_encode($response);
