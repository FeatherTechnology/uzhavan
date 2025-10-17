<?php
require '../../ajaxconfig.php';
@session_start();

$result = 0;
    $raising_for = $_POST['raising_for'] ?? '';
    $aadhar_num = $_POST['aadhar_num'] ?? '';
    $cus_id = $_POST['cus_id'] ?? '';
    $cus_name = $_POST['cus_name'] ?? '';
    $area = $_POST['area'] ?? '';
    $line = $_POST['line'] ?? '';
    $mobile = $_POST['mobile'] ?? '';
    $user_name = $_POST['user_name'] ?? '';
    $concern_date = $_POST['concern_date'] ?? '';
    $date = DateTime::createFromFormat('d-m-Y', $concern_date);
if ($date) {
    $converted_date = $date->format('Y-m-d');
} else {
    $converted_date = '0000-00-00';
}
    $con_code = $_POST['con_code'] ?? '';
    $concern_subject = $_POST['concern_subject'] ?? '';
    $con_remark = $_POST['con_remark'] ?? '';
    $branch_name = $_POST['branch_name'] ?? '';
    $assign_to = $_POST['assign_to'] ?? '';
    $concern_to = $_POST['concern_to'] ?? '';
    $assign_role = $_POST['assign_role'] ?? '';
    $user_id = $_SESSION['user_id'] ?? 0;
try {
    $pdo->beginTransaction();
    // Generate con_code if empty
        $selectIC = $pdo->query("SELECT con_code FROM concern_creation WHERE con_code != '' ORDER BY id DESC LIMIT 1 FOR UPDATE");
        $prefix = "CC";
        if ($selectIC->rowCount() > 0) {
            $row = $selectIC->fetch();
            $lastCode = $row["con_code"];
            $num = ltrim(strstr($lastCode, '-'), '-');
            $con_code = $prefix . '-' . ($num + 1);
        } else {
            $con_code = $prefix . "-101";
        }

    // Build query
    $qry = $pdo->query("
        INSERT INTO concern_creation
        (raising_for, aadhar_num, cus_id, cus_name, area, line, mobile, user_name, con_code, concern_date, con_sub, concern_to,con_remark, branch_name, assign_to, assign_role, insert_login_id, created_on)
        VALUES
        ('$raising_for', '$aadhar_num', '$cus_id', '$cus_name', '$area', '$line', '$mobile', '$user_name', '$con_code', '$converted_date','$concern_subject', '$concern_to','$con_remark', '$branch_name', '$assign_to', '$assign_role', '$user_id', NOW())
    ");

        if ($qry) {
            $result = 2; //Insert.
        }

    $pdo->commit();

} catch (Exception $e) {
    $pdo->rollBack();
    $result = 0;
}

$pdo = null;
echo json_encode($result);
