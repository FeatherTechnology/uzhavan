<?php
require '../../ajaxconfig.php';
$coll_id = $_POST["coll_id"];

$qry = $pdo->query("SELECT cus_profile_id ,cus_id,coll_code,cus_name,payable_amt,coll_date,due_amt_track,penalty_track,coll_charge_track,insert_login_id FROM `collection` WHERE coll_code='" . strip_tags($coll_id) . "'");
$row = $qry->fetch();

extract($row); // Extracts the array values into variables

$qry = $pdo->query("SELECT lelc.loan_id, lc.loan_category, lnc.linename
FROM customer_profile cp 
LEFT JOIN loan_entry_loan_calculation lelc ON cp.id = lelc.cus_profile_id
LEFT JOIN loan_category_creation lcc ON lelc.loan_category = lcc.id
LEFT JOIN loan_category lc ON lcc.loan_category = lc.id
LEFT JOIN line_name_creation lnc ON cp.line = lnc.id
WHERE cp.id = '$cus_profile_id'");
$row = $qry->fetch();
$line_name = $row['linename'];
$loan_category = $row['loan_category'];
$loan_id = $row['loan_id'];

$due_amt_track = intVal($due_amt_track != '' ? $due_amt_track : 0);
$penalty_track = intVal($penalty_track != '' ? $penalty_track : 0);
$coll_charge_track = intVal($coll_charge_track != '' ? $coll_charge_track : 0);
$net_received = $due_amt_track + $penalty_track + $coll_charge_track;
$due_balance = ($payable_amt - $due_amt_track) < 0 ? 0 : $payable_amt - $due_amt_track;
$loan_balance = getBalance($pdo, $cus_profile_id, $coll_date);
$qry = $pdo->query("SELECT name from `users` where `id` = $insert_login_id ");
$user_name = $qry->fetch()['name'];
?>
<style>
    @media print {
        * {
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box;
        }
        @page {
            margin: 0; /* Remove default print margin */
        }
        body {
            margin: 0;
            padding: 0;
        }
        #dettable {
            margin: 0;
            padding: 0;
            width: 58mm; /* Width of thermal printer roll */
            font-size: 8px;
            line-height: 1.2;
            text-align: left;
        }
        .overlap-group {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        .captions, .data {
            width: 50%;
            word-wrap: break-word;
            text-align: left;
        }
        .mar-logo {
            width: 100px;
            margin: 0 auto; /* Center align logo */
            display: block;
        }
    }
</style>

        <div class="frame" id="dettable" style="background-color: #ffffff; font-size: 8px; display: flex;flex-direction: column; align-items: flex-start;">

            <div style="display: flex; justify-content: center;padding-bottom:8px;">
                <!-- <img class="mar-logo" src="img/uzhavan_logo.jpeg" style="width:150px;height:auto;"> -->
                <img class="mar-logo" alt="Uzhavan Finance" src="img/uzhavan_logo.jpeg" style="width: 260px; height: auto;" />
            </div>

        <div class="overlap-group" style="display: flex; justify-content: center; gap: 10px;">

        <div class="captions" style="display: flex; flex-direction: column; align-items: flex-end;">

            <b><div>Receipt No :</div></b>
            <div>Date / Time :</div>
            <div>Line / Area :</div>
            <div>Customer ID :</div>

            <b><div>Customer Name :</div></b>

            <div>Loan Category :</div>
            <div>Loan No :</div>
            <div>Due Receipt :</div>
            <div>Penalty :</div>
            <div>Fine :</div>

            <br>

            <b><div>Net Received :</div></b>

            <br>

            <div>Due Balance :</div>
            <div>Loan Balance :</div>
            <div>User Name :</div>

        </div>

        <div class="data" style="display: flex; flex-direction: column; align-items: flex-start;">

            <b><div><?php echo $coll_code; ?></div></b>

            <div><?php echo date('d-m-Y h:i:s A', strtotime($coll_date)); ?></div>

            <div><?php echo $line_name; ?></div>

            <div><?php echo $cus_id; ?></div>

            <b><div><?php echo $cus_name; ?></div></b>

            <div><?php echo $loan_category; ?></div>

            <div><?php echo $loan_id; ?></div>

            <div><?php echo moneyFormatIndia($due_amt_track); ?></div>

            <div><?php echo moneyFormatIndia($penalty_track); ?></div>

            <div><?php echo moneyFormatIndia($coll_charge_track); ?></div>

            <br>

            <b><div><?php echo moneyFormatIndia($net_received); ?></div></b>

            <br>

            <div><?php echo moneyFormatIndia($due_balance); ?></div>

            <div><?php echo moneyFormatIndia($loan_balance); ?></div>

            <div><?php echo $user_name; ?></div>

        </div>

    </div>

</div>


<button type="button" name="printpurchase" onclick="poprint()" id="printpurchase" class="btn btn-primary">Print</button>

<script type="text/javascript">
    function poprint() {
        var Bill = document.getElementById("dettable").innerHTML;
        var printWindow = window.open('', '', 'height=1000;weight=1000;');
        printWindow.document.write('<html><head></head><body>');
        printWindow.document.write(Bill);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    }
    setTimeout(() => {
        document.getElementById("printpurchase").click();

    }, 1500);
</script>

<?php
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

function getBalance($pdo, $cus_profile_id, $coll_date)
{
    $result = $pdo->query("SELECT * FROM `loan_entry_loan_calculation` WHERE cus_profile_id = $cus_profile_id ");
    if ($result->rowCount() > 0) {
        $row = $result->fetch();
        $loan_arr = $row;

        if ($loan_arr['total_amnt'] == '' || $loan_arr['total_amnt'] == null) {
            //(For monthly interest total amount will not be there, so take principals)
            $response['total_amt'] = intVal($loan_arr['principal_amnt']);
            $response['loan_type'] = 'interest';
            $loan_arr['loan_type'] = 'interest';
        } else {
            $response['total_amt'] = intVal($loan_arr['total_amnt']);
            $response['loan_type'] = 'emi';
            $loan_arr['loan_type'] = 'emi';
        }
    }
    $coll_arr = array();
    $result = $pdo->query("SELECT * FROM `collection` WHERE cus_profile_id ='" . $cus_profile_id . "' and date(coll_date) <= date('" . $coll_date . "') ");
    if ($result->rowCount() > 0) {
        while ($row = $result->fetch()) {
            $coll_arr[] = $row;
        }
        $total_paid = 0;
        $total_paid_princ = 0;
        $total_paid_int = 0;
        $pre_closure = 0;
        foreach ($coll_arr as $tot) {
            $total_paid += intVal($tot['due_amt_track']); //only calculate due amount not total paid value, because it will have penalty and coll charge also
            $total_paid_princ += intVal($tot['princ_amt_track']);
            $total_paid_int += intVal($tot['int_amt_track']);
            $pre_closure += intVal($tot['pre_close_waiver']); //get pre closure value to subract to get balance amount
        }
        //total paid amount will be all records again request id should be summed
        $response['total_paid'] = ($loan_arr['loan_type'] == 'emi') ? $total_paid : $total_paid_princ;
        $response['total_paid_int'] = $total_paid_int;
        $response['balance'] = $response['total_amt'] - $response['total_paid'] - $pre_closure;
    } else {
        $response['balance'] = $response['total_amt'];
    }
    return $response['balance'];
}
?>