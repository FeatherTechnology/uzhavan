$(document).ready(function () {
    $('#due_nill_btn').click(function (event) {
        event.preventDefault();
        let Customer_Status = $(this).attr('value');
        getCollectionListTable(Customer_Status);
        $('#all_btn').show();
        $('#due_nill_btn').hide();
        // $("#duenill_id").val('');
    })
    $('#all_btn').click(function (event) {
        event.preventDefault();
        getCollectionListTable('');
        $('#all_btn').hide();
        $('#due_nill_btn').show();
        $("#coll_sts").val('');
    })

    $(document).on('click', '.collection-details', function () {
        let cusId = $(this).attr('value');
        let sts = $(this).attr('sts');
        getPersonalInfo(cusId, sts);
        OnLoadFunctions(cusId)
        $('#collection_list').hide();
        $('#back_to_coll_list').show();
        $('#coll_main_container').show();
    });

    $('#back_to_coll_list').click(function () {
        swapTableAndCreation();
        let coll_sts = $('#coll_sts').val();
        if (coll_sts != '') {
            $("#due_nill_btn").click();
        } else {
            getCollectionListTable('');
        }
    });

    $('#collection_mode').change(function () {
        var collection_mode = $(this).val();
        if (collection_mode != '') {
            getBankNames();
            getChequeList();
        }
        //Clear All Value initially
        $('#trans_id').val('')
        $('#trans_date').val('')
        $('#cheque_no').val('')
        $('#bank_clr_bank_id, #bank_clr_trans_amnt').val('');
        if (collection_mode == '2') { //Cheque
            $('.cheque').show();
            $('.transaction').show();

        } else if (collection_mode >= '3' && collection_mode <= '5') { // ECS / IMPS/NEFT/RTGS / UPI Transaction
            $('.cheque').hide();
            $('.transaction').show();

        } else if (collection_mode == '1') { //Cash
            $('.cheque').hide();
            $('.transaction').hide();

        } else {//If nothing chosen
            $('.cheque').hide();
            $('.transaction').hide();
        }
    });

    {
        // Get today's date
        var today = new Date();

        // Extract day, month, and year
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
        var year = today.getFullYear();

        // Construct the date in dd-mm-yyyy format
        var formattedDate = day + '-' + month + '-' + year;

        // Set loan date
        $('#collection_date').val(formattedDate);
        $('#follow_up_date').val(formattedDate);
    }

    $(document).on('click', '.pay-due', function () {
        let cp_id = $(this).attr('value');
        $('.colls-cntnr').hide();
        $('#back_to_coll_list').hide();
        $('.coll_details').show();
        $('#back_to_loan_list').show();

        //To get the loan category ID to store when collection form submitted
        $.ajax({
            url: 'api/collection_files/collection_details.php',
            data: { "cp_id": cp_id },
            dataType: 'json',
            type: 'post',
            cache: false,
            success: function (response) {
                $('#loan_category_id').val(response['loan_category']);

                if (response['collection_access'] == '2') {
                    $('.collection_access_div').hide();

                } else {
                    $('.collection_access_div').show();
                }
            }
        })
        var status = $(this).closest('#loan_list_table tbody tr').find('td:nth-child(7)').text()
        var sub_status = $(this).closest('#loan_list_table tbody tr').find('td:nth-child(8)').text()

        $('#cp_id').val(cp_id)
        $('#status').val(status)
        $('#sub_status').val(sub_status)

        //To get Collection Code
        getCollectionCode();

        //in this file, details gonna fetch by request ID, Not by customer ID (Because we need loan details from particular request ID)
        $.ajax({
            url: 'api/collection_files/collection_loan_details.php',
            data: { 'cp_id': cp_id },
            dataType: 'json',
            type: 'post',
            cache: false,
            success: function (response) {
                //Display all value to readonly fields
                $('#tot_amt').val(moneyFormatIndia(response['total_amt']))
                $('#paid_amt').val(moneyFormatIndia(response['total_paid']))
                $('#bal_amt').val(moneyFormatIndia(response['balance']))
                $('#due_amt').val(moneyFormatIndia(response['due_amt']))
                $('#pending_amt').val(moneyFormatIndia(response['pending']))
                $('#pend_amt').val(moneyFormatIndia(response['pending']))
                $('#payable_amt').val(moneyFormatIndia(response['payable']))
                $('#payableAmount').val(moneyFormatIndia(response['payable']))
                $('#penalty').val(moneyFormatIndia(response['penalty']))
                $('#coll_charge').val(moneyFormatIndia(response['coll_charge']));

                if (response['loan_type'] == "interest") {
                    $('.till-date-int').show();
                    $('#till_date_int').val(response['till_date_int'].toFixed(0))
                    $('#tot_amt').prev().prev().text('Principal Amount')
                    $('#due_amt').prev().prev().text('Interest Amount')

                    $('.emiLoanDiv').hide()
                    $('.intLoanDiv').show()

                    // Show all in span class
                    $('.totspan').text('*')
                    $('.paidspan').text('*')
                    $('.balspan').text('*')
                    $('.pendingspan').text('*')
                    $('.payablespan').text('*')

                } else {
                    $('.till-date-int').hide();
                    $('#till_date_int').val('')
                    $('#tot_amt').prev().prev().text('Total Amount')
                    $('#due_amt').prev().prev().text('Due Amount')

                    $('.emiLoanDiv').show()
                    $('.intLoanDiv').hide()

                    // to get how many due are pending till now
                    var totspan = (response['total_amt'] / response['due_amt']).toFixed(1);
                    var paidspan = (response['total_paid'] / response['due_amt']).toFixed(1);
                    var balspan = (response['balance'] / response['due_amt']).toFixed(1);
                    var pendingspan = (response['pending'] / response['due_amt']).toFixed(1);
                    var payablespan = (response['payable'] / response['due_amt']).toFixed(1);

                    // Show all in span class with moneyFormatIndia applied
                    $('.totspan').text('* (No of Due: ' + moneyFormatIndia(totspan) + ')');
                    $('.paidspan').text('* (No of Due: ' + moneyFormatIndia(paidspan) + ')');
                    $('.balspan').text('* (No of Due: ' + moneyFormatIndia(balspan) + ')');
                    $('.pendingspan').text('* (No of Due: ' + moneyFormatIndia(pendingspan) + ')');
                    $('.payablespan').text('* (No of Due: ' + moneyFormatIndia(payablespan) + ')');
                }

                //To set limitations for input fields
                $('#due_amt_track').on('blur', function () {
                    if (parseInt($(this).val()) > response['balance']) {
                        alert("Enter a Lesser Value");
                        $(this).val("");
                        $('#total_paid_track').val("");
                    }
                    $('#pre_close_waiver').trigger('blur');//this will check whether preclosure amount crosses limit
                });

                $('#princ_amt_track').on('blur', function () {
                    if (parseInt($(this).val()) > response['balance']) {
                        alert("Enter a Lesser Value");
                        $(this).val("");
                        $('#total_paid_track').val("");
                    }
                    $('#pre_close_waiver').trigger('blur');//this will check whether preclosure amount crosses limit
                });

                $('#int_amt_track').on('blur', function () {
                    if (parseInt($(this).val()) > response['payable']) {
                        alert("Enter a Lesser Value");
                        $(this).val("");
                        $('#total_paid_track').val("");
                    }
                });

                $('#penalty_track').on('blur', function () {
                    var penaltyValue = parseInt($(this).val()); // Value entered in the field
                    var penaltyLimit = parseInt(response['penalty']); // Value from the response

                    if (isNaN(penaltyValue)) {
                        console.log("Penalty value is not a valid number");
                        return; // Exit if the value is not a valid number
                    }

                    if (penaltyValue > penaltyLimit) {
                        alert("Enter a Lesser Value");
                        $(this).val("");  // Clear the penalty input field
                        $('#total_paid_track').val("");  // Clear the total paid track field
                    }
                });

                $('#coll_charge_track').on('blur', function () {
                    let value = $(this).val();
                    if (value === '') {
                        return; // Don't validate if the field is empty
                    }
                    let collChargeValue = Number(value);
                    let responseCollCharge = Number(response.coll_charge);
                    if (isNaN(collChargeValue) || isNaN(responseCollCharge)) {
                        return;
                    }
                    if (collChargeValue > responseCollCharge) {
                        alert("Enter a Lesser Value");
                        $(this).val('');
                        $('#total_paid_track').val('');
                    }
                });


                //To set Limitation that should not cross its limit with considering track values and previous readonly values
                $('#pre_close_waiver').on('blur', function () {
                    if (response['loan_type'] == "emi") {
                        var due_track = $('#due_amt_track').val();
                        if (parseFloat($(this).val()) > response['balance'] - due_track) {
                            alert("Enter a Lesser Value");
                            $(this).val("");
                            $('#total_waiver').val("");
                        }
                    } else if (response['loan_type'] == 'interest') {
                        var princ_track = $('#princ_amt_track').val();
                        if (parseFloat($(this).val()) > response['balance'] - princ_track) {
                            alert("Enter a Lesser Value");
                            $(this).val("");
                            $('#total_waiver').val("");
                        }
                    }
                });

                $('#penalty_waiver').on('blur', function () {
                    var penalty_track = $('#penalty_track').val();
                    if (parseFloat($(this).val()) > response['penalty'] - penalty_track) {
                        alert("Enter a Lesser Value");
                        $(this).val("");
                        $('#total_waiver').val("");
                    }
                });

                $('#coll_charge_waiver').on('blur', function () {
                    var coll_charge_track = $('#coll_charge_track').val();
                    if (parseFloat($(this).val()) > response['coll_charge'] - coll_charge_track) {
                        alert("Enter a Lesser Value");
                        $(this).val("");
                        $('#total_waiver').val("");
                    }
                });

            }//success END.
        })

    });
    $(document).on('click', '.move-error', function () {

        let cus_sts_id = $(this).attr('value');
        let cp_id = $(this).attr('data-id');
        cus_sts = 15;
        swalConfirm(
            "Move",
            "Are you sure to move to Error?",
            () => moveToNext(cus_sts_id, cus_sts, cp_id)
        );
        return;

    })
    $(document).on('click', '.move-legal', function () {

        let cus_sts_id = $(this).attr('value');
        let cp_id = $(this).attr('data-id');
        cus_sts = 16;
        swalConfirm(
            "Move",
            "Are you sure to move to Legal?",
            () => moveToNext(cus_sts_id, cus_sts, cp_id)
        );
        return;

    })
    $(document).on('click', '.return-sub', function () {

        let cus_sts_id = $(this).attr('value');
        let cp_id = $(this).attr('data-id');
        cus_sts = 7;
        swalConfirm(
            "Move",
            "Are you sure to return to Sub Status?",
            () => moveToNext(cus_sts_id, cus_sts, cp_id)
        );
        return;

    })
    function moveToNext(cus_sts_id, cus_sts, cp_id) {
        let cusid = $('#cus_id').val();
        $.post('api/common_files/move_to_next.php', { cus_sts_id, cus_sts }, function (response) {
            if (response == '0') {
                let alertName;
                if (cus_sts == '15') {
                    alertName = 'Moved To Error';
                }
                else if (cus_sts == '16') {
                    alertName = 'Moved To Legal';
                }
                else if (cus_sts == '7') {
                    alertName = 'Moved To Sub Status';
                }

                swalSuccessOk('Success', alertName);
                OnLoadFunctions(cusid, function () {
                    getSubStatus(cp_id); // runs only after table is populated
                });

            } else {
                swalError('Alert', 'Failed To Move');
            }
        }, 'json');
    }


    {
        // Get today's date
        var today = new Date().toISOString().split("T")[0];

        // Set the minimum date in the date input to today
        $("#commitment_date").attr("min", today);
    }

    $("#follow_type").change(function () {
        let type = $(this).val();
        let append;
        if (type == 1) {
            //direct
            append = `<option value="">Select Follow Up Status</option><option value='1'>Commitment</option><option value='2'>Unavailable</option>`;
            $(".person-div").hide();
            $(".person-div").find(':input').val('');
        } else if (type == 2) {
            //mobile
            append = `<option value="">Select Follow Up Status</option> <option value='1'>Commitment</option> <option value='2'>RNR</option> <option value='3'>Not Reachable</option> <option value='4'>Switch Off</option> <option value='5'>Not in Use</option> <option value='6'>Blocked</option>`;
            $(".person-div").hide();
            $(".person-div").find(':input').val('');
        } else {
            append = `<option value="">Select Follow Up Status</option>`;
            $(".person-div").hide();
            $(".person-div").find(':input').val('');
        }
        $("#follow_status").empty().append(append);
    });

    $("#follow_status").change(function () {
        let follow_status = $(this).val();
        if (follow_status == 1) {
            //commitment
            $(".person-div").show();
        } else {
            $(".person-div").hide();
        }
    });

    $(document).on('click', '.commitment-form', function () {
        var cp_id = $(this).attr('value');
        $("#cp_id").val(cp_id);
        $('#add_commitment_info_modal').modal('show');
        getUserInfo();
    });

    $('#follow_person_name').change(function () {
        let follow_person_name = $(this).val();
        emptyholderFields();
        if (follow_person_name == '1' || follow_person_name == '2') {
            $("#person_name").show();
            $("#person_name1").hide();
            $("#person_name1").empty();
            let cus_profile_id = $('#cp_id').val();
            getNameRelationship(cus_profile_id, follow_person_name);
        } else if (follow_person_name == '3') {
            $("#person_name1").show(); //select box
            $("#person_name").hide();
            $("#person_name").empty();
            getFamilyMember('Select Family Member', '#person_name1');
        }
    });

    $('#person_name1').change(function () {
        let famMemId = $(this).val();
        if (famMemId != '') {
            getNameRelationship(famMemId, '3');
        }
    });

    $('#submit_commitment').click(function (event) {
        event.preventDefault();

        let commitmentInfo = {
            'cp_id': $('#cp_id').val(),
            'cus_id': $('#cus_id').val(),
            'follow_up_date': $('#follow_up_date').val(),
            'follow_type': $('#follow_type').val(),
            'follow_status': $('#follow_status').val(),
            'follow_person_name': $('#follow_person_name').val(),
            'person_name': $('#person_name').val(),
            'person_name1': $('#person_name1').val(),
            'relationship': $('#relationship').val(),
            'commitment_date': $('#commitment_date').val(),
            'remark': $('#remark').val(),
            'user_type': $('#user_type').val(),
            'user_name': $('#user_name').val(),
            'hint': $('#hint').val(),
        };

        var data = ['follow_type', 'follow_status', 'remark', 'hint'];
        var isValid = true;

        // Basic required fields validation
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });

        // Additional conditional validation
        let followType = $('#follow_type').val();
        let followStatus = $('#follow_status').val();
        let followPerson = $('#follow_person_name').val();

        if ((followType === '1' || followType === '2') && followStatus === '1') {
            if ($('#follow_person_name').val() === '') {
                validateField('', 'follow_person_name');
                isValid = false;
            }

            if ($('#commitment_date').val() === '') {
                validateField('', 'commitment_date');
                isValid = false;
            }

            if (followPerson === '3' && $('#person_name1').val() === '') {
                validateField('', 'person_name1');
                isValid = false;
            }
        }

        if (isValid) {
            $.post('api/collection_files/submit_commitment_info.php', commitmentInfo, function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'Commitment Info Added Successfully');
                    $(".closeModal").trigger("click");
                } else {
                    swalError('Alert', 'Failed');
                }
            });
        }
    });


    $(document).on('click', '#back_to_loan_list', function () {
        let cusid = $('#cus_id').val();
        OnLoadFunctions(cusid);
        $('.clearFields').val('');
        $('.colls-cntnr').show();
        $('#back_to_coll_list').show();
        $('.coll_details').hide();
        $('#back_to_loan_list').hide();
        $('#collection_mode').trigger('change');
        $('#coll_main_container input').css('border', '1px solid #cecece');
        $('#coll_main_container select').css('border', '1px solid #cecece');
    });


    function printCollection(coll_id) {
        Swal.fire({
            title: 'Print',
            text: 'Do you want to print this collection?',
            imageUrl: 'img/printer.png',
            imageWidth: 300,
            imageHeight: 210,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#009688',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'api/collection_files/print_collection.php',
                    data: { 'coll_id': coll_id },
                    type: 'POST',
                    cache: false,
                    success: function (html) {
                        // Update the HTML content inside #printcollection div
                        $('#printcollection').html(html);

                        // Print the content inside the #printcollection div
                        var content = $("#printcollection").html();
                    },
                    error: function (xhr, status, error) {
                        console.error('AJAX Error:', status, error);
                    }
                });
            }
        });
    }


    $('#due_amt_track, #princ_amt_track, #int_amt_track, #penalty_track , #coll_charge_track').blur(function () {

        var due_amt_track = ($('#due_amt_track').val() != '') ? $('#due_amt_track').val().replace(/,/g, '') : 0;
        var penalty_track = ($('#penalty_track').val() != '') ? $('#penalty_track').val().replace(/,/g, '') : 0;
        var coll_charge_track = ($('#coll_charge_track').val() != '') ? $('#coll_charge_track').val().replace(/,/g, '') : 0;
        var princ_amt_track = ($('#princ_amt_track').val() != '') ? $('#princ_amt_track').val().replace(/,/g, '') : 0;
        var int_amt_track = ($('#int_amt_track').val() != '') ? $('#int_amt_track').val().replace(/,/g, '') : 0;

        var total_paid_track = parseInt(due_amt_track) + parseInt(princ_amt_track) + parseInt(int_amt_track) + parseInt(penalty_track) + parseInt(coll_charge_track);
        $('#total_paid_track').val(moneyFormatIndia(total_paid_track));

        $('#trans_id, #trans_date, #bank_clr_bank_id, #bank_clr_trans_amnt').val('');

    });

    $('#pre_close_waiver , #penalty_waiver , #coll_charge_waiver').blur(function () {

        var pre_close_waiver = ($('#pre_close_waiver').val() != '') ? $('#pre_close_waiver').val().replace(/,/g, '') : 0;
        var penalty_waiver = ($('#penalty_waiver').val() != '') ? $('#penalty_waiver').val().replace(/,/g, '') : 0;
        var coll_charge_waiver = ($('#coll_charge_waiver').val() != '') ? $('#coll_charge_waiver').val().replace(/,/g, '') : 0;

        var total_waiver = parseInt(pre_close_waiver) + parseInt(penalty_waiver) + parseInt(coll_charge_waiver);
        $('#total_waiver').val(moneyFormatIndia(total_waiver));

    });

    $(document).on('click', '.due-chart', function () {
        var cp_id = $(this).attr('value');
        var cus_id = $('#cus_id').val();
        $('#due_chart_table_div').empty();
        dueChartList(cp_id, cus_id); // To show Due Chart List.
        setTimeout(() => {
            $('.print_due_coll').click(function () {
                var id = $(this).attr('value');
                Swal.fire({
                    title: 'Print',
                    text: 'Do you want to print this collection?',
                    imageUrl: 'img/printer.png',
                    imageWidth: 300,
                    imageHeight: 210,
                    imageAlt: 'Custom image',
                    showCancelButton: true,
                    confirmButtonColor: '#009688',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'No',
                    confirmButtonText: 'Yes'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            url: 'api/collection_files/print_collection.php',
                            data: { 'coll_id': id },
                            type: 'post',
                            cache: false,
                            success: function (html) {
                                $('#printcollection').html(html)
                                // Get the content of the div element
                                var content = $("#printcollection").html();
                            }
                        })
                    }
                })
            })
        }, 1000)
    });

    $(document).on('click', '.penalty-chart', function () {
        let cp_id = $(this).attr('value');
        let cus_id = $('#cus_id').val();
        $.ajax({
            //to insert penalty by on click
            url: 'api/collection_files/collection_loan_details.php',
            data: { 'cp_id': cp_id },
            dataType: 'json',
            type: 'post',
            cache: false,
            success: function (response) {
                penaltyChartList(cp_id, cus_id); //To show Penalty List.
            }
        })
    });

    $(document).on('click', '.fine-chart', function () {
        var cp_id = $(this).attr('value');
        fineChartList(cp_id) //To Show Fine Chart List
    });

    $(document).on('click', '.commitment-chart', function () {
        var cp_id = $(this).attr('value');
        commitmentChartList(cp_id) //To Show commitment Chart List
        $('#commitment_model').modal('show');
    });

    $('#collection_mode').on('change', function () {
        resetValidation();
    });

    $('#bank_id').change(function () {
        $('#trans_id, #trans_date, #bank_clr_bank_id, #bank_clr_trans_amnt').val('');
    });

    //Transaction id validation
    $("#trans_id").keydown(function () { //clear transaction date if changes in trans id becuase if by chance changing trans id after gets trans date means it take while a time to reflect new date in mean time able to submit with old date.  
        $('#trans_date').val('');
    });

    $("#trans_id").blur(async function () {
        let bankId = $('#bank_id').val();
        if (!bankId) {
            swalError("Kindly select Bank Name!");
            return;
        }

        let totalPaidTrack = $('#total_paid_track').val() != '' ? $('#total_paid_track').val().replace(/,/g, '') : 0;
        if (!totalPaidTrack) {
            swalError("Kindly Fill Collection Track!");
            return;
        }

        let transId = $('#trans_id').val();
        let response = await checkBankTransactionDetails('credit', bankId, transId, totalPaidTrack);
        if (!response.status) {
            swalError(response.message);
            $('#trans_id').val('');
            return;
        }

        let alertStatus = response.data.alert_status;
        if (alertStatus) {
            swalError(response.data.alert);
            $('#trans_id').val('');
        } else {
            $('#trans_date').val(response.data.trans_date);
            $('#bank_clr_bank_id').val(response.data.id);
            $('#bank_clr_trans_amnt').val(response.data.transaction_amount);
        }

    });
    $('#submit_collection').click(function (event) {
        event.preventDefault();
        $(this).attr('disabled', true);
        let CusProfileId = $('#cp_id').val();
        let collData = {
            'cp_id': CusProfileId,
            'cus_id': $('#cus_id').val(),
            'cus_name': $('#cus_name').val(),
            'area_id': $('#area_id').val(),
            'branch_id': $('#branch_id').val(),
            'line_id': $('#line_id').val(),
            'loan_category_id': $('#loan_category_id').val(),
            'status': $('#status').val(),
            'sub_status': $('#sub_status').val().trim(), // Ensure sub_status is retrieved properly
            'tot_amt': $('#tot_amt').val().replace(/,/g, ''),
            'paid_amt': $('#paid_amt').val().replace(/,/g, ''),
            'bal_amt': $('#bal_amt').val().replace(/,/g, ''),
            'due_amt': $('#due_amt').val().replace(/,/g, ''),
            'pending_amt': $('#pending_amt').val().replace(/,/g, ''),
            'payable_amt': $('#payable_amt').val().replace(/,/g, ''),
            'penalty': $('#penalty').val().replace(/,/g, ''),
            'coll_charge': $('#coll_charge').val().replace(/,/g, ''),
            'due_amt_track': $('#due_amt_track').val().replace(/,/g, ''),
            'princ_amt_track': $('#princ_amt_track').val().replace(/,/g, ''),
            'int_amt_track': $('#int_amt_track').val().replace(/,/g, ''),
            'penalty_track': $('#penalty_track').val().replace(/,/g, ''),
            'coll_charge_track': $('#coll_charge_track').val().replace(/,/g, ''),
            'total_paid_track': $('#total_paid_track').val().replace(/,/g, ''),
            'pre_close_waiver': $('#pre_close_waiver').val().replace(/,/g, ''),
            'penalty_waiver': $('#penalty_waiver').val().replace(/,/g, ''),
            'coll_charge_waiver': $('#coll_charge_waiver').val().replace(/,/g, ''),
            'total_waiver': $('#total_waiver').val().replace(/,/g, ''),
            'collection_date': $('#collection_date').val(),
            'collection_id': $('#collection_id').val(),
            'collection_method': $('#collection_method').val(),
            'collection_mode': $('#collection_mode').val(),
            'bank_id': $('#bank_id').val(),
            'cheque_no': $('#cheque_no').val(),
            'trans_id': $('#trans_id').val(),
            'trans_date': $('#trans_date').val(),
            'bank_clr_trans_amnt': $('#bank_clr_trans_amnt').val(),
            'bank_clr_bank_id': $('#bank_clr_bank_id').val(),

        };

        if (isFormDataValid(collData)) {
            $.post('api/collection_files/submit_collection.php', collData, function (response) {
                console.log("Response from submit_collection:", response);

                if (response.result == '1') {
                    swalSuccess('Success', 'Collection Added Successfully.');
                } else if (response.result == '2') {
                    swalError('Error', 'Failed to Insert Collection');
                } else if (response.result == '3') {
                    swalSuccess('Success', 'Moved to Closed Successfully.');
                }

                $('#submit_collection').attr('disabled', false);
                $('#back_to_loan_list').trigger('click');

                setTimeout(function () {
                    if (response.coll_id) {
                        printCollection(response.coll_id); // Ensure coll_id is passed correctly
                    }
                    getSubStatus(CusProfileId); // Call function AFTER ensuring data is updated
                }, 1000);

            }, 'json')
        } else {
            $('#submit_collection').attr('disabled', false);
        }
    }); //submit END.



    $(document).on('click', '.due-chart', function () {
        $('#due_chart_model').modal('show');
    });

    $(document).on('click', '.penalty-chart', function () {
        $('#penalty_model').modal('show');
    });

    $(document).on('click', '.fine-chart', function (e) {
        $('#fine_model').modal('show');
    });

    $(document).on('click', '.fine-form', function (e) {
        let cpid = $(this).attr('value');
        $('#fine_cp_id').val(cpid);
        $('#fine_form_modal').modal('show');
        setCurrentDate('#fine_date');
        getFineFormTable(cpid);
    });

    //Fine Submit
    $('#fine_form_submit').click(function (event) {
        event.preventDefault();
        let fine_cp_id = $('#fine_cp_id').val();
        let cus_id = $('#cus_id').val();
        let fine_date = $('#fine_date').val();
        let fine_purpose = $('#fine_purpose').val();
        let fine_Amnt = $('#fine_Amnt').val();
        var data = ['fine_cp_id', 'cus_id', 'fine_date', 'fine_purpose', 'fine_Amnt']

        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });

        if (isValid) {
            $.post('api/collection_files/submit_fine_form.php', { fine_cp_id, cus_id, fine_date, fine_purpose, fine_Amnt }, function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'Fine Added Successfully.');
                    getFineFormTable(fine_cp_id);
                } else {
                    swalError('Error', 'Failed to Add Fine');
                }
            }, 'json');
        }
    })

});
/////////////////////////////////////////////////////////////////////////   Document END /////////////////////////////////////////////////////////////////////////

