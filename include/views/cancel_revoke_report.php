<div class="row gutters">
    <div class="col-12">
        <div class="toggle-container col-12">
            <input type="date" id='from_date' name='from_date' class="toggle-button" value=''>
            <input type="date" id='to_date' name='to_date' class="toggle-button" value=''>
            <select type="text" class="toggle-button" id='type' name='type'>
                <option value=''>Select Type</option>
                <option value='1'>Cancel</option>
                <option value='2'>Revoke</option>
            </select>
            <select type="text" class="toggle-button" id='screen' name='screen'>
                <option value=''>Select Screen</option>
                <option value='1'>Approval</option>
                <option value='2'>Loan Issue</option>
            </select>
            <input type="button" id='cancel_revoke_report_btn' name='cancel_revoke_report_btn' class="toggle-button" style="background-color: #333c61;color:white" value='Search'>
        </div> <br />
        <!-- Loan Issue report Start -->
        <div class="card">
            <div class="card-body overflow-x-cls">
                <div class="col-12">
                    <table id="cancel_revoke_report_table" class="table custom-table">
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
                                <th>Remark</th>
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