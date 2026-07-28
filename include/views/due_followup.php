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
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                          <label for="branch_name">Branch</label>
                            <input type="hidden" id="branch_name2">
                            <select class="" id="branch_name" name="branch_name" multiple>
                                <option value=''>Select Branch name</option>
                            </select>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                          <label for="line">Line</label>
                            <input type="hidden" id="line_name">
                            <select class="" id="line" name="line" multiple>
                                <option value=''>Select Line</option>
                            </select>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                          <label for="loan_category">Loan Category</label>
                            <input type="hidden" id="loan_cat_edit_it">
                            <select class="" id="loan_cat" name="loan_cat" multiple>
                                <option value=''>Select Loan Category</option>
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
    <div class="text-right">
        <button type="button" class="btn btn-primary" id="back_btn" style="display: none;"><span class="icon-arrow-left"></span>&nbsp; Back </button>
    </div>
    <br>
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
                                        <th>Date/Day</th>
                                        <th>Loan Amount</th>
                                        <th>Collection Format</th>
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
<div id="printcollection" style="display: none"></div>

<!-- /////////////////////////////////////////////////////////////////// customer Profile start ////////////////////////////////////////////////////////////////////// -->
<div id="loan_entry_content" style="display:none;">
    <div class="text-right">
        <button type="button" class="btn btn-primary" id="cus_back_btn"><span class="icon-arrow-left"></span>&nbsp; Back </button>
        <br><br>
    </div>
    <form id="loan_entry_customer_profile" name="loan_entry_customer_profile">
        <input type="hidden" id="customer_profile_id">
        <div class="row gutters">
            <div class="col-12">
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
                                            <label for="cus_id"> Customer ID</label><span class="text-danger">*</span>
                                            <input type="text" class="form-control personal_info_disble" id="cus_id" name="cus_id" data-type="adhaar-number" placeholder="Enter Customer ID" tabindex="1" maxlength="14" readonly>
                                            <input type="hidden" id="cus_id_upd" name="cus_id_upd">
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="adhar_num"> Aadhar Number</label><span class="text-danger">*</span>
                                            <input type="text" class="form-control personal_info_disble" name="adhar_num" id="adhar_num" tabindex="2" maxlength="14" data-type="adhaar-number" placeholder="Enter Aadhar Number" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="cus_name"> Customer Name</label><span class="text-danger">*</span>
                                            <input type="text" class="form-control personal_info_disble" id="cus_name" name="cus_name" pattern="[a-zA-Z\s]+" placeholder="Enter Customer Name" tabindex=" 2" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="gender">Gender</label><span class="text-danger">*</span>
                                            <select type="text" class="form-control  personal_info_disble" id="gender" name="gender" tabindex="3" readonly>
                                                <option value="">Select Gender</option>
                                                <option value="1">Male</option>
                                                <option value="2">Female</option>
                                                <option value="3">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="dob"> DOB</label>
                                            <input type="date" class="form-control  personal_info_disble" id="dob" name="dob" placeholder="Enter Date Of Birth" tabindex="4" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="age"> Age</label>
                                            <input type="number" class="form-control  personal_info_disble" id="age" name="age" readonly placeholder="Age" tabindex="5" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="mobile1"> Mobile Number 1</label><span class="text-danger">*</span>
                                            <input type="number" class="form-control  personal_info_disble" id="mobile1" name="mobile1" placeholder="Enter Mobile Number 1" onKeyPress="if(this.value.length==10) return false;" tabindex="6" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="mobile2"> Mobile Number 2</label>
                                            <input type="number" class="form-control  personal_info_disble" id="mobile2" name="mobile2" onKeyPress="if(this.value.length==10) return false;" placeholder="Enter Mobile Number 2" tabindex="7" readonly>
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
                                            <input type="hidden" class="personal_info_disble" id="per_pic">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Family Info
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <table id="fam_info_table" class="table custom-table">
                                        <thead>
                                            <tr>
                                                <th width="20">S.NO</th>
                                                <th>Name</th>
                                                <th>Relationship</th>
                                                <th>Remarks</th>
                                                <th>Age</th>
                                                <th>Live/Deceased</th>
                                                <th>Occupation</th>
                                                <th>Aadhar No</th>
                                                <th>Mobile No</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Guarantor Info</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="guarantor_name"> Guarantor Name</label><span class="text-danger" disabled>*</span>
                                            <input type="hidden" id="guarantor_name_edit">
                                            <select type="text" class="form-control" id="guarantor_name" name="guarantor_name" disabled tabindex="10">
                                                <option value="">Select Guarantor Name</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="relationship"> Relationship</label><span class="text-danger">*</span>
                                            <input type="text" class="form-control" id="relationship" name="relationship" pattern="[a-zA-Z\s]+" disabled placeholder="Enter Relationship" tabindex="11">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="pic"> Photo</label><br>
                                            <img id='gur_imgshow' class="img_show" src='img\avatar.png' />
                                            <input type="hidden" id="gur_pic">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Data Analyis</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="cus_data"> Customer Data</label>
                                    <input type="text" class="form-control" id="cus_data" name="cus_data" disabled placeholder="New/Existing" disabled tabindex="13">
                                </div>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12" style="display:none;">
                                <div class="form-group">
                                    <label for="cus_status"> Customer Status</label>
                                    <input type="text" class="form-control" id="cus_status" name="cus_status" disabled placeholder="Additional/Renewal" tabindex="14">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="data_checking_div" style="display: none;">
                        <div class="card-header">
                            <div class="card-title">Data Checking</div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="name_check">Name</label>
                                        <select type="text" class="form-control" id="name_check" name="name_check" disabled tabindex="15">
                                            <option value="">Select Name</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="aadhar_check">Aadhar</label>
                                        <select type="text" class="form-control" id="aadhar_check" name="aadhar_check" disabled tabindex="16">
                                            <option value="">Select Aadhar</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="mobile_check">Mobile</label>
                                        <select type="text" class="form-control" id="mobile_check" name="mobile_check" disabled tabindex="17">
                                            <option value="">Select Mobile</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="data_checking_table_div" style="display: none;">
                        <div class="card-header">
                            <div class="card-title">Customer Data</div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="form-group">
                                        <table id="cus_info" class="table custom-table">
                                            <thead>
                                                <tr>
                                                    <th width="20">S.NO</th>
                                                    <th>Customer ID</th>
                                                    <th>Customer Name</th>
                                                    <th>Mobile Number</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-header">
                            <div class="card-title">Family Data</div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="form-group">
                                        <table id="family_info" class="table custom-table">
                                            <thead>
                                                <tr>
                                                    <th width="20">S.NO</th>
                                                    <th>Customer ID</th>
                                                    <th>Name</th>
                                                    <th>Relationship</th>
                                                    <th>Under Customer Name</th>
                                                    <th>Under Customer ID</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Resident Info</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="res_type">Residential Type</label>
                                    <select type="text" class="form-control" id="res_type" name="res_type" tabindex="18" disabled>
                                        <option value="">Select Residential Type</option>
                                        <option value="1">Own</option>
                                        <option value="2">Rental</option>
                                        <option value="3">Lease</option>
                                        <option value="4">Quaters</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="res_detail"> Residential Details </label>
                                    <input type="text" class="form-control" id="res_detail" name="res_detail" pattern="[a-zA-Z\s]+" placeholder="Enter Residential Details" disabled tabindex="19">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="res_address"> Address </label>
                                    <input type="text" class="form-control" id="res_address" name="res_address" placeholder="Enter Address" disabled tabindex="20">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="native_address"> Native Address </label>
                                    <input type="text" class="form-control" id="native_address" name="native_address" placeholder="Enter Native Address" disabled tabindex="21">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Occupation Info</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="occupation"> Occupation </label>
                                    <input type="text" class="form-control" id="occupation" name="occupation" pattern="[a-zA-Z\s]+" disabled placeholder="Enter Occupation" tabindex="22">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="occ_detail"> Occupation Detail</label>
                                    <input type="text" class="form-control" id="occ_detail" name="occ_detail" disabled placeholder="Enter Occupation Detail " tabindex="23">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="occ_income"> Income</label>
                                    <input type="number" class="form-control" id="occ_income" name="occ_income" disabled placeholder="Enter Income" tabindex="24">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="occ_address"> Address </label>
                                    <input type="text" class="form-control" id="occ_address" name="occ_address" disabled placeholder="Enter Address" tabindex="25">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Area Confirmation</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="area_confirm">Area Confirm</label><span class="text-danger">*</span>
                                    <select type="text" class="form-control" id="area_confirm" name="area_confirm" disabled tabindex="26">
                                        <option value="">Select Area Confirm</option>
                                        <option value="1">Resident</option>
                                        <option value="2">Occupation</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="area">Area</label><span class="text-danger">*</span>
                                    <input type="hidden" id="area_edit">
                                    <select type="text" class="form-control" id="area" name="area" tabindex="27" disabled>
                                        <option value="">Select Area</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="line"> Line </label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="line" name="line" disabled placeholder="Enter line" tabindex="28">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Property Info

                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <table id="prop_info" class="custom-table">
                                        <thead>
                                            <tr>
                                                <th width="20">S.NO</th>
                                                <th>Property</th>
                                                <th>Property Detail</th>
                                                <th>Property Holder</th>
                                                <th>Relationship</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Bank Info
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <table id="bank_info" class="custom-table">
                                        <thead>
                                            <tr>
                                                <th width="20">S.No.</th>
                                                <th>Bank Name</th>
                                                <th>Branch Name</th>
                                                <th>Account Holder Name</th>
                                                <th>Account Number</th>
                                                <th>IFSC Code</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">KYC Info <span class="text-danger">*</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <table id="kyc_info" class="table custom-table">
                                        <thead>
                                            <tr>
                                                <th width="20">S.NO</th>
                                                <th>Proof Of</th>
                                                <th>Relationship</th>
                                                <th>Proof</th>
                                                <th>Proof Number</th>
                                                <th>Upload</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
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
    </form>
