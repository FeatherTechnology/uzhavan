<?php
session_start();

require '../../ajaxconfig.php';

$table_obj = ['sign'=>'signed_doc_info','cheque'=>'cheque_no_list','endorsement'=>'endorsement_info','document'=>'document_info' ,'mortgage'=>'mortgage_info'];
$table_id_obj = ['sign'=>'id','cheque'=>'id','document'=>'id' ,'mortgage'=>'id' ,'endorsement'=>'id'];

if(isset($_SESSION['user_id'])){
    $user_id = $_SESSION['user_id'];
}
if(isset($_POST['type'])){
    $type = $_POST['type'];
    $temp_sts = ($type=='out')?'2':'1';
}
if(isset($_POST['table_id'])){
    $table_id = $_POST['table_id'];
}
if(isset($_POST['table_name'])){
    $table_name = $table_obj[$_POST['table_name']];
    $table_col = $table_id_obj[$_POST['table_name']];
}
if(isset($_POST['temp_person'])){
    $temp_person = $_POST['temp_person'];
}
if(isset($_POST['temp_purpose'])){
    $temp_purpose = $_POST['temp_purpose'];
}
if(isset($_POST['temp_remarks'])){
    $temp_remarks = $_POST['temp_remarks'];
}

if ($table_name === 'cheque_no_list') {
    $where_column = 'cheque_info_id';
} else {
    $where_column = 'id';
}

$update = $pdo->query("UPDATE $table_name SET `take_status`='$temp_sts', `take_date`=date(now()), `take_person`='$temp_person', `take_purpose`='$temp_purpose',`take_remarks`='$temp_remarks', `update_login_id`= $user_id,`updated_on`=now()  WHERE $where_column  = '$table_id' ");


if($update){
    $result = "Successfully Submitted!";
}else{
    $result = "Error While Submitting!";
}

echo json_encode($result);

// Close the database connection
$pdo = null;
?>
