$(document).ready(function () {
    //Move Loan Entry 
    $(document).on('click', '.move-loan-entry', function () {
        let cus_sts_id = $(this).attr('value');
        swalConfirm('Approve', 'Are you ready to move to the Approval Screen?', moveToNext, cus_sts_id);
        return;
    });
    // Loan Entry Tab Change Radio buttons
    $(document).on('click', '#add_loan', function () {
        swapTableAndCreation();
    });

    $('#add_loan').click(function () {

        autoGenCusId("");
        $('.customer_content').hide();
        $('.personal_info_disble').attr("disabled", false);
        let cus_data = $('#cus_data').val();
        if (cus_data == 'Existing') {
            $('.cus_status_div').show();
            // $('#data_checking_div').show();
            // $('#checking_hide').show();
        } else {
            $('.cus_status_div').hide();
            // $('#data_checking_div').hide();
            // $('#checking_hide').hide();
        }
        dataCheckList('', '', '', '');
        $('#data_checking_table_div').hide();
    });

    $('#back_btn').click(function () {
        let cus_id = $('#auto_gen_cus_id').val();
        let cus_profile_id = $('#customer_profile_id').val();
        $('.customer_content').show();
        $.post('api/loan_entry/cus_sts_check.php', { 'cus_id': cus_id, 'cus_profile_id': cus_profile_id }, function (response) {
            if (response.status == 0) {
                // If status is 0, proceed with confirmation
                swalConfirm('Warning', 'Are you sure you want to go back? Personal information will be lost because the customer profile is incomplete.', cusDeleteStatus, cus_id);
                return;

            } else {
                // Do nothing if cancelled
                swapTableAndCreation();
                getLoanEntryTable();
                clearLoanCalcForm(); // To clear Loan Calculation
                clearCusProfileForm('1'); // To Clear Customer Profile
            }

        }, 'json');
    });

    $(document).on('click', '.edit-loan-entry', function () {
        let id = $(this).attr('value');
        $('.customer_content').show();
        $('#customer_profile_id').val(id);
        $('#cus_profile_id').val(id);
        let loanCalcId = $(this).attr('data-id');
        $('#loan_calculation_id').val(loanCalcId);
        swapTableAndCreation();
        editCustmerProfile(id)
        // loanCalculationEdit(loanCalcId);

    });
    $('input[name=loan_entry_type]').click(function () {
        let loanEntryType = $(this).val();
        if (loanEntryType == 'cus_profile') {
            $('#loan_entry_customer_profile').show(); $('#documentation_form').hide(); $('#loan_entry_loan_calculation').hide();

        } else if (loanEntryType == 'loandoc') {
            $('#documentation_form').show(); $('#loan_entry_customer_profile').hide(); $('#loan_entry_loan_calculation').hide();
            callLoanDocumentFunctions();
        }
        else if (loanEntryType == 'loan_calc') {
            $('#loan_entry_customer_profile').hide(); $('#documentation_form').hide(); $('#loan_entry_loan_calculation').show();
            callLoanCaculationFunctions();
        }
    })

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

    $('#cus_name').on('blur', function () {
        var customerName = $(this).val().trim();
        if (customerName) {
            updateCustomerName(customerName);
        } else {
            removeCustomerName();
        }
    });


    $('#aadhar_nums').on('blur', function () {
        let aadhar_num = $('#aadhar_nums').val().trim().replace(/\s/g, '');
        let cus_name = $('#cus_name').val();
        let cus_id = $('#auto_gen_cus_id').val();
        let mobileno = $('#mobile1').val();
        if (aadhar_num) {
            dataCheckList(cus_id, cus_name, mobileno, aadhar_num)
        } else {
            removeCustomerID();
        }

        let aadhar_num_upd = $('#aadhar_num_upd').val();
        if (aadhar_num != '' && aadhar_num != aadhar_num_upd) {
            existingCustmerProfile(aadhar_num)
            $('#aadhar_num_upd').val(aadhar_num);
        }
    });

    $('#mobile1').on('blur', function () {
        let aadhar_num = $('#aadhar_nums').val().trim().replace(/\s/g, '');
        let cus_name = $('#cus_name').val();
        let customerMobile = $(this).val().trim();
        let cus_id = $('#auto_gen_cus_id').val();
        if (customerMobile) {
            dataCheckList(cus_id, cus_name, customerMobile, aadhar_num)
        } else {
            removeCustomerMobile();
        }
    });

    $('#aadhar_nums, #cus_name').on('blur', function () {
        let aadhar_num = $('#aadhar_nums').val().trim().replace(/\s/g, '');
        let customerName = $('#cus_name').val().trim();
        if (aadhar_num && customerName) {
            addPropertyHolder(aadhar_num, customerName);
        } else {
            removeCustomerEntries();
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

    /////family Modal////
    $('#submit_family').click(function (event) {
        event.preventDefault();
        // Validation
        let cus_profile_id = $('#customer_profile_id').val();
        let cus_id = $('#auto_gen_cus_id').val();
        let fam_name = $('#fam_name').val();
        let remarks = $('#remarks').val();
        let fam_relationship = $('#fam_relationship').val();
        let fam_age = $('#fam_age').val();
        let fam_live = $('#fam_live').val();
        let fam_occupation = $('#fam_occupation').val();
        let fam_aadhar = $('#fam_aadhar').val().replace(/\s/g, '');
        let fam_mobile = $('#fam_mobile').val();
        let family_id = $('#family_id').val();

        if (cus_profile_id == '') {
            swalError('Warning', 'Kindly Fill the Personal Info');
            return false;
        }
        var data = ['fam_name', 'fam_relationship', 'fam_live', 'fam_aadhar', 'fam_mobile']

        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });

        if (isValid) {
            $.post('api/loan_entry/submit_family_info.php', { cus_id, fam_name, fam_relationship, remarks, fam_age, fam_live, fam_occupation, fam_aadhar, fam_mobile, family_id }, function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'Family Info Added Successfully!');
                } else {
                    swalSuccess('Success', 'Family Info Updated Successfully!');
                }
                // Refresh the family table
                getFamilyTable();
            });
        }
    });

    $(document).on('click', '.familyActionBtn', function () {
        var id = $(this).attr('value'); // Get value attribute
        $.post('api/loan_entry/family_creation_data.php', { id: id }, function (response) {
            $('#family_id').val(id);
            $('#fam_name').val(response[0].fam_name);
            $('#fam_relationship').val(response[0].fam_relationship);
            $('#remarks').val(response[0].remarks);
            $('#fam_age').val(response[0].fam_age);
            $('#fam_live').val(response[0].fam_live);
            $('#fam_occupation').val(response[0].fam_occupation);
            $('#fam_aadhar').val(response[0].fam_aadhar);
            $('#fam_mobile').val(response[0].fam_mobile);
        }, 'json');
    });

    $(document).on('click', '.familyDeleteBtn', function () {
        var id = $(this).attr('value');
        swalConfirm('Delete', 'Do you want to Delete the Family Details?', getFamilyDelete, id);
        return;
    });

    ////Proerty Modal////
    $('#submit_property').click(function () {
        event.preventDefault();
        //Validation
        let cus_profile_id = $('#customer_profile_id').val();
        let cus_id = $('#auto_gen_cus_id').val();

        let property = $('#property').val(); let property_detail = $('#property_detail').val(); let property_holder = $('#property_holder').val(); let property_id = $('#property_id').val();
        if (cus_profile_id == '') {
            swalError('Warning', 'Kindly Fill the Personal Info');
            return false;
        }
        var data = ['property', 'property_detail', 'property_holder', 'prop_relationship']
        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        if (isValid) {
            $.post('api/loan_entry/submit_property.php', { cus_id, property, property_detail, property_holder, property_id, cus_profile_id }, function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'Property Info Added Successfully!');
                } else {
                    swalSuccess('Success', 'Property Info Updated Successfully!')
                }
                getPropertyTable();
            });
        }
    });

    $(document).on('click', '.propertyActionBtn', function () {
        var id = $(this).attr('value'); // Get value attribute
        $.post('api/loan_entry/property_creation_data.php', { id: id }, function (response) {
            $('#property_id').val(id);
            $('#property').val(response[0].property);
            $('#property_detail').val(response[0].property_detail);
            $('#property_holder').val(response[0].property_holder);
            if (response[0].fam_relationship == null) {
                $('#prop_relationship').val('Customer');
            } else {
                $('#prop_relationship').val(response[0].fam_relationship);
            }

        }, 'json');
    });

    $(document).on('click', '.propertyDeleteBtn', function () {
        var id = $(this).attr('value');
        swalConfirm('Delete', 'Do you want to Delete the Property Details?', getPropertyDelete, id);
        return;
    });

    $('#property_holder').change(function () {
        var propertyHolderId = $(this).val();
        if (propertyHolderId != '' && propertyHolderId != 0) {
            getRelationshipName(propertyHolderId);
        } else if (propertyHolderId == 0) {
            $('#prop_relationship').val('Customer');
        } else {
            $('#prop_relationship').val('');
        }
    });

    $('#proof_of').change(function () {
        var proofOf = $(this).val();
        if (proofOf == "2") { // Family Member selected
            $('.fam_mem_div').show();
            $('.kyc_name_div').hide();
            $('#kyc_relationship').val('');
            getFamilyMemberData();
        } else { // Customer or any other selection
            let cus_name = $("#cus_name").val();
            $('#kyc_name').val(cus_name);
            $('.kyc_name_div').show();
            $('.fam_mem_div').hide();
            $('#kyc_relationship').val('NIL');
        }
    });

    $('#fam_mem').change(function () {
        var familyMemberId = $(this).val();
        if (familyMemberId) {
            getKycRelationshipName(familyMemberId);
        } else {
            $('#kyc_relationship').val('');
        }
    });

    //////Bank Modal/////
    $('#submit_bank').click(function () {
        event.preventDefault();
        //Validation
        let cus_profile_id = $('#customer_profile_id').val();
        let cus_id = $('#auto_gen_cus_id').val();
        let bank_name = $('#bank_name').val(); let branch_name = $('#branch_name').val(); let acc_holder_name = $('#acc_holder_name').val(); let acc_number = $('#acc_number').val(); let ifsc_code = $('#ifsc_code').val(); let bank_id = $('#bank_id').val();
        if (cus_profile_id == '') {
            swalError('Warning', 'Kindly Fill the Personal Info');
            return false;
        }
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

    ////////////Kyc Modal///////
    $('#submit_kyc').click(function (event) {
        event.preventDefault();
        //Validation
        let cus_profile_id = $('#customer_profile_id').val();
        let cus_id = $('#auto_gen_cus_id').val();
        let upload = $('#upload')[0].files[0]; let kyc_upload = $('#kyc_upload').val();
        let proof_of = $('#proof_of').val(); let fam_mem = $("#fam_mem").val(); let proof = $('#proof').val(); let proof_detail = $('#proof_detail').val(); let kyc_id = $('#kyc_id').val();
        if (cus_profile_id == '') {
            swalError('Warning', 'Kindly Fill the Personal Info');
            return false;
        }
        var data = ['proof_of', 'kyc_relationship', 'proof', 'proof_detail']
        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        if (isValid) {
            let kycDetail = new FormData();
            kycDetail.append('proof_of', proof_of)
            if (proof_of !== 'Customer') {
                kycDetail.append('fam_mem', fam_mem);
            }
            kycDetail.append('cus_profile_id', cus_profile_id)
            kycDetail.append('cus_id', cus_id)
            kycDetail.append('proof', proof)
            kycDetail.append('proof_detail', proof_detail)
            kycDetail.append('upload', upload)
            kycDetail.append('kyc_upload', kyc_upload)
            kycDetail.append('kyc_id', kyc_id)
            $.ajax({
                url: 'api/loan_entry/submit_kyc.php',
                type: 'post',
                data: kycDetail,
                contentType: false,
                processData: false,
                cache: false,
                success: function (response) {
                    if (response = 'Success') {
                        if (kyc_id == '') {
                            swalSuccess('Success', 'KYC Added Successfully!');
                            $('.kyc_name_div').hide();
                            $('.fam_mem_div').hide();
                        } else {
                            swalSuccess('Success', 'KYC Updated Successfully!')
                            $('.kyc_name_div').hide();
                            $('.fam_mem_div').hide();
                        }
                    } else {
                        swalError('Error', 'Error in table');
                    }
                    getKycTable();
                }
            });
        }
    });

    $(document).on('click', '.kycActionBtn', async function () {
        var id = $(this).attr('value'); // Get value attribute

        try {
            const response = await $.ajax({
                type: 'POST',
                url: 'api/loan_entry/kyc_creation_data.php',
                data: { id: id },
                dataType: 'json'
            });

            if (response && response.length > 0) {
                $('#kyc_id').val(id);
                $('#proof_of').val(response[0].proof_of);

                if (response[0].proof_of == 1) { // 1 = customer
                    $('.kyc_name_div').show();
                    let cus_name = $("#cus_name").val();
                    $('#kyc_name').val(cus_name);

                    $('.fam_mem_div').hide();
                    $('#fam_mem').val('');
                } else {
                    $('.kyc_name_div').hide();
                    $('#kyc_name').val('');

                    await getFamilyMemberData(); // Wait until family members are loaded
                    $('#fam_mem').val(response[0].fam_mem);

                    $('.fam_mem_div').show();
                }

                if (response[0].proof_of == 1) {
                    $('#kyc_relationship').val('NIL');
                } else {
                    $('#kyc_relationship').val(response[0].fam_relationship);
                }

                $('#proof').val(response[0].proof);
                $('#proof_detail').val(response[0].proof_detail);
                $('#kyc_upload').val(response[0].upload);
            } else {
                alert('No data found for the selected KYC ID.');
            }
        } catch (error) {
            console.error("Error fetching KYC data:", error);
            alert('Something went wrong while fetching KYC data.');
        }
    });


    $('#clear_kyc_form').on('click', function () {
        $('.fam_mem_div').hide();
        $('#fam_mem').val('');
    });

    $('.kycmodal_close').on('click', function () {
        $('.fam_mem_div').hide();
        $('#fam_mem').val('');
    });

    $(document).on('click', '.kycDeleteBtn', function () {
        var id = $(this).attr('value');
        swalConfirm('Delete', 'Do you want to Delete the KYC Details?', getKycDelete, id);
        return;
    });

    $('#proof_of').on('change', function () {
        if ($(this).val() == "2") {
            $('.fam_mem_div').show();
            $('.kyc_name_div').hide();
        } else {
            $('.kyc_name_div').show();
            $('.fam_mem_div').hide();
        }
    });

    //////KyC Proof Modal///////
    $('#submit_proof').click(function () {
        event.preventDefault();
        //Validation
        let addProof_name = $('#addProof_name').val(); let proof_id = $('#proof_id').val();
        var data = ['addProof_name']
        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        if (isValid) {
            $.post('api/loan_entry/submit_proof.php', { addProof_name, proof_id }, function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'Proof Info Added Successfully!');
                } else {
                    swalSuccess('Success', 'Proof Info Updated Successfully!')
                }

                $('#clear_proof_form').trigger('click')
                $('#proof_id').val('')
                $('#add_proof_info_modal').modal('hide');
                getProofTable();
                fetchProofList();
            });
        }
    });

    $(document).on('click', '.proofActionBtn', function () {
        var id = $(this).attr('value'); // Get value attribute
        $.post('api/loan_entry/proof_creation_data.php', { id: id }, function (response) {
            $('#proof_id').val(id);
            $('#addProof_name').val(response[0].addProof_name);
        }, 'json');
    });

    $(document).on('click', '.proofDeleteBtn', function () {
        var id = $(this).attr('value');
        swalConfirm('Delete', 'Do you want to Delete the Proof Details?', getProofDelete, id);
        return;
    });
    //////Customer FeedBack Modal/////
    $('#submit_feedback').click(function () {
        event.preventDefault();
        //Validation
        let cus_profile_id = $('#customer_profile_id').val();
        let cus_id = $('#auto_gen_cus_id').val();
        let feedback_label = $('#feedback_label').val(); let feedback = $('#feedback').val(); let cus_remark = $('#cus_remark').val(); let add_feedBack = $('#add_feedBack').val();
        if (cus_profile_id == '') {
            swalError('Warning', 'Kindly Fill the Personal Info');
            return false;
        }
        var data = ['feedback_label', 'feedback']
        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        if (isValid) {
            $.post('api/loan_entry/submit_feedback.php', { cus_id, feedback_label, feedback, cus_remark, add_feedBack, cus_profile_id }, function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'FeedBack Info Added Successfully!');
                } else if (response == '2') {
                    swalSuccess('Success', 'FeedBack Info Updated Successfully!')
                } else {
                    swalError('Error', 'Error Occurred!')
                }
                getFeedBackTable();
            });
        }
    })

    $(document).on('click', '.feedbackActionBtn', function () {
        var id = $(this).attr('value'); // Get value attribute
        $.post('api/loan_entry/feedback_creation_data.php', { id: id }, function (response) {
            $('#add_feedBack').val(id);
            $('#feedback_label').val(response[0].feedback_label);
            $('#feedback').val(response[0].feedback);
            $('#cus_remark').val(response[0].cus_remark);
        }, 'json');
    });

    $(document).on('click', '.feedbackDeleteBtn', function () {
        var id = $(this).attr('value');
        swalConfirm('Delete', 'Do you want to Delete the FeedBack Details?', getFeedBackDelete, id);
        return;
    });


    $('#mobile1, #mobile2, #whatsapp_no, #fam_mobile').change(function () {
        checkMobileNo($(this).val(), $(this).attr('id'));
    });

    $('#area').change(function () {
        var areaId = $(this).val();
        if (areaId) {
            getAlineName(areaId);
        }
    });

    $('#dob').on('change', function () {
        var dob = new Date($(this).val());
        var today = new Date();
        var age = today.getFullYear() - dob.getFullYear();
        var m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        $('#age').val(age);
    });
    $('input[name="mobile_whatsapp"]').on('change', function () {
        let selectedValue = $(this).val();
        let mobileNumber;

        if (selectedValue === 'mobile1') {
            mobileNumber = $('#mobile1').val();
        } else if (selectedValue === 'mobile2') {
            mobileNumber = $('#mobile2').val();
        }

        $('#whatsapp_no').val(mobileNumber);
    });
    $('#guarantor_name').change(function () {
        var guarantorId = $(this).val();
        if (guarantorId) {
            getGrelationshipName(guarantorId);
        } else {
            $('#relationship').val('');
        }
    })

    $('#submit_customer_profile').click(function (event) {
        event.preventDefault();
        // Validate form fields
        let famInfoRowCount = $('#fam_info_table').DataTable().rows().count();
        let kycInfoRowCount = $('#kyc_info').DataTable().rows().count();
        let pic = $('#pic')[0].files[0];
        let per_pic = $('#per_pic').val();
        let gu_pic = $('#gu_pic')[0].files[0];
        let gur_pic = $('#gur_pic').val();
        let cus_id = $('#auto_gen_cus_id').val();
        let aadhar_num = $('#aadhar_nums').val().replace(/\s/g, '');
        let cus_name = $("#cus_name").val();
        let gender = $('#gender').val();
        let dob = $('#dob').val();
        let age = $('#age').val();
        let mobile1 = $('#mobile1').val();
        let mobile2 = $('#mobile2').val();
        let whatsapp_no = $('#whatsapp_no').val();
        let guarantor_name = $('#guarantor_name').val();
        let cus_data = $('#cus_data').val();
        let cus_status = $('#cus_status').val();
        let res_type = $('#res_type').val();
        let res_detail = $('#res_detail').val();
        let res_address = $('#res_address').val();
        let native_address = $('#native_address').val();
        let occupation = $('#occupation').val();
        let occ_detail = $('#occ_detail').val();
        let occ_income = $('#occ_income').val();
        let occ_address = $('#occ_address').val();
        let area_confirm = $('#area_confirm').val();
        let area = $('#area').val();
        let line = $('#line').attr('data-id');
        let cus_limit = $('#cus_limit').val().replace(/,/g, '');
        let about_cus = $('#about_cus').val();
        let how_to_know = $('#how_to_know').val();
        let loan_count = $('#loan_count').val();
        let first_loan_date = $('#first_loan_date').val();
        let travel_with_company = $('#travel_with_company').val();
        let monthly_income = $('#monthly_income').val();
        let other_income = $('#other_income').val();
        let support_income = $('#support_income').val();
        let commitment = $('#commitment').val();
        let monthly_due_capacity = $('#monthly_due_capacity').val();
        let customer_profile_id = $('#customer_profile_id').val();
        if (customer_profile_id === '') {
            swalError('Warning', 'Please Fill out personal Info!');
            return false;
        }
        let isValid = true;
        // Validate fields based on area_confirm value
        if (area_confirm == '1') {
            let validationResults = [
                validateField(res_type, 'res_type'),
                validateField(res_detail, 'res_detail'),
                validateField(res_address, 'res_address'),
                validateField(native_address, 'native_address')
            ];
            if (!validationResults.every(result => result)) {
                isValid = false;
            }
        } else if (area_confirm == '2') {
            let validationResults = [
                validateField(occupation, 'occupation'),
                validateField(occ_detail, 'occ_detail'),
                validateField(occ_income, 'occ_income'),
                validateField(occ_address, 'occ_address')
            ];
            if (!validationResults.every(result => result)) {
                isValid = false;
            }
        }
        data = ['cus_name', 'gender', 'mobile1', 'guarantor_name', 'area_confirm', 'area', 'line', 'how_to_know', 'monthly_income', 'other_income', 'support_income', 'commitment', 'monthly_due_capacity'];

        //  var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });

        if (isValid) {
            if (famInfoRowCount === 0 || kycInfoRowCount === 0) {
                swalError('Warning', 'Please Fill out Family Info and KYC Info!');
                return false;
            }
            // Prepare form data using FormData object
            let entryDetail = new FormData();
            entryDetail.append('cus_id', cus_id);
            entryDetail.append('cus_name', cus_name);
            entryDetail.append('gender', gender);
            entryDetail.append('dob', dob);
            entryDetail.append('age', age);
            entryDetail.append('mobile1', mobile1);
            entryDetail.append('mobile2', mobile2);
            entryDetail.append('whatsapp_no', whatsapp_no);
            entryDetail.append('aadhar_num', aadhar_num);
            entryDetail.append('pic', pic);
            entryDetail.append('per_pic', per_pic);
            entryDetail.append('guarantor_name', guarantor_name);
            entryDetail.append('gu_pic', gu_pic);
            entryDetail.append('gur_pic', gur_pic);
            entryDetail.append('cus_data', cus_data);
            entryDetail.append('cus_status', cus_status);
            entryDetail.append('res_type', res_type);
            entryDetail.append('res_detail', res_detail);
            entryDetail.append('res_address', res_address);
            entryDetail.append('native_address', native_address);
            entryDetail.append('occupation', occupation);
            entryDetail.append('occ_detail', occ_detail);
            entryDetail.append('occ_income', occ_income);
            entryDetail.append('occ_address', occ_address);
            entryDetail.append('area_confirm', area_confirm);
            entryDetail.append('area', area);
            entryDetail.append('line', line);
            entryDetail.append('cus_limit', cus_limit);
            entryDetail.append('about_cus', about_cus);
            entryDetail.append('how_to_know', how_to_know);
            entryDetail.append('first_loan_date', first_loan_date);
            entryDetail.append('loan_count', loan_count);
            entryDetail.append('travel_with_company', travel_with_company);
            entryDetail.append('monthly_income', monthly_income);
            entryDetail.append('other_income', other_income);
            entryDetail.append('commitment', commitment);
            entryDetail.append('support_income', support_income);
            entryDetail.append('monthly_due_capacity', monthly_due_capacity);
            entryDetail.append('customer_profile_id', customer_profile_id)

            // AJAX call to submit data
            $.ajax({
                url: 'api/loan_entry/submit_cus_profile.php',
                type: 'POST',
                data: entryDetail,
                contentType: false,
                processData: false,
                cache: false,
                dataType: 'json',
                success: function (response) {
                    // Handle success response
                    if (response.status == 0) {
                        swalSuccess('Success', 'Customer Profile Updated Successfully!');
                        $('#documentation').trigger('click')
                        $('html, body').animate({
                            scrollTop: $('.page-content').offset().top
                        }, 3000);
                    }
                    $('#customer_profile_id').val(response.last_id);
                    $('#cus_profile_id').val(response.last_id);
                },
                error: function () {
                    swalError('Error', 'Error occurred while processing your request.');
                }
            });

        }
    });
    $('#area_confirm').on('change', function () {
        resetValidate();
    });
    $('#submit_personal_info').click(function (event) {
        event.preventDefault();
        // Validate form fields
        let pic = $('#pic')[0].files[0];
        let per_pic = $('#per_pic').val();
        let cus_id = $('#auto_gen_cus_id').val();
        let aadhar_num = $('#aadhar_nums').val().replace(/\s/g, '');
        let cus_name = $("#cus_name").val();
        let gender = $('#gender').val();
        let dob = $('#dob').val();
        let age = $('#age').val();
        let mobile1 = $('#mobile1').val();
        let mobile2 = $('#mobile2').val();
        let whatsapp_no = $('#whatsapp_no').val();
        let customer_profile_id = $('#customer_profile_id').val();

        var data = ['aadhar_nums', 'cus_name', 'gender', 'mobile1', 'auto_gen_cus_id']
        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        if (pic === undefined && per_pic === '') {
            let isUploadValid = validateField('', 'pic');
            let isHiddenValid = validateField('', 'per_pic');
            if (!isUploadValid || !isHiddenValid) {
                isValid = false;
            }
            else {
                $('#pic').css('border', '1px solid #cecece');
                $('#per_pic').css('border', '1px solid #cecece');
            }
        }
        else {
            $('#pic').css('border', '1px solid #cecece');
            $('#per_pic').css('border', '1px solid #cecece');
        }

        if (isValid) {
            let personalDetail = new FormData();
            personalDetail.append('cus_id', cus_id);
            personalDetail.append('aadhar_num', aadhar_num);
            personalDetail.append('cus_name', cus_name);
            personalDetail.append('gender', gender);
            personalDetail.append('dob', dob);
            personalDetail.append('age', age);
            personalDetail.append('mobile1', mobile1);
            personalDetail.append('mobile2', mobile2);
            personalDetail.append('whatsapp_no', whatsapp_no);
            personalDetail.append('pic', pic);
            personalDetail.append('per_pic', per_pic);
            personalDetail.append('customer_profile_id', customer_profile_id)
            $.ajax({
                url: 'api/loan_entry/submit_personal_info.php',
                type: 'POST',
                data: personalDetail,
                contentType: false,
                processData: false,
                cache: false,
                dataType: 'json',
                success: function (response) {
                    // Handle success response
                    if (response.result == 0) {
                        swalSuccess('Success', 'Personal Info Updated Successfully!');
                        $('.customer_content').show();
                    } else if (response.result == 1) {
                        swalSuccess('Success', 'Personal Info Added Successfully!');
                        $('.customer_content').show();
                    } else {

                    }
                    $('#customer_profile_id').val(response.last_id);
                    $('#per_pic').val(response.pic);
                    $('#cus_data').val(response.cus_data);
                    if (response.cus_data == 'Existing') {
                        $('.cus_status_div').show();
                        $('.loan_count_div').show();
                        getLoanCount(cus_id);
                    }
                    else {
                        $('.loan_count_div').hide();
                    }
                    $('#cus_status').val(response.cus_status);
                    $('.personal_info_disble').attr("disabled", true);
                    $('#submit_personal_info').attr("disabled", true);
                    getFamilyInfoTable()
                    fingerprintTable();
                    getPropertyInfoTable();
                    getBankInfoTable()
                    getKycInfoTable()
                    getAreaName()
                },
            });

        }
    })


    $('#name_check, #aadhar_check, #mobile_check').on('input', function () {
        var name = $('#name_check').val().trim();
        var aadhar = $('#aadhar_check').val().trim();
        var mobile = $('#mobile_check').val().trim();
        let cus_profile_id = $('#customer_profile_id').val();

        // Check which field triggered the event
        if ($(this).attr('id') === 'name_check') {
            // Clear aadhar_check and mobile_check if searching by name
            $('#aadhar_check').val('');
            $('#mobile_check').val('');
            aadhar = ''; // Reset aadhar variable
            mobile = ''; // Reset mobile variable
        } else if ($(this).attr('id') === 'aadhar_check') {
            // Clear aadhar_check and mobile_check if searching by name
            $('#name_check').val('');
            $('#mobile_check').val('');
            name = ''; // Reset aadhar variable
            mobile = ''; //{
        } else if ($(this).attr('id') === 'mobile_check') {
            // Clear aadhar_check and mobile_check if searching by name
            $('#aadhar_check').val('');
            $('#name_check').val('');
            name = ''; // Reset aadhar variable
            aadhar = ''; //{
        }

        // Fetch data for both customer and family tables
        $('#data_checking_table_div').show();
        fetchCustomerData(name, aadhar, mobile, cus_profile_id);
    });

    $('#clear_loan').click(function () {
        event.preventDefault();
        clearCusProfileForm('2');
    });

    $('#proof_modal_btn').click(function () {
        if ($('#add_kyc_info_modal').is(':visible')) {
            $('#add_kyc_info_modal').hide();
        }
    });

    $('.kyc_proof_close').click(function () {
        if ($('#add_kyc_info_modal').is(':hidden')) {
            $('#add_kyc_info_modal').show();
        }
    });
    $('#loan_amount_calc').on('keypress', function (event) {
        var charCode = event.which || event.keyCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    });

}); ///////////////////////////////////////////////////////////////// Customer Profile - Document END ////////////////////////////////////////////////////////////////////

