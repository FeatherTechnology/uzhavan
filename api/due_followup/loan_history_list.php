<?php
require '../../ajaxconfig.php';

$update_doc_list_arr = array();
$cus_id = $_POST['cus_id'];
$status = [
    7 => 'Present',
    8 => 'Closed',
    9 => 'Closed',
    10 => 'NOC',
    11 => 'NOC',
    12 => 'NOC',
];
$qry = $pdo->query("SELECT lelc.cus_id,lelc.cus_profile_id, lelc.id, lelc.loan_id, lc.loan_category, lelc.loan_date,lelc.loan_amount,cs.closed_date,cs.status as c_sts,cs.coll_status,cs.sub_status,ag.agent_name FROM loan_entry_loan_calculation lelc 
LEFT JOIN loan_category_creation lcc ON lelc.loan_category = lcc.id 
LEFT JOIN agent_creation ag ON lelc.agent_id = ag.id 
LEFT JOIN loan_category lc ON lcc.loan_category = lc.id 
LEFT JOIN customer_status cs ON lelc.id = cs.loan_calculation_id 
WHERE cs.cus_id = '$cus_id' AND cs.status BETWEEN 7 AND 12");
if ($qry->rowCount() > 0) {
    while ($loanInfo = $qry->fetch(PDO::FETCH_ASSOC)) {
        $loanDate = new DateTime($loanInfo['loan_date']);
        $loanInfo['loan_date'] = $loanDate->format('d-m-Y');
        $loanInfo['loan_amount'] = moneyFormatIndia($loanInfo['loan_amount']);
        $loanInfo['agent_name'] = ($loanInfo['agent_name']);
        if (!empty($loanInfo['closed_date']) && $loanInfo['closed_date'] != '0000-00-00') {
            $closedDate = new DateTime($loanInfo['closed_date']);
            $loanInfo['closed_date'] = $closedDate->format('d-m-Y');
        }
        $originalStatus = $loanInfo['c_sts']; // Convert numeric status to its string representation for display 
        $loanInfo['c_sts'] = isset($status[$originalStatus]) ? $status[$originalStatus] : '';
        // 2. Customer Sub Status (More descriptive status based on other fields)
        $subStatusText = '';

        switch ($originalStatus) {
            case '7':
                $subStatusText = $loanInfo['coll_status'];
                break;
            case '8':
                $subStatusText = 'In Closed';
                break;
            case '9':
                $subStatus = $loanInfo['sub_status'];
                if ($subStatus == '1') {
                    $subStatusText = 'Consider';
                } elseif ($subStatus == '2') {
                    $subStatusText = 'Rejected';
                }
                break;
            case '10':
                $subStatusText = 'Pending';
                 break;
            case '11':
                $subStatusText = 'Completed';
                 break;
            case '12':
                $subStatusText = 'Removed';
                break;
        }

        $loanInfo['customer_sub_status'] = $subStatusText;

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
