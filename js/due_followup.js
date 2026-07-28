const subStatusMultiselect = new Choices('#sub_status_mapping', {
    removeItemButton: true,
    noChoicesText: 'Select Customer Status',
    allowHTML: true
});
const branchChoices = new Choices('#branch_name', {
    removeItemButton: true,
    noChoicesText: 'No branches available',
    allowHTML: true,
});
const lineChoices = new Choices('#line', {
    removeItemButton: true,
    noChoicesText: 'No line available',
    allowHTML: true,
});
//Loan Category Multi select initialization
const loan_category = new Choices('#loan_cat', {
    removeItemButton: true,
    noChoicesText: 'Select Loan Category',
    allowHTML: true
});
$(document).ready(function () {

    $('#show_due_followup').click(function () {
        let cusSts = $("#sub_status_mapping").val();
        let comm_date = $("#comm_date").val();
       let branch = $("#branch_name").val();
       let line = $("#line").val();
       let loan_cat = $("#loan_cat").val();
       OnLoadFunctions (cusSts, comm_date,branch,line,loan_cat);
    });

    $(document).on('click', '.loan_list', function () {
        $('#back_btn').show();
        $('.loan_list_div').show();
        $('.due_list_div').hide();
        let cus_id = $(this).attr('value');
        getLoanListTable(cus_id)
    });

    $(document).on('click', '#back_btn', function () {
        $('#back_btn').hide();
        $('.loan_list_div').hide();
        $('.due_list_div').show();
        // getSubStsMapping(); // Call Customer status dropdown.
        let cusSts = $("#sub_status_mapping").val();
        let commDate = $("#comm_date").val();
        let branch = $("#branch_name").val();
       let line = $("#line").val();
       let loan_cat = $("#loan_cat").val();

        if (cusSts != '') {
            OnLoadFunctions(cusSts, commDate,branch,line,loan_cat);
        }
    });

    //////////////////////////////Chart Start///////////////////////////////////////////////////////////////////////////
    $(document).on('click', '.due-chart', function () {
        $('#due_chart_model').modal('show');
        var cp_id = $(this).attr('value');
        var cus_id = $(this).attr('data-value');
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
        $('#penalty_model').modal('show');
        let cp_id = $(this).attr('value');
        var cus_id = $(this).attr('data-value');
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
        $('#fine_model').modal('show');
        var cp_id = $(this).attr('value');
        fineChartList(cp_id) //To Show Fine Chart List
    });

    $(document).on('click', '.commitment-chart', function () {
        var cp_id = $(this).attr('value');
        commitmentChartList(cp_id) //To Show commitment Chart List
        $('#commitment_model').modal('show');
    });
    /////////////////////////////////////////Chart End///////////////////////////////////
    ////////////////////////////////////Customer Profile start//////////////////////////////
    $(document).on('click', '.customer-profile', function () {
        $('#loan_entry_content').show();
        $('#back_btn').hide();
        $('#cus_back_btn').show();
        $('.loan_list_div, .due_list_div').hide();
        let id = $(this).attr('value');
        $('#cus_profile_id').val(id)
        editCustmerProfile(id)

    });
    $('#cus_back_btn').click(function () {
        $('#back_btn').show();
        $('#cus_back_btn').hide();
        $('#loan_entry_content').hide();
        $('.loan_list_div').show();

    });
    $('#guarantor_name').change(function () {
        var guarantorId = $(this).val();
        if (guarantorId) {
            getGrelationshipName(guarantorId);
        } else {
            $('#relationship').val('');
        }
    })

    $('#area').change(function () {
        var areaId = $(this).val();
        if (areaId) {
            getAlineName(areaId);
        }
    });

    $('#pic').change(function () {
        let pic = $('#pic')[0];
        let img = $('#imgshow');
        compressImage(this, 200)
        img.attr('src', URL.createObjectURL(pic.files[0]));
    })

    $('#gu_pic').change(function () {
        let pic = $('#gu_pic')[0];
        let img = $('#gur_imgshow');
        compressImage(this, 200)
        img.attr('src', URL.createObjectURL(pic.files[0]));
    })
    ////////////////////////////////////Customer Profile End//////////////////////////////
    ////////////////////////////Documentation Start//////////////////////////
    $(document).on('click', '.documentation', function () {
        $('#document_content').show();
        $('#back_btn').hide();
        $('.loan_list_div, .due_list_div').hide();
        let id = $(this).attr('value'); //Customer Profile id From List page.
        $('#customer_profile_id').val(id);
        let cusID = $(this).attr('data-id'); //Cus id From List Page.
        $('#cus_id').val(cusID);
        $('.signed-div').hide();
        $('.cheque-div').hide();
        $('.doc_div').hide();
        $('.mortgage-div').hide();
        $('.endorsement-div').hide();
        $('.gold-div').hide();
        getSignedDocInfoTable();
        getChequeInfoTable();
        getDocInfoTable();
        getMortInfoTable();
        getEndorsementInfoTable();
        getGoldInfoTable();

    });

    $('#doc_back_btn').click(function () {
        $('#back_btn').show();
        $('.loan_list_div').show();
        $('#document_content').hide();
    });
    ///////////////////////////////////Documentation End/////////////////////
    ///////////////////////////////////Loan Calcualtion Start/////////////////////
    $(document).on('click', '.loan-calculation', function () {
        $('#loan_content').show();
        $('#back_btn').hide();
        $('.loan_list_div, .due_list_div').hide();
        let loanCalcId = $(this).attr('value');
        $('#loan_calculation_id').val(loanCalcId);
        loanCalculationEdit(loanCalcId);
        callLoanCaculationFunctions();

    });
    $('#loan_back_btn').click(function () {
        $('#back_btn').show();
        $('.loan_list_div').show();
        $('#loan_content').hide();
    });


    $('#loan_category_calc').change(function () {
        if ($(this).val() != '') {
            $('#loan_amount_calc').val('')
            getLoanCatDetails($(this).val());
            $('#profit_type_calc').val('').trigger('change');
            $('#loan_category_calc2').val($(this).val())
        }
    });


    $('#scheme_due_method_calc').change(function () {
        let schemeDueMethod = $(this).val();
        let loanCatId = $('#loan_category_calc').val();
        dueMethodScheme(schemeDueMethod, loanCatId);
        $('#due_startdate_calc').val('');
        $('#maturity_date_calc').val('');
    });

    $('#scheme_name_calc').change(function () { //Scheme Name change event
        let scheme_id = $(this).val();
        schemeCalAjax(scheme_id);
        $('#due_startdate_calc').val('');
        $('#maturity_date_calc').val('');
    });

    $('#refresh_cal').click(function () {
        $('.int-diff').text('*'); $('.due-diff').text('*'); $('.doc-diff').text('*'); $('.proc-diff').text('*'); $('.refresh_loan_calc').val('');
        let loan_amt = $('#loan_amount_calc').val(); let int_rate = $('#interest_rate_calc').val(); let due_period = $('#due_period_calc').val(); let doc_charge = $('#doc_charge_calc').val(); let proc_fee = $('#processing_fees_calc').val();

        if (loan_amt != '' && int_rate != '' && due_period != '' && doc_charge != '' && proc_fee != '') {
            let due_type = $('#due_type_calc').val(); //If Changes not found in profit method, calculate loan amt for monthly basis
            if (due_type == 'Interest') {
                getLoanInterest(loan_amt, int_rate, doc_charge, proc_fee);

            } else if (due_type == 'EMI') {
                getLoanAfterInterest(loan_amt, int_rate, due_period, doc_charge, proc_fee);
            }

            let due_method_scheme = $('#scheme_due_method_calc').val();
            if (due_method_scheme == '1') {//Monthly scheme as 1
                getLoanMonthly(loan_amt, int_rate, due_period, doc_charge, proc_fee);

            } else if (due_method_scheme == '2') {//Weekly scheme as 2
                getLoanWeekly(loan_amt, int_rate, due_period, doc_charge, proc_fee);

            } else if (due_method_scheme == '3') {//Daily scheme as 3
                getLoanDaily(loan_amt, int_rate, due_period, doc_charge, proc_fee);

            }
            changeInttoBen();
        } else {
            swalError('Warning', 'Kindly Fill the Calculation fields.')
        }
    });

    {
        // Get today's date
        var today = new Date().toISOString().split('T')[0];
        //Set loan date
        $('#loan_date_calc').val(today);
        //Due start date -- set min date = current date.
        $('#due_startdate_calc').attr('min', today);
    }

    $('#scheme_day_calc').change(function () {
        $('#due_start_from').val('');
        $('#maturity_month').val('');
    })

    $('#referred_calc').change(function () {
        let referred = $('#referred_calc').val();
        if (referred == '0') {
            $('#agent_id_calc').prop('disabled', true).val('');
            $('#agent_name_calc').val('');
            getAgentID();
        } else {

            $('#agent_id_calc').prop('disabled', true).val('');
            $('#agent_name_calc').prop('readonly', true).val('');
        }
    });


    ///////////////////////////////////Loan Calculation End/////////////////////
    ///////////////////////////////////Loan History Start/////////////////////
    $(document).on('click', '.loan-history', function () {
        $('#loan_history_content').show();
        $('#back_btn').hide();
        $('.loan_list_div, .due_list_div').hide();
        let cus_id = $(this).attr('value');
        getLoanHistoryTable(cus_id)


    });
    $('#loan_his_back_btn').click(function () {
        $('#back_btn').show();
        $('.loan_list_div').show();
        $('#loan_history_content').hide();
    });

    ///////////////////////////////////Loan History End/////////////////////
    ///////////////////////////////////Document History Start/////////////////////
    $(document).on('click', '.doc-history', function () {
        $('#document_history_content').show();
        $('#back_btn').hide();
        $('.loan_list_div, .due_list_div').hide();
        let cus_id = $(this).attr('value');
        getDocumentHistoryTable(cus_id)


    });
    $('#doc_his_back_btn').click(function () {
        $('#back_btn').show();
        $('.loan_list_div').show();
        $('#document_history_content').hide();
    });

    ///////////////////////////////////Document History End/////////////////////
    ///////////////////////////////////Commitement Start/////////////////////

    {
        // Get today's date
        var today = new Date();

        // Extract day, month, and year
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
        var year = today.getFullYear();

        // Construct the date in dd-mm-yyyy format
        var formattedDate = day + '-' + month + '-' + year;

        $('#follow_up_date').val(formattedDate);
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
        var cus_id = $(this).attr('data-value')
        $("#comm_cus_id").val(cus_id);
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
            'cus_id': $('#comm_cus_id').val(),
            'follow_up_date': $('#follow_up_date').val(),
            'follow_type': $('#follow_type').val(),
            'follow_status': $('#follow_status').val(),
            'follow_person_name': $('#follow_person_name').val(),
            'person_name': $('#person_name').val(),
            'person_name1': $('#person_name1').val(),
            'relationship': $('#fam_relationship').val(),
            'commitment_date': $('#commitment_date').val(),
            'remark': $('#remark').val(),
            'user_type': $('#user_type').val(),
            'user_name': $('#user_name').val(),
            'comm_err': $('#comm_err').val(),
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

    ///////////////////////////////////Commitement End/////////////////////
    ///////////////////////////////Document End///////////////////////////////////
});

$(function () {
    getSubStsMapping(); //Call Customer status dropdown.
    getBranchDropdown();
    getLineDropdown()
    getLoanCatName();
});

function getSubStsMapping() {
    let subStatus = ['Legal', 'Error', 'OD', 'Pending', 'Current'];
    let editSubStatus = $('#customer_status').val() || '';
    subStatusMultiselect.clearChoices();
    $.each(subStatus, function (index, val) {
        let selected = '';
        if (editSubStatus.includes(val)) {
            selected = 'selected';
        }
        let items = [
            { value: val, label: val, selected: selected },
        ]
        subStatusMultiselect.setChoices(items);
    });

}


function OnLoadFunctions (cusSts, comm_date,branch,line,loan_cat) {
    if (!cusSts || cusSts.length === 0) {
        swalError('Warning!', 'Select Customer Status.');
        return;
    }
    let params = {
        cusSts: cusSts,
        comm_date: comm_date,
        branch: branch,
        line:line,
        loan_cat:loan_cat
    };

    serverSideTable('#due_followup_table', params, 'api/due_followup/due_followup_data.php');
    // Run after every draw (first load, pagination, search, sort)
    $('#due_followup_table').on('draw.dt', function () {
         promotionChartColor('due_followup_table', 14);
    });
  
}
//Loan List
function getLoanListTable(cus_id) {
    $.post('api/due_followup/customer_loan_list.php', { cus_id }, function (response) {
        var columnMapping = [
            'sno',
            'loan_id',
            'loan_category',
            'loan_date',
            'due_day_display',
            'loan_amount',
            'collection_method',
            'c_sts',
            'sub_status',
            'charts',
            'info',
            'action'
        ];
        appendDataToTable('#loan_list_table', response, columnMapping);
        setdtable('#loan_list_table');
        //Dropdown in List Screen
        setDropdownScripts();
    }, 'json');
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

function closeChartsModal() {
    $('#due_chart_model').modal('hide');
    $('#penalty_model').modal('hide');
    $('#fine_model').modal('hide');
    $('#commitment_model').modal('hide');
}
//////////////////////////////////////// Customer Profile//////////////////////////////////////
function getFamilyInfoTable() {
    let cus_id = $('#cus_id').val();
    $.post('api/loan_entry/family_creation_list.php', { cus_id }, function (response) {
        var columnMapping = [
            'sno',
            'fam_name',
            'fam_relationship',
            'remarks',
            'fam_age',
            'fam_live',
            'fam_occupation',
            'fam_aadhar',
            'fam_mobile',
        ];
        appendDataToTable('#fam_info_table', response, columnMapping);
        setdtable('#fam_info_table');
    }, 'json')
}
function getPropertyInfoTable() {
    let cus_id = $('#cus_id').val();
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_entry/property_creation_list.php', { cus_id, cus_profile_id }, function (response) {
        var columnMapping = [
            'sno',
            'property',
            'property_detail',
            'property_holder',
            'fam_relationship',
        ];
        appendDataToTable('#prop_info', response, columnMapping);
        setdtable('#prop_info');
    }, 'json')
}
function getBankInfoTable() {
    let cus_id = $('#cus_id').val();
    let cus_profile_id = $('#customer_profile_id').val()
    $.post('api/loan_entry/bank_creation_list.php', { cus_id, cus_profile_id }, function (response) {
        var columnMapping = [
            'sno',
            'bank_name',
            'branch_name',
            'acc_holder_name',
            'acc_number',
            'ifsc_code',
        ];
        appendDataToTable('#bank_info', response, columnMapping);
        setdtable('#bank_info');
    }, 'json')
}
function getKycInfoTable() {
    let cus_id = $('#cus_id').val();
    let cus_profile_id = $('#customer_profile_id').val()
    $.post('api/loan_entry/kyc_creation_list.php', { cus_id, cus_profile_id }, function (response) {
        var columnMapping = [
            'sno',
            'proof_of',
            'fam_relationship',
            'proof',
            'proof_detail',
            'upload',
        ];
        appendDataToTable('#kyc_info', response, columnMapping);
        setdtable('#kyc_info');
    }, 'json')
}
function getFeedBackInfoTable() {
    let cus_id = $('#cus_id').val();
    let cus_profile_id = $('#customer_profile_id').val()
    $.post('api/loan_entry/feedback_list.php', { cus_id, cus_profile_id }, function (response) {
        var columnMapping = [
            'sno',
            'feedback_label',
            'feedback_text',
            'cus_remark'
        ];
        appendDataToTable('#feedbackListTable', response, columnMapping);
        setdtable('#feedbackListTable');
    }, 'json')
}
function getAreaName() {
    return new Promise((resolve, reject) => {
        $.post('api/loan_entry/get_area.php', function (response) {
            let appendAreaOption = "<option value=''>Select Area Name</option>";
            let editArea = $('#area_edit').val();

            $.each(response, function (index, val) {
                let selected = (val.id == editArea) ? 'selected' : '';
                appendAreaOption += `<option value="${val.id}" ${selected}>${val.areaname}</option>`;
            });

            $('#area').empty().append(appendAreaOption);
            resolve(); // resolve the promise after appending
        }, 'json').fail(function (xhr, status, error) {
            console.error("Error fetching area list:", error);
            reject(error); // reject the promise on error
        });
    });
}

