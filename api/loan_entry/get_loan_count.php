<?php
require '../../ajaxconfig.php';

$response = array();

if (isset($_POST['cus_id'])) {
    $cus_id = $_POST['cus_id'];

    // Get loan count and first loan date
    $stmt = $pdo->prepare("
        SELECT 
            COUNT(cs.cus_id) AS loan_count, 
            MIN(lelc.loan_date) AS first_loan_date  
        FROM customer_status cs  
        LEFT JOIN loan_entry_loan_calculation lelc ON cs.cus_profile_id = lelc.cus_profile_id 
        WHERE cs.cus_id = ? AND cs.status >= 7 AND cs.status NOT IN (13, 14)
    ");
    $stmt->execute([$cus_id]);

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $response['loan_count'] = $row['loan_count'];
        $response['first_loan_date'] = $row['first_loan_date'] ? date('d-m-Y', strtotime($row['first_loan_date'])) : '';

        // Get the first loan issue date where balance = 0
        $result = $pdo->query("SELECT created_on FROM `loan_issue` WHERE cus_id = '$cus_id' AND balance_amount = 0 ORDER BY created_on LIMIT 1");
        $res = $result->fetch();

        if ($res && !empty($res['created_on'])) {
            $first_loan_date = date('d-m-Y', strtotime($res['created_on']));
            $response['first_loan'] = $first_loan_date;

            $now = new DateTime();
            $custom = new DateTime($res['created_on']);

            $diff = $custom->diff($now);

            $years = $diff->y;
            $months = $diff->m;

            $response['travel'] = $years . ' Years, ' . $months . ' Months';
        } else {
            $response['first_loan'] = '';
            $response['travel'] = '';
        }

    } else {
        $response['loan_count'] = '';
        $response['first_loan_date'] = '';
        $response['first_loan'] = '';
        $response['travel'] = '';
    }
} else {
    $response['loan_count'] = '';
    $response['first_loan_date'] = '';
    $response['first_loan'] = '';
    $response['travel'] = '';
}

$pdo = null; // Close connection
echo json_encode($response);