$(function () {
    getCollectionListTable('');
});

function getCollectionListTable(collection_status) {
    let params = { 'collection_status': collection_status };
    serverSideTable('#collection_list_table', params, 'api/collection_files/collection_list.php');
}

function swapTableAndCreation() {
    if ($('#collection_list').is(':visible')) {
        $('#collection_list').hide();
        $('#coll_main_container').show();
        $('#back_to_coll_list').show();

    } else {
        $('#collection_list').show();
        $('#coll_main_container').hide();
        $('#back_to_coll_list').hide();
        // getCollectionListTable();
    }
}

function getSubStatus(cp_id) {
    let sub_status = '';
    $('#loan_list_table tbody tr').each(function () {
        const row_cp_id = $(this).find('.fine-form').attr('value');
        if (row_cp_id == cp_id) {
            // Get Sub Status from 8th column (adjust index if needed)
            sub_status = $(this).find('td:nth-child(8)').text().trim();
        }
    });
    $.ajax({
        url: 'api/common_files/subStatus_list.php',
        data: { cp_id, sub_status },
        dataType: 'json',
        type: 'post',
        cache: false,
        success: function (response) {
            console.log("Response received:", response);
        }
    })
}

function getPersonalInfo(cusId, sts) {
    $.post('api/common_files/personal_info.php', { cus_id: cusId }, function (response) {
        if (response.length > 0) {
            $('#coll_sts').val(sts);
            $('#cus_id').val(response[0].cus_id);
            $('#aadhar_num').val(response[0].aadhar_num);
            $('#cus_name').val(response[0].cus_name);
            $('#cus_area').val(response[0].area);
            $('#cus_branch').val(response[0].branch_name);
            $('#cus_line').val(response[0].linename);
            $('#cus_mobile').val(response[0].mobile1);
            $('#area_id').val(response[0].area_id);
            $('#line_id').val(response[0].line_id);
            $('#branch_id').val(response[0].branch_id);

            let path = "uploads/loan_entry/cus_pic/";
            var img = $('#cus_image');
            if (response[0].pic != '') {
                img.attr('src', path + response[0].pic);
            } else {
                img.attr('src', 'img/avatar.png');
            }
        }
    }, 'json');
}