</div>

<!-- /////////////////////////////////////////////////////////////////// customer Profile END ////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////// Documentation Start ////////////////////////////////////////////////////////////////////// -->
<div id="document_content" style="display:none;">
    <div class="text-right">
        <button type="button" class="btn btn-primary" id="doc_back_btn"><span class="icon-arrow-left"></span>&nbsp; Back </button>
        <br><br>
    </div>
    <form id="documentation_form" name="documentation_form">
        <input type="hidden" id="customer_profile_id">
        <div class="row gutters">
            <div class="col-12">
                <!-- Signed Doc Info START -->
                <div class="card signed-div" style="display: none;">
                    <div class="card-header"> Signed Doc Info
                    </div>
                    <div class="card-body">

                        <div class="row">

                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group table-responsive">
                                    <table id="signDocResetTable" class="table custom-table">
                                        <thead>
                                            <tr>
                                                <th width="50"> S.No </th>
                                                <th> Doc Name </th>
                                                <th> Sign Type </th>
                                                <th> Relationship </th>
                                                <th> Count </th>
                                                <th> Upload </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <!-- Signed Doc Info END -->
                <!--- -------------------------------------- Cheque Info START ------------------------------- -->
                <div class="card cheque-div" style="display: none;">
                    <div class="card-header">
                        <div class="card-title">Cheque Info</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <table id="cheque_info_table" class="table custom-table">
                                        <thead>
                                            <tr>
                                                <th width="20">S.NO</th>
                                                <th>Holder Type</th>
                                                <th>Holder Name</th>
                                                <th>Relationship</th>
                                                <th>Bank Name</th>
                                                <th>Cheque Count</th>
                                                <th>Upload</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--- -------------------------------------- Cheque Info END ------------------------------- -->

                <!--- -------------------------------------- Document Info START ------------------------------- -->
                <div class="card doc_div" style="display: none;">
                    <div class="card-header">
                        <div class="card-title">Document Info
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <table id="document_info" class="table custom-table">
                                        <thead>
                                            <tr>
                                                <th width="20">S.NO</th>
                                                <th>Document Name</th>
                                                <th>Document Type</th>
                                                <th>Holder Name</th>
                                                <th>Relationship</th>
                                                <th>Upload</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--- -------------------------------------- Document Info END ------------------------------- -->

                <!--- -------------------------------------- Mortgage Info START ------------------------------- -->
                <div class="card mortgage-div" style="display: none;">
                    <div class="card-header">
                        <div class="card-title">Mortgage Info
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <table id="mortgage_info" class="table custom-table">
                                        <thead>
                                            <tr>
                                                <th width="20">S.No</th>
                                                <th>Property Holder Name</th>
                                                <th>Relationship</th>
                                                <th>Property Detail</th>
                                                <th>Mortgage Name</th>
                                                <th>Designation</th>
                                                <th>Mortgage Number</th>
                                                <th>Reg Office</th>
                                                <th>Mortgage Value</th>
                                                <th>Upload</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--- -------------------------------------- Mortgage Info END ------------------------------- -->

                <!--- -------------------------------------- Endorsement Info START ------------------------------- -->
                <div class="card endorsement-div" style="display: none;">
                    <div class="card-header">
                        <div class="card-title">Endorsement Info
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <table id="endorsement_info" class="table custom-table">
                                        <thead>
                                            <tr>
                                                <th width="20">S.NO</th>
                                                <th>Owner Name</th>
                                                <th>Relationship</th>
                                                <th>Vehicle Details</th>
                                                <th>Endorsement Name</th>
                                                <th>Key Original</th>
                                                <th>RC Original</th>
                                                <th>Upload</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--- -------------------------------------- Endorsement Info END ------------------------------- -->

                <!--- -------------------------------------- Gold Info START ------------------------------- -->
                <div class="card gold-div" style="display: none;">
                    <div class="card-header">
                        <div class="card-title">Gold Info
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <table id="gold_info" class="table custom-table">
                                        <thead>
                                            <tr>
                                                <th width="20">S.NO</th>
                                                <th>Gold Type</th>
                                                <th>Purity</th>
                                                <th>Weight</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--- -------------------------------------- Gold Info END ------------------------------- -->

            </div>
        </div>
    </form>


