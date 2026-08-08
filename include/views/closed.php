<div class="row gutters">
    <div class="col-12">
        <div class="card" id="closed_list">
            <div class="card-header">
                <h5 class="card-title">Closed List</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <table id="closed_list_table" class="table custom-table">
                            <thead>
                                <tr>
                                    <th width="50">S.No.</th>
                                    <th>Customer ID</th>
                                    <th>Aadhar Number</th>
                                    <th>Customer Name</th>
                                    <th>Gurantor Name</th>
                                    <th>Area</th>
                                    <th>Line</th>
                                    <th>Branch</th>
                                    <th>Mobile No</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 text-right back_to_closed_list" style="margin-bottom:10px">
            <button class="btn btn-primary back_to_closed_list" id="back_to_closed_list" style="display: none;"><span class="icon-arrow-left"></span> Back</button>
        </div>
        <div id="closed_main_container" style="display:none">
            <!-- Row start -->
            <div class="row gutters" id="personal_info">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">Personal Info</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-8">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label for="aadhar_num">Aadhar Number</label><span class="text-danger">*</span>
                                                <input type="text" class="form-control personal_info_disble" name="aadhar_num" id="aadhar_num" tabindex="2" disabled>
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label for="cus_id">Customer ID</label>
                                                <input type="text" class="form-control" id="cus_id" name="cus_id" tabindex="1" disabled>
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label for="cus_name">Customer Name</label>
                                                <input type="text" class="form-control" id="cus_name" name="cus_name" pattern="[a-zA-Z\s]+" tabindex="2" disabled>
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label for="cus_area">Area</label>
                                                <input type="text" class="form-control" id="area" name="area" tabindex="3" disabled>
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label for="cus_branch">Branch</label>
                                                <input type="text" class="form-control" id="branch_name" name="branch_name" tabindex="4" disabled>
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label for="cus_line">Line</label>
                                                <input type="text" class="form-control" id="line" name="line" tabindex="5" disabled>
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label for="mobile1"> Mobile No</label>
                                                <input type="number" class="form-control" id="mobile1" name="mobile1" tabindex="6" disabled>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label for="pic"> Photo</label><br>
                                                <img id='imgshow' class="img_show" src='img\avatar.png' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card" id="loan_list">
                <div class="card-header">
                    <h5 class="card-title">Loan List</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <table id="close_loan_table" class=" table custom-table">
                                <thead>
                                    <th width="50">S.No.</th>
                                    <th>Loan ID</th>
                                    <th>Loan Category</th>
                                    <th>Loan Date</th>
                                    <th>Closed Date</th>
                                    <th>Loan Amount</th>
                                    <th>Status</th>
                                    <th>Sub Status</th>
                                    <th>Charts</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Customer Summary</div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <!-- How to Know -->
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div class="form-group">
                                <label for="how_to_know">How To Know</label><span class="text-danger">*</span>
                                <select class="form-control" id="how_to_know" name="how_to_know" tabindex="29" disabled>
                                    <option value="">Select How To Know</option>
                                    <option value="1">Customer Reference</option>
                                    <option value="2">Advertisement</option>
                                    <option value="3">Promotion activity</option>
                                    <option value="4">Agent Reference</option>
                                    <option value="5">Staff Reference</option>
                                    <option value="6">Other Reference</option>
                                    <option value="7">Renewal</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 loan_count_div">
                            <div class="form-group">
                                <label for="loan_count">Loan Count</label><span class="text-danger">*</span>
                                <input type="text" class="form-control" id="loan_count" name="loan_count" disabled placeholder="Loan Count" tabindex="34" readonly>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 loan_count_div">
                            <div class="form-group">
                                <label for="first_loan_date">First Loan Date</label><span class="text-danger">*</span>
                                <input type="text" class="form-control" id="first_loan_date" name="first_loan_date" disabled placeholder="First Loan Date" tabindex="35" readonly>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 loan_count_div">
                            <div class="form-group">
                                <label for="travel_with_company">Travel With Company</label><span class="text-danger">*</span>
                                <input type="text" class="form-control" id="travel_with_company" name="travel_with_company" disabled tabindex="36" readonly>
                            </div>
                        </div>
                    </div>

                    <hr>
                    <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div class="form-group">
                                <label for="monthly_income">Monthly Income</label><span class="text-danger">*</span>
                                <input type="text" class="form-control" id="monthly_income" name="monthly_income" placeholder=" Enter Monthly Income" tabindex="37" readonly>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div class="form-group">
                                <label for="other_income">Other Income</label><span class="text-danger">*</span>
                                <input type="text" class="form-control" id="other_income" name="other_income" placeholder="Enter Other Income" tabindex="38" readonly>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div class="form-group">
                                <label for="support_income">Support Income</label><span class="text-danger">*</span>
                                <input type="text" class="form-control" id="support_income" name="support_income" placeholder="Enter Support Income" tabindex="39" readonly>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div class="form-group">
                                <label for="commitment">Commitment</label><span class="text-danger">*</span>
                                <input type="text" class="form-control" id="commitment" name="commitment" placeholder="Enter Commitment" tabindex="40" readonly>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div class="form-group">
                                <label for="monthly_due_capacity">Monthly Due Capacity</label><span class="text-danger">*</span>
                                <input type="text" class="form-control" id="monthly_due_capacity" name="monthly_due_capacity" placeholder="Enter Due Capacity" tabindex="41" readonly>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div class="form-group">
                                <label for="cus_limit">Customer Limit</label>
                                <input type="text" class="form-control" id="cus_limit" name="cus_limit" placeholder="Customer Limit" disabled tabindex="42" readonly>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                    </div> <br>

                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="form-group table-responsive">
                                <table class="table custom-table" id="feedbackListTable">
                                    <thead>
                                        <tr>
                                            <th width="50"> S.No </th>
                                            <th> Feedback Label </th>
                                            <th> Feedback </th>
                                            <th> Remarks </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <hr>
                    <!-- About Customer -->
                    <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div class="form-group">
                                <label for="about_cus">About Customer</label>
                                <textarea class="form-control" name="about_cus" id="about_cus" placeholder="Enter About Customer" tabindex="43" readonly></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<!-- /////////////////////////////////////////////////////////////////// Closed Remark Modal Start ////////////////////////////////////////////////////////////////////// -->
