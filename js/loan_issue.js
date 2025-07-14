$(document).ready(function () {

    $('#back_btn').click(function () {
        swapTableAndCreation();
    });

    $(document).on('click', '.edit-loan-issue', function () {
        let id = $(this).attr('value'); //Customer Profile id From List page.
        $('#customer_profile_id').val(id);
        let cusID = $(this).attr('data-id'); //Cus id From List Page.
        $('#cus_id').val(cusID);
        swapTableAndCreation();
    });

    $(document).on('click', '.loan-issue-cancel', function () {
        let cus_sts_id = $(this).attr('value');
        let cus_sts = 13;
        $('#add_info_modal').modal('show');
        $('.modal_revoke').text('Cancel');
        $('#cus_sts_id').val(cus_sts_id);
        $('#customer_status').val(cus_sts);
        $('#remark').val('');
    });

    $(document).on('click', '.loan-issue-revoke', function () {
        let cus_sts_id = $(this).attr('value');
        let cus_sts = 14;
        $('#add_info_modal').modal('show');
        $('.modal_revoke').text('Revoke');
        $('#cus_sts_id').val(cus_sts_id);
        $('#customer_status').val(cus_sts);
        $('#remark').val('');
    });

    $(document).on('click', '#submit_remark', function () {
        event.preventDefault();
        let action = $('.modal_revoke').text().toLowerCase(); // Get action (cancel or revoke)
        let cus_sts_id = $('#cus_sts_id').val();
        let cus_sts = $('#customer_status').val();
        let remark = $('#remark').val();

        if (remark === '') {
            alert('Please enter a remark.');
            return;
        }

        submitForm(action, cus_sts_id, cus_sts, remark);
    });

    // <---------------------------------------------------------------- Calculate Button Start ------------------------------------------------------------>

    $('#refresh_cal').click(function () {
        $('.int-diff').text('*');
        $('.due-diff').text('*');
        $('.doc-diff').text('*');
        $('.proc-diff').text('*');
        $('.refresh_loan_calc').val('');

        let loan_amt = $('#loan_amount_calc').val().replace(/,/g, '');
        let int_rate = $('#interest_rate_calc').val();
        let due_period = $('#due_period_calc').val();
        let doc_charge = $('#doc_charge_calc').val();
        let proc_fee = $('#processing_fees_calc').val();
        let promet_method = $('#profit_method_calc').val();

        if (loan_amt != '' && int_rate != '' && due_period != '' && doc_charge != '' && proc_fee != '') {
            let due_type = $('#due_type_calc').val(); //If Changes not found in profit method, calculate loan amt for monthly basis
            if (due_type == 'Interest') {
                getLoanInterest(loan_amt, int_rate, doc_charge, proc_fee);

            } else if (due_type == 'EMI') {
                getLoanAfterInterest(loan_amt, int_rate, due_period, doc_charge, proc_fee);
            }

            let due_method_scheme = $('#scheme_due_method_calc').val();
            if (due_method_scheme == '1') {//Monthly scheme as 1
                if (promet_method == 'After Benefit') {
                    getLoanAfterBenifit(loan_amt, int_rate, due_period, doc_charge, proc_fee);
                } else {
                    getLoanMonthly(loan_amt, int_rate, due_period, doc_charge, proc_fee);
                }

            } else if (due_method_scheme == '2') {//Weekly scheme as 2
                if (promet_method == 'After Benefit') {
                    getLoanAfterBenifit(loan_amt, int_rate, due_period, doc_charge, proc_fee);
                } else {
                    getLoanWeekly(loan_amt, int_rate, due_period, doc_charge, proc_fee);
                }

            } else if (due_method_scheme == '3') {//Daily scheme as 3
                if (promet_method == 'After Benefit') {
                    getLoanAfterBenifit(loan_amt, int_rate, due_period, doc_charge, proc_fee);
                } else {
                    getLoanDaily(loan_amt, int_rate, due_period, doc_charge, proc_fee);
                }

            }
            changeInttoBen();
            checkBalance();
        }
    });

    // <---------------------------------------------------------------- Calculate Button End ------------------------------------------------------------>

    {
        // Get today's date
        var today = new Date().toISOString().split('T')[0];
        //Set loan date
        $('#issue_date').val(today);
    }

    $('#due_startdate_calc').change(function () {
        var due_start_from = $('#due_startdate_calc').val(); // get start date to calculate maturity date
        var due_period = parseInt($('#due_period_calc').val()); //get due period to calculate maturity date
        var profit_type = $('#profit_type_calc').val()
        if (profit_type == '0') { //Based on the profit method choose due method from input box
            var due_method = $('#due_method_calc').val()
        } else if (profit_type == '1') {
            var due_method = $('#scheme_due_method_calc').val()
        }

        if (due_period == '' || isNaN(due_period)) {
            swalError('Warning', 'Kindly Fill the Due Period field.');
            $(this).val('');
        } else {
            if (due_method == 'Monthly' || due_method == '1') { // if due method is monthly or 1(for scheme) then calculate maturity by month

                var maturityDate = moment(due_start_from, 'YYYY-MM-DD').add(due_period, 'months').subtract(1, 'month').format('YYYY-MM-DD');//subract one month because by default its showing extra one month
                $('#maturity_date_calc').val(maturityDate);

            } else if (due_method == '2') {//if Due method is weekly then calculate maturity by week

                var due_day = parseInt($('#scheme_day_calc').val());

                var momentStartDate = moment(due_start_from, 'YYYY-MM-DD').startOf('day').isoWeekday(due_day);//Create a moment.js object from the start date and set the day of the week to the due day value

                var weeksToAdd = Math.floor(due_period - 1);//Set the weeks to be added by giving due period. subract 1 because by default it taking extra 1 week

                momentStartDate.add(weeksToAdd, 'weeks'); //Add the calculated number of weeks to the start date.

                if (momentStartDate.isBefore(due_start_from)) {
                    momentStartDate.add(1, 'week'); //If the resulting maturity date is before the start date, add another week.
                }

                var maturityDate = momentStartDate.format('YYYY-MM-DD'); //Get the final maturity date as a formatted string.

                $('#maturity_date_calc').val(maturityDate);

            } else if (due_method == '3') {
                var momentStartDate = moment(due_start_from, 'YYYY-MM-DD').startOf('day');
                var daysToAdd = Math.floor(due_period - 1);
                momentStartDate.add(daysToAdd, 'days');
                var maturityDate = momentStartDate.format('YYYY-MM-DD');
                $('#maturity_date_calc').val(maturityDate);
            }
        }
    });

    $('#payment_type').change(function () {
        $('#payment_mode, #cash, #bank_names').css('border', '1px solid #cecece');

        $('#cash').removeAttr('readonly');
        $('.cash_issue').hide();
        $('#bank_container').hide(); // Hide bank section
        $('.balance_remark_container').hide();
        $('#balance_amount').val('');
        $('#payment_mode').val('');

    })

    // Payment Mode
    $('#payment_mode').change(function () {
        $('#payment_mode, #cash, #bank_names').css('border', '1px solid #cecece');

        var type = $(this).val();
        let paymentType = $('#payment_type').val();

        if (paymentType == '1') {  // Split Payment (Editable)

            $('#cash').attr('readonly', false);

            if (type == '1') {
                $('.balance_remark_container').show();
                $('#cash').val('');
                $('.cash_issue').show();
                $('#bank_container').hide();
                $('#balance_amount').val('');
                $('#bankInfo').hide();
                $('#finger_hide').show();

            } else if (type == '2') {
                $('#cash').val('');
                getBankName();
                $('.cash_issue').hide();
                $('#bank_container').show();
                $('.balance_remark_container').hide();
                $('#balance_amount').val('');
                $('#bankInfo').show();
                $('#finger_hide').hide();

            } else if (type == '3') {
                $('#cash').val('');
                getBankName();
                $('.cash_issue').hide();
                $('#bank_container').show();
                $('.balance_remark_container').hide();
                $('#balance_amount').val('');
                $('#bankInfo').show();
                $('#finger_hide').hide();
            }
            else {
                $('.cash_issue').hide();
                $('#bank_container').hide();//hide bank id
                $('#finger_hide').hide();
            }
        } else if (paymentType == '2') {  // Single Payment (Read-only)

            $('#cash').attr('readonly', true);

            var netcash = $('#balance_net_cash').val();

            if (type == '1') {
                $('#cash').val(netcash);
                $('.cash_issue').show();
                $('#bank_container').hide();
                $('#bankInfo').hide();
                $('#finger_hide').show();

            } else if (type == '2') {
                $('#cash').val('');
                getBankName();
                $('.cash_issue').hide();
                $('#bank_container').show();
                $('#bankInfo').show();
                $('#finger_hide').hide();

            } else if (type == '3') {
                $('#cash').val('');
                getBankName();
                $('.cash_issue').hide();
                $('#bank_container').show();
                $('#bankInfo').show();
                $('#finger_hide').hide();
            }
            else {
                $('.cash_issue').hide();
                $('#bank_container').hide();//hide bank id
                $('#finger_hide').hide();

            }
        }
    });

    $('#cash').on('input', function () {
        // Remove commas first, then parse to float
        let settle_balance = parseFloat($('#balance_net_cash').val().replace(/,/g, '')) || 0; // Convert to float, default to 0 if empty
        let payment_type = $('#payment_type').val();
        let cash_amount = parseFloat($('#cash').val().replace(/,/g, '')) || 0; // Convert to float, default to 0 if empty
        if (payment_type == '1') { // Split Payment
            var totalAmount = cash_amount;
            calculateBalance();
            // Compare totalAmount with settle_balance
            if (totalAmount > settle_balance) {
                swalError('Warning', 'The entered amount exceeds the Net Cash Balance.');
                $('#cash').val('');
                $('#balance_amount').val(0);
            }
        }
    });

    // <--------------------------------------------------------------------- Bank Info Start ----------------------------------------------------------------------->

    $('#submit_bank').click(function () {
        event.preventDefault();
        //Validation
        let cus_profile_id = $('#customer_profile_id').val();
        let cus_id = $('#cus_id').val();
        let bank_name = $('#bank_name').val();
        let branch_name = $('#branch_name').val();
        let acc_holder_name = $('#acc_holder_name').val();
        let acc_number = $('#acc_number').val();
        let ifsc_code = $('#ifsc_code').val();
        let bank_id = $('#bank_id').val();

        var data = ['bank_name', 'branch_name', 'acc_holder_name', 'acc_number', 'ifsc_code']
        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });

        if (isValid) {
            $.post('api/loan_entry/submit_bank.php', { cus_id, bank_name, branch_name, acc_holder_name, acc_number, ifsc_code, bank_id, cus_profile_id }, function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'Bank Info Added Successfully!');
                } else {
                    swalSuccess('Success', 'Bank Info Updated Successfully!')
                }
                getBankTable();
            });
        }
    })

    $(document).on('click', '.bankActionBtn', function () {
        var id = $(this).attr('value'); // Get value attribute
        $.post('api/loan_entry/bank_creation_data.php', { id: id }, function (response) {
            $('#bank_id').val(id);
            $('#bank_name').val(response[0].bank_name);
            $('#branch_name').val(response[0].branch_name);
            $('#acc_holder_name').val(response[0].acc_holder_name);
            $('#acc_number').val(response[0].acc_number);
            $('#ifsc_code').val(response[0].ifsc_code);
        }, 'json');
    });

    $(document).on('click', '.bankDeleteBtn', function () {
        var id = $(this).attr('value');
        swalConfirm('Delete', 'Do you want to Delete the Bank Details?', getBankDelete, id);
        return;
    });

    $(document).on('change', '.bank_update', function () {
        let id = $(this).val(); // Get the ID of the current row
        let cusid = $('#cus_id').val();
        let issue_status = 0;

        // If the current checkbox is checked
        if ($(this).is(':checked')) {
            issue_status = 2; // Checked, set status to 2
            // Disable all other checkboxes except the current one
            $('#bank_info').find('input[type="checkbox"]').not(this).prop('disabled', true);
        } else {
            issue_status = 1; // Unchecked, set status to 1
            // Enable all checkboxes again
            $('#bank_info').find('input[type="checkbox"]').prop('disabled', false);
        }

        // AJAX request to update the issue_status
        $.ajax({
            url: 'api/loan_issue_files/update_Bank_Status.php',
            type: 'POST',
            data: { cusid: cusid, id: id, issue_status: issue_status },
            dataType: 'json',
            cache: false,
            success: function (response) {
            }
        });

    });

    // <--------------------------------------------------------------------- Bank Info END ----------------------------------------------------------------------->

    $('#issue_person').change(function () { //Select Guarantor Name relationship will show in input.

        let id = $('#issue_person :selected').attr('data-val');
        if (id != '' && id != 'Customer') {
            getRelationship(id, '#issue_relationship');
        } else if (id == 'Customer') {
            $('#issue_relationship').val('Customer');
        } else {
            $('#issue_relationship').val('');
        }

        let adhaar_cus = $('#issue_person').val();
        $('#cash_guarantor').hide();
        $('#compare_finger').val('')

        $.ajax({
            url: 'api/loan_issue_files/get_finger_print.php',
            type: 'POST',
            data: { "adhaar_cus": adhaar_cus, },
            dataType: 'json',
            cache: false,
            success: function (result) {

                $("#compare_finger").val(result['fpTemplate']);
                if (result['hand'] == '1') {
                    $('.scanBtn').removeAttr('disabled');
                    var hand = "Put Your Left Thumb"
                } else if (result['hand'] == '2') {
                    $('.scanBtn').removeAttr('disabled');
                    var hand = "Put Your Right Thumb"
                } else {
                    var hand = "Finger Print Not Registered";
                    $('.scanBtn').attr('disabled', true);
                }
                $("#hand_type").text(hand).attr('class', 'text-danger');

            }
        });

    });

    $('.scanBtn').click(function () {
        var issue_person = $('#issue_person').val();

        if (issue_person != '') {

            $(this).attr('disabled', true);
            showOverlay();//loader start

            setTimeout(() => { //Set Timeout, because loadin animation will be intrupped by this capture event
                var quality = 60; //(1 to 100) (recommended minimum 55)
                var timeout = 10; // seconds (minimum=10(recommended), maximum=60, unlimited=0)
                var res = CaptureFinger(quality, timeout);
                if (res.httpStaus) {
                    if (res.data.ErrorCode == "0") {
                        $('#ack_fingerprint').val(res.data.AnsiTemplate); // Take ansi template that is the unique id which is passed by sensor
                    }//Error codes and alerts below
                    else if (res.data.ErrorCode == -1307) {
                        alert('Connect Your Device');
                        $(this).removeAttr('disabled');
                    } else if (res.data.ErrorCode == -1140 || res.data.ErrorCode == 700) {
                        alert('Timeout');
                        $(this).removeAttr('disabled');
                    } else if (res.data.ErrorCode == 720) {
                        alert('Reconnect Device');
                        $(this).removeAttr('disabled');
                    } else if (res.data.ErrorCode == 730) {
                        alert('Capture Finger Again');
                        $(this).removeAttr('disabled');
                    } else {
                        alert('Error Code:' + res.data.ErrorCode);
                        $(this).removeAttr('disabled');
                    }
                }
                else {
                    alert(res.err);
                }

                //Verify the finger is matched with member name
                var compare_finger = $('#compare_finger').val()
                var ack_fingerprint = $('#ack_fingerprint').val()
                var res = VerifyFinger(compare_finger, ack_fingerprint)
                if (res.httpStaus) {
                    if (res.data.Status) {
                        Swal.fire({
                            title: 'Fingerprint Matching',
                            icon: 'success',
                            showConfirmButton: true,
                            confirmButtonColor: '#009688'
                        });
                        $('#fingerValidation').val('1');
                        $("#hand_type").text('Done').attr('class', 'text-success');
                    } else {
                        if (res.data.ErrorCode != "0") {
                            alert(res.data.ErrorDescription);
                        }
                        else {
                            Swal.fire({
                                title: 'Fingerprint Not Matching',
                                icon: 'error',
                                showConfirmButton: true,
                                confirmButtonColor: '#009688'
                            });
                            $(this).removeAttr('disabled');
                        }
                    }
                } else {
                    alert(res.err)
                }

                hideOverlay();//loader stop

            }, 700) //Timeout End

        } else {//If End
            $('#cash_guarantor').show();
        }

    });

    $('#submit_loan_issue').click(function (event) {
        event.preventDefault();
        let loanIssue = {
            'cus_id': $('#cus_id').val(),
            'cus_profile_id': $('#customer_profile_id').val(),
            'loan_amnt': $('#loan_amount_calc').val().replace(/,/g, ''),
            'interest_rate_calc': $('#interest_rate_calc').val(),
            'due_period_calc': $('#due_period_calc').val(),
            'doc_charge_calc': $('#doc_charge_calc').val(),
            'processing_fees_calc': $('#processing_fees_calc').val(),
            'principal_amnt_calc': $('#principal_amnt_calc').val().replace(/,/g, ''),
            'interest_amnt_calc': $('#interest_amnt_calc').val().replace(/,/g, ''),
            'total_amnt_calc': $('#total_amnt_calc').val().replace(/,/g, ''),
            'due_amnt_calc': $('#due_amnt_calc').val().replace(/,/g, ''),
            'doc_charge_calculate': $('#doc_charge_calculate').val().replace(/,/g, ''),
            'processing_fees_calculate': $('#processing_fees_calculate').val().replace(/,/g, ''),
            'net_cash_calc': $('#net_cash_calc').val().replace(/,/g, ''),
            'due_startdate': $('#due_startdate_calc').val(),
            'maturity_date': $('#maturity_date_calc').val(),
            'bal_net_cash': $('#balance_net_cash').val().replace(/,/g, ''),
            'bal_amount': $('#balance_amount').val().replace(/,/g, ''),
            'payment_type': $('#payment_type').val(),
            'cash': $('#cash').val().replace(/,/g, ''),
            'bank_names': $('#bank_names').val(),
            'payment_mode': $('#payment_mode').val(),
            'issue_date': $('#issue_date').val(),
            'issue_person': $('#issue_person option:selected').text(),
            'issue_relationship': $('#issue_relationship').val(),
        }

        if (loanIssue.payment_mode === "2" || loanIssue.payment_mode === "3") {
            if (!isAnyCheckboxChecked()) {
                swalError('Warning', 'Please select Bank Info.');
                return; // Prevent submission
            }
        }

        if (isFormDataValid(loanIssue)) {
            $.post('api/loan_issue_files/submit_loan_issue.php', loanIssue, function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'Loan Issued Successfully');
                    swapTableAndCreation();
                    getLoanIssueTable();
                } else {
                    swalError('Warning', 'Loan Issue Failed.');
                }
            });
        }

    });

}); // <-------------------------------------------------------------------------- Document END ------------------------------------------------------------------------------->

