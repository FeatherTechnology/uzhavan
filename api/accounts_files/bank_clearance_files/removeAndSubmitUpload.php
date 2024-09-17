<?php
include("../../../ajaxconfig.php");
@session_start();
$user_id = $_SESSION["user_id"];

$bank_id = $_POST['bank_id']; // bank id selected in upload modal

require_once('../../../vendor/csvreader/php-excel-reader/excel_reader2.php');
require_once('../../../vendor/csvreader/SpreadsheetReader.php');
if (isset($_FILES["file"]["type"])) {
    $allowedFileType = ['application/vnd.ms-excel', 'text/xls', 'text/xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (in_array($_FILES["file"]["type"], $allowedFileType)) {


        $targetPath = '../../../uploads/bank_stmt/' . $_FILES['file']['name'];
        move_uploaded_file($_FILES['file']['tmp_name'], $targetPath);

        $Reader = new SpreadsheetReader($targetPath);
        $sheetCount = count($Reader->sheets());

        for ($i = 0; $i < $sheetCount; $i++) {
            $Reader->ChangeSheet($i);
            foreach ($Reader as $Row) {
                if ($Row[0] != "Date") {
                    $trans_date = "";
                    if (isset($Row[0])) {
                        $excel_date = $Row[0];
                        $date = date_create_from_format('!d/m/y', $excel_date);
                        if ($date === false) {
                            $date = date_create_from_format('!m/d/y', $excel_date);
                        }
                        if ($date === false) {
                            $date = date_create_from_format('!m-d-y', $excel_date);
                        }
                        if ($date !== false) {
                            $trans_date = $date->format('Y-m-d');
                        }
                    }

                    $narration = "";
                    if (isset($Row[1])) {
                        $narration = $Row[1];
                    }

                    $trans_id = "";
                    if (isset($Row[2])) {
                        $trans_id = $Row[2];
                    }

                    $credit = "";
                    if (isset($Row[3])) {
                        $credit = $Row[3];
                    }

                    $debit = "";
                    if (isset($Row[4])) {
                        $debit = $Row[4];
                    }

                    $balance = "";
                    if (isset($Row[5])) {
                        $balance = $Row[5];
                    }


                    if ($i == 0 && $trans_date != "" && $trans_id != "") {
                        //insert row of new transactions
                        $insert = $pdo->query("INSERT INTO `bank_clearance`(`bank_id`, `trans_date`, `narration`,`trans_id`, `credit`, `debit`, `balance`, `insert_login_id`, `created_date`) VALUES ('$bank_id','$trans_date','$narration','$trans_id','$credit','$debit','$balance','$user_id',now() )");
                        $rowaff = $insert->rowCount(); // to get affected rows of insert query
                        $last_id = $pdo->lastInsertId(); // to get last inserted id of insert query

                        $qry = $pdo->query("SELECT trans_date from bank_clearance where bank_id = '$bank_id' and trans_date = '$trans_date' and insert_login_id = '$user_id' and id != '$last_id' ");
                        //checking whether the date is already inserted by this user and excluding the data which is inserted now thru excel file

                        if ($qry->rowCount() > 0) { //delete row if transaction date is already exist
                            $qry1 = $pdo->query("DELETE From bank_clearance where bank_id = '$bank_id' and trans_date = '$trans_date' and created_date < now() and insert_login_id = '$user_id' and id != '$last_id' ");
                            // used less than created date because, have to delete only previous entires and omitting last inserted id to avoid conflicts
                        }
                    }
                }
            }
        }

        if ($rowaff > 0) {
            $message = 0; // if successfully inserted
        } else {
            $message = 1; // if insert query not working
        }
    }
} else {
    $message = 2; //if file is not sent
}

echo $message;