</div>

<!-- /////////////////////////////////////////////////////////////////// Documentation End ////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////// Loan CalCulation Start ////////////////////////////////////////////////////////////////////// -->
<div id="loan_content" style="display:none;">
    <div class="text-right">
        <button type="button" class="btn btn-primary" id="loan_back_btn"><span class="icon-arrow-left"></span>&nbsp; Back </button>
        <br><br>
    </div>
    <form id="loan_entry_loan_calculation" name="loan_entry_loan_calculation">
        <input type="hidden" id="loan_calculation_id">
        <input type="hidden" id="int_rate_upd">
        <input type="hidden" id="due_period_upd">
        <input type="hidden" id="doc_charge_upd">
        <input type="hidden" id="proc_fees_upd">

        <div class="row gutters">
            <div class="col-12">
                <!--- -------------------------------------- Loan Info ------------------------------- -->
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Loan Info</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="loan_id_calc"> Loan ID</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="loan_id_calc" name="loan_id_calc" disabled tabindex="1" value="LD" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="loan_category_calc"> Loan Category</label><span class="text-danger">*</span>
                                    <input type="hidden" id="loan_category_calc2">
                                    <select class="form-control" id="loan_category_calc" name="loan_category_calc" disabled tabindex="2">
                                        <option value="">Select Loan Category</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="category_info_calc">Category Info</label>
                                    <textarea class="form-control" id="category_info_calc" name="category_info_calc" disabled tabindex="3"></textarea>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="loan_amount_calc"> Loan Amount</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="loan_amount_calc" name="loan_amount_calc" disabled tabindex="4">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="profit_type_calc">Profit Type</label><span class="text-danger">*</span>
                                    <select class="form-control" id="profit_type_calc" name="profit_type_calc" disabled tabindex="5">
                                        <option value="">Select Profit Type</option>
                                        <option value="0">Calculation</option>
                                        <option value="1">Scheme</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--- -------------------------------------- Loan Info END ------------------------------- -->
                <!--- -------------------------------------- Calculation - Scheme START ------------------------------- -->
                <div class="card" id="profit_type_calc_scheme" style="display: none;">
                    <div class="card-header">
                        <div class="card-title calc_scheme_title">Calculation</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 calc" style="display:none">
                                <div class="form-group">
                                    <label for="due_method_calc">Due Method</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="due_method_calc" name="due_method_calc" disabled value="Monthly" tabindex="6" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 calc" style="display:none">
                                <div class="form-group">
                                    <label for="due_type_calc">Due Type</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="due_type_calc" name="due_type_calc" disabled tabindex="7" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 calc" style="display:none">
                                <div class="form-group">
                                    <label for="profit_method_calc">Profit Method</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="profit_method_calc" name="profit_method_calc" disabled tabindex="8" value="After Benefit" readonly>
                                </div>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 scheme" style="display:none">
                                <div class="form-group">
                                    <label for="scheme_due_method_calc">Due Method</label><span class="text-danger">*</span>
                                    <select class="form-control" id="scheme_due_method_calc" name="scheme_due_method_calc" disabled tabindex="6">
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
                                    <select class="form-control to_clear" id="scheme_day_calc" name="scheme_day_calc" disabled tabindex="7">
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
                                    <select class="form-control to_clear" id="scheme_name_calc" name="scheme_name_calc" disabled tabindex="8">
                                        <option value="">Select Scheme Name</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="interest_rate_calc">Interest Rate</label><span class="text-danger min-max-int">*</span><!-- Min and max intrest rate-->
                                    <input type="number" class="form-control to_clear" id="interest_rate_calc" name="interest_rate_calc" disabled tabindex="9">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="due_period_calc">Due Period</label><span class="text-danger min-max-due">*</span><!-- Min and max Profit Method-->
                                    <input type="number" class="form-control to_clear" id="due_period_calc" name="due_period_calc" disabled tabindex="10">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="doc_charge_calc">Document Charges</label><span class="text-danger min-max-doc">*</span><!-- Min and max Document charges-->
                                    <input type="number" class="form-control to_clear" id="doc_charge_calc" name="doc_charge_calc" disabled tabindex="11">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="processing_fees_calc">Processing Fees</label><span class="text-danger min-max-proc">*</span><!-- Min and max Processing fee-->
                                    <input type="number" class="form-control to_clear" id="processing_fees_calc" name="processing_fees_calc" disabled tabindex="12">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--- -------------------------------------- Calculation - Scheme END ------------------------------- -->

                <!--- -------------------------------------- Loan Calculate START ------------------------------- -->
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Loan Calculation</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="loan_amnt_calc">Loan Amount</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="loan_amnt_calc" name="loan_amnt_calc" tabindex="14" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="principal_amnt_calc">Principal Amount</label><span class="text-danger princ-diff">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="principal_amnt_calc" name="principal_amnt_calc" tabindex="15" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="interest_amnt_calc">Interest Amount</label><span class="text-danger int-diff">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="interest_amnt_calc" name="interest_amnt_calc" tabindex="16" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="total_amnt_calc">Total Amount</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="total_amnt_calc" name="total_amnt_calc" tabindex="17" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="due_amnt_calc">Due Amount</label><span class="text-danger due-diff">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="due_amnt_calc" name="due_amnt_calc" tabindex="18" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="doc_charge_calculate">Document Charges</label><span class="text-danger doc-diff">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="doc_charge_calculate" name="doc_charge_calculate" tabindex="19" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="processing_fees_calculate">Processing Fees</label><span class="text-danger proc-diff">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="processing_fees_calculate" name="processing_fees_calculate" tabindex="20" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="net_cash_calc">Net Cash</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control refresh_loan_calc" id="net_cash_calc" name="net_cash_calc" tabindex="21" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--- -------------------------------------- Loan Calculate END ------------------------------- -->

                <!--- -------------------------------------- Collection Info START ------------------------------- -->
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Collection Info</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="loan_date_calc">Loan date</label><span class="text-danger">*</span>
                                    <input type="date" class="form-control" id="loan_date_calc" name="loan_date_calc" tabindex="22" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="due_startdate_calc">Due Start Date</label><span class="text-danger">*</span>
                                    <input type="date" class="form-control" id="due_startdate_calc" name="due_startdate_calc" disabled tabindex="23">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="maturity_date_calc">Maturity Date</label><span class="text-danger">*</span>
                                    <input type="date" class="form-control" id="maturity_date_calc" name="maturity_date_calc" tabindex="24" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="collection_method">Collection Format</label>&nbsp;<span class="text-danger">*</span>
                                    <select type="text" class="form-control" id="collection_method" name="collection_method" disabled tabindex="45">
                                        <option value="">Select Collection Format</option>
                                        <option value="1">BySelf</option>
                                        <option value="2">On Spot</option>
                                        <option value="3">Cheque Collection</option>
                                        <option value="4">ECS</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--- -------------------------------------- Collection Info END ------------------------------- -->

                <!--- -------------------------------------- Other Info START ------------------------------- -->
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Other Info</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="referred_calc">Referred</label><span class="text-danger">*</span>
                                    <select class="form-control" id="referred_calc" name="referred_calc" disabled tabindex="25">
                                        <option value="">Select Referred</option>
                                        <option value="0">Yes</option>
                                        <option value="1">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="agent_id_calc">Agent ID</label><span class="text-danger">*</span>
                                    <select class="form-control" id="agent_id_calc" name="agent_id_calc" disabled tabindex="26">
                                        <option value="">Select Agent ID</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="agent_name_calc">Agent Name</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="agent_name_calc" name="agent_name_calc" tabindex="27" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--- -------------------------------------- Other Info END ------------------------------- -->
            </div>
        </div>
    </form>