function getAlineName(areaId) {
    $.ajax({
        url: 'api/loan_entry/getAlineName.php',
        type: 'POST',
        data: { aline_id: areaId },
        dataType: 'json',
        cache: false,
        success: function (response) {
            if (response != '') {
                $('#line').val(response[0].linename);
                $('#line').attr('data-id', response[0].line_id);
            } else {
                $('#line').val('');
                $('#line').attr('data-id', '');
            }
        },
    });
}

function dataCheckList(aadhar_num, cus_name, cus_mble_no) {
    $.post('api/loan_entry/datacheck_name.php', { aadhar_num }, function (response) {
        //Name
        $('#name_check').empty();
        $('#name_check').append("<option value=''>Select Name</option>");
        $('#name_check').append('<option value="' + cus_name + '">' + cus_name + '</option>');
        $.each(response, function (index, val) {
            $('#name_check').append("<option value='" + val.fam_name + "'>" + val.fam_name + "</option>");
        });

        //Adhar no
        $('#aadhar_check').empty();
        $('#aadhar_check').append("<option value=''>Select Aadhar Number</option>");
        $('#aadhar_check').append('<option value="' + aadhar_num + '">' + aadhar_num + '</option>');
        $.each(response, function (index, val) {
            $('#aadhar_check').append("<option value='" + val.fam_aadhar + "'>" + val.fam_aadhar + "</option>");
        });

        //Mobile no 
        $('#mobile_check').empty();
        $('#mobile_check').append("<option value=''>Select Mobile Number</option>");
        $('#mobile_check').append('<option value="' + cus_mble_no + '">' + cus_mble_no + '</option>');
        $.each(response, function (index, val) {
            $('#mobile_check').append("<option value='" + val.fam_mobile + "'>" + val.fam_mobile + "</option>");
        });

    }, 'json');
}
function getGuarantorName() {
    let cus_id = $('#cus_id').val();

    return new Promise((resolve, reject) => {
        $.post('api/loan_entry/get_guarantor_name.php', { cus_id }, function (response) {
            let appendGuarantorOption = "<option value=''>Select Guarantor Name</option>";
            let editGId = $('#guarantor_name_edit').val();

            $.each(response, function (index, val) {
                let selected = (val.id == editGId) ? 'selected' : '';
                appendGuarantorOption += `<option value="${val.id}" ${selected}>${val.fam_name}</option>`;
            });

            $('#guarantor_name').empty().append(appendGuarantorOption);
            resolve(); // Fulfill the promise once data is populated
        }, 'json').fail(function (xhr, status, error) {
            console.error("Error fetching guarantor name:", error);
            reject(error); // Reject on error
        });
    });
}
function getGrelationshipName(guarantorId) {
    $.ajax({
        url: 'api/loan_entry/getGrelationship.php',
        type: 'POST',
        data: { guarantor_id: guarantorId },
        dataType: 'json',
        cache: false,
        success: function (response) {
            $('#relationship').val(response.relationship);
        },
        error: function (xhr, status, error) {
            console.error('AJAX error: ' + status, error);
            // Optionally handle errors here, such as displaying an error message to the user
        }
    });
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
            let formattedDate = response.first_loan_date;
            $('#first_loan_date').val(formattedDate);
            $('#travel_with_company').val(response.travel);
        },
    });
}
async function editCustmerProfile(id) {
    try {
        const response = await $.post('api/loan_entry/customer_profile_data.php', { id: id }, null, 'json');

        if (!response || response.length === 0) {
            console.error("No customer data returned.");
            return;
        }

        const data = response[0];

        $('#customer_profile_id').val(id);
        $('#area_edit').val(data.area);
        $('#cus_id').val(data.cus_id);
        $('#aadhar_nums, #adhar_num').val(data.aadhar_num);
        $('#cus_name').val(data.cus_name);
        $('#gender').val(data.gender);
        $('#dob').val(data.dob);
        $('#age').val(data.age);
        $('#mobile1').val(data.mobile1);
        $('#mobile2').val(data.mobile2);
        $('#whatsapp_no').val(data.whatsapp_no);
        $('#guarantor_name_edit').val(data.guarantor_name);
        $('#cus_data').val(data.cus_data);
        $('#cus_status').val(data.cus_status);
        $('#res_type').val(data.res_type);
        $('#res_detail').val(data.res_detail);
        $('#res_address').val(data.res_address);
        $('#native_address').val(data.native_address);
        $('#occupation').val(data.occupation);
        $('#occ_address').val(data.occ_address);
        $('#occ_detail').val(data.occ_detail);
        $('#occ_income').val(moneyFormatIndia(data.occ_income));
        $('#area_confirm').val(data.area_confirm);
        $('#line').val(data.line);
        $('#cus_limit').val(moneyFormatIndia(data.cus_limit));
        $('#about_cus').val(data.about_cus);
        $('#how_to_know').val(data.how_to_know);
        $('#monthly_income').val(moneyFormatIndia(data.monthly_income));
        $('#other_income').val(moneyFormatIndia(data.other_income));
        $('#support_income').val(moneyFormatIndia(data.support_income));
        $('#commitment').val(moneyFormatIndia(data.commitment));
        $('#monthly_due_capacity').val(moneyFormatIndia(data.monthly_due_capacity));

        // Handle WhatsApp number radio selection
        if (data.whatsapp_no === data.mobile1) {
            $('#mobile1_radio').prop('checked', true);
            $('#selected_mobile_radio').val('mobile1');
        } else if (data.whatsapp_no === data.mobile2) {
            $('#mobile2_radio').prop('checked', true);
            $('#selected_mobile_radio').val('mobile2');
        }

        // Load checklist and dropdowns
        dataCheckList(data.cus_id, data.cus_name, data.mobile1, data.aadhar_num);
        await getGuarantorName();
        await getAreaName();

        getFamilyInfoTable();
        getPropertyInfoTable();
        getBankInfoTable();
        getKycInfoTable();
        getFeedBackInfoTable();

        $('#area').trigger('change');
        $('#guarantor_name').trigger('change');

        // Show/hide based on customer data
        if (data.cus_data === 'Existing') {
            $('.cus_status_div').show();
            $('.loan_count_div').show();
            let cus_id = $('#cus_id').val();
            getLoanCount(cus_id);
        } else {
            $('.cus_status_div').hide();
            $('#data_checking_table_div').hide();
            $('.loan_count_div').hide();
        }


        // Set customer picture
        let path = "uploads/loan_entry/cus_pic/";
        $('#per_pic').val(data.pic);
        $('#imgshow').attr('src', path + data.pic);

        // Set guarantor picture or fallback
        let guPath = "uploads/loan_entry/gu_pic/";
        if (data.gu_pic) {
            $('#gur_pic').val(data.gu_pic);
            $('#gur_imgshow').attr('src', guPath + data.gu_pic);
        } else {
            $('#gur_imgshow').attr('src', 'img/avatar.png');
        }

        // Disable editing
        $('.personal_info_disble').attr("disabled", true);
        $('#submit_personal_info').attr('disabled', true);

    } catch (error) {
        console.error('Error in editCustmerProfile:', error);
    }
}
/////////////////////////////////////////////Customer Profile End/////////////////////////////////////////
/////////////////////////////////////Documentation Start ///////////////////////////////////////////