// <---------------------------------------------------------------------------- Function Start ------------------------------------------------------------------------------->

//On Load function 
$(function () {
    getLoanIssueTable();
});

function getLoanIssueTable() {
    serverSideTable('#loan_issue_table', '', 'api/loan_issue_files/loan_issue_list.php');
}

function moveToNext(cus_sts_id, cus_sts) {
    $.post('api/common_files/move_to_next.php', { cus_sts_id, cus_sts }, function (response) {
        if (response == '0') {
            let alertName;
            if (cus_sts == '13') {
                alertName = 'Cancelled Successfully';
            }
            else if (cus_sts == '14') {
                alertName = 'Revoked Successfully';
            }
            swalSuccess('Success', alertName);
            getLoanIssueTable();
        } else {
            swalError('Alert', 'Failed To Move');
        }
    }, 'json');
}

function submitForm(action, cus_sts_id, cus_sts, remark) {
    $.post('api/common_files/update_status.php', { cus_sts_id, remark, cus_sts }, function (response) {
        if (response == '0') {
            $('#add_info_modal').modal('hide');
            moveToNext(cus_sts_id, cus_sts);
        } else {
            swalError('Alert', 'Failed to ' + action);
        }
    }, 'json');
}

function closeRemarkModal() {
    $('#add_info_modal').modal('hide');
}

