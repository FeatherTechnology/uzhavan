<?php
require "../../ajaxconfig.php";
@session_start();
$user_id = $_SESSION['user_id'];

$from_date = $_POST['params']['from_date'];
$to_date = $_POST['params']['to_date'];
$raising_arr = [1 => 'Customer', 2 => 'Myself'];
$concern_status = [0 => 'In Progress', 1 => 'Resolved',2=>'Removed'];
$loc_arr = [1 => 'Office', 2=> 'On Spot',3=>'Customer Spot'];
$comm_arr = [1=> 'Phone', 2 => 'Direct'];
$column = array(
    'cc.id',
    'cc.con_code',
    'cc.concern_date',
    'cc.raising_for',
    'cc.cus_name',
    'cs.concern_subject',
    'cc.con_remark',
    'u.name',
    'cc.sol_date',
    'cc.communication',
    'cc.concern_upload',
    'cc.location',
    'cc.participants',
    'cc.sol_remark',
    'cc.con_status'
);
$query = "SELECT cc.id, cc.con_code,cc.concern_date,cc.raising_for,cc.user_name,cc.cus_name,cs.concern_subject,cc.con_remark,u.name, cc.con_status,cc.sol_date,cc.communication,cc.location, cc.participants,cc.sol_remark,cc.concern_upload FROM concern_creation cc LEFT JOIN concern_subject cs ON cc.con_sub = cs.con_sub_id LEFT JOIN users u ON cc.assign_to = u.id 
WHERE cc.concern_date BETWEEN '$from_date' AND '$to_date'";
if (isset($_POST['search'])) {
    if ($_POST['search'] != "") {
        $search = $_POST['search'];
        $query .=     " AND (cc.con_code LIKE '%" . $search . "%'
        OR cc.concern_date LIKE '%" . $search . "%'
        OR cc.cus_name LIKE '%" . $search . "%'
        OR cc.user_name LIKE '%" . $search . "%'
        OR cs.concern_subject LIKE '%" . $search . "%'
        OR cc.sol_date LIKE '%" . $search . "%' )";
    }
}
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
    $sub_array[] = isset($row['con_code']) ? $row['con_code'] : '';
    $sub_array[] = isset($row['concern_date']) ? date('d-m-Y', strtotime($row['concern_date'])) : '';
    $sub_array[] = isset($raising_arr[$row['raising_for']]) ? $raising_arr[$row['raising_for']] : ''; 
    if($row['raising_for'] == 1){
    $sub_array[] = isset($row['cus_name']) ? $row['cus_name'] : '';
    }else{
    $sub_array[] = isset($row['user_name']) ? $row['user_name'] : '';
    }
    $sub_array[] = isset($row['concern_subject']) ? $row['concern_subject'] : '';
    $sub_array[] = isset($row['con_remark']) ? $row['con_remark'] : '';
    $sub_array[] = isset($row['name']) ? $row['name'] : '';
    $sub_array[] = isset($row['sol_date']) ? date('d-m-Y', strtotime($row['sol_date'])) : '';
    $sub_array[] = isset($comm_arr[$row['con_status']]) ? $comm_arr[$row['con_status']] : ''; 
    if (!empty($row['concern_upload'])) {
        $filePath = 'uploads/concern_solution/' . $row['concern_upload'];
        $sub_array[] = '<a href="' . $filePath . '" target="_blank">' . $row['concern_upload'] . '</a>';
    } else {
        $sub_array[] = '';
    }
    $sub_array[] = isset($loc_arr[$row['location']]) ? $loc_arr[$row['location']] : '';
    $sub_array[] = isset($row['participants']) ? $row['participants'] : '';
    $sub_array[] = isset($row['sol_remark']) ? $row['sol_remark'] : '';
    $sub_array[] = isset($concern_status[$row['con_status']]) ? $concern_status[$row['con_status']] : '';    

    $data[] = $sub_array;
}
function count_all_data($pdo)
{
    $query = "SELECT COUNT(*) FROM concern_creation";
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

function moneyFormatIndia($num)
{
    $isNegative = false;
    if ($num < 0) {
        $isNegative = true;
        $num = abs($num);
    }

    $explrestunits = "";
    if (strlen((string)$num) > 3) {
        $lastthree = substr((string)$num, -3);
        $restunits = substr((string)$num, 0, -3);
        $restunits = (strlen($restunits) % 2 == 1) ? "0" . $restunits : $restunits;
        $expunit = str_split($restunits, 2);
        foreach ($expunit as $index => $value) {
            if ($index == 0) {
                $explrestunits .= (int)$value . ",";
            } else {
                $explrestunits .= $value . ",";
            }
        }
        $thecash = $explrestunits . $lastthree;
    } else {
        $thecash = $num;
    }

    $thecash = $isNegative ? "-" . $thecash : $thecash;
    $thecash = $thecash == 0 ? "" : $thecash;
    return $thecash;
}
