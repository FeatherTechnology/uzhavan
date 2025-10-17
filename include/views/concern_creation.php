<!--Concern Creation List Start-->
<div class="text-right">
    <button type="button" class="btn btn-primary " id="add_concern"><span class="fa fa-plus"></span>&nbsp; Add Concern Creation</button>
    <button type="button" class="btn btn-primary" id="back_btn" style="display: none;"><span class="icon-arrow-left"></span>&nbsp; Back </button>
</div>
<br>
<div class="card concern_table_content">
    <div class="card-body">
        <div class="col-12">

            <table id="concern_create" class="table custom-table">
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>Concern Code</th>
                        <th>Concern Date</th>
                        <th>Branch Name</th>
                        <th>Subject</th>
                        <th>Assign To</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</div>
<!--Concern creation List End-->
<!--Concern Creation Start-->
<div id="concern_creation_content" style="display:none;">
    <form id="concern_creation" name="concern_creation" action="" method="post" enctype="multipart/form-data">
        <input type="hidden" id="concern_id">
        <div class="row gutters">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Concern Creation</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="raising_for">Raising For</label><span class="text-danger">*</span>
                                    <select type="text" class="form-control" id="raising_for" name="raising_for" tabindex="1">
                                        <option value="">Select Raising For</option>
                                        <option value="1">Customer</option>
                                        <option value="2">Staff</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 raise_cus" style="display: none;">
                                <div class="form-group">
                                    <label for="aadhar_num"> Aadhar Number</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" name="aadhar_num" id="aadhar_num" tabindex="2" maxlength="14" data-type="adhaar-number" placeholder="Enter Aadhar Number">
                                    <input type="hidden" id="aadhar_num_upd" name="aadhar_num_upd">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 raise_cus" style="display: none;">
                                <div class="form-group">
                                    <label for="auto_gen_cus_id"> Customer ID</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="auto_gen_cus_id" name="auto_gen_cus_id" tabindex="3" data-type="adhaar-number" readonly>
                                </div>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 raise_cus" style="display: none;">
                                <div class="form-group">
                                    <label for="cus_name"> Customer Name</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="cus_name" name="cus_name" pattern="[a-zA-Z\s]+" tabindex="4" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 raise_cus" style="display: none;">
                                <div class="form-group">
                                    <label for="area"> Area </label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="area" name="area" disabled tabindex="5" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 raise_cus" style="display: none;">
                                <div class="form-group">
                                    <label for="line"> Line </label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="line" name="line" disabled tabindex="6" readonly>
                                </div>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 raise_cus" style="display: none;">
                                <div class="form-group">
                                    <label for="mobile1"> Mobile Number</label><span class="text-danger">*</span>
                                    <input type="number" class="form-control" id="mobile1" name="mobile1" onKeyPress="if(this.value.length==10) return false;" tabindex="7" readonly>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 raise_staff" style="display: none;">
                                <div class="form-group">
                                    <label for="user_name">User Name</label><span class="text-danger">*</span>
                                    <select type="text" class="form-control" id="user_name" name="user_name" tabindex="8">
                                        <option value="">Select User Name</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Concern Assign</div>
                    </div>
                    <div class="card-body">
                        <div class="row">

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="con_code"> Concern Code</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="con_code" name="con_code" tabindex="9" readonly>
                                </div>
                            </div>

                              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="disabledInput">Concern Date</label>&nbsp;<span class="text-danger">*</span>
                                        <input type="text" readonly class="form-control" id="concern_date" name="concern_date" tabindex='10'>
                                    </div>
                                </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="concern_to">Concern To</label><span class="text-danger">*</span>
                                    <select type="text" class="form-control" id="concern_to" name="concern_to" tabindex="8">
                                        <option value="">Select Concern To</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="con_role"> Role</label>
                                    <input type="text" class="form-control" id="con_role" name="con_role"  tabindex="9" readonly>
                                </div>
                            </div>
                            <div class="col-sm-3 col-md-3 col-lg-3">
                                <div class="form-group">
                                    <label for="concern_subject">Concern Subject</label><span class="text-danger">*</span>
                                    <input type="hidden" id="sub_name_id">
                                    <select class="form-control" id="concern_subject" name="concern_subject" tabindex="10">
                                        <option value="">Select Concern Subject</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-1 col-md-1 col-lg-1 text-right" style="margin-top: 18px;">
                                <div class="form-group">
                                    <button type="button" class="btn btn-primary modalBtnCss" id = "add_subject_btn" data-toggle="modal" data-target="#add_subject_modal" tabindex="11" onclick="getConcernSubjectTable()"><span class="icon-add"></span></button>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                    <div class="form-group">
                                        <label for="con_remark">Concern Remark</label><span class="text-danger">*</span>
                                        <textarea class="form-control" name="con_remark" id="con_remark" placeholder="Enter Remark" tabindex="12"></textarea>
                                    </div>
                                </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="branch_name">Branch Name</label><span class="text-danger">*</span>
                                    <select type="text" class="form-control" id="branch_name" name="branch_name" tabindex="13">
                                        <option value="">Select Branch Name</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="assign_to">Assign To</label><span class="text-danger">*</span>
                                    <select type="text" class="form-control" id="assign_to" name="assign_to" tabindex="14">
                                        <option value="">Select Assign</option>
                                    </select>
                                </div>
                            </div>
                             <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                <div class="form-group">
                                    <label for="assign_role">Assign Role</label><span class="text-danger">*</span>
                                    <input type="text" class="form-control" id="assign_role" name="assign_role"  tabindex="15" readonly>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 submit_concern">
                <div class="text-right">

                    <button type="submit" name="submit_concern_creation" id="submit_concern_creation" class="btn btn-primary" value="Submit" tabindex="16"><span class="icon-check"></span>&nbsp;Submit</button>
                </div>
            </div>
        </div>
    </form>
</div>

<!-- /////////////////////////////////////////////////////////////////// Concern Subject Modal Start ////////////////////////////////////////////////////////////////////// -->
<div class="modal fade" id="add_subject_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg " role="document">
        <div class="modal-content" style="background-color: white">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Add Concern Subject</h5>
                <button type="button" class="close" data-dismiss="modal" tabindex="1" aria-label="Close" onclick="getConcernSubjectDropdown()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-3 col-md-3 col-lg-3"></div>
                        <div class="col-sm-4 col-md-4 col-lg-4">
                            <div class="form-group">
                                <label for="con_sub">Concern Subject</label><span class="text-danger">*</span>
                                <input class="form-control" name="con_sub" id="con_sub" tabindex="2" placeholder="Enter Concern Subject">
                                <input type="hidden" id="sub_id">
                            </div>
                        </div>
                        <div class="col-sm-4 col-md-4 col-lg-4">
                            <div class="form-group">
                                <button name="submit_subject" id="submit_subject" class="btn btn-primary" tabindex="3" style="margin-top: 18px;"><span class="icon-check"></span>&nbsp;Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <table id="con_sub_table" class="custom-table">
                            <thead>
                                <tr>
                                    <th width="20">S.No.</th>
                                    <th>Concern Subject</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody> </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal" tabindex="4" onclick="getConcernSubjectDropdown()">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- /////////////////////////////////////////////////////////////////// Concern Subject Modal END ////////////////////////////////////////////////////////////////////// -->