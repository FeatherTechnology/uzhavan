<div class="row gutters">
    <div class="col-12">
          <div class="toggle-container col-12">
                <select class="toggle-button" name='line' id='line'>
                    <option value=''>Select Line</option>
                </select>
                <select class="toggle-button" name='loan_cat' id='loan_cat'>
                    <option value=''>Select Loan Category</option>
                </select>
                <input type="button" id='reset_btn' name='reset_btn' class="toggle-button" style="background-color: #333c61;color:white" value='Search'>
            </div> <br />
        <!-- Balance report Start -->
        <div class="card">
            <div class="card-body overflow-x-cls">
                <div class="col-12">
                    <table id="area_loan_count_report_table" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th colspan="15" id="Loan_category" style="font-size:14px;">
                                            Loan Category :
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Area</th>
                                        <th>Line</th>
                                        <th>Customer Count</th>
                                        <th>Loan Count</th>
                                        <th>Payable Zero Count</th>
                                        <th>Current</th>
                                        <th>Pending</th>
                                        <th>OD</th>
                                        <th>Error</th>
                                        <th>Legal</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                </div>
            </div>
        </div>
        <!--Balance report End-->
    </div>
</div>