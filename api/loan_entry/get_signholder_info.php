<?php
require '../../ajaxconfig.php'; 

$type = $_POST['type'];
$cus_profile_id = $_POST['customer_profile_id'];
$cus_id = $_POST['cus_id'];
$holder_name = array();

if ($type == '0') {
    $cus_profile = $pdo->query("SELECT `cus_name` FROM customer_profile WHERE id = '$cus_profile_id'");
    $cus = $cus_profile->fetch();
    $holder_name = array("name" => $cus['cus_name']);
}

if ($type == '1') {
    $cus_profile = $pdo->query("SELECT `guarantor_name` FROM customer_profile WHERE id = '$cus_profile_id'");
    $cus = $cus_profile->fetch();
    $guarentor_id = $cus['guarantor_name'];

    $result = $pdo->query("SELECT fam_name, fam_relationship FROM family_info WHERE id = '$guarentor_id'");
    $row = $result->fetch();

    $holder_name = array("name" => $row['fam_name'], "relationship" => $row['fam_relationship']);
}

if ($type == '2' || $type == '3') {
    $result = $pdo->query("SELECT fam_name, fam_relationship, id FROM family_info WHERE cus_id = '$cus_id'");
    $rows = $result->fetchAll();

    $holder_name = array();
    foreach ($rows as $row) {
        $holder_name[] = array(
            "name" => $row['fam_name'],
            "relationship" => $row['fam_relationship'],
            "id" => $row['id']
        );
    }

    // echo json_encode($holder_name); // if you're returning this to AJAX
}


echo json_encode($holder_name);
$pdo = null;
