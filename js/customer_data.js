
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
$(document).ready(function () {
    $('.new_table_content').show();
    $('.existing_table_content').hide();
    // Event handler for radio buttons
    $('input[name=customer_data]').click(function () {
        let customerDataType = $(this).val();
        if (customerDataType == 'new_list') {
            $('.new_table_content').show();
            $('.existing_table_content').hide();
            $('.repromotion_table_content').hide();
            $('.filter_card').hide();
            getNewPromotionTable();

        } else if (customerDataType == 'existing_list') {
            $('.new_table_content').hide();
            $('.existing_table_content').show();
            $('.filter_card').show();
            $('.repromotion_table_content').hide();
            showPromotionList('api/customer_data_files/get_existing_promotion.php', 'existing_list_table', '14');
            getBranchDropdown()
             getLineDropdown()
        } else if (customerDataType == 'repromotion_list') {
            $('.new_table_content').hide();
            $('.existing_table_content').hide();
            $('.repromotion_table_content').show();
            $('.filter_card').show();
            showPromotionList('api/customer_data_files/get_repromotion_list.php', 'repromotion_list_table', '15');
              getBranchDropdown()
             getLineDropdown()
        }
    });
   
    $('#followup_search').click(function (event) {
        event.preventDefault();

        let dateType = $('#date_type').val();
        if (dateType) {
            let fromDate = $('#follow_up_fromdate').val();
            let toDate = $('#follow_up_todate').val();

            if (!fromDate || !toDate) {
                alert("Please fill the From & To date.");
                return;
            }
        } else {
            $('#follow_up_fromdate').val('');
            $('#follow_up_todate').val('');
        }

        let btnName = $("input[name='customer_data']:checked").val();
        if (btnName == 'existing_list') {
            showPromotionList('api/customer_data_files/get_existing_promotion.php', 'existing_list_table', '14');

        } else if (btnName == 'repromotion_list') {
            showPromotionList('api/customer_data_files/get_repromotion_list.php', 'repromotion_list_table', '15');

        }
    });
    $('#submit_new').click(function (event) {
        event.preventDefault();

        // Collect form data
        let cust_name = $('#cust_name').val();
        let cus_area = $('#cus_area').val();
        let mobile = $('#mobile').val();
        let loan_cat = $('#loan_cat').val();
        let loan_amount = $('#loan_amount').val();
        let new_promotion_id = $('#new_Promotion_id').val();

        // Fields to validate
        var data = ['cust_name', 'cus_area', 'mobile', 'loan_cat', 'loan_amount'];

        // Validate fields
        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        // Check if mobile number is empty
        if (mobile.trim() === '') {
            // If mobile number is empty, return without executing AJAX
            return;
        }
        $.post('api/customer_data_files/get_existing_mobiles.php', { mobile: mobile }, function (response) {
            if (response.exists) {
                // Show an alert with the customer status if the mobile number already exists
                let statusMsg = "";

                switch (parseInt(response.status)) {
                    case 1: statusMsg = "Customer Profile Insert"; break;
                    case 2: statusMsg = "Loan Calculation Insert"; break;
                    case 3: statusMsg = "Moved To Approval"; break;
                    case 4: statusMsg = "Approved"; break;
                    case 5: statusMsg = "Cancel in Approval"; break;
                    case 6: statusMsg = "Revoke in Approval"; break;
                    case 7: statusMsg = "Loan Issued"; break;
                    case 8: statusMsg = "In Close"; break;
                    case 9: statusMsg = "Closed"; break;
                    case 10: statusMsg = "In NOC"; break;
                    case 11: statusMsg = "NOC Completed"; break;
                    case 12: statusMsg = "NOC Removed"; break;
                    case 13: statusMsg = "Cancel in Loan Issue"; break;
                    case 14: statusMsg = "Revoke in Loan Issue"; break;
                    case 15: statusMsg = "Collection"; break;
                    case 16: statusMsg = "Collection"; break;
                    default: statusMsg = "Unknown Status"; break;
                }

                swalError('Warning', 'Mobile number already exists. Customer status: ' + statusMsg);
                return;
            }

            // If mobile does not exist and form is valid, proceed with submission
            if (isValid) {
                $.post('api/customer_data_files/submit_new.php', {
                    cust_name, cus_area, mobile, loan_cat, loan_amount, new_promotion_id
                }, function (response) {
                    if (response == '1') {
                        swalSuccess('Success', 'Customer Data Added Successfully!');
                        $('#new_form input').val('').css('border', '1px solid #cecece');
                        $('#new_form select').each(function () {
                            $(this).val($(this).find('option:first').val());

                        });
                    } else {
                        swalError('Error', 'Failed to add customer data.');
                    }
                });
            }
        }, 'json');

    });

    $('#mobile').change(function () {
        checkMobileNo($(this).val(), $(this).attr('id'));
    });

    $(document).on('click', '.newPromoDeleteBtn', function () {
        var id = $(this).attr('value');
        swalConfirm('Delete', 'Do you want to Delete the Customer Details?', getNewPromoDelete, id);
        return;
    });

    // Reset form fields when modal is hidden
    $('#add_new_list_modal').on('hidden.bs.modal', function () {
        $('#new_form').trigger('reset'); // Reset the form with id 'new_form'
        $('#new_form input').css('border', '1px solid #cecece');
    });

    // Reset form fields when modal backdrop is clicked
    $('#add_new_list_modal').on('click', function (e) {
        if ($(e.target).hasClass('modal')) {
            $('#new_form').trigger('reset'); // Reset the form with id 'new_form'
            $('#new_form input').css('border', '1px solid #cecece');
        }
    });
    $('#sumit_add_promo').click(function (e) {
        e.preventDefault();
        if (validatePromoAdd() == true) {
            submitPromotion();
        }
    })
    ////////////////////////////////////Customer Profile start//////////////////////////////
    $(document).on('click', '.customer-profile', function () {
        $('#loan_entry_content').show();
        $('#cus_back_btn').show();
        $('.existing_table_content, .filter_card,.promo-screen').hide();
        let id = $(this).attr('data-cpid');
        $('#cus_profile_id').val(id)
        editCustmerProfile(id)

    });
    $('#cus_back_btn').click(function () {
        $('#cus_back_btn').hide();
        $('#loan_entry_content').hide();
        $('.filter_card, .existing_table_content, .promo-screen').show();

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
    ///////////////////////////////////Loan History Start/////////////////////
    $(document).on('click', '.loan-history', function () {
        $('#loan_history_content').show();
        $('.existing_table_content, .filter_card,.promo-screen').hide();
        let cus_id = $(this).attr('data-cusid');
        getLoanHistoryTable(cus_id)


    });
    $('#loan_his_back_btn').click(function () {
        $('.existing_table_content, .filter_card,.promo-screen').show();
        $('#loan_history_content').hide();
    });

    ///////////////////////////////////Loan History End/////////////////////
    ///////////////////////////////////Document History Start/////////////////////
    $(document).on('click', '.doc-history', function () {
        $('#document_history_content').show();
        $('.existing_table_content, .filter_card,.promo-screen').hide();
        let cus_id = $(this).attr('data-cusid');
        getDocumentHistoryTable(cus_id)

    });
    $('#doc_his_back_btn').click(function () {
        $('.existing_table_content, .filter_card,.promo-screen').show();
        $('#document_history_content').hide();
    });

    ///////////////////////////////////Document History End/////////////////////
    ///////new promotion///
    $(document).off('click', '.new_intrest, .new_not-intrest').on('click', '.new_intrest, .new_not-intrest', function () {
        let value = $(this).find('span').text().trim(); // Get span text
        let new_id = $(this).data('cpid'); // customer id data-
        $('#orgin_table').val('')
        // Set values in modal fields
        $('#promo_status').val(value);
        $('#promo_cusprofile_id').val(new_id);

        // set current date in promo_date
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        let formattedDate = dd + "-" + mm + "-" + yyyy;
        $('#promo_date').val(formattedDate);
        $.post('api/customer_data_files/get_usermapped_area.php', {}, function (response) {
            if (response.length > 0) {
                $('#promo_user_type').val(response[0].role);
                $('#promo_user').val(response[0].username);

            }
        }, 'json');
    });


    $(document).off('click', '.new-promo-chart').on('click', '.new-promo-chart', function () {
        let promo_id = $(this).attr('value');
        $.post('api/customer_data_files/resetPromotionChart.php', { promo_id: promo_id }, function (html) {
            $('#promoChartDiv').empty().html(html);
        });
    });

})


$(function () {
    getNewPromotionTable();
    // getExistingPromotionTable('');


});
function getUsermappedAreaName() {
    $.post('api/customer_data_files/get_usermapped_area.php', function (response) {
        let appendAreaOption = "<option value=''>Select Area Name</option>";
        let editArea = $('#area_edit').val();

        // response[0].areas contains your list
        if (response.length > 0 && response[0].areas) {
            $.each(response[0].areas, function (index, val) {
                let selected = (val.area_id == editArea) ? 'selected' : '';
                appendAreaOption += `<option value="${val.area_id}" ${selected}>${val.areaname}</option>`;
            });
        }

        $('#cus_area').empty().append(appendAreaOption);
    }, 'json').fail(function (xhr, status, error) {
        console.error("Error fetching area list:", error);
    });
}

function getNewPromotionTable() {
    serverSideTable('#new_list_table', '', 'api/customer_data_files/get_new_promotion.php');

    // Run after every draw (first load, pagination, search, sort)
    $('#new_list_table').on('draw.dt', function () {
        promotionChartColor('new_list_table', 8);
    });
}

function getNewPromoDelete(id) {
    $.post('api/customer_data_files/delete_new_promotion.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('Success', 'Customer Data Deleted Successfully!');
            getNewPromotionTable()
        } else {
            swalError('Error', 'Failed to Delete Customer Data: ' + response);
        }
    }, 'json');
}

