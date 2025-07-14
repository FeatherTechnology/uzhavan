<?php
require "../../ajaxconfig.php";

$sign_doc_info_arr = array();
$cus_profile_id = $_POST['cp_id'];
$signed_type = ['0' => 'Customer', '1' => 'Guarantor', '2' => 'Combined', '3' => 'Family Members'];
// Corrected SQL query
$qry = $pdo->query("
    SELECT 
        si.id, 
        si.sign_type, 
        si.date_of_noc,
        si.noc_relationship,
        si.noc_status,
        si.noc_member,
        CASE 
            WHEN si.sign_type = 0 THEN cp.cus_name 
            WHEN si.sign_type IN (1, 2, 3) THEN CONCAT(fi.fam_name)
        END as holder_name, 
        si.doc_name,
        si.doc_Count
    FROM signed_doc_info si 
    LEFT JOIN family_info fi ON si.signType_relationship = fi.id
    LEFT JOIN customer_profile cp ON si.cus_profile_id= cp.id 
    WHERE si.cus_profile_id = '$cus_profile_id'
");
if ($qry->rowCount() > 0) {
    while ($result = $qry->fetch()) {
        $result['doc_name'] = ($result['doc_name'] == '0') ? 'Signed Document' : '';
        $result['sign_type'] = $signed_type[$result['sign_type']];
        $qry2 = $pdo->query("SELECT uploads FROM signed_upload WHERE signed_info_id = '" . $result['id'] . "'");
        $result['upload'] = '';
        if ($qry2->rowCount() > 0) {
            while ($fetchdata = $qry2->fetch()) {
                $result['upload'] .= "<a href='uploads/loan_issue/signed_info/" . $fetchdata['uploads'] . "' target='_blank'>" . $fetchdata['uploads'] . "</a>, ";
            }
        } else {
            $result['upload'] = '';
        }
        $result['action'] = "<input type='checkbox' class='noc_signed_info_chkbx' name='noc_signed_info_chkbx' value='" . $result['id'] . "' data-id='" . $result['noc_status'] . "'>";
        $sign_doc_info_arr[] = $result;
    }
}

echo json_encode($sign_doc_info_arr);