</div>
<!-- /////////////////////////////////////////////////////////////////// Loan Calculation END ////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////// Loan History Start ////////////////////////////////////////////////////////////////////// -->
<div id="loan_history_content" style="display:none;">
    <div class="text-right">
        <button type="button" class="btn btn-primary" id="loan_his_back_btn"><span class="icon-arrow-left"></span>&nbsp; Back </button>
        <br><br>
    </div>
    <form id="history_form" name="history_form">
        <div class="row gutters">
            <div class="col-12">

                <div class="card ">
                    <div class="card-header"> Loan History
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <table id="loan_history_table" class="table custom-table">
                                    <thead>
                                        <tr>
                                            <th width="20">S.NO</th>
                                            <th>Loan ID</th>
                                            <th>Loan Category</th>
                                            <th>Agent</th>
                                            <th>Loan Date</th>
                                            <th>Loan Amount</th>
                                            <th>Closing Date</th>
                                            <th>Status</th>
                                            <th>Sub Status</th>
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
    </form>
</div>

<!-- /////////////////////////////////////////////////////////////////// Loan History End ////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////////////// Document History Start ////////////////////////////////////////////////////////////////////// -->
<div id="document_history_content" style="display:none;">
    <div class="text-right">
        <button type="button" class="btn btn-primary" id="doc_his_back_btn"><span class="icon-arrow-left"></span>&nbsp; Back </button>
        <br><br>
    </div>
    <div class="row gutters">
        <div class="col-12">

            <div class="card ">
                <div class="card-header"> Document History
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <table id="doc_history_table" class="table custom-table">
                                <thead>
                                    <tr>
                                        <th width="20">S.NO</th>
                                        <th>Loan ID</th>
                                        <th>Loan Category</th>
                                        <th>Agent</th>
                                        <th>Loan Date</th>
                                        <th>Loan Amount</th>
                                        <th>Closing Date</th>
                                        <th>Status</th>
                                        <th>Sub Status</th>
                                        <th>Document Status</th>
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