function getBankNames() {
    $.ajax({
        url: 'api/accounts_files/bank_clearance_files/getUserBasedbank.php',
        data: {},
        dataType: 'json',
        type: 'post',
        cache: false,
        success: function (response) {
            $('#bank_id').empty();
            $('#bank_id').append('<option value="">Select Bank Name</option>');
            $.each(response, function (ind, val) {
                $('#bank_id').append('<option value="' + val['id'] + '">' + val['bank_name'] + '</option>');
            })

        }
    })
}

function getChequeList() {
    let cp_id = $('#cp_id').val();
    $.ajax({
        url: 'api/common_files/cheque_no_list.php',
        data: { cp_id },
        dataType: 'json',
        type: 'post',
        cache: false,
        success: function (response) {
            $('#cheque_no').empty();
            $('#cheque_no').append('<option value="">Select Cheque No</option>');
            $.each(response, function (ind, val) {
                $('#cheque_no').append('<option value="' + val['id'] + '">' + val['cheque_no'] + '</option>');
            })

        }
    })
}

function OnLoadFunctions(cus_id, callback) {
    //To get loan sub Status
    var pending_arr = [];
    var od_arr = [];
    var due_nil_arr = [];
    var balAmnt = [];
    $.ajax({
        url: 'api/collection_files/resetCustomerStatus.php',
        data: { 'cus_id': cus_id },
        dataType: 'json',
        type: 'post',
        cache: false,
        success: function (response) {
            if (response.length != 0) {
                let pendingCount = (response['pending_customer']) ? response['pending_customer'].length : 0;
                for (var i = 0; i < pendingCount; i++) {
                    pending_arr[i] = response['pending_customer'][i]
                    od_arr[i] = response['od_customer'][i]
                    due_nil_arr[i] = response['due_nil_customer'][i]
                    balAmnt[i] = response['balAmnt'][i]
                }
                var pending_sts = pending_arr.join(',');
                $('#pending_sts').val(pending_sts);
                var od_sts = od_arr.join(',');
                $('#od_sts').val(od_sts);
                var due_nil_sts = due_nil_arr.join(',');
                $('#due_nil_sts').val(due_nil_sts);
                balAmnt = balAmnt.join(',');
            }
        }
    }).then(function () {
        showOverlay();//loader start
        var pending_sts = $('#pending_sts').val()
        var od_sts = $('#od_sts').val()
        var due_nil_sts = $('#due_nil_sts').val()
        var bal_amt = balAmnt;
        $.ajax({
            //in this file, details gonna fetch by customer ID, Not by req id (Because we need all loans from customer)
            url: 'api/collection_files/collection_loan_list.php',
            data: { 'cus_id': cus_id, 'pending_sts': pending_sts, 'od_sts': od_sts, 'due_nil_sts': due_nil_sts, 'bal_amt': bal_amt },
            type: 'post',
            dataType: 'json',
            cache: false,
            success: function (response) {
                $('.overlay').remove();
                var columnMapping = [
                    'sno',
                    'loan_id',
                    'loan_category',
                    'issue_date',
                    'loan_amount',
                    'bal_amount',
                    'status',
                    'sub_status',
                    'charts',
                    'action'
                ];
                appendDataToTable('#loan_list_table', response, columnMapping);
                setdtable('#loan_list_table');
                //Dropdown in List Screen
                setDropdownScripts();
                if (typeof callback === 'function') {
                    callback();
                }
            }
        });
        hideOverlay();//loader stop
    });
}//Auto Load function END

