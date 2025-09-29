<?php
require "../../ajaxconfig.php";

$mort_info_arr = array();
$cus_profile_id = $_POST['cus_profile_id'];
$qry = $pdo->query("SELECT mi.id as m_id, mi.*,     CASE 
            WHEN mi.property_holder_name = 0 THEN cp.cus_name 
            ELSE fi.fam_name 
        END as holder_name,  fi.* FROM mortgage_info mi LEFT JOIN family_info fi ON mi.property_holder_name = fi.id LEFT JOIN customer_profile cp ON mi.cus_profile_id= cp.id WHERE mi.cus_profile_id = '$cus_profile_id' ");
if ($qry->rowCount() > 0) {
    while ($mort_info = $qry->fetch(PDO::FETCH_ASSOC)) {
        $mort_info['upload'] = "<a href='uploads/loan_issue/mortgage_info/" . $mort_info['upload'] . "' target='_blank'>" . $mort_info['upload'] . "</a>";
        $take_status = $mort_info['take_status']; // take the latest take_status

        // Action buttons (like your first snippet)
        if ($take_status == 1) {
            $mort_info['availability'] = 'YES';
            // Document available -> show Take Out
            $mort_info['info'] = "<button type='button' class='btn btn-danger temp-take-out' 
                        data-cus_profile_id='" . $cus_profile_id . "' 
                        data-tableid='" . $mort_info['m_id'] . "' 
                        data-doc='mortgage' 
                        data-toggle='modal' 
                        data-target='.temp-take-out-modal'>
                        Take Out
                    </button>";
        } else if ($take_status == 2) {
            $mort_info['availability'] = 'NO';
            // Document taken out -> show Take In
            $mort_info['info'] = "<button type='button' class='btn btn-success temp-take-in' 
                        data-cus_profile_id='" . $cus_profile_id . "' 
                        data-tableid='" . $mort_info['m_id'] . "' 
                        data-doc='mortgage' 
                        data-toggle='modal' 
                        data-target='.temp-take-in-modal'>
                        Take In
                    </button>";
        } else {
            $mort_info['upload'] = '';
            $mort_info['availability'] = '';
            $mort_info['info'] = '';
        }
        $mort_info['action'] = "<span class='icon-border_color mortActionBtn' value='" . $mort_info['m_id'] . "'></span> <span class='icon-trash-2 mortDeleteBtn' value='" . $mort_info['m_id'] . "'></span>";
        $mort_info_arr[] = $mort_info;
    }
}
$pdo = null; //Connection Close.
echo json_encode($mort_info_arr);