//On Load function 
$(function () {
    getLoanEntryTable();
});

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

function getLoanEntryTable() {
    serverSideTable('#loan_entry_table', '', 'api/loan_entry/loan_entry_list.php');
    // setDropdownScripts();   
}
function moveToNext(cus_sts_id) {
    let cus_sts = 3;
    $.post('api/common_files/move_to_next.php', { cus_sts_id, cus_sts }, function (response) {
        if (response == '0') {
            swalSuccess('Success', 'Moved to Approval');
            getLoanEntryTable();
        } else {
            swalError('Alert', 'Failed to Move to Approval');
        }
    }, 'json');
}
function swapTableAndCreation() {
    if ($('.loan_table_content').is(':visible')) {
        $('.loan_table_content').hide();
        $('#add_loan').hide();
        $('#loan_entry_content').show();
        $('#back_btn').show();

    } else {
        $('.loan_table_content').show();
        $('#add_loan').show();
        $('#loan_entry_content').hide();
        $('#back_btn').hide();
        $('#customer_profile').trigger('click')
    }
}

function clearCusProfileForm(type) {
    // Clear input fields except those with IDs 'loan_id_calc' and 'loan_date_calc'
    $('#loan_entry_customer_profile').find('input').each(function () {
        let id = $(this).attr('id');
        if (type == '1') {
            cusid = '';
            $('.personal_info_disble').val('');
            $('#submit_personal_info').attr('disabled', false);
        } else if (type == '2') {
            cusid = 'customer_profile_id';
        }
        $('#loan_entry_customer_profile input').css('border', '1px solid #cecece');
        $('#loan_entry_customer_profile select').css('border', '1px solid #cecece');
        $('#loan_entry_customer_profile').find('input[type="radio"]').prop('checked', false);
        if (id !== cusid && id != 'cus_id' && id != 'cus_name' && id != 'dob' && id != 'mobile1' && id != 'mobile2' && id != 'whatsapp_no' && id != 'pic' && id != 'age' && id != 'per_pic') {
            $(this).val('');
        }

    });
    $('#loan_entry_customer_profile').find('input[type="radio"]').prop('checked', false);

    // Clear all textarea fields within the specific form
    $('#loan_entry_customer_profile').find('textarea').val('');

    //clear all upload inputs within the form.
    $('#loan_entry_customer_profile').find('input[type="file"]').val('');

    // Reset all select fields within the specific form
    $('#loan_entry_customer_profile').find('select').each(function () {
        let selectid = $(this).attr('id');
        if (selectid != 'gender') {
            $(this).val($(this).find('option:first').val());
        }
    });

    //Reset all  images within the form
    $('#imgshow').attr('src', 'img/avatar.png');
    $('#gur_imgshow').attr('src', 'img/avatar.png');
}

