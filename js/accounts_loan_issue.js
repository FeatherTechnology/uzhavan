$(document).ready(function () {
    $(document).on('click', '.edit-accounts-loan-issue', function () {
        let id = $(this).attr('value'); //Customer Profile id From List page.
        $('#customer_profile_id').val(id);
        let cusID = $(this).attr('data-id'); //Cus id From List Page.
        $('#cus_id').val(cusID);
        swapTableAndCreation();
    });

    $('#back_btn').click(function () {
        swapTableAndCreation();
    });

    {
        // Get today's date
        var today = new Date().toISOString().split('T')[0];
        //Set loan date
        $('#issue_date').val(today);
    }

    $('#chequeValue, #transaction_value').on('input', function () {
        // Remove commas first, then parse to float
        let settle_balance = parseFloat($('#balance_net_cash').val().replace(/,/g, '')) || 0; // Convert to float, default to 0 if empty
        let payment_type = $('#payment_type').val();
        let che_amount = parseFloat($('#chequeValue').val().replace(/,/g, '')) || 0; // Convert to float, default to 0 if empty
        let trans_amount = parseFloat($('#transaction_value').val().replace(/,/g, '')) || 0; // Convert to float, default to 0 if empty
        if (payment_type == '1') { // Split Payment
            var totalAmount = che_amount + trans_amount;
            calculateBalance();
            // Compare totalAmount with settle_balance
            if (totalAmount > settle_balance) {
                swalError('Warning', 'The entered amount exceeds the Net Cash Balance.');
                $('#chequeValue').val('');
                $('#transaction_value').val('');
                $('#balance_amount').val(0);
            }
        }
    });

    $('#submit_accounts_loan_issue').click(function (event) {
        event.preventDefault();
        let loanIssue = {
            'cus_id': $('#cus_id').val(),
            'cus_profile_id': $('#customer_profile_id').val(),
            'loan_amnt': $('#loan_amount_calc').val().replace(/,/g, ''),
            'net_cash_calc': $('#net_cash_calc').val().replace(/,/g, ''),
            'bal_net_cash': $('#balance_net_cash').val().replace(/,/g, ''),
            'due_amnt_calc': $('#due_amnt_calc').val().replace(/,/g, ''),
            'total_amnt_calc': $('#total_amnt_calc').val().replace(/,/g, ''),
            'payment_type': $('#payment_type').val(),
            'payment_mode': $('#payment_mode').val(),
            'due_startdate': $('#due_startdate_calc').val(),
            'bank_names': $('#bank_names').val(),
            'cash': $('#cash').val(),
            'chequeno': $('#chequeno').val(),
            'chequeValue': $('#chequeValue').val().replace(/,/g, ''),
            'chequeRemark': $('#chequeRemark').val(),
            'transaction_id': $('#transaction_id').val(),
            'transaction_value': $('#transaction_value').val().replace(/,/g, ''),
            'transaction_remark': $('#transaction_remark').val(),
            'bal_amount': $('#balance_amount').val().replace(/,/g, ''),
            'issue_date': $('#issue_date').val(),
            'issue_person': $('#issue_person').val(),
            'issue_relationship': $('#issue_relationship').val(),
        }
        if (isFormDataValid(loanIssue)) {
            $.post('api/accounts_files/loan_issue_files/submit_accounts_loan_issue.php', loanIssue, function (response) {
                if (response == '1') {
                    swalSuccessOk('Success', 'Loan Issued Successfully');
                    swapTableAndCreation();
                    getAccountsLoanIssueTable();
                } else {
                    swalError('Warning', 'Loan Issue Failed.');
                }
            });
        }

    });

    $(document).on('click', '.move-loan-issue', function () {
        let cus_prof_id = $(this).attr('value');
        swalConfirm('Move', 'Are you sure to move to Loan Issue?', moveToLoanIssue, cus_prof_id);
        return;
    });


});

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
    try {
        await personalInfo();
        await checkBalance();
        await getBankDetails();
        await getBankName();
        paymentType(); // This is synchronous, so no need for await
    } catch (err) {
        console.error("Error in loan calculation sequence:", err);
    }
}


