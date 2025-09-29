<style>
    .img-show {
        border-radius: 50%;
        height: 150px;
        width: 150px;
        object-fit: cover;
        background-color: white;
        position: relative;
        top: -10px;
    }
    /* Target both search boxes */
#existing_list_table_search, 
#repromotion_list_table_search {
  padding: 7px 12px !important; /* more padding */
}
</style>
<div id="customer_data_content">
    <div class="radio-container promo-screen">
        <div class="selector">
            <div class="selector-item">
                <input type="radio" id="new_list" name="customer_data" class="selector-item_radio" value="new_list" checked>
                <label for="new_list" class="selector-item_label">New Promotion</label>
            </div>
            <div class="selector-item">
                <input type="radio" id="existing_list" name="customer_data" class="selector-item_radio" value="existing_list">
                <label for="existing_list" class="selector-item_label">Existing</label>
            </div>
            <div class="selector-item">
                <input type="radio" id="repromotion_list" name="customer_data" class="selector-item_radio" value="repromotion_list">
                <label for="repromotion_list" class="selector-item_label">Repromotion</label>
            </div>
        </div>
    </div>
    <br>
    <div class="card filter_card" style="display: none;">
        <div class="card-body">
            <div class="row">
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-12">
                    <div class="form-group">
                        <label for="follow_up_sts">Followup status</label>
                        <select class="form-control" name="follow_up_sts" id="follow_up_sts">
                            <option value="">Select Followup status</option>
                            <option value="tofollow">To Follow</option>
                            <option value="Interested">Interested</option>
                            <option value="NotInterested">Not Interested</option>
                        </select>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-12">
                    <div class="form-group">
                        <label for="date_type">Date</label>
                        <select class="form-control" name="date_type" id="date_type">
                            <option value="">Select Date</option>
                            <option value="1">Closed Date</option>
                            <option value="2">Followup Date</option>
                        </select>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-12">
                    <div class="form-group">
                        <label for="follow_up_fromdate">From Date</label>
                        <input type="date" class="form-control" name="follow_up_fromdate" id="follow_up_fromdate">
                    </div>
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-12">
                    <div class="form-group">
                        <label for="follow_up_todate">To Date</label>
                        <input type="date" class="form-control" name="follow_up_todate" id="follow_up_todate">
                    </div>
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-12" style="margin-top:20px">
                    <div class="form-group">
                        <button class="btn btn-primary" name="followup_search" id="followup_search">Search</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--New Promotion List Start-->
    <div class="card new_table_content">
        <div class="card-header">
            <div class="card-title">New Promotion List
                <button type="button" class="btn btn-primary" id="add_new" name="add_new" data-toggle="modal" data-target="#add_new_list_modal" style="padding: 5px 35px; float: right;" onclick="getUsermappedAreaName()"><span class="icon-add"></span></button>
            </div>
        </div>
        <div class="card-body">
            <div class="col-12">
                <table id="new_list_table" class="table custom-table">
                    <thead>
                        <tr>
                            <th>S.NO</th>
                            <th>Customer Name</th>
                            <th>Area</th>
                            <th>Mobile</th>
                            <th>Loan Category</th>
                            <th>Loan Amount</th>
                            <th>Action</th>
                            <th>Promotion Chart</th>
                            <th>Follow Date</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <!--New Promotion List End-->
    <!--Existing List Start-->
    <div class="card existing_table_content" style="display: none;">
        <div class="card-header">
            <div class="card-title">Existing List </div>
        </div>

        <div class="card-body">
            <div class="col-12">
                <table id="existing_list_table" class="table custom-table" data-id="existing">
                    <thead>
                        <tr>
                            <th width="20">S.NO</th>
                            <th>Customer ID</th>
                            <th>Aadhar Number</th>
                            <th>Customer Name</th>
                            <th>Mobile</th>
                            <th>Area</th>
                            <th>Line</th>
                            <th>Branch</th>
                            <th>Status</th>
                            <th>Sub Status</th>
                            <th>Closed Date</th>
                            <th>View</th>
                            <th>Action</th>
                            <th>Follow up status</th>
                            <th>Follow Date</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <!--Existing List End-->
    <!--Repromotion List Start-->
    <div class="card repromotion_table_content" style="display: none;">
        <div class="card-header">
            <div class="card-title">Repromotion List </div>
        </div>
        <div class="card-body">
            <div class="col-12">
                <table id="repromotion_list_table" class="table custom-table" data-id="repromotion">
                    <thead>
                        <tr>
                            <th width="20">S.NO</th>
                            <th>Customer ID</th>
                            <th>Aadhar Number</th>
                            <th>Customer Name</th>
                            <th>Mobile</th>
                            <th>Area</th>
                            <th>Line</th>
                            <th>Branch</th>
                            <th>Status</th>
                            <th>Sub Status</th>
                            <th>Customer Data</th>
                            <th>Closed Date</th>
                            <th>View</th>
                            <th>Action</th>
                            <th>Follow up status</th>
                            <th>Follow Date</th>

                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <!--Repromotion List End-->
