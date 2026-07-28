<?php
require "../../ajaxconfig.php";
@session_start();
$user_id = $_SESSION['user_id'];
$current_date = date('Y-m-d');

$sub_status_mapping = '';
if (isset($_POST['params']['cusSts'])) {
    $sub_status_mapping = implode(',', $_POST['params']['cusSts']);
}
$branchCondition = '';
$lineCondition = '';
$loanCatCondition = '';

// Branch Filter
if (!empty($_POST['params']['branch'])) {
    $branch = array_map('intval', $_POST['params']['branch']);
    $branchCondition = " AND ac.branch_id IN (" . implode(',', $branch) . ")";
}

// Line Filter
if (!empty($_POST['params']['line'])) {
    $line = array_map('intval', $_POST['params']['line']);
    $lineCondition = " AND ac.line_id IN (" . implode(',', $line) . ")";
}

// Loan Category Filter
if (!empty($_POST['params']['loan_cat'])) {
    $loanCat = array_map('intval', $_POST['params']['loan_cat']);
    $loanCatCondition = " AND lelc.loan_category IN (" . implode(',', $loanCat) . ")";
}
$qry_cndtn = "";
// $comm_date_condition = '';
if (isset($_POST['params']['comm_date'])) {
    $comm_date = $_POST['params']['comm_date']; // Get the comm_date from the form

    $commitmentCondition = "";
    if (!empty($comm_date) && $comm_date != 1) {
        $commitmentCondition = " AND (commitment_date IS NOT NULL AND commitment_date != '0000-00-00')";
    }


    if ($comm_date == '2') { //Before Date
        $qry_cndtn = "AND cm.commitment_date < '$current_date' AND (cm.commitment_date IS NOT NULL AND  cm.commitment_date != '0000-00-00') ";
    } elseif ($comm_date == '3') { //Today
        $qry_cndtn = "AND cm.commitment_date = '$current_date' ";
    } elseif ($comm_date == '4') { //After Date
        $qry_cndtn = "AND cm.commitment_date > '$current_date' AND (cm.commitment_date IS NOT NULL AND  cm.commitment_date != '0000-00-00') ";
    } elseif ($comm_date == '5') { //To Follow Date
        $qry_cndtn = "AND (cm.commitment_date IS NULL OR cm.commitment_date = '0000-00-00') ";
    } else {
        $qry_cndtn = "";
    }
}

$column = array(
    'cp.id',
    'cp.cus_id',
    'cp.aadhar_num',
    'cp.cus_name',
    'lnc.linename',
    'anc.areaname',
    'bc.branch_name',
    'cp.mobile1',
    'cs.sub_status',
    'cp.id',
    'cs.last_paid_date',
    'cs.current_month_paid',
    'cm.comm_err',
    'cm.hint',
    'cm.commitment_date'
);

$query = "SELECT cp.cus_id, cp.aadhar_num , cp.cus_name, anc.areaname, lnc.linename, bc.branch_name, cp.mobile1,cs.last_paid_date,cs.coll_status,cs.current_month_paid, cm.comm_err,cm.hint,cm.commitment_date
     FROM customer_profile cp 
     LEFT JOIN loan_entry_loan_calculation lelc ON cp.id = lelc.cus_profile_id
     LEFT JOIN area_name_creation anc ON cp.area = anc.id
      LEFT JOIN area_creation_area_name acan ON cp.area = acan.area_id
LEFT JOIN area_creation ac ON acan.area_creation_id = ac.id
LEFT JOIN line_name_creation lnc ON ac.line_id = lnc.id
     LEFT JOIN branch_creation bc ON ac.branch_id = bc.id
    LEFT JOIN customer_status cs ON cp.id = cs.cus_profile_id
    JOIN users u ON FIND_IN_SET(cp.line, u.line) 
LEFT JOIN (
    SELECT c1.*
    FROM commitment c1
    INNER JOIN (
        SELECT cus_id, MAX(created_date) AS max_date
        FROM commitment
        WHERE 1=1 $commitmentCondition
        GROUP BY cus_id
    ) c2 
    ON c1.cus_id = c2.cus_id AND c1.created_date = c2.max_date
) cm 
ON cp.cus_id = cm.cus_id

