<?php
require '../../ajaxconfig.php';

$cusid = $_POST['cus_id'];
$aadhar_nums = $_POST['aadhar_nums'];
?>

<table class="table custom-table fingerprintTable">
    <thead>
        <tr>
            <th> S.No </th>
            <th> Name </th>
            <th> Relationship </th>
            <th> Status </th>
            <th width='600px'> Fingerprint </th>
        </tr>
    </thead>
    <tbody>
        <?php
            $qry = $pdo->prepare("SELECT
                    cr.aadhar_num AS aadhaar_no,
                    cr.cus_name AS name,
                    'Customer' AS relationship,
                    MAX(CASE WHEN f.hand = '1' THEN 'Added' END) AS left_hand,
                    MAX(CASE WHEN f.hand = '2' THEN 'Added' END) AS right_hand
                FROM customer_register cr
                LEFT JOIN fingerprints f
                    ON cr.aadhar_num = f.adhar_num
                WHERE cr.aadhar_num = ?
                GROUP BY cr.aadhar_num, cr.cus_name

                UNION ALL

                SELECT
                    fi.fam_aadhar AS aadhaar_no,
                    fi.fam_name AS name,
                    fi.fam_relationship,
                    MAX(CASE WHEN f.hand = '1' THEN 'Added' END) AS left_hand,
                    MAX(CASE WHEN f.hand = '2' THEN 'Added' END) AS right_hand
                FROM family_info fi
                LEFT JOIN fingerprints f
                    ON fi.fam_aadhar = f.adhar_num
                WHERE fi.cus_id = ?
                GROUP BY fi.fam_aadhar, fi.fam_name, fi.fam_relationship");

            $qry->execute([$aadhar_nums, $cusid]);

            $i = 1;
            while ($row = $qry->fetch()) {

                $left = ($row['left_hand'] =='Added') ? 'badge-success' : 'badge-danger';
                $right = ($row['right_hand'] =='Added') ? 'badge-success' : 'badge-danger';
            ?>
                <tr height='70px'>
                    <td><?php echo $i++; ?></td>
                    <td><input type='hidden' id='adhar_print' name='adhar_print[]' value='<?php echo $row['name']; ?>' data-no='<?php echo $row['aadhaar_no']; ?>'><?php echo $row["name"]; ?></td>
                    <td><?php echo $row["relationship"]; ?></td>
                    <td><span class="badge badge-pill <?= $left ?>">L</span> &nbsp;&nbsp; <span class="badge badge-pill <?= $right ?>">R</span></td>
                    <td>
                        <select type='text' id='hand_selection' name='hand_selection[]' class='btn hand_selection' style="border: #333c61 1px solid;height: 38px;" tabindex='42'>
                            <option value=''>Select Hand</option>
                            <option value='1'>Left Hand</option>
                            <option value='2'>Right Hand</option>
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" class='btn btn-success scanBtn' style='background-color:#333c61;' onclick="event.preventDefault()" title='Put Your Thumb' tabindex='42'><i class="material-icons" id="icon-flipped">&#xe90d;</i>&nbsp;Scan</button>
                    </td>
                </tr>
        <?php } ?>
    </tbody>
</table>

<?php
// Close the database connection
$connect = null;
?>