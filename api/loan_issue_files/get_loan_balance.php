<?php
require '../../ajaxconfig.php';

$detailrecords = array();

if (isset($_POST['cus_profile_id'])) {
    $cus_profile_id = $_POST['cus_profile_id'];

    $qry = $pdo->query("SELECT balance_amount FROM loan_issue WHERE cus_profile_id = '$cus_profile_id' ORDER BY id DESC LIMIT 1");
    $rowCnt = $qry->rowCount();

    if ($rowCnt > 0) {
        $row = $qry->fetch(PDO::FETCH_ASSOC);
        $detailrecords['rowCnt'] = $rowCnt;
        $detailrecords['balance_amount'] = $row['balance_amount'];
    } else {
        $detailrecords['rowCnt'] = 0;
        $detailrecords['balance_amount'] = 0;
    }
} else {
    $detailrecords['rowCnt'] = 0;
    $detailrecords['balance_amount'] = 0;
}

$pdo = null;
echo json_encode($detailrecords);
