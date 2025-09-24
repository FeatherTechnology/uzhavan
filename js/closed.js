$(document).ready(function () {

    $(document).on('click', '.closed-details', function (event) {
        event.preventDefault();
        $('#closed_list').hide();
        $('#closed_main_container,.back_to_closed_list').show();
        let cus_id = $(this).attr('value');
        $.post('api/common_files/personal_info.php', { cus_id }, function (response) {
            if (response.length > 0) {
                $('#aadhar_num').val(response[0].aadhar_num);
                $('#cus_id').val(response[0].cus_id);
                $('#cus_name').val(response[0].cus_name);
                $('#area').val(response[0].area);
                $('#branch_name').val(response[0].branch_name);
                $('#line').val(response[0].linename);
                $('#mobile1').val(response[0].mobile1);
                let path = "uploads/loan_entry/cus_pic/";
                if (response[0].pic) {
                    $('#per_pic').val(response[0].pic);
                    var img = $('#imgshow');
                    img.attr('src', path + response[0].pic);
                }
                else {
                    $('#imgshow').attr('src', 'img/avatar.png');
                }
            }
        }, 'json');

        getClosedLoanList(cus_id);
        getLoanCount(cus_id)
        getCustomerSummary(cus_id);
        getFeedBackInfoTable(cus_id)

    })

    $('#sub_status').change(function () {
        var sts = $(this).val();

        if (sts == '1') {
            $('#considerlevel').show();
        } else {
            $('#considerlevel').hide();
        }
    })

    // $(document).on('click', '.closed-move', function () {
    //     let cus_id = $(this).attr('value');
    //     let cus_sts = 10;
    //     moveToNext(cus_id, cus_sts);
    // });
    $(document).on('click', '.loan-summary', function () {
        let id = $(this).attr('value');
        $('#cus_profile_id').val(id)
        $('.addloansummary').modal('show');
        getLoanSummaryTable()
    });

    $('#back_to_closed_list').click(function (event) {
        event.preventDefault();
        $('#closed_main_container,.back_to_closed_list').hide();
        $('#closed_list').show();
        getClosedListTable();
    })
    $('#closed_remark_model').on('hidden.bs.modal', function () {
        $('#closed_remark_form')[0].reset();
    });

    $('#submit_closed_remark').click(function (event) {
        event.preventDefault();
        if (validate()) {
            let cus_profile_id = $('#cus_profile_id').val();
            let sub_status = $('#sub_status').val();
            let closed_Sts_consider = $('#closed_Sts_consider').val();
            let remark = $('#remark').val();
            $.post('api/closed_files/closed_submit.php', { sub_status, closed_Sts_consider, remark, cus_profile_id }, function (response) {
                if (response == '1') {
                    swalSuccessOk('Success', 'Closed Info Updated Successfully!');
                    $('#closed_remark_form input').val('');
                    $('#closed_remark_form select').val('');
                    $('#closed_remark_form textarea').val('');
                    $('#closed_remark_form input').css('border', '1px solid #cecece');
                    $('#closed_remark_form select').css('border', '1px solid #cecece');
                    $('#considerlevel').hide();
                    $('#closed_remark_model').modal('hide');

                    let cus_id = $('#cus_id').val();
                    getClosedLoanList(cus_id);
                } else {
                    swalError('Error', 'Failed to Closed');
                }
            }, 'json');
        }
    });
    $(document).on("click", "#feedbackBtn", function () {

        let cus_profile_id = $('#cus_profile_id').val();
        let cus_id = $('#cus_id').val();
        let feedback_label = $("#feedback_label").val();
        let cus_feedback = $("#cus_feedback").val();
        let feedback_remark = $("#feedback_remark").val();
        let feedbackID = $("#feedbackID").val();

        var data = ['feedback_label', 'cus_feedback']
        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        if (isValid) {
            $.post('api/closed_files/submit_loan_feedback.php', { cus_id, feedback_label, cus_feedback, feedback_remark, feedbackID, cus_profile_id }, function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'Loan Summary Added Successfully!');
                } else if (response == '2') {
                    swalSuccess('Success', 'Loan Summary Updated Successfully!')
                } else {
                    swalError('Error', 'Error Occurred!')
                }
                 getLoanSummaryTable();
            });
        }

    });

     $(document).on('click', '.loanSummaryActionBtn', function () {
        var id = $(this).attr('value'); // Get value attribute
        $.post('api/closed_files/loansummary_creation_data.php', { id: id }, function (response) {
            $('#feedbackID').val(id);
            $('#feedback_label').val(response[0].feedback_label);
            $('#cus_feedback').val(response[0].cus_feedback);
            $('#feedback_remark').val(response[0].feedback_remark);
        }, 'json');
    });

    $(document).on('click', '.loanSummaryDeleteBtn', function () {
        var id = $(this).attr('value');
        swalConfirm('Delete', 'Do you want to Delete the FeedBack Details?', getFeedBackDelete, id);
        return;
    });

    $(document).on('click', '.due-chart', function () {

        $('#due_chart_model').modal('show');
        var cp_id = $(this).attr('value');
        var cus_id = $('#cus_id').val();
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
                                //var content = $("#printcollection").html();

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
        fineChartList(cp_id)
        $('#fine_model').modal('show');
    });


    $(document).on('click', '.commitment-chart', function () {
        var cp_id = $(this).attr('value');
        commitmentChartList(cp_id) //To Show commitment Chart List
        $('#commitment_model').modal('show');
    });
    $(document).on('click', '.loansummary-chart', function () {
        var cp_id = $(this).attr('value');
        getLoanSummaryInfoTable(cp_id) //To Show commitment Chart List
        $('#loansummary_model').modal('show');
    });
    $(document).on('click', '.closed-view', function () {

        let id = $(this).attr('value');
        $('#cus_profile_id').val(id)
        $('#closed_remark_model').modal('show');
    });


});


