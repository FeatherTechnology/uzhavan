<?php
require '../../ajaxconfig.php';
session_start();

$user_id = $_SESSION["user_id"];

// Get user info (line, role, username)
$Qry = $pdo->query("SELECT line, role, user_name FROM users WHERE id= '" . $user_id . "'");
$run = $Qry->fetch();
$response = [];

if ($run) {
    $user_line = explode(',', $run['line']);
    $role_id   = $run['role'];
    $username  = $run['user_name'];

    $user_area = [];

    // Collect area ids + names mapped to user lines
    foreach ($user_line as $line_id) {
        $Qry2 = $pdo->prepare("SELECT anc.id AS area_id, anc.areaname 
                               FROM area_creation ac 
                               LEFT JOIN area_creation_area_name acan ON ac.id = acan.area_creation_id 
                               LEFT JOIN area_name_creation anc ON acan.area_id = anc.id 
                               WHERE ac.status = 1 AND ac.line_id = :line_id");
        $Qry2->execute([':line_id' => $line_id]);

        while ($row = $Qry2->fetch(PDO::FETCH_ASSOC)) {
            $user_area[] = $row;  // store both id + name
        }
    }

    // Get role name
    $qryRole = $pdo->prepare("SELECT role FROM role WHERE id = :role_id");
    $qryRole->execute([':role_id' => $role_id]);
    $roleName = $qryRole->fetchColumn();

    // Build response
    $response[] = [
        'username' => $username,
        'role'     => $roleName,
        'areas'    => $user_area
    ];
}

$pdo = null;

// Output the response as JSON
echo json_encode($response);
