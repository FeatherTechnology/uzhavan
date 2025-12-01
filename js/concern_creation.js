$(document).ready(function () {
    $(document).on('click', '#add_concern, #back_btn', function () {
        swapTableAndCreation();
        $('#concern_id').val('');

    });

    $('#add_concern').click(function (event) {
        event.preventDefault();

        // Clear inputs except con_code
        $('input').each(function () {
            var id = $(this).attr('id');
            if (id !== 'con_code' && id !== 'concern_date') {
                $(this).val('').prop('readonly', false); // clear and make editable
            }
        });
        $('#con_role, #assign_role').prop('readonly', true);
        $('#add_subject_btn').prop('disabled', false);

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
            $('#concern_date').val(formattedDate);

        }
        // Clear textarea
        $('textarea').val('').prop('readonly', false);

        // Reset selects to first option and re-enable
        $('select').each(function () {
            $(this).val($(this).find('option:first').val()).prop('disabled', false);
        });
        $('.submit_concern').show()
        $('.raise_cus').hide();
        $('.raise_staff').hide();

        // Reset borders
        $('input, select, textarea').css('border', '1px solid #cecece');
    });

    /////////////////////////////////////////////////////////// Concern Subject Modal START ///////////////////////////////////////////////////////////////////////
    // $('#submit_subject').click(function (event) {
    //     event.preventDefault();
    //     let con_sub = $('#con_sub').val(); let id = $('#sub_id').val();
    //     var data = ['con_sub']
    //     var isValid = true;
    //     data.forEach(function (entry) {
    //         var fieldIsValid = validateField($('#' + entry).val(), entry);
    //         if (!fieldIsValid) {
    //             isValid = false;
    //         }
    //     });
    //     if (con_sub != '') {
    //         if (isValid) {
    //             $.post('api/concern_creation_files/submit_concern_subject.php', { con_sub, id }, function (response) {
    //                 if (response == '0') {
    //                     swalError('Warning', 'Concern Subject Already Exists!');
    //                 } else if (response == '1') {
    //                     swalSuccess('Success', 'Concern Subject Updated Successfully!');
    //                 } else if (response == '2') {
    //                     swalSuccess('Success', 'Concern Subject Added Successfully!');
    //                 }

    //                 getConcernSubjectTable();
    //             }, 'json');
    //             clearSubject(); //To Clear All Fields in Role creation.
    //         }
    //     }
    // });

    // $(document).on('click', '.subjectActionBtn', function () {
    //     var id = $(this).attr('value'); // Get value attribute
    //     $.post('api/concern_creation_files/get_subject_data.php', { id }, function (response) {
    //         $('#sub_id').val(id);
    //         $('#con_sub').val(response[0].concern_subject);
    //     }, 'json');
    // });

    // $(document).on('click', '.subjectDeleteBtn', function () {
    //     var id = $(this).attr('value'); // Get value attribute
    //     swalConfirm('Delete', 'Do you want to Delete the Subject Creation?', deleteSubject, id);
    //     return;
    // });
    /////////////////////////////////////////////////////////// Concern Subject Modal END ///////////////////////////////////////////////////////////////////////

    $('#raising_for').on('change', function () {
        var raising_for = this.value;
        $('#aadhar_num').val('');
        $('#user_name').val('').prop('disabled', true);
        $('#cus_name').val('').prop('disabled', true);
        $('#area').val('').prop('disabled', true);
        $('#mobile1').val('').prop('disabled', true);
        $('#line').val('').prop('disabled', true);
        $('#auto_gen_cus_id').val('').prop('disabled', true);

        if (raising_for == 1) {
            $('.raise_cus').show();
            $('.raise_staff').hide();
        } else if (raising_for == 2) {
            $('.raise_staff').show();
            $('.raise_cus').hide();
            getStaffDropdown('user_name', '');
        }

    });


    // Function to format Aadhaar number input
    $('input[data-type="adhaar-number"]').keyup(function () {
        var value = $(this).val();
        value = value.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join(" ");
        $(this).val(value);
    });

    $('input[data-type="adhaar-number"]').change(function () {
        let len = $(this).val().length;
        if (len < 14) {
            $(this).val('');
            swalError('Warning', 'Kindly Enter Valid Aadhaar Number');
        }
    });

    $('#aadhar_num').on('blur', function () {
        let aadhar_num = $('#aadhar_num').val().trim().replace(/\s/g, '');

        if (aadhar_num != '') {
            getCustomerInfo(aadhar_num)
        }
    });


    // concern_to change
    $('#concern_to').change(function () {
        var concern_to = $(this).val();
        if (concern_to !== '' && concern_to != 0) {
            getConcernRole(concern_to, 'con_role');  // 👈 sets #con_role
        } else {
            $('#con_role').val('');
        }
    });

    // designation change
    $('#designation').change(function () {
        var designation = $(this).val();
        if (designation !== '' && designation != 0) {
            getAssignName(designation,'')
        } else {
            $('#assign_to').val('');
        }
    })

    $('#submit_concern_creation').click(function (event) {
        event.preventDefault();

        // Collect form values
        let raising_for = $('#raising_for').val();
        let formData = {
            raising_for: raising_for,
            con_code: $('#con_code').val(),
            aadhar_num: $('#aadhar_num').val().replace(/\s/g, ''),
            cus_name: $('#cus_name').val(),
            cus_id: $('#auto_gen_cus_id').val(),
            area: $('#area').val(),
            line: $('#line').val(),
            mobile: $('#mobile1').val(),
            user_name: $('#user_name').val(),
            concern_date: $('#concern_date').val(),
            concern_subject: $('#concern_subject').val(),
            con_remark: $('#con_remark').val(),
            concern_to: $('#concern_to').val(),
            assign_to: $('#assign_to').val(),
            designation: $('#designation').val()
        };

        // Required fields
        let data = ['concern_date', 'con_remark', 'con_code', 'raising_for', 'concern_subject', 'assign_to', 'concern_date', 'designation', 'concern_to'];

        if (raising_for == 1) {
            data = data.concat(['aadhar_num', 'auto_gen_cus_id', 'cus_name', 'area', 'line', 'mobile1']);
        } else {
            data = data.concat(['user_name']);
        }

        // Validation
        let isValid = true;
        data.forEach(function (entry) {
            let fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });

        if (isValid) {
            $.post('api/concern_creation_files/submit_concern_creation.php', formData, function (response) {
                if (response == '2') {
                    swalSuccess('Success', 'Concern Creation Added Successfully!');
                } else {
                    swalError('Error', 'Error Occurred!');
                }

                $('#concern_id').val('');
                $('#concern_creation').trigger('reset');
                swapTableAndCreation(); // switch view
                getConcernCreationTable()
            });
        }
    });


    // click handler
    $(document).on('click', '.concern_details', async function () {
        var id = $(this).attr('value');

        $('#concern_creation_content').show();
        $('#back_btn').show();
        $('.concern_table_content').hide();
        $('#add_concern').hide();
        // $('#add_subject_btn').prop('disabled', true);

        try {
            const response = await $.ajax({
                url: 'api/concern_creation_files/concern_creation_data.php',
                type: 'POST',
                data: { id },
                dataType: 'json'
            });

            const data = response[0];

            $('.submit_concern').hide();

            // simple inputs;
            $('#aadhar_num').val(data.aadhar_num).prop('readonly', true);
            $('#con_code').val(data.con_code).prop('readonly', true);
            $('#concern_date').val(data.concern_date).prop('readonly', true);
            $('#con_remark').val(data.con_remark).prop('readonly', true);



             await getConcernSubjectDropdown(data.con_sub);
            await getConcernTo(data.concern_to);
            await getConcernDesignation(data.assign_designation);

            // disable selects (use disabled, not readonly)
            $('#raising_for').val(data.raising_for).prop('disabled', true).trigger('change');
            $('#concern_subject').prop('disabled', true);
            $('#designation').val(data.assign_designation).prop('disabled', true);
            $('#assign_to').prop('disabled', true)
            
            $('#concern_to').prop('disabled', true).trigger('change');
            $('#user_name').prop('disabled', true);
            await getCustomerInfo(data.aadhar_num);
            await getStaffDropdown('user_name', data.user_name);
           await getAssignName(data.assign_designation,data.assign_to);
            // if (data.assign_role == 'Staff') {
            //     await getStaffDropdown('assign_to', data.assign_to);
            // } else {
            //     await getAssignName(data.assign_to);

            // }
            // $('#assign_to').prop('disabled', true).trigger('change');
        } catch (error) {
            console.error("Error loading user data or dropdowns:", error);
        }
    });

    /// Document End
})
$(function () {
    getConcernCreationTable()
});


