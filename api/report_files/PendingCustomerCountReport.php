
<?php
include '../../ajaxconfig.php';

$search_date        = $_POST['search_date'];
$type               = $_POST['type'];
$user_id            = isset($_POST['user_id']) ? $_POST['user_id'] : '';
$map_name           = isset($_POST['map_name']) ? $_POST['map_name'] : '';
$sub_status_type    = $_POST['sub_status_type'];
$loan_category      = $_POST['loan_category'];
$toDate_month_start = date('Y-m-01', strtotime($search_date));

if (!is_array($loan_category)) {
    $loan_category = [$loan_category];
}

if (!is_array($user_id)) {
    $user_id = explode(',', $user_id);
}
$user_id = array_unique(array_map('intval', $user_id));

if (!is_array($map_name)) {
    $map_name = explode(',', $map_name);
}

function calculateDuePeriods($dueStartDate, $endDate, $dueMethod, $schemeDueMethod)
{
    if (empty($dueStartDate) || empty($endDate)) {
        return 0;
    }

    $start = new DateTime($dueStartDate);
    $end   = new DateTime($endDate);

    // MONTHLY calculation
    if ($dueMethod === 'Monthly' || $schemeDueMethod === '1') {
        return (($end->format('Y') - $start->format('Y')) * 12)
            + ($end->format('m') - $start->format('m')) + 1;
    }

    // WEEKLY calculation
    // Match Due List logic: use the absolute difference in days.
    if ($schemeDueMethod !== '3') {
        $diffDays = $start->diff($end)->days;

        return (int) floor($diffDays / 7) + 1;
    }

    // DAILY calculation
    return $start->diff($end)->days + 1;
}

// ==== Build condition depending on type ====
if ($type == 2) {
    // 🔹 Line based
    if (empty($map_name)) {
        echo json_encode(["data" => []]);
        exit;
    }

    $line_str  = implode(',', $map_name);
    $condition = "lnc.id IN ($line_str)";
    $joinTable = " JOIN area_creation_area_name acan ON cp.area = acan.area_id 
    JOIN area_creation ac ON ac.id = acan.area_creation_id 
    JOIN line_name_creation lnc ON lnc.id = ac.line_id";
    $nameField = "lnc.linename";
} else if ($type == 1) {
    //  User based
    if (empty($user_id)) {
        echo json_encode(["data" => []]);
        exit;
    }
    $user_id_str = implode(',', $user_id);

    $userQry = $pdo->query("SELECT id, name, line FROM users WHERE id IN ($user_id_str)");

    $userRows = $userQry->fetchAll();
    if (empty($userRows)) {
        echo json_encode(["data" => []]);
        exit;
    }

    $line_ids = [];
    $display_names = [];
    foreach ($userRows as $row) {
        $line_ids = array_merge($line_ids, explode(',', $row['line']));
        $display_names[$row['id']] = $row['name'];
    }

    $line_ids = array_unique(array_filter(array_map('intval', $line_ids)));

    if (empty($line_ids)) {
        echo json_encode(["data" => []]);
        exit;
    }

    $line_id_str = implode(',', $line_ids);
    $condition   = "lnc.id IN ($line_id_str)";
    $joinTable = " JOIN area_creation_area_name acan ON cp.area = acan.area_id 
    JOIN area_creation ac ON ac.id = acan.area_creation_id 
    JOIN line_name_creation lnc ON lnc.id = ac.line_id";
    $userName    = implode(', ', array_unique($display_names));
    $nameField   = "NULL";
}

$data = [];
$sno = 1;
$loan_category_map = [];
$loanCatQry = $pdo->query("SELECT id, loan_category FROM loan_category");
while ($row = $loanCatQry->fetch()) {
    $loan_category_map[$row['id']] = $row['loan_category'];
}

