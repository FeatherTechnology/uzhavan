<?php
require '../../ajaxconfig.php';

$famList_arr = array();

$adhaar_cus = $_POST['adhaar_cus'] ?? '';

try {
    $stmt = $pdo->prepare("SELECT hand, ansi_template FROM fingerprints WHERE adhar_num = ?");
    $stmt->execute([$adhaar_cus]);

    if ($row = $stmt->fetch()) {
        $famList_arr['fpTemplate'] = $row['ansi_template'];
        $famList_arr['hand'] = $row['hand'];
    } else {
        $famList_arr['fpTemplate'] = null;
        $famList_arr['hand'] = null;
    }

    echo json_encode($famList_arr);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

$pdo = null;
