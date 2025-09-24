<?php
require '../../ajaxconfig.php';

$search_list_arr = array();
$matched_aadhar = $_POST['matched_aadhar'] ?? null;
$cus_id = $_POST['cus_id'] ?? '';
$aadhar_num = $_POST['aadhar_num'] ?? '';
$cus_name = $_POST['cus_name'] ?? '';
$area = $_POST['area'] ?? '';
$mobile = $_POST['mobile'] ?? '';

// Customer query
$sql = "SELECT cp.cus_id, cp.aadhar_num, cp.cus_name, anc.areaname AS area, lnc.linename, bc.branch_name, cp.mobile1
        FROM customer_profile cp 
        LEFT JOIN line_name_creation lnc ON cp.line = lnc.id
        LEFT JOIN area_name_creation anc ON cp.area = anc.id
        LEFT JOIN area_creation ac ON cp.line = ac.line_id
        LEFT JOIN branch_creation bc ON ac.branch_id = bc.id
        INNER JOIN (SELECT MAX(id) as max_id FROM customer_profile GROUP BY cus_id) latest ON cp.id = latest.max_id 
        WHERE 1=1";



// Conditions
$conditions = [];
$conditions2 = [];
$customer_params = [];
$family_params = [];

// Add conditions and parameters
if (!empty($cus_id)) {
    $conditions[] = "cp.cus_id LIKE :cus_id";
    $customer_params[':cus_id'] = '%' . $cus_id . '%';
}

if (!empty($matched_aadhar)) {
    $conditions[] = "cp.cus_id LIKE :matched_aadhar";
    $customer_params[':matched_aadhar'] = '%' . $matched_aadhar . '%';
    $conditions2[] = "fam.fam_aadhar LIKE :matched_aadhar";
    $family_params[':matched_aadhar'] = '%' . $matched_aadhar . '%';
}

if (!empty($aadhar_num)) {
    $conditions[] = "cp.aadhar_num LIKE :aadhar_num";
    $customer_params[':aadhar_num'] = '%' . $aadhar_num . '%';
    $conditions2[] = "fam.fam_aadhar LIKE :aadhar_num";
    $family_params[':aadhar_num'] = '%' . $aadhar_num . '%';
}

if (!empty($cus_name)) {
    $conditions[] = "cp.cus_name LIKE :cus_name";
    $customer_params[':cus_name'] = '%' . $cus_name . '%';
    $conditions2[] = "fam.fam_name LIKE :cus_name";
    $family_params[':cus_name'] = '%' . $cus_name . '%';
}

if (!empty($mobile)) {
    $conditions[] = "cp.mobile1 LIKE :mobile";
    $customer_params[':mobile'] = '%' . $mobile . '%';
    $conditions2[] = "fam.fam_mobile LIKE :mobile";
    $family_params[':mobile'] = '%' . $mobile . '%';
}

if (!empty($area)) {
    $conditions[] = "anc.areaname LIKE :cus_area";
    $customer_params[':cus_area'] = '%' . $area . '%';
}

// Apply conditions
if (!empty($conditions)) {
    $sql .= " AND (" . implode(" OR ", $conditions) . ")";
}

// Prepare statements
$stmt = $pdo->prepare($sql);
// Bind parameters separately
foreach ($customer_params as $key => $value) {
    $stmt->bindValue($key, $value, PDO::PARAM_STR);
}
// Execute
$stmt->execute();

// Fetch customer data
$i = 1;
if ($stmt->rowCount() > 0) {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row['sno'] = $i++;
        $row['action'] = "<div class='dropdown'>
            <button class='btn btn-outline-secondary'><i class='fa'>&#xf107;</i></button>
            <div class='dropdown-content'>
                <a href='#' class='view_customer' value='" . $row['cus_id'] . "'>View</a>
            </div>
        </div>";
        $search_list_arr['customer_data'][] = $row;
    }
}
if (!empty($conditions2)) {
    // Family query
    $fam_sql = "SELECT fam.cus_id, cr.cus_name, fam.fam_name, fam.fam_relationship, fam.fam_aadhar, fam.fam_mobile 
            FROM family_info fam 
            JOIN customer_register cr ON fam.cus_id = cr.cus_id 
            WHERE 1=1";

    if (!empty($conditions2)) {
        $fam_sql .= " AND (" . implode(" OR ", $conditions2) . ")";
    }


    $stmt2 = $pdo->prepare($fam_sql);
    foreach ($family_params as $key => $value) {
        $stmt2->bindValue($key, $value, PDO::PARAM_STR);
    }
    // Fetch family data
    $stmt2->execute();
    $i = 1;
    if ($stmt2->rowCount() > 0) {
        while ($row = $stmt2->fetch(PDO::FETCH_ASSOC)) {
            $row['sno'] = $i++;
            $search_list_arr['family_data'][] = $row;
        }
    }
}

$pdo = null;
echo json_encode($search_list_arr);