function getChequeInfoTable() {
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_issue_files/cheque_info_list.php', { cus_profile_id }, function (response) {
        if (response && response.length > 0) {
            // Show the cheque div and populate the table if the condition is met
            $('.cheque-div').show();
        }
        let chequeColumn = [
            "sno",
            "holder_type",
            "holder_name",
            "relationship",
            "bank_name",
            "cheque_cnt",
            "upload"
        ]
        appendDataToTable('#cheque_info_table', response, chequeColumn);
        setdtable('#cheque_info_table');
    }, 'json');
}
function getSignedDocInfoTable() {
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_entry/get_signeddoc_info_list.php', { cus_profile_id }, function (response) {
        if (response && response.length > 0) {
            // Show the cheque div and populate the table if the condition is met
            $('.signed-div').show();
        }
        let signColumn = [
            "sno",
            "doc_name",
            "sign_type",
            "signed_name",
            "doc_Count",
            "upload"
        ]
        appendDataToTable('#signDocResetTable', response, signColumn);
        setdtable('#signDocResetTable');
    }, 'json');
}

function getDocInfoTable() {
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_issue_files/doc_info_list.php', { cus_profile_id }, function (response) {
        if (response && response.length > 0) {
            $('.doc_div').show();
        }
        let docColumn = [
            "sno",
            "doc_name",
            "doc_type",
            "holder_name",
            "relationship",
            "upload"
        ]
        appendDataToTable('#document_info', response, docColumn);
        setdtable('#document_info')
    }, 'json');
}
function getMortInfoTable() {
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_issue_files/mortgage_info_list.php', { cus_profile_id }, function (response) {
        if (response && response.length > 0) {
            $('.mortgage-div').show();
        }
        let mortgageColumn = [
            "sno",
            "holder_name",
            "relationship",
            "property_details",
            "mortgage_name",
            "designation",
            "mortgage_number",
            "reg_office",
            "mortgage_value",
            "upload"
        ]
        appendDataToTable('#mortgage_info', response, mortgageColumn);
        setdtable('#mortgage_info')
    }, 'json');
}
function getEndorsementInfoTable() {
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_issue_files/endorsement_info_list.php', { cus_profile_id }, function (response) {
        if (response && response.length > 0) {
            $('.endorsement-div').show();
        }
        let endorsementColumn = [
            "sno",
            "holder_name",
            "relationship",
            "vehicle_details",
            "endorsement_name",
            "key_original",
            "rc_original",
            "upload"
        ]
        appendDataToTable('#endorsement_info', response, endorsementColumn);
        setdtable('#endorsement_info')
    }, 'json');
}
function getGoldInfoTable() {
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_issue_files/gold_info_list.php', { cus_profile_id }, function (response) {
        if (response && response.length > 0) {
            $('.gold-div').show();
        }
        let goldColumn = [
            "sno",
            "gold_type",
            "purity",
            "weight",
            "value"
        ]
        appendDataToTable('#gold_info', response, goldColumn);
        setdtable('#gold_info')
    }, 'json');
}
/////////////////////////////////////Documentation End ///////////////////////////////////////////
/////////////////////////////////////////////////////////////Loan CalCulation ///////////////////////////////////////////////////////////////////

