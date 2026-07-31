<?php
require '../../ajaxconfig.php';
session_start();
$userid = $_SESSION['user_id'];

$ansi = $_POST['ansi'] ?? '';
$hand = $_POST['hand'] ?? '';
$aadhaar = $_POST['aadhaar'] ?? '';
$name = $_POST['name'] ?? '';

if($aadhaar !='' && $hand != ''){

    $checkqry = $pdo->prepare("SELECT COUNT(*) FROM fingerprints WHERE adhar_num = ? AND hand = ? ");
    $checkqry->execute([$aadhaar, $hand]);
    $checkqryCnt = (int) $checkqry->fetchColumn();

    if($checkqryCnt > 0){
        $qry = $pdo->prepare("UPDATE fingerprints SET ansi_template = ?, update_user_id = ?, updated_date = NOW() WHERE adhar_num = ? AND hand = ?");
        $qry->execute([$ansi, $userid, $aadhaar, $hand]);

    }else{
        $qry = $pdo->prepare("INSERT INTO fingerprints(adhar_num, name, hand, ansi_template, insert_user_id, created_date) VALUES (?, ?, ?, ?, ?, NOW())");
        $qry->execute([$aadhaar, $name, $hand, $ansi, $userid]);
    }

    $response = ($qry) ? "Submitted Successfully" : "Error";

} else{
    $response = "Error";
}

echo json_encode($response);

// Close the database connection
$connect = null;
?>