function fetchCustomerData(name, aadhar_num, mobile, cus_profile_id) {
    $.post('api/loan_entry/search_customer.php', { name, aadhar_num, mobile, cus_profile_id }, function (response) {
        // Process customer data
        var customerMapping = ['index', 'cus_id', 'cus_name', 'mobiles'];
        var customerData = response.customers.map(function (customer, index) {
            let mobiles = customer.mobile1;
            if (customer.mobile2) {
                mobiles += `, ${customer.mobile2}`;
            }
            return {
                index: index + 1,
                cus_id: customer.cus_id,
                cus_name: customer.cus_name,
                mobiles: mobiles
            };
        });
        appendDataToTable('#cus_info', customerData, customerMapping);

        // Process family data
        var familyMapping = ['index', 'aadhar_num', 'fam_name', 'fam_relationship', 'under_customer_name', 'under_customer_id'];
        var familyData = response.family.map(function (member, index) {
            return {
                index: index + 1,
                aadhar_num: member.fam_aadhar,
                fam_name: member.fam_name,
                fam_relationship: member.fam_relationship,
                under_customer_name: member.under_customer_name,
                under_customer_id: member.under_customer_id
            };
        });
        appendDataToTable('#family_info', familyData, familyMapping);

    }, 'json');
}

function addCustomerMobile(mobile) {
    $('#mobile_check .custom-option').remove();
    if (mobile != '') {
        $('#mobile_check').append('<option class="custom-option" value="' + mobile + '">' + mobile + '</option>');
    }
}

function removeCustomerMobile() {
    $('#mobile_check .custom-option').remove();
}

function updateCustomerID(id) {
    $('#aadhar_check .custom-option').remove();
    if (id != '') {
        $('#aadhar_check').append('<option class="custom-option" value="' + id + '">' + id + '</option>');
    }
}

function removeCustomerID() {
    $('#aadhar_check .custom-option').remove();
}

function updateCustomerName(name) {
    // Remove any existing custom options (if already added)
    $('#name_check .custom-option').remove();

    // Remove any previously selected cus_name option to avoid duplicates
    $('#name_check option').filter(function () {
        return $(this).val() === name;
    }).remove();

    // Append the new name as an option with a custom class
    if (name !== '') {
        $('#name_check').append('<option class="custom-option" value="' + name + '">' + name + '</option>');
    }
}


function removeCustomerName() {
    $('#name_check .custom-option').remove();
}

function addPropertyHolder(aadhar_num, name) {
    $('#property_holder .custom-option').remove();
    $('#property_holder').append('<option class="custom-option" value="' + aadhar_num + '">' + name + '</option>');
}

function removeCustomerEntries() {
    $('#property_holder .custom-option').remove();
}

function getFamilyInfoTable() {
    let cus_id = $('#auto_gen_cus_id').val();
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

function getFamilyTable() {
    let cus_id = $('#auto_gen_cus_id').val();
    let aadhar_num = $('#aadhar_nums').val().trim().replace(/\s/g, '');
    let cus_name = $('#cus_name').val();
    let customerMobile = $('#mobile1').val();
    $.post('api/loan_entry/family_creation_list.php', { cus_id: cus_id }, function (response) {
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
            'action'
        ];
        appendDataToTable('#family_creation_table', response, columnMapping);
        setdtable('#family_creation_table');
        $('#family_form input').val('');
        $('#family_form input').css('border', '1px solid #cecece');
        $('#family_form select').css('border', '1px solid #cecece');
        $('#fam_relationship').val('');
        $('#remarks').val('');
        $('#fam_live').val('');
        dataCheckList(cus_id, cus_name, customerMobile, aadhar_num)
    }, 'json')
}

function getFamilyDelete(id) {
    let cus_id = $('#auto_gen_cus_id').val();
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_entry/delete_family_creation.php', { id, cus_id, cus_profile_id }, function (response) {
        if (response == '0') {
            swalError('Warning', 'Have to maintain atleast one Family Info');
        } else if (response == '1') {
            swalSuccess('Success', 'Family Info Deleted Successfully!');
            getFamilyTable();
        } else if (response == '2') {
            swalError('Access Denied', 'Family Member Already Used');
        } else {
            swalError('Warning', 'Error occur While Delete Family Info.');
        }
    }, 'json');
}

function getGuarantorName() {
    let cus_id = $('#auto_gen_cus_id').val();

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

function getPropertyTable() {
    let cus_id = $('#auto_gen_cus_id').val();
    let cus_profile_id = $('#customer_profile_id').val()
    $.post('api/loan_entry/property_creation_list.php', { cus_id, cus_profile_id }, function (response) {
        var columnMapping = [
            'sno',
            'property',
            'property_detail',
            'property_holder',
            'fam_relationship',
            'action'
        ];
        appendDataToTable('#property_creation_table', response, columnMapping);
        setdtable('#property_creation_table');
        $('#property_form input').val('');
        $('#property_form input').css('border', '1px solid #cecece');
        $('#property_form select').css('border', '1px solid #cecece');
        $('textarea').css('border', '1px solid #cecece');
        $('#property_holder').val('');
        $('#property_detail').val('');
    }, 'json')
}
function getPropertyInfoTable() {
    let cus_id = $('#auto_gen_cus_id').val();
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

function getPropertyHolder() {
    let cus_id = $('#auto_gen_cus_id').val();
    let cus_name = $('#cus_name').val();
    $.post('api/loan_entry/get_guarantor_name.php', { cus_id }, function (response) {
        let appendHolderOption = '';
        appendHolderOption += "<option value=''>Select Property Holder</option>";
        appendHolderOption += "<option value='" + 0 + "'>" + cus_name + "</option>";
        $.each(response, function (index, val) {
            appendHolderOption += "<option value='" + val.id + "'>" + val.fam_name + "</option>";
        });
        $('#property_holder').empty().append(appendHolderOption);
    }, 'json');
}

function getPropertyDelete(id) {
    $.post('api/loan_entry/delete_property_creation.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('Success', 'Property Info Deleted Successfully!');
            getPropertyTable();
        } else {
            swalError('Error', 'Failed to Delete Property: ' + response);
        }
    }, 'json');
}

function getRelationshipName(propertyHolderId) {
    $.ajax({
        url: 'api/loan_entry/getRelationshipName.php',
        type: 'POST',
        data: { property_holder_id: propertyHolderId },
        dataType: 'json',
        cache: false,
        success: function (response) {
            $('#prop_relationship').val(response.prop_relationship);
        },
    });
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

function getFeedBackDelete(id) {
    $.post('api/loan_entry/delete_feedback.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('Success', 'FeedBack Info Deleted Successfully!');
            getFeedBackTable();
        } else {
            swalError('Error', 'Failed to Delete FeedBack: ' + response);
        }
    }, 'json');
}

function getBankTable() {
    let cus_id = $('#auto_gen_cus_id').val();
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
    let cus_id = $('#auto_gen_cus_id').val();
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
function getFeedBackTable() {
    let cus_id = $('#auto_gen_cus_id').val();
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_entry/feedback_list.php', { cus_id, cus_profile_id }, function (response) {
        var columnMapping = [
            'sno',
            'feedback_label',
            'feedback_text',
            'cus_remark',
            'action'
        ];
        appendDataToTable('#feedback_table', response, columnMapping);
        setdtable('#feedback_table');
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

function getFeedBackInfoTable() {
    let cus_id = $('#auto_gen_cus_id').val();
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

function getKycDelete(id) {
    let cus_id = $('#auto_gen_cus_id').val();
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_entry/delete_kyc_creation.php', { id, cus_id, cus_profile_id }, function (response) {
        if (response == '0') {
            swalError('Warning', 'Have to maintain atleast one Kyc Info');
        } else if (response == '1') {
            swalSuccess('Success', 'Kyc Info Deleted Successfully!');
            getKycTable();
        } else {
            swalError('Error', 'Failed to Delete Kyc');
        }
    }, 'json');
}

function getKycTable() {
    let cus_id = $('#auto_gen_cus_id').val();
    let cus_profile_id = $('#customer_profile_id').val()
    $.post('api/loan_entry/kyc_creation_list.php', { cus_id, cus_profile_id }, function (response) {
        var columnMapping = [
            'sno',
            'proof_of',
            'fam_relationship',
            'proof',
            'proof_detail',
            'upload',
            'action'
        ];
        appendDataToTable('#kyc_creation_table', response, columnMapping);
        setdtable('#kyc_creation_table');
        $('#kyc_form input').val('');
        $('#kyc_form input').css('border', '1px solid #cecece');
        $('#kyc_form select').css('border', '1px solid #cecece');
        $('#Kyc_form.kyc_name_div').hide();
        $('#Kyc_form.fam_mem_div').hide();
        $('#kyc_form select').each(function () {
            $(this).val($(this).find('option:first').val());
        });
    }, 'json')
}

function getKycInfoTable() {
    let cus_id = $('#auto_gen_cus_id').val();
    let cus_profile_id = $('#customer_profile_id').val();
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
function getFamilyMemberData() {
    return new Promise((resolve, reject) => {
        let cus_id = $('#auto_gen_cus_id').val();
        $.post(
            'api/loan_entry/get_guarantor_name.php',
            { cus_id },
            function (response) {
                let appendHolderOption = "<option value=''>Select Family Member</option>";
                $.each(response, function (index, val) {
                    appendHolderOption += "<option value='" + val.id + "'>" + val.fam_name + "</option>";
                });
                $('#fam_mem').empty().append(appendHolderOption);
                resolve(); // Notify that the task is complete
            },
            'json'
        ).fail(reject); // Handle error scenario
    });
}

function getKycRelationshipName(familyMemberId) {
    $.ajax({
        url: 'api/loan_entry/getKycRelationshipName.php',
        type: 'POST',
        data: { family_member_id: familyMemberId },
        dataType: 'json',
        cache: false,
        success: function (response) {
            $('#kyc_relationship').val(response.kyc_relationship);
        },
    });
}

function getProofDelete(id) {
    $.post('api/loan_entry/delete_proof_creation.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('Success', 'proof Info Deleted Successfully!');
            getProofTable();
        } else if (response == '0') {
            swalError('Access Denied', 'proof Info Already Used');
        } else {
            swalError('Warning', 'Error occur While Delete Proof Info.');
        }
    }, 'json')
}