function callLoanCaculationFunctions() {
    getLoanCategoryName();
}

function getLoanCategoryName() {
    $.post('api/common_files/get_loan_category_creation.php', function (response) {
        let appendLoanCatOption = '';
        appendLoanCatOption += '<option value="">Select Loan Category</option>';
        $.each(response, function (index, val) {
            let selected = '';
            let loan_category_calc2 = $('#loan_category_calc2').val();
            if (val.id == loan_category_calc2) {
                selected = 'selected';
            }
            appendLoanCatOption += '<option value="' + val.id + '" ' + selected + '>' + val.loan_category + '</option>';
        });
        $('#loan_category_calc').empty().append(appendLoanCatOption);
    }, 'json');
}

function getAgentID() {
    $.post('api/agent_creation/agent_creation_list.php', function (response) {
        let appendAgentIdOption = '';
        appendAgentIdOption += '<option value="">Select Agent ID</option>';
        $.each(response, function (index, val) {
            let selected = '';
            let agent_id_edit_it = '';
            if (val.id == agent_id_edit_it) {
                selected = 'selected';
            }
            appendAgentIdOption += '<option value="' + val.id + '" ' + selected + '>' + val.agent_name + '</option>';
        });
        $('#agent_id_calc').empty().append(appendAgentIdOption);
    }, 'json');
}