//On Load function 
$(function () {
    getAccountsLoanIssueTable();
});

function getAccountsLoanIssueTable() {
    serverSideTable('#loan_issue_table', '', 'api/accounts_files/loan_issue_files/accounts_loan_issue_list.php');
}

function personalInfo() {
    return new Promise((resolve, reject) => {
        let id = $('#customer_profile_id').val();
        $.post('api/loan_issue_files/loan_issue_data.php', { id }, function (response) {
            try {
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
                $('#collection_method').val(response[0].collection_method);
                $('#aadhar_num').val(response[0].aadhar_num);
                $('#issue_person').val(response[0].issue_person);
                $('#due_startdate_calc').attr('min', response[0].loan_date);
                $('#payment_type').val(response[0].payment_type);
                $('#payment_mode').val(response[0].payment_mode);
                $('#issue_relationship').val(response[0].issue_relationship);
                $('#bank_name_edit').val(response[0].bank_id);
                let path = "uploads/loan_entry/cus_pic/";
                $('#per_pic').val(response[0].pic);
                $('#imgshow').attr('src', path + response[0].pic);

                $('.calc_scheme_title').text((response[0].profit_type == '0') ? 'Calculation' : 'Scheme');
                $('#profit_type_calc_scheme').show();

                if (response[0].profit_type == '0') {
                    $('.calc').show();
                    $('.scheme').hide();
                    $('.scheme_day').hide();
                    getLoanCatDetails(response[0].loan_category_id, 2); // Async-safe assumed
                } else if (response[0].profit_type == '1') {
                    dueMethodScheme(response[0].scheme_due_method, response[0].loan_category_id); // Async-safe assumed
                    $('.calc').hide();
                    $('.scheme').show();
                    schemeCalAjax(response[0].scheme_name); // Async-safe assumed

                    if (response[0].scheme_due_method == '2') {
                        $('.scheme_day').show();
                    } else {
                        $('.scheme_day').hide();
                        $('.scheme_day_calc').val('');
                    }
                }

                resolve(); // All done
            } catch (err) {
                reject(err); // Something went wrong inside success block
            }
        }, 'json').fail(reject); // If .post itself fails
    });
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
                } else {
                    let netcashamnt = parseFloat($('#net_cash_calc').val().replace(/,/g, ''));
                    $('#balance_net_cash').val(moneyFormatIndia(netcashamnt));
                }

                resolve(); // Resolves when AJAX completes successfully
            },
            error: function (xhr, status, error) {
                reject(error); // Rejects on AJAX error
            }
        });
    });
}

function calculateBalance() {
    // Get the settlement balance and remove commas, then parse it as a float
    let settlementBalance = parseFloat($('#balance_net_cash').val().replace(/,/g, '')) || 0;
    let cheqVal = parseFloat($('#chequeValue').val()) || 0;
    let transVal = parseFloat($('#transaction_value').val()) || 0;
    // Calculate the remaining balance
    let remainingBalance = settlementBalance - (cheqVal + transVal);

    // Format the remaining balance using the moneyFormatIndia function
    $('#balance_amount').val(moneyFormatIndia(remainingBalance));
}

function getBankDetails() {
    return new Promise((resolve, reject) => {
        let cus_id = $('#cus_id').val();
        $.post('api/loan_issue_files/get_bank_Details_data.php', { cus_id }, function (response) {
            $('#bank_name').val(response[0].bank_name);
            $('#branch_name').val(response[0].branch_name);
            $('#acc_holder_name').val(response[0].acc_holder_name);
            $('#acc_number').val(response[0].acc_number);
            $('#ifsc_code').val(response[0].ifsc_code);
            resolve();
        }, 'json').fail(reject);
    });
}

