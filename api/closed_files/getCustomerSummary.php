<?php

require '../../ajaxconfig.php';

if(isset($_POST["cus_id"])){
    $cus_id = $_POST["cus_id"];
}

$records = array();

$qry = $pdo->query("SELECT * FROM customer_register where cus_id = '$cus_id'");
if($qry->rowCount() > 0){
    $row = $qry->fetch();
    $records['how_to_know'] = [$row['how_to_know']];
    $records['monthly_income'] = $row['monthly_income'];
    $records['other_income'] = $row['other_income'];
    $records['support_income'] = $row['support_income'];
    $records['commitment'] = $row['commitment'];
    $records['monthly_due_capacity'] = $row['monthly_due_capacity'];
    $records['cus_limit'] = $row['cus_limit'];
    $records['about_customer'] = $row['about_cus'];
}


echo json_encode($records);

// Close the database connection
$pdo = null;
?>