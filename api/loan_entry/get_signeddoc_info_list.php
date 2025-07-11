<?php
require "../../ajaxconfig.php";

$sign_doc_info_arr = array();
$cus_profile_id = $_POST['cus_profile_id'];
$signed_type = ['0' => 'Customer', '1' => 'Guarantor', '2' => 'Combined', '3' => 'Family Members'];


// Corrected SQL query
$qry = $pdo->query("
    SELECT 
        si.id as s_id, 
        si.sign_type, 
        CASE 
            WHEN si.sign_type = 0 THEN 'NIL'
            WHEN si.sign_type IN (1, 2, 3) THEN CONCAT(fi.fam_name, '-', fi.fam_relationship)
        END as holder_name, 
        si.doc_name,
        si.doc_Count
    FROM signed_doc_info si 
    LEFT JOIN family_info fi ON si.signType_relationship = fi.id
    WHERE si.cus_profile_id = '$cus_profile_id'
");

if ($qry->rowCount() > 0) {
    while ($doc_info = $qry->fetch(PDO::FETCH_ASSOC)) {
        $doc_info['doc_name'] = ($doc_info['doc_name'] == '0') ? 'Signed Document' : '';
        $doc_info['sign_type'] = $signed_type[$doc_info['sign_type']];
        $doc_info['signed_name'] = $doc_info['holder_name'];
        $qry2 = $pdo->query("SELECT uploads FROM signed_upload WHERE signed_info_id = '" . $doc_info['s_id'] . "'");
        $doc_info['upload'] = '';
        if ($qry2->rowCount() > 0) {
            while ($fetchdata = $qry2->fetch()) {
                $doc_info['upload'] .= "<a href='uploads/loan_issue/signed_info/" . $fetchdata['uploads'] . "' target='_blank'>" . $fetchdata['uploads'] . "</a>, ";
            }
        } else {
            $doc_info['upload'] = '';
        }

        $doc_info['action'] = "<span class='icon-border_color signdocActionBtn' value='" . $doc_info['s_id'] . "'></span> 
                               <span class='icon-trash-2 signdocDeleteBtn' value='" . $doc_info['s_id'] . "'></span>";

        $sign_doc_info_arr[] = $doc_info;
    }
}

$pdo = null; // Close connection
echo json_encode($sign_doc_info_arr);
