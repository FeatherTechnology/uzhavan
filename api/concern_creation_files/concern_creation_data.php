<?php
require '../../ajaxconfig.php';
$id = $_POST['id'];
$qry = $pdo->query("
    SELECT *
    FROM concern_creation 
    WHERE id = '$id'
");

if ($qry->rowCount() > 0) {
    $result = $qry->fetchAll(PDO::FETCH_ASSOC);

    foreach ($result as &$row) {
        if (!empty($row['concern_date'])) {
            $row['concern_date'] = date('d-m-Y', strtotime($row['concern_date']));
        }
        if (!empty($row['sol_date'])) {
            $row['sol_date'] = date('d-m-Y', strtotime($row['sol_date']));
        }
    }
}
$pdo = null; // Close connection.

echo json_encode($result);
