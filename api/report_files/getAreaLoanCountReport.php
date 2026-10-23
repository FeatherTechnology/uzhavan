
<?php
@session_start();
require "../../ajaxconfig.php";

header('Content-Type: application/json');

$user_id = $_SESSION['user_id'] ?? 0;
$draw = (int)($_POST['draw'] ?? 1);

$month_start = date('Y-m-01');
$line = trim((string)($_POST['line'] ?? ''));
$loan_cat = trim((string)($_POST['loan_cat'] ?? ''));

/* ================== ELIGIBLE PROFILE IDS ================== */
$qry = "
    SELECT cp.id
    FROM customer_profile cp
    JOIN loan_issue li
        ON cp.id = li.cus_profile_id
       AND li.balance_amount = 0
    JOIN loan_entry_loan_calculation lelc
        ON lelc.cus_profile_id = li.cus_profile_id
    LEFT JOIN area_creation_area_name acan
        ON cp.area = acan.area_id
    LEFT JOIN area_creation ac
        ON acan.area_creation_id = ac.id
    JOIN customer_status cs
        ON cp.id = cs.cus_profile_id
    LEFT JOIN (
        SELECT cus_profile_id, MAX(created_date) AS last_collection_date
        FROM collection
        GROUP BY cus_profile_id
    ) coll
        ON cp.id = coll.cus_profile_id
    WHERE cs.status IN (7, 15, 16, 17)
      AND DATE(li.created_on) < :month_start1
      AND (
          cs.coll_status != 'Due Nil'
          OR (
              cs.coll_status = 'Due Nil'
              AND coll.last_collection_date > :month_start2
          )
      )
      AND (:line1 = '' OR :line2 = '0' OR ac.line_id = :line3)
      AND (
          :loan_cat1 = ''
          OR :loan_cat2 = '0'
          OR lelc.loan_category = :loan_cat3
      )

    UNION

    SELECT li.cus_profile_id
    FROM loan_issue li
    JOIN loan_entry_loan_calculation lelc
        ON lelc.cus_profile_id = li.cus_profile_id
    JOIN customer_profile cp
        ON li.cus_profile_id = cp.id
    LEFT JOIN area_creation_area_name acan
        ON cp.area = acan.area_id
    LEFT JOIN area_creation ac
        ON acan.area_creation_id = ac.id
    JOIN customer_status cs
        ON cp.id = cs.cus_profile_id
       AND cs.status BETWEEN 8 AND 12
    LEFT JOIN (
        SELECT cus_profile_id, MAX(coll_date) AS max_coll_date
        FROM collection
        WHERE coll_date <= :month_start3
        GROUP BY cus_profile_id
    ) lc2
        ON li.cus_profile_id = lc2.cus_profile_id
    LEFT JOIN collection c
        ON lc2.cus_profile_id = c.cus_profile_id
       AND lc2.max_coll_date = c.coll_date
    WHERE DATE(cs.closed_date) >= :month_start4
      AND DATE(li.created_on) <= :month_start5
      AND (
          c.cus_profile_id IS NULL
          OR (c.bal_amt - c.due_amt_track) > 0
      )
      AND li.balance_amount = 0
      AND (:line4 = '' OR :line5 = '0' OR ac.line_id = :line6)
      AND (
          :loan_cat4 = ''
          OR :loan_cat5 = '0'
          OR lelc.loan_category = :loan_cat6
      )
";

$stmtReq = $pdo->prepare($qry);

$params = [
    ':month_start1' => $month_start,
    ':month_start2' => $month_start,
    ':line1' => $line,
    ':line2' => $line,
    ':line3' => $line,
    ':loan_cat1' => $loan_cat,
    ':loan_cat2' => $loan_cat,
    ':loan_cat3' => $loan_cat,
    ':month_start3' => $month_start,
    ':month_start4' => $month_start,
    ':month_start5' => $month_start,
    ':line4' => $line,
    ':line5' => $line,
    ':line6' => $line,
    ':loan_cat4' => $loan_cat,
    ':loan_cat5' => $loan_cat,
    ':loan_cat6' => $loan_cat
];

$stmtReq->execute($params);

$eligible_profile_ids = array_values(array_unique(
    array_map('intval', $stmtReq->fetchAll(PDO::FETCH_COLUMN))
));

if (empty($eligible_profile_ids)) {
    echo json_encode([
        'draw' => $draw,
        'recordsTotal' => 0,
        'recordsFiltered' => 0,
        'data' => []
    ]);
    exit;
}

/* ================== MAIN QUERY ================== */
$placeholders = implode(',', array_fill(
    0,
    count($eligible_profile_ids),
    '?'
));