function swapTableAndCreation() {
    if ($('.loanissue_table_content').is(':visible')) {
        $('.loanissue_table_content').hide();
        $('#loan_issue_content').show();
        $('#back_btn').show();
        callLoanCaculationFunctions();

    } else {
        $('.loanissue_table_content').show();
        $('#loan_issue_content').hide();
        $('#back_btn').hide();
        refreshIssueInfo();
    }
}

async function callLoanCaculationFunctions() {
    await personalInfo();          // Wait for this to complete
    getBankInfoTable();           // Independent
    await checkBalance();         // Must be after personalInfo
}

function personalInfo() {
    return new Promise((resolve, reject) => {
        let id = $('#customer_profile_id').val();

        $.post('api/loan_issue_files/loan_issue_data.php', { id }, function (response) {
            $('#aadhar_nums').val(response[0].aadhar_num);
            $('#cus_id').val(response[0].cus_id);
            $('#cus_name').val(response[0].cus_name);
            $('#cus_data').val(response[0].cus_data);
            $('#mobile1').val(response[0].mobile1);
            $('#cus_area').val(response[0].areaname);
            $('#loan_id_calc').val(response[0].loan_id);
            $('#loan_category_calc').val(response[0].loan_category);
            $('#category_info_calc').val(response[0].category_info);
            $('#loan_amount_calc').val(moneyFormatIndia(response[0].loan_amnt));
            $('#profit_type_calc').val(response[0].profit_type);
            $('#due_method_calc').val(response[0].due_method);
            $('#scheme_due_method_calc').val(response[0].scheme_due_method);
            $('#scheme_name_edit').val(response[0].scheme_name);
            $('#scheme_day_calc').val(response[0].scheme_day);
            $('#due_type_calc').val(response[0].due_type);
            $('#profit_method_calc').val(response[0].profit_method);
            $('#int_rate_upd').val(response[0].interest_rate);
            $('#due_period_upd').val(response[0].due_period);
            $('#doc_charge_upd').val(response[0].doc_charge);
            $('#proc_fees_upd').val(response[0].processing_fees);
            $('#principal_amnt_calc').val(moneyFormatIndia(response[0].principal_amnt));
            $('#interest_amnt_calc').val(moneyFormatIndia(response[0].interest_amnt));
            $('#total_amnt_calc').val(moneyFormatIndia(response[0].total_amnt));
            $('#due_amnt_calc').val(moneyFormatIndia(response[0].due_amnt));
            $('#doc_charge_calculate').val(moneyFormatIndia(response[0].doc_charge_calculate));
            $('#processing_fees_calculate').val(moneyFormatIndia(response[0].processing_fees_calculate));
            $('#net_cash_calc').val(moneyFormatIndia(response[0].net_cash));
            $('#loan_date_calc').val(response[0].loan_date);
            $('#due_startdate_calc').val(response[0].due_startdate);
            $('#maturity_date_calc').val(response[0].maturity_date);
            $('#aadhar_num').val(response[0].aadhar_num);
            getIssuePerson(response[0].cus_name);
            $('#due_startdate_calc').attr('min', response[0].loan_date);

            if (response[0].cus_data == 'Existing') {
                $('#loan_count_div').show();
                let cus_id = response[0].cus_id; // Add this line
                getLoanCount(cus_id);
            } else {
                $('#loan_count_div').hide();
            }

            let path = "uploads/loan_entry/cus_pic/";
            $('#per_pic').val(response[0].pic);
            var img = $('#imgshow');
            img.attr('src', path + response[0].pic);

            $('.calc_scheme_title').text((response[0].profit_type == '0') ? 'Calculation' : 'Scheme');
            $('#profit_type_calc_scheme').show();

            if (response[0].profit_type == '0') { // Loan Calculation
                $('.calc').show();
                $('.scheme').hide();
                $('.scheme_day').hide();
                getLoanCatDetails(response[0].loan_category_id, 2);
            } else if (response[0].profit_type == '1') { // Scheme
                dueMethodScheme(response[0].scheme_due_method, response[0].loan_category_id)
                $('.calc').hide();
                $('.scheme').show();
                schemeCalAjax(response[0].scheme_name);

                if (response[0].scheme_due_method == '2') {
                    $('.scheme_day').show();
                } else {
                    $('.scheme_day').hide();
                    $('.scheme_day_calc').val('');
                }
            }

            $('#bankInfo').hide();
            resolve(); // Resolve after everything is done
        }, 'json').fail(() => reject());
    });
}

