<?php
require "../../../ajaxconfig.php";
@session_start();
$user_id = $_SESSION['user_id'];

$customer_profile_id = $_POST['customer_profile_id'];
$cus_id = $_POST['cus_id'];
$loan_id_calc = $_POST['loan_id_calc'];
$loan_category_calc = $_POST['loan_category_calc'];
$category_info_calc = $_POST['category_info_calc'];
$loan_amount_calc = $_POST['loan_amount_calc'];
$profit_type_calc = $_POST['profit_type_calc'];
$due_method_calc = $_POST['due_method_calc'];
$due_type_calc = $_POST['due_type_calc'];
$profit_method_calc = $_POST['profit_method_calc'];
$scheme_due_method_calc = $_POST['scheme_due_method_calc'];
$scheme_day_calc = $_POST['scheme_day_calc'];
$scheme_name_calc = $_POST['scheme_name_calc'];
$interest_rate_calc = $_POST['interest_rate_calc'];
$due_period_calc = $_POST['due_period_calc'];
$doc_charge_calc = $_POST['doc_charge_calc'];
$processing_fees_calc = $_POST['processing_fees_calc'];
$loan_amnt_calc = $_POST['loan_amnt_calc'];
$principal_amnt_calc = $_POST['principal_amnt_calc'];
$interest_amnt_calc = $_POST['interest_amnt_calc'];
$total_amnt_calc = $_POST['total_amnt_calc'];
$due_amnt_calc = $_POST['due_amnt_calc'];
$doc_charge_calculate = $_POST['doc_charge_calculate'];
$processing_fees_calculate = $_POST['processing_fees_calculate'];
$net_cash_calc = $_POST['net_cash_calc'];
$loan_date_calc = $_POST['loan_date_calc'];
$due_startdate_calc = $_POST['due_startdate_calc'];
$maturity_date_calc = $_POST['maturity_date_calc'];
$referred_calc = $_POST['referred_calc'];
$agent_id_calc = $_POST['agent_id_calc'];
$agent_name_calc = $_POST['agent_name_calc'];
$id = $_POST['id'];
$cus_status=$_POST['cus_status'];

if($profit_type_calc =='1'){
    $due_method_calc ='';
}

$status = 0;
if ($id == '') {
    $qry = $pdo->query("INSERT INTO `loan_entry_loan_calculation`(`cus_profile_id`, `cus_id`, `loan_id`, `loan_category`, `category_info`, `loan_amount`, `profit_type`, `due_method`, `due_type`, `profit_method`, `scheme_due_method`, `scheme_day`, `scheme_name`, `interest_rate`, `due_period`, `doc_charge`, `processing_fees`, `loan_amnt`, `principal_amnt`, `interest_amnt`, `total_amnt`, `due_amnt`, `doc_charge_calculate`, `processing_fees_calculate`, `net_cash`, `loan_date`, `due_startdate`, `maturity_date`, `referred`, `agent_id`, `agent_name`, `insert_login_id`, `created_on`) 
    VALUES ('$customer_profile_id', '$cus_id', '$loan_id_calc','$loan_category_calc','$category_info_calc','$loan_amount_calc','$profit_type_calc','$due_method_calc','$due_type_calc','$profit_method_calc','$scheme_due_method_calc','$scheme_day_calc','$scheme_name_calc','$interest_rate_calc','$due_period_calc','$doc_charge_calc','$processing_fees_calc','$loan_amnt_calc','$principal_amnt_calc','$interest_amnt_calc','$total_amnt_calc','$due_amnt_calc','$doc_charge_calculate','$processing_fees_calculate','$net_cash_calc','$loan_date_calc','$due_startdate_calc','$maturity_date_calc','$referred_calc','$agent_id_calc','$agent_name_calc','$user_id',now())");
    if ($qry) {
        $status = 1;
        $last_id = $pdo->lastInsertId();
    }
}else{
    $qry = $pdo->query("UPDATE `loan_entry_loan_calculation` SET `cus_profile_id`='$customer_profile_id', `cus_id` = '$cus_id', `loan_id`='$loan_id_calc',`loan_category`='$loan_category_calc',`category_info`='$category_info_calc',`loan_amount`='$loan_amount_calc',`profit_type`='$profit_type_calc',`due_method`='$due_method_calc',`due_type`='$due_type_calc',`profit_method`='$profit_method_calc',`scheme_due_method`='$scheme_due_method_calc',`scheme_day`='$scheme_day_calc',`scheme_name`='$scheme_name_calc',`interest_rate`='$interest_rate_calc',`due_period`='$due_period_calc',`doc_charge`='$doc_charge_calc',`processing_fees`='$processing_fees_calc',`loan_amnt`='$loan_amnt_calc',`principal_amnt`='$principal_amnt_calc',`interest_amnt`='$interest_amnt_calc',`total_amnt`='$total_amnt_calc',`due_amnt`='$due_amnt_calc',`doc_charge_calculate`='$doc_charge_calculate',`processing_fees_calculate`='$processing_fees_calculate',`net_cash`='$net_cash_calc',`loan_date`='$loan_date_calc',`due_startdate`='$due_startdate_calc',`maturity_date`='$maturity_date_calc',`referred`='$referred_calc',`agent_id`='$agent_id_calc',`agent_name`='$agent_name_calc',`update_login_id`='$user_id',`updated_on`=now() WHERE `id`='$id'");
    if ($qry) {
        $status = 2;
        $last_id = $id;
    }
}

$qry = $pdo->query("UPDATE `customer_status` SET `loan_calculation_id`='$last_id', `status`='$cus_status', `update_login_id`='$user_id', `updated_on`=now() WHERE `cus_profile_id`='$customer_profile_id'  AND status=1 ");

$result = array('status'=>$status, 'last_id'=> $last_id);
echo json_encode($result);