$sql = "
    SELECT
        anc.id AS area_id,
        anc.areaname AS area_name,
        ac.line_id AS line_id,
        lnc.linename AS line_names,
        lc.cus_profile_id,
        ii.cus_id,
        lc.loan_id,
        ii.issue_date,
        cs.status AS cus_status,
        cs.coll_status,
        lc.due_startdate,
        lc.maturity_date,
        lc.due_amnt AS due_amt_cal,
        lc.total_amnt AS tot_amt_cal,
        lc.due_method AS due_method_calc,
        lc.scheme_due_method AS due_method_scheme,
        COALESCE(c.total_due_amt, 0) AS total_due_amt
    FROM loan_entry_loan_calculation lc
    JOIN customer_profile cp
        ON lc.cus_profile_id = cp.id
    JOIN loan_issue ii
        ON lc.cus_profile_id = ii.cus_profile_id
    JOIN customer_status cs
        ON cp.id = cs.cus_profile_id
    LEFT JOIN area_name_creation anc
        ON cp.area = anc.id
    LEFT JOIN area_creation_area_name acan
        ON cp.area = acan.area_id
    LEFT JOIN area_creation ac
        ON acan.area_creation_id = ac.id
    LEFT JOIN line_name_creation lnc
        ON ac.line_id = lnc.id
    LEFT JOIN (
        SELECT cus_profile_id, SUM(due_amt_track) AS total_due_amt
        FROM collection
        WHERE DATE(coll_date) < ?
        GROUP BY cus_profile_id
    ) c
        ON lc.cus_profile_id = c.cus_profile_id
    WHERE lc.cus_profile_id IN ($placeholders)
      AND (? = '' OR ? = '0' OR ac.line_id = ?)
      AND (? = '' OR ? = '0' OR lc.loan_category = ?)
    ORDER BY anc.id, ac.line_id
";

$stmt = $pdo->prepare($sql);

$executeParams = array_merge(
    [$month_start],
    $eligible_profile_ids,
    [$line, $line, $line, $loan_cat, $loan_cat, $loan_cat]
);

$stmt->execute($executeParams);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

/* ================== INSTALLMENT COUNT FUNCTION ================== */
$count_installments = function (
    DateTimeImmutable $start,
    DateTimeImmutable $end,
    DateTimeImmutable $as_of,
    int $interval_days
): int {
    if ($interval_days < 1 || $end <= $start || $as_of <= $start) {
        return 0;
    }

    $limit = ($as_of < $end) ? $as_of : $end;
    $count = 0;
    $next_due = $start->modify('+' . $interval_days . ' days');

    while ($next_due <= $limit) {
        $count++;
        $next_due = $next_due->modify('+' . $interval_days . ' days');
    }

    return $count;
};

/* ================== AREA + LINE AGGREGATION ================== */
$area_data = [];

$report_date = new DateTimeImmutable($month_start);
$previous_date = $report_date->modify('-1 day');

