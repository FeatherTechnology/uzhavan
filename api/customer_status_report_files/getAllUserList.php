
<?php
require '../../ajaxconfig.php';

$screen_name = $_POST['screen_name'] ?? '';

$sql = "SELECT id, name FROM users";

if ($screen_name === 'Due Followup Activity') {
    $sql .= " WHERE FIND_IN_SET('13', TRIM(BOTH '()' FROM screens))
              OR FIND_IN_SET('23', TRIM(BOTH '()' FROM screens))";
}

$sql .= " ORDER BY name ASC";

$stmt = $pdo->prepare($sql);
$stmt->execute();

header('Content-Type: application/json');
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
