
<?php
require "../../ajaxconfig.php";

$templates = [];

$result = $pdo->query("SELECT adhar_num, ansi_template FROM fingerprints");

if ($result->rowCount() > 0) {
    while ($row = $result->fetch()) {
        $templates[] = $row;
    }
}

echo json_encode($templates);

