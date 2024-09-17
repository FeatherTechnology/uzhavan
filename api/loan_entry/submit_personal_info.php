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
$cus_id = $_POST['cus_id'];
$cus_name = $_POST['cus_name'];
$gender = $_POST['gender'];
$dob = $_POST['dob'];
$age = $_POST['age'];
$mobile1 = $_POST['mobile1'];
$mobile2 = $_POST['mobile2'];
$whatsapp_no = $_POST['whatsapp_no'];
$aadhar_num = $_POST['aadhar_num'];
$user_id = $_SESSION['user_id'];
$customer_profile_id = $_POST['customer_profile_id'];

// Query to get customer profile along with customer status
$qry = $pdo->query("SELECT cp.*, cs.status 
                    FROM customer_profile cp
                    INNER JOIN customer_status cs ON cp.cus_id = cs.cus_id
                    WHERE cp.cus_id = '$cus_id' 
                    AND cp.id != '$customer_profile_id'");

if ($qry->rowCount() > 0) {
    $result = $qry->fetch();
    $status = $result['status'];  // Customer status from the customer_status table

    // If status is between 1 and 6, cus_status should be empty
    if ($status >= 1 && $status <= 6) {
        $cus_status = '';
    } 
    // If status is 7 or 8, cus_status should be 'Additional'
    else if ($status == 7 || $status == 8) {
        $cus_status = 'Additional';
    } 
    // If status is 9 or above, cus_status should be 'Renewal'
    else if ($status >= 9) {
        $cus_status = 'Renewal';
    }

    $cus_data = 'Existing';  // Since we found a matching record, it's considered 'Existing'
} else {
    $cus_data = 'New';        // No matching record found, it's considered 'New'
    $cus_status = '';         // cus_status should be empty for new customers
}

if ($customer_profile_id != '') {
    $qry = $pdo->query("UPDATE `customer_profile` SET `cus_id`='$cus_id',`cus_name`='$cus_name',`gender`='$gender',`dob`='$dob',`age`='$age',`mobile1`='$mobile1',`mobile2`='$mobile2',`whatsapp_no`='$whatsapp_no',`aadhar_num`='$aadhar_num',`pic`='$picture',`cus_data`='$cus_data',`cus_status` = '$cus_status',`update_login_id`='$user_id',updated_on = now() WHERE `id`='$customer_profile_id'");
    $result = 0; //update
    $last_id = $customer_profile_id;
} else {
    $qry = $pdo->query("INSERT INTO `customer_profile`(`cus_id`, `cus_name`, `gender`, `dob`, `age`, `mobile1`, `mobile2`, `whatsapp_no`,`aadhar_num`,`pic`, `cus_data`, `cus_status`, `insert_login_id`, `created_on` ) VALUES ('$cus_id','$cus_name','$gender','$dob','$age','$mobile1','$mobile2','$whatsapp_no','$aadhar_num','$picture','$cus_data','$cus_status','$user_id',CURRENT_TIMESTAMP())");
    $result = 1; //Insert
    $status=0;
    $last_id = $pdo->lastInsertId();
    $qry = $pdo->query("INSERT INTO `customer_status`( `cus_id`, `cus_profile_id`, `status`, `insert_login_id`, `created_on`) VALUES ('$cus_id', '$last_id', '0', '$user_id',CURRENT_TIMESTAMP() )");
}

$result = array('result' => $result, 'last_id' => $last_id, 'cus_data' => $cus_data, 'cus_status' => $cus_status, 'pic' => $picture);
echo json_encode($result);
