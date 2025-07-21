<?php
require "../../ajaxconfig.php";

$commitment_chart_arr = [];
$follow_type_arr = [1 => 'Direct', 2 => 'Mobile'];
$follow_person_name_arr = [1 => 'Customer', 2 => 'Guarantor', 3 => 'Family Member'];

if (isset($_POST['cp_id'])) {
    $cus_profile_id = $_POST['cp_id'];

    $stmt = $pdo->prepare(" SELECT c.*, fi.fam_name FROM commitment c LEFT JOIN family_info fi ON c.person_name = fi.id 
    WHERE c.cus_profile_id = ?");

    $stmt->execute([$cus_profile_id]);

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $sno = 1;
    foreach ($results as $row) {

        // Apply different follow_status_arr based on follow_type
        if ($row['follow_type'] == '1') {
            $follow_status_arr = [1 => 'Commitment', 2 => 'Unavailable'];
        } else if ($row['follow_type'] == '2') {
            $follow_status_arr = [
                1 => 'Commitment',
                2 => 'RNR',
                3 => 'Not Reachable',
                4 => 'Switch Off',
                5 => 'Not in Use',
                6 => 'Blocked'
            ];
        }

        $row['sno'] = $sno++;
        $row['follow_type'] = $follow_type_arr[$row['follow_type']] ?? '';
        $row['follow_status'] = $follow_status_arr[$row['follow_status']] ?? '';
        $row['follow_person_name'] = $follow_person_name_arr[$row['follow_person_name']] ?? '';

        // Only show family name if person type is Family Member (3)
        if ($row['follow_person_name'] === 'Family Member') {
            $row['person_name'] = $row['fam_name'] ?? '';
        }

        if (!empty($row['follow_up_date']) && $row['follow_up_date'] != '0000-00-00') {
            $row['follow_up_date'] = date('d-m-Y', strtotime($row['follow_up_date']));
        }

        if ($row['commitment_date'] == '0000-00-00' || empty($row['commitment_date'])) {
            $row['commitment_date'] = ''; 
        } else {
            $row['commitment_date'] = date('d-m-Y', strtotime($row['commitment_date'])); // Format to d-m-Y
        }

        $commitment_chart_arr[] = $row;
    }
}

echo json_encode($commitment_chart_arr);
$pdo = null;