foreach ($rows as $row) {
    $area_id = (int)($row['area_id'] ?? 0);
    $line_id = (int)($row['line_id'] ?? 0);
    $key = $area_id . '_' . $line_id;

    if (!isset($area_data[$key])) {
        $area_data[$key] = [
            'area_name' => $row['area_name'] ?? '',
            'line_names' => $row['line_names'] ?? '',
            'loan_ids' => [],
            'customer_ids' => [],
            'payable_zero_cnt' => 0,
            'Current' => 0,
            'Pending' => 0,
            'OD' => 0,
            'Error' => 0,
            'Legal' => 0,
            'Due Nil' => 0
        ];
    }

    $loan_id = $row['loan_id'] ?? null;
    $customer_id = $row['cus_id'] ?? null;

    if (
        $loan_id !== null &&
        !in_array($loan_id, $area_data[$key]['loan_ids'])
    ) {
        $area_data[$key]['loan_ids'][] = $loan_id;
    }

    if (
        $customer_id !== null &&
        !in_array($customer_id, $area_data[$key]['customer_ids'])
    ) {
        $area_data[$key]['customer_ids'][] = $customer_id;
    }

    if (empty($row['due_startdate']) || empty($row['maturity_date'])) {
        continue;
    }

    $loan_start_timestamp = strtotime($row['due_startdate']);
    $loan_end_timestamp = strtotime($row['maturity_date']);

    if ($loan_start_timestamp === false || $loan_end_timestamp === false) {
        continue;
    }

    $start_date = new DateTimeImmutable(date('Y-m-d', $loan_start_timestamp));
    $end_date = new DateTimeImmutable(date('Y-m-d', $loan_end_timestamp));

    $scheme = (int)($row['due_method_scheme'] ?? 0);
    $due_method = strtolower(trim((string)($row['due_method_calc'] ?? '')));

    $is_monthly = ($scheme === 1 || $due_method === 'monthly');
    $is_weekly = ($scheme === 2);
    $is_daily = ($scheme === 3);

    $due_amount = (float)($row['due_amt_cal'] ?? 0);
    $total_amount = (float)($row['tot_amt_cal'] ?? 0);
    $total_due_amt = (float)($row['total_due_amt'] ?? 0);

    $balance_amount = $total_amount - $total_due_amt;

    $months = 0;
    $pending_month = 0;

    /* ================== MONTHLY CALCULATION ================== */
    if ($is_monthly) {
        if ($loan_end_timestamp < strtotime($month_start)) {
            $months = (
                (date('Y', $loan_end_timestamp) - date('Y', $loan_start_timestamp)) * 12
            ) + (
                date('m', $loan_end_timestamp) - date('m', $loan_start_timestamp)
            ) + 1;

            $pending_month = $months;

            if (date('Y-m', strtotime($month_start)) === date('Y-m', $loan_end_timestamp)) {
                $pending_month--;
            }
        } else {
            $months = (
                (date('Y', strtotime($month_start)) - date('Y', $loan_start_timestamp)) * 12
            ) + (
                date('m', strtotime($month_start)) - date('m', $loan_start_timestamp)
            ) + 1;

            $pending_month = $months - 1;
        }

        $months = max(0, $months);
        $pending_month = max(0, $pending_month);

    } elseif ($is_weekly || $is_daily) {
        /* ================== WEEKLY / DAILY CALCULATION ================== */
        $interval_days = $is_weekly ? 7 : 1;

        $months = $count_installments(
            $start_date,
            $end_date,
            $report_date,
            $interval_days
        );

        $pending_month = $count_installments(
            $start_date,
            $end_date,
            $previous_date,
            $interval_days
        );

    } else {
        continue;
    }

    /* ================== PAYABLE / PENDING AMOUNTS ================== */
    $payable_amount = max(0, ($months * $due_amount) - $total_due_amt);
    $pending_amount = max(0, ($pending_month * $due_amount) - $total_due_amt);

    if ($payable_amount == 0) {
        $area_data[$key]['payable_zero_cnt']++;
    }

    /* ================== STATUS CALCULATION ================== */
    $status = (string)($row['cus_status'] ?? '');
    $collection_status = strtolower(trim((string)($row['coll_status'] ?? '')));

    $maturity_timestamp = strtotime(date('Y-m-d', $loan_end_timestamp));
    $report_timestamp = strtotime($month_start);
    $issue_timestamp = !empty($row['issue_date'])
        ? strtotime($row['issue_date'])
        : false;

    if (
        $status === '15' &&
        $issue_timestamp !== false &&
        $issue_timestamp < $report_timestamp
    ) {
        $area_data[$key]['Error']++;

    } elseif (
        in_array($status, ['16', '17'], true) &&
        $issue_timestamp !== false &&
        $issue_timestamp < $report_timestamp
    ) {
        $area_data[$key]['Legal']++;

    } elseif ($is_monthly) {
        /* ================== MONTHLY STATUS ================== */
        if (
            $payable_amount <= $due_amount &&
            $pending_amount == 0 &&
            date('Y-m', $maturity_timestamp) >= date('Y-m', $report_timestamp) &&
            $balance_amount != 0
        ) {
            $area_data[$key]['Current']++;

        } elseif (
            $pending_amount > 0 &&
            date('Y-m', $maturity_timestamp) <= date('Y-m', $report_timestamp)
        ) {
            $area_data[$key]['Pending']++;

        } elseif (
            $balance_amount > 0 &&
            date('Y-m', $maturity_timestamp) > date('Y-m', $report_timestamp)
        ) {
            $area_data[$key]['OD']++;
        }

    } else {
        /* ================== WEEKLY / DAILY STATUS ================== */
        if ($collection_status === 'od') {
            $area_data[$key]['OD']++;

        } elseif ($collection_status === 'pending') {
            $area_data[$key]['Pending']++;

        } elseif (
            $payable_amount <= $due_amount &&
            $pending_amount == 0 &&
            $maturity_timestamp >= $report_timestamp &&
            $balance_amount != 0
        ) {
            $area_data[$key]['Current']++;

        } elseif ($balance_amount > 0 && $maturity_timestamp < $report_timestamp) {
            $area_data[$key]['Pending']++;
        }
    }
}

/* ================== DATATABLES RESPONSE ================== */
$data = [];
$sno = 1;

foreach ($area_data as $area) {
    $data[] = [
        'sno' => $sno++,
        'area_name' => $area['area_name'],
        'line' => $area['line_names'],
        'customer_count' => count($area['customer_ids']),
        'loan_count' => count($area['loan_ids']),
        'payable_zero_count' => $area['payable_zero_cnt'],
        'Current' => $area['Current'],
        'Pending' => $area['Pending'],
        'OD' => $area['OD'],
        'Error' => $area['Error'],
        'Legal' => $area['Legal'],
        'Due Nil' => $area['Due Nil']
    ];
}

$recordsTotal = count($data);

$searchValue = trim(
    (string)($_POST['search']['value'] ?? $_POST['search'] ?? '')
);

if ($searchValue !== '') {
    $searchValue = strtolower($searchValue);

    $data = array_values(array_filter($data, function ($row) use ($searchValue) {
        return
            strpos(strtolower((string)$row['area_name']), $searchValue) !== false ||
            strpos(strtolower((string)$row['line']), $searchValue) !== false;
    }));
}

$recordsFiltered = count($data);

$start = max(0, (int)($_POST['start'] ?? 0));
$length = (int)($_POST['length'] ?? 10);

if ($length != -1) {
    $data = array_slice($data, $start, max(0, $length));
}

echo json_encode([
    'draw' => $draw,
    'recordsTotal' => $recordsTotal,
    'recordsFiltered' => $recordsFiltered,
    'data' => array_values($data)
]);
?>
