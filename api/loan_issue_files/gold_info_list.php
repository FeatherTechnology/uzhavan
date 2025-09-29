<?php
require "../../ajaxconfig.php";
include "../common_files/moneyformatIndia.php"; 

$info_info_arr = array();
$cus_profile_id = $_POST['cus_profile_id'];

$qry = $pdo->query("SELECT * FROM gold_info WHERE cus_profile_id = '$cus_profile_id' ");
if ($qry->rowCount() > 0) {
    while ($gold_info = $qry->fetch(PDO::FETCH_ASSOC)) {
        $gold_info['value'] = moneyFormatIndia($gold_info['value']); // ✅ format here
        $gold_info['action'] = "<span class='icon-border_color goldActionBtn' value='" . $gold_info['id'] . "'></span> 
                                <span class='icon-trash-2 goldDeleteBtn' value='" . $gold_info['id'] . "'></span>";
        $info_info_arr[] = $gold_info;
    }
}

$pdo = null; // Close connection
echo json_encode($info_info_arr);