function showPromotionList(url, tableid, colNo) {
    let followUpSts = $('#follow_up_sts').val();
    let dateType = $('#date_type').val();
    let followUpFromDate = $('#follow_up_fromdate').val();
    let followUpToDate = $('#follow_up_todate').val();
    let branch = $("#branch_name").val();
    let line = $("#line").val();

    let table = $(`#${tableid}`).DataTable();
    table.destroy();

    // assign to variable so we can use it later
    let dataTable = $(`#${tableid}`).DataTable({
        "order": [[0, "desc"]],
        "displayStart": getDisplayStart(tableid),
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url': url,
            'data': function (data) {
                var search = $('#' + tableid + '_search').val();
                data.search = search;
                data.followUpSts = followUpSts;
                data.dateType = dateType;
                data.followUpFromDate = followUpFromDate;
                data.followUpToDate = followUpToDate;
                data.branch = branch;
                data.line = line;
            }
        },
        dom: 'lBfrtip',
        buttons: [
            { extend: 'excel', title: "Promotion List" },
            { extend: 'colvis', collectionLayout: 'fixed four-column' }
        ],
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
        ],
        'drawCallback': function () {
            let searchInput = $('#' + tableid + '_filter input');
            searchInput.attr('id', tableid + '_search').addClass('custo-search');
            searchFunction(tableid);
            // paginationFunction(tableid);
            intNotintOnclick();
            promoChartOnclick();
            promotionListOnclick();
            promotionChartColor(tableid, colNo);
        }
    });
}
function searchFunction(table_name) {

    $(`#search, #${table_name}_search`).attr({
        'title': 'Click Outside to search',
        'autocomplete': 'off'
    })
    // new search on keyup event for search by display content
    $(`#search, #${table_name}_search`).off().on('blur', function (e) {
        // if (e.which == 10 && e.ctrlKey == true) { //control and enter key pressed then key value will be 10
        let table = $(`#${table_name}`).DataTable();
        table.search(this.value).draw();
        // }
    });

    $('.dropdown').click(function (event) {
        let linkcheck = $('.dropdown .dropdown-content a').attr('href');
        if (linkcheck == '#' || linkcheck == undefined) {
            event.preventDefault();
        }
        $('.dropdown').not(this).removeClass('active');
        $(this).toggleClass('active');
    });

    $(document).click(function (event) {
        var target = $(event.target);

        // Close dropdown if clicking outside, but allow logout link to work
        if (!target.closest('.dropdown').length) {
            $('.dropdown').removeClass('active');
        }
    });

    $(document).on('click', '.logout-link', function (event) {
        event.preventDefault();
        event.stopPropagation();

        $('.dropdown').removeClass('active');
        window.location.href = 'logout.php'; // Redirect to logout script
    });

}
function promotionListOnclick() {
    $('.personal-info').off('click').click(function () {
        let cus_id = $(this).data('cusid');
        getPersonalInfo(cus_id);
    })
}
function getPersonalInfo(cus_id) {
    $.post('api/customer_data_files/getPersonalInfo.php', { cus_id }, function (html) {
        $('#personalInfoDiv').empty().html(html);
    })
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


function promoChartOnclick() { // function of on click event for promo chart
    $(document).off('click', '.promo-chart').on('click', '.promo-chart', function () {
        let cus_id = $(this).data('id');
        $.post('api/customer_data_files/resetPromotionChart.php', { cus_id: cus_id }, function (html) {
            $('#promoChartDiv').empty().html(html);
        });
    });
}

function intNotintOnclick() {
    // click for add promotion modal
    $(document).off('click', '.intrest, .not-intrest').on('click', '.intrest, .not-intrest', function () {
        let value = $(this).find('span').text().trim(); // Get span text
        let cus_id = $(this).data('id'); // customer id
        let cp_id = $(this).data('cpid'); // customer id 

        // Set values in modal fields
        $('#promo_status').val(value);
        $('#promo_cus_id').val(cus_id);
        $('#promo_cusprofile_id').val(cp_id);

        // set current date in promo_date
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        let formattedDate = dd + "-" + mm + "-" + yyyy;

        $('#promo_date').val(formattedDate);
        $.post('api/customer_data_files/get_usermapped_area.php', {}, function (response) {
            if (response.length > 0) {
                $('#promo_user_type').val(response[0].role);
                $('#promo_user').val(response[0].username);

            }
        }, 'json');


        // get table id for reset when modal close
        let orgin_table = $(this).closest('table').data('id');

        $('#orgin_table').val(orgin_table);
    });

    // modal close button click
    $(document).off('click', '.closeModal').on('click', '.closeModal', function () {
        let orgin_table = $('#orgin_table').val();
        console.log(orgin_table)
        if (orgin_table === 'existing') {
            $("input[name='customer_data'][value='existing_list']").prop('checked', true).trigger('click');
        } else if (orgin_table === 'repromotion') {
            $("input[name='customer_data'][value='repromotion_list']").prop('checked', true).trigger('click');
        } else {
            $("input[name='customer_data'][value='new_list']").prop('checked', true).trigger('click');
            $('#orgin_table').val('')
        }
    });
}


function getDisplayStart(tableId, pageLength = 10) {
    if (typeof isPageReloaded !== "undefined" && isPageReloaded) {
        $.removeCookie(`${tableId}_currentPage`); // or localStorage clear
        localStorage.removeItem(`${tableId}_currentPage`);
        return 0;
    }

    let savedPage = localStorage.getItem(`${tableId}_currentPage`);
    return savedPage ? parseInt(savedPage, 10) * pageLength : 0;
}


function validatePromoAdd() {
    let response = true;
    let status = $('#promo_status').val(); let label = $('#promo_label').val(); let remark = $('#promo_remark').val();
    let follow_date = $('#promo_fdate').val();

    validateField(status, '#promo_statusCheck');
    validateField(label, '#promo_labelCheck');
    validateField(remark, '#promo_remarkCheck');
    validateField(follow_date, '#promo_fdateCheck');

    function validateField(value, fieldId) {
        if (value === '') {
            response = false;
            event.preventDefault();
            $(fieldId).show();
        } else {
            $(fieldId).hide();
        }

    }

    return response;
}


function submitPromotion() {
    let cus_id = $('#promo_cus_id').val();
    let cus_profile_id = $('#promo_cusprofile_id').val();
    let orgin_table = $('#orgin_table').val();
    let status = $('#promo_status').val(); let label = $('#promo_label').val(); let remark = $('#promo_remark').val(); let follow_date = $('#promo_fdate').val();
    let args = { 'cus_id': cus_id, 'cus_profile_id': cus_profile_id, 'status': status, 'label': label, 'remark': remark, 'follow_date': follow_date, 'orgin_table': orgin_table };

    $.post('api/customer_data_files/get_existing_data.php', args, function (response) {
        if (response == '1') {
            swalSuccess('Success', 'Customer Data Added Successfully!');
            $('#closeAddPromotionModal').trigger('click')
            $('#addPromotion').find('.modal-body input').not('[readonly]').not('#orgin_table').val('');;
        } else {
            swalError('Error', 'Failed to add customer data.');
        }
    })
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