function dueMethodScheme(schemeDueMethod, loanCatId) {
    $.post('api/common_files/get_due_method_scheme.php', { schemeDueMethod, loanCatId }, function (response) {
        clearCalcSchemeFields('1') //to clear fields.
        let appendSchemeNameOption = '';
        appendSchemeNameOption += '<option value="">Select Scheme Name</option>';
        $.each(response, function (index, val) {
            let selected = '';
            let scheme_edit_it = $('#scheme_name_edit').val();
            if (val.id == scheme_edit_it) {
                selected = 'selected';
            }
            appendSchemeNameOption += '<option value="' + val.id + '" ' + selected + '>' + val.scheme_name + '</option>';
        });
        $('#scheme_name_calc').empty().append(appendSchemeNameOption);
    }, 'json');

    if (schemeDueMethod == '2') {
        $('.scheme_day').show();
    } else {
        $('.scheme_day').hide();
        $('.scheme_day_calc').val('');
    }
}

// /To Get Loan Calculation for Interest due type
function getLoanInterest(loan_amt, int_rate, doc_charge, proc_fee) {

    $('#loan_amount_calc').val(parseInt(loan_amt).toFixed(0)); //get loan amt from loan info card
    $('#principal_amnt_calc').val(parseInt(loan_amt).toFixed(0));

    $('#total_amnt_calc').val('');
    $('#due_amnt_calc').val('');//Due period will be monthly by default so no need of due amt

    var int_amt = (parseInt(loan_amt) * (parseFloat(int_rate) / 100)).toFixed(0); //Calculate interest rate 

    var roundedInterest = Math.ceil(int_amt / 5) * 5;
    if (roundedInterest < int_amt) {
        roundedInterest += 5;
    }
    $('.int-diff').text('* (Difference: +' + parseInt(roundedInterest - int_amt) + ')'); //To show the difference amount
    $('#interest_amnt_calc').val(parseInt(roundedInterest));

    var doc_charge = parseInt(loan_amt) * (parseFloat(doc_charge) / 100); //Get document charge from loan info and multiply with loan amt to get actual doc charge
    var roundeddoccharge = Math.ceil(doc_charge / 5) * 5; //to increase document charge to nearest multiple of 5
    if (roundeddoccharge < doc_charge) {
        roundeddoccharge += 5;
    }
    $('.doc-diff').text('* (Difference: +' + parseInt(roundeddoccharge - doc_charge) + ')'); //To show the difference amount from old to new
    $('#doc_charge_calculate').val(parseInt(roundeddoccharge));

    var proc_fee = parseInt(loan_amt) * (parseFloat(proc_fee) / 100);//Get processing fee from loan info and multiply with loan amt to get actual proc fee
    var roundeprocfee = Math.ceil(proc_fee / 5) * 5; //to increase Processing fee to nearest multiple of 5
    if (roundeprocfee < proc_fee) {
        roundeprocfee += 5;
    }
    $('.proc-diff').text('* (Difference: +' + parseInt(roundeprocfee - proc_fee) + ')'); //To show the difference amount from old to new
    $('#processing_fees_calculate').val(parseInt(roundeprocfee));

    var net_cash = parseInt(loan_amt) - parseInt(doc_charge) - parseInt(proc_fee); //Net cash will be calculated by subracting other charges
    $('#net_cash_calc').val(parseInt(net_cash).toFixed(0));
}

//To Get Loan Calculation for After Interest
function getLoanAfterInterest(loan_amt, int_rate, due_period, doc_charge, proc_fee) {
    $('#loan_amount_calc').val(moneyFormatIndia(parseInt(loan_amt).toFixed(0))); //get loan amt from loan info card
    $('#principal_amnt_calc').val(moneyFormatIndia(parseInt(loan_amt).toFixed(0))); // principal amt as same as loan amt for after interest

    var interest_rate = (parseInt(loan_amt) * (parseFloat(int_rate) / 100) * parseInt(due_period)).toFixed(0); //Calculate interest rate 
    $('#interest_amnt_calc').val(moneyFormatIndia(parseInt(interest_rate)));

    var tot_amt = parseInt(loan_amt) + parseFloat(interest_rate); //Calculate total amount from principal/loan amt and interest rate
    $('#total_amnt_calc').val(moneyFormatIndia(parseInt(tot_amt).toFixed(0)));

    var due_amt = parseInt(tot_amt) / parseInt(due_period);//To calculate due amt by dividing total amount and due period given on loan info
    var roundDue = Math.ceil(due_amt / 5) * 5; //to increase Due Amt to nearest multiple of 5
    if (roundDue < due_amt) {
        roundDue += 5;
    }

    $('.due-diff').text('* (Difference: +' + parseInt(roundDue - due_amt) + ')'); //To show the difference amount
    $('#due_amnt_calc').val(moneyFormatIndia(parseInt(roundDue).toFixed(0)));

    ////////////////////recalculation of total, principal, interest///////////////////
    var new_tot = parseInt(roundDue) * due_period;
    $('#total_amnt_calc').val(moneyFormatIndia(new_tot))

    //to get new interest rate using round due amt 
    let new_int = (roundDue * due_period) - loan_amt;
    var roundedInterest = Math.ceil(new_int / 5) * 5;
    if (roundedInterest < new_int) {
        roundedInterest += 5;
    }

    $('.int-diff').text('* (Difference: +' + parseInt(roundedInterest - interest_rate) + ')'); //To show the difference amount from old to new
    $('#interest_amnt_calc').val(moneyFormatIndia(parseInt(roundedInterest)));

    var new_princ = parseInt(new_tot) - parseInt(roundedInterest);
    $('#principal_amnt_calc').val(moneyFormatIndia(new_princ));

    var doc_charge = parseInt(loan_amt) * (parseFloat(doc_charge) / 100); //Get document charge from loan info and multiply with loan amt to get actual doc charge
    var roundeddoccharge = Math.ceil(doc_charge / 5) * 5; //to increase document charge to nearest multiple of 5
    if (roundeddoccharge < doc_charge) {
        roundeddoccharge += 5;
    }

    $('.doc-diff').text('* (Difference: +' + parseInt(roundeddoccharge - doc_charge) + ')'); //To show the difference amount from old to new
    $('#doc_charge_calculate').val(moneyFormatIndia(parseInt(roundeddoccharge)));

    var proc_fee = parseInt(loan_amt) * (parseFloat(proc_fee) / 100);//Get processing fee from loan info and multiply with loan amt to get actual proc fee
    var roundeprocfee = Math.ceil(proc_fee / 5) * 5; //to increase Processing fee to nearest multiple of 5
    if (roundeprocfee < proc_fee) {
        roundeprocfee += 5;
    }

    $('.proc-diff').text('* (Difference: +' + parseInt(roundeprocfee - proc_fee) + ')'); //To show the difference amount from old to new
    $('#processing_fees_calculate').val(moneyFormatIndia(parseInt(roundeprocfee)));

    var net_cash = parseInt(loan_amt) - parseFloat(roundeddoccharge) - parseFloat(roundeprocfee); //Net cash will be calculated by subracting other charges
    $('#net_cash_calc').val(moneyFormatIndia(parseInt(net_cash).toFixed(0)));
}