$(function () {
    getClosedListTable();
});

function getClosedListTable() {
    serverSideTable('#closed_list_table', '', 'api/closed_files/close_list_table.php');
}
// function moveToNext(cus_id, cus_sts) {
//     $.post('api/closed_files/close_move_to_next.php', { cus_id, cus_sts }, function (response) {
//         if (response == '0') {
//             let alertName;
//             if (cus_sts == '10') {
//                 alertName = 'Moved To NOC';
//             }
//             swalSuccess('Success', alertName);
//             getClosedListTable();
//         } else {
//             swalError('Alert', 'Failed To Move');
//         }
//     }, 'json');
// }

function validate() {
    let isValid = true;

    // Validate sub_status
    let subStatus = $('#sub_status').val();
    if (!validateField(subStatus, 'sub_status')) {
        isValid = false;
    }

    // If sub_status == 1, validate closed_Sts_consider
    if (subStatus == "1") {
        if (!validateField($('#closed_Sts_consider').val(), 'closed_Sts_consider')) {
            isValid = false;
        }
    }

    // Validate cus_profile_id
    if (!validateField($('#cus_profile_id').val(), 'cus_profile_id')) {
        isValid = false;
    }

    return isValid;
}


function getClosedLoanList(cus_id) {
    $.post('api/common_files/closed_loan_list.php', { cus_id }, function (response) {
        var columnMapping = [
            'sno',
            'loan_id',
            'loan_category',
            'loan_date',
            'closed_date',
            'loan_amount',
            'status',
            'sub_status',
            'charts',
            'action'
        ];
        appendDataToTable('#close_loan_table', response, columnMapping);
        setdtable('#close_loan_table');
        //Dropdown in List Screen
        setDropdownScripts();
    }, 'json');
}

function closeChartsModal() {
    $('#due_chart_model').modal('hide');
    $('#penalty_model').modal('hide');
    $('#fine_model').modal('hide');
    $('#closed_remark_model').modal('hide');
    $('#commitment_model').modal('hide');
    $('.addloansummary').modal('hide');
    $('#loansummary_model').modal('hide');
    $('#closed_remark_form input').val('');
    $('#closed_remark_form select').val('');
    $('#closed_remark_form textarea').val('');
    $('#closed_remark_form input').css('border', '1px solid #cecece');
    $('#closed_remark_form select').css('border', '1px solid #cecece');

}
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
            $('#dueChartTitle').text('Due Chart ( ' + response['due_method'] + ' - ' + response['loan_type'] + ' ');
        }, 'json');
    })

}
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

function getCustomerSummary(cus_id) {
    $.ajax({
        url: 'api/closed_files/getCustomerSummary.php',
        data: { 'cus_id': cus_id },
        dataType: 'json',
        type: 'post',
        cache: false,
        success: function (response) {
            $('#how_to_know').val(moneyFormatIndia(response['how_to_know']))
            $('#monthly_income').val(moneyFormatIndia(response['monthly_income']))
            $('#other_income').val(moneyFormatIndia(response['other_income']))
            $('#support_income').val(moneyFormatIndia(response['support_income']))
            $('#commitment').val(moneyFormatIndia(response['commitment']))
            $('#monthly_due_capacity').val(moneyFormatIndia(response['monthly_due_capacity']))
            $('#cus_limit').val(moneyFormatIndia(response['cus_limit']))
            $('#about_cus').val(response['about_customer'])
        }
    })
}

function getFeedBackInfoTable(cus_id) {
    $.post('api/loan_entry/feedback_list.php', { cus_id }, function (response) {
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
function getLoanSummaryTable() {
    let cus_id = $('#cus_id').val();
    let cus_profile_id = $('#cus_profile_id').val();
    $.post('api/closed_files/loansummary_list.php', { cus_id, cus_profile_id }, function (response) {
        var columnMapping = [
            'sno',
            'feedback_label',
            'feedback_text',
            'feedback_remark',
            'action'
        ];
        appendDataToTable('#feedbackTable', response, columnMapping);
        setdtable('#feedbackTable');
        $('#feedback_form input').css('border', '1px solid #cecece');
        $('#feedback_form select').css('border', '1px solid #cecece');
        $('#feedback_form input').val('');
        $('#feedback_form textarea').val('');
        $('#feedback_form select').each(function () {
            $(this).val($(this).find('option:first').val());
        });
        $('#feedback_form input').css('border', '1px solid #cecece');

    }, 'json')
}

function getLoanSummaryInfoTable(cus_profile_id) {
    let cus_id = $('#cus_id').val();
    $.post('api/closed_files/loansummary_list.php', { cus_id, cus_profile_id }, function (response) {
        var columnMapping = [
            'sno',
            'feedback_label',
            'feedback_text',
            'feedback_remark',
        ];
        appendDataToTable('#feedbackInfoTable', response, columnMapping);
        setdtable('#feedbackInfoTable');

    }, 'json')
}
function getFeedBackDelete(id) {
    $.post('api/closed_files/delete_loanSummaryFeedback.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('Success', 'Loan Summary Deleted Successfully!');
            getLoanSummaryTable();
        } else {
            swalError('Error', 'Failed to Delete FeedBack: ' + response);
        }
    }, 'json');
}