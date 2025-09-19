<?php

include('../../ajaxconfig.php');

$cus_id = $_POST['cus_id'];

$sql = $pdo->query("SELECT a.*,b.user_name, r.role  FROM promotion_customer a 
        JOIN users b ON a.insert_login_id = b.id  JOIN role r ON r.id = b.role WHERE a.cus_id = '$cus_id'  ORDER BY a.id DESC "); //order by desc will show last entered data of promotion table

//this query will take new promotion data from that table with username and user type according to inserted login id and using switch case in query for output

?>


<table class="table custom-table" id='promo_chart'>
    <thead>
        <th width='20'>Date</th>
        <th>Status</th>
        <th>Label</th>
        <th>Remark</th>
        <th>User Type</th>
        <th>User</th>
        <th>Follow Date</th>
    </thead>
    <tbody>
        <?php while($row =  $sql->fetch()){?>
            <tr>
                <td><?php echo date('d-m-Y',strtotime($row['created_on'])) ; ?></td>
                <td><?php echo $row['status'] ; ?></td>
                <td><?php echo $row['label']; ?></td>
                <td><?php echo $row['remark']; ?></td>
                <td><?php echo $row['role']; ?></td>
                <td><?php echo $row['user_name']; ?></td>
                <td><?php echo date('d-m-Y',strtotime($row['follow_date'])); ?></td>
                
            </tr>
        <?php } ?>

    </tbody>
</table>

<script>
    $('#promo_chart').dataTable({
        'processing': true,
        'iDisplayLength': 5,
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
        ],
        dom: 'lBfrtip',
        buttons: [{
                extend: 'excel',
            },
            {
                extend: 'colvis',
                collectionLayout: 'fixed four-column',
            }
        ],
    })
    
</script>
<style>
    @media (max-width: 598px) {
        #promoChartDiv{
            overflow: auto;
        }
    }
</style>

<?php
// Close the database connection
$pdo = null;
?>