<?php
require '../../ajaxconfig.php';

$cus_id = $_POST['cus_id'];

$feedback_list_arr = array();
$feedback_arr = [1=>'Bad',2=>'Poor',3=>'Average',4=>'Good',5=>'Excellent'];
$i=0;
$qry = $pdo->query("SELECT id,feedback_label,feedback, cus_remark FROM cus_feedback WHERE cus_id = '$cus_id' ");

if ($qry->rowCount() > 0) {
    while ($row = $qry->fetch(PDO::FETCH_ASSOC)) {
          $row['feedback_text'] = $feedback_arr[$row['feedback']] ?? '';

    $row['action'] = "<span class='icon-border_color feedbackActionBtn' value='" . $row['id'] . "'></span>&nbsp;&nbsp;&nbsp;<span class='icon-delete feedbackDeleteBtn' value='" . $row['id'] . "'></span>";

        $feedback_list_arr[$i] = $row; // Append to the array
        $i++;
    }
}

echo json_encode($feedback_list_arr);
$pdo = null; // Close Connection
?>