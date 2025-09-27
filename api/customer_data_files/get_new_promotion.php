<?php
require '../../ajaxconfig.php';

@session_start();
$user_id = $_SESSION['user_id'];
$column = array(
    'cd.id',
    'cd.cus_name',
    'anc.areaname',
    'cd.mobile',
    'cd.loan_cat',
    'cd.loan_amount',
    'cd.id',
    'ncp.id',
    'ncp.follow_date'
);

$query = "SELECT cd.id,cd.cus_name,anc.areaname,cd.mobile,cd.loan_cat,cd.loan_amount,ncp.follow_date FROM customer_data cd
LEFT JOIN area_name_creation anc ON cd.area = anc.id 
LEFT JOIN new_cus_promo ncp ON ncp.promo_id = cd.id WHERE 1 ";

if (isset($_POST['search'])) {
    if ($_POST['search'] != "") {
        $search = $_POST['search'];
        $query .= " AND (cd.cus_name LIKE '%" . $search . "%'
                      OR anc.areaname LIKE '%" . $search . "%'
                      OR cd.mobile LIKE '%" . $search . "%'
                      OR cd.loan_cat LIKE '%" . $search . "%'
                      OR ncp.follow_date LIKE '%" . $search . "%'
                      OR cd.loan_amount LIKE '%" . $search . "%')";
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
    $sub_array[] = isset($row['cus_name']) ? $row['cus_name'] : '';
    $sub_array[] = isset($row['areaname']) ? $row['areaname'] : '';
    $sub_array[] = isset($row['mobile']) ? $row['mobile'] : '';
    $sub_array[] = isset($row['loan_cat']) ? $row['loan_cat'] : '';
    $sub_array[] = isset($row['loan_amount']) ? moneyFormatIndia($row['loan_amount']) : '';
    $action = "<div class='dropdown'>
                <button class='btn btn-outline-secondary'><i class='fa'>&#xf107;</i></button>
               <div class='dropdown-content'> <a  href='#' class='new_intrest' data-toggle='modal' data-target='#addPromotion' data-cpid='" . $row['id'] . "' ><span>Interested</span></a><a  href='#' class='new_not-intrest' data-toggle='modal' data-target='#addPromotion' data-cpid='" . $row['id'] . "'><span>Not Interested</span></a><a  href='#' class='newPromoDeleteBtn'  value='" . $row['id'] . "'><span> Delete</span></a></div></div>";
    $sub_array[] = $action;
    $sub_array[] = "<a href='#' class='new-promo-chart'  data-toggle='modal' data-target='#promoChartModal' value='" . $row['id'] . "' ><button class='btn btn-primary'>View</button></a>";
    $sub_array[] = isset($row['follow_date']) ? date('d-m-Y', strtotime($row['follow_date'])) : '';



    $data[] = $sub_array;
}
function count_all_data($pdo)
{
    $query = "SELECT COUNT(*) FROM customer_data";
    $statement = $pdo->prepare($query);
    $statement->execute();
    return $statement->fetchColumn();
}
function moneyFormatIndia($num1)
{
    if ($num1 < 0) {
        $num = str_replace("-", "", $num1);
    } else {
        $num = $num1;
    }
    $explrestunits = "";
    if (strlen($num) > 3) {
        $lastthree = substr($num, strlen($num) - 3, strlen($num));
        $restunits = substr($num, 0, strlen($num) - 3);
        $restunits = (strlen($restunits) % 2 == 1) ? "0" . $restunits : $restunits;
        $expunit = str_split($restunits, 2);
        for ($i = 0; $i < sizeof($expunit); $i++) {
            if ($i == 0) {
                $explrestunits .= (int)$expunit[$i] . ",";
            } else {
                $explrestunits .= $expunit[$i] . ",";
            }
        }
        $thecash = $explrestunits . $lastthree;
    } else {
        $thecash = $num;
    }

    if ($num1 < 0 && $num1 != '') {
        $thecash = "-" . $thecash;
    }

    return $thecash;
}

$output = array(
    'draw' => isset($_POST['draw']) ? intval($_POST['draw']) : 0,
    'recordsTotal' => count_all_data($pdo),
    'recordsFiltered' => $number_filter_row,
    'data' => $data
);

echo json_encode($output);

$pdo = null; // Close Connection
