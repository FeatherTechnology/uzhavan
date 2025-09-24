<?php
require '../../ajaxconfig.php';
@session_start();
$user_id = $_SESSION['user_id'];
$cus_id = $_POST['cus_id'];

$pending_sts = explode(',', $_POST["pending_sts"]);
$od_sts = explode(',', $_POST["od_sts"]);
$due_nil_sts = explode(',', $_POST["due_nil_sts"]);
$bal_amt = explode(',', $_POST["bal_amt"]);

function moneyFormatIndia($num)
{
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
    return $thecash;
}

$loan_list_arr = array();

$qry = $pdo->query("SELECT lelc.cus_profile_id as cp_id, lelc.cus_id, lelc.loan_id, lc.loan_category, li.issue_date, lelc.loan_amount, us.collection_access,cs.id as cus_sts_id,cs.status as cus_sts
FROM loan_entry_loan_calculation lelc
JOIN customer_profile cp ON lelc.cus_profile_id = cp.id
JOIN loan_category_creation lcc ON lelc.loan_category = lcc.id
JOIN loan_category lc ON lcc.loan_category = lc.id
JOIN customer_status cs ON lelc.id = cs.loan_calculation_id
JOIN loan_issue li ON lelc.cus_profile_id = li.cus_profile_id
LEFT JOIN users us ON us.id = '$user_id'
JOIN users u ON FIND_IN_SET(cp.line, u.line)
JOIN users urs ON FIND_IN_SET(lelc.loan_category, urs.loan_category)
WHERE lelc.cus_id = '$cus_id' AND cs.status IN(7,15,16) AND u.id ='$user_id' AND urs.id ='$user_id' AND li.balance_amount = 0 ORDER BY lelc.id DESC ");
if ($qry->rowCount() > 0) {
    $curdate = date('Y-m-d');
    $i = 1;
    while ($loanInfo = $qry->fetch(PDO::FETCH_ASSOC)) {
        $loanInfo['issue_date'] = date('d-m-Y', strtotime($loanInfo['issue_date']));
        $loanInfo['loan_amount'] = moneyFormatIndia($loanInfo['loan_amount']);
        $loanInfo['bal_amount'] = moneyFormatIndia($bal_amt[$i - 1]);
        $loanInfo['status'] = 'Present';
        if ($loanInfo['cus_sts'] == 15) {
            $sub_sts = 'Error';
        } elseif ($loanInfo['cus_sts'] == 16) {
            $sub_sts = 'Legal';
        } else {
            // 🔹 Normal sub-status logic
            if (date('Y-m-d', strtotime($loanInfo['issue_date'])) > $curdate && $bal_amt[$i - 1] != 0) {
                $sub_sts = 'Current';
            } else {
                if ($pending_sts[$i - 1] == 'true' && $od_sts[$i - 1] == 'false') {
                    $sub_sts = 'Pending';
                } elseif ($od_sts[$i - 1] == 'true' && $due_nil_sts[$i - 1] == 'false') {
                    $sub_sts = 'OD';
                } elseif ($due_nil_sts[$i - 1] == 'true') {
                    $sub_sts = 'Due Nil';
                } elseif ($pending_sts[$i - 1] == 'false') {
                    $sub_sts = 'Current';
                }
            }
        }
        $loanInfo['sub_status'] = $sub_sts;
        $loanInfo['charts'] = "<div class='dropdown'>
        <button class='btn btn-outline-secondary'><i class='fa'>&#xf107;</i></button>
        <div class='dropdown-content'>
        <a href='#' class='due-chart' value='" . $loanInfo['cp_id'] . "'>Due Chart</a>
        <a href='#' class='penalty-chart' value='" . $loanInfo['cp_id'] . "'>Penalty Chart</a>
        <a href='#' class='fine-chart' value='" . $loanInfo['cp_id'] . "'>Fine Chart</a>
        <a href='#' class='commitment-chart' value='" . $loanInfo['cp_id'] . "'>Commitment Chart</a>
        </div>
        </div>";

        $loanInfo['action'] = "<div class='dropdown'><button class='btn btn-outline-secondary'><i class='fa'>&#xf107;</i><div class='dropdown-content'>";
        if (!in_array($loanInfo['cus_sts'], [15, 16])) {
            $loanInfo['action'] .= "<a href='#' class='pay-due' value='" . $loanInfo['cp_id'] . "'>Pay Due</a>";
        }

        $loanInfo['action'] .= "<a href='#' class='move-error' value='" . $loanInfo['cus_sts_id'] . "' data-id ='" . $loanInfo['cp_id'] . "'>Move To Error</a>";
        $loanInfo['action'] .= "<a href='#' class='move-legal' value='" . $loanInfo['cus_sts_id'] . "' data-id ='" . $loanInfo['cp_id'] . "'>Move To Legal</a>";
        $loanInfo['action'] .= "<a href='#' class='return-sub' value='" . $loanInfo['cus_sts_id'] . "' data-id ='" . $loanInfo['cp_id'] . "'>Return Sub Status</a>";


        if ($loanInfo['collection_access'] == 1) {
            $loanInfo['action'] .= "<a href='#' class='fine-form' value='" . $loanInfo['cp_id'] . "'>Fine</a>";
        }

        $loanInfo['action'] .= "<a href='#' class='commitment-form' value='" . $loanInfo['cp_id'] . "'>New Commitment</a>";

        $loanInfo['action'] .= "</div></div>";

        $loan_list_arr[] = $loanInfo; // Append to the array

        $i++;
    }
}
$pdo = null; //Close Connection.
echo json_encode($loan_list_arr);
