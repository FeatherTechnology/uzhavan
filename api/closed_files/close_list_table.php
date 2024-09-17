<?php
require '../../ajaxconfig.php';
@session_start();
$user_id = $_SESSION['user_id'];
// $closed_list_arr = array();
// $qry = $pdo->query("SELECT cp.id, cp.cus_id, cp.cus_name, anc.areaname AS area, lnc.linename, bc.branch_name, cp.mobile1 
// FROM customer_profile cp 
// LEFT JOIN loan_entry_loan_calculation lelc ON cp.id = lelc.cus_profile_id
// LEFT JOIN line_name_creation lnc ON cp.line = lnc.id 
// LEFT JOIN area_name_creation anc ON cp.area = anc.id 
// LEFT JOIN area_creation ac ON cp.line = ac.line_id 
// LEFT JOIN branch_creation bc ON ac.branch_id = bc.id LEFT JOIN customer_status cs ON cp.cus_id = cs.cus_id 
// INNER JOIN (SELECT MAX(id) as max_id FROM customer_profile GROUP BY cus_id) latest ON cp.id = latest.max_id 
// JOIN users u ON FIND_IN_SET(cp.line, u.line)
// JOIN users us ON FIND_IN_SET(lelc.loan_category, us.loan_category)
// WHERE  cs.status IN ('8', '9') AND u.id ='$user_id' AND us.id ='$user_id' GROUP BY cp.cus_id ORDER BY cp.id DESC ");
// if ($qry->rowCount() > 0) {
//     while ($closedInfo = $qry->fetch(PDO::FETCH_ASSOC)) {
//         $closedInfo['action'] = "<div class='dropdown'>
//         <button class='btn btn-outline-secondary'><i class='fa'>&#xf107;</i></button>
//         <div class='dropdown-content'>";

//         $closedInfo['action'] .= "<a href='#' class='closed-details' value='" . $closedInfo['cus_id'] . "' title='Close'>Close</a>";
//         $qry2 = $pdo->prepare("SELECT cus_id  FROM customer_status WHERE cus_id = ? AND status = 9");
//         $qry2->execute([$closedInfo['cus_id']]);

//         if ($qry2->rowCount() > 0) {
//             $statusInfo = $qry2->fetch(PDO::FETCH_ASSOC);
//             $closedInfo['action'] .= "<a href='#' class='closed-move' value='" . $closedInfo['cus_id'] . "'>Move</a>";
//         }
//         $closedInfo['action'] .= "</div></div>";
//         $closed_list_arr[] = $closedInfo; // Append to the array

//     }
// }
// $pdo = null; //Close Connection.
// echo json_encode($closed_list_arr);

$column = array(
    'cp.id',
    'cp.cus_id',
    'cp.cus_name',
    'anc.areaname',
    'lnc.linename',
    'bc.branch_name',
    'cp.mobile1',
    'cp.id'
);
$query = "SELECT cp.id, cp.cus_id, cp.cus_name, anc.areaname, lnc.linename, bc.branch_name, cp.mobile1 
 FROM customer_profile cp 
 LEFT JOIN loan_entry_loan_calculation lelc ON cp.id = lelc.cus_profile_id
 LEFT JOIN line_name_creation lnc ON cp.line = lnc.id 
 LEFT JOIN area_name_creation anc ON cp.area = anc.id 
 LEFT JOIN area_creation ac ON cp.line = ac.line_id 
 LEFT JOIN branch_creation bc ON ac.branch_id = bc.id LEFT JOIN customer_status cs ON cp.cus_id = cs.cus_id 
 INNER JOIN (SELECT MAX(id) as max_id FROM customer_profile GROUP BY cus_id) latest ON cp.id = latest.max_id 
 JOIN users u ON FIND_IN_SET(cp.line, u.line)
 JOIN users us ON FIND_IN_SET(lelc.loan_category, us.loan_category)
 WHERE  cs.status IN ('8', '9') AND u.id ='$user_id' AND us.id ='$user_id'";

if (isset($_POST['search'])) {
    if ($_POST['search'] != "") {
        $search = $_POST['search'];
        $query .= " AND (cp.cus_id LIKE '" . $search . "%'
                      OR cp.cus_name LIKE '%" . $search . "%'
                      OR anc.areaname LIKE '%" . $search . "%'
                      OR lnc.linename LIKE '%" . $search . "%'
                      OR bc.branch_name LIKE '%" . $search . "%'
                      OR cp.mobile1 LIKE '%" . $search . "%')";
    }
}
$query .= " GROUP BY cp.cus_id ";
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
    $sub_array[] = isset($row['cus_id']) ? $row['cus_id'] : '';
    $sub_array[] = isset($row['cus_name']) ? $row['cus_name'] : '';
    $sub_array[] = isset($row['areaname']) ? $row['areaname'] : '';
    $sub_array[] = isset($row['linename']) ? $row['linename'] : '';
    $sub_array[] = isset($row['branch_name']) ? $row['branch_name'] : '';
    $sub_array[] = isset($row['mobile1']) ? $row['mobile1'] : '';
    $action = "<div class='dropdown'>
    <button class='btn btn-outline-secondary'><i class='fa'>&#xf107;</i></button>
   <div class='dropdown-content'>";
    $action .=  "<a href='#' class='closed-details' value='" . $row['cus_id'] . "' title='Close'>Close</a>";
    $qry2 = $pdo->prepare("SELECT cus_id  FROM customer_status WHERE cus_id = ? AND status = 9");
    $qry2->execute([$row['cus_id']]);
    if ($qry2->rowCount() > 0) {
        $statusInfo = $qry2->fetch(PDO::FETCH_ASSOC);
        $action .= "<a href='#' class='closed-move' value='" . $row['cus_id'] . "'>Move</a>";
    }
    $action .= "</div></div>";
    $sub_array[] = $action;
    $data[] = $sub_array;
}
function count_all_data($pdo)
{
    $query = "SELECT COUNT(*) FROM customer_profile";
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