function getConcernCreationTable() {
    serverSideTable('#concern_create', '', 'api/concern_creation_files/con_creation_list.php');
}

function swapTableAndCreation() {
    if ($('.concern_table_content').is(':visible')) {
        $('.concern_table_content').hide();
        $('#add_concern').hide();
        $('#concern_creation_content').show();
        $('#back_btn').show();
        getConcernCode()
        getConcernTo()
        getConcernDesignation()
         getConcernSubjectDropdown()

    } else {
        $('.concern_table_content').show();
        $('#add_concern').show();
        $('#concern_creation_content').hide();
        $('#back_btn').hide();
    }
}

// function clearSubject() {
//     $('#con_sub').val('');
//     $('#sub_id').val('0');
//     $('#con_sub').css('border', '1px solid #cecece');
// }

// function getConcernSubjectTable() {
//     $.post('api/concern_creation_files/get_subject_list.php', function (response) {
//         let concerSubColumn = [
//             "sno",
//             "concern_subject",
//             "action"
//         ]
//         appendDataToTable('#con_sub_table', response, concerSubColumn);
//         setdtable('#con_sub_table');
//     }, 'json');
// }
async function getConcernSubjectDropdown(subject_name_id) {
    try {
        const response = await $.ajax({
            url: 'api/concern_creation_files/get_subject_list.php',
            type: 'POST',
            dataType: 'json'
        });

        let options = '<option value="">Select Concern Subject</option>';
        $.each(response, function (index, val) {
            options += `<option value="${val.con_sub_id}">${val.concern_subject}</option>`;
        });

        $('#concern_subject').empty().append(options);

        // Now set the value after appending
        if (subject_name_id) {
            $('#concern_subject').val(subject_name_id);
        }

    } catch (error) {
        console.error('Failed to load Concern Subject:', error);
        throw error;
    }
}


