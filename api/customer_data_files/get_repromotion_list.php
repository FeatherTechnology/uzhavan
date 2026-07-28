<?php
require '../../ajaxconfig.php';
@session_start();
$user_id = $_SESSION['user_id'];
$status = [
    5 => 'Approval',
    6 => 'Approval',
    13 => 'Loan Issue',
    14 => 'Loan Issue',
];
$sub_status = [
    5 => 'Cancel',
    6 => 'Revoke',
    13 => 'Cancel',
    14 => 'Revoke'
];
$follow_up_sts = '';
$follow_up_date = '';
$sno = 1;
$re_promotion_arr = array();
// Step 1: Get user's allowed lines
$Qry = $pdo->query("SELECT line FROM users WHERE id = '" . $user_id . "'");
$run = $Qry->fetch();
$user_line = explode(',', $run['line']); // Example: [1,2,6]

// Step 2: Get areas linked to these lines
$line_ids = implode(',', array_map('intval', $user_line));  // sanitize
$Qry = $pdo->query("
    SELECT DISTINCT acan.area_id 
    FROM area_creation_area_name acan
    INNER JOIN area_creation ac ON ac.id = acan.area_creation_id
    WHERE ac.status = 1 AND ac.line_id IN ($line_ids)
");

$user_area = [];
while ($row = $Qry->fetch()) {
    $user_area[] = $row['area_id'];
}

$whereCondition = "";
if (!empty($user_area)) {
    $area_ids = implode(',', array_map('intval', $user_area));
    $whereCondition .= " AND cp.area IN ($area_ids)";
}
$column = array(
    'cp.id',
    'cp.cus_id',
    'cp.aadhar_num',
    'cp.cus_name',
    'cp.mobile1',
    'anc.areaname',
    'lnc.linename',
    'bc.branch_name',
    'cs.status',
    'cs.status',
    'cp.cus_data',
    'cs.closed_date',
    'cp.id',
    'cp.id',
    'pc.status',
    'pc.follow_date'
);
$search = '';
if (isset($_POST['search']) && $_POST['search'] != "") {
    $search = " and (cp.cus_id LIKE '%" . $_POST['search'] . "%' or cp.cus_name LIKE '%" . $_POST['search'] . "%' or anc.areaname LIKE '%" . $_POST['search'] . "%'or lnc.linename LIKE '%" . $_POST['search'] . "%' or bc.branch_name LIKE '%" . $_POST['search'] . "%'or cp.mobile1 LIKE '%" . $_POST['search'] . "%'  or pc.status LIKE '%" . $_POST['search'] . "%' ) ";
}

$order = '';
if (isset($_POST['order'])) {
    $order = ' ORDER BY ' . $column[$_POST['order']['0']['column']] . ' ' . $_POST['order']['0']['dir'] . ' ';
}
$branchCondition = '';
$lineCondition = '';

// Branch Filter
if (!empty($_POST['branch'])) {
    $branch = $_POST['branch'];
    if (!is_array($branch)) {
        $branch = explode(',', $branch);
    }
    $branch = array_map('intval', $branch);
    if (!empty($branch)) {
        $branchCondition = " AND ac.branch_id IN (" . implode(',', $branch) . ")";
    }
}

// Line Filter
if (!empty($_POST['line'])) {
    $line = $_POST['line'];
    if (!is_array($line)) {
        $line = explode(',', $line);
    }
    $line = array_map('intval', $line);
    if (!empty($line)) {
        $lineCondition = " AND ac.line_id IN (" . implode(',', $line) . ")";
    }
}
$qry = "SELECT 
                cp.id, cp.cus_id, cp.aadhar_num, cp.cus_data,cp.cus_name, anc.areaname, lnc.linename, 
                bc.branch_name, cp.mobile1, cs.status as c_sts, cs.sub_status as c_substs, pc.status as followup_sts ,pc.created_on as created,cp.created_on as cus_created,pc.follow_date,cs.updated_on
                FROM customer_profile cp 
                LEFT JOIN area_name_creation anc ON cp.area = anc.id 
                LEFT JOIN area_creation_area_name acan ON cp.area = acan.area_id
                LEFT JOIN area_creation ac ON acan.area_creation_id = ac.id
                LEFT JOIN line_name_creation lnc ON ac.line_id = lnc.id
                LEFT JOIN branch_creation bc ON ac.branch_id = bc.id 
                LEFT JOIN customer_status cs ON cp.id = cs.cus_profile_id  
                INNER JOIN (SELECT MAX(id) as max_id FROM customer_profile GROUP BY cus_id) latest ON cp.id = latest.max_id
                LEFT JOIN promotion_customer pc ON cp.cus_id = pc.cus_id  AND pc.created_on = (SELECT MAX(pc1.created_on) FROM promotion_customer pc1 WHERE pc1.cus_id = cp.cus_id)
                WHERE cs.status IN (5, 6, 13, 14) $whereCondition  $branchCondition $lineCondition";


if ($_POST['followUpSts']) {
    $follow_up_sts = $_POST['followUpSts'];
    $qry_sts = ($follow_up_sts == 'tofollow') ? "AND pc.status IS NULL " : "AND TRIM(REPLACE(pc.status,' ','')) = '$follow_up_sts' ";

    $qry .= $qry_sts;
}

if ($_POST['dateType']) {
    $date_type = $_POST['dateType']; //1=Closed date, 2=Followup date.
    $qry_date = ($date_type == '1') ? "AND DATE(cs.updated_on) BETWEEN '" . $_POST['followUpFromDate'] . "' AND '" . $_POST['followUpToDate'] . "' " : "AND DATE(pc.follow_date) BETWEEN '" . $_POST['followUpFromDate'] . "' AND '" . $_POST['followUpToDate'] . "' ";

    $qry .= $qry_date;
}

$qry .= "$search GROUP BY cp.cus_id $order ";
// Count query for filtered rows
$num_qry = $pdo->query($qry);
$number_filter_row = $num_qry->rowCount();


$limit = '';
if ($_POST['length'] != -1) {
    $limit = ' LIMIT ' . $_POST['start'] . ', ' . $_POST['length'];
}

// Main query to fetch customers with specific status and filter those without recent loan requests
$sql = $pdo->query($qry . $limit);

$data = array();
while ($row = $sql->fetch()) {
    $sub_array = array();
    $sub_array[] = $sno;
    $sub_array[] = $row['cus_id'];
    $sub_array[] = $row['aadhar_num'];
    $sub_array[] = $row['cus_name'];
    $sub_array[] = $row['mobile1'];
    $sub_array[] = $row['areaname'];
    $sub_array[] = $row['linename'];
    $sub_array[] = $row['branch_name'];
    $sub_array[] = $status[$row['c_sts']];
    $sub_array[] = $sub_status[$row['c_sts']];
    $sub_array[] = $row['cus_data'];
    //take last closed date of this customer to show when this customer added to promotion list
    $sub_array[] = date('d-m-Y', strtotime($row['updated_on']));

    $sub_array[] = "<div class='dropdown'><button class='btn btn-outline-secondary'><i class='fa'>&#xf107;</i></button><div class='dropdown-content'> <a href='#' class='promo-chart' data-id='" . $row['cus_id'] . "' data-toggle='modal' data-target='#promoChartModal'>Promotion Chart</a><a href='#'class='personal-info' data-toggle='modal' data-target='#personalInfoModal' data-cusid='" . $row['cus_id'] . "'>Personal Info</a></div></div>";

    $sub_array[] = "<div class='dropdown'><button class='btn btn-outline-secondary'><i class='fa'>&#xf107;</i></button><div class='dropdown-content'> <a  href='#' class='intrest' data-toggle='modal' data-target='#addPromotion' data-cpid='" . $row['id'] . "' data-id='" . $row['cus_id'] . "'><span>Interested</span></a><a  href='#' class='not-intrest' data-toggle='modal' data-target='#addPromotion' data-cpid='" . $row['id'] . "' data-id='" . $row['cus_id'] . "'><span>Not Interested</span></a></div></div>";

    $sub_array[] = $row['followup_sts'];
    $sub_array[] = (isset($row['follow_date'])) ? date('d-m-Y', strtotime($row['follow_date'])) : '';

    $data[] = $sub_array;
    $sno++;
}

function count_all_data($pdo)
{
    $query = "SELECT cs.cus_id FROM customer_status cs WHERE cs.status IN (5,6.13,14)";
    $statement = $pdo->prepare($query);
    $statement->execute();
    return $statement->rowCount();
}

$output = array(
    'draw' => intval($_POST['draw']),
    'recordsTotal' => count_all_data($pdo),
    'recordsFiltered' => $number_filter_row,
    'data' => $data
);

echo json_encode($output);

// Close the database connection
$pdo = null;