function paymentType() {
    $('#chequeno').val('');
    $('#chequeValue').val('');
    $('#chequeRemark').val('');
    $('#transaction_id').val('');
    $('#transaction_value').val('');
    $('#transaction_remark').val('');
    $('#balance_amount').val('');
    var netcash = $('#balance_net_cash').val();
    let payment_type = $('#payment_type').val();
    var payment_mode = $('#payment_mode').val();

    // Set payment text
    let payment_text = '';
    if (payment_mode == '2') {
        payment_text = 'Bank Transfer';
    } else if (payment_mode == '3') {
        payment_text = 'Cheque';
    } else {
        payment_text = '';
    }

    // Display payment type text in a UI element
    $('#payment_text').text(payment_text);

    if (payment_type == 1) {
        if (payment_mode == '2') {
            $('.balance').show();
            $('.checque').hide();
            $('.transaction').show();
            $('#transaction_value').val('');
            $('#transaction_value').attr('readonly', false);
        } else if (payment_mode == '3') {
            $('.balance').show();
            $('.checque').show();
            $('#chequeValue').val('');
            $('#chequeValue').attr('readonly', false);
            $('.transaction').hide();
        } else {
            $('.balance').hide();
            $('.checque').hide();
            $('.transaction').hide();
            $('#balance_amount').val('');
        }
    }
    else {
        $('.balance').hide();
        if (payment_mode == '2') {
            $('.checque').hide();
            $('.transaction').show();
            $('#transaction_value').val(netcash);
            $('#transaction_value').attr('readonly', true);
            $('#balance_amount').val('0');
        } else if (payment_mode == '3') {
            $('.checque').show();
            $('#chequeValue').val(netcash);
            $('#chequeValue').attr('readonly', true);
            $('#balance_amount').val('0');
            $('.transaction').hide();
        } else {
            $('.balance').hide();
            $('.checque').hide();
            $('.transaction').hide();
            $('#balance_amount').val('');
        }
    }
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
// Function to check if all values in an object are not empty
function isFormDataValid(formData) {
    let isValid = true;

    // Reset border styles for all fields
    $('#chequeno, #chequeValue, #chequeRemark, #transaction_id, #transaction_value, #transaction_remark').css('border', '1px solid #cecece');
    // alidate specific fields based on payment_mode
    if (formData['payment_mode'] === "2") { // bank transfer
        if (!validateField(formData['transaction_id'], 'transaction_id')) {
            isValid = false;
        }
        if (!validateField(formData['transaction_value'], 'transaction_value')) {
            isValid = false;
        }
        if (!validateField(formData['bank_names'], 'bank_names')) {
            isValid = false;
        }
    } else if (formData['payment_mode'] === "3") { // Cheque
        if (!validateField(formData['chequeno'], 'chequeno')) {
            isValid = false;
        }
        if (!validateField(formData['chequeValue'], 'chequeValue')) {
            isValid = false;
        }
        if (!validateField(formData['bank_names'], 'bank_names')) {
            isValid = false;
        }
    }

    return isValid;
}

function refreshIssueInfo() {
    resetFieldBorders(['chequeno', 'chequeValue', 'chequeRemark', 'transaction_id', 'transaction_value', 'transaction_remark', 'bank_names']);
}

function resetFieldBorders(fields) {
    fields.forEach(field => {
        document.getElementById(field).style.border = '1px solid #cecece';
    });
}

function moveToLoanIssue(cus_prof_id) {
    $.post('api/accounts_files/loan_issue_files/move_to_loan_issue.php', { cus_prof_id }, function (response) {
        if (response == '0') {
            swalSuccess('Success', 'Move To Loan Issue Successfully!');
            getAccountsLoanIssueTable();
        } else {
            swalError('Alert', 'Failed To Move');
        }
    }, 'json');
}