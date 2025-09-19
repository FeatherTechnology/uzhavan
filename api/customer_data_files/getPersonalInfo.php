<?php

include('../../ajaxconfig.php');

$cus_id = $_POST['cus_id'];

$sql = '';

$query1 = $pdo->query("SELECT cp.id, cp.cus_id, cp.cus_name, cp.aadhar_num,anc.areaname, lnc.linename, bc.branch_name , cp.mobile1,cp.pic
 FROM customer_profile cp 
LEFT JOIN line_name_creation lnc ON cp.line = lnc.id
LEFT JOIN area_name_creation anc ON cp.area = anc.id
LEFT JOIN area_creation ac ON cp.line = ac.line_id
LEFT JOIN branch_creation bc ON ac.branch_id = bc.id
WHERE cp.cus_id = '$cus_id'  ORDER BY cp.id DESC LIMIT 1");


if ($query1->rowCount() > 0) {
    $sql = $query1;
} 
$row = $sql->fetch();
?>
<div class="col-xl-8 col-lg-10 col-md-12 col-sm-12">
    <div class="row">
        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
            <label for="info_cus_id">Customer ID</label>
            <input type="text" name="info_cus_id" id="info_cus_id" class='form-control' tabindex="1" readonly value="<?php echo $row['cus_id']; ?>">
        </div>
        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
            <label for="info_cus_name">Customer Name</label>
            <input type="text" name="info_cus_name" id="info_cus_name" class='form-control' tabindex="2" readonly value="<?php echo $row['cus_name']; ?>">
        </div>
        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
            <label for="info_cus_mob">Mobile Number</label>
            <input type="number" name="info_cus_mob" id="info_cus_mob" class='form-control' tabindex="3" readonly value="<?php echo $row['mobile1']; ?>">
        </div>
        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
            <label for="info_area">Area</label>
            <input type="text" name="info_area" id="info_area" class='form-control' tabindex="4" readonly value="<?php echo $row['areaname']; ?>">
        </div>
        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
            <label for="info_line">Line</label>
            <input type="text" name="info_line" id="info_line" class='form-control' tabindex="4" readonly value="<?php echo $row['linename']; ?>">
        </div>
        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
            <label for="info_branch">Branch</label>
            <input type="text" name="info_branch" id="info_branch" class='form-control' tabindex="5" readonly value="<?php echo $row['branch_name']; ?>">
        </div>
    </div>
</div>
<div class="col-xl-4 col-lg-10 col-md-12 col-sm-12">
    <div class="col-xl-8 col-lg-10 col-md-6 ">
        <label for="info_photo">Photo</label><br>
        <img src='<?php echo 'uploads/loan_entry/cus_pic/' . $row['pic']; ?>'  class='img-show' name="info_photo" id="info_photo">
    </div>
</div>

<?php
// Close the database connection
$pdo = null;
?>