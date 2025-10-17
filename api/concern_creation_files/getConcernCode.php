<?php
require "../../ajaxconfig.php";

$myStr = "CC";
$selectIC = $pdo->query("SELECT con_code FROM concern_creation WHERE con_code != '' ");
if($selectIC->rowCount()>0)
{
    $codeAvailable = $pdo->query("SELECT con_code FROM concern_creation WHERE con_code != '' ORDER BY id DESC LIMIT 1");
    while($row = $codeAvailable->fetch()){
        $ac2 = $row["con_code"];
    }
    $appno2 = ltrim(strstr($ac2, '-'), '-'); $appno2 = $appno2+1;
    $con_code = $myStr."-". "$appno2";
}
else
{
    $initialapp = $myStr."-101";
    $con_code = $initialapp;
}

echo json_encode($con_code);

// Close the database pdoion
$pdo = null;
?>