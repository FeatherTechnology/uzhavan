<?php
include '../../ajaxconfig.php';

@session_start();
$user_id = $_SESSION['user_id'];

$sql = "
SELECT
    lnc.id,
    lnc.linename
FROM line_name_creation lnc
JOIN users u ON FIND_IN_SET(lnc.id, u.line) WHERE u.id = '$user_id'
AND lnc.status = 1
ORDER BY linename ASC
";

$result = $pdo->query($sql);

$data = [];

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
}

echo json_encode($data);