function getCollectionCode() {
    $.ajax({
        url: 'api/collection_files/collection_code.php',
        data: {},
        dataType: 'json',
        type: 'post',
        cache: false,
        success: function (response) {
            $('#collection_id').val(response)
        }
    });
}
function resetValidation() {
    const fieldsToReset = [
        'bank_id', 'cheque_no', 'trans_id',
        'trans_date']
    fieldsToReset.forEach(fieldId => {
        $('#' + fieldId).css('border', '1px solid #cecece');

    });
}
//validation
function isFormDataValid(collData) {
    let isValid = true;

    let due = parseFloat(collData['due_amt_track']) || 0;
    let penalty = parseFloat(collData['penalty_track']) || 0;
    let fine = parseFloat(collData['coll_charge_track']) || 0;
    let waiver = parseFloat(collData['total_waiver']) || 0;

    // Check if all four fields are empty
    if (due == 0 && penalty == 0 && fine == 0 && waiver == 0) {

        validateField(collData['due_amt_track'], 'due_amt_track');
        validateField(collData['penalty_track'], 'penalty_track');
        validateField(collData['coll_charge_track'], 'coll_charge_track');

        isValid = false;

    } else {
        // reset border if valid
        $('#due_amt_track').css('border', '1px solid #cecece');
        $('#penalty_track').css('border', '1px solid #cecece');
        $('#coll_charge_track').css('border', '1px solid #cecece');
    }
    if (!validateField(collData['collection_method'], 'collection_method')) {
        isValid = false;
    }
    // Validate collection_mode
    if (!validateField(collData['collection_mode'], 'collection_mode')) {
        isValid = false;
    } else {
        if (collData['collection_mode'] == '2') { // cheque
            let validations = [
                validateField(collData['bank_id'], 'bank_id'),
                validateField(collData['cheque_no'], 'cheque_no'),
                validateField(collData['trans_id'], 'trans_id'),
                validateField(collData['trans_date'], 'trans_date')
            ];
            if (!validations.every(result => result)) {
                isValid = false;
            }
        } else if (['3', '4', '5'].includes(collData['collection_mode'])) { // ECS / IMPS/NEFT/RTGS / UPI Transaction
            let validations = [
                validateField(collData['bank_id'], 'bank_id'),
                validateField(collData['trans_id'], 'trans_id'),
                validateField(collData['trans_date'], 'trans_date')
            ];
            if (!validations.every(result => result)) {
                isValid = false;
            }
        }
    }

    return isValid;
}
function closeChartsModal() {
    $('#due_chart_model').modal('hide');
    $('#penalty_model').modal('hide');
    $('#fine_model').modal('hide');
    $('#commitment_model').modal('hide');
}

