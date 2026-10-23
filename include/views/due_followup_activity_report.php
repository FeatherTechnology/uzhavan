<!-- Main container start -->
<style>
    .choices__inner {
        margin-top: 0px !important;
    }

    .choices__input {
        width: 200px !important;
    }

    .hidefield {
        display: none;
    }

    .reports_filter_card .choices {
        margin-bottom: 0px !important;
    }

    .reports_filter_card .choices__input {
        width: 200px !important;
    }
</style>

<div class="main-container">
    <!--form start-->
    <form id="commitment_report_form" name="commitment_report_form" action="" method="post" enctype="multipart/form-data">

        <div class="row gutters">
            <div class="toggle-container col-12 reports_filter_card">
                <input type="date" id='from_date' name='from_date' class="toggle-button" value=''>
                <input type="date" id='to_date' name='to_date' class="toggle-button" value=''>

                <select class="toggle-button" name='type' id='type'>
                    <option value=''>Select Type</option>
                    <option value='1'>User</option>
                    <option value='2'>Line</option>
                </select>

                <select class="toggle-button hidefield" id='by_user' name='by_user'>
                    <option value=''>Select User</option>
                </select>

                <select class="form-control hidefield" id="map_name" name="map_name" multiple>
                    <option value="">Select Line Name</option>
                </select>

                <input type="button" id='reset_btn' name='reset_btn' class="toggle-button" style="background-color: #333c61;color:white" value='Search'>
            </div>

            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="margin-top: 20px;">
                <div class="card">
                    <!-- Commitment Report   name changes to  Due Followup Activity-->
                    <div class="card-header">Due Followup Activity</div>
                    <div class="card-body">
                        <div id="commitment_table_div" class="table-divs" style="overflow-x: auto;">
                            <table id="commitment_report_table" class="table custom-table">
                                <thead>
                                    <th>S.No</th>
                                    <th>Aadhaar Number</th>
                                    <th>Customer ID</th>
                                    <th>Created Date</th>
                                    <th>Time</th>
                                    <th>Area</th>
                                    <th>Follow Type</th>
                                    <th>Follow Up Status</th>
                                    <th>Follow Person Type</th>
                                    <th>Person Name</th>
                                    <th>Relationship</th>
                                    <th>Remark</th>
                                    <th>Commitment Date</th>
                                    <th>User Type</th>
                                    <th>User Name</th>
                                    <th>Hint</th>
                                    <th>Communication Status</th>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </form>
</div>