<!-- /////////////////////////////////////////////////////////////////// Document History End ////////////////////////////////////////////////////////////////////// -->

<!-- /////////////////////////////////////////////////////////////////// Due Chart Modal Start ////////////////////////////////////////////////////////////////////// -->
<div class="modal fade bd-example-modal-lg" id="due_chart_model" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg " role="document" style="max-width: 70% !important">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="dueChartTitle">Due Chart</h5>
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
                <div class="container-fluid">
                    <div class="row" id="penalty_chart_table_div">
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
            <div class="modal-body overflow-x-cls" id="fine_chart_table_div">
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

<!-- /////////////////////////////////////////////////////////////////// Fine Add Modal START ////////////////////////////////////////////////////////////// -->
<div class="modal fade" id="fine_form_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="myLargeModalLabel">Add Fine</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="closeFineChartModal()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                        <div class="form-group">
                            <label for="coll_date "> Date </label> <span class="required">&nbsp;*</span>
                            <input type="hidden" class="form-control" id="fine_cp_id" name="fine_cp_id">
                            <input type="text" class="form-control" id="fine_date" name="fine_date" readonly tabindex='1'>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                        <div class="form-group">
                            <label for="coll_purpose"> Purpose </label> <span class="required">&nbsp;*</span>
                            <input type="text" class="form-control" id="fine_purpose" name="fine_purpose" placeholder="Enter Purpose" onkeydown="return /[a-z ]/i.test(event.key)" tabindex='2'>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                        <div class="form-group">
                            <label for="coll_amnt"> Amount </label> <span class="required">&nbsp;*</span>
                            <input type="number" class="form-control" id="fine_Amnt" name="fine_Amnt" placeholder="Enter Amount" tabindex='3'>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-2 col-md-6 col-sm-4 col-12">
                        <button type="button" tabindex="4" name="fine_form_submit" id="fine_form_submit" class="btn btn-primary" style="margin-top: 19px;">Submit</button>
                    </div>
                </div>
                </br>
                <div>
                    <table id="fine_form_table" class="table custom-table">
                        <thead>
                            <tr>
                                <th width="15%"> S.No </th>
                                <th> Date </th>
                                <th> Purpose </th>
                                <th> Amount </th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeFineChartModal()">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- /////////////////////////////////////////////////////////////////// Fine Add Modal END ////////////////////////////////////////////////////////////////////// -->