function closeCommitmentModal() {
    $('#add_commitment_info_modal').modal('hide');
    $(".person-div").hide();
    $('#commitment_form select').each(function () {
        $(this).val($(this).find('option:first').val());
    });
    $('#commitment_form input').each(function () {
        const excludeIds = ['follow_up_date', 'user_type', 'user_name'];
        if (!excludeIds.includes($(this).attr('id'))) {
            $(this).val('');
        }
    });
    $('#commitment_form input').css('border', '1px solid #cecece');
    $('#commitment_form select').css('border', '1px solid #cecece');
}

function getUserInfo() {
    $.post('api/collection_files/user_info.php', function (response) {
        if (response) {
            $('#user_name').val(response.user_name);
            $('#user_type').val(response.role_name);
        }
    }, 'json');
}


function closeFineChartModal() {
    $('#fine_form_modal').modal('hide');
    let cus_id = $('#cus_id').val();
    OnLoadFunctions(cus_id);
}

function getFineFormTable(cp_id) {
    $.post('api/collection_files/fine_form_list.php', { cp_id }, function (response) {
        let fineColumn = [
            'sno',
            'coll_date',
            'coll_purpose',
            'coll_charge'
        ];
        appendDataToTable('#fine_form_table', response, fineColumn);
        setdtable('#fine_form_table');

        $('#fine_purpose').val('');
        $('#fine_Amnt').val('');
        $('#fine_purpose').css('border', '1px solid #cecece');
        $('#fine_Amnt').css('border', '1px solid #cecece');
    }, 'json');
}