function getLoanAfterBenifit(loan_amt, int_rate, due_period, doc_charge, proc_fee) {

    $('#loan_amount_calc').val(moneyFormatIndia(parseInt(loan_amt).toFixed(0))); //get loan amt from loan info card
    $('#principal_amnt_calc').val(moneyFormatIndia(parseInt(loan_amt).toFixed(0))); // principal amt as same as loan amt for after interest

    var interest_rate = (parseInt(loan_amt) * (parseFloat(int_rate) / 100) * parseInt(due_period)).toFixed(0); //Calculate interest rate 
    $('#interest_amnt_calc').val(moneyFormatIndia(parseInt(interest_rate)));

    var tot_amt = parseInt(loan_amt) + parseFloat(interest_rate); //Calculate total amount from principal/loan amt and interest rate
    $('#total_amnt_calc').val(moneyFormatIndia(parseInt(tot_amt).toFixed(0)));

    var due_amt = parseInt(tot_amt) / parseInt(due_period);//To calculate due amt by dividing total amount and due period given on loan info
    var roundDue = Math.ceil(due_amt / 5) * 5; //to increase Due Amt to nearest multiple of 5
    if (roundDue < due_amt) {
        roundDue += 5;
    }

    $('.due-diff').text('* (Difference: +' + parseInt(roundDue - due_amt) + ')'); //To show the difference amount
    $('#due_amnt_calc').val(moneyFormatIndia(parseInt(roundDue).toFixed(0)));

    ////////////////////recalculation of total, principal, interest///////////////////
    var new_tot = parseInt(roundDue) * due_period;
    $('#total_amnt_calc').val(moneyFormatIndia(new_tot))

    //to get new interest rate using round due amt 
    let new_int = (roundDue * due_period) - loan_amt;
    var roundedInterest = Math.ceil(new_int / 5) * 5;
    if (roundedInterest < new_int) {
        roundedInterest += 5;
    }

    $('.int-diff').text('* (Difference: +' + parseInt(roundedInterest - interest_rate) + ')'); //To show the difference amount from old to new
    $('#interest_amnt_calc').val(moneyFormatIndia(parseInt(roundedInterest)));

    var new_princ = parseInt(new_tot) - parseInt(roundedInterest);
    $('#principal_amnt_calc').val(moneyFormatIndia(new_princ));

    var doc_type = $('.min-max-doc').text(); //Scheme may have document charge in rupees or percentage . so getting symbol from span
    if (doc_type.includes('₹')) {
        var doc_charge = parseInt(doc_charge); //Get document charge from loan info and directly show the document charge provided because of it is in rupees
    } else if (doc_type.includes('%')) {
        var doc_charge = parseInt(loan_amt) * (parseFloat(doc_charge) / 100); //Get document charge from loan info and multiply with loan amt to get actual doc charge
    }

    var roundeddoccharge = Math.ceil(doc_charge / 5) * 5; //to increase document charge to nearest multiple of 5
    if (roundeddoccharge < doc_charge) {
        roundeddoccharge += 5;
    }

    $('.doc-diff').text('* (Difference: +' + parseInt(roundeddoccharge - doc_charge) + ')'); //To show the difference amount from old to new
    $('#doc_charge_calculate').val(moneyFormatIndia(parseInt(roundeddoccharge)));

    var proc_type = $('.min-max-proc').text(); //Scheme may have Processing fee in rupees or percentage . so getting symbol from span
    if (proc_type.includes('₹')) {
        var proc_fee = parseInt(proc_fee);//Get processing fee from loan info and directly show the Processing Fee provided because of it is in rupees
    } else if (proc_type.includes('%')) {
        var proc_fee = parseInt(loan_amt) * (parseInt(proc_fee) / 100);//Get processing fee from loan info and multiply with loan amt to get actual proc fee
    }

    var roundeprocfee = Math.ceil(proc_fee / 5) * 5; //to increase Processing fee to nearest multiple of 5
    if (roundeprocfee < proc_fee) {
        roundeprocfee += 5;
    }

    $('.proc-diff').text('* (Difference: +' + parseInt(roundeprocfee - proc_fee) + ')'); //To show the difference amount from old to new
    $('#processing_fees_calculate').val(moneyFormatIndia(parseInt(roundeprocfee)));

    var net_cash = parseInt(loan_amt) - parseInt(doc_charge) - parseInt(proc_fee); //Net cash will be calculated by subracting other charges
    $('#net_cash_calc').val(moneyFormatIndia(parseInt(net_cash).toFixed(0)));

}

//To Get Loan Calculation for Monthly Scheme method
function getLoanMonthly(loan_amt, int_rate, due_period, doc_charge, proc_fee) {

    $('#loan_amount_calc').val(moneyFormatIndia(parseInt(loan_amt).toFixed(0))); //get loan amt from loan info card

    var int_amt = (parseInt(loan_amt) * (parseFloat(int_rate) / 100)).toFixed(0); //Calculate interest rate 
    // $('#interest_amnt_calc').val(parseInt(int_amt));

    var princ_amt = parseInt(loan_amt) - parseInt(int_amt); // Calculate principal amt by subracting interest amt from loan amt
    // $('#principal_amnt_calc').val(princ_amt); 

    var tot_amt = parseInt(princ_amt) + parseFloat(int_amt); //Calculate total amount from principal/loan amt and interest rate
    // $('#total_amnt_calc').val(parseInt(tot_amt).toFixed(0));

    var due_amt = parseInt(tot_amt) / parseInt(due_period);//To calculate due amt by dividing total amount and due period given on loan info
    var roundDue = Math.ceil(due_amt / 5) * 5; //to increase Due Amt to nearest multiple of 5
    if (roundDue < due_amt) {
        roundDue += 5;
    }
    $('.due-diff').text('* (Difference: +' + parseInt(roundDue - due_amt) + ')'); //To show the difference amount
    $('#due_amnt_calc').val(moneyFormatIndia(parseInt(roundDue).toFixed(0)));

    ////////////////////recalculation of total, principal, interest///////////////////

    var new_tot = parseInt(roundDue) * due_period;
    $('#total_amnt_calc').val(moneyFormatIndia(new_tot))

    //to get new interest rate using round due amt 
    let new_int = (roundDue * due_period) - princ_amt;

    var roundedInterest = Math.ceil(new_int / 5) * 5;
    if (roundedInterest < new_int) {
        roundedInterest += 5;
    }

    $('.int-diff').text('* (Difference: +' + parseInt(roundedInterest - int_amt) + ')'); //To show the difference amount
    $('#interest_amnt_calc').val(moneyFormatIndia(parseInt(roundedInterest)));

    var new_princ = parseInt(new_tot) - parseInt(roundedInterest);
    $('#principal_amnt_calc').val(moneyFormatIndia(new_princ));


    var doc_type = $('.min-max-doc').text(); //Scheme may have document charge in rupees or percentage . so getting symbol from span
    if (doc_type.includes('₹')) {
        var doc_charge = parseInt(doc_charge); //Get document charge from loan info and directly show the document charge provided because of it is in rupees
    } else if (doc_type.includes('%')) {
        var doc_charge = parseInt(loan_amt) * (parseFloat(doc_charge) / 100); //Get document charge from loan info and multiply with loan amt to get actual doc charge
    }

    var roundeddoccharge = Math.ceil(doc_charge / 5) * 5; //to increase document charge to nearest multiple of 5
    if (roundeddoccharge < doc_charge) {
        roundeddoccharge += 5;
    }

    $('.doc-diff').text('* (Difference: +' + parseInt(roundeddoccharge - doc_charge) + ')'); //To show the difference amount from old to new
    $('#doc_charge_calculate').val(moneyFormatIndia(parseInt(roundeddoccharge)));

    var proc_type = $('.min-max-proc').text(); //Scheme may have Processing fee in rupees or percentage . so getting symbol from span
    if (proc_type.includes('₹')) {
        var proc_fee = parseInt(proc_fee);//Get processing fee from loan info and directly show the Processing Fee provided because of it is in rupees
    } else if (proc_type.includes('%')) {
        var proc_fee = parseInt(loan_amt) * (parseInt(proc_fee) / 100);//Get processing fee from loan info and multiply with loan amt to get actual proc fee
    }

    var roundeprocfee = Math.ceil(proc_fee / 5) * 5; //to increase Processing fee to nearest multiple of 5
    if (roundeprocfee < proc_fee) {
        roundeprocfee += 5;
    }

    $('.proc-diff').text('* (Difference: +' + parseInt(roundeprocfee - proc_fee) + ')'); //To show the difference amount from old to new
    $('#processing_fees_calculate').val(moneyFormatIndia(parseInt(roundeprocfee)));

    var net_cash = parseInt(princ_amt) - parseInt(doc_charge) - parseInt(proc_fee); //Net cash will be calculated by subracting other charges
    $('#net_cash_calc').val(moneyFormatIndia(parseInt(net_cash).toFixed(0)));
}