function deleteSubject(id) {
    $.post('api/concern_creation_files/delete_subject.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('Success', 'Concern Subject Deleted Successfully.');
            getConcernSubjectTable();
        } else if (response == '0') {
            swalError('Access Denied', 'Used in Concern Creation');
        } else {
            swalError('Error', 'Concern Subject Delete Failed.');
        }
    }, 'json');
}
function getCustomerInfo(aadhar_num) {
    $.post('api/concern_creation_files/customer_info.php', { aadhar_num: aadhar_num }, function (response) {
        if (response.length > 0) {
            $('#auto_gen_cus_id').val(response[0].cus_id);
            $('#aadhar_num').val(response[0].aadhar_num);
            $('#cus_name').val(response[0].cus_name);
            $('#area').val(response[0].area);
            $('#line').val(response[0].linename);
            $('#mobile1').val(response[0].mobile1);

        }
    }, 'json');
}


function getConcernCode() {
    $.ajax({
        url: 'api/concern_creation_files/getConcernCode.php',
        type: "post",
        dataType: "json",
        data: {},
        cache: false,
        success: function (response) {
            var con_id = response;
            $('#con_code').val(con_id);
        }
    })
}


function getConcernDesignation(concern_design_id) {

    let assign_des = 'Director,Admin,Manager,TL,Training TL,Executive Director';

    $.post(
        'api/concern_creation_files/getConcernDesignation.php',
        {
            assign_des: assign_des,
            selected_id: concern_design_id   // <-- Pass selected id
        },
        function (response) {
            let html = '<option value="">Select Assign Designation</option>';

            $.each(response, function (index, val) {
                let selected = (val.id == concern_design_id) ? 'selected' : '';
                html += `<option value="${val.id}" ${selected}>${val.designation}</option>`;
            });

            $('#designation').html(html);
        },
        'json'
    );
}




function getConcernRole(userId, targetField) {
    $.ajax({
        url: 'api/concern_creation_files/getConcernRole.php',
        type: 'POST',
        data: { concern_to: userId },
        dataType: 'json',
        cache: false,
        success: function (response) {
            if (response.length > 0) {
                $('#' + targetField).val(response[0].role);
            } else {
                $('#' + targetField).val('');
            }
        },
    });
}

function getConcernTo(name_id) {
    return $.ajax({
        url: 'api/accounts_files/accounts/user_list.php',
        type: 'POST',
        dataType: 'json',
        cache: false
    }).done(function (response) {
        let html = '<option value="">Select Concern Against</option>';
        $.each(response, function (index, val) {
            html += '<option value="' + val.id + '">' + val.name + '</option>';
        });
        $('#concern_to').empty().append(html);
        if (name_id) {
            // set value after options exist
            $('#concern_to').val(name_id).trigger('change');
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('getConcernTo failed:', textStatus, errorThrown);
    });
}

function getStaffDropdown(targetId, selectedId = '') {
    return $.ajax({
        url: 'api/concern_creation_files/getStaffName.php',
        type: 'POST',
        dataType: 'json',
        cache: false
    }).done(function (response) {

        // If target field is INPUT instead of SELECT
        if ($('#' + targetId).is('input')) {

            // if only one staff
            if (response.length == 1) {
                $('#' + targetId).val(response[0].name);
            }

            // if selectedId is passed → find matching user
            if (selectedId) {
                var found = response.find(item => item.id == selectedId);
                if (found) {
                    $('#' + targetId).val(found.name);
                }
            }
            return;
        }

        // Otherwise, handle select dropdown (old method)
        let html = '<option value="">Select User Name</option>';
        $.each(response, function (index, val) {
            html += '<option value="' + val.id + '">' + val.name + '</option>';
        });
        $('#' + targetId).html(html);

        if (selectedId) {
            $('#' + targetId).val(selectedId);
        }
    });
}



function getAssignName(staff_name_id,selectedId='') {
    return $.ajax({
        url: 'api/concern_creation_files/getStaffName.php',
        type: 'POST',
        data: { assign_to: staff_name_id },
        dataType: 'json',
        cache: false
    }).done(function (response) {
        let html = '<option value="">Select Assign To</option>';
        $.each(response, function (index, val) {
            html += '<option value="' + val.id + '">' + val.name + '</option>';
        });
        $('#assign_to').empty().append(html);
        
        if (selectedId) {
            $('#assign_to').val(selectedId);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('getAssignName failed:', textStatus, errorThrown);
    });
}


