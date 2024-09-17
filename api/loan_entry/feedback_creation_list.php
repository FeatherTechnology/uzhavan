<?php
require '../../ajaxconfig.php';

$property_list_arr = array();
$cus_id = $_POST['cus_id'];
$i = 0;
$feedback_arr=[1=>'Bad',2=>'Poor',3=>'Average',4=>'Good',5=>'Excellent'];
$qry = $pdo->query("SELECT id, feed_label, feedback, remark FROM feedback_info 
 WHERE cus_id = '$cus_id'");

if ($qry->rowCount() > 0) {
    while ($row = $qry->fetch(PDO::FETCH_ASSOC)) {
        $row['feedback'] = $feedback_arr[$row['feedback']];
        $row['action'] = "<span class='icon-border_color feedbackActionBtn' value='" . $row['id'] . "'></span>&nbsp;&nbsp;&nbsp;<span class='icon-delete feedbackDeleteBtn' value='" . $row['id'] . "'></span>";

        $property_list_arr[$i] = $row; // Append to the array
        $i++;
    }
}

echo json_encode($property_list_arr);
$pdo = null; // Close Connection