<div class="modal fade" id="closed_remark_model" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg " role="document">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Closed Remark</h5>
                <button type="button" class="close" data-dismiss="modal" tabindex="1" aria-label="Close" onclick="closeChartsModal()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <form id="closed_remark_form" method="post">
                        <input type="hidden" id="cus_profile_id">
                        <div class="col-12 row">
                            <div class="col-sm-4 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="sub_status">Sub Status</label><span class="required">*</span>
                                    <select name="sub_status" id="sub_status" class="form-control" tabindex="2">
                                        <option value="">Select Sub Status</option>
                                        <option value="1">Consider</option>
                                        <option value="2"> Waiting List </option>
                                        <option value="3"> Block List </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12" style="display: none;" id="considerlevel">
                                <div class="form-group">
                                    <label for="branch"> Consider Level </label> <span class="required">*</span>
                                    <select type="text" class="form-control" name="closed_Sts_consider" id="closed_Sts_consider">
                                        <option value=""> Select Consider Level </option>
                                        <option value="1"> Bronze </option>
                                        <option value="2"> Silver </option>
                                        <option value="3"> Gold </option>
                                        <option value="4"> Platinum </option>
                                        <option value="5"> Diamond </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="remark">Remark</label>
                                    <textarea class="form-control" name="remark" id="remark" tabindex="3" placeholder="Enter Remarks"></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
            <div class="modal-footer">
                <button name="submit_closed_remark" id="submit_closed_remark" class="btn btn-primary" tabindex="4"><span class="icon-check"></span>&nbsp;Submit</button>
                <button class="btn btn-secondary" data-dismiss="modal" onclick="closeChartsModal()" tabindex="6">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- /////////////////////////////////////////////////////////////////// Closed Remark Modal END ////////////////////////////////////////////////////////////////////// -->
 <div id="printcollection" style="display: none"></div>
<!-- /////////////////////////////////////////////////////////////////// Due Chart Modal Start ////////////////////////////////////////////////////////////////////// -->
<div class="modal fade bd-example-modal-lg" id="due_chart_model" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg " role="document" style="max-width: 70% !important">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Due Chart</h5>
                <button type="button" class="close" data-dismiss="modal" tabindex="1" aria-label="Close" onclick="closeChartsModal()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid" id="due_chart_table_div">
                    <table class="table custom-table">
                        <thead>
                            <th>Due No.</th>
                            <th>Due Month</th>
                            <th>Month</th>
                            <th>Due Amount</th>
                            <th>Pending</th>
                            <th>Payable</th>
                            <th>Collection Date</th>
                            <th>Collection Amount</th>
                            <th>Balance Amount</th>
                            <th>Pre Closure</th>
                            <th>Role</th>
                            <th>User ID</th>
                            <th>Collection Method</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>

            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal" onclick="closeChartsModal()" tabindex="4">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- /////////////////////////////////////////////////////////////////// Due Chart Modal END ////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////// Penalty Chart Modal Start ////////////////////////////////////////////////////////////////////// -->
<div class="modal fade" id="penalty_model" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg " role="document">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Penalty Chart</h5>
                <button type="button" class="close" data-dismiss="modal" tabindex="1" aria-label="Close" onclick="closeChartsModal()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid" id="penalty_chart_table_div">
                    <div class="row">
                        <table class="table custom-table">
                            <thead>
                                <th>S No.</th>
                                <th>Penalty Date</th>
                                <th>Penalty</th>
                                <th>Paid Date</th>
                                <th>Paid Amount</th>
                                <th>Balance Amount</th>
                                <th>Waiver Amount</th>
                            </thead>
                        </table>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal" onclick="closeChartsModal()" tabindex="4">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- /////////////////////////////////////////////////////////////////// Penalty Chart Modal END ////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////// Fine Chart Modal Start ////////////////////////////////////////////////////////////////////// -->