function getProofTable() {
    $.post('api/loan_entry/proof_creation_list.php', function (response) {
        var columnMapping = [
            'sno',
            'addProof_name',
            'action'
        ];
        appendDataToTable('#proof_creation_table', response, columnMapping);
        setdtable('#proof_creation_table');
    }, 'json')
}

function fetchProofList() {
    $.ajax({
        url: 'api/loan_entry/get_proof_list.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            $('#proof').empty().append('<option value="">Select proof</option>');
            $.each(response, function (index, proof) {
                $('#proof').append('<option value="' + proof.id + '">' + proof.addProof_name + '</option>');
            });
            $('#proof_form input').val('');
            $('#proof_form input').css('border', '1px solid #cecece');

        }
    });
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

function dataCheckList(cus_id, cus_name, cus_mble_no, aadhar_num) {
    $.post('api/loan_entry/datacheck_name.php', { cus_id }, function (response) {
        //Name
        $('#name_check').empty();
        $('#name_check').append("<option value=''>Select Name</option>");
        (cus_name != '') ? $('#name_check').append('<option value="' + cus_name + '">' + cus_name + '</option>') : '';
        $.each(response, function (index, val) {
            $('#name_check').append("<option value='" + val.fam_name + "'>" + val.fam_name + "</option>");
        });

        //Adhar no
        $('#aadhar_check').empty();
        $('#aadhar_check').append("<option value=''>Select Aadhar Number</option>");

        // Append the provided Aadhar number with the customer name if both are present
        if (aadhar_num && cus_name) {
            $('#aadhar_check').append('<option value="' + aadhar_num + '">' + aadhar_num + ' - ' + cus_name + '</option>');
        }

        // Loop through the response and append Aadhar numbers with family names
        $.each(response, function (index, val) {
            if (val.fam_aadhar && val.fam_name) {
                $('#aadhar_check').append('<option value="' + val.fam_aadhar + '">' + val.fam_aadhar + ' - ' + val.fam_name + '</option>');
            }
        });


        //Mobile no 
        $('#mobile_check').empty();
        $('#mobile_check').append("<option value=''>Select Mobile Number</option>");

        // Append the provided customer mobile number and name if they are present
        if (cus_mble_no && cus_name) {
            $('#mobile_check').append('<option value="' + cus_mble_no + '">' + cus_mble_no + ' - ' + cus_name + '</option>');
        }

        // Loop through the response and append mobile numbers with family names
        $.each(response, function (index, val) {
            if (val.fam_mobile && val.fam_name) {
                $('#mobile_check').append('<option value="' + val.fam_mobile + '">' + val.fam_mobile + ' - ' + val.fam_name + '</option>');
            }
        });


    }, 'json');
}

function checkAdditionalRenewal(cus_id) {
    $.post('api/loan_entry/check_additional_renewal.php', { cus_id }, function (response) {
        $('#cus_status').val(response);
    }, 'json');
}
function cusDeleteStatus(cus_id) {
    let cus_profile_id = $('#customer_profile_id').val();
    // Proceed with deletion
    $.post('api/loan_entry/cus_sts_delete.php', { 'cus_id': cus_id, 'cus_profile_id': cus_profile_id }, function (deleteResponse) {
        if (deleteResponse.success) {
            swalSuccess('Success', 'Personal Info Deleted Successfully.');
            clearCusProfileForm('1');
            swapTableAndCreation()
        } else {
            swalError('Error', 'Failed to delete personal info.');
        }
    }, 'json');
}

