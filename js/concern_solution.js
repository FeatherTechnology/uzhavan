$(document).ready(function () {
    $(document).on('click', '#back_btn', function () {

        $('#concern_creation_content').hide();
        $('#back_btn').hide();
        $('.concern_table_content').show();
    });
    //////////////////////////////////////////////////////Concern Assign Start //////////////////////////////////////////////////////////
    $(document).on('click', '.concern_assign', async function () {
        var id = $(this).attr('value');
        $('#concern_id').val(id)
        $('#concern_creation_content').show();
        $('#back_btn').show();
        $('.concern_table_content').hide();
        $('.solution_card').hide();
        $('#assign_to').prop('disabled', false);
         $('#communication').val('').prop('disabled', false)
        $('#concern_upload').val('').prop('disabled', false)
        $('#sol_remark').val('').prop('readonly', false)
        $('#upload_edit').val('')  
        $('#upload_edit').html('');
        $('.submit_concern').show();
        $('.con_upload_div').hide();
        $('.location-div').hide();
        try {
            const response = await $.ajax({
                url: 'api/concern_creation_files/concern_creation_data.php',
                type: 'POST',
                data: { id },
                dataType: 'json'
            });

            const data = response[0];

            // simple inputs;
            $('#aadhar_num').val(data.aadhar_num).prop('readonly', true);
            $('#con_code').val(data.con_code).prop('readonly', true);
            $('#concern_date').val(data.concern_date).prop('readonly', true);
            $('#con_remark').val(data.con_remark).prop('readonly', true);
            await getConcernSubjectDropdown(data.con_sub);
            await getConcernTo(data.concern_to);
            // disable selects (use disabled, not readonly)
            $('#raising_for').val(data.raising_for).prop('disabled', true).trigger('change');
            $('#concern_subject').prop('disabled', true);
            $('#branch_name').val(data.branch_name).prop('disabled', true);
            $('#concern_to').prop('disabled', true).trigger('change');
            $('#user_name').prop('disabled', true);
            await getCustomerInfo(data.aadhar_num);
            await getStaffDropdown('user_name', data.user_name);
             await getConcernDesignation();

        } catch (error) {
            console.error("Error loading user data or dropdowns:", error);
        }
    });
    //////////////////////////////////////////////////////Concern Assign END //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////Concern Solution Start //////////////////////////////////////////////////////////
    $(document).on('click', '.concern_soution', async function () {
        var id = $(this).attr('value');
        $('#concern_id').val(id)
        $('#concern_creation_content').show();
        $('#back_btn').show();
        $('.concern_table_content').hide();
        $('.solution_card').show();
        $('#communication').val('').prop('disabled', false)
        $('#concern_upload').val('').prop('disabled', false)
        $('#sol_remark').val('').prop('readonly', false)
        $('#upload_edit').val('')  
        $('#upload_edit').html('');
        $('.con_upload_div').hide();
        $('.location-div').hide();
            
        $('.submit_concern').show();

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
        $('#solution_date').val(formattedDate);

    }
        try {
            const response = await $.ajax({
                url: 'api/concern_creation_files/concern_creation_data.php',
                type: 'POST',
                data: { id },
                dataType: 'json'
            });

            const data = response[0];

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
            $('#concern_to').prop('disabled', true).trigger('change');
            $('#user_name').prop('disabled', true);
            await getCustomerInfo(data.aadhar_num);
            await getStaffDropdown('user_name', data.user_name);
            await getAssignName(data.assign_designation,data.assign_to);
            $('#assign_to').prop('disabled', true);

        } catch (error) {
            console.error("Error loading user data or dropdowns:", error);
        }
    });
    /////////////////////////////////////////////Concern Solution End///////////////////////////////////////
    //////////////////////////////////////////////////////Concern Solution View Start //////////////////////////////////////////////////////////
    $(document).on('click', '.concern_sol_details', async function () {
        var id = $(this).attr('value');
        $('#concern_id').val(id)
        $('#concern_creation_content').show();
        $('#back_btn').show();
        $('.concern_table_content').hide();
        $('.solution_card').show();
        $('.submit_concern').hide();

        try {
            const response = await $.ajax({
                url: 'api/concern_creation_files/concern_creation_data.php',
                type: 'POST',
                data: { id },
                dataType: 'json'
            });

            const data = response[0];

            // simple inputs;
            $('#aadhar_num').val(data.aadhar_num).prop('readonly', true);
            $('#con_code').val(data.con_code).prop('readonly', true);
            $('#concern_date').val(data.concern_date).prop('readonly', true);
            $('#solution_date').val(data.sol_date).prop('readonly', true);
            $('#con_remark').val(data.con_remark).prop('readonly', true);
            $('#sol_remark').val(data.sol_remark).prop('readonly', true);
            $('#concern_upload').prop('disabled', true);
            if (data.concern_upload && data.concern_upload !== '') {
                let fileUrl = 'uploads/concern_solution/' + data.concern_upload; // path to file
                $('#upload_edit').html(
                    `<a href="${fileUrl}" target="_blank" style="color:var(--primary-color); font-weight:500;">${data.concern_upload}</a>`
                );
            } else {
                $('#upload_edit').html('');
            }



            await getConcernSubjectDropdown(data.con_sub);
            await getConcernTo(data.concern_to);
            await getBranchName(data.branch_name);


            // disable selects (use disabled, not readonly)
            $('#raising_for').val(data.raising_for).prop('disabled', true).trigger('change');
            $('#communication').val(data.communication).prop('disabled', true).trigger('change');
            $('#concern_subject').prop('disabled', true);
            $('#branch_name').val(data.branch_name).prop('disabled', true);
            $('#concern_to').prop('disabled', true).trigger('change');
            $('#user_name').prop('disabled', true);
            await getCustomerInfo(data.aadhar_num);
            await getStaffDropdown('user_name', data.user_name);
            if (data.assign_role == 'Staff') {
                await getStaffDropdown('assign_to', data.assign_to);
            } else {
                await getAssignName(data.assign_to);

            }
            $('#assign_to').prop('disabled', true).trigger('change');

        } catch (error) {
            console.error("Error loading user data or dropdowns:", error);
        }
    });
    //////////////////////////////////////////////////////Concern Solution View End //////////////////////////////////////////////////////////
 
    $('#raising_for').on('change', function () {
        var raising_for = this.value;
        $('#aadhar_num').val('');
        $('#user_name').val('');
        $('#cus_name').val('');
        $('#area').val('');
        $('#mobile1').val('');
        $('#line').val('');
        $('#role').val('');
        $('#auto_gen_cus_id').val('');

        if (raising_for == 1) {
            $('.raise_cus').show();
            $('.raise_staff').hide();
        } else if (raising_for == 2) {
            $('.raise_staff').show();
            $('.raise_cus').hide();
        }

    });
    $('#communication').on('change', function () {
        var communication = this.value;
        if (communication == 1) {
            $('.con_upload_div').show();
            $('.location-div').hide();
        } else if (communication == 2) {
            $('.con_upload_div').hide();
            $('.location-div').show();
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

        // Get the file
        let concern_upload = $('#concern_upload')[0].files[0];

        // Build FormData
        let formData = new FormData();
        formData.append('solution_date', $('#solution_date').val());
        formData.append('communication', $('#communication').val());
        formData.append('sol_remark', $('#sol_remark').val());
        formData.append('sol_participants', $('#sol_participants').val());
        formData.append('location', $('#location').val());
        formData.append('concern_id', $('#concern_id').val());
        formData.append('assign_to', $('#assign_to').val());
        formData.append('designation', $('#designation').val());
        if (concern_upload) {
            formData.append('concern_upload', concern_upload);
        }

        // Conditional required fields
        let requiredFields = [];
        if ($('.solution_card').is(':visible')) {
            requiredFields = ['solution_date', 'sol_remark', 'communication','sol_participants'];
            if ($('#communication').val() == 2 ){
             requiredFields = ['location'];
        } 
        }else {
            requiredFields = ['assign_to', 'designation'];
        }

        // Validation
        let isValid = true;
        requiredFields.forEach(function (entry) {
            if (!validateField($('#' + entry).val(), entry)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Submit via AJAX with FormData
        $.ajax({
            url: 'api/concern_solution/submit_concern_solution.php',
            type: 'POST',
            data: formData,
            dataType: 'json',
            processData: false, // important for file upload
            contentType: false, // important for file upload
            success: function (response) {
                console.log(response);
                if (response.result == 2) {
                    if (response.status == 0) {
                        swalSuccess('Success', 'Concern Assigned Successfully!');
                    } else if (response.status == 1) {
                        swalSuccess('Success', 'Concern Solution Added Successfully!');
                    }
                } else {
                    swalError('Error', 'Error Occurred!');
                }

                $('#concern_id').val('');
                $('#concern_solution').trigger('reset');
                getConcernSolutionTable();
                $('#concern_creation_content').hide();
                $('#back_btn').hide();
                $('.concern_table_content').show();
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", status, error);
                swalError('Error', 'AJAX Error Occurred!');
            }
        });
    });


});

$(function () {
    getConcernSolutionTable()
});


function getConcernSolutionTable() {
    serverSideTable('#concern_solution', '', 'api/concern_solution/concern_solution_list.php');
}


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
function getConcernDesignation(concern_design_id) {

    let assign_des = 'OA,Staff,Trainee';
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
        let html = '<option value="">Select Concern To</option>';
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
        let html = '<option value="">Select User Name</option>';
        $.each(response, function (index, val) {
            html += '<option value="' + val.id + '">' + val.name + '</option>';
        });
        $('#' + targetId).empty().append(html);
        if (selectedId) {
            $('#' + targetId).val(selectedId);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('getStaffDropdown failed for ' + targetId + ':', textStatus, errorThrown);
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