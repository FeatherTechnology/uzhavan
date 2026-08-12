
<?php
require "../../ajaxconfig.php";
// Fetch only the fingerprint templates
$runSql = $pdo->query("SELECT adhar_num, name, ansi_template FROM fingerprints");
$data = $runSql->fetchAll(PDO::FETCH_ASSOC);
    
echo json_encode($data);

// Close the database connection
$pdo = null;
?>

