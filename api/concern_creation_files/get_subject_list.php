<?php
require "../../ajaxconfig.php";

$sub_arr = array();
$qry = $pdo->query("SELECT con_sub_id,concern_subject FROM concern_subject where status = 0");
if ($qry->rowCount() > 0) {
    while ($sub_info = $qry->fetch(PDO::FETCH_ASSOC)) {
        // $sub_info['action'] = "<span class='icon-border_color subjectActionBtn' value='" . $sub_info['con_sub_id'] . "'></span>  <span class='icon-trash-2 subjectDeleteBtn' value='" . $sub_info['con_sub_id'] . "'></span>";
        $sub_arr[] = $sub_info;
    }
}

$pdo = null; //Connection Close.

echo json_encode($sub_arr);
