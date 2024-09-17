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
        } else if (customerDataType == 'existing_list') {
            $('.new_table_content').hide();
            $('.existing_table_content').show();
            $('.repromotion_table_content').hide();
        }else if(customerDataType == 'repromotion_list'){
            $('.new_table_content').hide();
            $('.existing_table_content').hide();
            $('.repromotion_table_content').show();
            getRePromotionTable();
        }
    });
    $('#submit_new').click(function (event) {
        event.preventDefault();

        // Collect form data
        let cus_name = $('#cus_name').val();
        let area = $('#area').val();
        let mobile = $('#mobile').val();
        let loan_cat = $('#loan_cat').val();
        let loan_amount = $('#loan_amount').val();
        let new_promotion_id = $('#new_Promotion_id').val();

        // Fields to validate
        var data = ['cus_name', 'area', 'mobile', 'loan_cat', 'loan_amount'];

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
                if (response.status == 1) {
                    statusMsg = "Customer Profile Insert";
                }
                else if (response.status == 2) {
                    statusMsg = "Loan Calculation Insert";
                }
                else if (response.status == 3) {
                    statusMsg = "Moved To Approval";
                }
                else if (response.status == 4) {
                    statusMsg = "Approved";
                }
                else if (response.status == 5) {
                    statusMsg = "Cancel in Approval";
                }
                else if (response.status == 6) {
                    statusMsg = "Revoke in Approval";
                }
                else if (response.status == 7) {
                    statusMsg = "Loan Issue";
                }
                else if (response.status == 8) {
                    statusMsg = "Closed";
                }
                else if (response.status == 9) {
                    statusMsg = "Closed";
                }
                else if (response.status == 10) {
                    statusMsg = "NOC";
                }
                else if (response.status == 11) {
                    statusMsg = "NOC";
                }
                swalError('Warning', 'Mobile number already exists. Customer status: ' + statusMsg);
                return false;
            } if (isValid) {
                // Proceed with form submission
                $.post('api/customer_data_files/submit_new.php', { cus_name, area, mobile, loan_cat, loan_amount, new_promotion_id }, function (response) {
                    if (response == '1') {
                        swalSuccess('Success', 'Customer Data Added Successfully!');
                        $('#new_form input').val('');
                        $('#new_form input').css('border', '1px solid #cecece');
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

    $(document).on('change', '.existingNeedBtn', function () {
        var cus_id = $(this).attr('value');
        var checkbox = $(this); // Reference to the checkbox element
        swalConfirm('Are You Sure', '', getExistingData, cus_id, function () {
            checkbox.prop('checked', false); // Uncheck the checkbox if the user presses "No"
        });
        return;
    });

    $(document).on('change', '.repromotionBtn', function () {
        var cus_id = $(this).attr('value');
        var checkbox = $(this); // Reference to the checkbox element
        swalConfirm('Are You Sure', '', InsertRepromotionData, cus_id, function () {
            checkbox.prop('checked', false); // Uncheck the checkbox if the user presses "No"
        });
        return;
    });

})


$(function () {
    getNewPromotionTable();
    getExistingPromotionTable();

});
function getNewPromotionTable() {
    $.post('api/customer_data_files/get_new_promotion.php', function (response) {
        var columnMapping = [
            'sno',
            'cus_name',
            'area',
            'mobile',
            'loan_cat',
            'loan_amount',
            'action'
        ];
        appendDataToTable('#new_list_table', response, columnMapping);
        setdtable('#new_list_table');
        $('#new_form input').val('');
        $('#new_form input').css('border', '1px solid #cecece');
    }, 'json')
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
function getExistingPromotionTable() {

    $.post('api/customer_data_files/get_existing_promotion.php', { }, function (response) {
        var columnMapping = [
            'id',
            'cus_id',
            'cus_name',
            'mobile1',
            'area',
            'linename',
            'branch_name',
            'c_sts',
            'c_substs',
            'action'
        ];
        appendDataToTable('#existing_list_table', response, columnMapping);
        setdtable('#existing_list_table');

    }, 'json')
}

function getRePromotionTable() {
    $.post('api/customer_data_files/get_repromotion_list.php', { }, function (response) {
        var columnMapping = [
            'id',
            'cus_id',
            'cus_name',
            'mobile1',
            'area',
            'linename',
            'branch_name',
            'c_sts',
            'action'
        ];
        appendDataToTable('#repromotion_list_table', response, columnMapping);
        setdtable('#repromotion_list_table');
    }, 'json')
}

function getExistingData(cus_id) {
    $.post('api/customer_data_files/get_existing_data.php', { cus_id }, function (response) {
        if (response == '1') {
            swalSuccess("Success", "Existing Data Added Successfully!", "success");
            // Replace the checkbox with "Needed" text
            $('.existingNeedBtn[value="' + cus_id + '"]').replaceWith('<span>Needed</span>');
        } else {
            swalError("Error", "Failed to Add Existing Data", "error");
        }
    });
}

function InsertRepromotionData(cus_id) {
    $.post('api/customer_data_files/submit_repromotion.php', { cus_id }, function (response) {
        if (response == '1') {
            swalSuccess("Success", "Repromotion Data Added Successfully!", "success");
            // Replace the checkbox with "Needed" text
            $('.repromotionBtn[value="' + cus_id + '"]').replaceWith('<span>Needed</span>');
        } else {
            swalError("Error", "Failed to Add Repromotion Data", "error");
        }
    });
}