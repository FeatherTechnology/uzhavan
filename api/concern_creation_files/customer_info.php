<?php
require "../../ajaxconfig.php";
$aadhar_num = $_POST['aadhar_num'];
$result = array();
$qry2 = $pdo->query("SELECT cr.cus_id, cr.aadhar_num , cr.cus_name, anc.areaname AS area, lnc.linename, cr.mobile1
FROM customer_register cr
LEFT JOIN line_name_creation lnc ON cr.line = lnc.id
LEFT JOIN area_name_creation anc ON cr.area = anc.id
LEFT JOIN area_creation ac ON cr.line = ac.line_id
WHERE cr.aadhar_num = '$aadhar_num' ");
if ($qry2->rowCount() > 0) {
    $result = $qry2->fetchAll(PDO::FETCH_ASSOC);
}
$pdo = null;
echo json_encode($result);
