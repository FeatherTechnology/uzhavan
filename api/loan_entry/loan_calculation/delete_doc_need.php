<?php
require "../../../ajaxconfig.php";

$id = $_POST['id'];
$qry = $pdo->query("DELETE FROM `document_need` WHERE id = '$id' ");
if($qry){
    $result = 0; // Deleted.
}else{
    $result = 1; // Failed.
}
echo json_encode($result);