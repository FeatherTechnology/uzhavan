
<?php

require '../../ajaxconfig.php';

@session_start();

header('Content-Type: application/json; charset=utf-8');

$lockAcquired = false;
$transactionStarted = false;
$uploadedPicturePath = null;

try {

    // GET POST VALUES
    $cus_id = trim((string)($_POST['cus_id'] ?? ''));
    $aadhar_num = trim((string)($_POST['aadhar_num'] ?? ''));
    $cus_name = trim((string)($_POST['cus_name'] ?? ''));
    $gender = $_POST['gender'] ?? '';
    $dob = $_POST['dob'] ?? '';
    $age = $_POST['age'] ?? '';
    $mobile1 = $_POST['mobile1'] ?? '';
    $mobile2 = $_POST['mobile2'] ?? '';
    $whatsapp_no = $_POST['whatsapp_no'] ?? '';
    $user_id = $_SESSION['user_id'] ?? null;
    $customer_profile_id = trim(
        (string)($_POST['customer_profile_id'] ?? '')
    );

    if (!$user_id) {
        throw new Exception('User session expired. Please log in again.');
    }

    if ($aadhar_num === '') {
        throw new Exception('Aadhaar number is required.');
    }

    // HANDLE CUSTOMER PHOTO
    $picture = $_POST['per_pic'] ?? '';

    if (
        isset($_FILES['pic']) &&
        $_FILES['pic']['error'] !== UPLOAD_ERR_NO_FILE
    ) {

        if ($_FILES['pic']['error'] !== UPLOAD_ERR_OK) {
            throw new Exception('Customer photo upload failed.');
        }

        $path = '../../uploads/loan_entry/cus_pic/';

        if (!is_dir($path) || !is_writable($path)) {
            throw new Exception('Customer photo directory is unavailable.');
        }

        $tmpName = $_FILES['pic']['tmp_name'];

        $extension = strtolower(
            pathinfo($_FILES['pic']['name'], PATHINFO_EXTENSION)
        );

        // Restrict uploaded image formats.
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

        if (!in_array($extension, $allowedExtensions, true)) {
            throw new Exception('Invalid customer photo format.');
        }

        $imageInfo = getimagesize($tmpName);

        if ($imageInfo === false) {
            throw new Exception('Uploaded file is not a valid image.');
        }

        $picture = bin2hex(random_bytes(16)) . '.' . $extension;

        $uploadedPicturePath = $path . $picture;

        if (!move_uploaded_file($tmpName, $uploadedPicturePath)) {
            throw new Exception('Unable to save customer photo.');
        }
    }

    // START TRANSACTION
    $pdo->beginTransaction();
    $transactionStarted = true;

    // LOCK CUSTOMER ID GENERATION Only one request using this same lock name can generate a new customer ID at a time.
    $lockStmt = $pdo->query("SELECT GET_LOCK('customer_cus_id_generation', 10)");

    $lockResult = $lockStmt->fetchColumn();

    if ((string)$lockResult !== '1') {
        throw new Exception(
            'Customer ID generation is busy. Please try again.'
        );
    }

    $lockAcquired = true;

    // CHECK DUPLICATE AADHAAR Exclude the current profile during an update. Use the profile's own ID to find its status.
    $duplicateSql = "SELECT
            cp.id,
            cp.cus_id,
            cs.status
        FROM customer_profile cp
        LEFT JOIN customer_status cs
            ON cs.cus_profile_id = cp.id
        WHERE cp.aadhar_num = :aadhar_num
          AND cp.aadhar_num IS NOT NULL
          AND cp.aadhar_num != ''
    ";

    $duplicateParams = [
        ':aadhar_num' => $aadhar_num
    ];

    if ($customer_profile_id !== '') {
        $duplicateSql .= " AND cp.id != :profile_id";
        $duplicateParams[':profile_id'] = $customer_profile_id;
    }

    $duplicateSql .= " ORDER BY cp.id ASC LIMIT 1";

    $duplicateStmt = $pdo->prepare($duplicateSql);
    $duplicateStmt->execute($duplicateParams);

    $duplicateCustomer = $duplicateStmt->fetch(PDO::FETCH_ASSOC);

    // DETERMINE CUSTOMER DATA AND STATUS
    $cus_status = '';
    $cus_data = 'New';

    if ($duplicateCustomer) {

        $cus_data = 'Existing';

        $status = (int)($duplicateCustomer['status'] ?? 0);

        if (
            ($status >= 1 && $status <= 6) ||
            $status === 13 ||
            $status === 14
        ) {

            $cus_status = '';
        } elseif (in_array($status, [7, 8, 15, 16, 17], true)) {

            $cus_status = 'Additional';
        } elseif ($status >= 9) {

            $cus_status = 'Renewal';
        }
    }

    // GENERATE OR REUSE CUSTOMER ID
    if ($duplicateCustomer) {

        // Same Aadhaar: reuse the existing customer's cus_id.
        $cus_id = $duplicateCustomer['cus_id'];
    } elseif ($customer_profile_id !== '') {

        // Updating a profile: preserve its existing cus_id.
        $currentStmt = $pdo->prepare("SELECT cus_id FROM customer_profile WHERE id = :id LIMIT 1");

        $currentStmt->execute([
            ':id' => $customer_profile_id
        ]);

        $currentCustomer = $currentStmt->fetch(PDO::FETCH_ASSOC);

        if (!$currentCustomer) {
            throw new Exception('Customer profile not found.');
        }

        $cus_id = $currentCustomer['cus_id'];
    } else {

        // New customer with no matching Aadhaar. This query runs only after acquiring the advisory lock.
        $maxStmt = $pdo->query("SELECT MAX(CAST(cus_id AS UNSIGNED)) AS max_number
            FROM customer_profile
            WHERE cus_id IS NOT NULL AND cus_id != ''
        ");

        $maxRow = $maxStmt->fetch(PDO::FETCH_ASSOC);

        $maxNumber = (int)($maxRow['max_number'] ?? 0);

        $cus_id = ($maxNumber > 0)
            ? $maxNumber + 1
            : 1001;
    }

    // 8. UPDATE OR INSERT CUSTOMER PROFILE
    if ($customer_profile_id !== '') {

        // UPDATE existing profile.
        $updateStmt = $pdo->prepare("UPDATE customer_profile
            SET
                cus_id = :cus_id,
                aadhar_num = :aadhar_num,
                cus_name = :cus_name,
                gender = :gender,
                dob = :dob,
                age = :age,
                mobile1 = :mobile1,
                mobile2 = :mobile2,
                whatsapp_no = :whatsapp_no,
                pic = :pic,
                cus_data = :cus_data,
                cus_status = :cus_status,
                update_login_id = :user_id,
                updated_on = NOW()
            WHERE id = :profile_id
        ");

        $updateStmt->execute([
            ':cus_id' => $cus_id,
            ':aadhar_num' => $aadhar_num,
            ':cus_name' => $cus_name,
            ':gender' => $gender,
            ':dob' => $dob,
            ':age' => $age,
            ':mobile1' => $mobile1,
            ':mobile2' => $mobile2,
            ':whatsapp_no' => $whatsapp_no,
            ':pic' => $picture,
            ':cus_data' => $cus_data,
            ':cus_status' => $cus_status,
            ':user_id' => $user_id,
            ':profile_id' => $customer_profile_id
        ]);

        $result = 0;
        $last_id = $customer_profile_id;
    } else {

        // INSERT new profile.
        $insertStmt = $pdo->prepare("INSERT INTO customer_profile (
                cus_id,
                aadhar_num,
                cus_name,
                gender,
                dob,
                age,
                mobile1,
                mobile2,
                whatsapp_no,
                pic,
                cus_data,
                cus_status,
                insert_login_id,
                created_on
            ) VALUES (
                :cus_id,
                :aadhar_num,
                :cus_name,
                :gender,
                :dob,
                :age,
                :mobile1,
                :mobile2,
                :whatsapp_no,
                :pic,
                :cus_data,
                :cus_status,
                :user_id,
                CURRENT_TIMESTAMP
            )
        ");

        $insertStmt->execute([
            ':cus_id' => $cus_id,
            ':aadhar_num' => $aadhar_num,
            ':cus_name' => $cus_name,
            ':gender' => $gender,
            ':dob' => $dob,
            ':age' => $age,
            ':mobile1' => $mobile1,
            ':mobile2' => $mobile2,
            ':whatsapp_no' => $whatsapp_no,
            ':pic' => $picture,
            ':cus_data' => $cus_data,
            ':cus_status' => $cus_status,
            ':user_id' => $user_id
        ]);

        $result = 1;
        $last_id = $pdo->lastInsertId();

        // Insert the initial status for this profile.
        $statusStmt = $pdo->prepare("INSERT INTO customer_status (
                cus_id,
                cus_profile_id,
                status,
                insert_login_id,
                created_on
            ) VALUES (
                :cus_id,
                :profile_id,
                0,
                :user_id,
                CURRENT_TIMESTAMP
            )
        ");

        $statusStmt->execute([
            ':cus_id' => $cus_id,
            ':profile_id' => $last_id,
            ':user_id' => $user_id
        ]);
    }

    // 9. SYNCHRONIZE CUSTOMER REGISTER Preserve your original behavior: insert only if this Aadhaar is not already registered.
    $registerCheck = $pdo->prepare("SELECT cus_id
        FROM customer_register
        WHERE aadhar_num = :aadhar_num
        LIMIT 1
    ");

    $registerCheck->execute([
        ':aadhar_num' => $aadhar_num
    ]);

    if (!$registerCheck->fetch(PDO::FETCH_ASSOC)) {

        $registerStmt = $pdo->prepare("INSERT INTO customer_register (
                cus_profile_id,
                cus_id,
                aadhar_num,
                cus_name,
                gender,
                dob,
                age,
                mobile1,
                mobile2,
                whatsapp_no,
                pic,
                cus_data,
                cus_status,
                insert_login_id,
                created_on
            ) VALUES (
                :profile_id,
                :cus_id,
                :aadhar_num,
                :cus_name,
                :gender,
                :dob,
                :age,
                :mobile1,
                :mobile2,
                :whatsapp_no,
                :pic,
                :cus_data,
                :cus_status,
                :user_id,
                CURRENT_TIMESTAMP
            )
        ");

        $registerStmt->execute([
            ':profile_id' => $last_id,
            ':cus_id' => $cus_id,
            ':aadhar_num' => $aadhar_num,
            ':cus_name' => $cus_name,
            ':gender' => $gender,
            ':dob' => $dob,
            ':age' => $age,
            ':mobile1' => $mobile1,
            ':mobile2' => $mobile2,
            ':whatsapp_no' => $whatsapp_no,
            ':pic' => $picture,
            ':cus_data' => $cus_data,
            ':cus_status' => $cus_status,
            ':user_id' => $user_id
        ]);
    }

    // 10. COMMIT TRANSACTION
    $pdo->commit();
    $transactionStarted = false;

    $response = [
        'result' => $result,
        'last_id' => $last_id,
        'cus_id' => $cus_id,
        'cus_data' => $cus_data,
        'cus_status' => $cus_status,
        'pic' => $picture
    ];
} catch (Throwable $e) {

    if ($transactionStarted && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    // Remove a newly uploaded photo if the database save fails.
    if ($uploadedPicturePath !== null && is_file($uploadedPicturePath)) {
        @unlink($uploadedPicturePath);
    }

    http_response_code(500);

    $response = [
        'result' => 0,
        'error' => $e->getMessage()
    ];
} finally {

    // MySQL advisory locks are connection-level locks. They must be released explicitly.
    if ($lockAcquired) {
        try {
            $pdo->query("SELECT RELEASE_LOCK('customer_cus_id_generation')");
        } catch (Throwable $releaseError) {
            error_log('Customer ID lock release failed: ' . $releaseError->getMessage());
        }
    }
}

echo json_encode($response);
?>
