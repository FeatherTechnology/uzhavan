<?php
require '../../ajaxconfig.php';
@session_start();
if (!empty($_FILES['pic']['name'])) {
    $path = "../../uploads/loan_entry/cus_pic/";
    $picture = $_FILES['pic']['name'];
    $pic_temp = $_FILES['pic']['tmp_name'];
    $picfolder = $path . $picture;
    $fileExtension = pathinfo($picfolder, PATHINFO_EXTENSION); //get the file extention
    $picture = uniqid() . '.' . $fileExtension;
    while (file_exists($path . $picture)) {
        //this loop will continue until it generates a unique file name
        $picture = uniqid() . '.' . $fileExtension;
    }
    move_uploaded_file($pic_temp, $path . $picture);
} else {
    $picture = $_POST['per_pic'];
}
if (!empty($_FILES['gu_pic']['name'])) {
    $paths = "../../uploads/loan_entry/gu_pic/";
    $gpicture = $_FILES['gu_pic']['name'];
    $pic_temp = $_FILES['gu_pic']['tmp_name'];
    $picfolder = $paths . $gpicture;
    $fileExtension = pathinfo($picfolder, PATHINFO_EXTENSION); //get the file extention
    $gpicture = uniqid() . '.' . $fileExtension;
    while (file_exists($paths . $gpicture)) {
        //this loop will continue until it generates a unique file name
        $gpicture = uniqid() . '.' . $fileExtension;
    }
    move_uploaded_file($pic_temp, $paths . $gpicture);
} else {
    $gpicture = $_POST['gur_pic'];
}

$cus_id = $_POST['cus_id'];
$cus_name = $_POST['cus_name'];
$gender = $_POST['gender'];
$dob = $_POST['dob'];
$age = $_POST['age'];
$mobile1 = $_POST['mobile1'];
$mobile2 = $_POST['mobile2'];
$whatsapp_no = $_POST['whatsapp_no'];
$aadhar_num = $_POST['aadhar_num'];
$guarantor_name = $_POST['guarantor_name'];
$cus_data = $_POST['cus_data'];
$cus_status = $_POST['cus_status'];
$res_type = $_POST['res_type'];
$res_detail = $_POST['res_detail'];
$res_address = $_POST['res_address'];
$native_address = $_POST['native_address'];
$occupation = $_POST['occupation'];
$occ_detail = $_POST['occ_detail'];
$occ_income = $_POST['occ_income'];
$occ_address = $_POST['occ_address'];
$area_confirm = $_POST['area_confirm'];
$area = $_POST['area'];
$line = $_POST['line'];
$cus_limit = $_POST['cus_limit'];
$about_cus = $_POST['about_cus'];
$how_to_know = $_POST['how_to_know'];
$first_loan_date = $_POST['first_loan_date'];
$loan_count = $_POST['loan_count'];
$travel_with_company = $_POST['travel_with_company'];
$monthly_income = $_POST['monthly_income'];
$other_income = $_POST['other_income'];
$support_income = $_POST['support_income'];
$commitment = $_POST['commitment'];
$monthly_due_capacity = $_POST['monthly_due_capacity'];
$user_id = $_SESSION['user_id'];
$customer_profile_id = $_POST['customer_profile_id'];
$loan_id = isset($_POST['loan_id']) ? $_POST['loan_id'] : '';
$converted_date = DateTime::createFromFormat('d-m-Y', $first_loan_date)->format('Y-m-d');

if ($customer_profile_id != '') {

    // Step 1: Fetch current picture once (optional or for first profile)
    $qry = $pdo->query("SELECT pic, gu_pic FROM `customer_profile` WHERE id = '$customer_profile_id'");
    $row = $qry->fetch();
    $currentPic = $row['pic'] ?? '';
    $currentGuPic = $row['gu_pic'] ?? '';

    // Step 2: Get all relevant cus_profile_id values for status between 1–7
    $statusQry = $pdo->query("SELECT cus_profile_id FROM customer_status WHERE cus_id = '$cus_id' AND status BETWEEN 1 AND 7");
    $profileIdsToUpdate = $statusQry->fetchAll(PDO::FETCH_COLUMN);

    // Step 3: Loop and update all matching customer_profile entries
    if (!empty($profileIdsToUpdate)) {
        foreach ($profileIdsToUpdate as $profileId) {
            $qry = $pdo->query("UPDATE `customer_profile` SET `cus_id`='$cus_id',`aadhar_num`='$aadhar_num',`cus_name`='$cus_name',`gender`='$gender',`dob`='$dob',`age`='$age',`mobile1`='$mobile1',`mobile2`='$mobile2', `whatsapp_no`='$whatsapp_no',`pic`='$picture',`cus_data`='$cus_data',`cus_status`='$cus_status',`res_type`='$res_type',`res_detail`='$res_detail',`res_address`='$res_address',`native_address`='$native_address',`occupation`='$occupation',`occ_detail`='$occ_detail',`occ_income`='$occ_income',`occ_address`='$occ_address',`area_confirm`='$area_confirm',`area`='$area',`line`='$line',`cus_limit`='$cus_limit',`about_cus`='$about_cus',`how_to_know`='$how_to_know',`loan_count`='$loan_count',`first_loan_date`='$converted_date',`travel_with_company`='$travel_with_company',`monthly_income`='$monthly_income',`other_income`='$other_income',`support_income`='$support_income',`commitment`='$commitment',`monthly_due_capacity`='$monthly_due_capacity',`update_login_id`='$user_id',updated_on = now() WHERE id = '$profileId' ");

            $pdo->query("UPDATE `customer_profile` SET 
                `guarantor_name`='$guarantor_name',
                `gu_pic`='$gpicture',
                `update_login_id`='$user_id',
                `updated_on`=now()
                WHERE id = '$loan_id' ");
        }


        if (($currentPic) && $currentPic != $picture) {
            unlink($path . $currentPic);
        }
        if (!empty($loan_id) && $loan_id !== 'null') {
            if (!empty($currentGuPic) && $currentGuPic != $gpicture) {
                unlink($paths . $currentGuPic);
            }
        }
    }

    // Step 5: Update customer_register (only one entry per cus_id)
    $qry = $pdo->query("UPDATE `customer_register` SET `cus_id`='$cus_id',`aadhar_num`='$aadhar_num',`cus_name`='$cus_name',`gender`='$gender',`dob`='$dob',`age`='$age',`mobile1`='$mobile1',`mobile2`='$mobile2', `whatsapp_no`='$whatsapp_no',`pic`='$picture',`cus_data`='$cus_data',`cus_status`='$cus_status',`res_type`='$res_type',`res_detail`='$res_detail',`res_address`='$res_address',`native_address`='$native_address',`occupation`='$occupation',`occ_detail`='$occ_detail',`occ_income`='$occ_income',`occ_address`='$occ_address',`area_confirm`='$area_confirm',`area`='$area',`line`='$line',`cus_limit`='$cus_limit',`about_cus`='$about_cus',`how_to_know`='$how_to_know',`loan_count`='$loan_count',`first_loan_date`='$converted_date',`travel_with_company`='$travel_with_company',`monthly_income`='$monthly_income',`other_income`='$other_income',`support_income`='$support_income',`commitment`='$commitment',`monthly_due_capacity`='$monthly_due_capacity',`update_login_id`='$user_id',updated_on = now() WHERE `cus_id`='$cus_id'");

    $status = 0;
    $last_id = $customer_profile_id;
}

$result = array('status' => $status, 'last_id' => $last_id);
echo json_encode($result);
