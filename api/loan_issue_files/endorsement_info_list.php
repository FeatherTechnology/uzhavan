<?php
require "../../ajaxconfig.php";

$endorse_info_arr = array();
$cus_profile_id = $_POST['cus_profile_id'];
$qry = $pdo->query("SELECT ei.id as e_id, ei.*,   CASE 
            WHEN ei.owner_name = 0 THEN cp.cus_name 
            ELSE fi.fam_name 
        END as holder_name, fi.* FROM endorsement_info ei LEFT JOIN family_info fi ON ei.owner_name = fi.id LEFT JOIN customer_profile cp ON ei.cus_profile_id= cp.id WHERE ei.cus_profile_id = '$cus_profile_id' ");
if ($qry->rowCount() > 0) {
    while ($endorse_info = $qry->fetch(PDO::FETCH_ASSOC)) {
        $endorse_info['upload'] = "<a href='uploads/loan_issue/endorsement_info/" . $endorse_info['upload'] . "' target='_blank'>" . $endorse_info['upload'] . "</a>";
        $take_status = $endorse_info['take_status']; // take the latest take_status

        // Action buttons (like your first snippet)
        if ($take_status == 1) {
            $endorse_info['availability'] = 'YES';
            // Document available -> show Take Out
            $endorse_info['info'] = "<button type='button' class='btn btn-danger temp-take-out' 
                        data-cus_profile_id='" . $cus_profile_id . "' 
                        data-tableid='" . $endorse_info['e_id'] . "' 
                        data-doc='endorsement' 
                        data-toggle='modal' 
                        data-target='.temp-take-out-modal'>
                        Take Out
                    </button>";
        } else if ($take_status == 2) {
            $endorse_info['availability'] = 'NO';
            // Document taken out -> show Take In
            $endorse_info['info'] = "<button type='button' class='btn btn-success temp-take-in' 
                        data-cus_profile_id='" . $cus_profile_id . "' 
                        data-tableid='" . $endorse_info['e_id'] . "' 
                        data-doc='endorsement' 
                        data-toggle='modal' 
                        data-target='.temp-take-in-modal'>
                        Take In
                    </button>";
        } else {
            $endorse_info['upload'] = '';
            $endorse_info['availability'] = '';
            $endorse_info['info'] = '';
        }
        $endorse_info['action'] = "<span class='icon-border_color endorseActionBtn' value='" . $endorse_info['e_id'] . "'></span> <span class='icon-trash-2 endorseDeleteBtn' value='" . $endorse_info['e_id'] . "'></span>";
        $endorse_info_arr[] = $endorse_info;
    }
}
$pdo = null; //Connection Close.
echo json_encode($endorse_info_arr);
