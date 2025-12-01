
<?php
require '../../ajaxconfig.php';
@session_start();
$user_id = $_SESSION['user_id'];
$concern_status = [0 => 'In Progress', 1 => 'Resolved'];
$column = array(
    'cc.id',
    'cc.con_code',
    'cc.concern_date',
    'cs.concern_subject',
    'u.name',
    'cc.con_status',
    'cc.id'
);
$query = "SELECT cc.id, cc.con_code, cc.concern_date,cs.concern_subject,u.name, cc.con_status FROM concern_creation cc LEFT JOIN concern_subject cs ON cc.con_sub = cs.con_sub_id LEFT JOIN users u ON cc.assign_to = u.id  WHERE  cc.insert_login_id = '" . strip_tags($user_id) . "' ";

if (isset($_POST['search'])) {
    if ($_POST['search'] != "") {
        $search = $_POST['search'];
        $query .= " AND  cc.con_code LIKE '" . $search . "%'
                      OR cc.concern_date LIKE '%" . $search . "%'
                      OR cs.concern_subject LIKE '%" . $search . "%'
                      OR u.name LIKE '%" . $search . "%'')";
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
    $sub_array[] = isset($row['concern_date']) && !empty($row['concern_date'])
        ? date('d-m-Y', strtotime($row['concern_date']))
        : '';
    $sub_array[] = isset($row['concern_subject']) ? $row['concern_subject'] : '';
    $sub_array[] = isset($row['name']) ? $row['name'] : '';
    $sub_array[] = isset($concern_status[$row['con_status']]) ? $concern_status[$row['con_status']] : '';
      $action = "<a href='#' class='concern_details' value='" . $row['id'] . "'><button class='btn btn-primary'>View</button></a>";
    $sub_array[] = $action;

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
$pdo = null;
echo json_encode($output);
?>


