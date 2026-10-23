
<?php
require '../../ajaxconfig.php';

$sql = "SELECT id, loan_category
        FROM loan_category
        ORDER BY loan_category ASC";

$stmt = $pdo->prepare($sql);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($result);
?>
