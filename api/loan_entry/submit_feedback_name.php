<?php
require '../../ajaxconfig.php';
@session_start();

$feedbackname = trim($_POST['feedbackname']);
$fedbackname_id = $_POST['fedbackname_id'];
$user_id = $_SESSION['user_id'];

$result = 0;

// Check duplicate feedback name
if ($fedbackname_id != '') {
    // Update - exclude current record
    $check = $pdo->prepare("SELECT id FROM cus_feedback_name WHERE feedback_name = ? AND id != ?");
    $check->execute([$feedbackname, $fedbackname_id]);
} else {
    // Insert
    $check = $pdo->prepare("SELECT id FROM cus_feedback_name WHERE feedback_name = ?");
    $check->execute([$feedbackname]);
}

if ($check->rowCount() > 0) {
    $result = 3; // Duplicate feedback name found
} else {

    if ($fedbackname_id != '') {

        $qry = $pdo->prepare("UPDATE cus_feedback_name
                              SET feedback_name = ?,
                                  updated_login_id = ?,
                                  updated_date = NOW()
                              WHERE id = ?");

        if ($qry->execute([$feedbackname, $user_id, $fedbackname_id])) {
            $result = 2; // Update
        }

    } else {

        $qry = $pdo->prepare("INSERT INTO cus_feedback_name
                              (feedback_name, insert_login_id, created_date)
                              VALUES (?, ?, NOW())");

        if ($qry->execute([$feedbackname, $user_id])) {
            $result = 1; // Insert
        }
    }
}

echo json_encode($result);
?>