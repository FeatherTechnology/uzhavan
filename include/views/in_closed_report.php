<div class="row gutters">
    <div class="col-12">
        <div class="toggle-container col-12">
            <input type="date" id='from_date' name='from_date' class="toggle-button" value=''>
            <input type="date" id='to_date' name='to_date' class="toggle-button" value=''>
            <input type="button" id='in_closed_report_btn' name='in_closed_report_btn' class="toggle-button" style="background-color: #333c61;color:white" value='Search'>
        </div> <br />
        <!-- In Closed report Start -->
        <div class="card">
            <div class="card-body">
                <div class="col-12" style="overflow-x: auto;">
                    <table id="in_closed_report_table" class="table custom-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Line</th>
                                <th>Loan ID</th>
                                <th>Loan Date</th>
                                <th>Customer ID</th>
                                <th>Aadhar Number</th>
                                <th>Customer Name</th>
                                <th>Area</th>
                                <th>Branch</th>
                                <th>Mobile</th>
                                <th>Loan Category</th>
                                <th>Agent Name</th>
                                <th>Loan Amount</th>
                                <th>Maturity Date</th>
                                <th>In Closed Date</th>
                                <th>Collection Format</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                        <tfoot>
                            <tr>
                                <td colspan="12"></td>
                                <td></td>
                                <td colspan="3"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <!--Closed report End-->
    </div>
</div>