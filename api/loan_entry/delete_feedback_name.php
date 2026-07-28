<?php
require "../../ajaxconfig.php";

$id = $_POST['id'];
$result = 2;

try {

    // Check whether the feedback label is used in cus_feedback table
    $check = $pdo->prepare("SELECT COUNT(*) FROM cus_feedback WHERE feedback_label = ?");
    $check->execute([$id]);

    if ($check->fetchColumn() > 0) {

        // Record exists in cus_feedback table
        $result = 0;

    } else {

        // Delete from cus_feedback_name
        $delete = $pdo->prepare("DELETE FROM cus_feedback_name WHERE id = ?");

        if ($delete->execute([$id])) {
            $result = 1; // Deleted successfully
        } else {
            $result = 2; // Delete failed
        }
    }

} catch (Exception $e) {
    $result = 3; // Exception occurred
}

echo json_encode($result);
?>