// Step 2: Fetch Pending Current cus_profile_ids to exclude
$odReqIds = [];
$odQuery = $pdo->query("SELECT DISTINCT cs3.cus_profile_id 
    FROM customer_status cs3 
    JOIN collection col ON cs3.cus_profile_id = col.cus_profile_id 
    WHERE cs3.coll_status = 'OD' 
    AND col.coll_sub_status IN ('Current','Pending','OD') 
    AND DATE_FORMAT(col.coll_date, '%Y-%m-01') >= DATE_FORMAT('$search_date', '%Y-%m-01');
");

while ($row = $odQuery->fetch(PDO::FETCH_ASSOC)) {
    $odReqIds[] = $row['cus_profile_id'];
}

$odReqIdStr = !empty($odReqIds) ? implode(',', $odReqIds) : 'NULL';

// Step 3: Fetch DueNil Current cus_profile_ids to exclude
$DueNilReqIds = [];
$DueNilQuery = $pdo->query("SELECT DISTINCT cs4.cus_profile_id 
    FROM customer_status cs4
    JOIN collection col ON cs4.cus_profile_id = col.cus_profile_id
    WHERE 
        cs4.coll_status = 'Due Nil'
        AND col.coll_sub_status IN ('Current','Pending','OD')
        AND DATE_FORMAT(col.coll_date, '%Y-%m-01') >= DATE_FORMAT('$search_date', '%Y-%m-01');
");

while ($row = $DueNilQuery->fetch(PDO::FETCH_ASSOC)) {
    $DueNilReqIds[] = $row['cus_profile_id'];
}

$DueNilReqIdStr = !empty($DueNilReqIds) ? implode(',', $DueNilReqIds) : 'NULL';

foreach ($loan_category as $cat_id) {
    // Step 1: Fetch customers
    $where = "AND lelc.loan_category = $cat_id";

    $custQry = $pdo->query("SELECT 
        cp.id as cus_profile_id,
        lelc.loan_id,
        cs.coll_status,
        cs.bal_amnt,
        lelc.due_amnt,
        lelc.total_amnt,
        lelc.due_startdate,
        lelc.scheme_due_method,
        lelc.due_method,
        lelc.maturity_date as maturity_date,
        $nameField as map_name
        FROM customer_profile cp
        JOIN loan_issue li ON cp.id = li.cus_profile_id AND li.balance_amount = 0
        JOIN loan_entry_loan_calculation lelc ON lelc.cus_profile_id = li.cus_profile_id
        LEFT JOIN customer_status cs ON li.cus_profile_id = cs.cus_profile_id
        $joinTable
        WHERE $condition
            $where 
            AND (
                cs.bal_amnt > 0
                OR (
                    cs.coll_status = 'Closed'
                    AND cs.in_closed_date IS NOT NULL
                    AND (
                        YEAR(cs.in_closed_date) > YEAR('$search_date')
                        OR (
                            YEAR(cs.in_closed_date) = YEAR('$search_date')
                            AND MONTH(cs.in_closed_date) >= MONTH('$search_date')
                        )
                    )
                )
                OR (li.cus_profile_id IN ($odReqIdStr))
                OR (li.cus_profile_id IN ($DueNilReqIdStr))
            )
            AND DATE(li.issue_date) < '$toDate_month_start';
    ");

    $customers = $custQry->fetchAll(PDO::FETCH_ASSOC);
    if (empty($customers)) continue;

    $cus_profile_ids = array_column($customers, 'cus_profile_id');
    $id_list = implode(',', $cus_profile_ids);

    // Step 2: Fetch all collections for these customers in one query
    $collectionData = [];
    if (!empty($id_list)) {
        $colQry = $pdo->query("SELECT cus_profile_id, coll_date, pending_amt, due_amt_track, total_paid_track
            FROM collection
            WHERE cus_profile_id IN ($id_list)
            AND DATE(coll_date) <= '$search_date'
            ORDER BY cus_profile_id, coll_date ASC
        ");
        while ($col = $colQry->fetch(PDO::FETCH_ASSOC)) {
            $collectionData[$col['cus_profile_id']][] = $col;
        }
    }

    $paidSummary = [];
    $paidQry = $pdo->query("SELECT c.cus_profile_id, 
    SUM(c.due_amt_track) AS total_paid, 
    MIN(c.due_amt) AS monthly_due, 
    MIN(lelc.due_startdate) AS due_start_from, 
    MAX(c.coll_date) AS last_paid_date,
    COUNT(DISTINCT EXTRACT(YEAR_MONTH FROM c.coll_date)) AS paid_month_count,
    COALESCE(SUM(CASE WHEN c.coll_date < DATE_FORMAT('$search_date', '%Y-%m-01') 
    THEN c.due_amt_track ELSE 0 END), 0) AS till_last_month_paid
    FROM collection c
    JOIN loan_entry_loan_calculation lelc ON c.cus_profile_id = lelc.cus_profile_id
    WHERE DATE(c.coll_date) <= '$search_date'
    AND c.cus_profile_id IN ($id_list)
    GROUP BY c.cus_profile_id;");

    while ($row = $paidQry->fetch()) {
        $start = new DateTime($row['due_start_from']);
        $end = new DateTime($search_date);
        $months = ($end->format('Y') - $start->format('Y')) * 12 + ($end->format('m') - $start->format('m')) + 1;

        $paidSummary[$row['cus_profile_id']] = [
            'total_paid'            => (float)$row['total_paid'],
            'expected_due'          => (float)($months * $row['monthly_due']),
            'previous_due'          => (float)(($months - 1) * $row['monthly_due']),
            'last_paid_date'        => $row['last_paid_date'],
            'till_last_month_paid'  => $row['till_last_month_paid'],
            'paid_month_count'      => $row['paid_month_count'],
            'monthly_due'           => (float)$row['monthly_due'],
            'due_start_from'        => $row['due_start_from'],
            'future_due'            => (float)(($months + 1) * $row['monthly_due']),
        ];
    }

    $coll_DueNilReqIds = [];
    $coll_DueNilQuery = $pdo->query("SELECT DISTINCT cs5.cus_profile_id
    FROM customer_status cs5
    JOIN (
        SELECT c.cus_profile_id, MIN(c.coll_date) AS first_coll_date
        FROM collection c
        WHERE MONTH(c.coll_date) = MONTH('$search_date')
        AND YEAR(c.coll_date) = YEAR('$search_date')
        GROUP BY c.cus_profile_id
    ) first_col ON cs5.cus_profile_id = first_col.cus_profile_id
    JOIN collection col
        ON col.cus_profile_id = first_col.cus_profile_id
        AND col.coll_date = first_col.first_coll_date
    WHERE cs5.coll_status = 'Closed'
    AND col.coll_sub_status IN ('Due Nil');");

    while ($row = $coll_DueNilQuery->fetch(PDO::FETCH_ASSOC)) {
        $coll_DueNilReqIds[] = $row['cus_profile_id'];
    }

    $Due_Nil_reqIDS = [];
    $Due_Nil_query = $pdo->query("SELECT c.cus_profile_id
    FROM
        collection c
    JOIN customer_status cs
        ON cs.cus_profile_id = c.cus_profile_id
    WHERE
        c.coll_sub_status = 'Due Nil'
        AND DATE(c.coll_date) > '$search_date'
        AND cs.coll_status = 'Closed'
        -- :lock: Ensure Due Nil is FIRST entry of that month
        AND NOT EXISTS (
            SELECT 1
            FROM collection x
            WHERE
                x.cus_profile_id = c.cus_profile_id
                AND YEAR(x.coll_date) = YEAR(c.coll_date)
                AND MONTH(x.coll_date) = MONTH(c.coll_date)
                AND x.coll_date < c.coll_date
        )
        AND (
            -- Case 1: NO collection in search month
            NOT EXISTS (
                SELECT 1
                FROM collection s
                WHERE
                    s.cus_profile_id = c.cus_profile_id
                    AND YEAR(s.coll_date) = YEAR('$search_date')
                    AND MONTH(s.coll_date) = MONTH('$search_date')
            )
            OR
            -- Case 2: NO collection in search & previous month
            (
                NOT EXISTS (
                SELECT 1
                FROM collection s2
                WHERE
                    s2.cus_profile_id = c.cus_profile_id
                    AND YEAR(s2.coll_date) = YEAR('$search_date')
                    AND MONTH(s2.coll_date) = MONTH('$search_date')
            )
            AND NOT EXISTS (
                SELECT 1
                FROM collection p
                WHERE
                    p.cus_profile_id = c.cus_profile_id
                    AND YEAR(p.coll_date) = YEAR(DATE_SUB('$search_date', INTERVAL 1 MONTH))
                    AND MONTH(p.coll_date) = MONTH(DATE_SUB('$search_date', INTERVAL 1 MONTH))
            )
        )
    );");

    while ($row = $Due_Nil_query->fetch(PDO::FETCH_ASSOC)) {
        $Due_Nil_reqIDS[] = $row['cus_profile_id'];
    }

    $colls_DueNilReqIds = array_merge($coll_DueNilReqIds, $Due_Nil_reqIDS);

    // Step 3: Build groups
    $groups = [];
    foreach ($customers as $cust) {
        if ($type == 2) {
            $groups[$cust['map_name']][] = $cust;
        } else { // type 2
            $groups[$userName][] = $cust;
        }
    }

    // Step 4: Process each group
    foreach ($groups as $groupName => $custList) {
        $total_count = $t_pending_count = $today_pending_clear = $t_pending_clear = $partially_paid = $total_paid_pending = $paid_percentage = $unpaid = $unpaid_percentage = 0;

        foreach ($custList as $cust) {
            $total_count++;
            if (in_array($cust['cus_profile_id'], $colls_DueNilReqIds)) {
                $total_count--;
            }

            $collList = $collectionData[$cust['cus_profile_id']] ?? [];
            $end   = strtotime(min($cust['maturity_date'], $search_date));

            $monthStartDate = $toDate_month_start;

            // Calculate due periods as of the first day of the month
            $months = calculateDuePeriods(
                $cust['due_startdate'],
                $monthStartDate,
                $cust['due_method'],
                $cust['scheme_due_method']
            );

            $pending_month = max(0, $months - 1);

            // total collected till start of month (not till today!)
            $start_month = strtotime(date('Y-m-01', strtotime($search_date))); // 1st of the month as timestamp
            $collectedTillMonthStart = 0;

            foreach ($collList as $coll) {
                $collDate = strtotime($coll['coll_date']);
                if ($collDate < $start_month) {  // strictly before 1st Aug
                    $collectedTillMonthStart += (int)$coll['due_amt_track']; // cast to int
                }
            }

            $pending_amount_atMonthStart = ($pending_month * $cust['due_amnt']) - $collectedTillMonthStart;

            // Check if pending at beginning of month
            $isPendingMonthStart = $pending_amount_atMonthStart > 0 &&
                (
                    (
                        ($cust['scheme_due_method'] === '1' || $cust['due_method'] === 'Monthly')
                        && date('Y-m', strtotime($cust['maturity_date'])) >= date('Y-m', strtotime($toDate_month_start))
                    )
                    ||
                    (
                        ($cust['scheme_due_method'] != '1' || $cust['due_method'] != 'Monthly')
                        && strtotime($cust['maturity_date']) >= strtotime($toDate_month_start)
                    )
                );

            $isPendingCustomer = false; // flag
            if ($isPendingMonthStart) {
                // echo $cust['loan_id'] . "<br>";
                $t_pending_count++;  // fixed for the whole month
                $isPendingCustomer = true; // flag
            }
            if ($isPendingCustomer) {
                $hadCollectionThisMonth = false;

                // // Pending cleared within the month
                if (isset($paidSummary[$cust['cus_profile_id']])) {
                    $pay_amnt               = $paidSummary[$cust['cus_profile_id']]['expected_due'] ?? null;
                    $previous_due           = $paidSummary[$cust['cus_profile_id']]['previous_due'] ?? null;
                    $total_paid             = $paidSummary[$cust['cus_profile_id']]['total_paid'] ?? null;
                    $hadCollectionThisMonth = false;
                    $hadCollectionToday     = false; // ✅ New flag

                    foreach ($collList as $coll) {
                        $collDate = date('Y-m-d', strtotime($coll['coll_date']));

                        // ✅ Check if this collection happened in the same month
                        if (
                            date('m', strtotime($collDate)) == date('m', strtotime($search_date)) &&
                            date('Y', strtotime($collDate)) == date('Y', strtotime($search_date))
                        ) {
                            $hadCollectionThisMonth = true;
                        }

                        // ✅ Check if collection happened exactly on $search_date
                        if ($collDate == $search_date) {
                            $hadCollectionToday = true;
                        }
                    }

                    // ✅ Classification logic
                    if ($total_paid >= $previous_due && $total_paid >= $pay_amnt) {
                        // Fully cleared till this month
                        $t_pending_clear++;

                        // ✅ Check if cleared exactly today
                        if ($hadCollectionToday) {
                            $today_pending_clear++;
                        }
                    } elseif ($hadCollectionThisMonth) {
                        // Payment happened this month but not full
                        $partially_paid++;
                    } else {
                        // No payment in this month at all
                        $unpaid++;
                    }
                } else {
                    $unpaid++;
                }
            }
        }

        $display_name       = ($type == 1) ? $userName : $groupName;
        $total_paid_pending = $t_pending_clear + $partially_paid;
        $paid_percentage    = ($t_pending_count > 0) ? round(($total_paid_pending / $t_pending_count) * 100, 1) : 0.0;
        $unpaid_percentage  = ($t_pending_count > 0) ? round(($unpaid / $t_pending_count) * 100, 1) : 0.0;

        $data[] = [
            'sno'                   => $sno++,
            'date'                  => date('d-m-Y', strtotime($search_date)),
            'fullname'              => $display_name,
            'loan_category'         => $loan_category_map[$cat_id] ?? $cat_id,
            'total_count'           => $total_count,
            't_pending_count'       => $t_pending_count,
            'today_pending_clear'   => $today_pending_clear,
            't_pending_clear'       => $t_pending_clear,
            'partially_paid'        => $partially_paid,
            'total_paid_pending'    => $total_paid_pending,
            'paid_percentage'       => ($t_pending_count > 0) ? round(($total_paid_pending / $t_pending_count) * 100, 1) : 0.0,
            'unpaid'                => $unpaid,
            'unpaid_percentage'     => ($t_pending_count > 0) ? round(($unpaid / $t_pending_count) * 100, 1) : 0.0,
        ];
    }
}

$grand_total = [
    'sno'                   => '',
    'date'                  => '',
    'fullname'              => 'Total',
    'loan_category'         => '',
    'total_count'           => 0,
    't_pending_count'       => 0,
    'today_pending_clear'   => 0,
    't_pending_clear'       => 0,
    'partially_paid'        => 0,
    'total_paid_pending'    => 0,
    'paid_percentage'       => 0,
    'unpaid'                => 0,
    'unpaid_percentage'     => 0,
];

foreach ($data as $row) {
    $grand_total['total_count']         += $row['total_count'];
    $grand_total['t_pending_count']     += $row['t_pending_count'];
    $grand_total['today_pending_clear'] += $row['today_pending_clear'];
    $grand_total['t_pending_clear']     += $row['t_pending_clear'];
    $grand_total['partially_paid']      += $row['partially_paid'];
    $grand_total['total_paid_pending']  += $row['total_paid_pending'];
    $grand_total['paid_percentage']     += $row['paid_percentage'];
    $grand_total['unpaid']              += $row['unpaid'];
    $grand_total['unpaid_percentage']   += $row['unpaid_percentage'];
}

// Append totals to the end
$data[] = $grand_total;

echo json_encode(["data" => $data]);