<div class="modal fade" id="fine_model" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg " role="document">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Fine Chart</h5>
                <button type="button" class="close" data-dismiss="modal" tabindex="1" aria-label="Close" onclick="closeChartsModal()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="overflow-x: auto;">
                <div class="container-fluid" id="fine_chart_table_div">
                    <div class="row">
                        <table class="table custom-table">
                            <thead>
                                <th>S No.</th>
                                <th>Date</th>
                                <th>Fine</th>
                                <th>Purpose</th>
                                <th>Paid Date</th>
                                <th>Paid Amount</th>
                                <th>Balance Amount</th>
                                <th>Waiver Amount</th>
                            </thead>
                        </table>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal" onclick="closeChartsModal()" tabindex="4">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- /////////////////////////////////////////////////////////////////// Fine Chart Modal END ////////////////////////////////////////////////////////////////////// -->
<!--------------------------------------------------------------------- Commitment Chart Modal Start ------------------------------------------------------------------>

<div class="modal fade" id="commitment_model" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg " role="document">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Commitment Chart</h5>
                <button type="button" class="close" data-dismiss="modal" tabindex="1" aria-label="Close" onclick="closeChartsModal()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body overflow-x-cls">
                <table class="table custom-table" id="commitment_chart_table">
                    <thead>
                        <th>S No.</th>
                        <th>Date</th>
                        <th>Follow Type</th>
                        <th>Followup Status </th>
                        <th>Person Type</th>
                        <th>Person Name</th>
                        <th>Relationship</th>
                        <th>Remark</th>
                        <th>Commitment Date</th>
                        <th>User Type</th>
                        <th>User Name</th>
                        <th>Hint</th>
                        <th>Communication Status</th>
                    </thead>
                </table>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal" onclick="closeChartsModal()" tabindex="4">Close</button>
            </div>
        </div>
    </div>
</div>

<!--------------------------------------------------------------------- Commitment Chart Modal end ------------------------------------------------------------------>
<!-- Add Loan Summary Modal START -->
<div class="modal fade addloansummary" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="myLargeModalLabel"> Add Loan Summary </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="closeChartsModal()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="feedback_form">
                    <div class="row">

                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label for="feedbackLabel"> Feedback Label </label> <span class="required">&nbsp;*</span>
                                <input type="text" class="form-control" id="feedback_label" name="feedback_label" onkeydown="return /[a-z ]/i.test(event.key)" placeholder="Enter Feedback Label">
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label for="feedback "> Feedback Rating </label> <span class="required">&nbsp;*</span>
                                <select type="text" class="form-control" id="cus_feedback" name="cus_feedback">
                                    <option value=""> Select Feedback </option>
                                    <option value="1"> Bad </option>
                                    <option value="2"> Poor </option>
                                    <option value="3"> Average </option>
                                    <option value="4"> Good </option>
                                    <option value="5"> Excellent </option>
                                </select>
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label for="feedback_remark"> Remark </label>
                                <textarea class="form-control" name="feedback_remark" id="feedback_remark"></textarea>
                            </div>
                        </div>

                        <div class="col-xl-12 col-lg-12 col-md-6 col-sm-6 col-12 text-right">
                            <input type="hidden" name="feedbackID" id="feedbackID">
                            <label style="visibility:hidden"> Submit </label><br><br>
                            <button type="button" name="feedbackBtn" id="feedbackBtn" class="btn btn-primary"> Submit </button>
                        </div>
                    </div>
                </form>
                </br>


                <div class="table-responsive">
                    <table class="table custom-table" id="feedbackTable">
                        <thead>
                            <tr>
                                <th width="20%"> S.No </th>
                                <th> Feedback Label </th>
                                <th> Feedback </th>
                                <th> Remark </th>
                                <th> ACTION </th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeChartsModal()">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- END  Add Loan Summary Modal -->
<!-- /////////////////////////////////////////////////////////////////// Fine Chart Modal Start ////////////////////////////////////////////////////////////////////// -->
<div class="modal fade" id="loansummary_model" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg " role="document">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Loan Summary Chart</h5>
                <button type="button" class="close" data-dismiss="modal" tabindex="1" aria-label="Close" onclick="closeChartsModal()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body overflow-x-cls">
                <table class="table custom-table " id="feedbackInfoTable">
                    <thead>
                        <th width="30px">S No.</th>
                        <th>Feedback Label</th>
                        <th>Feedback</th>
                        <th>Remark</th>
                    </thead>
                </table>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal" onclick="closeChartsModal()" tabindex="4">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- /////////////////////////////////////////////////////////////////// Fine Chart Modal END ////////////////////////////////////////////////////////////////////// -->