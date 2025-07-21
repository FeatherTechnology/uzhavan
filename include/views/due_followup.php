<div class="text-right">
    <button type="button" class="btn btn-primary" id="back_btn" style="display: none;"><span class="icon-arrow-left"></span>&nbsp; Back </button>
</div>
<br>

<!-- Main container start -->
<div class="main-container">
    <!-- Row start -->
    <div class="row gutters due_list_div">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="table-container">
                <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                        <label for="sub_status_mapping">Customer Status</label><span class="required">&nbsp;*</span>
                        <input type="hidden" name="customer_status" id="customer_status" value="">
                        <select class="form-control" id="sub_status_mapping" name="sub_status_mapping" multiple>
                            <option value="">Select Customer Status</option>
                        </select>
                        <span class='text-danger subStatusCheck' style="display:none">Please Select Customer Status</span>
                    </div>

                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                        <label for="comm_date">Commitement Date</label>
                        <select class="form-control" id="comm_date" name="comm_date">
                            <option value="1">Select Commitment Date</option>
                            <option value="2">Before Date</option>
                            <option value="3">Today</option>
                            <option value="4">After Date</option>
                            <option value="5">To Follow</option>
                        </select>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                        <button type="button" class="btn btn-primary" id="show_due_followup" style="margin-top:20px;">Proceed</button>
                    </div>
                </div>

                <br>

                <div class="table-responsive overflow-x-cls" id="dueFollwupDiv" style="overflow-x: auto; white-space: nowrap;">
                    <table id='due_followup_table' class="table custom-table">
                        <thead>
                            <tr>
                                <th width="50">S.No.</th>
                                <th>Customer ID</th>
                                <th>Aadhar Number</th>
                                <th>Customer Name</th>
                                <th>Area</th>
                                <th>Branch</th>
                                <th>Line</th>
                                <th>Mobile</th>
                                <th>Sub Status</th>
                                <th>Action</th>
                                <th>Last Paid Date</th>
                                <th>Current Month Paid</th>
                                <th>Hint</th>
                                <th>Communication Status</th>
                                <th>Commitment Date</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- Row end -->
    <div class="row gutters loan_list_div" style="display: none;">
        <div class="col-12">
            <!--- -------------------------------------- Loan Info ------------------------------- -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Loan List</div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <table id="loan_list_table" class="table custom-table">
                                <thead>
                                    <tr>
                                        <th width="20">S.NO</th>
                                        <th>Loan ID</th>
                                        <th>Loan Category</th>
                                        <th>Loan Date</th>
                                        <th>Loan Amount</th>
                                        <th>Status</th>
                                        <th>Sub Status</th>
                                        <th>Charts</th>
                                        <th>Info</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody> </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
<!-- Main container end -->