WHERE
    cs.payable_amnt > 0 AND cs.status IN (7,15,16) AND u.id ='$user_id' AND FIND_IN_SET(cs.coll_status,'$sub_status_mapping') $qry_cndtn  $branchCondition
            $lineCondition
            $loanCatCondition ";

if (isset($_POST['search'])) {
    if ($_POST['search'] != "") {
        $search = $_POST['search'];
        $query .= " AND (cp.cus_id LIKE '" . $search . "%'
                          OR cp.aadhar_num LIKE '%" . $search . "%'
                          OR cp.cus_name LIKE '%" . $search . "%'
                          OR anc.areaname LIKE '%" . $search . "%'
                          OR lnc.linename LIKE '%" . $search . "%'
                          OR bc.branch_name LIKE '%" . $search . "%'
                          OR cp.mobile1 LIKE '%" . $search . "%')";
    }
}

$query .= "GROUP BY cp.cus_id";

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
    $cus_id = $row['cus_id'] ?? '';
    $cus_name = $row['cus_name'] ?? '';

    $sub_status_mapping = $row['coll_status'] ?? ''; // assuming it's in the row

    // Last paid date mapping
    switch ($row['last_paid_date']) {
        case 1:
            $last_paid_date = '1-10';
            break;
        case 2:
            $last_paid_date = '11-15';
            break;
        case 3:
            $last_paid_date = '16-20';
            break;
        case 4:
            $last_paid_date = '21-25';
            break;
        case 5:
            $last_paid_date = '26-30';
            break;
        default:
            $last_paid_date = '';
            break;
    }

    // Get status priority
    $cus_status = '';
    $qry1 = $pdo->query("SELECT 
        cus_id, 
        MIN(CASE 
           WHEN coll_status = 'Legal' THEN 1
            WHEN coll_status = 'Error' THEN 2
            WHEN coll_status = 'OD' THEN 3
            WHEN coll_status = 'Pending' THEN 4
            WHEN coll_status = 'Current' THEN 5
            ELSE 6 
        END) AS status_priority
        FROM customer_status
        WHERE payable_amnt > 0 AND cus_id = '$cus_id'
        GROUP BY cus_id
    ");

    if ($qry1 && $qry1->rowCount() > 0) {
        $row11 = $qry1->fetch();
        switch ($row11['status_priority']) {
            case 1:
                $cus_status = 'Legal';
                break;
            case 2:
                $cus_status = 'Error';
                break;
            case 3:
                $cus_status = 'OD';
                break;
            case 4:
                $cus_status = 'Pending';
                break;
            case 5:
                $cus_status = 'Current';
                break;
            default:
                $cus_status = '';
                break;
        }
        $qry1->closeCursor();
    }

    $paid_status = ($row['current_month_paid'] == 1) ? 'Yes' : '';
    $comm_err = ($row['comm_err'] == '1') ? 'Error' : (($row['comm_err'] == '2') ? 'Clear' : '');
    $commitment_date = (!empty($row['commitment_date']) && $row['commitment_date'] != '0000-00-00')
        ? date('d-m-Y', strtotime($row['commitment_date']))
        : '';

    $data[] = [
        $sno++,
        $cus_id,
        $row['aadhar_num'] ?? '',
        $cus_name,
        $area_name = $row['areaname'] ?? '',
        $branch_name = $row['branch_name'] ?? '',
        $line_name = $row['linename'] ?? '',
        $mobile1 = $row['mobile1'] ?? '',
        $cus_status,
        "<a href='#' class='loan_list' value='" . $row['cus_id'] . "' ><button class='btn btn-primary'>View Loan</button></a>",
        $last_paid_date,
        $paid_status,
        $hint = $row['hint'] ?? '',
        $comm_err,
        $commitment_date
    ];
}

// Helper to count all data
function count_all_data($pdo)
{
    $query = "SELECT COUNT(*) FROM customer_status where status = 7";
    $statement = $pdo->prepare($query);
    $statement->execute();
    return $statement->fetchColumn();
}

// Output
$output = [
    'draw' => isset($_POST['draw']) ? intval($_POST['draw']) : 0,
    'recordsTotal' => count_all_data($pdo),
    'recordsFiltered' => $number_filter_row, // make sure $number_filter_row is defined above
    'data' => $data
];

echo json_encode($output);
