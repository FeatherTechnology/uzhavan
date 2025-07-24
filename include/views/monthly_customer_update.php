<?php
include_once(__DIR__ . '/../../ajaxconfig.php');

try {
    $qry = $pdo->query("SELECT cs.cus_profile_id as cp_id FROM customer_status cs WHERE cs.status = 7 ORDER BY cs.id ASC");
    $customer_profile_id = array_column($qry->fetchAll(PDO::FETCH_ASSOC), 'cp_id');
} catch (Exception $e) {
   
    exit;
}


$chunks = array_chunk($customer_profile_id, 2);

foreach ($chunks as $chunk) {
    foreach ($chunk as $cp_id) {


        $postData = ['cpID' => $cp_id];

        $ch = curl_init('http://localhost/uzhavan/api/collection_files/resetCustomerStatus.php');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        $responseJSON = curl_exec($ch);

        if (curl_errno($ch)) {
       
            curl_close($ch);
            continue;
        }

        curl_close($ch);
        $response = json_decode($responseJSON, true);

        if (empty($response) || !isset($response['cp_id'])) {
            continue;
        }

        $follow_cus_sts = $response['follow_cus_sts'];
        $bal_amt = $response['balAmnt'];
        $payable = $response['payable'];

        $ch2 = curl_init('http://localhost/uzhavan/api/collection_files/updateCustomerStatus.php');
        curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch2, CURLOPT_POSTFIELDS, [
            'cp_id' => $cp_id,
            'follow_cus_sts' => $follow_cus_sts,
            'bal_amt' => $bal_amt,
            'payable' => $payable,
            'userid' => '1'
        ]);
        $updateResponse = curl_exec($ch2);

        if (curl_errno($ch2)) {
            curl_close($ch2);
            continue;
        }

        curl_close($ch2);
        echo(" Updated cp_id $cp_id: $updateResponse");
    }
}

