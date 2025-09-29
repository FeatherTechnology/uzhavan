<?php
require "../../ajaxconfig.php";

$cheque_info_arr = array();
$cus_profile_id = $_POST['cus_profile_id'];
$qry = $pdo->query("SELECT * FROM `cheque_info` WHERE cus_profile_id = '$cus_profile_id' ");
if ($qry->rowCount() > 0) {
    while ($cheque_info = $qry->fetch(PDO::FETCH_ASSOC)) {
        if ($cheque_info['holder_type'] == '1') {
            $holder_type = 'Customer';
        } else if ($cheque_info['holder_type'] == '2') {
            $holder_type = 'Guarantor';
        } else if ($cheque_info['holder_type'] == '3') {
            $holder_type = 'Family Member';
        }
        $cheque_info['holder_type'] = $holder_type;

        $qry3 = $pdo->query("SELECT cheque_no , take_status FROM cheque_no_list WHERE cheque_info_id = '" . $cheque_info['id'] . "'");
        $cheque_info['cheque_no'] = '';

        if ($qry3->rowCount() > 0) {
            while ($fetchdata = $qry3->fetch()) {
                $cheque_info['cheque_no'] .= $fetchdata['cheque_no'] . ', ';
                $take_status = $fetchdata['take_status'];
            }
            // remove last comma + space
            $cheque_info['cheque_no'] = rtrim($cheque_info['cheque_no'], ', ');
        } else {
            $cheque_info['cheque_no'] = '';
        }

        $qry2 = $pdo->query("SELECT uploads FROM cheque_upd WHERE cheque_info_id = '" . $cheque_info['id'] . "'");
        $cheque_info['upload'] = '';
        if ($qry2->rowCount() > 0) {
            while ($fetchdata = $qry2->fetch()) {
                $cheque_info['upload'] .= "<a href='uploads/loan_issue/cheque_info/" . $fetchdata['uploads'] . "' target='_blank'>" . $fetchdata['uploads'] . "</a>, ";
            }
            $cheque_info['upload'] = rtrim($cheque_info['upload'], ', ');

            // Action buttons (like your first snippet)
            if ($take_status == 1) {
                $cheque_info['availability'] = 'YES';
                // Document available -> show Take Out
                $cheque_info['info'] = "<button type='button' class='btn btn-danger temp-take-out' 
                        data-cus_profile_id='" . $cus_profile_id . "' 
                        data-tableid='" . $cheque_info['id'] . "' 
                        data-doc='cheque' 
                        data-toggle='modal' 
                        data-target='.temp-take-out-modal'>
                        Take Out
                    </button>";
            } else if ($take_status == 2) {
                $cheque_info['availability'] = 'NO';
                // Document taken out -> show Take In
                $cheque_info['info'] = "<button type='button' class='btn btn-success temp-take-in' 
                        data-cus_profile_id='" . $cus_profile_id . "' 
                        data-tableid='" . $cheque_info['id'] . "' 
                        data-doc='cheque' 
                        data-toggle='modal' 
                        data-target='.temp-take-in-modal'>
                        Take In
                    </button>";
            }
        } else {
            $cheque_info['upload'] = '';
            $cheque_info['availability'] = '';
            $cheque_info['info'] = '';
        }

        $cheque_info['action'] = "<span class='icon-border_color chequeActionBtn' value='" . $cheque_info['id'] . "'></span> <span class='icon-trash-2 chequeDeleteBtn' value='" . $cheque_info['id'] . "'></span>";
        $cheque_info_arr[] = $cheque_info;
    }
}
$pdo = null; //Connection Close.
echo json_encode($cheque_info_arr);
