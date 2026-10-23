<?php
require "../../ajaxconfig.php";
require_once '../../include/views/money_format_india.php';

@session_start();
$user_id = $_SESSION['user_id'];

$from_date = $_POST['params']['from_date'];
$to_date = $_POST['params']['to_date'];

$screen = $_POST['params']['screen'];
$type = $_POST['params']['type'];

if ($screen == 1 && $type == 1) {
    $screenQuery = " AND cs.status = 5";
} else if ($screen == 1 && $type == 2) {
    $screenQuery = " AND cs.status = 6";
} else if ($screen == 2 && $type == 1) {
    $screenQuery = " AND cs.status = 13";
} else if ($screen == 2 && $type == 2) {
    $screenQuery = " AND cs.status = 14";
}

$statusLabels = [
    '5' => 'Cancel - Approval',
    '6' => 'Revoke - Approval',
    '13' => 'Cancel - Loan Issue',
    '14' => 'Revoke - Loan Issue'
];

$column = array(
    'lelc.id',
    'lelc.created_on',
    'lelc.loan_id',
    'cp.cus_id',
    'cp.aadhar_num',
    'cp.cus_name',
    'gaurantor',
    'anc.areaname',
    'lnc.linename',
    'bc.branch_name',
    'cp.mobile1',
    'lc.loan_category',
    'lelc.loan_amnt',
    'agc.agent_name',
    'cp.cus_data',
    'cp.cus_status',
    'creator.user_name',
    'r.role',
    'cs.status',
    'cp.remark'
);

$query = "SELECT lelc.created_on, lelc.loan_id, cp.cus_id, cp.aadhar_num, cp.cus_name, fi.fam_name as gaurantor, anc.areaname, lnc.linename, bc.branch_name , cp.mobile1, lc.loan_category, lelc.loan_amnt, agc.agent_name, cp.cus_data , cp.cus_status, creator.user_name AS created_by, r.role AS created_role, cs.status, cp.remark
FROM loan_entry_loan_calculation lelc 
JOIN customer_profile cp ON lelc.cus_profile_id = cp.id
LEFT JOIN family_info fi ON cp.guarantor_name = fi.id
JOIN line_name_creation lnc ON cp.line = lnc.id
JOIN area_name_creation anc ON cp.area = anc.id
JOIN area_creation ac ON cp.line = ac.line_id
JOIN branch_creation bc ON ac.branch_id = bc.id
JOIN loan_category_creation lcc ON lelc.loan_category = lcc.id
JOIN loan_category lc ON lcc.loan_category = lc.id
LEFT JOIN agent_creation agc ON lelc.agent_id = agc.id
LEFT JOIN customer_status cs ON lelc.cus_profile_id = cs.cus_profile_id
JOIN users u ON FIND_IN_SET(cp.line, u.line)
JOIN users us ON FIND_IN_SET(lelc.loan_category, us.loan_category)
LEFT JOIN users creator ON lelc.insert_login_id = creator.id
LEFT JOIN role r ON creator.role = r.id
WHERE u.id ='$user_id' AND us.id ='$user_id' AND lelc.created_on BETWEEN '$from_date' AND '$to_date' $screenQuery";

if (isset($_POST['search'])) {
    if ($_POST['search'] != "") {
        $search = $_POST['search'];
        $query .=     " AND (lelc.loan_id LIKE '%" . $search . "%'
        OR cp.cus_id LIKE '%" . $search . "%'
        OR cp.aadhar_num LIKE '%" . $search . "%'
        OR cp.cus_name LIKE '%" . $search . "%'
        OR fi.fam_name LIKE '%" . $search . "%'
        OR anc.areaname LIKE '%" . $search . "%'
        OR lnc.linename LIKE '%" . $search . "%'
        OR bc.branch_name LIKE '%" . $search . "%'
        OR cp.mobile1 LIKE '%" . $search . "%' 
        OR lc.loan_category LIKE '%" . $search . "%' 
        OR agc.agent_name LIKE '%" . $search . "%' 
        OR lelc.loan_amnt LIKE '%" . $search . "%' )";
    }
}

$query .= " GROUP BY lelc.cus_profile_id ";
if (isset($_POST['order'])) {
    $query .= " ORDER BY " . $column[$_POST['order']['0']['column']] . ' ' . $_POST['order']['0']['dir'];
} else {
    $query .= ' ';
}

$query1 = '';
if (isset($_POST['length']) && $_POST['length'] != -1) {
    $query1 = ' LIMIT ' . intval($_POST['start']) . ', ' . intval($_POST['length']);
}

$statement = $pdo->prepare($query);

$statement->execute();

$number_filter_row = $statement->rowCount();

$statement = $pdo->prepare($query . $query1);

$statement->execute();

$result = $statement->fetchAll();

$sno = isset($_POST['start']) ? $_POST['start'] + 1 : 1;
$data = [];

foreach ($result as $row) {
    $sub_array = array();

    $sub_array[] = $sno++;
    $sub_array[] = isset($row['created_on']) ? date('d-m-Y', strtotime($row['created_on'])) : '';
    $sub_array[] = isset($row['loan_id']) ? $row['loan_id'] : '';
    $sub_array[] = isset($row['cus_id']) ? $row['cus_id'] : '';
    $sub_array[] = isset($row['aadhar_num']) ? $row['aadhar_num'] : '';
    $sub_array[] = isset($row['cus_name']) ? $row['cus_name'] : '';
    $sub_array[] = isset($row['gaurantor']) ? $row['gaurantor'] : '';
    $sub_array[] = isset($row['areaname']) ? $row['areaname'] : '';
    $sub_array[] = isset($row['linename']) ? $row['linename'] : '';
    $sub_array[] = isset($row['branch_name']) ? $row['branch_name'] : '';
    $sub_array[] = isset($row['mobile1']) ? $row['mobile1'] : '';
    $sub_array[] = isset($row['loan_category']) ? $row['loan_category'] : '';
    $sub_array[] = isset($row['loan_amnt']) ? moneyFormatIndia($row['loan_amnt']) : '';
    $sub_array[] = isset($row['agent_name']) ? $row['agent_name'] : '';
    $sub_array[] = isset($row['cus_data']) ? $row['cus_data'] : '';
    $sub_array[] = isset($row['cus_status']) ? $row['cus_status'] : '';
    $sub_array[] = isset($row['created_by']) ? $row['created_by'] : '';
    $sub_array[] = isset($row['created_role']) ? $row['created_role'] : '';
    $sub_array[] = $statusLabels[$row['status']];
    $sub_array[] = isset($row['remark']) ? $row['remark'] : '';

    $data[] = $sub_array;
}

function count_all_data($pdo)
{
    $query = "SELECT COUNT(*) FROM loan_entry_loan_calculation";
    $statement = $pdo->prepare($query);
    $statement->execute();
    return $statement->fetchColumn();
}

$output = array(
    'draw' => isset($_POST['draw']) ? intval($_POST['draw']) : 0,
    'recordsTotal' => count_all_data($pdo),
    'recordsFiltered' => $number_filter_row,
    'data' => $data
);

echo json_encode($output);
