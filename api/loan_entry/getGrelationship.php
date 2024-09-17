<?php
require '../../ajaxconfig.php';

$response = array();

if (isset($_POST['guarantor_id'])) {
    $property_holder_id = $_POST['guarantor_id'];

    $stmt = $pdo->prepare("SELECT fam_relationship FROM family_info WHERE id = ?");
    $stmt->execute([$property_holder_id]);

    // Fetch the result
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $response['relationship'] = $row['fam_relationship'];
    } else {
        $response['relationship'] = ''; // No relationship found
    }
} else {
    $response['relationship'] = ''; // No property holder ID provided
}

$pdo = null; // Close the connection

echo json_encode($response);
?>