function getNameRelationship(id, type) {
    $.post('api/loan_issue_files/get_cus_fam_members.php', { id, type }, function (response) {
        if (type == '1') {
            $('#person_name').val(response[0].cus_name);
            $('#relationship').val('Customer');
        } else {
            $('#person_name').val(response[0].fam_name);
            $('#person_name').attr('data-id', response[0].id);
            $('#relationship').val(response[0].fam_relationship);
        }
    }, 'json');
}

function getFamilyMember(optn, selector) {
    return new Promise((resolve, reject) => {
        const cus_id = $('#cus_id').val();
        const follow_person_name = $('#follow_person_name').val(); // Get current holder type
        $.post('api/loan_issue_files/get_guarantor.php', { cus_id }, function (response) {

            let appendOption = `<option value=''>${optn}</option>`; // Default option

            // Loop through response to build options
            $.each(response, function (index, val) {
                if (val.type === 'Customer' && follow_person_name !== '3') {
                    appendOption += `<option value='0'>${val.name}</option>`;
                } else if (val.type === 'Family') {
                    appendOption += `<option value='${val.id}'>${val.name}</option>`;
                }
            });

            $(selector).empty().append(appendOption); // Populate the select box
            resolve();
        }, 'json').fail((jqXHR, textStatus, errorThrown) => {
            reject(`Request failed: ${textStatus}`);
        });
    });
}

