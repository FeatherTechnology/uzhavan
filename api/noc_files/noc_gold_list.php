<?php
require "../../ajaxconfig.php";

$endorsement_info_arr = array();
$cp_id = $_POST['cp_id'];
$qry = $pdo->query("SELECT `id`,`gold_type`,`purity`,`weight`,`noc_status`, `date_of_noc`, `noc_member`, `noc_relationship` FROM `gold_info` WHERE `cus_profile_id` = '$cp_id'");
if ($qry->rowCount() > 0) {
    while ($result = $qry->fetch()) {
        if (!empty($result['date_of_noc']) && $result['date_of_noc'] != '0000-00-00') {
            $date = DateTime::createFromFormat('Y-m-d', $result['date_of_noc']);
            $result['date_of_noc'] = $date ? $date->format('d-m-Y') : '';
        } else {
            $result['date_of_noc'] = '';
        }

        $result['action'] = "<input type='checkbox' class='noc_gold_chkbx' name='noc_gold_chkbx' value='" . $result['id'] . "' data-id='".$result['noc_status']."'>";
        $endorsement_info_arr[] = $result;
    }
}

echo json_encode($endorsement_info_arr);