</div><!-- Cusstomer Data Content END - New Promtion & existing -->
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
                                    <input type="text" class="form-control" id="occ_income" name="occ_income" disabled placeholder="Enter Income" tabindex="24">
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
<!--New Promotion Modal Start-->
<div class="modal fade" id="add_new_list_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg " role="document">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">New Promotion</h5>
                <button type="button" class="close" data-dismiss="modal" tabindex="1" onclick="getNewPromotionTable()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <form id="new_form">
                        <div class="row">
                            <input type="hidden" name="new_promotion_id" id='new_promotion_id'>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="cust_name">Customer Name</label><span class="text-danger">*</span>
                                    <input tye="text" class="form-control" name="cust_name" id="cust_name" tabindex="1" placeholder="Enter Customer Name">
                                    <input type="hidden" id="addcus_name_id" value='0'>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="cus_area">Area</label><span class="text-danger">*</span>
                                    <select type="text" class="form-control" id="cus_area" name="cus_area" tabindex="1">
                                        <option value="">Select Area</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="mobile">Mobile</label><span class="text-danger">*</span>
                                    <input type="number" class="form-control" name="mobile" id="mobile" onKeyPress="if(this.value.length==10) return false;" tabindex="1" placeholder="Enter Mobile Number">
                                    <input type="hidden" id="addmobile_id" value='0'>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="loan_cat">Loan Category</label><span class="text-danger">*</span>
                                    <input class="form-control" name="loan_cat" id="loan_cat" tabindex="1" placeholder=" Enter Loan category">
                                    <input type="hidden" id="addloan_id" value='0'>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="loan_amount">Loan Amount</label><span class="text-danger">*</span>
                                    <input type="number" class="form-control" name="loan_amount" id="loan_amount" tabindex="1" placeholder="Enter Loan amount">
                                    <input type="hidden" id="addamt_id" value='0'>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <button name="submit_new" id="submit_new" class="btn btn-primary" tabindex="1" style="margin-top: 18px;"><span class="icon-check"></span>&nbsp;Submit</button>
                                    <button type="reset" id="clear_new_form" class="btn btn-outline-secondary" style="margin-top: 18px;" tabindex="8">Clear</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal" onclick="getNewPromotionTable()" tabindex="1">Close</button>
            </div>
        </div>
    </div>
</div>
<!--New Promotion Modal End-->


<!-- Modal for promotion Chart just view table   -->
<div class="modal fade" id="promoChartModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg " role="document">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Promotion Chart</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">

                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 table-responsive" id='promoChartDiv'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal" tabindex="7">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal for Personal Info   -->
<div class="modal fade" id="personalInfoModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg " role="document">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Personal Info</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid row" id='personalInfoDiv'>


                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal" tabindex="7">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal for promotion add -->
<div class="modal fade" id="addPromotion" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg " role="document">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Add Promotion</h5>
                <button type="button" class="close closeModal" data-dismiss="modal" id="closeAddPromotionModal" tabindex="1" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <form id="doc_info_form">
                        <div class="row">
                            <input type="hidden" name="orgin_table" id="orgin_table"><!-- this is to reset the table contents -->
                            <input type="hidden" name="promo_cus_id" id="promo_cus_id">
                            <input type="hidden" name="promo_cusprofile_id" id="promo_cusprofile_id">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="promo_date">Date</label><span class="required">&nbsp;*</span>
                                    <input type="text" class='form-control' readonly name="promo_date" id="promo_date" tabindex="1">
                                </div>

                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="promo_status">Status</label><span class="required">&nbsp;*</span>
                                    <input type="text" name="promo_status" id="promo_status" class='form-control' placeholder="Enter Status" tabindex="2" readonly>
                                    <span class="text-danger" id='promo_statusCheck' style="display: none;">Please Enter Status</span>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="promo_label">Label</label><span class="required">&nbsp;*</span>
                                    <input type="text" name="promo_label" id="promo_label" class='form-control' placeholder="Enter Label" tabindex="3">
                                    <span class="text-danger" id='promo_labelCheck' style="display: none;">Please Enter Label </span>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="promo_remark">Remark</label><span class="required">&nbsp;*</span>
                                    <input type="text" name="promo_remark" id="promo_remark" class='form-control' placeholder="Enter Remark" tabindex="4">
                                    <span class="text-danger" id='promo_remarkCheck' style="display: none;">Please Enter Remark</span>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="promo_user_type">User Type</label><span class="required">&nbsp;*</span>
                                    <input type="text" name="promo_user_type" id="promo_user_type" class='form-control' tabindex="5" readonly>
                                    <span class="text-danger" id='promo_user_typeCheck' style="display: none;">Please Enter User Type </span>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="promo_user">User</label><span class="required">&nbsp;*</span>
                                    <input type="text" name="promo_user" id="promo_user" class='form-control' tabindex="6" readonly>
                                    <span class="text-danger" id='promo_userCheck' style="display: none;">Please Enter User </span>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="promo_fdate">Follow Date</label><span class="required">&nbsp;*</span>
                                    <input type="date" name="promo_fdate" id="promo_fdate" class='form-control' placeholder="Enter Follow Date" tabindex="7">
                                    <span class="text-danger" id='promo_fdateCheck' style="display: none;">Please Choose Follow Date </span>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <button name="sumit_add_promo" id="sumit_add_promo" class="btn btn-primary" tabindex="6" style="margin-top: 18px;"><span class="icon-check"></span>&nbsp;Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-secondary closeModal" data-dismiss="modal" tabindex="9">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- ------------------------------------------------------------ Document Info Modal END --------------------------------------------------------------- -->