function emptyholderFields() {
    $('#person_name1').val('');
    $('#person_name').val('');
    $('#relationship').val('');
}

//Due Chart List
function dueChartList(cp_id, cus_id) {
    $.ajax({
        url: 'api/collection_files/get_due_chart_list.php',
        data: { 'cp_id': cp_id, 'cus_id': cus_id },
        type: 'post',
        cache: false,
        success: function (response) {
            $('#due_chart_table_div').empty();
            $('#due_chart_table_div').html(response);
        }
    }).then(function () {

        $.post('api/collection_files/get_due_method_name.php', { cp_id }, function (response) {
            $('#dueChartTitle').text('Due Chart ( ' + response['due_method'] + ' - ' + response['loan_type'] + ' )');
        }, 'json');
    })

}

//Penalty Chart List
function penaltyChartList(cp_id, cus_id) {
    $.ajax({
        url: 'api/collection_files/get_penalty_chart_list.php',
        data: { 'cp_id': cp_id, 'cus_id': cus_id },
        type: 'post',
        cache: false,
        success: function (response) {
            $('#penalty_chart_table_div').empty()
            $('#penalty_chart_table_div').html(response)
        }
    });//Ajax End.
}

//Fine Chart List
function fineChartList(cp_id) {
    $.ajax({
        url: 'api/collection_files/get_fine_chart_list.php',
        data: { 'cp_id': cp_id },
        type: 'post',
        cache: false,
        success: function (response) {
            $('#fine_chart_table_div').empty()
            $('#fine_chart_table_div').html(response)
        }
    });//Ajax End.
}

function commitmentChartList(cp_id) {
    $.post('api/collection_files/get_commitment_chart_list.php', { cp_id }, function (response) {

        let commitmentColumns = [
            "sno",
            "follow_up_date",
            "follow_type",
            "follow_status",
            "follow_person_name",
            "person_name",
            "relationship",
            "remark",
            "commitment_date",
            "user_type",
            "user_name",
            "hint",
            "comm_err"
        ];

        appendDataToTable('#commitment_chart_table', response, commitmentColumns);
        setdtable('#commitment_chart_table');

    }, 'json');
}

