<?php
require '../../ajaxconfig.php';

$info_info_arr = array();

$qry = $pdo->query("SELECT * FROM cus_feedback_name WHERE 1 ");
if ($qry->rowCount() > 0) {
    while ($feedback_info = $qry->fetch(PDO::FETCH_ASSOC)) {
       
        $feedback_info['action'] = "<span class='icon-border_color feedbackEditBtn' value='" . $feedback_info['id'] . "'></span> 
                                <span class='icon-trash-2 feedbackNameDeleteBtn' value='" . $feedback_info['id'] . "'></span>";
        $info_info_arr[] = $feedback_info;
    }
}

$pdo = null; // Close connection
echo json_encode($info_info_arr);