<!------------------------------------------------------------------- New Commitment Modal Start ------------------------------------------------------------------------->

<div class="modal fade" id="add_commitment_info_modal" tabindex="1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Add Commitment Info</h5>
                <button type="button" class="close" data-dismiss="modal" tabindex="2" aria-label="Close" onclick="closeCommitmentModal()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <form id="commitment_form">
                        <input type="hidden" name="cp_id" id="cp_id">
                        <input type="hidden" name="comm_cus_id" id="comm_cus_id">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="disabledInput">Follow Up Date</label>
                                    <input type="text" class="form-control" name="follow_up_date" id="follow_up_date" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="follow_type">Follow Type</label><span class="text-danger">*</span>
                                    <select type="text" class="form-control" id="follow_type" name="follow_type">
                                        <option value=""> Select Follow Type</option>
                                        <option value="1">Direct</option>
                                        <option value="2">Mobile</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="follow_status">Follow Up status</label><span class="text-danger">*</span>
                                    <select type="text" class="form-control" id="follow_status" name="follow_status">
                                        <option value=""> Select Follow Up status</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 person-div" style="display:none">
                                <div class="form-group">
                                    <label for="follow_person_name">Follow Person Name</label><span class="text-danger">*</span>
                                    <select class="form-control" name="follow_person_name" id="follow_person_name" tabindex="2">
                                        <option value="">Select Follow Person Name</option>
                                        <option value="1">Customer</option>
                                        <option value="2">Guarantor</option>
                                        <option value="3">Family Member</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 person-div" id="fam_div" style="display:none">
                                <div class="form-group">
                                    <label for="person_name">Person Name</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="person_name" name="person_name" tabindex='26' readonly placeholder="Person Name">
                                    <select name="person_name1" id="person_name1" class='form-control' tabindex="1" style="display: none;"></select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 person-div" style="display:none">
                                <div class="form-group">
                                    <label for="fam_relationship">Relationship</label>
                                    <input type="text" class="form-control" name="fam_relationship" id="fam_relationship" tabindex="5" placeholder="Relationship" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 person-div" style="display:none">
                                <div class="form-group">
                                    <label for="commitment_date">Commitment Date</label><span class="text-danger">*</span>
                                    <input type="date" class="form-control" id="commitment_date" name="commitment_date" tabindex='26'>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="remark">Remark</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" name="remark" id="remark" placeholder="Enter Remark">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="user_type">User Type</label>
                                    <input class="form-control" name="user_type" id="user_type" placeholder="Enter user Type" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="user_name">User Name</label>
                                    <input class="form-control" name="user_name" id="user_name" placeholder="Enter User Name" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="hint">Hint</label><span class="text-danger">*</span>
                                    <input class="form-control" name="hint" id="hint" placeholder="Enter Hint">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="comm_err">Communication Status</label>
                                    <select class="form-control" name="comm_err" id="comm_err">
                                        <option value="">Select Communication Status</option>
                                        <option value="1">Error</option>
                                        <option value="2">Clear</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <button name="submit_commitment" id="submit_commitment" class="btn btn-primary" style="margin-top: 18px;"><span class="icon-check"></span>&nbsp;Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary closeModal" data-dismiss="modal" onclick="closeCommitmentModal()">Close</button>
            </div>
        </div>
    </div>
</div>

<!------------------------------------------------------------------- Commitement Info Modal End -------------------------------------------------------------------------->