function fingerprintTable() {
    var cus_name = $('#cus_name').val();
    var cus_id = $('#auto_gen_cus_id').val();
    $.ajax({
        url: 'api/loan_entry/getNamesForFingerprint.php',
        data: { 'cus_name': cus_name, 'cus_id': cus_id },
        type: 'post',
        cache: false,
        success: function (html) {
            $('.fingerprintTable').empty()
            $('.fingerprintTable').html(html)

            $('.scanBtn').click(function () {
                var hand = $(this).prev().val();
                var name = $(this).parent().prev().find('input[id="name_print"]').val(); var adhar = $(this).parent().prev().prev().find('input[id="adhar_print"]').val();
                if (hand == '') { //prevent if hand is not selected
                    $(this).prev().css('border-color', 'red');
                } else {
                    $(this).prev().css('border-color', '#009688')

                    showOverlay();//loader start

                    $(this).attr('disabled', true);

                    setTimeout(() => {
                        var quality = 60; //(1 to 100) (recommended minimum 55)
                        var timeout = 10; // seconds (minimum=10(recommended), maximum=60, unlimited=0)
                        var res = CaptureFinger(quality, timeout);
                        if (res.httpStaus) {
                            if (res.data.ErrorCode == "0") {
                                let fdata = res.data.AnsiTemplate;
                                $(this).next().val(fdata); // Take ansi template that is the unique id which is passed by sensor
                                storeFingerprints(fdata, hand, adhar, name);//stores the current finger data in database
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
                        // Hide the loading animation and remove blur effect from the body
                        hideOverlay();//loader stop

                    }, 700)
                }
            })
        }
    })

    function storeFingerprints(fdata, hand, cus_id, cus_name) {//stores the current finger data in database
        $.post('api/loan_entry/storeFingerprints.php', { 'fdata': fdata, 'hand': hand, 'cus_id': cus_id, 'cus_name': cus_name }, function (response) {
            if (response.includes('Successfully')) {
                Swal.fire({
                    title: response, icon: 'success', confirmButtonColor: '#009688'
                })
            }
        }, 'json')
    }
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
        $('#auto_gen_cus_id').val(data.cus_id);
        $('#aadhar_nums, #aadhar_num').val(data.aadhar_num);
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
        $('#occ_income').val(data.occ_income);
        $('#area_confirm').val(data.area_confirm);
        $('#line').val(data.line);
        $('#cus_limit').val(data.cus_limit);
        $('#about_cus').val(data.about_cus);
        $('#how_to_know').val(data.how_to_know);
        $('#monthly_income').val(data.monthly_income);
        $('#other_income').val(data.other_income);
        $('#support_income').val(data.support_income);
        $('#commitment').val(data.commitment);
        $('#monthly_due_capacity').val(data.monthly_due_capacity);

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
        fingerprintTable();
        getPropertyInfoTable();
        getBankInfoTable();
        getKycInfoTable();
        getFeedBackInfoTable();

        $('#area').trigger('change');
        $('#guarantor_name').trigger('change');

        // Show/hide based on customer data
        if (data.cus_data === 'Existing') {
            $('.cus_status_div').show();
            checkAdditionalRenewal(data.cus_id);
            $('.loan_count_div').show();
            let cus_id = $('#auto_gen_cus_id').val();
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

async function existingCustmerProfile(aadhar_num) {
    try {
        const response = await $.post('api/loan_entry/customer_profile_existing.php', { aadhar_num }, null,
            "json"
        );
        $('#customer_profile_id').val('');
        if (response == 'New') {
            $('#area_edit').val('');
            $('#cus_name').val('');
            $('#gender').val('');
            $('#dob').val('');
            $('#age').val('');
            $('#mobile2').val('');
            $('#whatsapp_no').val('');
            $('#mobile1').val('');
            $('#guarantor_name_edit').val('');
            $('#relationship').val('');
            $('#cus_data').val('New');
            $('#cus_status').val('');
            $('#res_type').val('');
            $('#res_detail').val('');
            $('#res_address').val('');
            $('#native_address').val('');
            $('#occupation').val('');
            $('#occ_address').val('');
            $('#occ_detail').val('');
            $('#occ_income').val('');
            $('#area_confirm').val('');
            $('#line').val('');
            $('#cus_limit').val('');
            $('#about_cus').val('');
            $('#loan_entry_customer_profile').find('input[type="radio"]').prop('checked', false);
            $('.cus_status_div').hide();
            $('#data_checking_table_div').hide();
            $('#per_pic').val('');
            var img = $('#imgshow');
            img.attr('src', 'img/avatar.png');

            $('#gur_pic').val('');
            var img = $('#gur_imgshow');
            img.attr('src', 'img/avatar.png');
        } else {
            $('#auto_gen_cus_id').val(response[0].cus_id);
            $('#area_edit').val(response[0].area);
            $('#aadhar_nums').val(response[0].aadhar_num);
            $('#cus_name').val(response[0].cus_name);
            $('#gender').val(response[0].gender);
            $('#dob').val(response[0].dob);
            $('#age').val(response[0].age);
            $('#mobile2').val(response[0].mobile2);
            $('#whatsapp_no').val(response[0].whatsapp_no);
            $('#mobile1').val(response[0].mobile1);
            $('#guarantor_name_edit').val(response[0].guarantor_name);
            $('#cus_data').val('Existing');
            $('#cus_status').val(response[0].cus_status);
            $('#res_type').val(response[0].res_type);
            $('#res_detail').val(response[0].res_detail);
            $('#res_address').val(response[0].res_address);
            $('#native_address').val(response[0].native_address);
            $('#occupation').val(response[0].occupation);
            $('#occ_address').val(response[0].occ_address);
            $('#occ_detail').val(response[0].occ_detail);
            $('#occ_income').val(response[0].occ_income);
            $('#area_confirm').val(response[0].area_confirm);
            $('#line').val(response[0].line);
            $('#cus_limit').val(response[0].cus_limit);
            $('#about_cus').val(response[0].about_cus);
            $('#how_to_know').val(response[0].how_to_know);
            $('#monthly_income').val(response[0].monthly_income);
            $('#other_income').val(response[0].other_income);
            $('#support_income').val(response[0].support_income);
            $('#commitment').val(response[0].commitment);
            $('#monthly_due_capacity').val(response[0].monthly_due_capacity);
            if (response[0].whatsapp_no === response[0].mobile1) {
                $('#mobile1_radio').prop('checked', true);
                $('#selected_mobile_radio').val('mobile1');
            } else if (response[0].whatsapp_no === response[0].mobile2) {
                $('#mobile2_radio').prop('checked', true);
                $('#selected_mobile_radio').val('mobile2');
            }
            // autoGenCusId(response[0].cus_id);
            dataCheckList(response[0].cus_id, response[0].cus_name, response[0].mobile1, response[0].aadhar_num)
            await getGuarantorName();
            await getAreaName();
            getFamilyInfoTable()
            fingerprintTable();
            $('#area').trigger('change');
            $('#guarantor_name').trigger('change');
            getBankInfoTable();
            getPropertyInfoTable();
            $('.cus_status_div').show();
            let path = "uploads/loan_entry/cus_pic/";
            $('#per_pic').val(response[0].pic);
            var img = $('#imgshow');
            img.attr('src', path + response[0].pic);
            let paths = "uploads/loan_entry/gu_pic/";
            $('#gur_pic').val(response[0].gu_pic);
            var img = $('#gur_imgshow');
            img.attr('src', paths + response[0].gu_pic);


        }
    } catch (error) {
        console.error("Error in existingCustmerProfile:", error);
    }
}
function resetValidate() {
    const fieldsToReset = [
        'res_type',
        'res_detail',
        'res_address',
        'native_address',
        'occupation',
        'occ_detail',
        'occ_income',
        'occ_address'
    ];

    fieldsToReset.forEach(fieldId => {
        $('#' + fieldId).css('border', '1px solid #cecece');

    });
}
///////////////////////////////////////////////Customer Profile js End//////////////////////////////

//////////////////////////////////////////////////////////////// Loan Calculation START //////////////////////////////////////////////////////////////////////
$(document).ready(function () {

    $('#loan_category_calc').change(function () {
        if ($(this).val() != '') {
            $('#loan_amount_calc').val('')
            getLoanCatDetails($(this).val(), 1);
            $('#profit_type_calc').val('').trigger('change');
            $('#loan_category_calc2').val($(this).val())
        }
    });

    $('#profit_type_calc').change(function () {
        let profitType = $(this).val();
        //check whether the loan category selected or not. if not alert and return else call function to get loan category details to show in calculation.
        let id = $('#loan_category_calc').val();
        if (id == '') {
            swalError('Alert', 'Kindly select Loan Category');
            $(this).val('');
            return;
        }
        clearCalcSchemeFields(profitType);
        $('#profit_type_calc_scheme').show();
        $('.calc_scheme_title').text((profitType == '0') ? 'Calculation' : 'Scheme');
        if (profitType == '0') {//Loan Calculation
            $('.calc').show();
            $('.scheme').hide();
            $('.scheme_day').hide();
            getLoanCatDetails(id, 1);
            $('#scheme_due_method_calc').val('')
            $('#profit_method_calc').val('After Benefit');
        } else if (profitType == '1') { //Scheme
            $('#scheme_due_method_calc').val('').trigger('change');
            $('.calc').hide();
            $('.scheme').show();
            $('#due_type_calc').val('');
            $('#profit_method_calc').val('');
        } else {
            $('#profit_type_calc_scheme').hide();
        }

        $('#due_startdate_calc').val('');
        $('#maturity_date_calc').val('');
        $('.int-diff').text('*'); $('.due-diff').text('*'); $('.doc-diff').text('*'); $('.proc-diff').text('*'); $('.refresh_loan_calc').val('');
    });

    $('#scheme_due_method_calc').change(function () {
        let schemeDueMethod = $(this).val();
        let loanCatId = $('#loan_category_calc').val();
        dueMethodScheme(schemeDueMethod, loanCatId);
        $('#due_startdate_calc').val('');
        $('#maturity_date_calc').val('');
        $('#profit_method_calc').val('');
    });

    $('#scheme_name_calc').change(function () { //Scheme Name change event
        let scheme_id = $(this).val();
        schemeCalAjax(scheme_id);
        $('#due_startdate_calc').val('');
        $('#maturity_date_calc').val('');
    });
    $('#profit_type_calc').on('change', function () {
        resetValidation();
    });

    $('#refresh_cal').click(function () {
        $('.int-diff').text('*'); $('.due-diff').text('*'); $('.doc-diff').text('*'); $('.proc-diff').text('*'); $('.refresh_loan_calc').val('');
        let loan_amt = $('#loan_amount_calc').val().replace(/,/g, ''); let int_rate = $('#interest_rate_calc').val(); let due_period = $('#due_period_calc').val(); let doc_charge = $('#doc_charge_calc').val(); let proc_fee = $('#processing_fees_calc').val();
        let promet_method = $('#profit_method_calc ').val();

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
        }
        // else {
        //     swalError('Warning', 'Kindly Fill the Calculation fields.')
        // }
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

    $('#referred_calc').change(function () {
        let referred = $('#referred_calc').val();
        if (referred == '0') {
            $('#agent_id_calc').prop('disabled', false).val('');
            $('#agent_name_calc').val('');
            getAgentID();
        } else {

            $('#agent_id_calc').prop('disabled', true).val('');
            $('#agent_name_calc').prop('readonly', true).val('');
        }
    });

    $('#agent_id_calc').change(function () {
        let id = $(this).val();
        $.post('api/agent_creation/agent_creation_data.php', { id }, function (response) {
            if (response.length > 0) {
                $('#agent_name_calc').val(response[0].agent_code);
            } else {
                $('#agent_name_calc').val('');
            }
        }, 'json');
    });

    $('#submit_loan_calculation').click(function (event) {
        event.preventDefault();
        let customerProfileId = $('#customer_profile_id').val();
        if (customerProfileId != '') {
            $('#refresh_cal').trigger('click'); //For calculate once again if user missed to refresh calculation
            let formData = {
                'customer_profile_id': customerProfileId,
                'cus_id': $('#auto_gen_cus_id').val(),
                'aadhar_num': $('#aadhar_nums').val().trim().replace(/\s/g, ''),
                'loan_id_calc': $('#loan_id_calc').val(),
                'loan_category_calc': $('#loan_category_calc').val(),
                'category_info_calc': $('#category_info_calc').val(),
                'loan_amount_calc': $('#loan_amount_calc').val().replace(/,/g, ''),
                'profit_type_calc': $('#profit_type_calc').val(),
                'due_method_calc': $('#due_method_calc').val(),
                'due_type_calc': $('#due_type_calc').val(),
                'profit_method_calc': $('#profit_method_calc').val(),
                'scheme_due_method_calc': $('#scheme_due_method_calc').val(),
                'scheme_day_calc': $('#scheme_day_calc').val(),
                'scheme_name_calc': $('#scheme_name_calc').val(),
                'interest_rate_calc': $('#interest_rate_calc').val(),
                'due_period_calc': $('#due_period_calc').val(),
                'doc_charge_calc': $('#doc_charge_calc').val(),
                'processing_fees_calc': $('#processing_fees_calc').val(),
                'loan_amnt_calc': $('#loan_amnt_calc').val().replace(/,/g, ''),
                'principal_amnt_calc': $('#principal_amnt_calc').val().replace(/,/g, ''),
                'interest_amnt_calc': $('#interest_amnt_calc').val().replace(/,/g, ''),
                'total_amnt_calc': $('#total_amnt_calc').val().replace(/,/g, ''),
                'due_amnt_calc': $('#due_amnt_calc').val().replace(/,/g, ''),
                'doc_charge_calculate': $('#doc_charge_calculate').val().replace(/,/g, ''),
                'processing_fees_calculate': $('#processing_fees_calculate').val().replace(/,/g, ''),
                'net_cash_calc': $('#net_cash_calc').val().replace(/,/g, ''),
                'loan_date_calc': $('#loan_date_calc').val(),
                'due_startdate_calc': $('#due_startdate_calc').val(),
                'maturity_date_calc': $('#maturity_date_calc').val(),
                'referred_calc': $('#referred_calc').val(),
                'agent_id_calc': $('#agent_id_calc').val(),
                'agent_name_calc': $('#agent_name_calc').val(),
                'id': $('#loan_calculation_id').val(),
                'cus_status': '2'
            }
            if (isFormDataValid(formData)) {
                $.post('api/loan_entry/loan_calculation/submit_loan_calculation.php', formData, function (response) {
                    if (response.status == '1') {
                        swalSuccess('Success', 'Loan Calculation Added Successfully!');
                        if ($('.page-content').length) {
                            $('html, body').animate({
                                scrollTop: $('.page-content').offset().top
                            }, 3000);
                        }
                    } else if (response.status == '2') {
                        swalSuccess('Success', 'Loan Calculation Updated Successfully!')
                        if ($('.page-content').length) {
                            $('html, body').animate({
                                scrollTop: $('.page-content').offset().top
                            }, 3000);
                        }
                    } else {
                        swalError('Error', 'Error Occurs!')
                    }

                    $('#loan_calculation_id').val(response.last_id);
                }, 'json');
            }

        } else {
            swalError('Submit Customer Profile', 'Before Loan Calculation')
        }

    });

    $('#clear_loan_calc_form').click(function (event) {
        event.preventDefault();
        clearLoanCalcForm();
    })

}); //Document END.

function callLoanCaculationFunctions() {
    getLoanCategoryName();
    let loan_calc_id = $('#loan_calculation_id').val();
    getAutoGenLoanId(loan_calc_id);
    let loanCalcId = $('#loan_calculation_id').val();
    loanCalculationEdit(loanCalcId);
}


function getAutoGenLoanId(id) {
    $.post('api/loan_entry/loan_calculation/get_autoGen_loan_id.php', { id }, function (response) {
        $('#loan_id_calc').val(response);
    }, 'json');
}
function autoGenCusId(id) {
    $.ajax({
        url: "api/loan_entry/loan_calculation/get_autoGen_cus_id.php",
        type: 'POST',
        data: { id },
        dataType: 'json',
        cache: false,
        success: function (response) {
            $('#auto_gen_cus_id').val(response['cus_id']);
        },
        error: function (xhr, status, error) {

            console.error('AJAX Error:', status, error);
        }
    });
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
        appendAgentIdOption += '<option value="">Select Agent Name</option>';
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

function getLoanCatDetails(id, edittype) {
    $.post('api/loan_entry/loan_calculation/getLoanCatDetails.php', { id }, function (response) {
        $('#due_method_calc').val(response[0].due_method);

        if (response[0].due_type === 'EMI') {
            $('#due_type_calc').val('EMI');
        } else if (response[0].due_type === 'interest') {
            $('#due_type_calc').val('Interest');
        }

        // Retrieve customer and loan limits
        let cus_limit = parseInt($('#cus_limit').val().replace(/,/g, ''));
        let loan_limit = parseInt(response[0].loan_limit);
        let min_loan_limit;


        if (!cus_limit) {
            // If cus_limit is empty or not a valid number, use loan_limit
            min_loan_limit = loan_limit;
        } else if (isNaN(cus_limit) || isNaN(loan_limit)) {
            // If both cus_limit and loan_limit are NaN, set min_loan_limit to 0
            min_loan_limit = 0;
        } else {
            // Use the lesser of cus_limit and loan_limit
            min_loan_limit = (cus_limit < loan_limit) ? cus_limit : loan_limit;
        }
        $('#loan_amount_calc').attr('onChange', `if( parseFloat($(this).val().replace(/,/g, '')) > '` + min_loan_limit + `' ){ alert("Enter Lesser than '${min_loan_limit}'"); $(this).val(""); }`); //To check value between range

        var int_rate_upd = ($('#int_rate_upd').val()) ? $('#int_rate_upd').val() : '';
        var due_period_upd = ($('#due_period_upd').val()) ? $('#due_period_upd').val() : '';
        var doc_charge_upd = ($('#doc_charge_upd').val()) ? $('#doc_charge_upd').val() : '';
        var proc_fee_upd = ($('#proc_fees_upd').val()) ? $('#proc_fees_upd').val() : '';
        //To set min and maximum 
        $('.min-max-int').text('* (' + response[0].interest_rate_min + '% - ' + response[0].interest_rate_max + '%) ');
        $('#interest_rate_calc').attr('onChange', `if( parseFloat($(this).val()) > '` + response[0].interest_rate_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else if( parseFloat($(this).val()) < '` + response[0].interest_rate_min + `' && parseFloat($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `); //To check value between range
        $('#interest_rate_calc').val(int_rate_upd);
        $('.min-max-due').text('* (' + response[0].due_period_min + ' - ' + response[0].due_period_max + ') ');
        $('#due_period_calc').attr('onChange', `if( parseInt($(this).val()) > '` + response[0].due_period_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else if( parseInt($(this).val()) < '` + response[0].due_period_min + `' && parseInt($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `); //To check value between range
        $('#due_period_calc').val(due_period_upd);

        $('.min-max-doc').text('* (' + response[0].doc_charge_min + '% - ' + response[0].doc_charge_max + '%) ');
        $('#doc_charge_calc').attr('onChange', `if( parseFloat($(this).val()) > '` + response[0].doc_charge_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else if( parseFloat($(this).val()) < '` + response[0].doc_charge_min + `' && parseFloat($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `); //To check value between range
        $('#doc_charge_calc').val(doc_charge_upd);

        $('.min-max-proc').text('* (' + response[0].processing_fee_min + '% - ' + response[0].processing_fee_max + '%) ');
        $('#processing_fees_calc').attr('onChange', `if( parseFloat($(this).val()) > '` + response[0].processing_fee_max + `' ){ alert("Enter Lesser Value"); $(this).val(""); }else if( parseFloat($(this).val()) < '` + response[0].processing_fee_min + `' && parseInt($(this).val()) != '' ){ alert("Enter Higher Value"); $(this).val(""); } `); //To check value between range
        $('#processing_fees_calc').val(proc_fee_upd);

        if (edittype == 1) {
            $('#interest_rate_calc').val('');
            $('#due_period_calc').val('');
            $('#doc_charge_calc').val('');
            $('#processing_fees_calc').val('');

        }
    }, 'json');
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

    } else {
        clearCalcSchemeFields('1')
    }
}

//To Get Loan Calculation for After Interest
function getLoanAfterInterest(loan_amt, int_rate, due_period, doc_charge, proc_fee) {
    $('#loan_amnt_calc').val(moneyFormatIndia(parseInt(loan_amt).toFixed(0))); //get loan amt from loan info card
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

    //////////////////////////////////////////////////////////////////////////////////

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


//To Get Loan Calculation for Interest due type
function getLoanInterest(loan_amt, int_rate, doc_charge, proc_fee) {

    $('#loan_amnt_calc').val(parseInt(loan_amt).toFixed(0)); //get loan amt from loan info card
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
function getLoanAfterBenifit(loan_amt, int_rate, due_period, doc_charge, proc_fee) {

    $('#loan_amnt_calc').val(moneyFormatIndia(parseInt(loan_amt).toFixed(0))); //get loan amt from loan info card
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

    //////////////////////////////////////////////////////////////////////////////////

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

    $('#loan_amnt_calc').val(moneyFormatIndia(parseInt(loan_amt).toFixed(0))); //get loan amt from loan info card

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

    //////////////////////////////////////////////////////////////////////////////////

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

    $('#loan_amnt_calc').val(moneyFormatIndia(parseInt(loan_amt).toFixed(0))); //get loan amt from loan info card

    var int_amt = (parseInt(loan_amt) * (parseFloat(int_rate) / 100)).toFixed(0); //Calculate interest rate
    // $('#interest_amnt_calc').val(parseInt(int_amt));

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

    //////////////////////////////////////////////////////////////////////////////////

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

    $('#loan_amnt_calc').val(moneyFormatIndia(parseInt(loan_amt).toFixed(0))); //get loan amt from loan info card

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

    //////////////////////////////////////////////////////////////////////////////////

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
function resetValidation() {
    const fieldsToReset = [
        'due_method_calc', 'due_type_calc', 'profit_method_calc',
        'interest_rate_calc', 'due_period_calc', 'doc_charge_calc', 'processing_fees_calc',
        'scheme_due_method_calc', 'scheme_name_calc', 'scheme_day_calc',
        'agent_id_calc', 'agent_name_calc'
    ];

    fieldsToReset.forEach(fieldId => {
        $('#' + fieldId).css('border', '1px solid #cecece');

    });
}
// Function to check if all values in an object are not empty
function isFormDataValid(formData) {
    let isValid = true;
    const excludedFields = [
        'loan_amnt_calc', 'principal_amnt_calc', 'interest_amnt_calc', 'total_amnt_calc',
        'processing_fees_calculate', 'net_cash_calc',
        'due_amnt_calc', 'doc_charge_calculate',
        'id', 'category_info_calc', 'due_method_calc', 'due_type_calc', 'profit_method_calc',
        'scheme_due_method_calc', 'scheme_day_calc', 'scheme_name_calc', 'agent_id_calc', 'due_period_calc', 'interest_rate_calc', 'processing_fees_calc', 'doc_charge_calc',
        'agent_name_calc', 'customer_profile_id', 'cus_status'
    ];

    // Validate all fields except the excluded ones
    for (let key in formData) {
        if (!excludedFields.includes(key)) {
            if (!validateField(formData[key], key)) {
                isValid = false;
            }
        }
    }

    // Additional validation based on specific conditions
    if (formData['profit_type_calc'] == '0') { // Calculation
        let validationResults = [
            validateField(formData['due_method_calc'], 'due_method_calc'),
            validateField(formData['due_type_calc'], 'due_type_calc'),
            validateField(formData['profit_method_calc'], 'profit_method_calc'),
            validateField(formData['interest_rate_calc'], 'interest_rate_calc'),
            validateField(formData['due_period_calc'], 'due_period_calc'),
            validateField(formData['doc_charge_calc'], 'doc_charge_calc'),
            validateField(formData['processing_fees_calc'], 'processing_fees_calc')
        ];
        if (!validationResults.every(result => result)) {
            isValid = false;
        }
    }
    else if (formData['profit_type_calc'] == '1') {
        let validationResults = [
            validateField(formData['scheme_due_method_calc'], 'scheme_due_method_calc'),
            validateField(formData['scheme_name_calc'], 'scheme_name_calc'),
            validateField(formData['doc_charge_calc'], 'doc_charge_calc'),
            validateField(formData['processing_fees_calc'], 'processing_fees_calc')
        ];

        if (formData['scheme_due_method_calc'] == '2') {
            validationResults.push(validateField(formData['scheme_day_calc'], 'scheme_day_calc'));
        }

        // Check if all validations passed
        if (!validationResults.every(result => result)) {
            isValid = false;
        }
    }

    if (formData['referred_calc'] == '0') { // Referred
        if (!validateField(formData['agent_id_calc'], 'agent_id_calc') ||
            !validateField(formData['agent_name_calc'], 'agent_name_calc')) {
            isValid = false;
        }
    }

    return isValid;
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

function clearLoanCalcForm() {
    // Clear input fields except those with IDs 'loan_id_calc' and 'loan_date_calc'
    $('#loan_entry_loan_calculation').find('input').each(function () {
        var id = $(this).attr('id');
        if (id !== 'loan_id_calc' && id !== 'loan_date_calc' && id != 'profit_method_calc' && id != 'refresh_cal') {
            $(this).val('');
        }
    });
    $('#loan_entry_loan_calculation input').css('border', '1px solid #cecece');
    $('#loan_entry_loan_calculation select').css('border', '1px solid #cecece');
    $('#loan_entry_loan_calculation textarea').css('border', '1px solid #cecece');
    $('.min-max-int').text('*'); $('.min-max-due').text('*'); $('.min-max-doc').text('*'); $('.min-max-proc').text('*');
    $('.int-diff').text('*'); $('.due-diff').text('*'); $('.doc-diff').text('*'); $('.proc-diff').text('*');

    // Clear all textarea fields within the specific form
    $('#loan_entry_loan_calculation').find('textarea').val('');

    // Reset all select fields within the specific form
    $('#loan_entry_loan_calculation').find('select').each(function () {
        $(this).val($(this).find('option:first').val());
    });
}

function loanCalculationEdit(id) {
    $.post('api/loan_entry/loan_calculation/loan_calculation_data.php', { id }, function (response) {
        if (response.length > 0) {
            let loan_amt = moneyFormatIndia(response[0].loan_amount)
            $('#loan_id_calc').val(response[0].loan_id);
            $('#loan_category_calc').val(response[0].loan_category);
            $('#loan_category_calc2').val(response[0].loan_category);
            $('#category_info_calc').val(response[0].category_info);
            $('#loan_amount_calc').val(loan_amt);
            $('#profit_type_calc').val(response[0].profit_type);
            $('#due_method_calc').val(response[0].due_method);
            $('#due_type_calc').val(response[0].due_type);
            $('#profit_method_calc').val(response[0].profit_method);
            $('#scheme_due_method_calc').val(response[0].scheme_due_method);
            $('#scheme_name_edit').val(response[0].scheme_name);
            $('#int_rate_upd').val(response[0].interest_rate);
            $('#due_period_upd').val(response[0].due_period);
            $('#doc_charge_upd').val(response[0].doc_charge);
            $('#proc_fees_upd').val(response[0].processing_fees);
            $('#loan_amnt_calc').val(response[0].loan_amount);
            $('#principal_amnt_calc').val(response[0].principal_amnt);
            $('#interest_amnt_calc').val(response[0].interest_amnt);
            $('#total_amnt_calc').val(response[0].total_amnt);
            $('#due_amnt_calc').val(response[0].due_amnt);
            $('#doc_charge_calculate').val(response[0].doc_charge_calculate);
            $('#processing_fees_calculate').val(response[0].processing_fees_calculate);
            $('#net_cash_calc').val(response[0].net_cash);
            $('#loan_date_calc').val(response[0].loan_date);
            $('#due_startdate_calc').val(response[0].due_startdate);
            $('#maturity_date_calc').val(response[0].maturity_date);
            $('#referred_calc').val(response[0].referred);
            $('#referred_calc').trigger('change');

            $('#profit_type_calc_scheme').show();
            if (response[0].profit_type == '0') {//Loan Calculation
                $('.calc').show();
                $('.scheme').hide();
                $('.scheme_day').hide();
                getLoanCatDetails(response[0].loan_category, 2);
            } else if (response[0].profit_type == '1') { //Scheme
                dueMethodScheme(response[0].scheme_due_method, response[0].loan_category)
                $('.calc').hide();
                $('.scheme').show();
                setTimeout(() => {
                    schemeCalAjax(response[0].scheme_name)
                }, 500);

            }


            setTimeout(() => {
                $('#scheme_day_calc').val(response[0].scheme_day);
                $('#agent_id_calc').val(response[0].agent_id);
                $('#agent_name_calc').val(response[0].agent_name);
                $('#refresh_cal').trigger('click');
            }, 2000);
        }
    }, 'json');
}
//////////////////////////////////////////////////////////////// Loan Calculation END //////////////////////////////////////////////////////////////////////

//////////////////loan Documentation Start//////////////////////////////////////////////////////////

function callLoanDocumentFunctions() {
    let cus_profile_id = $('#customer_profile_id').val();
    $('#cus_profile_id').val(cus_profile_id);
    $('.cheque-div').hide();
    $('.signed-div').hide();
    $('.doc_div').hide();
    $('.mortgage-div').hide();
    $('.endorsement-div').hide();
    $('.gold-div').hide();
    $('#document_type').val('')
    getSignedDocInfoTable();
    getChequeInfoTable();
    getDocInfoTable();
    getMortInfoTable();
    getEndorsementInfoTable();
    getGoldInfoTable();
}
$('#document_type').change(function () {
    var documentType = $(this).val();
    // Hide all   
    $('.signed-div').hide();
    $('.cheque-div').hide();
    $('.doc_div').hide();
    $('.mortgage-div').hide();
    $('.endorsement-div').hide();
    $('.gold-div').hide();
    if (documentType == '1') {
        $('.signed-div').show();
    }
    else if (documentType == '2') {
        $('.cheque-div').show();
    } else if (documentType == '3') {
        $('.doc_div').show();
    } else if (documentType == '4') {
        $('.mortgage-div').show();
    }
    else if (documentType == '5') {
        $('.endorsement-div').show();
    }
    else if (documentType == '6') {
        $('.gold-div').show();
    }
    getSignedDocInfoTable();
    getChequeInfoTable();
    getDocInfoTable();
    getMortInfoTable();
    getEndorsementInfoTable();
    getGoldInfoTable();
});
//////////////////////////////////////////////Signed Doc Info Start/////////////////////////////////////////////


$("#sign_type").change(function () {
    let type = $(this).val();
    let customer_profile_id = $('#cus_profile_id').val();
    let cus_id = $('#auto_gen_cus_id').val();

    // Hide all sections first
    $("#cus_name_div").hide();
    $("#guar_name_div").hide();
    $("#relation_doc").hide();

    if (type === "0" || type === "1" || type === "2" || type === "3") {
        $.ajax({
            type: "POST",
            url: "api/loan_entry/get_signholder_info.php",
            data: {
                type: type,
                customer_profile_id: customer_profile_id,
                cus_id: cus_id
            },
            dataType: "json",
            cache: false,
            success: function (result) {
                if (type == "0") {
                    $("#cus_name_div").show();
                    $("#signType_cus_name").val(result["name"]);
                } else if (type == "1") {
                    $("#guar_name_div").show();
                    $("#guar_name").val(result["name"]);
                } if (type == "2" || type == "3") {
                    $("#relation_doc").show();
                    $("#signType_relationship").empty().append(`<option value=''>Select Relationship</option>`);

                    result.forEach(member => {
                        let fam_name = member["name"];
                        let fam_id = member["id"];
                        let relationship = member["relationship"];
                        let selected = '';

                        let signedValue = $('#signType_relationship').data('selected');
                        if (signedValue == fam_id) {
                            selected = 'selected';
                        }

                        $("#signType_relationship").append(
                            `<option value='${fam_id}' ${selected}>${fam_name} - ${relationship}</option>`
                        );
                    });
                }

            }
        });
    }
});
//////////submit
$('#signInfoBtn').click(function () {
    event.preventDefault();
    //Validation
    let cus_profile_id = $('#cus_profile_id').val();
    let cus_id = $('#auto_gen_cus_id').val();
    let doc_name = $("#doc_name").val();
    let sign_type = $("#sign_type").val();
    let signType_relationship = $("#signType_relationship").val();
    let doc_Count = $("#doc_Count").val();
    let signedID = $("#signedID").val();
    if (cus_profile_id == '') {
        swalError('Warning', 'Kindly Fill the Personal Info');
        return false;
    }
    var data = ['doc_name', 'sign_type', 'doc_Count']
    var isValid = true;
    data.forEach(function (entry) {
        var fieldIsValid = validateField($('#' + entry).val(), entry);
        if (!fieldIsValid) {
            isValid = false;
        }
    });
    if (sign_type === '2' || sign_type === '3') {
        if (!validateField(signType_relationship, 'signType_relationship')) {
            isValid = false;
        }
    }
    if (isValid) {
        $.post('api/loan_entry/signed_doc_info_submit.php', { cus_id, doc_name, sign_type, signType_relationship, doc_Count, signedID, cus_profile_id }, function (response) {
            if (response == '1') {
                swalSuccess('Success', 'Signed Doc Info Added Successfully!');
            } else if (response == '2') {
                swalSuccess('Success', 'Signed Doc Info Updated Successfully!')
            } else {
                swalError('Error', 'Error Occured')
            }
            getSignedDocTable();
            $('#signedID').val('');

            $("#cus_name_div").hide();
            $("#guar_name_div").hide();
            $("#relation_doc").hide();

        });
    }
})

$(document).on('click', '.signdocActionBtn', function () {
    let id = $(this).attr('value');

    $.post('api/loan_entry/signeddoc_info_data.php', { id }, function (response) {
        // Populate form with response data
        $("#sign_type").val(response.sign_type);
        $("#signedID").val(response.id);
        $("#doc_name").val(response.doc_name);
        $("#doc_Count").val(response.doc_Count);

        // Clear and reset signType_relationship
        $("#signType_relationship").empty().append(`<option value=''>Select Relationship</option>`);

        // Show/hide and populate customer name if type is Customer
        if (response.sign_type === "0") {
            $("#cus_name_div").show();
            $("#signType_cus_name").val(response.signType_cus_name);
            $("#guar_name_div").hide();
            $("#relation_doc").hide();
        }

        // Show/hide and populate guarantor name if type is Guarantor
        else if (response.sign_type === "1") {
            $("#cus_name_div").hide();
            $("#guar_name_div").show();
            $("#guar_name").val(response.guar_name);
            $("#relation_doc").hide();
        }

        // If Combined (2 or 3), show both guarantor and relationship dropdown
        else if (response.sign_type === "2" || response.sign_type === "3") {
            $("#cus_name_div").hide();
            $("#guar_name_div").hide();
            $("#relation_doc").show();

            let selectedId = response.selected_relationship; // ✅ Now you're getting this from the backend
            let familyList = response.holder_name;

            $("#signType_relationship").empty().append(`<option value=''>Select Relationship</option>`);

            familyList.forEach(member => {
                let isSelected = selectedId == member.id ? 'selected' : '';
                $("#signType_relationship").append(
                    `<option value='${member.id}' ${isSelected}>${member.name} - ${member.relationship}</option>`
                );
            });
        }


    }, 'json');
});


$(document).on('click', '.signdocDeleteBtn', function () {
    let id = $(this).attr('value');
    swalConfirm('Delete', 'Are you sure you want to delete this  Signed document?', deleteSignedDocInfo, id);
});
///////////////////////////////////////////Signed Doc Info End//////////////////////////////////////////
///////////////////////////////////////////////////////////////////Cheque info START ////////////////////////////////////////////////////////////////////////////
$('#cq_holder_type').change(function () {
    let holderType = $(this).val();
    emptyholderFields();
    if (holderType == '1' || holderType == '2') {
        $('.cq_fam_member').hide();
        let cus_profile_id = $('#cus_profile_id').val();
        getNameRelationship(cus_profile_id, holderType);
    } else if (holderType == '3') {
        getFamilyMember('Select Family Member', '#cq_fam_mem');
        $('.cq_fam_member').show();
    } else {
        $('.cq_fam_member').hide();
    }
});

$('#cq_fam_mem').change(function () {
    let famMemId = $(this).val();
    if (famMemId != '') {
        getNameRelationship(famMemId, '3');
    }
});

$('#cheque_count').keyup(function () {
    $('#cheque_no').empty();
    let cnt = $(this).val();
    if (cnt != '') {
        for (let i = 1; i <= cnt; i++) {
            $('#cheque_no').append("<div class='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12'><div class='form-group'><input type='number' class='form-control chequeno' name='chequeno[]' id='chequeno'/> </div></div>")
        }
    }
});

$('#submit_cheque_info').click(function (event) {
    event.preventDefault();
    let cus_id = $('#auto_gen_cus_id').val();
    let cq_holder_type = $('#cq_holder_type').val();
    let cq_holder_name = $("#cq_holder_name").val();
    let cq_holder_id = $("#cq_holder_name").attr('data-id');
    let cq_relationship = $('#cq_relationship').val();
    let cq_bank_name = $('#cq_bank_name').val();
    let cheque_count = $('#cheque_count').val();
    let cq_upload = $('#cq_upload')[0].files;
    let cq_upload_edit = $('#cq_upload_edit').val();
    let customer_profile_id = $('#cus_profile_id').val();
    let cheque_info_id = $('#cheque_info_id').val();
    if (customer_profile_id == '') {
        swalError('Warning', 'Kindly Fill the Personal Info');
        return false;
    }
    let chequeNoArr = []; //for storing cheque no
    let i = 0;
    $('.chequeno').each(function () {//cheque numbers input box
        chequeNoArr[i] = $(this).val();//store each numbers in an array
        i++;
    });
    var data = ['cq_holder_type', 'cq_holder_name', 'cq_relationship', 'cq_bank_name', 'cheque_count']

    var isValid = true;
    data.forEach(function (entry) {
        var fieldIsValid = validateField($('#' + entry).val(), entry);
        if (!fieldIsValid) {
            isValid = false;
        }
    });
    if (isValid) {
        let chequeInfo = new FormData();
        chequeInfo.append('cq_holder_type', cq_holder_type)
        chequeInfo.append('cq_holder_name', cq_holder_name)
        chequeInfo.append('cq_holder_id', cq_holder_id)
        chequeInfo.append('cq_relationship', cq_relationship)
        chequeInfo.append('cheque_count', cheque_count)
        chequeInfo.append('cq_bank_name', cq_bank_name)
        chequeInfo.append('cq_upload_edit', cq_upload_edit)
        chequeInfo.append('cheque_no', chequeNoArr)
        chequeInfo.append('cus_id', cus_id)
        chequeInfo.append('customer_profile_id', customer_profile_id)
        chequeInfo.append('id', cheque_info_id)

        for (var a = 0; a < cq_upload.length; a++) {
            chequeInfo.append('cq_upload[]', cq_upload[a])
        }

        $.ajax({
            url: 'api/loan_issue_files/submit_cheque_info.php',
            type: 'post',
            data: chequeInfo,
            contentType: false,
            processData: false,
            cache: false,
            dataType: 'json',
            success: function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'Cheque Info Updated Successfully')
                } else if (response == '2') {
                    swalSuccess('Success', 'Cheque Info Added Successfully')
                } else {
                    swalError('Alert', 'Failed')
                }
                getChequeCreationTable();
                $('#clear_cheque_form').trigger('click');
                $('#cheque_info_id').val('');

                $('.cq_fam_member').hide();
            }
        });
    }
});

$(document).on('click', '.chequeActionBtn', function () {
    let id = $(this).attr('value');
    $.post('api/loan_issue_files/cheque_info_data.php', { id }, function (response) {
        $('#cq_holder_type').val(response.result[0].holder_type);
        $('#cq_holder_name').val(response.result[0].holder_name);
        $('#cq_holder_name').attr('data-id', response.result[0].holder_id);
        $('#cq_relationship').val(response.result[0].relationship);
        $('#cq_bank_name').val(response.result[0].bank_name);
        $('#cheque_count').val(response.result[0].cheque_cnt);
        $('#cheque_info_id').val(response.result[0].id);
        if (response.result[0].holder_type == '3') {
            getFamilyMember('Select Family Member', '#cq_fam_mem')
            $('.cq_fam_member').show();
            setTimeout(() => {
                $('#cq_fam_mem').val(response.result[0].holder_id);
            }, 1000);
        } else {
            $('#cq_fam_mem').val('');
            $('.cq_fam_member').hide();
        }
        if (response.upd.length > 0) {
            let uploadFiles = response.upd.map(fileObj => fileObj.uploads).filter(Boolean);
            $('#cq_upload_edit').val(uploadFiles.join(','));
        }

        $('#cheque_no').empty();
        for (let key in response.no) {
            let cheque = response.no[key];
            $('#cheque_no').append("<div class='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12'><div class='form-group'><input type='number' class='form-control chequeno' name='chequeno[]' id='chequeno' value='" + cheque['cheque_no'] + "'/> </div></div>");
        }

    }, 'json');
});

$(document).on('click', '.chequeDeleteBtn', function () {
    let id = $(this).attr('value');
    swalConfirm('Delete', 'Are you sure you want to delete this Cheque?', deleteChequeInfo, id);
});

$('#clear_cheque_form').click(function () {
    $('#cheque_no').empty();
    $('#cheque_info_id').val('');
    $('#cheque_info_form input').css('border', '1px solid #cecece');
    $('#cheque_info_form select').css('border', '1px solid #cecece');
    $('.cq_fam_member').hide();
});
///////////////////////////////////////////////////////////////////Cheque info END ////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////Document info START ////////////////////////////////////////////////////////////////////////////
$('#doc_holder_name').change(function () {
    let id = $(this).val();
    if (id != '' && id != 0) {
        getRelationship(id, '#doc_relationship')
    } else if (id == 0) {
        $('#doc_relationship').val('Customer');
    }
    else {
        $('#doc_relationship').val('');
    }

});

$('#submit_doc_info').click(function (event) {
    event.preventDefault();
    let doc_name = $('#document_name').val();
    let doc_type = $('#doc_type').val();
    let doc_holder_name = $('#doc_holder_name').val();
    let doc_relationship = $('#doc_relationship').val();
    let doc_upload = $('#doc_upload')[0].files[0];
    let doc_upload_edit = $('#doc_upload_edit').val();
    let doc_info_id = $('#doc_info_id').val();
    let cus_id = $('#auto_gen_cus_id').val();
    let customer_profile_id = $('#customer_profile_id').val();
    if (customer_profile_id == '') {
        swalError('Warning', 'Kindly Fill the Personal Info');
        return false;
    }
    var data = ['document_name', 'doc_type', 'doc_holder_name', 'doc_relationship']

    var isValid = true;
    data.forEach(function (entry) {
        var fieldIsValid = validateField($('#' + entry).val(), entry);
        if (!fieldIsValid) {
            isValid = false;
        }
    });
    if (isValid) {
        let docInfo = new FormData();
        docInfo.append('doc_name', doc_name);
        docInfo.append('doc_type', doc_type);
        docInfo.append('doc_holder_name', doc_holder_name);
        docInfo.append('doc_relationship', doc_relationship);
        docInfo.append('doc_upload', doc_upload);
        docInfo.append('doc_upload_edit', doc_upload_edit);
        docInfo.append('cus_id', cus_id);
        docInfo.append('customer_profile_id', customer_profile_id);
        docInfo.append('id', doc_info_id);

        $.ajax({
            url: 'api/loan_issue_files/submit_document_info.php',
            type: 'post',
            data: docInfo,
            contentType: false,
            processData: false,
            cache: false,
            success: function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'Document Info Updated Successfully')
                } else if (response == '2') {
                    swalSuccess('Success', 'Document Info Added Successfully')
                } else {
                    swalError('Alert', 'Failed')
                }
                getDocCreationTable();
                $('#clear_doc_form').trigger('click');
                $('#doc_info_id').val('');
            }
        });
    }
});

$(document).on('click', '.docActionBtn', function () {
    let id = $(this).attr('value');
    $.post('api/loan_issue_files/doc_info_data.php', { id }, function (response) {
        $('#document_name').val(response[0].doc_name);
        $('#doc_type').val(response[0].doc_type);
        $('#doc_holder_name').val(response[0].holder_name);
        $('#doc_relationship').val(response[0].relationship);
        $('#doc_upload_edit').val(response[0].upload);
        $('#doc_info_id').val(response[0].id);
    }, 'json');
});

$(document).on('click', '.docDeleteBtn', function () {
    let id = $(this).attr('value');
    swalConfirm('Delete', 'Are you sure you want to delete this document?', deleteDocInfo, id);
});

$('#clear_doc_form').click(function () {
    $('#doc_info_id').val('');
    $('#doc_upload_edit').val('');
    $('#doc_info_form input').css('border', '1px solid #cecece');
    $('#doc_info_form select').css('border', '1px solid #cecece');
})
///////////////////////////////////////////////////////////////////Document info END ////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////Mortgage info START ////////////////////////////////////////////////////////////////////////////
$('#property_holder_name').change(function () {
    let id = $(this).val();
    if (id != '' && id != 0) {
        getRelationship(id, '#mort_relationship')
    } else if (id == 0) {
        $('#mort_relationship').val('Customer');
    } else {
        $('#mort_relationship').val('');
    }

});

$('#submit_mortgage_info').click(function (event) {
    event.preventDefault();
    let property_holder_name = $('#property_holder_name').val();
    let mort_relationship = $('#mort_relationship').val();
    let mort_property_details = $('#mort_property_details').val();
    let mortgage_name = $('#mortgage_name').val();
    let mort_designation = $('#mort_designation').val();
    let mortgage_no = $('#mortgage_no').val();
    let reg_office = $('#reg_office').val();
    let mortgage_value = $('#mortgage_value').val();
    let mortgage_info_id = $('#mortgage_info_id').val();
    let cus_id = $('#auto_gen_cus_id').val();
    let customer_profile_id = $('#customer_profile_id').val();
    let mort_upload = $('#mort_upload')[0].files[0];
    let mort_upload_edit = $('#mort_upload_edit').val();
    if (customer_profile_id == '') {
        swalError('Warning', 'Kindly Fill the Personal Info');
        return false;
    }
    var data = ['property_holder_name', 'mort_relationship', 'mort_property_details', 'mortgage_name', 'mort_designation', 'mortgage_no', 'reg_office', 'mortgage_value']

    var isValid = true;
    data.forEach(function (entry) {
        var fieldIsValid = validateField($('#' + entry).val(), entry);
        if (!fieldIsValid) {
            isValid = false;
        }
    });
    if (isValid) {
        let mortgageInfo = new FormData();
        mortgageInfo.append('property_holder_name', property_holder_name);
        mortgageInfo.append('mort_relationship', mort_relationship);
        mortgageInfo.append('mort_property_details', mort_property_details);
        mortgageInfo.append('mortgage_name', mortgage_name);
        mortgageInfo.append('mort_designation', mort_designation);
        mortgageInfo.append('mortgage_no', mortgage_no);
        mortgageInfo.append('reg_office', reg_office);
        mortgageInfo.append('mortgage_value', mortgage_value);
        mortgageInfo.append('mort_upload', mort_upload);
        mortgageInfo.append('mort_upload_edit', mort_upload_edit);
        mortgageInfo.append('cus_id', cus_id);
        mortgageInfo.append('customer_profile_id', customer_profile_id);
        mortgageInfo.append('id', mortgage_info_id);

        $.ajax({
            url: 'api/loan_issue_files/submit_mortgage_info.php',
            type: 'post',
            data: mortgageInfo,
            contentType: false,
            processData: false,
            cache: false,
            success: function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'Mortgage Info Updated Successfully')
                } else if (response == '2') {
                    swalSuccess('Success', 'Mortgage Info Added Successfully')
                } else {
                    swalError('Alert', 'Failed')
                }
                getMortCreationTable()
                $('#clear_mortgage_form').trigger('click');
                $('#mortgage_info_id').val('');
            }
        });
    }
});

$(document).on('click', '.mortActionBtn', function () {
    let id = $(this).attr('value');
    $.post('api/loan_issue_files/mortgage_info_data.php', { id }, function (response) {
        $('#property_holder_name').val(response[0].property_holder_name);
        $('#mort_relationship').val(response[0].relationship);
        $('#mort_property_details').val(response[0].property_details);
        $('#mortgage_name').val(response[0].mortgage_name);
        $('#mort_designation').val(response[0].designation);
        $('#mortgage_no').val(response[0].mortgage_number);
        $('#reg_office').val(response[0].reg_office);
        $('#mortgage_value').val(response[0].mortgage_value);
        $('#mort_upload_edit').val(response[0].upload);
        $('#mortgage_info_id').val(response[0].id);
    }, 'json');
});

$(document).on('click', '.mortDeleteBtn', function () {
    let id = $(this).attr('value');
    swalConfirm('Delete', 'Are you sure you want to delete this Mortgage?', deleteMortgageInfo, id);
});

$('#clear_mortgage_form').click(function () {
    $('#mortgage_info_id').val('');
    $('#mort_upload_edit').val('');
    $('#mortgage_form input').css('border', '1px solid #cecece');
    $('#mortgage_form select').css('border', '1px solid #cecece');
    $('#mortgage_form textarea').css('border', '1px solid #cecece');

})
///////////////////////////////////////////////////////////////////Mortgage info END ////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////Endorsement info START ////////////////////////////////////////////////////////////////////////////
$('#owner_name').change(function () {
    let id = $(this).val();
    if (id != '' && id != 0) {
        getRelationship(id, '#owner_relationship')
    } else if (id == 0) {
        $('#owner_relationship').val('Customer');
    } else {
        $('#owner_relationship').val('');
    }
});

$('#submit_endorsement').click(function (event) {
    event.preventDefault();
    let owner_name = $('#owner_name').val();
    let owner_relationship = $('#owner_relationship').val();
    let vehicle_details = $('#vehicle_details').val();
    let endorsement_name = $('#endorsement_name').val();
    let key_original = $('#key_original').val();
    let rc_original = $('#rc_original').val();
    let endorsement_upload = $('#endorsement_upload')[0].files[0];
    let endorsement_upload_edit = $('#endorsement_upload_edit').val();
    let endorsement_info_id = $('#endorsement_info_id').val();
    let cus_id = $('#auto_gen_cus_id').val();
    let customer_profile_id = $('#customer_profile_id').val();

    if (customer_profile_id == '') {
        swalError('Warning', 'Kindly Fill the Personal Info');
        return false;
    }

    var data = ['owner_name', 'owner_relationship', 'vehicle_details', 'endorsement_name', 'key_original', 'rc_original']

    var isValid = true;
    data.forEach(function (entry) {
        var fieldIsValid = validateField($('#' + entry).val(), entry);
        if (!fieldIsValid) {
            isValid = false;
        }
    });
    if (isValid) {
        let endorsementInfo = new FormData();
        endorsementInfo.append('owner_name', owner_name);
        endorsementInfo.append('owner_relationship', owner_relationship);
        endorsementInfo.append('vehicle_details', vehicle_details);
        endorsementInfo.append('endorsement_name', endorsement_name);
        endorsementInfo.append('key_original', key_original);
        endorsementInfo.append('rc_original', rc_original);
        endorsementInfo.append('endorsement_upload', endorsement_upload);
        endorsementInfo.append('endorsement_upload_edit', endorsement_upload_edit);
        endorsementInfo.append('cus_id', cus_id);
        endorsementInfo.append('customer_profile_id', customer_profile_id);
        endorsementInfo.append('id', endorsement_info_id);

        $.ajax({
            url: 'api/loan_issue_files/submit_endorsement_info.php',
            type: 'post',
            data: endorsementInfo,
            contentType: false,
            processData: false,
            cache: false,
            success: function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'Endorsement Info Updated Successfully')
                } else if (response == '2') {
                    swalSuccess('Success', 'Endorsement Info Added Successfully')
                } else {
                    swalError('Alert', 'Failed')
                }
                getEndorsementCreationTable()
                $('#clear_endorsement_form').trigger('click');
                $('#endorsement_info_id').val('');
            }
        });
    }
});

$(document).on('click', '.endorseActionBtn', function () {
    let id = $(this).attr('value');
    $.post('api/loan_issue_files/endorsement_info_data.php', { id }, function (response) {
        $('#owner_name').val(response[0].owner_name);
        $('#owner_relationship').val(response[0].relationship);
        $('#vehicle_details').val(response[0].vehicle_details);
        $('#endorsement_name').val(response[0].endorsement_name);
        $('#key_original').val(response[0].key_original);
        $('#rc_original').val(response[0].rc_original);
        $('#endorsement_upload_edit').val(response[0].upload);
        $('#endorsement_info_id').val(response[0].id);
    }, 'json');
});

$(document).on('click', '.endorseDeleteBtn', function () {
    let id = $(this).attr('value');
    swalConfirm('Delete', 'Are you sure you want to delete this Endorsement?', deleteEndorsementInfo, id);
});

$('#clear_endorsement_form').click(function () {
    $('#endorsement_info_id').val('');
    $('#endorsement_upload_edit').val('');
    $('#endorsement_form input').css('border', '1px solid #cecece');
    $('#endorsement_form select').css('border', '1px solid #cecece');
    $('#endorsement_form textarea').css('border', '1px solid #cecece');
});

///////////////////////////////////////////////////////////////////Endorsement info END ////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////Gold info START ////////////////////////////////////////////////////////////////////////////
$('#submit_gold_info').click(function (event) {
    event.preventDefault();
    let goldInfo = {
        'cus_id': $('#auto_gen_cus_id').val(),
        'customer_profile_id': $('#customer_profile_id').val(),
        'gold_type': $('#gold_type').val(),
        'purity': $('#gold_purity').val(),
        'weight': $('#gold_weight').val(),
        'value': $('#gold_value').val(),
        'id': $('#gold_info_id').val(),
    };
    if (customer_profile_id == '') {
        swalError('Warning', 'Kindly Fill the Personal Info');
        return false;
    }
    var data = ['gold_type', 'gold_purity', 'gold_weight', 'gold_value']

    var isValid = true;
    data.forEach(function (entry) {
        var fieldIsValid = validateField($('#' + entry).val(), entry);
        if (!fieldIsValid) {
            isValid = false;
        }
    });

    if (isValid) {
        $.post('api/loan_issue_files/submit_gold_info.php', goldInfo, function (response) {
            if (response == '1') {
                swalSuccess('Success', 'Gold Info Updated Successfully')
            } else if (response == '2') {
                swalSuccess('Success', 'Gold Info Added Successfully')
            } else {
                swalError('Alert', 'Failed')
            }
            getGoldCreationTable()
            $('#clear_gold_form').trigger('click');
            $('#gold_info_id').val('');
        });
    }
});

$(document).on('click', '.goldActionBtn', function () {
    let id = $(this).attr('value');
    $.post('api/loan_issue_files/gold_info_data.php', { id }, function (response) {
        $('#gold_type').val(response[0].gold_type);
        $('#gold_purity').val(response[0].purity);
        $('#gold_weight').val(response[0].weight);
        $('#gold_value').val(response[0].value);
        $('#gold_info_id').val(response[0].id);
    }, 'json');
});

$(document).on('click', '.goldDeleteBtn', function () {
    let id = $(this).attr('value');
    swalConfirm('Delete', 'Are you sure you want to delete this Gold Info?', deleteGoldInfo, id);
});

$('#clear_gold_form').click(function () {
    $('#gold_info_id').val('');
    $('#gold_form input').css('border', '1px solid #cecece');
    $('#gold_form select').css('border', '1px solid #cecece');
});
///////////////////////////////////////////////////////////////////Gold info END ////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////Document Print START ////////////////////////////////////////////////////////////////////////////
$('#print_doc').click(function () {
    let cus_profile_id = $('#customer_profile_id').val();
    // Open a new window or tab
    var printWindow = window.open('', '_blank');

    // Make sure the popup window is not blocked
    if (printWindow) {
        // Load the content into the popup window
        $.ajax({
            url: 'api/loan_issue_files/print_document.php',
            data: { cus_profile_id },
            cache: false,
            type: "post",
            success: function (html) {
                // Write the content to the new window
                printWindow.document.open();
                printWindow.document.write(html);
                printWindow.document.close();

                // Optionally, print the content
                printWindow.print();
            },
            error: function () {
                // Handle error
                printWindow.close();
                alert('Failed to load print content.');
            }
        });
    } else {
        alert('Popup blocked. Please allow popups for this website.');
    }
})
///////////////////////////////////////////////////////////////////Document Print END ////////////////////////////////////////////////////////////////////////////

function getDocNeedTable(cusProfileId) {
    $.post('api/loan_entry/loan_calculation/document_need_list.php', { cusProfileId }, function (response) {
        let docColumn = [
            "sno",
            "document_name"
        ]
        appendDataToTable('#doc_need_table', response, docColumn);
        setdtable('#doc_need_table');
    }, 'json');
}

function getFamilyMember(optn, selector) {
    let cus_id = $('#auto_gen_cus_id').val();
    let holderType = $('#cq_holder_type').val(); // Get current holder type
    $.post('api/loan_issue_files/get_guarantor.php', { cus_id }, function (response) {
        let appendOption = '';
        appendOption += "<option value=''>" + optn + "</option>"; // Default option 

        // Dynamic options from the response
        $.each(response, function (index, val) {
            // Differentiating between customer and family member
            if (val.type === 'Customer' && holderType !== '3') {
                appendOption += "<option value='0'>" + val.name + "</option>";  // Customer
            } else if (val.type === 'Family') {
                appendOption += "<option value='" + val.id + "'>" + val.name + " </option>";  // Family Member
            }
        });

        $(selector).empty().append(appendOption);  // Append options to the select element
    }, 'json');
}


function getNameRelationship(id, type) {
    $.post('api/loan_issue_files/get_cus_fam_members.php', { id, type }, function (response) {
        if (type == '1') {
            $('#cq_holder_name').val(response[0].cus_name);
            $('#cq_relationship').val('Customer');
        } else {
            $('#cq_holder_name').val(response[0].fam_name);
            $('#cq_holder_name').attr('data-id', response[0].id);
            $('#cq_relationship').val(response[0].fam_relationship);
        }
    }, 'json');
}

function getRelationship(id, selector) {
    $.post('api/loan_entry/family_creation_data.php', { id }, function (response) {
        $(selector).val(response[0].fam_relationship);
    }, 'json');
}

function emptyholderFields() {
    $('#cq_fam_mem').val('');
    $('#cq_holder_name').val('');
    $('#cq_holder_name').attr('data-id', '');
    $('#cq_relationship').val('');
}

function getSignedDocTable() {
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_entry/get_signeddoc_info_list.php', { cus_profile_id }, function (response) {
        let signColumn = [
            "sno",
            "doc_name",
            "sign_type",
            "signed_name",
            "doc_Count",
            "action"
        ]
        appendDataToTable('#singnedTable', response, signColumn);
        setdtable('#singnedTable');
        $("#sign_type").val("");
        $("#cus_name_div").hide();
        $("#signType_cus_name").val('');
        $("#guar_name_div").hide();
        $("#guar_name").val("");
        $("#relation_doc").hide();
        $("#signType_relationship").val("");
        $("#doc_Count").val("");
        $('#sign_type').css('border', '1px solid #cecece');
        $('#doc_Count').css('border', '1px solid #cecece');
        $('#signType_relationship').css('border', '1px solid #cecece');
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
            "doc_Count"
        ]
        appendDataToTable('#signDocResetTable', response, signColumn);
        setdtable('#signDocResetTable');
    }, 'json');
}

function deleteSignedDocInfo(id) {
    $.post('api/loan_entry/delete_signeddoc_info.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('success', 'Signed Doc Info Deleted Successfully');
            getSignedDocTable();
        } else {
            swalError('Alert', 'Delete Failed')
        }
    }, 'json');
}

function getChequeCreationTable() {
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_issue_files/cheque_info_list.php', { cus_profile_id }, function (response) {
        let chequeColumn = [
            "sno",
            "holder_type",
            "holder_name",
            "relationship",
            "bank_name",
            "cheque_cnt",
            "upload",
            "action"
        ]
        appendDataToTable('#cheque_creation_table', response, chequeColumn);
        setdtable('#cheque_creation_table');
    }, 'json');
}

function getChequeInfoTable() {
    let cus_profile_id = $('#customer_profile_id').val();

    $.post('api/loan_issue_files/cheque_info_list.php', { cus_profile_id }, function (response) {
        // Check if the response length is greater than 0
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
        ];

        appendDataToTable('#cheque_info_table', response, chequeColumn);
        setdtable('#cheque_info_table');

    }, 'json');
}


function deleteChequeInfo(id) {
    $.post('api/loan_issue_files/delete_cheque_info.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('success', 'Cheque Info Deleted Successfully');
            getChequeCreationTable();
        } else {
            swalError('Alert', 'Delete Failed')
        }
    }, 'json');
}

function getDocCreationTable() {
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_issue_files/doc_info_list.php', { cus_profile_id }, function (response) {
        let docInfoColumn = [
            "sno",
            "doc_name",
            "doc_type",
            "holder_name",
            "relationship",
            "upload",
            "action"
        ]
        appendDataToTable('#doc_creation_table', response, docInfoColumn);
        setdtable('#doc_creation_table')
    }, 'json');
}

function refreshChequeModal() {
    $('#clear_cheque_form').trigger('click');
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

function deleteDocInfo(id) {
    $.post('api/loan_issue_files/delete_doc_info.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('success', ' Signed Doc Info Deleted Successfully');
            getDocCreationTable();
        } else {
            swalError('Alert', 'Delete Failed')
        }
    }, 'json');
}

function refreshDocModal() {
    $('#clear_doc_form').trigger('click');
}

function getMortCreationTable() {
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_issue_files/mortgage_info_list.php', { cus_profile_id }, function (response) {
        let mortInfoColumn = [
            "sno",
            "holder_name",
            "relationship",
            "property_details",
            "mortgage_name",
            "designation",
            "mortgage_number",
            "reg_office",
            "mortgage_value",
            "upload",
            "action"
        ]
        appendDataToTable('#mortgage_creation_table', response, mortInfoColumn);
        setdtable('#mortgage_creation_table')
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

function deleteMortgageInfo(id) {
    $.post('api/loan_issue_files/delete_mortgage_info.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('success', 'Mortgage Info Deleted Successfully');
            getMortCreationTable();
        } else {
            swalError('Alert', 'Delete Failed')
        }
    }, 'json');
}

function refreshMortModal() {
    $('#clear_mortgage_form').trigger('click');
}

function getEndorsementCreationTable() {
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_issue_files/endorsement_info_list.php', { cus_profile_id }, function (response) {
        let endorsementInfoColumn = [
            "sno",
            "holder_name",
            "relationship",
            "vehicle_details",
            "endorsement_name",
            "key_original",
            "rc_original",
            "upload",
            "action"
        ]
        appendDataToTable('#endorsement_creation_table', response, endorsementInfoColumn);
        setdtable('#endorsement_creation_table')
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

function deleteEndorsementInfo(id) {
    $.post('api/loan_issue_files/delete_endorsement_info.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('success', 'Endorsement Info Deleted Successfully');
            getEndorsementCreationTable();
        } else {
            swalError('Alert', 'Delete Failed')
        }
    }, 'json');
}

function refreshEndorsementModal() {
    $('#clear_endorsement_form').trigger('click');
}

function getGoldCreationTable() {
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_issue_files/gold_info_list.php', { cus_profile_id }, function (response) {
        let goldInfoColumn = [
            "sno",
            "gold_type",
            "purity",
            "weight",
            "value",
            "action"
        ]
        appendDataToTable('#gold_creation_table', response, goldInfoColumn);
        setdtable('#gold_creation_table')
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

function deleteGoldInfo(id) {
    $.post('api/loan_issue_files/delete_gold_info.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('success', 'Gold Info Deleted Successfully');
            getGoldCreationTable();
        } else {
            swalError('Alert', 'Delete Failed')
        }
    }, 'json');
}

function refreshGoldModal() {
    $('#clear_gold_form').trigger('click');
}


////////////////////////////////////Loan Documentation End////////////////////////////////////////