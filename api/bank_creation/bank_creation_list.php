<?php
require '../../ajaxconfig.php';

$bank_list_arr = array();
$i = 0;

$status_arr = ['Inactive', 'Active'];

$qry = $pdo->prepare("SELECT 
        id,
        bank_name,
        account_number,
        branch_name,
        status
    FROM bank_creation
");

$qry->execute();

while ($row = $qry->fetch(PDO::FETCH_ASSOC)) {

    $bank_list_arr[$i]['id'] = $row['id'];
    $bank_list_arr[$i]['bank_name'] = $row['bank_name'];
    $bank_list_arr[$i]['account_number'] = $row['account_number'];
    $bank_list_arr[$i]['branch_name'] = $row['branch_name'];

    if (isset($status_arr[$row['status']])) {
        $bank_list_arr[$i]['status'] = $status_arr[$row['status']];
    } else {
        $bank_list_arr[$i]['status'] = 'Unknown';
    }

    $action_buttons =
        "<span class='icon-border_color bankActionBtn' data-value='" . $row['id'] . "'></span>";

    $action_buttons .=
        "&nbsp;&nbsp;&nbsp;<span class='icon-delete bankDeleteBtn' data-value='" . $row['id'] . "'></span>";

    $action_buttons .=
        "&nbsp;&nbsp;&nbsp;<span class='icon-check1 bankActiveBtn' data-value='" . $row['id'] . "'></span>";

    $bank_list_arr[$i]['action'] = $action_buttons;

    $i++;
}

echo json_encode($bank_list_arr);

$pdo = null;
