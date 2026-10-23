<?php

session_start();
include '../../ajaxconfig.php';

$where = "";

if (isset($_POST['from_date']) && isset($_POST['to_date']) && $_POST['from_date'] != '' && $_POST['to_date'] != '') {
    $from_date = date('Y-m-d', strtotime($_POST['from_date']));
    $to_date = date('Y-m-d', strtotime($_POST['to_date']));
    $where  = "AND (date(c.created_date) >= '" . $from_date . "') AND (date(c.created_date) <= '" . $to_date . "')";
}

$selectedType = $_POST['selectedType'] ?? '';
$selectedVal = $_POST['selectedVal'] ?? '';

if (is_array($selectedVal)) {
    $selectedVal = implode(',', $selectedVal);
}

if ($selectedType == '2') { //Region
    $where .= " AND lnc.id IN ($selectedVal)";
}

$user_ids = $_POST['user_id'] ?? '';
$user_ids = preg_replace('/[^0-9,]/', '', $user_ids); // clean
$id_list = implode(',', array_filter(explode(',', $user_ids), 'is_numeric'));
if (!empty($id_list)) {
    $where .= " AND c.insert_login_id IN ($id_list) ";
}

$role_arr = [1 => 'Director', 2 => 'Agent', 3 => 'Staff'];
$comm_err = [1 => 'Error', 2 => 'Clear'];
$follow_type = [1 => 'Direct', 2 => 'Mobile', 8 => 'Paid'];
$follow_status = [1 => 'Commitment', 2 => 'Unavailable', 3 => 'RNR', 4 => 'Not Reachable', 5 => 'Switch Off', 6 => 'Not in Use', 7 => 'Blocked', 8 => 'Paid'];
$per_type_arr = [1 => 'Customer', 2 => 'Guarantor', 3 => 'Family Member'];

$column = array(
    'c.id',
    'cp.aadhar_num',
    'cp.cus_id',
    'c.created_date',
    'c.created_date',
    'anc.areaname',
    'c.follow_type',
    'c.follow_status',
    'c.follow_person_name',
    'c.person_name',
    'c.relationship',
    'c.remark',
    'c.commitment_date',
    'u.role',
    'u.name',
    'c.hint',
    'c.comm_err'
);

$query = "SELECT
    cp.aadhar_num,
    cp.cus_id,
    c.created_date,
    anc.areaname,
    c.follow_type,
    c.follow_status,
    c.follow_person_name,
    c.person_name,
    c.relationship,
    c.remark,
    c.commitment_date,
    u.role,
    u.name,
    c.hint,
    c.comm_err
FROM commitment c
LEFT JOIN 
    users u ON u.id = c.insert_login_id
JOIN 
    customer_profile cp ON c.cus_profile_id = cp.id
JOIN 
    area_creation_area_name acan ON cp.area = acan.area_id
JOIN 
    area_name_creation anc ON acan.area_id = anc.id
JOIN 
    area_creation ac ON ac.id = acan.area_creation_id
JOIN 
    line_name_creation lnc ON lnc.id = ac.line_id
WHERE 1
    $where";

if (isset($_POST['search'])) {
    if ($_POST['search'] != "") {
        $query .= " and (c.created_date LIKE '%" . $_POST['search'] . "%' OR
            cp.aadhar_num LIKE '%" . $_POST['search'] . "%' OR
            cp.cus_id LIKE '%" . $_POST['search'] . "%' OR
            anc.areaname LIKE '%" . $_POST['search'] . "%' OR
            c.follow_type LIKE '%" . $_POST['search'] . "%' OR
            c.follow_status LIKE '%" . $_POST['search'] . "%' OR
            c.follow_person_name LIKE '%" . $_POST['search'] . "%' OR
            c.person_name LIKE '%" . $_POST['search'] . "%' OR
            c.relationship LIKE '%" . $_POST['search'] . "%' OR
            c.remark LIKE '%" . $_POST['search'] . "%' OR
            c.commitment_date LIKE '%" . $_POST['search'] . "%' OR
            u.role LIKE '%" . $_POST['search'] . "%' OR
            u.name LIKE '%" . $_POST['search'] . "%' OR
            c.hint LIKE '%" . $_POST['search'] . "%' )";
    }
}

