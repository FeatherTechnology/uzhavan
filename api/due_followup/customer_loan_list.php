<?php
require '../../ajaxconfig.php';

$update_doc_list_arr = array();
$cus_id = $_POST['cus_id'];
$qry = $pdo->query("SELECT lelc.cus_id,lelc.cus_profile_id, lelc.id, lelc.loan_id, lc.loan_category, lelc.loan_date,lelc.loan_amount,cs.closed_date,cs.status as c_sts,cs.coll_status FROM loan_entry_loan_calculation lelc 
LEFT JOIN loan_category_creation lcc ON lelc.loan_category = lcc.id 
LEFT JOIN loan_category lc ON lcc.loan_category = lc.id 
LEFT JOIN customer_status cs ON lelc.id = cs.loan_calculation_id 
WHERE cs.cus_id = '$cus_id' AND cs.status = 7");
if ($qry->rowCount() > 0) {
    while ($loanInfo = $qry->fetch(PDO::FETCH_ASSOC)) {
        $loanDate = new DateTime($loanInfo['loan_date']);
        $loanInfo['loan_date'] = $loanDate->format('d-m-Y');
        $loanInfo['loan_amount'] = moneyFormatIndia($loanInfo['loan_amount']);
        $loanInfo['c_sts'] = 'Present';
        $loanInfo['sub_status'] = $loanInfo['coll_status'];

        $loanInfo['charts'] = "<div class='dropdown'>
        <button class='btn btn-outline-secondary'><i class='fa'>&#xf107;</i></button>
        <div class='dropdown-content'>
        <a href='#' class='due-chart' value='" . $loanInfo['cus_profile_id'] . "' data-value ='" . $loanInfo['cus_id'] . "'>Due Chart</a>
        <a href='#' class='penalty-chart' value='" . $loanInfo['cus_profile_id'] . "' data-value ='" . $loanInfo['cus_id'] . "'>Penalty Chart</a>
        <a href='#' class='fine-chart' value='" . $loanInfo['cus_profile_id'] . "' >Fine Chart</a>
        <a href='#' class='commitment-chart' value='" . $loanInfo['cus_profile_id'] . "'>Commitment Chart</a>
        </div>
        </div>";

        $loanInfo['info'] = "<div class='dropdown'>
            <button class='btn btn-outline-secondary'>
                <i class='fa'>&#xf107;</i>
            </button>
            <div class='dropdown-content'>";
        $loanInfo['info'] .=  "<a href='#' class='customer-profile' value='" . $loanInfo['cus_profile_id'] . "'>Customer Profile</a>";
        $loanInfo['info'] .=  " <a href='#' class='documentation' value='" . $loanInfo['cus_profile_id'] . "'>Documentation</a>";
        $loanInfo['info'] .=  "  <a href='#' class='loan-calculation' value='" . $loanInfo['id'] . "'>Loan Calculation</a>";
        $loanInfo['info'] .=  "  <a href='#' class='loan-history' value='" . $loanInfo['cus_id'] . "'>Loan History</a>";
        $loanInfo['info'] .=  "  <a href='#' class='doc-history' value='" . $loanInfo['cus_id'] . "'>Document History</a>";

        $loanInfo['info'] .=  "  </div> </div>";


        $loanInfo['action'] = '<div class="dropdown">
        <button type="button" class="btn btn-outline-secondary"><i class="fa">&#xf107;</i></button>
        <div class="dropdown-content">';

      $loanInfo['action'] .= "<a href='#' class='commitment-form' value='" . $loanInfo['cus_profile_id'] . "'data-value ='" . $loanInfo['cus_id'] . "'>New Commitment</a>";
        $loanInfo['action'] .= "</div></div>";
        $update_doc_list_arr[] = $loanInfo; // Append to the array
    }
}
$pdo = null; //Close Connection.
echo json_encode($update_doc_list_arr);

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
