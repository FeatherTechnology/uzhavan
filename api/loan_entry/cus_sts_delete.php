<?php

require '../../ajaxconfig.php';

// Retrieve the cus_id and cus_profile_id from POST request
$cus_id = $_POST['cus_id'];
$custProfileId = $_POST['cus_profile_id'];

try {
    // Use prepared statements to avoid SQL injection and ensure proper syntax
    $stmt1 = $pdo->prepare("DELETE FROM customer_status WHERE cus_id = :cus_id AND cus_profile_id = :cusProfileId");
    $stmt1->execute(['cus_id' => $cus_id, 'cusProfileId' => $custProfileId]);

    $stmt2 = $pdo->prepare("DELETE FROM customer_profile WHERE cus_id = :cus_id AND id = :cusProfileId");
    $stmt2->execute(['cus_id' => $cus_id, 'cusProfileId' => $custProfileId]);
      // Check if there are any remaining customer_profile records with this cus_id
    $statusQry = $pdo->prepare("SELECT cus_id FROM customer_profile WHERE cus_id = :cus_id");
    $statusQry->execute(['cus_id' => $cus_id]);

    if ($statusQry->rowCount() == 0) {
        // If no customer_profile records remain, delete from customer_register
        $stmt3 = $pdo->prepare("DELETE FROM customer_register WHERE cus_id = :cus_id");
        $stmt3->execute(['cus_id' => $cus_id]);
    }
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