//To Get Loan Calculation for Weekly Scheme method
function getLoanWeekly(loan_amt, int_rate, due_period, doc_charge, proc_fee) {

    $('#loan_amount_calc').val(moneyFormatIndia(parseInt(loan_amt).toFixed(0))); //get loan amt from loan info card

    var int_amt = (parseInt(loan_amt) * (parseFloat(int_rate) / 100)).toFixed(0); //Calculate interest rate

    var princ_amt = parseInt(loan_amt) - parseInt(int_amt); // Calculate principal amt by subracting interest amt from loan amt
    $('#principal_amnt_calc').val(moneyFormatIndia(parseInt(princ_amt).toFixed(0)));

    var tot_amt = parseInt(princ_amt) + parseFloat(int_amt); //Calculate total amount from principal/loan amt and interest rate
    $('#total_amnt_calc').val(moneyFormatIndia(parseInt(tot_amt).toFixed(0)));

    var due_amt = parseInt(tot_amt) / parseInt(due_period);//To calculate due amt by dividing total amount and due period given on loan info
    var roundDue = Math.ceil(due_amt / 5) * 5; //to increase Due Amt to nearest multiple of 5
    if (roundDue < due_amt) {
        roundDue += 5;
    }
    $('.due-diff').text('* (Difference: +' + parseInt(roundDue - due_amt) + ')'); //To show the difference amount
    $('#due_amnt_calc').val(moneyFormatIndia(parseInt(roundDue).toFixed(0)));

    ////////////////////recalculation of total, principal, interest///////////////////

    var new_tot = parseInt(roundDue) * due_period;
    $('#total_amnt_calc').val(moneyFormatIndia(new_tot))

    //to get new interest rate using round due amt 
    let new_int = (roundDue * due_period) - princ_amt;

    var roundedInterest = Math.ceil(new_int / 5) * 5;
    if (roundedInterest < new_int) {
        roundedInterest += 5;
    }

    $('.int-diff').text('* (Difference: +' + parseInt(roundedInterest - int_amt) + ')'); //To show the difference amount
    $('#interest_amnt_calc').val(moneyFormatIndia(parseInt(roundedInterest)));

    var new_princ = parseInt(new_tot) - parseInt(roundedInterest);
    $('#principal_amnt_calc').val(moneyFormatIndia(new_princ));

    var doc_type = $('.min-max-doc').text(); //Scheme may have document charge in rupees or percentage . so getting symbol from span
    if (doc_type.includes('₹')) {
        var doc_charge = parseInt(doc_charge); //Get document charge from loan info and directly show the document charge provided because of it is in rupees
    } else if (doc_type.includes('%')) {
        var doc_charge = parseInt(loan_amt) * (parseFloat(doc_charge) / 100); //Get document charge from loan info and multiply with loan amt to get actual doc charge
    }

    var roundeddoccharge = Math.ceil(doc_charge / 5) * 5; //to increase document charge to nearest multiple of 5
    if (roundeddoccharge < doc_charge) {
        roundeddoccharge += 5;
    }

    $('.doc-diff').text('* (Difference: +' + parseInt(roundeddoccharge - doc_charge) + ')'); //To show the difference amount from old to new
    $('#doc_charge_calculate').val(moneyFormatIndia(parseInt(roundeddoccharge)));

    var proc_type = $('.min-max-proc').text();//Scheme may have Processing fee in rupees or percentage . so getting symbol from span
    if (proc_type.includes('₹')) {
        var proc_fee = parseInt(proc_fee);//Get processing fee from loan info and directly show the Processing Fee provided because of it is in rupees
    } else if (proc_type.includes('%')) {
        var proc_fee = parseInt(loan_amt) * (parseInt(proc_fee) / 100);//Get processing fee from loan info and multiply with loan amt to get actual proc fee
    }

    var roundeprocfee = Math.ceil(proc_fee / 5) * 5; //to increase Processing fee to nearest multiple of 5
    if (roundeprocfee < proc_fee) {
        roundeprocfee += 5;
    }

    $('.proc-diff').text('* (Difference: +' + parseInt(roundeprocfee - proc_fee) + ')'); //To show the difference amount from old to new
    $('#processing_fees_calculate').val(moneyFormatIndia(parseInt(roundeprocfee)));

    var net_cash = parseInt(princ_amt) - parseInt(doc_charge) - parseInt(proc_fee); //Net cash will be calculated by subracting other charges
    $('#net_cash_calc').val(moneyFormatIndia(parseInt(net_cash).toFixed(0)));
}

//To Get Loan Calculation for Daily Scheme method
function getLoanDaily(loan_amt, int_rate, due_period, doc_charge, proc_fee) {

    $('#loan_amount_calc').val(moneyFormatIndia(parseInt(loan_amt).toFixed(0))); //get loan amt from loan info card

    var int_amt = (parseInt(loan_amt) * (parseFloat(int_rate) / 100)).toFixed(0); //Calculate interest rate 
    $('#interest_amnt_calc').val(moneyFormatIndia(parseInt(int_amt)));

    var princ_amt = parseInt(loan_amt) - parseInt(int_amt); // Calculate principal amt by subracting interest amt from loan amt
    $('#principal_amnt_calc').val(moneyFormatIndia(parseInt(princ_amt).toFixed(0)));

    var tot_amt = parseInt(princ_amt) + parseFloat(int_amt); //Calculate total amount from principal/loan amt and interest rate
    $('#total_amnt_calc').val(moneyFormatIndia(parseInt(tot_amt).toFixed(0)));

    var due_amt = parseInt(tot_amt) / parseInt(due_period);//To calculate due amt by dividing total amount and due period given on loan info
    var roundDue = Math.ceil(due_amt / 5) * 5; //to increase Due Amt to nearest multiple of 5
    if (roundDue < due_amt) {
        roundDue += 5;
    }
    $('.due-diff').text('* (Difference: +' + parseInt(roundDue - due_amt) + ')'); //To show the difference amount
    $('#due_amnt_calc').val(moneyFormatIndia(parseInt(roundDue).toFixed(0)));

    ////////////////////recalculation of total, principal, interest///////////////////

    var new_tot = parseInt(roundDue) * due_period;
    $('#total_amnt_calc').val(moneyFormatIndia(new_tot))

    //to get new interest rate using round due amt 
    let new_int = (roundDue * due_period) - princ_amt;

    var roundedInterest = Math.ceil(new_int / 5) * 5;
    if (roundedInterest < new_int) {
        roundedInterest += 5;
    }

    $('.int-diff').text('* (Difference: +' + parseInt(roundedInterest - int_amt) + ')'); //To show the difference amount
    $('#interest_amnt_calc').val(moneyFormatIndia(parseInt(roundedInterest)));

    var new_princ = parseInt(new_tot) - parseInt(roundedInterest);
    $('#principal_amnt_calc').val(moneyFormatIndia(new_princ));

    var doc_type = $('.min-max-doc').text(); //Scheme may have document charge in rupees or percentage . so getting symbol from span
    if (doc_type.includes('₹')) {
        var doc_charge = parseInt(doc_charge); //Get document charge from loan info and directly show the document charge provided because of it is in rupees
    } else if (doc_type.includes('%')) {
        var doc_charge = parseInt(loan_amt) * (parseFloat(doc_charge) / 100); //Get document charge from loan info and multiply with loan amt to get actual doc charge
    }

    var roundeddoccharge = Math.ceil(doc_charge / 5) * 5; //to increase document charge to nearest multiple of 5
    if (roundeddoccharge < doc_charge) {
        roundeddoccharge += 5;
    }

    $('.doc-diff').text('* (Difference: +' + parseInt(roundeddoccharge - doc_charge) + ')'); //To show the difference amount from old to new
    $('#doc_charge_calculate').val(moneyFormatIndia(parseInt(roundeddoccharge)));

    var proc_type = $('.min-max-proc').text();//Scheme may have Processing fee in rupees or percentage . so getting symbol from span
    if (proc_type.includes('₹')) {
        var proc_fee = parseInt(proc_fee);//Get processing fee from loan info and directly show the Processing Fee provided because of it is in rupees
    } else if (proc_type.includes('%')) {
        var proc_fee = parseInt(loan_amt) * (parseInt(proc_fee) / 100);//Get processing fee from loan info and multiply with loan amt to get actual proc fee
    }

    var roundeprocfee = Math.ceil(proc_fee / 5) * 5; //to increase Processing fee to nearest multiple of 5
    if (roundeprocfee < proc_fee) {
        roundeprocfee += 5;
    }

    $('.proc-diff').text('* (Difference: +' + parseInt(roundeprocfee - proc_fee) + ')'); //To show the difference amount from old to new
    $('#processing_fees_calculate').val(moneyFormatIndia(parseInt(roundeprocfee)));

    var net_cash = parseInt(princ_amt) - parseInt(doc_charge) - parseInt(proc_fee); //Net cash will be calculated by subracting other charges
    $('#net_cash_calc').val(moneyFormatIndia(parseInt(net_cash).toFixed(0)));
}

