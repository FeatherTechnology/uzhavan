<?php
include '../../ajaxconfig.php';

@session_start();
$user_id = $_SESSION['user_id'];

// Accept branch as an array (multi-select) or single value, from POST
$branch = isset($_POST['branch']) ? $_POST['branch'] : [];
if (!is_array($branch)) {
    $branch = [$branch];
}
// Keep only numeric ids, drop blanks
$branch = array_filter($branch, function ($b) {
    return $b !== '' && $b !== null && is_numeric($b);
});

$branchCondition = '';
$params = [':user_id' => $user_id];

if (!empty($branch)) {
    // Build named placeholders for the IN clause
    $placeholders = [];
    foreach (array_values($branch) as $i => $b) {
        $key = ':branch' . $i;
        $placeholders[] = $key;
        $params[$key] = $b;
    }
    $branchCondition = ' AND lnc.branch_id IN (' . implode(',', $placeholders) . ') ';
}

$sql = "
SELECT
    lnc.id,
    lnc.linename
FROM line_name_creation lnc
JOIN users u ON FIND_IN_SET(lnc.id, u.line)
WHERE u.id = :user_id
AND lnc.status = 1
$branchCondition
ORDER BY linename ASC
";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

$data = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
}

echo json_encode($data);