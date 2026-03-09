<div class="row gutters">

    <div class="toggle-container dwnmrgn col-12">
         <select type="text" class="toggle-button" id='by_user' name='by_user'>
            <option value=''>Select User</option>
        </select>
        <input type="button" class="toggle-button" data-toggle='modal' data-target='#dayModal' value='Day Wise'>
        <input type="button" class="toggle-button" value='Today'>
    </div> <br>

    <!----------------------------- CARD START Hand Cash Balance Sheet ------------------------------>
    <div class="col-12">
        <div class="card balance_sheet">
            <div class="card-header">
                <h5 class="card-title">Hand Cash Balance Sheet</h5>
            </div>
            <div class="card-body">
                <div class="row">
                     <div class="col-1"></div>
                    <div class="col-10">
                        <div class="row">
                            <table id="balance_sheet_table" class="table custom-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th><b>Credit</b></th>
                                        <th><b>Debit</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><b>Opening Balance</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>Due Collection</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>Waiver</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>Investment</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>Deposit</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>EL</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>Exchange</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>Contra</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>Other Income</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>Total Loan Amount</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>Total Expenses</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>Closing Balance</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><b>Total</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-1"></div>
                </div>
            </div>
        </div>
    </div>
    <!----------------------------- CARD END Hand Balance Sheet ------------------------------>

   
</div>

<!-- Modal for Day Choose -->
<div class="modal fade" id="dayModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog " role="document">
		<div class="modal-content" style="background-color: white">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLongTitle">Day Wise</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="row container">
					<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						<label for="to_date">From Date</label>
						<input type="date" name="from_date" id="from_date" class='form-control'>
					</div>
					<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						<label for="to_date">To Date</label>
						<input type="date" name="to_date" id="to_date" class='form-control'>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" id='submitDaywise'>Submit</button>
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

