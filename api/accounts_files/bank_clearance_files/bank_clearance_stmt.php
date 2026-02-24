<?php
include('../../../ajaxconfig.php');
session_start();

$user_id = $_SESSION['user_id'] ?? '';
$bank_id = $_POST['bank_id'] ?? '';

$bank_list_arr = [];
$i = 1;

$qry = $pdo->query("
    SELECT * 
    FROM bank_clearance 
    WHERE insert_login_id = '$user_id' 
    AND bank_id = '$bank_id' 
    AND clr_status = 0
");

if ($qry->rowCount() > 0) {

    while ($row = $qry->fetch(PDO::FETCH_ASSOC)) {

        $row['sno'] = $i;
        $row['credit'] = moneyFormatIndia($row['credit']);
        $row['debit'] = moneyFormatIndia($row['debit']);
        $row['balance'] = moneyFormatIndia($row['balance']);
        $row['transaction_amount'] = moneyFormatIndia($row['transaction_amount']);

        $bank_list_arr[] = $row;
        $i++;
    }

    echo json_encode([
        'status' => 'success',
        'data' => $bank_list_arr
    ]);

} else {

    echo json_encode([
        'status' => 'empty',
        'message' => 'Given Bank Has No Statements!'
    ]);
}


// function runcreditCategories($pdo, $bank_id)
// {

//     $catqry = "SELECT * from cash_tally_modes where bankcredit = 0  ";
//     $runqry = $pdo->query($catqry);

//     $selectTxt = "<input type='hidden' value='$bank_id'><select class='form-control clr_cat' ><option value=''>Select Category</option>";
//     while ($catrow = $runqry->fetch()) {
//         $selectTxt .= "<option value='" . $catrow['id'] . "'>" . $catrow['modes'] . "</option>";
//     }
//     $selectTxt .= "</select><input type='hidden' value='Credit'>";

//     return $selectTxt;
// }

// function rundebitCategories($pdo, $bank_id)
// {

//     $catqry = "SELECT * from cash_tally_modes where bankdebit = 0  ";
//     $runqry = $pdo->query($catqry);

//     $selectTxt = "<input type='hidden' value='$bank_id'><select class='form-control clr_cat' ><option value=''>Select Category</option>";
//     while ($catrow = $runqry->fetch()) {
//         $selectTxt .= "<option value='" . $catrow['id'] . "'>" . $catrow['modes'] . "</option>";
//     }
//     $selectTxt .= "</select><input type='hidden' value='Debit'>";

//     return $selectTxt;
// }

//Format number in Indian Format
function moneyFormatIndia($num)
{
    // 🔹 FIX: handle -0 / 0 / 0.00
    if ((float)$num == 0) {
        return '0';
    }

    $isNegative = false;
    if ($num < 0) {
        $isNegative = true;
        $num = abs($num);
    }

    $numStr = (string)$num;
    $parts = explode('.', $numStr);
    $intPart = $parts[0];
    $decPart = isset($parts[1]) ? '.' . $parts[1] : '';

    $len = strlen($intPart);
    if ($len <= 3) {
        $formatted = $intPart;
    } else {
        $lastThree = substr($intPart, -3);
        $rest = substr($intPart, 0, -3);
        $rest = preg_replace("/\B(?=(\d{2})+(?!\d))/", ",", $rest);
        $formatted = $rest . "," . $lastThree;
    }

    return ($isNegative ? '-' : '') . $formatted . $decPart;
}
?>