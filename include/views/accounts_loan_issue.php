<!----------------------------------------------------------- Loan Issue List Start ------------------------------------------------------------------------->

<div class="text-right">
    <button type="button" class="btn btn-primary" id="back_btn" style="display: none;"><span class="icon-arrow-left"></span>&nbsp; Back </button>
</div>
<br>

<div class="card loanissue_table_content">
    <div class="card-body">
        <div class="col-12">
            <table id="loan_issue_table" class="table custom-table">
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>Loan Date</th>
                        <th>Customer ID</th>
                        <th>Aadhar Number</th>
                        <th>Customer Name</th>
                        <th>Area</th>
                        <th>Line</th>
                        <th>Branch</th>
                        <th>Mobile</th>
                        <th>Loan Category</th>
                        <th>Loan Amount</th>
                        <th>Customer Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>

<!--------------------------------------------------------------- Loan Issue List End ------------------------------------------------------------------------>

<div id="loan_issue_content" style="display:none;">
    <form id="loan_issue_form" name="loan_issue_form">
        <input type="hidden" id="customer_profile_id">
        <input type="hidden" id="int_rate_upd">
        <input type="hidden" id="due_period_upd">
        <input type="hidden" id="doc_charge_upd">
        <input type="hidden" id="proc_fees_upd">
        <div class="row gutters">
            <input type="hidden" id="aadhar_num">
            <div class="col-12">

                <!------------------------------------------------------------------ Personal Info START ------------------------------------------------------->

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Personal Info</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="aadhar_nums"> Aadhar Number</label><span class="text-danger">*</span>
                                            <input type="text" class="form-control personal_info_disble" name="aadhar_nums" id="aadhar_nums" tabindex="1" placeholder="Enter Aadhar Number" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="cus_id"> Customer ID</label><span class="text-danger">*</span>
                                            <input type="text" class="form-control" id="cus_id" name="cus_id" tabindex="2" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="cus_name"> Customer Name</label><span class="text-danger">*</span>
                                            <input type="text" class="form-control" id="cus_name" name="cus_name" tabindex="3" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="cus_data"> Customer Data</label><span class="text-danger">*</span>
                                            <input type="text" class="form-control" id="cus_data" name="cus_data" tabindex="4" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="mobile1"> Mobile Number </label><span class="text-danger">*</span>
                                            <input type="number" class="form-control " id="mobile1" name="mobile1" tabindex="5" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="cus_area"> Area </label><span class="text-danger">*</span>
                                            <input type="text" class="form-control " id="cus_area" name="cus_area" tabindex="6" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="pic"> Photo</label><span class="text-danger">*</span><br>
                                            <img id='imgshow' class="img_show" src='img\avatar.png' />
                                            <input type="hidden" id="per_pic">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-------------------------------------------------------------------- Personal Info END ----------------------------------------------------------->

                <!------------------------------------------------------------------------- Loan Info -------------------------------------------------------------->

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Loan Info</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="loan_id_calc"> Loan ID</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="loan_id_calc" name="loan_id_calc" tabindex="7" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="loan_category_calc"> Loan Category</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="loan_category_calc" name="loan_category_calc" tabindex="8" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="category_info_calc">Category Info</label>
                                    <textarea class="form-control" id="category_info_calc" name="category_info_calc" tabindex="9" readonly></textarea>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="loan_amount_calc">Loan Amount</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control " id="loan_amount_calc" name="loan_amount_calc" tabindex="10" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="profit_type_calc">Profit Type</label><span class="text-danger">*</span>
                                    <select class="form-control" id="profit_type_calc" name="profit_type_calc" tabindex="11" disabled>
                                        <option value="">Select Profit Type</option>
                                        <option value="0">Calculation</option>
                                        <option value="1">Scheme</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!----------------------------------------------------------------- Loan Info END -------------------------------------------------------------------->

                <!--------------------------------------------------------------- Calculation - Scheme START ---------------------------------------------------------->

                <div class="card" id="profit_type_calc_scheme" style="display: none;">
                    <div class="card-header">
                        <div class="card-title calc_scheme_title">Calculation</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 calc" style="display:none">
                                <div class="form-group">
                                    <label for="due_method_calc">Due Method</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="due_method_calc" name="due_method_calc" value="Monthly" tabindex="12" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 calc" style="display:none">
                                <div class="form-group">
                                    <label for="due_type_calc">Due Type</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="due_type_calc" name="due_type_calc" tabindex="13" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 scheme" style="display:none">
                                <div class="form-group">
                                    <label for="scheme_due_method_calc">Due Method</label><span class="text-danger">*</span>
                                    <select class="form-control" id="scheme_due_method_calc" name="scheme_due_method_calc" tabindex="14" disabled>
                                        <option value="">Select Due Method</option>
                                        <option value="1">Monthly</option>
                                        <option value="2">Weekly</option>
                                        <option value="3">Daily</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 scheme_day" style="display:none">
                                <div class="form-group">
                                    <label for="scheme_day_calc">Day</label><span class="text-danger">*</span>
                                    <select class="form-control" id="scheme_day_calc" name="scheme_day_calc" tabindex="15" disabled>
                                        <option value="">Select Day</option>
                                        <option value="1">Monday</option>
                                        <option value="2">Tuesday</option>
                                        <option value="3">Wednesday</option>
                                        <option value="4">Thursday</option>
                                        <option value="5">Friday</option>
                                        <option value="6">Saturday</option>
                                        <option value="7">Sunday</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 scheme" style="display:none">
                                <div class="form-group">
                                    <label for="scheme_name_calc">Scheme Name</label><span class="text-danger">*</span>
                                    <input type="hidden" id="scheme_name_edit">
                                    <select class="form-control to_clear" id="scheme_name_calc" name="scheme_name_calc" tabindex="8" disabled>
                                        <option value="">Select Scheme Name</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="profit_method_calc">Profit Method</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="profit_method_calc" name="profit_method_calc" tabindex="17" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="interest_rate_calc">Interest Rate</label><span class="text-danger min-max-int">*</span><!-- Min and max intrest rate-->
                                    <input type="text" class="form-control" id="interest_rate_calc" name="interest_rate_calc" tabindex="18" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="due_period_calc">Due Period</label><span class="text-danger min-max-due">*</span><!-- Min and max Profit Method-->
                                    <input type="text" class="form-control" id="due_period_calc" name="due_period_calc" tabindex="19" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="doc_charge_calc">Document Charges</label><span class="text-danger min-max-doc">*</span><!-- Min and max Document charges-->
                                    <input type="text" class="form-control" id="doc_charge_calc" name="doc_charge_calc" tabindex="20" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="processing_fees_calc">Processing Fees</label><span class="text-danger min-max-proc">*</span><!-- Min and max Processing fee-->
                                    <input type="text" class="form-control" id="processing_fees_calc" name="processing_fees_calc" tabindex="21" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!----------------------------------------------------------- Calculation - Scheme END ---------------------------------------------------------->

                <!--------------------------------------------------------------- Loan Calculate START ---------------------------------------------------------->

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Loan Calculation</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="principal_amnt_calc">Principal Amount</label><span class="text-danger princ-diff">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="principal_amnt_calc" name="principal_amnt_calc" tabindex="22" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="interest_amnt_calc">Interest Amount</label><span class="text-danger int-diff">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="interest_amnt_calc" name="interest_amnt_calc" tabindex="23" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="total_amnt_calc">Total Amount</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="total_amnt_calc" name="total_amnt_calc" tabindex="24" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="due_amnt_calc">Due Amount</label><span class="text-danger due-diff">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="due_amnt_calc" name="due_amnt_calc" tabindex="25" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="doc_charge_calculate">Document Charges</label><span class="text-danger doc-diff">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="doc_charge_calculate" name="doc_charge_calculate" tabindex="26" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="processing_fees_calculate">Processing Fees</label><span class="text-danger proc-diff">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="processing_fees_calculate" name="processing_fees_calculate" tabindex="27" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="net_cash_calc">Net Cash</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="net_cash_calc" name="net_cash_calc" tabindex="28" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--------------------------------------------------------------------- Loan Calculate END ------------------------------------------------------------->

                <!----------------------------------------------------------------------- Collection Info START -------------------------------------------------------->

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Collection Info</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="loan_date_calc">Loan Date</label><span class="text-danger">*</span>
                                    <input type="date" class="form-control" id="loan_date_calc" name="loan_date_calc" tabindex="29" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="due_startdate_calc">Due Start Date</label><span class="text-danger">*</span>
                                    <input type="date" class="form-control" id="due_startdate_calc" name="due_startdate_calc" tabindex="30" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="maturity_date_calc">Maturity Date</label><span class="text-danger">*</span>
                                    <input type="date" class="form-control" id="maturity_date_calc" name="maturity_date_calc" tabindex="31" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!---------------------------------------------------------------------------- Collection Info END ------------------------------------------------------>

                <!----------------------------------------------------------------------------- Issue Info START --------------------------------------------------------->

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Issue Info</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="balance_net_cash">Balance Net Cash</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="balance_net_cash" name="balance_net_cash" tabindex="32" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="payment_type">Payment Type</label><span class="text-danger">*</span>
                                    <select class="form-control" id="payment_type" name="payment_type" tabindex="33" disabled>
                                        <option value="">Select Payment Type</option>
                                        <option value="1">Split Payment</option>
                                        <option value="2">Single Payment</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12  payment">
                                <div class="form-group">
                                    <label for="payment_mode">Payment Mode</label><span class="text-danger">*</span>
                                    <select type="text" class="form-control" id="payment_mode" name="payment_mode" tabindex="34" disabled>
                                        <option value=""> Select Payment Mode</option>
                                        <option value="1"> Cash </option>
                                        <option value="2"> Bank Transfer </option>
                                        <option value="3"> Cheque </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12" id="bank_container">
                                <div class="form-group">
                                    <input type="hidden" id="bank_name_edit">
                                    <label for="bank_names">Bank Name</label><span class="text-danger">*</span>
                                    <select class="form-control" id="bank_names" name="bank_names" tabindex="35">
                                        <option value="">Select Bank Name</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="issue_date">Issue Date</label><span class="text-danger">*</span>
                                    <input type="date" class="form-control" id="issue_date" name="issue_date" tabindex="44" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="issue_person"> Issue Person </label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="issue_person" name="issue_person" tabindex="45" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="issue_relationship">Relationship</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" name="issue_relationship" id="issue_relationship" tabindex="46" placeholder="Relationship" readonly>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!------------------------------------------------------------------------- Issue Info END ------------------------------------------------------------------->

                <!-------------------------------------------------------------------------- Bank Info Start ----------------------------------------------------------------->

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Bank Info</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <input type="hidden" name="bank_id" id='bank_id'>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="bank_name">Bank Name</label><span class="text-danger">*</span>
                                    <input class="form-control" name="bank_name" id="bank_name" tabindex="1" placeholder="Enter Bank Name" readonly>
                                    <input type="hidden" id="addbank_name_id" value='0'>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="branch_name">Branch Name</label><span class="text-danger">*</span>
                                    <input class="form-control" name="branch_name" id="branch_name" tabindex="1" placeholder="Enter Branch Name" readonly>
                                    <input type="hidden" id="addbranch_id" value='0'>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="acc_holder_name">Account Holder Name</label><span class="text-danger">*</span>
                                    <input class="form-control" name="acc_holder_name" id="acc_holder_name" tabindex="1" placeholder="Enter Account Holder Name" readonly>
                                    <input type="hidden" id="addacc_holder_id" value='0'>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="acc_number">Account Number</label><span class="text-danger">*</span>
                                    <input type="number" class="form-control" name="acc_number" id="acc_number" tabindex="1" placeholder="Enter Account Number" readonly>
                                    <input type="hidden" id="addacc_number_id" value='0'>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="ifsc_code">IFSC Code</label><span class="text-danger">*</span>
                                    <input class="form-control" name="ifsc_code" id="ifsc_code" tabindex="1" placeholder="Enter IFSC Code" readonly>
                                    <input type="hidden" id="addifsc_id" value='0'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-------------------------------------------------------------------------- Bank Info END ------------------------------------------------------------------->

                <!-------------------------------------------------------------------- Transaction and Cheque Info Start ----------------------------------------------------->

                <div class="card">
                    <div class="card-header">
                        <div class="card-title"></div><span id="payment_text"></span>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 checque" style="display:none">
                                <div class="form-group">
                                    <label for="">Cheque number</label><span class="text-danger">*</span>
                                    <input type="number" class="form-control" id="chequeno" name="chequeno" tabindex="37">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 checque" style="display:none">
                                <div class="form-group">
                                    <label for="">Cheque Value</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="chequeValue" name="chequeValue" tabindex="38">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 checque" style="display:none">
                                <div class="form-group">
                                    <label for="">Cheque Remark</label>
                                    <input type="text" class="form-control" id="chequeRemark" name="chequeRemark" tabindex="39">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 transaction" style="display:none">
                                <div class="form-group">
                                    <label for="disabledInput">Transaction ID</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="transaction_id" name="transaction_id" tabindex="40">
                                    <span class="text-danger" style="display: none;" id="transact_id"> Please Enter Transaction ID </span>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 transaction" style="display:none">
                                <div class="form-group">
                                    <label for="disabledInput">Transaction Value </label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="transaction_value" name="transaction_value" tabindex="41">
                                    <span class="text-danger" style="display: none;" id="transact_val"> Please Enter Transaction Value </span>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 transaction" style="display:none">
                                <div class="form-group">
                                    <label for="disabledInput">Transaction Remark </label>
                                    <input type="text" class="form-control" id="transaction_remark" name="transaction_remark" tabindex="42">
                                    <span class="text-danger" style="display: none;" id="transact_remark"> Please Enter Transaction Remark </span>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 balance" style="display:none">
                                <div class="form-group">
                                    <label for="disabledInput">Balance Amount </label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="balance_amount" name="balance_amount" readonly tabindex='43'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!------------------------------------------------------------------- Transaction and Cheque Info End ------------------------------------------------>

            </div>

            <div class="col-12 mt-3 text-right">
                <button name="submit_accounts_loan_issue" id="submit_accounts_loan_issue" class="btn btn-primary" tabindex="46"><span class="icon-check"></span>&nbsp;Submit</button>
            </div>
        </div>
    </form>
</div>

<!--------------------------------------------------------------------------- Accounts Loan Issue END -------------------------------------------------------------->