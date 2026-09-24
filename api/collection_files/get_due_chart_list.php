<?php
require '../../ajaxconfig.php';


function moneyFormatIndia($num)
{
    $explrestunits = "";
    if (strlen($num) > 3) {
        $lastthree = substr($num, strlen($num) - 3, strlen($num));
        $restunits = substr($num, 0, strlen($num) - 3);
        $restunits = (strlen($restunits) % 2 == 1) ? "0" . $restunits : $restunits;
        $expunit = str_split($restunits, 2);
        for ($i = 0; $i < sizeof($expunit); $i++) {
            if ($i == 0) {
                $explrestunits .= (int)$expunit[$i] . ",";
            } else {
                $explrestunits .= $expunit[$i] . ",";
            }
        }
        $thecash = $explrestunits . $lastthree;
    } else {
        $thecash = $num;
    }
    return $thecash;
}
?>
<table class="table custom-table" id='dueChartListTable'>


    <?php
    $cp_id = $_POST['cp_id'];
    $cus_id = $_POST['cus_id'];
    $curDateChecker = true;
    if (isset($_POST['closed'])) {
        $closed = $_POST['closed'];
    } else {
        $closed = 'false';
    }
    $loanStart = $pdo->query("SELECT lelc.due_startdate, lelc.maturity_date, lelc.due_method, lelc.scheme_due_method FROM loan_entry_loan_calculation lelc WHERE lelc.cus_profile_id = '$cp_id' ");
    $loanFrom = $loanStart->fetch();
    //If Due method is Monthly, Calculate penalty by checking the month has ended or not
    $due_start_from = $loanFrom['due_startdate'];
    $maturity_month = $loanFrom['maturity_date'];
    $maturity_month_obj = new DateTime($maturity_month);

    if ($loanFrom['due_method'] == 'Monthly' || $loanFrom['scheme_due_method'] == '1') {
        //If Due method is Monthly, Calculate penalty by checking the month has ended or not

        // Create a DateTime object from the given date
        $maturity_month = new DateTime($maturity_month);
        // Subtract one month from the date
        // $maturity_month->modify('-1 month');
        // Format the date as a string
        $maturity_month = $maturity_month->format('Y-m-d');

        $due_start_from = date('Y-m-d', strtotime($due_start_from));
        $maturity_month = date('Y-m-d', strtotime($maturity_month));
        $current_date = date('Y-m-d');

        $start_date_obj = DateTime::createFromFormat('Y-m-d', $due_start_from);
        $end_date_obj = DateTime::createFromFormat('Y-m-d', $maturity_month);
        $current_date_obj = DateTime::createFromFormat('Y-m-d', $current_date);
        $interval = new DateInterval('P1M'); // Create a one month interval
        //$count = 0;
        $i = 1;
        $dueMonth[] = $due_start_from;
        while ($start_date_obj < $end_date_obj) {
            $start_date_obj->add($interval);
            $dueMonth[] = $start_date_obj->format('Y-m-d');
        }
    } else
        if ($loanFrom['scheme_due_method'] == '2') {
        //If Due method is Weekly, Calculate penalty by checking the month has ended or not
        $current_date = date('Y-m-d');

        // Create a DateTime object from the given date
        $maturity_month = new DateTime($maturity_month);
        // Subtract one month from the date
        // $maturity_month->modify('-7 days');
        // Format the date as a string
        $maturity_month = $maturity_month->format('Y-m-d');

        $start_date_obj = DateTime::createFromFormat('Y-m-d', $due_start_from);
        $end_date_obj = DateTime::createFromFormat('Y-m-d', $maturity_month);
        $current_date_obj = DateTime::createFromFormat('Y-m-d', $current_date);

        $interval = new DateInterval('P1W'); // Create a one Week interval

        //$count = 0;
        $i = 1;
        $dueMonth[] = $due_start_from;
        while ($start_date_obj < $end_date_obj) {
            $start_date_obj->add($interval);
            $dueMonth[] = $start_date_obj->format('Y-m-d');
        }
    } else
        if ($loanFrom['scheme_due_method'] == '3') {
        //If Due method is Daily, Calculate penalty by checking the month has ended or not
        $current_date = date('Y-m-d');

        // Create a DateTime object from the given date
        $maturity_month = new DateTime($maturity_month);
        // Subtract one month from the date
        // $maturity_month->modify('-1 days');
        // Format the date as a string
        $maturity_month = $maturity_month->format('Y-m-d');

        $start_date_obj = DateTime::createFromFormat('Y-m-d', $due_start_from);
        $end_date_obj = DateTime::createFromFormat('Y-m-d', $maturity_month);
        $current_date_obj = DateTime::createFromFormat('Y-m-d', $current_date);

        $interval = new DateInterval('P1D'); // Create a one Week interval

        //$count = 0;
        $i = 1;
        $dueMonth[] = $due_start_from;
        while ($start_date_obj < $end_date_obj) {
            $start_date_obj->add($interval);
            $dueMonth[] = $start_date_obj->format('Y-m-d');
        }
    }

    $issueDate = $pdo->query("SELECT lelc.due_amnt, lelc.interest_amnt, lelc.total_amnt, lelc.principal_amnt, li.issue_date
    FROM loan_issue li 
    JOIN loan_entry_loan_calculation lelc ON li.cus_profile_id = lelc.cus_profile_id  
    JOIN customer_status cs ON cs.cus_profile_id = li.cus_profile_id
    WHERE li.cus_profile_id = '$cp_id' and cs.status >= 7 ORDER BY lelc.id DESC LIMIT 1 ");

    $loanIssue = $issueDate->fetch();
    //If Due method is Monthly, Calculate penalty by checking the month has ended or not
    if ($loanIssue['total_amnt'] == '' || $loanIssue['total_amnt'] == null) {
        //(For monthly interest total amount will not be there, so take principals)
        $loan_amt = intVal($loanIssue['principal_amnt']);
        $loan_type = 'interest';
    } else {
        $loan_amt = intVal($loanIssue['total_amnt']);
        $loan_type = 'emi';
    }

    $due_amt_1 = $loanIssue['due_amnt'];

    if ($loan_type == 'interest') {
        $princ_amt_1 = $loanIssue['principal_amnt'];
        $due_amt_1 = $loanIssue['interest_amnt'];
    }

    $issue_date = $loanIssue['issue_date'];

    // -------------------------------------------------------------------------
    // Single-load data cache. These values are reused for the complete chart.
    // -------------------------------------------------------------------------
    $loanCalcStmt = $pdo->prepare("SELECT * FROM loan_entry_loan_calculation WHERE cus_profile_id = ? LIMIT 1");
    $loanCalcStmt->execute([$cp_id]);
    $loan_arr_cache = $loanCalcStmt->fetch(PDO::FETCH_ASSOC) ?: [];
    if (!empty($loan_arr_cache)) {
        $loan_arr_cache['loan_type'] = $loan_type;
    }

    $collectionRows = loadDueChartCollections($pdo, $cp_id);
    $collectionGroups = buildCollectionGroups($collectionRows);
    $collectionSummary = buildCollectionSummary($collectionRows);
    $penaltyData = buildPenaltyData($pdo, $cp_id, $loan_arr_cache, $collectionRows);
    $dateForCalculation = date('Y-m-d');
    ?>

    <thead>
        <tr><!-- Showing Collection Due Month Start and balance -->
            <th width="15"> Due No </th>
            <th width="8%"> Due Month </th>
            <th> Month </th>
            <?php if ($loan_type == 'emi') { ?>
                <th> Due Amount </th>
            <?php } ?>
            <?php if ($loan_type == 'interest') { ?>
                <th> Principal </th>
                <th> Interest </th>
            <?php } ?>
            <th> Pending </th>
            <th> Payable </th>
            <th> Collection Date </th>
            <?php if ($loan_type == 'emi') { ?>
                <th> Collection Amount </th>
            <?php } ?>
            <?php if ($loan_type == 'interest') { ?>
                <th> Principal Amount </th>
                <th> Interest Amount </th>
            <?php } ?>
            <th> Balance Amount </th>
            <th> Pre Closure </th>
            <th> Role </th>
            <th width="8%"> User ID </th>
            <!-- <th> Collection Method </th> -->
            <th> ACTION </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> </td>
            <td><?php
                if ($loanFrom['due_method'] == 'Monthly' || $loanFrom['scheme_due_method'] == '1') {
                    //For Monthly.
                    echo date('m-Y', strtotime($issue_date));
                } else {
                    //For Weekly && Day.
                    echo date('d-m-Y', strtotime($issue_date));
                } ?></td>
            <td><?php echo date('M', strtotime($issue_date)); ?></td>
            <?php if ($loan_type == 'emi') { ?>
                <td> </td>
            <?php } ?>
            <?php if ($loan_type == 'interest') { ?>
                <td> </td>
                <td> </td>
            <?php } ?>
            <td></td>
            <td></td>
            <td></td>

            <!-- for collected amt -->
            <?php if ($loan_type == 'emi') { ?>
                <td> </td>
            <?php } ?>
            <?php if ($loan_type == 'interest') { ?>
                <td> </td>
                <td> </td>
            <?php } ?>

            <td><?php echo moneyFormatIndia($loan_amt); ?></td>
            <td></td>
            <td></td>
            <td></td>
            <!-- <td></td> -->
            <td></td>
        </tr>
        <?php
        $issued = date('Y-m-d', strtotime($issue_date));
        if ($loanFrom['due_method'] == 'Monthly' || $loanFrom['scheme_due_method'] == '1') {
            //Query for Monthly.
            $run = $pdo->query("SELECT c.coll_code, c.due_amt,c.tot_amt, c.pending_amt, c.payable_amt, c.coll_date, c.trans_date, c.due_amt_track,c.princ_amt_track,c.int_amt_track, c.bal_amt, c.coll_charge_track, c.pre_close_waiver, lelc.due_startdate, lelc.maturity_date, lelc.due_method, u.name, r.role
            FROM `collection` c
            LEFT JOIN loan_entry_loan_calculation lelc ON c.cus_profile_id = lelc.cus_profile_id
            LEFT JOIN users u ON c.insert_login_id = u.id
            LEFT JOIN role r ON u.role = r.id
            WHERE c.cus_profile_id = '$cp_id' AND (c.due_amt_track != '' or c.pre_close_waiver!='')
            AND(
                (
                    ( MONTH(c.coll_date) >= MONTH('$issued') AND YEAR(c.coll_date) = YEAR('$issued') )
                    AND 
                    ( 
                        (
                            YEAR(c.coll_date) = YEAR('$due_start_from') AND MONTH(c.coll_date) < MONTH('$due_start_from')
                        ) OR (
                            YEAR(c.coll_date) < YEAR('$due_start_from')
                        )
                    )
                ) 
                OR
                (
                    ( MONTH(c.trans_date) >= MONTH('$issued') AND YEAR(c.trans_date) = YEAR('$issued') )
                    AND 
                    ( 
                        (
                            YEAR(c.trans_date) = YEAR('$due_start_from') AND MONTH(c.trans_date) < MONTH('$due_start_from')
                        ) OR (
                            YEAR(c.trans_date) < YEAR('$due_start_from')
                        )
                            AND c.trans_date != '0000-00-00'
                    )
                )
            )");
        } else
        if ($loanFrom['scheme_due_method'] == '2') {
            //Query For Weekly.

            $run = $pdo->query("SELECT c.coll_code, c.due_amt, c.pending_amt, c.payable_amt, c.coll_date, c.trans_date, c.due_amt_track, c.bal_amt, c.coll_charge_track, c.pre_close_waiver, lelc.due_startdate, lelc.maturity_date, lelc.due_method, u.name, r.role
            FROM `collection` c
            LEFT JOIN loan_entry_loan_calculation lelc ON c.cus_profile_id = lelc.cus_profile_id
            LEFT JOIN users u ON c.insert_login_id = u.id
            LEFT JOIN role r ON u.role = r.id
            WHERE c.`cus_profile_id` = '$cp_id' AND (c.due_amt_track != '' or c.pre_close_waiver!='' OR c.princ_amt_track != '')
            AND (
                   (DATE(c.coll_date) >= DATE('$issued') AND DATE(c.coll_date) < DATE('$due_start_from') AND DATE(c.coll_date) != '0000-00-00' ) OR
                (DATE(c.trans_date) >= DATE('$issued') AND DATE(c.trans_date) < DATE('$due_start_from') AND DATE(c.trans_date) != '0000-00-00' )
                )
            ");
        } else
        if ($loanFrom['scheme_due_method'] == '3') {
            //Query For Day.
            $run = $pdo->query("SELECT c.coll_code, c.due_amt, c.pending_amt, c.payable_amt, c.coll_date, c.trans_date, c.due_amt_track, c.bal_amt, c.coll_charge_track, c.pre_close_waiver, lelc.due_startdate, lelc.maturity_date, lelc.due_method, u.name, r.role
            FROM `collection` c
            LEFT JOIN loan_entry_loan_calculation lelc ON c.cus_profile_id = lelc.cus_profile_id
            LEFT JOIN users u ON c.insert_login_id = u.id
            LEFT JOIN role r ON u.role = r.id
            WHERE c.`cus_profile_id` = '$cp_id' AND (c.due_amt_track != '' or c.pre_close_waiver!='')
            AND (
                (DATE(c.coll_date) >= DATE('$issued') AND DATE(c.coll_date) < DATE('$due_start_from') AND DATE(c.coll_date) != '0000-00-00' ) OR
                (DATE(c.trans_date) >= DATE('$issued') AND DATE(c.trans_date) < DATE('$due_start_from') AND DATE(c.trans_date) != '0000-00-00' )
            ) ");
        }

        //For showing data before due start date
        $due_amt_track = 0;
        $waiver = 0;
        $last_bal_amt = 0;
        $bal_amt = 0;
        if ($run->rowCount() > 0) {
            while ($row = $run->fetch()) {
                $collectionAmnt = intVal($row['due_amt_track']);
                $due_amt_track = $due_amt_track + intVal($row['due_amt_track']);
                $waiver = $waiver + intVal($row['pre_close_waiver']);
                if ($loan_type == 'interest') {
                    $PcollectionAmnt = intVal($row['princ_amt_track']);
                    $IcollectionAmnt = intVal($row['int_amt_track']);
                    if ($last_bal_amt != 0) {
                        $bal_amt = $last_bal_amt - $PcollectionAmnt - $waiver;
                    } else {
                        $bal_amt = $loan_amt - $PcollectionAmnt - $waiver;
                    }
                } else {
                    $bal_amt = $loan_amt - $due_amt_track - $waiver;
                }
        ?>
                <tr> <!-- Showing From loan date to due start date. if incase due paid before due start date it has to show seperatly in top row. -->
                    <td></td>
                    <td></td>
                    <td></td>

                    <?php if ($loan_type == 'emi') { ?>
                        <td></td>
                    <?php } ?>
                    <?php if ($loan_type == 'interest') { ?>
                        <td></td>
                        <td></td>
                    <?php } ?>
                    <td><?php $pendingMinusCollection = moneyFormatIndia(intval($row['pending_amt'])); ?></td>
                    <td><?php $payableMinusCollection = moneyFormatIndia(intVal($row['payable_amt'])); ?></td>
                    <td>
                        <?php
                        // Check if trans_date is valid (not null, not empty, and not '0000-00-00')
                        $trans_date = (!empty($row['trans_date']) && $row['trans_date'] != '0000-00-00') ? $row['trans_date'] : $row['coll_date'];
                        echo date('d-m-Y', strtotime($trans_date));
                        ?>
                    </td>

                    <!-- for collected amt -->
                    <?php if ($loan_type == 'emi') { ?>
                        <td>
                            <?php if ($row['due_amt_track'] > 0) {
                                echo moneyFormatIndia($row['due_amt_track']);
                            } elseif ($row['pre_close_waiver'] > 0) {
                                echo moneyFormatIndia($row['pre_close_waiver']);
                            } ?>
                        </td>
                    <?php } ?>

                    <?php if ($loan_type == 'interest') { ?>
                        <td>
                            <?php if ($PcollectionAmnt > 0) {
                                echo $PcollectionAmnt;
                            } elseif ($row['pre_close_waiver'] > 0) {
                                echo $row['pre_close_waiver'];
                            } ?>
                        </td>
                        <td>
                            <?php if ($IcollectionAmnt > 0) {
                                echo moneyFormatIndia($IcollectionAmnt);
                            } ?>
                        </td>
                    <?php } ?>

                    <td><?php echo moneyFormatIndia($bal_amt); ?></td>
                    <td><?php if ($row['pre_close_waiver'] > 0) {
                            echo moneyFormatIndia($row['pre_close_waiver']);
                        } else {
                            echo '0';
                        } ?></td>
                    <td><?php echo $row['role']; ?>
                    </td>
                    <td><?php echo $row['name']; ?></td>
                    <!-- <td><?php #if ($row['coll_location'] == '1') {echo 'By Self'; } elseif ($row['coll_location'] == '2') { echo 'On Spot';} elseif ($row['coll_location'] == '3') { echo 'Bank Transfer';} 
                                ?></td> -->
                    <td> <a class='print_due_coll' id="" value="<?php echo $row['coll_code']; ?>"> <i class="fa fa-print" aria-hidden="true"></i> </a> </td>
                </tr>

                <?php
                if ($loan_type == 'interest') {
                    $last_bal_amt = $bal_amt;
                } else {
                }
            }
        }

        //For showing collection after due start date
        $due_amt_track = 0;
        $waiver = 0;
        $jj = 0;
        $last_int_amt = $due_amt_1;
        if ($loan_type == 'interest') {
            $last_princ_amt = $last_bal_amt;
            // $bal_amt = $last_bal_amt;
        } else {
            $bal_amt = 0;
        }
        /*
         * OPTIMIZATION:
         * All collection rows are loaded once. The old code executed one SQL
         * query for every due period. That was the main execution-time issue.
         */
        // Cache calculation results by due date. This completely removes the
        // repeated getNextLoanDetails() calls from the due-month loop.
        $nextLoanCache = [];

        $lastCusdueMonth = '1970-01-01';
        $printedWeek = null;

        foreach ($dueMonth as $cusDueMonth) {
            $periodRows = getPeriodCollections(
                $collectionGroups,
                $cusDueMonth,
                $loanFrom['scheme_due_method'],
                $loanFrom['due_method']
            );

            if (!empty($periodRows)) {
                foreach ($periodRows as $row) {
                    $due_amt_track = (int)$row['due_amt_track'];
                    $princ_amt_track = (int)($row['princ_amt_track'] ?? 0);
                    $int_amt_track = (int)($row['int_amt_track'] ?? 0);
                    $waiver = (int)$row['pre_close_waiver'];

                    if ($loan_type == 'emi') {
                        $bal_amt = (int)$row['bal_amt'] - $due_amt_track - $waiver;
                    } else {
                        $bal_amt = (int)$last_princ_amt - $due_amt_track - $waiver;
                    }

                    $displayPeriodHeader = false;
                    if ($loanFrom['due_method'] == 'Monthly' || $loanFrom['scheme_due_method'] == '1') {
                        $rowMonth = !empty($row['coll_date']) ? substr($row['coll_date'], 0, 7) : '';
                        $displayPeriodHeader = ($rowMonth !== substr($lastCusdueMonth, 0, 7));
                    } else {
                        $weekStart = $cusDueMonth;
                        $displayPeriodHeader = ($printedWeek !== $weekStart);
                        if ($displayPeriodHeader) {
                            $printedWeek = $weekStart;
                        }
                    }
                ?>
                    <tr>
                        <?php if ($displayPeriodHeader) { ?>
                            <td><?php echo $i++; ?></td>
                            <td><?php echo ($loanFrom['due_method'] == 'Monthly' || $loanFrom['scheme_due_method'] == '1') ? date('m-Y', strtotime($cusDueMonth)) : date('d-m-Y', strtotime($cusDueMonth)); ?></td>
                            <td><?php echo date('M', strtotime($cusDueMonth)); ?></td>
                            <?php if ($loan_type == 'emi') { ?>
                                <td><?php echo moneyFormatIndia($row['due_amt']); ?></td>
                            <?php } ?>
                            <?php if ($loan_type == 'interest') { ?>
                                <td><?php echo moneyFormatIndia($last_princ_amt); ?></td>
                                <td><?php echo moneyFormatIndia($row['due_amt']); ?></td>
                            <?php } ?>
                        <?php } else { ?>
                            <td></td>
                            <td></td>
                            <td></td>
                            <?php if ($loan_type == 'emi') { ?><td></td><?php } ?>
                            <?php if ($loan_type == 'interest') { ?><td></td>
                                <td></td><?php } ?>
                        <?php } ?>

                        <td><?php echo moneyFormatIndia((int)$row['pending_amt']); ?></td>
                        <td><?php echo moneyFormatIndia((int)$row['payable_amt']); ?></td>
                        <td><?php
                            $trans_date = (!empty($row['trans_date']) && $row['trans_date'] != '0000-00-00') ? $row['trans_date'] : $row['coll_date'];
                            echo !empty($trans_date) ? date('d-m-Y', strtotime($trans_date)) : '';
                            ?></td>

                        <?php if ($loan_type == 'emi') { ?>
                            <td><?php
                                if ((int)$row['due_amt_track'] > 0) echo moneyFormatIndia($row['due_amt_track']);
                                elseif ((int)$row['pre_close_waiver'] > 0) echo moneyFormatIndia($row['pre_close_waiver']);
                                ?></td>
                        <?php } ?>

                        <?php if ($loan_type == 'interest') { ?>
                            <td><?php
                                if ($princ_amt_track > 0) echo moneyFormatIndia($princ_amt_track);
                                elseif ($waiver > 0) echo moneyFormatIndia($waiver);
                                ?></td>
                            <td><?php if ($int_amt_track > 0) echo moneyFormatIndia($int_amt_track); ?></td>
                        <?php } ?>

                        <td><?php echo moneyFormatIndia($bal_amt); ?></td>
                        <td><?php echo $waiver > 0 ? moneyFormatIndia($waiver) : '0'; ?></td>
                        <td><?php echo htmlspecialchars($row['role'] ?? '', ENT_QUOTES, 'UTF-8'); ?></td>
                        <td><?php echo htmlspecialchars($row['name'] ?? '', ENT_QUOTES, 'UTF-8'); ?></td>
                        <td><a class='print_due_coll' id='' value="<?php echo htmlspecialchars($row['coll_code'], ENT_QUOTES, 'UTF-8'); ?>"><i class="fa fa-print" aria-hidden="true"></i></a></td>
                    </tr>
                <?php
                    if ($loan_type == 'interest') {
                        $last_princ_amt = $bal_amt;
                    }
                    $lastCusdueMonth = $cusDueMonth;
                }
            } else {
                ?>
                <tr>
                    <td><?php echo $i++; ?></td>
                    <td><?php echo ($loanFrom['due_method'] == 'Monthly' || $loanFrom['scheme_due_method'] == '1') ? date('m-Y', strtotime($cusDueMonth)) : date('d-m-Y', strtotime($cusDueMonth)); ?></td>
                    <td><?php echo date('M', strtotime($cusDueMonth)); ?></td>
                    <?php if ($loan_type == 'emi') { ?>
                        <td><?php echo moneyFormatIndia($due_amt_1); ?></td>
                    <?php } ?>
                    <?php if ($loan_type == 'interest') { ?>
                        <td><?php echo moneyFormatIndia($last_princ_amt); ?></td>
                        <td><?php echo moneyFormatIndia($last_int_amt); ?></td>
                    <?php } ?>

                    <?php
                    $isMonthly = (
                        $loanFrom['due_method'] == 'Monthly' ||
                        $loanFrom['scheme_due_method'] == '1'
                    );

                    $periodKey = $isMonthly
                        ? substr($cusDueMonth, 0, 7)
                        : $cusDueMonth;

                    $todayKey = $isMonthly
                        ? date('Y-m')
                        : date('Y-m-d');

                    $shouldCalculate = ($periodKey <= $todayKey);

                    if ($shouldCalculate) {

                        if (!isset($nextLoanCache[$cusDueMonth])) {

                            $nextLoanCache[$cusDueMonth] = getNextLoanDetailsOptimized(
                                $loan_arr_cache,
                                $collectionRows,
                                $collectionGroups,
                                $penaltyData,
                                $collectionSummary,
                                $cusDueMonth,
                                $dateForCalculation
                            );
                        }

                        $response = $nextLoanCache[$cusDueMonth];

                    ?>
                        <td>
                            <?php echo moneyFormatIndia($response['pending']); ?>
                        </td>

                        <td>
                            <?php echo moneyFormatIndia($response['payable']); ?>
                        </td>
                    <?php

                    } else {

                    ?>
                        <td></td>
                        <td></td>
                    <?php

                    }
                    ?>
                    <td></td>
                    <?php if ($loan_type == 'emi') { ?><td></td><?php } ?>
                    <?php if ($loan_type == 'interest') { ?><td></td>
                        <td></td><?php } ?>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            <?php
            }
        }

        $currentMonth = date('Y-m-d');
        $startTime = '00:00:00'; //Set starting time of clock
        $endTime = '23:59:59'; //set end time of clock
        $currentMonth = $currentMonth . ' ' . $endTime;
        $start_date = $due_start_from . ' ' . $startTime;
        if ($loanFrom['due_method'] == 'Monthly' || $loanFrom['scheme_due_method'] == '1') {
            $maturity_month_last_date = (clone $maturity_month_obj)->modify('last day of this month')->format('Y-m-d');
            $maturity_month = (clone $maturity_month_obj)->modify('+1 month')->format('Y-m-01');
            $maturity_month = $maturity_month . ' ' . $startTime;
            $last_date = $maturity_month_last_date . ' ' . $endTime;
            //Query for Monthly.
            $run = $pdo->query("SELECT c.coll_code, c.due_amt,c.tot_amt, c.pending_amt, c.payable_amt, c.coll_date, c.trans_date, c.due_amt_track,c.princ_amt_track,c.int_amt_track, c.bal_amt, c.coll_charge_track, c.pre_close_waiver, lelc.due_startdate, lelc.maturity_date, lelc.due_method, u.name, r.role
            FROM `collection` c
            LEFT JOIN loan_entry_loan_calculation lelc ON c.cus_profile_id = lelc.cus_profile_id
            LEFT JOIN users u ON c.insert_login_id = u.id
            LEFT JOIN role r ON u.role = r.id
            WHERE c.`cus_profile_id` = '$cp_id' AND (c.due_amt_track != '' or c.pre_close_waiver!='')
            AND 
            (
                (c.coll_date BETWEEN '$maturity_month' AND '$currentMonth') OR (c.trans_date BETWEEN '$maturity_month' AND '$currentMonth' AND c.trans_date != '0000-00-00')
            ) 
            AND 
            (
                (c.trans_date > '$last_date' AND c.trans_date != '0000-00-00 00:00:00')
                OR 
                (c.coll_date > '$last_date' AND c.coll_date != '0000-00-00 00:00:00')
            ) 
            AND NOT (
                (c.coll_date BETWEEN '$start_date' AND '$last_date') 
                OR 
                (c.trans_date BETWEEN '$start_date' AND '$last_date')
            )");
        } else
        if ($loanFrom['scheme_due_method'] == '2') {
            //Query For Weekly.
            $maturity_month_last_date = (clone $maturity_month_obj)->modify('last day of this week')->format('Y-m-d');
            $maturity_month = (clone $maturity_month_obj)->modify('+1 week')->format('Y-m-d');
            $maturity_month = $maturity_month . ' ' . $startTime;
            $last_date = $maturity_month_last_date . ' ' . $endTime;
            $run = $pdo->query("SELECT c.coll_code, c.due_amt, c.pending_amt, c.payable_amt, c.coll_date, c.trans_date, c.due_amt_track, c.bal_amt, c.coll_charge_track, c.pre_close_waiver, lelc.due_startdate, lelc.maturity_date, lelc.due_method, u.name, r.role
            FROM `collection` c
            LEFT JOIN loan_entry_loan_calculation lelc ON c.cus_profile_id = lelc.cus_profile_id
            LEFT JOIN users u ON c.insert_login_id = u.id
            LEFT JOIN role r ON u.role = r.id
            WHERE c.`cus_profile_id` = '$cp_id' AND (c.due_amt_track != '' or c.pre_close_waiver!='')
           AND 
                (
                    (c.coll_date BETWEEN '$maturity_month' AND '$currentMonth')
                    OR 
                    (c.trans_date BETWEEN '$maturity_month' AND '$currentMonth' AND c.trans_date != '0000-00-00')
                ) 
            AND 
                (
                    (c.trans_date > '$last_date' AND c.trans_date != '0000-00-00 00:00:00')
                    OR 
                    (c.coll_date >= '$maturity_month' AND c.coll_date != '0000-00-00 00:00:00')
                ) 
            AND NOT 
                (
                    c.coll_date >= '$start_date' AND c.coll_date < '$maturity_month'
                    OR 
                    c.trans_date >= '$start_date' AND c.trans_date < '$maturity_month'
                ) ");
        } else
        if ($loanFrom['scheme_due_method'] == '3') {
            //Query For Day.

            $maturity_month_last_date = (clone $maturity_month_obj)->format('Y-m-d');
            $maturity_month = (clone $maturity_month_obj)->modify('+1 day')->format('Y-m-d');
            $maturity_month = $maturity_month . ' ' . $startTime;
            $last_date = $maturity_month_last_date . ' ' . $endTime;
            $run = $pdo->query("SELECT c.coll_code, c.due_amt, c.pending_amt, c.payable_amt, c.coll_date, c.trans_date, c.due_amt_track, c.bal_amt, c.coll_charge_track, c.pre_close_waiver, lelc.due_startdate, lelc.maturity_date, lelc.due_method, u.name, r.role
            FROM `collection` c
            LEFT JOIN loan_entry_loan_calculation lelc ON c.cus_profile_id = lelc.cus_profile_id
            LEFT JOIN users u ON c.insert_login_id = u.id
            LEFT JOIN role r ON u.role = r.id
            WHERE c.`cus_profile_id` = '$cp_id' AND (c.due_amt_track != '' or c.pre_close_waiver!='')
            AND 
                (
                    (c.coll_date BETWEEN '$maturity_month' AND '$currentMonth') 
                    OR
                    (c.trans_date BETWEEN '$maturity_month' AND '$currentMonth' AND c.trans_date != '0000-00-00')
                ) 
            AND 
                (
                    (c.trans_date > '$last_date' AND c.trans_date != '0000-00-00 00:00:00')
                    OR 
                    (c.coll_date > '$last_date' AND c.coll_date != '0000-00-00 00:00:00')
                ) 
            AND NOT 
                (
                    (c.coll_date BETWEEN '$start_date' AND '$last_date') 
                    OR 
                    (c.trans_date BETWEEN '$start_date' AND '$last_date')
                )  ");
        }

        if ($run->rowCount() > 0) {
            $due_amt_track = 0;
            $waiver = 0;
            while ($row = $run->fetch()) {
                $collectionAmnt = intVal($row['due_amt_track']);
                $due_amt_track = intVal($row['due_amt_track']);
                $waiver = intVal($row['pre_close_waiver']);
                $bal_amt = $row['bal_amt'] - $due_amt_track - $waiver;
            ?>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>

                    <?php if ($loan_type == 'emi') { ?>
                        <td></td>
                    <?php } ?>
                    <?php if ($loan_type == 'interest') { ?>
                        <td></td>
                        <td></td>
                    <?php } ?>

                    <td><?php $pendingMinusCollection = (intVal($row['pending_amt']));
                        if ($pendingMinusCollection != '') {
                            echo moneyFormatIndia($pendingMinusCollection);
                        } else {
                            echo 0;
                        } ?></td>
                    <td><?php $payableMinusCollection = (intVal($row['payable_amt']));
                        if ($payableMinusCollection != '') {
                            echo moneyFormatIndia($payableMinusCollection);
                        }
                        ?></td>
                    <td><?php echo date('d-m-Y', strtotime($row['coll_date'])); ?></td>

                    <?php if ($loan_type == 'emi') { ?>
                        <td>
                            <?php if ($row['due_amt_track'] > 0) {
                                echo moneyFormatIndia($row['due_amt_track']);
                            } elseif ($row['pre_close_waiver'] > 0) {
                                echo moneyFormatIndia($row['pre_close_waiver']);
                            } ?>
                        </td>
                    <?php } ?>

                    <?php if ($loan_type == 'interest') { ?>
                        <td>
                            <?php if ($PcollectionAmnt > 0) {
                                echo $PcollectionAmnt;
                            } elseif ($row['pre_close_waiver'] > 0) {
                                echo $row['pre_close_waiver'];
                            } ?>
                        </td>
                        <td>
                            <?php if ($IcollectionAmnt > 0) {
                                echo moneyFormatIndia($IcollectionAmnt);
                            } ?>
                        </td>
                    <?php } ?>

                    <td><?php echo moneyFormatIndia($bal_amt); ?></td>
                    <td><?php if ($row['pre_close_waiver'] > 0) {
                            echo moneyFormatIndia($row['pre_close_waiver']);
                        } else {
                            echo '0';
                        } ?></td>
                    <td><?php echo $row['role']; ?></td>
                    <td><?php echo $row['name']; ?></td>
                    <!-- <td><?php #if ($row['coll_location'] == '1') {echo 'By Self';} elseif ($row['coll_location'] == '2') {echo 'On Spot';} elseif ($row['coll_location'] == '3') {echo 'Bank Transfer';} 
                                ?></td> -->
                    <td> <a class='print_due_coll' id="" value="<?php echo $row['coll_code']; ?>"> <i class="fa fa-print" aria-hidden="true"></i> </a> </td>
                </tr>

        <?php
                $i++;
            }
        }
        ?>

    </tbody>
</table>

<?php
/* ============================================================================
 * OPTIMIZED DATA / CALCULATION FUNCTIONS
 * ========================================================================== */

function loadDueChartCollections(PDO $pdo, $cp_id)
{
    $sql = "SELECT
                c.coll_code,
                c.due_amt,
                c.tot_amt,
                c.pending_amt,
                c.payable_amt,
                c.coll_date,
                c.trans_date,
                c.due_amt_track,
                c.princ_amt_track,
                c.int_amt_track,
                c.bal_amt,
                c.coll_charge_track,
                c.coll_charge_waiver,
                c.pre_close_waiver,
                c.penalty_track,
                c.penalty_waiver,
                c.insert_login_id,
                u.name,
                r.role
            FROM collection c
            LEFT JOIN users u ON u.id = c.insert_login_id
            LEFT JOIN role r ON r.id = u.role
            WHERE c.cus_profile_id = ?
            ORDER BY COALESCE(NULLIF(c.trans_date, '0000-00-00'), c.coll_date), c.id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$cp_id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function buildCollectionGroups(array $rows)
{
    $groups = [
        'date' => [],
        'month' => [],
        'week' => [],
    ];

    foreach ($rows as $row) {
        $date = effectiveCollectionDate($row);
        if (!$date) {
            continue;
        }

        $month = substr($date, 0, 7);
        $weekStart = date('Y-m-d', strtotime('monday this week', strtotime($date)));

        $groups['date'][$date][] = $row;
        $groups['month'][$month][] = $row;
        $groups['week'][$weekStart][] = $row;
    }

    return $groups;
}

function effectiveCollectionDate(array $row)
{
    if (!empty($row['trans_date']) && $row['trans_date'] !== '0000-00-00' && $row['trans_date'] !== '0000-00-00 00:00:00') {
        return substr($row['trans_date'], 0, 10);
    }

    if (!empty($row['coll_date']) && $row['coll_date'] !== '0000-00-00' && $row['coll_date'] !== '0000-00-00 00:00:00') {
        return substr($row['coll_date'], 0, 10);
    }

    return null;
}

function getPeriodCollections(array $groups, $dueDate, $schemeDueMethod, $dueMethod)
{
    $isMonthly = ($dueMethod === 'Monthly' || $schemeDueMethod === '1');

    if ($isMonthly) {
        return $groups['month'][substr($dueDate, 0, 7)] ?? [];
    }

    if ($schemeDueMethod === '2') {
        // Preserve the application's due-week convention: due date through +6 days.
        $rows = [];
        $start = $dueDate;
        $end = date('Y-m-d', strtotime($dueDate . ' +6 days'));

        foreach ($groups['date'] as $date => $dateRows) {
            if ($date >= $start && $date <= $end) {
                foreach ($dateRows as $row) {
                    $rows[] = $row;
                }
            }
        }
        return $rows;
    }

    return $groups['date'][$dueDate] ?? [];
}

function buildPenaltyData(PDO $pdo, $cp_id, array $loan_arr, array $collectionRows)
{
    // Penalty rate is configuration data; query it exactly once.
    if (empty($loan_arr['scheme_name'])) {
        $stmt = $pdo->prepare("SELECT overdue_penalty FROM loan_category_creation WHERE id = ? LIMIT 1");
        $stmt->execute([$loan_arr['loan_category']]);
    } else {
        $stmt = $pdo->prepare("SELECT overdue_penalty_percent FROM scheme WHERE id = ? LIMIT 1");
        $stmt->execute([$loan_arr['scheme_name']]);
    }

    $penaltyRate = (float)($stmt->fetchColumn() ?: 0);

    $penaltyDates = [];
    $penaltyTotal = 0.0;

    $stmt = $pdo->prepare("SELECT penalty_date, penalty FROM penalty_charges WHERE cus_profile_id = ?");
    $stmt->execute([$cp_id]);
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if (!empty($row['penalty_date'])) {
            $penaltyDates[substr($row['penalty_date'], 0, 10)] = true;
        }
        $penaltyTotal += (float)($row['penalty'] ?? 0);
    }

    $penaltyTrack = 0.0;
    $penaltyWaiver = 0.0;

    foreach ($collectionRows as $row) {
        $penaltyTrack += (float)($row['penalty_track'] ?? 0);
        $penaltyWaiver += (float)($row['penalty_waiver'] ?? 0);
    }

    return [
        'rate' => $penaltyRate,
        'dates' => $penaltyDates,
        'raised_total' => $penaltyTotal,
        'track_total' => $penaltyTrack,
        'waiver_total' => $penaltyWaiver,
    ];
}

function buildCollectionSummary(array $rows)
{
    $summary = [
        'due_track' => 0.0,
        'principal_track' => 0.0,
        'interest_track' => 0.0,
        'pre_close_waiver' => 0.0,
        'coll_charge_track' => 0.0,
        'coll_charge_waiver' => 0.0,
    ];

    foreach ($rows as $row) {
        $summary['due_track'] += (float)($row['due_amt_track'] ?? 0);
        $summary['principal_track'] += (float)($row['princ_amt_track'] ?? 0);
        $summary['interest_track'] += (float)($row['int_amt_track'] ?? 0);
        $summary['pre_close_waiver'] += (float)($row['pre_close_waiver'] ?? 0);
        $summary['coll_charge_track'] += (float)($row['coll_charge_track'] ?? 0);
        $summary['coll_charge_waiver'] += (float)($row['coll_charge_waiver'] ?? 0);
    }

    return $summary;
}

function getNextLoanDetailsOptimized(
    array $loan_arr,
    array $collectionRows,
    array $collectionGroups,
    array $penaltyData,
    array $collectionSummary,
    $date,
    $calculationDate
) {
    $response = [];

    if (empty($loan_arr)) {
        return [
            'pending' => 0,
            'payable' => 0,
            'penalty' => 0,
            'till_date_int' => 0,
            'coll_charge' => 0,
        ];
    }

    $isInterest = ($loan_arr['loan_type'] === 'interest');
    $response['loan_type'] = $loan_arr['loan_type'];
    $response['total_amt'] = $isInterest ? (float)$loan_arr['principal_amnt'] : (float)$loan_arr['total_amnt'];
    $response['due_amt'] = !empty($loan_arr['due_amnt']) ? (float)$loan_arr['due_amnt'] : (float)$loan_arr['interest_amnt'];

    if (!empty($collectionRows)) {
        $response['total_paid'] = $isInterest
            ? $collectionSummary['principal_track']
            : $collectionSummary['due_track'];
        $response['total_paid_int'] = $collectionSummary['interest_track'];
        $response['pre_closure'] = $collectionSummary['pre_close_waiver'];
    } else {
        $response['total_paid'] = 0;
        $response['total_paid_int'] = 0;
        $response['pre_closure'] = 0;
    }

    $response['balance'] = $response['total_amt'] - $response['total_paid'] - $response['pre_closure'];

    if ($isInterest) {
        $response['due_amt'] = calculateNewInterestAmt($loan_arr, $response);
    }

    $response = calculateOthersOptimized(
        $loan_arr,
        $response,
        $date,
        $collectionRows,
        $collectionGroups,
        $penaltyData,
        $calculationDate
    );

    return $response;
}

function calculateOthersOptimized(
    array $loan_arr,
    array $response,
    $date,
    array $collectionRows,
    array $collectionGroups,
    array $penaltyData,
    $calculationDate
) {
    $dueStart = $loan_arr['due_startdate'];
    $maturity = $loan_arr['maturity_date'];
    $isInterest = ($loan_arr['loan_type'] === 'interest');
    $schemeMethod = $loan_arr['scheme_due_method'];
    $dueMethod = $loan_arr['due_method'];

    $isMonthly = ($dueMethod === 'Monthly' || $schemeMethod === '1');

    $dateKey = $isMonthly ? date('Y-m', strtotime($date)) : date('Y-m-d', strtotime($date));
    $startKey = $isMonthly ? date('Y-m', strtotime($dueStart)) : date('Y-m-d', strtotime($dueStart));
    $endKey = $isMonthly ? date('Y-m', strtotime($maturity)) : date('Y-m-d', strtotime($maturity));

    $todayKey = $isMonthly
        ? date('Y-m', strtotime($calculationDate ?: date('Y-m-d')))
        : date('Y-m-d', strtotime($calculationDate ?: date('Y-m-d')));

    $count = 0;
    $countForPenalty = 0;

    // Count elapsed due periods using date arithmetic. No SQL is executed here.
    $cursor = $startKey;
    while ($cursor < $endKey && $cursor < $dateKey) {
        $count++;
        if ($isMonthly) {
            $cursor = date('Y-m', strtotime($cursor . '-01 +1 month'));
        } elseif ($schemeMethod === '2') {
            $cursor = date('Y-m-d', strtotime($cursor . ' +7 days'));
        } else {
            $cursor = date('Y-m-d', strtotime($cursor . ' +1 day'));
        }
    }

    // Original logic counts an elapsed period against unpaid due amount.
    $dueCharge = !empty($loan_arr['due_amnt'])
        ? (float)$loan_arr['due_amnt']
        : (float)$loan_arr['interest_amnt'];

    if ($count > 0) {
        $toPayTillDate = $count * $dueCharge;
        $paidTillDate = getPaidTillDate($collectionRows, $date, $schemeMethod, $dueMethod);

        // Determine which elapsed periods had no collection.
        $periodCursor = $startKey;
        while ($periodCursor < $endKey && $periodCursor < $dateKey) {
            $periodRows = getPeriodCollections($collectionGroups, $periodCursor, $schemeMethod, $dueMethod);
            $periodPaid = !empty($periodRows);

            if ($paidTillDate < $toPayTillDate && !$periodPaid) {
                $checkDate = $isMonthly ? $periodCursor . '-01' : $periodCursor;
                if (!isset($penaltyData['dates'][$checkDate])) {
                    // For interest loans, the first elapsed period is not penalized.
                    if (!$isInterest || $count != 1) {
                        $countForPenalty++;
                    }
                }
            }

            if ($isMonthly) {
                $periodCursor = date('Y-m', strtotime($periodCursor . '-01 +1 month'));
            } elseif ($schemeMethod === '2') {
                $periodCursor = date('Y-m-d', strtotime($periodCursor . ' +7 days'));
            } else {
                $periodCursor = date('Y-m-d', strtotime($periodCursor . ' +1 day'));
            }
        }
    }

    $paidTillDate = getPaidTillDate($collectionRows, $date, $schemeMethod, $dueMethod);
    $precloseTillDate = getPrecloseTillDate($collectionRows, $date, $schemeMethod, $dueMethod);

    if ($count > 0) {
        if ($isInterest) {
            $firstMonthInterest = getTillDateInterestOptimized($loan_arr, $response, 'fullstartmonth', $date);
            $response['pending'] = (($response['due_amt'] * $count) - $response['due_amt'] + $firstMonthInterest) - $response['total_paid_int'];
        } else {
            $response['pending'] = ($response['due_amt'] * $count) - $paidTillDate - $precloseTillDate;
        }

        $response['penalty'] = ($penaltyData['raised_total'] - $penaltyData['track_total'] - $penaltyData['waiver_total']);
        $response['payable'] = $response['due_amt'] + $response['pending'];

        if ($isInterest) {
            if ($count == 1) {
                $response['payable'] = $response['pending'];
                $response['pending'] = 0;
            } else {
                $response['payable'] = $response['pending'];
                $response['pending'] -= $response['due_amt'];
            }
        }

        $response['till_date_int'] = getTillDateInterestOptimized($loan_arr, $response, 'from01', $date);
    } else {
        $response['pending'] = 0;
        $response['penalty'] = 0;
        $response['payable'] = $response['due_amt'] - $paidTillDate - $precloseTillDate;

        if ($isInterest) {
            $response['payable'] = 0;
        }

        $response['till_date_int'] = getTillDateInterestOptimized($loan_arr, $response, 'forstartmonth', $date);
    }

    if ($response['pending'] < 0) $response['pending'] = 0;
    if ($response['payable'] < 0) $response['payable'] = 0;

    return $response;
}

function getPaidTillDate(array $rows, $date, $schemeMethod, $dueMethod)
{
    $cutoff = substr($date, 0, 10);
    $sum = 0.0;

    foreach ($rows as $row) {
        $effective = effectiveCollectionDate($row);
        if ($effective && $effective <= $cutoff) {
            $sum += (float)($row['due_amt_track'] ?? 0);
        }
    }

    return $sum;
}

function getPrecloseTillDate(array $rows, $date, $schemeMethod, $dueMethod)
{
    $cutoff = substr($date, 0, 10);
    $sum = 0.0;

    foreach ($rows as $row) {
        $effective = effectiveCollectionDate($row);
        if ($effective && $effective <= $cutoff) {
            $sum += (float)($row['pre_close_waiver'] ?? 0);
        }
    }

    return $sum;
}

function calculateNewInterestAmt($loan_arr, $response)
{
    $int = (float)$response['balance'] * ((float)$loan_arr['interest_rate'] / 100);
    return ceil($int / 5) * 5;
}

function getTillDateInterestOptimized($loan_arr, $response, $data, $date)
{
    if (($loan_arr['loan_type'] ?? '') !== 'interest') {
        return 0;
    }

    if ($data === 'from01') {
        $currentMonthCount = (int)date('t', strtotime($date));
        $amtPerDay = (float)$response['due_amt'] / max(1, $currentMonthCount);
        $start = new DateTime(date('Y-m-01', strtotime($date)));
        $target = new DateTime(date('Y-m-d', strtotime($date . ' +1 day')));
        $days = $start->diff($target)->days;
        return ceil(($amtPerDay * $days) / 5) * 5;
    }

    if ($data === 'forstartmonth') {
        $start = new DateTime(date('Y-m-d', strtotime($loan_arr['due_startdate'])));
        $target = new DateTime(date('Y-m-d', strtotime($date . ' +1 day')));
        if ($target < $start) return 0;

        $daysInStartMonth = (int)date('t', strtotime($loan_arr['due_startdate']));
        $amtPerDay = (float)$response['due_amt'] / max(1, $daysInStartMonth);
        return ceil(($amtPerDay * $start->diff($target)->days) / 5) * 5;
    }

    if ($data === 'fullstartmonth') {
        $start = new DateTime(date('Y-m-d', strtotime($loan_arr['due_startdate'])));
        $monthEnd = new DateTime(date('Y-m-t', strtotime($loan_arr['due_startdate'])));
        $daysInStartMonth = (int)date('t', strtotime($loan_arr['due_startdate']));
        $amtPerDay = (float)$response['due_amt'] / max(1, $daysInStartMonth);
        return ceil($amtPerDay * $start->diff($monthEnd)->days);
    }

    return 0;
}

// Backward-compatible wrapper if another part of the page calls this function.
function getTillDateInterest($loan_arr, $response, $pdo, $data, $date)
{
    return getTillDateInterestOptimized($loan_arr, $response, $data, $date);
}

?>