function getLoanCatDetails(id) {
    $.post('api/loan_entry/loan_calculation/getLoanCatDetails.php', { id }, function (response) {
        $('#due_method_calc').val(response[0].due_method);

        if (response[0].due_type == 'EMI') {
            $('#due_type_calc').val('EMI');
        } else if (response[0].due_type == 'interest') {
            $('#due_type_calc').val('Interest');
        }
        let cus_limit = parseInt($('#cus_limit').val());
        let loan_limit = parseInt(response[0].loan_limit);
        let min_loan_limit;

        if (isNaN(cus_limit) || isNaN(loan_limit)) {
            min_loan_limit = 0; // Both values are NaN
        } else {
            min_loan_limit = (cus_limit < loan_limit) ? cus_limit : loan_limit; // Both values are valid numbers
        }
        $('#loan_amount_calc').attr('onChange', `if( parseFloat($(this).val()) > '` + min_loan_limit + `' ){ alert("Enter Lesser than '${min_loan_limit}'"); $(this).val(""); }`); //To check value between range

        var int_rate_upd = ($('#int_rate_upd').val()) ? $('#int_rate_upd').val() : '';
        var due_period_upd = ($('#due_period_upd').val()) ? $('#due_period_upd').val() : '';
        var doc_charge_upd = ($('#doc_charge_upd').val()) ? $('#doc_charge_upd').val() : '';
        var proc_fee_upd = ($('#proc_fees_upd').val()) ? $('#proc_fees_upd').val() : '';
        //To set min and maximum 
        $('.min-max-int').text('* (' + response[0].interest_rate_min + '% - ' + response[0].interest_rate_max + '%) ');
        $('#interest_rate_calc').attr('onChange', `if( parseFloat($(this).val()) > '` + response[0].interest_rate_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else
                            if( parseFloat($(this).val()) < '`+ response[0].interest_rate_min + `' && parseFloat($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `); //To check value between range
        $('#interest_rate_calc').val(int_rate_upd);
        $('.min-max-due').text('* (' + response[0].due_period_min + ' - ' + response[0].due_period_max + ') ');
        $('#due_period_calc').attr('onChange', `if( parseInt($(this).val()) > '` + response[0].due_period_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else
                            if( parseInt($(this).val()) < '`+ response[0].due_period_min + `' && parseInt($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `); //To check value between range
        $('#due_period_calc').val(due_period_upd);

        $('.min-max-doc').text('* (' + response[0].doc_charge_min + '% - ' + response[0].doc_charge_max + '%) ');
        $('#doc_charge_calc').attr('onChange', `if( parseFloat($(this).val()) > '` + response[0].doc_charge_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else
                            if( parseFloat($(this).val()) < '`+ response[0].doc_charge_min + `' && parseFloat($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `); //To check value between range
        $('#doc_charge_calc').val(doc_charge_upd);

        $('.min-max-proc').text('* (' + response[0].processing_fee_min + '% - ' + response[0].processing_fee_max + '%) ');
        $('#processing_fees_calc').attr('onChange', `if( parseFloat($(this).val()) > '` + response[0].processing_fee_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else
                            if( parseFloat($(this).val()) < '`+ response[0].processing_fee_min + `' && parseInt($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `); //To check value between range
        $('#processing_fees_calc').val(proc_fee_upd);

    }, 'json');
}

function dueMethodScheme(schemeDueMethod, loanCatId) {
    $.post('api/common_files/get_due_method_scheme.php', { schemeDueMethod, loanCatId }, function (response) {

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

            (response[0].doc_charge_type == 'percent') ? type = '%' : type = '₹';//Setting symbols
            $('.min-max-doc').text('* (' + response[0].doc_charge_min + ' ' + type + ' - ' + response[0].doc_charge_max + ' ' + type + ') '); //setting min max values in span
            $('#doc_charge_calc').attr('onChange', `if( parseInt($(this).val()) > '` + response[0].doc_charge_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else
                                    if( parseInt($(this).val()) < '`+ response[0].doc_charge_min + `' && parseInt($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `); //To check value between range
            $('#doc_charge_calc').val(doc_charge_upd);

            (response[0].processing_fee_type == 'percent') ? type = '%' : type = '₹';//Setting symbols
            $('.min-max-proc').text('* (' + response[0].processing_fee_min + ' ' + type + ' - ' + response[0].processing_fee_max + ' ' + type + ') ');//setting min max values in span
            $('#processing_fees_calc').attr('onChange', `if( parseInt($(this).val()) > '` + response[0].processing_fee_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else
                                if( parseInt($(this).val()) < '`+ response[0].processing_fee_min + `' && parseInt($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `); //To check value between range
            $('#processing_fees_calc').val(proc_fee_upd);

        }, 'json');

    }
}


function loanCalculationEdit(id) {
    $.post('api/loan_entry/loan_calculation/loan_calculation_data.php', { id }, function (response) {
        $('#loan_id_calc').val(response[0].loan_id);
        $('#loan_category_calc').val(response[0].loan_category);
        $('#loan_category_calc2').val(response[0].loan_category);
        $('#category_info_calc').val(response[0].category_info);
        $('#loan_amount_calc').val(moneyFormatIndia(response[0].loan_amount));
        $('#profit_type_calc').val(response[0].profit_type);
        $('#due_method_calc').val(response[0].due_method);
        $('#due_type_calc').val(response[0].due_type);
        $('#profit_method_calc').val(response[0].profit_method);
        $('#scheme_due_method_calc').val(response[0].scheme_due_method);
        $('#scheme_day_calc').val(response[0].scheme_day);
        $('#scheme_name_edit').val(response[0].scheme_name);
        $('#int_rate_upd').val(response[0].interest_rate);
        $('#due_period_upd').val(response[0].due_period);
        $('#doc_charge_upd').val(response[0].doc_charge);
        $('#proc_fees_upd').val(response[0].processing_fees);
        $('#loan_amnt_calc').val(moneyFormatIndia(response[0].loan_amnt));
        $('#principal_amnt_calc').val(moneyFormatIndia(response[0].principal_amnt));
        $('#interest_amnt_calc').val(moneyFormatIndia(response[0].interest_amnt));
        $('#total_amnt_calc').val(moneyFormatIndia(response[0].total_amnt));
        $('#due_amnt_calc').val(moneyFormatIndia(response[0].due_amnt));
        $('#doc_charge_calculate').val(moneyFormatIndia(response[0].doc_charge_calculate));
        $('#processing_fees_calculate').val(moneyFormatIndia(response[0].processing_fees_calculate));
        $('#net_cash_calc').val(moneyFormatIndia(response[0].net_cash));
        $('#loan_date_calc').val(response[0].loan_date);
        $('#due_startdate_calc').val(response[0].due_startdate);
        $('#collection_method').val(response[0].collection_method);
        $('#maturity_date_calc').val(response[0].maturity_date);
        $('#referred_calc').val(response[0].referred);
        $('#referred_calc').trigger('change');

        $('#profit_type_calc_scheme').show();
        if (response[0].profit_type == '0') {//Loan Calculation
            $('.calc').show();
            $('.scheme').hide();
            $('.scheme_day').hide();
            getLoanCatDetails(response[0].loan_category);
        } else if (response[0].profit_type == '1') { //Scheme
            dueMethodScheme(response[0].scheme_due_method, response[0].loan_category)
            $('.calc').hide();
            $('.scheme').show();
            schemeCalAjax(response[0].scheme_name)
        }

        setTimeout(() => {

            $('#agent_id_calc').val(response[0].agent_id);
            $('#agent_name_calc').val(response[0].agent_name);
            $('#refresh_cal').trigger('click');
        }, 1000);
    }, 'json');
}
//////////////////////////////////////////////////////////////// Loan Calculation END //////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// Loan History start //////////////////////////////////////////////////////////////////////
function getLoanHistoryTable(cus_id) {
    $.post('api/due_followup/loan_history_list.php', { cus_id }, function (response) {
        var columnMapping = [
            'sno',
            'loan_id',
            'loan_category',
            'agent_name',
            'loan_date',
            'loan_amount',
            'closed_date',
            'c_sts',
            'customer_sub_status',

        ];
        appendDataToTable('#loan_history_table', response, columnMapping);
        setdtable('#loan_history_table');
        //Dropdown in List Screen
        setDropdownScripts();
    }, 'json');
}
//////////////////////////////////////////////////////////////// Loan History END //////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// Document History start //////////////////////////////////////////////////////////////////////
function getDocumentHistoryTable(cus_id) {
    $.post('api/due_followup/document_history_list.php', { cus_id }, function (response) {
        var columnMapping = [
            'sno',
            'loan_id',
            'loan_category',
            'agent_name',
            'loan_date',
            'loan_amount',
            'closed_date',
            'c_sts',
            'customer_sub_status',
            'document_status'

        ];
        appendDataToTable('#doc_history_table', response, columnMapping);
        setdtable('#doc_history_table');
        //Dropdown in List Screen
        setDropdownScripts();
    }, 'json');
}
//////////////////////////////////////////////////////////////// Document History END //////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// Commitement Start  //////////////////////////////////////////////////////////////////////
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
function getNameRelationship(id, type) {
    $.post('api/loan_issue_files/get_cus_fam_members.php', { id, type }, function (response) {
        if (type == '1') {
            $('#person_name').val(response[0].cus_name);
            $('#fam_relationship').val('Customer');
        } else {
            $('#person_name').val(response[0].fam_name);
            $('#person_name').attr('data-id', response[0].id);
            $('#fam_relationship').val(response[0].fam_relationship);
        }
    }, 'json');
}

function getFamilyMember(optn, selector) {
    let cus_id = $('#comm_cus_id').val();
    return new Promise((resolve, reject) => {
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
//////////////////////////////////////////////////////////////// Commitement END //////////////////////////////////////////////////////////////////////
function getBranchDropdown() {
    let branch_id = $('#branch_name').val();
    let branch_name2 = $('#branch_name2').val();
    $.post('api/common_files/user_mapped_branches.php', { branch_id }, function (response) {
        branchChoices.clearStore();
        $.each(response, function (index, val) {
            let selected = '';
            if (branch_name2.includes(val.id)) {
                selected = 'selected';
            }
            let items = [
                {
                    value: val.id,
                    label: val.branch_name,
                    selected: selected,
                }
            ];
            branchChoices.setChoices(items); // Add choices

        });
    }, 'json');
}

function getLineDropdown() {
    lineChoices.clearStore();
    $.ajax({
        url: 'api/due_followup/get_line_dropdown.php',
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            let items = [];
            $.each(response, function (index, val) {
                items.push({
                    value: val.id,
                    label: val.linename
                });
            });
            lineChoices.setChoices(items, 'value', 'label', true);
        }
    });
}

function getLoanCatName() {
    let loan_cat_edit_it = $('#loan_cat_edit_it').val()
    $.post('api/common_files/get_loan_category_creation.php', function (response) {
        loan_category.clearStore();
        $.each(response, function (index, val) {
            let selected = '';
            if (loan_cat_edit_it.includes(val.id)) {
                selected = 'selected';
            }
            let items = [
                {
                    value: val.id,
                    label: val.loan_category,
                    selected: selected
                }
            ];
            loan_category.setChoices(items);
            loan_category.init();
        });
    }, 'json');
}

function promotionChartColor(tableid, colNo) {

    $(`#${tableid} tbody tr`).not('th').each(function () {
        var element = $(this).find(`td:eq(${colNo})`); // Get the text content of the 15th td element (Follow date)
        let tddate = element.text();
        let datecorrection = tddate.split("-").reverse().join("-").replaceAll(/\s/g, ''); // Correct the date format
        let values = new Date(datecorrection); // Create a Date object from the corrected date
        values.setHours(0, 0, 0, 0); // Set the time to midnight for accurate date comparison

        let curDate = new Date(); // Get the current date
        curDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate date comparison

        let colors = {
            'past': 'FireBrick',
            'current': 'DarkGreen',
            'future': 'CornflowerBlue'
        }; // Define colors for different date types

        if (tddate != '' && values != 'Invalid Date') { // Check if the extracted date and the created Date object are valid

            if (values < curDate) { // Compare the extracted date with the current date
                element.css({
                    'background-color': colors.past,
                    'color': 'white'
                }); // Apply styling for past dates
            } else if (values > curDate) {
                element.css({
                    'background-color': colors.future,
                    'color': 'white'
                }); // Apply styling for future dates
            } else {
                element.css({
                    'background-color': colors.current,
                    'color': 'white'
                }); // Apply styling for the current date
            }
        }
    });
}