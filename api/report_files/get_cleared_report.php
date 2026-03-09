<?php
include '../../ajaxconfig.php';

$from_date = date('Y-m-d', strtotime($_POST['from_date']));
$to_date = date('Y-m-d', strtotime($_POST['to_date']. ' +1 day'));

$column = array(
    'bs.id',
    'bc.bank_name',
    'bs.trans_date',
    'bs.narration',
    'bs.trans_id',
    'bs.credit',
    'bs.debit',
    'bs.balance',
    'bs.clr_status',
    'a.cleared_date',
    'a.cleared_user',
    'a.cleared_screens'
);

$based_query = "FROM 
    bank_clearance bs
    LEFT JOIN bank_creation bc ON bs.bank_id = bc.id
    LEFT JOIN (
        SELECT 
            cbsh.bank_stmt_id,
            GROUP_CONCAT(cbsh.created_date ORDER BY cbsh.created_date SEPARATOR ', ') AS cleared_date,
            GROUP_CONCAT(u.name ORDER BY cbsh.created_date SEPARATOR ', ') AS cleared_user,
            GROUP_CONCAT(cbsh.screens ORDER BY cbsh.created_date SEPARATOR ', ') AS cleared_screens
        FROM cleared_bank_stmt_history cbsh 
        JOIN users u ON cbsh.insert_login_id = u.id 
        WHERE cbsh.created_date < '$to_date'
        GROUP BY cbsh.bank_stmt_id
    ) a ON bs.id = a.bank_stmt_id
WHERE 
    bs.trans_date >= '$from_date' AND bs.trans_date < '$to_date'
    AND bs.clr_status = '1'";  

if (isset($_POST['search'])) {
    if ($_POST['search'] != "") {
        $based_query .= " AND (bc.bank_name LIKE '%" . $_POST['search'] . "%' OR
            bs.trans_date LIKE '%" . $_POST['search'] . "%' OR
            bs.narration LIKE '%" . $_POST['search'] . "%' OR
            bs.trans_id LIKE '%" . $_POST['search'] . "%' OR
            bs.credit LIKE '%" . $_POST['search'] . "%' OR
            bs.debit LIKE '%" . $_POST['search'] . "%' OR
            bs.clr_status LIKE '%" . $_POST['search'] . "%' OR
            a.cleared_user LIKE '%" . $_POST['search'] . "%' OR
            a.cleared_screens LIKE '%" . $_POST['search'] . "%' ) ";
    }
}

$orderby_query = "";
if (isset($_POST['order'])) {
    $orderby_query .= " ORDER BY " . $column[$_POST['order']['0']['column']] . ' ' . $_POST['order']['0']['dir'];
}

$limit_query = "";
if ($_POST['length'] != -1) {
    $limit_query = " LIMIT " . $_POST['start'] . ", " . $_POST['length'];
}

$totalStmt = $pdo->query("SELECT COUNT(*) FROM bank_clearance");
$totalStmt->execute();
$recordsTotal = (int) $totalStmt->fetchColumn();

$countStmt = $pdo->prepare("SELECT COUNT(*) $based_query");
$countStmt->execute();
$recordsFiltered = (int) $countStmt->fetchColumn();

$data_query = "SELECT 
    bc.bank_name,
    bs.trans_date,
    bs.narration,
    bs.trans_id,
    bs.credit,
    bs.debit,
    bs.balance,
    bs.clr_status, 
    a.cleared_date, 
    a.cleared_user, 
    a.cleared_screens
    $based_query
    $orderby_query
    $limit_query";
$statement = $pdo->prepare($data_query);
$statement->execute();
$result = $statement->fetchAll();

$data = array();
$sno = 1;
foreach ($result as $row) {
    $clearedDate = '';

    if (!empty($row['cleared_date'])) {
        $dates = explode(',', $row['cleared_date']);
        
        $formattedDates = array_map(function($date) {
            return date('d-m-Y', strtotime($date));
        }, $dates);

        $clearedDate = implode(', ', $formattedDates);
    }

    $sub_array   = array();
    $sub_array[] = $sno++;
    $sub_array[] = $row['bank_name'];
    $sub_array[] = date('d-m-Y H:i', strtotime($row['trans_date']));
    $sub_array[] = $row['narration'] ?? '';
    $sub_array[] = $row['trans_id'];
    $sub_array[] = moneyFormatIndia($row['credit'] ?? '');
    $sub_array[] = moneyFormatIndia($row['debit'] ?? '');
    $sub_array[] = moneyFormatIndia($row['balance'] ?? '');
    $sub_array[] = 'Cleared';
    $sub_array[] = $clearedDate;
    $sub_array[] = $row['cleared_user'] ?? '';
    $sub_array[] = $row['cleared_screens'] ?? '';

    $data[]      = $sub_array;
}

$output = array(
    'draw' => intval($_POST['draw']),
    'recordsTotal' => $recordsTotal,
    'recordsFiltered' => $recordsFiltered,
    'data' => $data
);

echo json_encode($output);

// Close the database 
$pdo = null;


function moneyFormatIndia($num)
{
    // 🔹 FIX: handle -0 / 0 / 0.00
    if ((float)$num == 0) {
        return '0';
    }

    $isNegative = false;
    if ($num < 0) {
        $isNegative = true;
        $num = abs($num);
    }

    $numStr = (string)$num;
    $parts = explode('.', $numStr);
    $intPart = $parts[0];
    $decPart = isset($parts[1]) ? '.' . $parts[1] : '';

    $len = strlen($intPart);
    if ($len <= 3) {
        $formatted = $intPart;
    } else {
        $lastThree = substr($intPart, -3);
        $rest = substr($intPart, 0, -3);
        $rest = preg_replace("/\B(?=(\d{2})+(?!\d))/", ",", $rest);
        $formatted = $rest . "," . $lastThree;
    }

    return ($isNegative ? '-' : '') . $formatted . $decPart;
}