$query .= " GROUP BY c.id ";

if (isset($_POST['order'])) {
    $query .= " ORDER BY " . $column[$_POST['order']['0']['column']] . ' ' . $_POST['order']['0']['dir'];
}

$query1 = "";
if ($_POST['length'] != -1) {
    $query1 = " LIMIT " . $_POST['start'] . ", " . $_POST['length'];
}

$statement = $pdo->prepare($query);

$statement->execute();

$number_filter_row = $statement->rowCount();

if ($_POST['length'] != -1) {
    $statement = $pdo->prepare($query . $query1);
    $statement->execute();
}
$result = $statement->fetchAll();

$data = array();
$sno = 1;
foreach ($result as $row) {
    $sub_array = array();
    $sub_array[] = $sno;
    $sub_array[] = $row['aadhar_num'];
    $sub_array[] = $row['cus_id'];
    $sub_array[] = date('d-m-Y', strtotime($row['created_date']));
    $sub_array[] = date('h:i:s A', strtotime($row['created_date']));
    $sub_array[] = $row['areaname'];
    $sub_array[] = isset($follow_type[$row['follow_type']]) ? $follow_type[$row['follow_type']] : '';
    $sub_array[] = isset($follow_status[$row['follow_status']]) ? $follow_status[$row['follow_status']] : '';
    $sub_array[] = isset($per_type_arr[$row['follow_person_name']]) ? $per_type_arr[$row['follow_person_name']] : '';

    // Fetch person name based on person type
    $name = '';
    $relationship = '';
    if ($row['follow_person_name'] == 1) {
        $name = getCustomer($pdo, $row['cus_id']);
        $relationship = "NIL";
    } elseif ($row['follow_person_name'] == 2) {
        $person_name = getGarentor($pdo, $row['cus_id']);
        $name =  $person_name['name'];
        $relationship = $person_name['relationship'];
    } elseif ($row['follow_person_name'] == 3) {
        $person_name = getFamilyMember($pdo, $row['person_name']);
        $name =  $person_name['name'];
        $relationship = $person_name['relationship'];
    }

    $sub_array[] = $name;
    $sub_array[] = $relationship;
    $sub_array[] = $row['remark'];
    $sub_array[] = (!empty($row['commitment_date']) && $row['commitment_date'] != '0000-00-00') ? date('d-m-Y', strtotime($row['commitment_date'])) : '';
    $sub_array[] = isset($role_arr[$row['role']]) ? $role_arr[$row['role']] : '';
    $sub_array[] = $row['name'];
    $sub_array[] = $row['hint'];
    $sub_array[] = isset($comm_err[$row['comm_err']]) ? $comm_err[$row['comm_err']] : '';
    $data[] = $sub_array;
    $sno++;
}

function getCustomer($pdo, $cus_id)
{
    $result = $pdo->query("SELECT cus_name from customer_profile where cus_id = '$cus_id' ");
    $cus_name = $result->fetch()['cus_name'];
    return $cus_name;
}

function getGarentor($pdo, $cus_id)
{
    $query = "SELECT cp.guarantor_name, fi.fam_name, fi.fam_relationship FROM customer_profile cp JOIN family_info fi ON cp.guarentor_name = fi.id WHERE cp.cus_id = '$cus_id' ORDER BY cp.id DESC LIMIT 1 ";
    $result = $pdo->query($query);
    $row = $result->fetch();
    $response = [
        "name" => $row['fam_name'],
        "fam_relationship" => $row['fam_relationship']
    ];
    return $response;
}

function getFamilyMember($pdo, $fam_id)
{
    $result = $pdo->query("SELECT id,fam_name,fam_relationship FROM `family_info` where id='$fam_id'");
    $row = $result->fetch();
    $fam_name = $row['fam_name'];
    $fam_relationship = $row['fam_relationship'];
    $response = array("name" => $fam_name, "fam_relationship" => $fam_relationship);
    return $response;
}

$output = array(
    'draw' => intval($_POST['draw']),
    'recordsFiltered' => $number_filter_row,
    'data' => $data
);

echo json_encode($output);

// Close the database connection
$pdo = null;
