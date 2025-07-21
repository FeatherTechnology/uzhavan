<?php
require '../../ajaxconfig.php';
$status = [
    1 => 'Loan Entry',
    2 => 'Loan Entry',
    3 => 'Loan Approval',
    4 => 'Loan Issued',
    5 => 'Loan Approval',
    6 => 'Loan Approval',
    7 => 'Present',
    8 => 'Closed',
    9 => 'Closed',
    10 => 'NOC',
    11 => 'NOC',
    12 => 'NOC',
    13 => 'Loan Issue',
    14 => 'Loan Issue'
];
//$sub_status = [''=>'',1 => 'Consider', 2 => 'Reject'];
$update_doc_list_arr = array();
$cus_id = $_POST['cus_id'];
$qry = $pdo->query("SELECT lelc.cus_id,lelc.cus_profile_id, lelc.id, lelc.loan_id, lc.loan_category, lelc.loan_date,lelc.loan_amount,cs.closed_date,cs.status as c_sts,cs.sub_status FROM loan_entry_loan_calculation lelc 
LEFT JOIN loan_category_creation lcc ON lelc.loan_category = lcc.id 
LEFT JOIN loan_category lc ON lcc.loan_category = lc.id 
LEFT JOIN customer_status cs ON lelc.id = cs.loan_calculation_id 
WHERE cs.cus_id = '$cus_id' AND cs.status = 7");
if ($qry->rowCount() > 0) {
    while ($loanInfo = $qry->fetch(PDO::FETCH_ASSOC)) {
        $loanDate = new DateTime($loanInfo['loan_date']);
        $loanInfo['loan_date'] = $loanDate->format('d-m-Y');
          $loanInfo['loan_amount'] = moneyFormatIndia($loanInfo['loan_amount']);
      
        $originalStatus = $loanInfo['c_sts']; // Convert numeric status to its string representation for display 
        $loanInfo['c_sts'] = isset($status[$originalStatus]) ? $status[$originalStatus] : '';
        // $loanInfo['c_sts'] = $status[$loanInfo['c_sts']];
        $loanCustomerStatus = loanCustomerStatus($pdo, $loanInfo['cus_profile_id']);
        $loanInfo['sub_status']  = $loanCustomerStatus;
         $loanInfo['charts'] = "<div class='dropdown'>
        <button class='btn btn-outline-secondary'><i class='fa'>&#xf107;</i></button>
        <div class='dropdown-content'>
        <a href='#' class='due-chart' value='" . $loanInfo['cp_id'] . "'>Due Chart</a>
        <a href='#' class='penalty-chart' value='" . $loanInfo['cp_id'] . "'>Penalty Chart</a>
        <a href='#' class='fine-chart' value='" . $loanInfo['cp_id'] . "'>Fine Chart</a>
        <a href='#' class='commitment-chart' value='" . $loanInfo['cp_id'] . "'>Commitment Chart</a>
        </div>
        </div>";
        $loanInfo['action'] = '<div class="dropdown">
        <button type="button" class="btn btn-outline-secondary"><i class="fa">&#xf107;</i></button>
        <div class="dropdown-content">';
        
        if ($originalStatus < 8) {
            $loanInfo['action'] .= "<a href='#' class='doc-update' value='" . $loanInfo['cus_profile_id'] . "' data-id='" . $loanInfo['cus_id'] . "' title='update details'>Update</a>";
        }
        $loanInfo['action'] .= "<a href='#' class='doc-print' value='" . $loanInfo['cus_profile_id'] . "' title='print'>Print</a>";


        $loanInfo['action'] .= "</div></div>";


        $loanInfo['info'] = "<div class='dropdown'>
            <button class='btn btn-outline-secondary'>
                <i class='fa'>&#xf107;</i>
            </button>
            <div class='dropdown-content'>";
        $loanInfo['info'] .=  "<a href='#' class='customer-profile' value='" . $row['cus_profile_id'] . "'>Customer Profile</a>";
        $loanInfo['info'] .=  "  <a href='#' class='loan-calculation' value='" . $row['id'] . "'>Loan Calculation</a>";
        $loanInfo['info'] .=  " <a href='#' class='documentation' value='" . $row['cus_profile_id'] . "'>Documentation</a>";
        
        if ($row['status'] >= '8' && $row['status'] != '13' && $row['status'] != '14') {
            $loanInfo['info'] .= " <a href='#' class='closed-remark' value='" . $row['cus_profile_id'] . "'>Remark View</a>";
        }
        if ($row['status'] == '10' || $row['status'] == '11') {
            $loanInfo['info'] .=  " <a href='#' class='noc-summary' value='" . $row['cus_profile_id'] . "'>Noc Summary</a>";
        }
        $loanInfo['info'] .=  "  </div> </div>";

        $update_doc_list_arr[] = $loanInfo; // Append to the array
    }
}
$pdo = null; //Close Connection.
echo json_encode($update_doc_list_arr);
function loanCustomerStatus($pdo, $cus_profile_id)
{
    $qry1 = $pdo->query("SELECT lelc.loan_date, cs.status as cs_status, cs.sub_status as sub_sts
    FROM loan_entry_loan_calculation lelc
    JOIN customer_status cs ON lelc.id = cs.loan_calculation_id
    WHERE lelc.cus_profile_id = '$cus_profile_id' ORDER BY lelc.id DESC");

    if ($qry1->rowCount() > 0) {
        $row1 = $qry1->fetch(PDO::FETCH_ASSOC);
        $cs_status = $row1['cs_status'];
        $sub_sts = $row1['sub_sts'];
        $loan_date = $row1['loan_date'];
        $pending_sts = isset($_POST["pending_sts"]) ? explode(',', $_POST["pending_sts"]) : [];
        $od_sts = isset($_POST["od_sts"]) ? explode(',', $_POST["od_sts"]) : [];
        $due_nil_sts = isset($_POST["due_nil_sts"]) ? explode(',', $_POST["due_nil_sts"]) : [];
        $bal_amt = isset($_POST["bal_amt"]) ? explode(',', $_POST["bal_amt"]) : [];
        $i = 1;
        $status = '';
        if ($cs_status == '1' || $cs_status == '2') {
            $status = 'Loan Entry';
        } elseif ($cs_status == '3') {
            $status = 'In Approval';
        } elseif ($cs_status == '4') {
            $status = 'In Loan Issue';
        } elseif ($cs_status == '5') {
            $status = 'Cancel';
        } elseif ($cs_status == '6') {
            $status = 'Revoke';
        } elseif ($cs_status == '7') {
            $curdate = date('Y-m-d');
            if (date('Y-m-d', strtotime($loan_date)) > date('Y-m-d', strtotime($curdate)) && isset($bal_amt[$i - 1]) && $bal_amt[$i - 1] != 0) {
                $status = 'Current';
            } else {
                if (isset($pending_sts[$i - 1]) && $pending_sts[$i - 1] == 'true' && isset($od_sts[$i - 1]) && $od_sts[$i - 1] == 'false') {
                    $status = 'Pending';
                } elseif (isset($od_sts[$i - 1]) && $od_sts[$i - 1] == 'true' && isset($due_nil_sts[$i - 1]) && $due_nil_sts[$i - 1] == 'false') {
                    $status = 'OD';
                } elseif (isset($due_nil_sts[$i - 1]) && $due_nil_sts[$i - 1] == 'true') {
                    $status = 'Due Nil';
                } elseif (isset($pending_sts[$i - 1]) && $pending_sts[$i - 1] == 'false') {
                    $status = 'Current';
                }
            }
        } elseif ($cs_status == '8') {
            $status = 'In Closed';
        } elseif ($cs_status == '9') {
            if ($sub_sts == '1') {
                $status = 'Consider';
            } elseif ($sub_sts == '2') {
                $status = 'Rejected';
            }
        } elseif ($cs_status == '10') {
            $status = 'Pending';
        } elseif ($cs_status == '11') {
            $status = 'Completed';
        } elseif ($cs_status == '12') {
            $status = 'Completed';
        } elseif ($cs_status == '13') {
            $status = 'Cancel';
        } elseif ($cs_status == '14') {
            $status = 'Revoke';
        }

        return $status;
    }

    return ''; // Default return value if no conditions match
}
function moneyFormatIndia($num1)
{
    if ($num1 < 0) {
        $num = str_replace("-", "", $num1);
    } else {
        $num = $num1;
    }
    $explrestunits = "";
    if (strlen($num) > 3) {
        $lastthree = substr($num, strlen($num) - 3, strlen($num));
        $restunits = substr($num, 0, strlen($num) - 3);
        $restunits = (strlen($restunits) % 2 == 1) ? "0" . $restunits : $restunits;
        $expunit = str_split($restunits, 2);
        for ($i = 0; $i < sizeof($expunit); $i++) {
            if ($i == 0) {
                $explrestunits .= (int)$expunit[$i] . ",";
            } else {
                $explrestunits .= $expunit[$i] . ",";
            }
        }
        $thecash = $explrestunits . $lastthree;
    } else {
        $thecash = $num;
    }

    if ($num1 < 0 && $num1 != '') {
        $thecash = "-" . $thecash;
    }

    return $thecash;
}