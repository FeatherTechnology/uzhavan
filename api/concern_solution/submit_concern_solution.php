<?php
require '../../ajaxconfig.php';
@session_start();

$picture = '';

// Check if file uploaded
if (isset($_FILES['concern_upload']) && !empty($_FILES['concern_upload']['name'])) {
    $path = "../../uploads/concern_solution/";
    $picture = $_FILES['concern_upload']['name'];
    $pic_temp = $_FILES['concern_upload']['tmp_name'];
    $fileExtension = pathinfo($picture, PATHINFO_EXTENSION);
    $picture = uniqid() . '.' . $fileExtension;
    while (file_exists($path . $picture)) {
        $picture = uniqid() . '.' . $fileExtension;
    }
    move_uploaded_file($pic_temp, $path . $picture);
}

$result = 0;
$status = 0; // default

$communication = isset($_POST['communication']) ? $_POST['communication'] : '';
$sol_remark = isset($_POST['sol_remark']) ? $_POST['sol_remark'] : '';
$solution_date = isset($_POST['solution_date']) ? $_POST['solution_date'] : '';
$assign_to = isset($_POST['assign_to']) ? $_POST['assign_to'] : '';
$designation = isset($_POST['designation']) ? $_POST['designation'] : '';
$sol_participants = isset($_POST['sol_participants']) ? $_POST['sol_participants'] : '';
$location = isset($_POST['location']) ? $_POST['location'] : '';
$concern_id = isset($_POST['concern_id']) ? $_POST['concern_id'] : '';

$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;

// Determine status
if ($communication != '') {
    $status = 1;
    if (!empty($solution_date)) {
        $date = DateTime::createFromFormat('d-m-Y', $solution_date);
        $converted_date = $date ? $date->format('Y-m-d') : '0000-00-00';
    } else {
        $converted_date = '0000-00-00';
    }
} else {
    $status = 0;
    $converted_date = '0000-00-00';
}

// Convert date


// Update query
$qry = $pdo->query("
    UPDATE `concern_creation` 
    SET 
        `assign_to` = '$assign_to',
        `assign_designation` = '$designation',
        `sol_date` = '$converted_date',
        `communication` = '$communication',
        `concern_upload` = '$picture',
        `location` = '$location',
        `participants` = '$sol_participants',
        `sol_remark` = '$sol_remark',
        `con_status` = '$status',
        `update_login_id` = '$user_id',
        `updated_on` = NOW()
    WHERE id = '$concern_id'
");

if ($qry) {
    $result = 2;
}

$pdo = null;

// Return result and status
echo json_encode(['result' => $result, 'status' => $status]);
