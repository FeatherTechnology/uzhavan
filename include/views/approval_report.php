<div class="row gutters">
    <div class="col-12">
        <div class="toggle-container col-12">
            <input type="date" id='from_date' name='from_date' class="toggle-button" value=''>
            <input type="date" id='to_date' name='to_date' class="toggle-button" value=''>
            <input type="button" id='approval_report_btn' name='approval_report_btn' class="toggle-button" style="background-color: #333c61;color:white" value='Search'>
        </div> <br />
        <!-- Loan Issue report Start -->
        <div class="card">
            <div class="card-body overflow-x-cls">
                <div class="col-12">
                    <table id="approval_report_table" class="table custom-table">
                        <thead>
                            <tr>
                                <th>S.NO</th>
                                <th>Loan Entry Date</th>
                                <th>Loan ID</th>
                                <th>Customer ID</th>
                                <th>Aadhar Number</th>
                                <th>Customer Name</th>
                                <th>Gaurantor Name</th>
                                <th>Area</th>
                                <th>Line</th>
                                <th>Branch</th>
                                <th>Mobile</th>
                                <th>Loan Category</th>
                                <th>Loan Amount</th>
                                <th>Agent Name</th>
                                <th>Customer Data</th>
                                <th>Existing Type</th>
                                <th>Role</th>
                                <th>User Name</th>
                                <th>Status</th>
                                <th>Sub Status</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <!--Loan Issue report End-->
    </div>
</div>