function changeInttoBen() {
    let dueType = document.getElementById('due_type_calc');
    let intLabel = document.querySelector('label[for="interest_amnt_calc"]');
    if (dueType.value == 'Interest') {
        intLabel.textContent = 'Benefit Amount';
    } else {
        intLabel.textContent = 'Interest Amount';
    }
}

function getLoanCatDetails(id, edittype) {
    $.post('api/loan_entry/loan_calculation/getLoanCatDetails.php', { id }, function (response) {
        $('#due_method_calc').val(response[0].due_method);

        if (response[0].due_type === 'EMI') {
            $('#due_type_calc').val('EMI');
        } else if (response[0].due_type === 'interest') {
            $('#due_type_calc').val('Interest');
        }

        var int_rate_upd = ($('#int_rate_upd').val()) ? $('#int_rate_upd').val() : '';
        var due_period_upd = ($('#due_period_upd').val()) ? $('#due_period_upd').val() : '';
        var doc_charge_upd = ($('#doc_charge_upd').val()) ? $('#doc_charge_upd').val() : '';
        var proc_fee_upd = ($('#proc_fees_upd').val()) ? $('#proc_fees_upd').val() : '';

        //To set min and maximum 
        $('.min-max-int').text('* (' + response[0].interest_rate_min + '% - ' + response[0].interest_rate_max + '%) ');
        $('#interest_rate_calc').attr('onChange', `if( parseFloat($(this).val()) > '` + response[0].interest_rate_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else if( parseFloat($(this).val()) < '` + response[0].interest_rate_min + `' && parseFloat($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `);

        //To check value between range
        $('#interest_rate_calc').val(int_rate_upd);
        $('.min-max-due').text('* (' + response[0].due_period_min + ' - ' + response[0].due_period_max + ') ');
        $('#due_period_calc').attr('onChange', `if( parseInt($(this).val()) > '` + response[0].due_period_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else if( parseInt($(this).val()) < '` + response[0].due_period_min + `' && parseInt($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `);

        //To check value between range
        $('#due_period_calc').val(due_period_upd);

        $('.min-max-doc').text('* (' + response[0].doc_charge_min + '% - ' + response[0].doc_charge_max + '%) ');
        $('#doc_charge_calc').attr('onChange', `if( parseFloat($(this).val()) > '` + response[0].doc_charge_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else if( parseFloat($(this).val()) < '` + response[0].doc_charge_min + `' && parseFloat($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `);

        //To check value between range
        $('#doc_charge_calc').val(doc_charge_upd);

        $('.min-max-proc').text('* (' + response[0].processing_fee_min + '% - ' + response[0].processing_fee_max + '%) ');
        $('#processing_fees_calc').attr('onChange', `if( parseFloat($(this).val()) > '` + response[0].processing_fee_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else if( parseFloat($(this).val()) < '` + response[0].processing_fee_min + `' && parseInt($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `);

        //To check value between range
        $('#processing_fees_calc').val(proc_fee_upd);

        if (edittype == 1) {
            $('#interest_rate_calc').val('');
            $('#due_period_calc').val('');
            $('#doc_charge_calc').val('');
            $('#processing_fees_calc').val('');

        }
    }, 'json');
}

function schemeCalAjax(id) {

    if (id != '') {

        let doc_charge_upd = ($('#doc_charge_upd').val()) ? $('#doc_charge_upd').val() : '';
        let proc_fee_upd = ($('#proc_fees_upd').val()) ? $('#proc_fees_upd').val() : '';

        $.post('api/loan_category_creation/get_scheme_data.php', { id }, function (response) {
            //To set min and maximum 
            $('#interest_rate_calc').val(response[0].interest_rate_percent);// setting readonly due to fixed interest
            $('#due_period_calc').val(response[0].due_period_percent);// setting readonly due to fixed due period
            $('#profit_method_calc').val(response[0].profit_method);// setting readonly due to fixed due period

            (response[0].doc_charge_type == 'percent') ? type = '%' : type = '₹';//Setting symbols

            $('.min-max-doc').text('* (' + response[0].doc_charge_min + ' ' + type + ' - ' + response[0].doc_charge_max + ' ' + type + ') ');

            //setting min max values in span
            $('#doc_charge_calc').attr('onChange', `if( parseInt($(this).val()) > '` + response[0].doc_charge_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else
            if( parseInt($(this).val()) < '`+ response[0].doc_charge_min + `' && parseInt($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `);

            //To check value between range
            $('#doc_charge_calc').val(doc_charge_upd);

            (response[0].processing_fee_type == 'percent') ? type = '%' : type = '₹';//Setting symbols

            $('.min-max-proc').text('* (' + response[0].processing_fee_min + ' ' + type + ' - ' + response[0].processing_fee_max + ' ' + type + ') ');

            //setting min max values in span
            $('#processing_fees_calc').attr('onChange', `if( parseInt($(this).val()) > '` + response[0].processing_fee_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else
            if( parseInt($(this).val()) < '`+ response[0].processing_fee_min + `' && parseInt($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `);

            //To check value between range
            $('#processing_fees_calc').val(proc_fee_upd);

        }, 'json');

    } else {
        clearCalcSchemeFields('1')
    }
}

function clearCalcSchemeFields(type) {
    $('.to_clear').val('');
    $('.min-max-int').text('*');
    $('.min-max-due').text('*');
    $('.min-max-doc').text('*');
    $('.min-max-proc').text('*');

    if (type == '1') { //Scheme
        $('#interest_rate_calc').prop('readonly', true);
        $('#due_period_calc').prop('readonly', true);
    } else {
        $('#interest_rate_calc').prop('readonly', false);
        $('#due_period_calc').prop('readonly', false);
    }
}

function getLoanCount(cus_id) {
    $.ajax({
        url: 'api/loan_entry/get_loan_count.php',
        type: 'POST',
        data: { cus_id: cus_id },
        dataType: 'json',
        cache: false,
        success: function (response) {
            $('#loan_count').val(response.loan_count);
            if (response.first_loan_date) {
                let formattedDate = response.first_loan_date;
                $('#first_loan_date').val(formattedDate);
            } else {
                $('#first_loan_date').val(''); // or a default placeholder
            }
        },
    });
}

function getIssuePerson(cus_name) {
    let cus_id = $('#cus_id').val();
    $.post('api/loan_entry/get_guarantor_name.php', { cus_id }, function (response) {
        let appendOption = '';
        appendOption += "<option value='' data-val=''>Select Issue Person</option>";
        appendOption += "<option value='" + cus_id + "' data-val='Customer'>" + cus_name + "</option>";
        $.each(response, function (index, val) {
            appendOption += "<option value='" + val.fam_aadhar + "' data-val='" + val.id + "'>" + val.fam_name + "</option>";
        });
        $('#issue_person').empty().append(appendOption);
    }, 'json');
}

function getRelationship(id, selector) {
    $.post('api/loan_entry/family_creation_data.php', { id }, function (response) {
        $(selector).val(response[0].fam_relationship);
    }, 'json');
}

function refreshIssueInfo() {
    $('#payment_mode').val('');
    $('#payment_type').val('');
    $('#issue_person').val('');
    $('#issue_relationship').val('');
    $('.cash_issue').hide();
    $('.balance_remark_container').hide();
    $('#bank_container').hide();//hide bank id
    resetFieldBorders(['payment_mode', 'payment_type', 'cash', 'issue_person']);
}

function resetFieldBorders(fields) {
    fields.forEach(field => {
        document.getElementById(field).style.border = '1px solid #cecece';
    });
}

// Function to check if all values in an object are not empty
function isFormDataValid(formData) {
    let isValid = true;

    // Reset border styles for all fields
    $('#payment_mode, #cash, #bank_names').css('border', '1px solid #cecece');

    // Validate required fields
    if (!validateField(formData['payment_type'], 'payment_type')) {
        isValid = false;
    }

    if (!validateField(formData['payment_mode'], 'payment_mode')) {
        isValid = false;
    }
    if (!validateField(formData['issue_person'], 'issue_person')) {
        isValid = false;
    }
    if (!validateField(formData['issue_relationship'], 'issue_relationship')) {
        isValid = false;
    }
    // Check if payment_type is "1" (Split Payment)
    if (formData['payment_type'] === "1") {
        // Validate payment_mode again
        if (!validateField(formData['payment_mode'], 'payment_mode')) {
            isValid = false;
        }

        // Validate specific fields based on payment_mode
        if (formData['payment_mode'] === "1") { // Cash
            if (!validateField(formData['cash'], 'cash')) {
                isValid = false;
            }
        } else if (formData['payment_mode'] === "2") { // Cheque
            if (!validateField(formData['bank_names'], 'bank_names')) {
                isValid = false;
            }
        } else if (formData['payment_mode'] === "3") { // Transaction
            if (!validateField(formData['bank_names'], 'bank_names')) {
                isValid = false;
            }
        }

        // Ensure that at least one payment method is filled
        if (formData['payment_mode'] === "1") {
            let isCashFilled = parseFloat(formData['cash']) > 0;
            if (!isCashFilled) {
                isValid = false;
                $('#cash').css('border', '1px solid #ff0000');
            } else {
                resetFieldBorders(['cash']);
            }
        }

    }
    else if (formData['payment_type'] == "2") { // Single Payment
        if (!validateField(formData['payment_mode'], 'payment_mode')) {
            isValid = false;
        }

        if (formData['payment_mode'] == "1") { // Cash
            if (!validateField(formData['cash'], 'cash')) {
                isValid = false;
            }
        } else if (formData['payment_mode'] == "2") { // Cheque
            if (!validateField(formData['bank_names'], 'bank_names')) {
                isValid = false;
            }
        } else if (formData['payment_mode'] == "3") { // Transaction
            if (!validateField(formData['bank_names'], 'bank_names')) {
                isValid = false;
            }
        }
    }

    // Check other mandatory fields not related to payment_mode
    for (let key in formData) {
        if (key !== 'payment_mode' && key !== 'payment_type' && key !== 'cash' && key !== 'bank_names' && key !== 'bal_amount' && key !== 'issue_relationship' && key !== 'issue_person') {
            if (!validateField(formData[key], key)) {
                return false;
            }
        }
    }

    return isValid;
}

function isAnyCheckboxChecked() {
    return $('#bank_info').find('input[type="checkbox"]:checked').length > 0;
}

function checkBalance() {
    return new Promise((resolve, reject) => {
        let cus_profile_id = $('#customer_profile_id').val();
        $.ajax({
            url: 'api/loan_issue_files/get_loan_balance.php',
            type: 'POST',
            data: { 'cus_profile_id': cus_profile_id },
            dataType: 'json',
            success: function (response) {
                let rowCnt = parseInt(response['rowCnt']);
                let balanceAmount = parseFloat(response['balance_amount']);

                if (rowCnt > 0) {
                    $('#balance_net_cash').val(moneyFormatIndia(balanceAmount));

                    if (balanceAmount > 0) {
                        $('#interest_rate_calc').attr('readonly', true);
                        $('#due_period_calc').attr('readonly', true);
                        $('#doc_charge_calc').attr('readonly', true);
                        $('#processing_fees_calc').attr('readonly', true);
                        $('#due_startdate_calc').attr('readonly', true);
                        $('#refresh_cal').hide();
                    } else if (balanceAmount === 0) {
                        $('#interest_rate_calc').attr('readonly', true);
                        $('#due_period_calc').attr('readonly', true);
                        $('#doc_charge_calc').attr('readonly', true);
                        $('#processing_fees_calc').attr('readonly', true);
                        $('#issued_mode').attr('disabled', true);
                        $('#due_startdate_calc').attr('disabled', true);
                        $('#issue_person').attr('disabled', true);
                        $('#submit_loan_issue').hide();
                    }
                } else {
                    let netcashamnt = parseFloat($('#net_cash_calc').val().replace(/,/g, ''));
                    $('#balance_net_cash').val(moneyFormatIndia(netcashamnt));
                    $('#interest_rate_calc').attr('readonly', false);
                    $('#due_period_calc').attr('readonly', false);
                    $('#doc_charge_calc').attr('readonly', false);
                    $('#processing_fees_calc').attr('readonly', false);
                    $('#due_startdate_calc').attr('readonly', false);
                    $('#refresh_cal').show();
                }

                resolve();
            },
            error: reject
        });
    });
}


function calculateBalance() {
    // Get the settlement balance and remove commas, then parse it as a float
    let settlementBalance = parseFloat($('#balance_net_cash').val().replace(/,/g, '')) || 0;
    let cashVal = parseFloat($('#cash').val()) || 0;
    // Calculate the remaining balance
    let remainingBalance = settlementBalance - (cashVal);

    // Format the remaining balance using the moneyFormatIndia function
    $('#balance_amount').val(moneyFormatIndia(remainingBalance));
}

function getBankName() {
    $.post('api/common_files/bank_name_list.php', function (response) {
        let appendBankOption = "<option value=''>Select Bank Name</option>";
        $.each(response, function (index, val) {
            let selected = '';
            let editGId = $('#bank_name_edit').val(); // Existing guarantor ID (if any)
            if (val.id == editGId) {
                selected = 'selected';
            }
            appendBankOption += "<option value='" + val.id + "' " + selected + ">" + val.bank_name + "</option>";
        });
        $('#bank_names').empty().append(appendBankOption);
    }, 'json');
}

function getBankTable() {
    let cus_id = $('#cus_id').val();
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_entry/bank_creation_list.php', { cus_id, cus_profile_id }, function (response) {
        var columnMapping = [
            'sno',
            'bank_name',
            'branch_name',
            'acc_holder_name',
            'acc_number',
            'ifsc_code',
            'action'
        ];
        appendDataToTable('#bank_creation_table', response, columnMapping);
        setdtable('#bank_creation_table');
        $('#bank_form input').val('');
        $('#bank_form input').css('border', '1px solid #cecece');

    }, 'json')
}

function getBankInfoTable() {
    let cus_id = $('#cus_id').val();
    let cus_profile_id = $('#customer_profile_id').val()
    $.post('api/loan_issue_files/bank_creation_list.php', { cus_id, cus_profile_id }, function (response) {
        var columnMapping = [
            'sno',
            'bank_name',
            'branch_name',
            'acc_holder_name',
            'acc_number',
            'ifsc_code',
            'action',
        ];
        appendDataToTable('#bank_info', response, columnMapping);
        setdtable('#bank_info');
    }, 'json')
}

function getBankDelete(id) {
    $.post('api/loan_entry/delete_bank_creation.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('Success', 'Bank Info Deleted Successfully!');
            getBankTable();
        } else {
            swalError('Error', 'Failed to Delete Bank: ' + response);
        }
    }, 'json');
}

//////////////////////////////////////////////////////////////////////// Loan Issue END ////////////////////////////////////////////////////////////////////////////////