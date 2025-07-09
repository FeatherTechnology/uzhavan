<?php
require '../../ajaxconfig.php';

$famList_arr = array();

$adhaarno = $_POST['adhaarno'];
$cusId = $_POST['cusId'];
$cus = $_POST['cus'];

//the fingerprint validation is removed for temporarily so relation is set in outside of while for customer and use "LEFT JOIN" instead of "JOIN". Once validation set revert this code.
if ($cus == '1') {
    $result = $pdo->query("SELECT hand, ansi_template FROM fingerprints where adhar_num = '$cusId' ");

    while ($row = $result->fetch()) {
        $famList_arr['fpTemplate'] = $row['ansi_template'];
        $famList_arr['hand'] = $row['hand'];
    }
} else {
    $result = $pdo->query("SELECT hand, ansi_template FROM fingerprints  where adhar_num ='$adhaarno' ");

    while ($row = $result->fetch()) {
        $famList_arr['fpTemplate'] = $row['ansi_template'];
        $famList_arr['hand'] = $row['hand'];
    }
}

$pdo = null; //Close Connection
echo json_encode($famList_arr);
