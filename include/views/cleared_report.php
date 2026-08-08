<div class="row gutters">
    <div class="col-12">
        <div class="toggle-container col-12">
            <input type="date" id='from_date' name='from_date' class="toggle-button" value=''>
            <input type="date" id='to_date' name='to_date' class="toggle-button" value=''>
            <input type="button" id='cleared_report_btn' name='cleared_report_btn' class="toggle-button" style="background-color: #333c61;color:white" value='Search'>
        </div> <br />
        <!-- Cleared report Start -->
        <div class="card">
            <div class="card-header">Cleared Report</div>
            <div class="card-body">
                <div id="cleared_table_div" class="table-divs" style="overflow-x: auto;">
                    <table id="cleared_report_table" class="table custom-table">
                        <thead>
                            <th>S.No</th>
                            <th>Bank Name</th>
                            <th>Transaction Date</th>
                            <th>Narration</th>
                            <th>Transaction ID</th>
                            <th>Credit</th>
                            <th>Debit</th>
                            <th>Balance</th>
                            <th>Status</th>
                            <th>Cleared Date</th>
                            <th>Cleared User</th>
                            <th>Cleared Screen</th>
                        </thead>
                        <tbody></tbody>
                        <tfoot>
                            <tr>
                                <td colspan="5"></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td colspan="4"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <!--Cleared report End-->
    </div>
</div>