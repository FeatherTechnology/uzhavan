let loanidResponse = {};
$(document).ready(function () {
    //Move Loan Entry  
    // Loan Entry Tab Change Radio buttons
    $(document).on('click', '#add_loan, #back_btn', function () {
        swapTableAndCreation();
    });


    $('#back_btn').click(function () {
        getcusUpdateTable();
        clearCusProfileForm('1');//To Clear Customer Profile
        $('#document_type_div').hide();
        $('.signed-div').hide();
        $('#cheque_info_card').hide();
        $('#document_info_card').hide();
        $('#mortgage_info_card').hide();
        $('#endorsement_info_card').hide();
        $('#gold_info_card').hide();

    });

    $(document).on('click', '.edit-cus-update', function () {
        let id = $(this).attr('value');
        let cus_id = $(this).data('cus-id');
        $('#customer_profile_id').val(id);

        swapTableAndCreation();
        editCustmerProfile(id, cus_id)
    });

    $('input[name=update_type]').click(function () {
        let updateType = $(this).val();
        if (updateType == 'cus_profile') {
            $('#cus_update_customer_profile').show(); $('#update_documentation').hide();

        } else if (updateType == 'loan_doc') {
            $('#cus_update_customer_profile').hide(); $('#update_documentation').show();
            $('#document_type_div').hide();
            $('.signed-div').hide();
            $('#cheque_info_card').hide();
            $('#document_info_card').hide();
            $('#mortgage_info_card').hide();
            $('#endorsement_info_card').hide();
            $('#gold_info_card').hide();

        }
    })
    $('.selector-item_label').click(function () {
        var radioId = $(this).attr('for');
        $('#' + radioId).prop('checked', true);
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

    $(document).on('click', '#documentation', function (event) {
        event.preventDefault();
        let cus_id = $('#cus_id_upd').val();
        OnLoadFunctions(cus_id)
    })
    $('#cus_name').on('blur', function () {
        let aadhar_num = $('#aadhar_nums').val().trim().replace(/\s/g, '');
        let customerName = $('#cus_name').val().trim();
        if (aadhar_num && customerName) {
            addPropertyHolder(aadhar_num, customerName);
        }
        else {
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
        var data = ['fam_name', 'fam_relationship', 'fam_live','fam_mobile']

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
        let cus_id = $('#auto_gen_cus_id').val();;
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
    $(document).on('click', '#add_kyc', function () {
        let customerID = $('#cus_id_upd').val().trim().replace(/\s/g, '');
        getLoanId('#kycloan_id');
        getKycTable();
        fetchProofList();
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
            getFamilyMember('Select Family Member', '#fam_mem');
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
        let bank_upload = $('#bank_upload')[0].files[0]; let bnk_upload = $('#bnk_upload').val();
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

            var formData = new FormData();

            formData.append("cus_id", cus_id);
            formData.append("cus_profile_id", cus_profile_id);
            formData.append("bank_upload", bank_upload);
            formData.append("bnk_upload", bnk_upload);
            formData.append("bank_name", bank_name);
            formData.append("branch_name", branch_name);
            formData.append("acc_holder_name", acc_holder_name);
            formData.append("acc_number", acc_number);
            formData.append("ifsc_code", ifsc_code);
            formData.append("bank_id", bank_id);

            $.ajax({
                url: "api/loan_entry/submit_bank.php",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    if (response == '1') {
                        swalSuccess('Success', 'Bank Info Added Successfully!');
                    } else {
                        swalSuccess('Success', 'Bank Info Updated Successfully!');
                    }
                    getBankTable();
                }
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
            $('#bnk_upload').val(response[0].upload);
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
        var data = ['proof_of', 'kyc_relationship', 'proof']
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
                url: 'api/update_customer_files/update_kyc_creation_data.php',
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

                    await getFamilyMember('Select Family Member', '#fam_mem'); // Wait until family members are loaded
                    $('#fam_mem').val(response[0].fam_mem);

                    $('.fam_mem_div').show();
                }

                if (response[0].proof_of == 1) {
                    $('#kyc_relationship').val('NIL');
                } else {
                    $('#kyc_relationship').val(response[0].fam_relationship);
                }
                await getLoanId('#kycloan_id'); // Fetch all loan ID options
                $('#kycloan_id').val(response[0].cus_profile_id);

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

    // $("#loan_id").change(function () {
    //     const selectedOption = $(this).find("option:selected");
    //     const guarantorName = selectedOption.data("guarantor");
    //     const guPic = selectedOption.data("gupic");
    //     const guPath = "uploads/loan_entry/gu_pic/";

    //     $('#guarantor_name_edit').val(guarantorName);
    //     // Call function to load and preselect guarantor name
    //     getGuarantorName();
    //     // Set image in <img id="gur_imgshow"> and filename in <input id="gur_pic">
    //     if (guPic) {
    //         $('#gur_pic').val(guPic);
    //         $('#gur_imgshow').attr('src', guPath + guPic);
    //     } else {
    //         $('#gur_pic').val('');
    //         $('#gu_pic').val('');
    //         $('#gur_imgshow').attr('src', 'img/avatar.png');
    //     }
    // });

    $('#guarantor_name').change(function () {
        var guarantorId = $(this).val();
        if (guarantorId) {
            getGrelationshipName(guarantorId);
        } else {
            $('#relationship').val('');
        }
    })

    $('input[name="mobile_whatsapp"]:radio').change(function () {
        let selectedValue = $(this).val();  // Get selected radio value
        let mobileNumber = '';              // Initialize mobile number variable

        // Get the corresponding mobile number based on selected radio value
        if (selectedValue === 'mobile1') {
            mobileNumber = $('#mobile1').val();
        } else if (selectedValue === 'mobile2') {
            mobileNumber = $('#mobile2').val();
        }

        // Set the selected mobile number in the WhatsApp field
        $('#whatsapp_no').val(mobileNumber);

    });


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
        let occ_income = $('#occ_income').val().replace(/,/g, '');
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
        let monthly_income = $('#monthly_income').val().replace(/,/g, '');
        let other_income = $('#other_income').val().replace(/,/g, '');
        let support_income = $('#support_income').val().replace(/,/g, '');
        let commitment = $('#commitment').val().replace(/,/g, '');
        let monthly_due_capacity = $('#monthly_due_capacity').val().replace(/,/g, '');
        let customer_profile_id = $('#customer_profile_id').val();
        // let loan_id = $('#loan_id').val();

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

        data = ['cus_name', 'gender', 'mobile1', 'area_confirm', 'area', 'line', 'how_to_know', 'monthly_income', 'other_income', 'support_income', 'commitment', 'monthly_due_capacity', 'cus_limit', 'guarantor_name'];

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
            entryDetail.append('customer_profile_id', customer_profile_id);

            // AJAX call to submit data
            $.ajax({
                url: 'api/update_customer_files/update_cus_profile.php',
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
                        $('html, body').animate({
                            scrollTop: $('.page-content').offset().top
                        }, 3000);
                    }
                    $('#customer_profile_id').val(response.last_id);
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

    
    
    $('#add_cus_label').click(function () {
        getFeedbackAccess();
    });

    // $('.feedbackEditBtn').click(function () {
    $(document).on('click', '.feedbackEditBtn', function () {
        let id = $(this).attr('value');
        console.log("id",id);
        $.post('api/loan_entry/get_feedback_name.php', {id:id }, function (response) {
            $('#feedbackname').val(response[0].feedback_name);
            $('#fedbackname_id').val(response[0].id);
    }, 'json'); 
    });

    $(document).on('click', '.feedbackNameDeleteBtn', function () {
        let id = $(this).attr('value');
        swalConfirm('Delete', 'Are you sure you want to delete this  Feedback Name ?', deleteFeedbackName, id);
       
    });

    $('#submit_feedback_lable').click(function () {
        event.preventDefault();
        //Validation
        let feedbackname = $('#feedbackname').val();
        let fedbackname_id = $('#fedbackname_id').val();
        if (feedbackname == '') {
            swalError('Warning', 'Kindly Fill the Feedback Name');
            return false;
        }
        var data = ['feedbackname']
        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        if (isValid) {
            $.post('api/loan_entry/submit_feedback_name.php', { feedbackname, fedbackname_id }, function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'FeedBack Name Added Successfully!');
                } else if (response == '2') {
                    swalSuccess('Success', 'FeedBack Name Updated Successfully!')
                } else if(response == '3'){
                     swalError('Warning', 'Feedback name already exists');
                }
                 else {
                    swalError('Error', 'Error Occurred!')
                }
                getFeedBackLabelList();
                $("#feedbackname").val('');
                $("#fedbackname_id").val('');
            });
        }
    })

}); ///////////////////////////////////////////////////////////////// Customer Profile - Document END ////////////////////////////////////////////////////////////////////

//On Load function 
$(function () {
    getcusUpdateTable();
    nameFormatter('#cus_name');
});

function getcusUpdateTable() {
    serverSideTable('#cus_update_table', '', 'api/update_customer_files/update_customer_list.php');
}

function swapTableAndCreation() {
    if ($('.update_table_content').is(':visible')) {
        $('.update_table_content').hide();
        $('#add_loan').hide();
        $('#update_content').show();
        $('#back_btn').show();

    } else {
        $('.update_table_content').show();
        $('#add_loan').show();
        $('#update_content').hide();
        $('#back_btn').hide();
        $('#customer_profile').trigger('click')
    }
}

function clearCusProfileForm(type) {
    // Clear input fields except those with IDs 'loan_id_calc' and 'loan_date_calc'
    $('#cus_update_customer_profile').find('input').each(function () {
        let id = $(this).attr('id');
        if (type == '1') {
            cusid = '';
            $('.personal_info_disble').val('');
            $('#submit_personal_info').attr('disabled', false);
        } else if (type == '2') {
            cusid = 'customer_profile_id';
        }
        $('#cus_update_customer_profile input').css('border', '1px solid #cecece');
        $('#cus_update_customer_profile select').css('border', '1px solid #cecece');
        if (id !== cusid && id != 'cus_id' && id != 'cus_name' && id != 'dob' && id != 'mobile1' && id != 'mobile2' && id != 'pic' && id != 'age' && id != 'per_pic') {
            $(this).val('');
        }
    });

    // Clear all textarea fields within the specific form
    $('#cus_update_customer_profile').find('textarea').val('');

    //clear all upload inputs within the form.
    $('#cus_update_customer_profile').find('input[type="file"]').val('');

    // Reset all select fields within the specific form
    $('#cus_update_customer_profile').find('select').each(function () {
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
    $('#mobile_check').append('<option class="custom-option" value="' + mobile + '">' + mobile + '</option>');
}

function removeCustomerMobile() {
    $('#mobile_check .custom-option').remove();
}

function updateCustomerID(id) {
    $('#aadhar_check .custom-option').remove();
    $('#aadhar_check').append('<option class="custom-option" value="' + id + '">' + id + '</option>');
}

function removeCustomerID() {
    $('#aadhar_check .custom-option').remove();
}

function updateCustomerName(name) {
    $('#name_check .custom-option').remove();
    $('#name_check').append('<option class="custom-option" value="' + name + '">' + name + '</option>');
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
    let cus_id = $('#cus_id_upd').val();
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
    let cus_id = $('#cus_id_upd').val();
    let aadhar_num = $('#aadhar_nums').val().trim().replace(/\s/g, '');
    let cus_name = $('#cus_name').val();
    let customerMobile = $('#mobile1').val()
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
function checkAdditionalRenewal(cus_id) {
    $.post('api/loan_entry/check_additional_renewal.php', { cus_id }, function (response) {
        $('#cus_status').val(response);
    }, 'json');
}
function getFamilyDelete(id) {
    let cus_id = $('#cus_id_upd').val();
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
function getGuarantorName() {
    let cus_id = $('#cus_id_upd').val().replace(/\s/g, '');
    $.post('api/loan_entry/get_guarantor_name.php', { cus_id }, function (response) {
        let appendGuarantorOption = '';
        appendGuarantorOption += "<option value=''>Select Guarantor Name</option>";
        $.each(response, function (index, val) {
            let selected = '';
            let editGId = $('#guarantor_name_edit').val();
            if (val.id == editGId) {
                selected = 'selected';
            }
            appendGuarantorOption += "<option value='" + val.id + "' " + selected + ">" + val.fam_name + "</option>";
        });
        $('#guarantor_name').empty().append(appendGuarantorOption);
    }, 'json');
}

function getLoanId(selector) {
    return new Promise((resolve, reject) => {
        let cus_id = $('#cus_id_upd').val();

        // Send POST request to fetch KYC-related loan IDs
        $.post('api/update_customer_files/get_kyc_loan.php', { cus_id }, function (response) {
            let appendLoanIdOption = "<option value=''>Select Loan ID</option>";

            if (response.length === 0) {
                loanidResponse = "false"; // No loan IDs found
            } else {
                // Loop through each returned record and build <option> tags
                $.each(response, function (index, val) {
                    appendLoanIdOption += `<option value="${val.cus_profile_id}">${val.loan_id}</option>`;
                });

                loanidResponse = "true"; // Loan IDs found
            }

            // Update the selector with the new options
            $(selector).empty().append(appendLoanIdOption);

            resolve(); // Resolve the promise after populating
        }, 'json')
            .fail((jqXHR, textStatus, errorThrown) => {
                reject(`Request failed: ${textStatus}`); // Handle any request failure
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
    let cus_id = $('#cus_id_upd').val();

    $.post('api/update_customer_files/update_property_creation_list.php', { cus_id }, function (response) {
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
    let cus_id = $('#cus_id_upd').val();

    $.post('api/update_customer_files/update_property_creation_list.php', { cus_id }, function (response) {
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
    let cus_id = $('#cus_id_upd').val();
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
    let cus_id = $('#cus_id_upd').val();
    //let cus_profile_id=$('#customer_profile_id').val();
    $.post('api/update_customer_files/update_bank_creation_list.php', { cus_id }, function (response) {
        var columnMapping = [
            'sno',
            'bank_name',
            'branch_name',
            'acc_holder_name',
            'acc_number',
            'ifsc_code',
            'upload',
            'action'
        ];
        appendDataToTable('#bank_creation_table', response, columnMapping);
        setdtable('#bank_creation_table');
        $('#bank_form input').val('');
        $('#bank_form input').css('border', '1px solid #cecece');

    }, 'json')
}

function getBankInfoTable() {
    let cus_id = $('#cus_id_upd').val();
    // let cus_profile_id=$('#customer_profile_id').val()
    $.post('api/update_customer_files/update_bank_creation_list.php', { cus_id }, function (response) {
        var columnMapping = [
            'sno',
            'bank_name',
            'branch_name',
            'acc_holder_name',
            'acc_number',
            'ifsc_code',
            'upload',
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
    let cus_id = $('#cus_id_upd').val();
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/update_customer_files/customer_delete_kyc_creation.php', { id, cus_id, cus_profile_id }, function (response) {
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
    let cus_id = $('#cus_id_upd').val();
    $.post('api/update_customer_files/update_kyc_creation_list.php', { cus_id }, function (response) {
        var columnMapping = [
            'sno',
            'loan_id',
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
    let cus_id = $('#cus_id_upd').val();
    $.post('api/update_customer_files/update_kyc_creation_list.php', { cus_id }, function (response) {
        var columnMapping = [
            'sno',
            'loan_id',
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
                //$('input').css('border', '1px solid #cecece');
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


// function fingerprintTable() {
//     var cus_name = $('#cus_name').val();
//     var cus_id = $('#auto_gen_cus_id').val();
//     $.ajax({
//         url: 'api/loan_entry/getNamesForFingerprint.php',
//         data: { 'cus_name': cus_name, 'cus_id': cus_id },
//         type: 'post',
//         cache: false,
//         success: function (html) {
//             $('.fingerprintTable').empty()
//             $('.fingerprintTable').html(html)

//             $('.scanBtn').click(function () {
//                 var hand = $(this).prev().val();
//                 var name = $(this).parent().prev().find('input[id="name_print"]').val(); var adhar = $(this).parent().prev().prev().find('input[id="adhar_print"]').val();
//                 if (hand == '') { //prevent if hand is not selected
//                     $(this).prev().css('border-color', 'red');
//                 } else {
//                     $(this).prev().css('border-color', '#009688')

//                     showOverlay();//loader start

//                     $(this).attr('disabled', true);

//                     setTimeout(() => {
//                         var quality = 60; //(1 to 100) (recommended minimum 55)
//                         var timeout = 10; // seconds (minimum=10(recommended), maximum=60, unlimited=0)
//                         var res = CaptureFinger(quality, timeout);
//                         if (res.httpStaus) {
//                             if (res.data.ErrorCode == "0") {
//                                 let fdata = res.data.AnsiTemplate;
//                                 $(this).next().val(fdata); // Take ansi template that is the unique id which is passed by sensor
//                                 storeFingerprints(fdata, hand, adhar, name);//stores the current finger data in database
//                             }//Error codes and alerts below
//                             else if (res.data.ErrorCode == -1307) {
//                                 alert('Connect Your Device');
//                                 $(this).removeAttr('disabled');
//                             } else if (res.data.ErrorCode == -1140 || res.data.ErrorCode == 700) {
//                                 alert('Timeout');
//                                 $(this).removeAttr('disabled');
//                             } else if (res.data.ErrorCode == 720) {
//                                 alert('Reconnect Device');
//                                 $(this).removeAttr('disabled');
//                             } else if (res.data.ErrorCode == 730) {
//                                 alert('Capture Finger Again');
//                                 $(this).removeAttr('disabled');
//                             } else {
//                                 alert('Error Code:' + res.data.ErrorCode);
//                                 $(this).removeAttr('disabled');
//                             }
//                         }
//                         else {
//                             alert(res.err);
//                         }
//                         // Hide the loading animation and remove blur effect from the body
//                         hideOverlay();//loader stop

//                     }, 700)
//                 }
//             })
//         }
//     })

//     function storeFingerprints(fdata, hand, cus_id, cus_name) {//stores the current finger data in database
//         $.post('api/loan_entry/storeFingerprints.php', { 'fdata': fdata, 'hand': hand, 'cus_id': cus_id, 'cus_name': cus_name }, function (response) {
//             if (response.includes('Successfully')) {
//                 Swal.fire({
//                     title: response, icon: 'success', confirmButtonColor: '#009688'
//                 })
//             }
//         }, 'json')
//     }
// }
function fingerprintTable() {//To Get family member's name are required for scanning fingerprint
  let aadhar_nums = $('#aadhar_nums').val();
  let cus_id = $('#auto_gen_cus_id').val();
  $.ajax({
    url: 'api/loan_entry/getNamesForFingerprint.php',
    data: { cus_id ,aadhar_nums},
    type: 'post',
    cache: false,
    success: function (html) {
      $('.fingerprintTable').html(html);
    }
  })
}
function getLoanCount(cus_id,profile_id) {
    $.ajax({
        url: 'api/loan_entry/get_loan_count.php',
        type: 'POST',
        data: { cus_id: cus_id , profile_id:profile_id},
        dataType: 'json',
        cache: false,
        success: function (response) {
            $('#loan_count').val(response.loan_count);
            let formattedDate = response.first_loan_date;
            $('#first_loan_date').val(formattedDate);
            $('#travel_with_company').val(response.travel);

    //         $('#loan_count').val(response.loan_count)
    //                 .prop('readonly', response.loan_count !== '');

    // $('#first_loan_date').val(response.first_loan_date)
    //                      .prop('readonly', response.first_loan_date !== '');

        },
    });
}
async function editCustmerProfile(id, cus_id) {
    try {
        const response = await $.post('api/update_customer_files/update_profile_data.php', { cus_id: cus_id }, null, 'json');

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
        $('#cus_id_upd').val(data.cus_id);
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
        // await getLoanId('#loan_id')
        getFamilyInfoTable();
        fingerprintTable();
        getPropertyInfoTable();
        getBankInfoTable();
        getKycInfoTable();
        getFeedBackInfoTable();
        // $('#loan_id').val(id);
        // $('#loan_id').trigger('change');
        $('#guarantor_name').val(data.guarantor_name).trigger('change');

        $('#area').trigger('change');
        getLoanCount(data.cus_id,id);

        // Show/hide based on customer data
        if (data.cus_data === 'Existing') {
            $('#checking_hide').show();
            $('.cus_status_div').show();
            $('#data_checking_div').show();
            checkAdditionalRenewal(data.cus_id);
        } else {
            $('.cus_status_div').hide();
            $('#checking_hide').hide();
            $('#data_checking_table_div').hide();
        }


        // Set customer picture
        let path = "uploads/loan_entry/cus_pic/";
        $('#per_pic').val(data.pic);
        $('#imgshow').attr('src', path + data.pic);

        // Disable editing
        $('.personal_info_disble').attr("disabled", true);
        $('#submit_personal_info').attr('disabled', true);

    } catch (error) {
        console.error('Error in editCustmerProfile:', error);
    }
}

///////////////////////////////////////////////Customer Profile js End//////////////////////////////
//////////////////////////////////////////////////////////////// Documentation START //////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    $(document).on('click', '.doc-update', function () {
        let id = $(this).attr('value'); //Customer Profile id From List page.
        $('#customer_profile_id').val(id);
        let cusID = $(this).attr('data-id'); //Cus id From List Page.
        $('#cus_id_upd').val(cusID);
        $('#document_type_div').show();
        $('#document_type').val('');
        $('#cheque_info_card').hide();
        $('.signed-div').hide();
        $('#document_info_card').hide();
        $('#mortgage_info_card').hide();
        $('#endorsement_info_card').hide();
        $('#gold_info_card').hide();
        getSignedDocInfoTable();
        getChequeInfoTable();
        getDocInfoTable();
        getMortInfoTable();
        getEndorsementInfoTable();
        getGoldInfoTable();
    });


    $('#document_type').change(function () {
        var documentType = $(this).val();
        // Hide all    
        $('.signed-div').hide();
        $('#cheque_info_card').hide();
        $('#document_info_card').hide();
        $('#mortgage_info_card').hide();
        $('#endorsement_info_card').hide();
        $('#gold_info_card').hide();
        if (documentType == '1') {
            $('.signed-div').show();
        }
        else if (documentType == '2') {
            $('#cheque_info_card').show();
        } else if (documentType == '3') {
            $('#document_info_card').show();
        } else if (documentType == '4') {
            $('#mortgage_info_card').show();
        }
        else if (documentType == '5') {
            $('#endorsement_info_card').show();
        }
        else if (documentType == '6') {
            $('#gold_info_card').show();
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
        let customer_profile_id = $('#customer_profile_id').val();
        let cus_id = $('#cus_id_upd').val();

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
    $('#signInfoBtn').click(function (event) {
        event.preventDefault();

        // Validation
        let cus_profile_id = $('#customer_profile_id').val();
        let cus_id = $('#cus_id_upd').val();
        let doc_name = $("#doc_name").val();
        let sign_type = $("#sign_type").val();
        let signType_relationship = $("#signType_relationship").val();
        let doc_Count = $("#doc_Count").val();
        let signedID = $("#signedID").val();

        let data = ['doc_name', 'sign_type', 'doc_Count'];
        let isValid = true;

        data.forEach(function (entry) {
            let fieldIsValid = validateField($('#' + entry).val(), entry);
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
            let signedInfo = new FormData();

            // Append values to FormData
            signedInfo.append('doc_name', doc_name);
            signedInfo.append('sign_type', sign_type);
            signedInfo.append('signType_relationship', signType_relationship);
            signedInfo.append('doc_Count', doc_Count);
            signedInfo.append('cus_id', cus_id);
            signedInfo.append('cus_profile_id', cus_profile_id);
            signedInfo.append('signedID', signedID);

            // Handle file inputs
            let sign_upload = $('#sign_upload')[0]?.files;
            let sign_upload_edit = $('#sign_upload_edit').val() || '';

            signedInfo.append('sign_upload_edit', sign_upload_edit);

            if (sign_upload && sign_upload.length > 0) {
                for (let i = 0; i < sign_upload.length; i++) {
                    signedInfo.append('sign_upload[]', sign_upload[i]);
                }
            }

            // Send using AJAX
            $.ajax({
                url: 'api/loan_entry/signed_doc_info_submit.php',
                type: 'POST',
                data: signedInfo,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response == '1') {
                        swalSuccess('Success', 'Signed Doc Info Added Successfully!');
                    } else if (response == '2') {
                        swalSuccess('Success', 'Signed Doc Info Updated Successfully!');
                    } else {
                        swalError('Error', 'Error Occurred');
                    }

                    getSignedDocTable();
                    $('#signedID').val('');
                    $("#cus_name_div").hide();
                    $("#guar_name_div").hide();
                    $("#relation_doc").hide();
                },
                error: function () {
                    swalError('Error', 'Request Failed. Please try again.');
                }
            });
        }
    });


    $(document).on('click', '.signdocActionBtn', function () {
        let id = $(this).attr('value');

        $.post('api/loan_entry/signeddoc_info_data.php', { id }, function (response) {
            const signedDoc = response.signedDoc;

            // Populate form fields
            $("#sign_type").val(signedDoc.sign_type);
            $("#signedID").val(signedDoc.id);
            $("#doc_name").val(signedDoc.doc_name);
            $("#doc_Count").val(signedDoc.doc_Count);

            // Reset relationship dropdown
            $("#signType_relationship").empty().append(`<option value=''>Select Relationship</option>`);

            // Show/hide based on sign_type
            if (signedDoc.sign_type === "0") {
                $("#cus_name_div").show();
                $("#signType_cus_name").val(signedDoc.signType_cus_name);
                $("#guar_name_div").hide();
                $("#relation_doc").hide();
            } else if (signedDoc.sign_type === "1") {
                $("#cus_name_div").hide();
                $("#guar_name_div").show();
                $("#guar_name").val(signedDoc.guar_name);
                $("#relation_doc").hide();
            } else if (signedDoc.sign_type === "2" || signedDoc.sign_type === "3") {
                $("#cus_name_div").hide();
                $("#guar_name_div").hide();
                $("#relation_doc").show();

                let selectedId = signedDoc.selected_relationship;
                let familyList = signedDoc.holder_name;

                familyList.forEach(member => {
                    let isSelected = selectedId == member.id ? 'selected' : '';
                    $("#signType_relationship").append(
                        `<option value='${member.id}' ${isSelected}>${member.name} - ${member.relationship}</option>`
                    );
                });
            }

            // Populate uploaded file names
            if (response.upd && response.upd.length > 0) {
                let uploadFiles = response.upd.map(fileObj => fileObj.uploads).filter(Boolean);
                $('#sign_upload_edit').val(uploadFiles.join(','));
            } else {
                $('#sign_upload_edit').val('');
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
            let cus_profile_id = $('#customer_profile_id').val();
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
        let cus_id = $('#cus_id_upd').val();
        let cq_holder_type = $('#cq_holder_type').val();
        let cq_holder_name = $("#cq_holder_name").val();
        let cq_holder_id = $("#cq_holder_name").attr('data-id');
        let cq_relationship = $('#cq_relationship').val();
        let cq_bank_name = $('#cq_bank_name').val();
        let cheque_count = $('#cheque_count').val();
        let cq_upload = $('#cq_upload')[0].files;
        let cq_upload_edit = $('#cq_upload_edit').val();
        let customer_profile_id = $('#customer_profile_id').val();
        let cheque_info_id = $('#cheque_info_id').val();

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
            chequeInfo.append('cq_upload', cq_upload)
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
                success: function (response) {
                    if (response == '1') {
                        swalSuccess('Success', 'Cheque Info Updated Successfully')
                    } else if (response == '2') {
                        swalSuccess('Success', 'Cheque Info Added Successfully')
                    } else {
                        swalSuccess('Alert', 'Failed')
                    }
                    getChequeCreationTable();
                    $('#clear_cheque_form').trigger('click');
                    $('#cheque_info_id').val('');
                    $('.cq_fam_member').hide();
                }
            });
        }
    });

    $(document).on('click', '.chequeActionBtn', async function () {
        let id = $(this).attr('value');

        try {
            const response = await new Promise((resolve, reject) => {
                $.post('api/loan_issue_files/cheque_info_data.php', { id }, function (data) {
                    resolve(data);
                }, 'json').fail(reject);
            });

            let res = response.result[0];
            $('#cq_holder_type').val(res.holder_type);
            $('#cq_holder_name').val(res.holder_name);
            $('#cq_holder_name').attr('data-id', res.holder_id);
            $('#cq_relationship').val(res.relationship);
            $('#cq_bank_name').val(res.bank_name);
            $('#cheque_count').val(res.cheque_cnt);
            $('#cheque_info_id').val(res.id);

            if (res.holder_type == '3') {
                $('.cq_fam_member').show();

                await getFamilyMember('Select Family Member', '#cq_fam_mem'); // Wait for family list to load

                $('#cq_fam_mem').val(res.holder_id); // Set value after load
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
                $('#cheque_no').append(
                    `<div class='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12'>
                    <div class='form-group'>
                        <input type='number' class='form-control chequeno' name='chequeno[]' value='${cheque['cheque_no']}'/>
                    </div>
                </div>`
                );
            }

        } catch (err) {
            console.error('Cheque info load failed:', err);
        }
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
        let cus_id = $('#cus_id_upd').val();
        let customer_profile_id = $('#customer_profile_id').val();

        var data = ['document_name', 'doc_type', 'doc_holder_name', 'doc_relationship']

        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        if (doc_upload === undefined && doc_upload_edit === '') {
            let isUploadValid = validateField('', 'doc_upload');
            let isHiddenValid = validateField('', 'doc_upload_edit');
            if (!isUploadValid || !isHiddenValid) {
                isValid = false;
            }
            else {
                $('#doc_upload').css('border', '1px solid #cecece');
                $('#doc_upload_edit').css('border', '1px solid #cecece');
            }
        }
        else {
            $('#doc_upload').css('border', '1px solid #cecece');
            $('#doc_upload_edit').css('border', '1px solid #cecece');
        }

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
        let cus_id = $('#cus_id_upd').val();
        let customer_profile_id = $('#customer_profile_id').val();
        let mort_upload = $('#mort_upload')[0].files[0];
        let mort_upload_edit = $('#mort_upload_edit').val();

        var data = ['property_holder_name', 'mort_relationship', 'mort_property_details', 'mortgage_name', 'mort_designation', 'mortgage_no', 'reg_office', 'mortgage_value']

        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        if (mort_upload === undefined && mort_upload_edit === '') {
            let isUploadValid = validateField('', 'mort_upload');
            let isHiddenValid = validateField('', 'mort_upload_edit');
            if (!isUploadValid || !isHiddenValid) {
                isValid = false;
            }
            else {
                $('#mort_upload').css('border', '1px solid #cecece');
                $('#mort_upload').css('border', '1px solid #cecece');
            }
        }
        else {
            $('#mort_upload').css('border', '1px solid #cecece');
            $('#mort_upload_edit').css('border', '1px solid #cecece');
        }

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
        let cus_id = $('#cus_id_upd').val();
        let customer_profile_id = $('#customer_profile_id').val();
        var data = ['owner_name', 'owner_relationship', 'vehicle_details', 'endorsement_name', 'key_original', 'rc_original']

        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        if (endorsement_upload === undefined && endorsement_upload_edit === '') {
            let isUploadValid = validateField('', 'endorsement_upload');
            let isHiddenValid = validateField('', 'endorsement_upload_edit');
            if (!isUploadValid || !isHiddenValid) {
                isValid = false;
            }
            else {
                $('#endorsement_upload').css('border', '1px solid #cecece');
                $('#endorsement_upload_edit').css('border', '1px solid #cecece');
            }
        }
        else {
            $('#endorsement_upload').css('border', '1px solid #cecece');
            $('#endorsement_upload_edit').css('border', '1px solid #cecece');
        }

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
            'cus_id': $('#cus_id_upd').val(),
            'customer_profile_id': $('#customer_profile_id').val(),
            'gold_type': $('#gold_type').val(),
            'purity': $('#gold_purity').val(),
            'weight': $('#gold_weight').val(),
            'value': $('#gold_value').val(),
            'id': $('#gold_info_id').val(),
        };
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
    / ///////////////////////////////////////////////////////////////////Gold info END ////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////Document Print START ////////////////////////////////////////////////////////////////////////////
    $(document).on('click', '.doc-print', function () {
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

}); ///////////////////////////////////////////////////////////////// Documentation - Document END ////////////////////////////////////////////////////////////////////

//On Load function 
$(function () {
});

function getLoanListTable(cus_id, pending_sts, od_sts, due_nil_sts, balAmnt) {
    // let cus_id = $('#cus_id_upd').val();
    $.post('api/update_customer_files/update_document_list.php', { cus_id, pending_sts, od_sts, due_nil_sts, balAmnt }, function (response) {
        var columnMapping = [
            'sno',
            'loan_id',
            'loan_category',
            'loan_date',
            'loan_amount',
            'closed_date',
            'c_sts',
            'sub_status',
            'action'
        ];
        appendDataToTable('#loan_list_table', response, columnMapping);
        setdtable('#loan_list_table');
        //Dropdown in List Screen
        setDropdownScripts();
    }, 'json');
}

function OnLoadFunctions(cus_id) {
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
            if (response.follow_cus_sts != null) {
                for (var i = 0; i < response['pending_customer'].length; i++) {
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
        getLoanListTable(cus_id, pending_sts, od_sts, due_nil_sts, balAmnt)
        hideOverlay();//loader stop
    });
}//Auto Load function END


function getFamilyMember(optn, selector) {
    return new Promise((resolve, reject) => {
        let cus_id = $('#cus_id_upd').val();
        const holderType = $('#cq_holder_type').val(); // Get current holder type
        const kyccholderType = $('#proof_of').val(); // Get current holder type
        $.post('api/loan_issue_files/get_guarantor.php', { cus_id }, function (response) {
            if (!Array.isArray(response)) {
                reject("Invalid response format");
                return;
            }

            let appendOption = `<option value=''>${optn}</option>`; // Default option

            // Loop through response to build options
            $.each(response, function (index, val) {
                if (val.type === 'Customer' && holderType !== '3' && kyccholderType !== '2') {
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
            "cheque_no",
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
        if (response && response.length > 0) {
            // Show the cheque div and populate the table if the condition is met
            $('#cheque_info_card').show();
        }
        let chequeColumn = [
            "sno",
            "holder_type",
            "holder_name",
            "relationship",
            "bank_name",
            "cheque_cnt",
            "cheque_no",
            "upload",
            "availability",
            "info"
        ]
        appendDataToTable('#cheque_info_table', response, chequeColumn);
        setdtable('#cheque_info_table');
        setTempDocumentEvents();
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
function getSignedDocTable() {
    let cus_profile_id = $('#customer_profile_id').val();
    $.post('api/loan_entry/get_signeddoc_info_list.php', { cus_profile_id }, function (response) {
        let signColumn = [
            "sno",
            "doc_name",
            "sign_type",
            "signed_name",
            "doc_Count",
            "upload",
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
        $("#sign_upload_edit").val("");
        $('#sign_upload').val('');
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
            "doc_Count",
            "upload",
            "availability",
            "info"
        ]
        appendDataToTable('#signDocResetTable', response, signColumn);
        setdtable('#signDocResetTable');
        setTempDocumentEvents();
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
            // Show the cheque div and populate the table if the condition is met
            $('#document_info_card').show();
        }
        let docColumn = [
            "sno",
            "doc_name",
            "doc_type",
            "holder_name",
            "relationship",
            "upload",
            "availability",
            "info"
        ]
        appendDataToTable('#document_info', response, docColumn);
        setdtable('#document_info');
        setTempDocumentEvents();
    }, 'json');
}

function deleteDocInfo(id) {
    $.post('api/loan_issue_files/delete_doc_info.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('success', 'Doc Info Deleted Successfully');
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
            // Show the cheque div and populate the table if the condition is met
            $('#mortgage_info_card').show();
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
            "upload",
            "availability",
            "info"
        ]
        appendDataToTable('#mortgage_info', response, mortgageColumn);
        setdtable('#mortgage_info');
        setTempDocumentEvents();
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
            // Show the cheque div and populate the table if the condition is met
            $('#endorsement_info_card').show();
        }
        let endorsementColumn = [
            "sno",
            "holder_name",
            "relationship",
            "vehicle_details",
            "endorsement_name",
            "key_original",
            "rc_original",
            "upload",
            "availability",
            "info"
        ]
        appendDataToTable('#endorsement_info', response, endorsementColumn);
        setdtable('#endorsement_info');
        setTempDocumentEvents();
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
            // Show the cheque div and populate the table if the condition is met
            $('#gold_info_card').show();
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

function setTempDocumentEvents() {

    $('.temp-take-out, .temp-take-in').off('click');
    $('.temp-take-out, .temp-take-in').click(function () {// to take values from table on click of buttons
        let table_id = $(this).data('tableid');
        let doc_type = $(this).data('doc');

        let doc_obj = {//set of document path
            'sign': 'uploads/loan_issue/signed_info/',
            'cheque': 'uploads/loan_issue/cheque_info/',
            'document': 'uploads/loan_issue/doc_info/',
            'mortgage': 'uploads/loan_issue/mortgage_info/',
            'endorsement': 'uploads/loan_issue/endorsement_info/'
        }
        let doc_path = doc_obj[doc_type];//assign path accoding to document type
        let row = $(this).closest('tr');

        let doc_link = $(this).parent().prev().prev().children().text();// to take document name
        let doc_name = '';

        // pick correct column based on table type
        if (doc_type === 'mortgage') {
            doc_name = row.find('td:eq(4)').text(); // Mortgage Name column index
        } else if (doc_type === 'endorsement') {
            doc_name = row.find('td:eq(4)').text(); // Endorsement Name column index
        } else if (doc_type === 'document') {
            doc_name = row.find('td:eq(1)').text(); // Document Name column index
        } else if (doc_type === 'sign') {
            doc_name = row.find('td:eq(1)').text(); // Doc Name column index
        } else if (doc_type === 'cheque') {
            doc_name = "Cheque"; // fixed name
        }

        $('#doc_name_tempout, #doc_name_tempin').val(doc_name);
        $('#doc_tempout_link, #doc_tempin_link').parent().attr('href', doc_path + doc_link);// to set the path of file

        $('#doc_tempout_link, #doc_tempin_link').val(doc_link);
        $('#table_id_tempout, #table_id_tempin').val(table_id);
        $('#table_name_tempout, #table_name_tempin').val(doc_type);
    })

    $('.closetempout, .closetempin').off('click');

    $('.closetempout, .closetempin').click(function () {

        // Clear values except date fields
        $("#tempoutform").find("input, select").not('#tempout_date').val("");
        $("#tempinform").find("input, select").not('#tempin_date').val("");

        // Reset border color for all inputs/selects
        $("#tempoutform").find("input, select").css('border', '1px solid #cecece');
        $("#tempinform").find("input, select").css('border', '1px solid #cecece');
    })

    $('#tempout_submit, #tempin_submit').off('click');
    $('#tempout_submit, #tempin_submit').click(function () {

        let type = $(this).data('type');
        if (type == 'take-out') {
            submitForTakeOut();
        } else if (type == 'take-in') {
            submitForTakeIn();
        }
        function submitForTakeOut() {
            let temp_person = $('#tempout_person').val();
            let temp_purpose = $('#tempout_purpose').val();
            let temp_remarks = $('#tempout_remarks').val();
            let table_id = $('#table_id_tempout').val();
            let table_name = $('#table_name_tempout').val();

            var data = ['tempout_purpose', 'tempout_person', 'tempout_remarks'];
            var isValid = true;
            data.forEach(function (entry) {
                var fieldIsValid = validateField($('#' + entry).val(), entry);
                if (!fieldIsValid) {
                    isValid = false;
                }
            });

            if (isValid) {
                swalConfirm('Are you sure', 'To take this Document Out?',
                    function () {
                        $.ajax({
                            url: 'api/update_customer_files/submitTempDocument.php',
                            data: { "type": 'out', "table_id": table_id, "table_name": table_name, "temp_person": temp_person, "temp_purpose": temp_purpose, "temp_remarks": temp_remarks },
                            type: 'post',
                            dataType: 'json',
                            cache: false,
                            success: function (response) {
                                if (response.includes('Successfully')) {
                                    swalSuccess('success', 'Document Taken Out Successfully');
                                    getSignedDocInfoTable();
                                    getChequeInfoTable();
                                    getDocInfoTable();
                                    getMortInfoTable();
                                    getEndorsementInfoTable();
                                    $('.closetempout').trigger('click');
                                } else if (response.includes('Error')) {
                                    swalError('Warning', 'Error in Document Taking Out');
                                }
                            }
                        })
                    }
                );
            }
        }

        function submitForTakeIn() {
            let temp_person = $('#tempin_person').val();
            let temp_purpose = $('#tempin_purpose').val();
            let temp_remarks = $('#tempin_remarks').val();
            let table_id = $('#table_id_tempin').val();
            let table_name = $('#table_name_tempin').val();

            var data = ['tempin_purpose', 'tempin_person', 'tempin_remarks'];
            var isValid = true;
            data.forEach(function (entry) {
                var fieldIsValid = validateField($('#' + entry).val(), entry);
                if (!fieldIsValid) {
                    isValid = false;
                }
            });

            if (isValid) {
                swalConfirm('Are you sure', 'To take this Document In?',
                    function () {
                        $.ajax({
                            url: 'api/update_customer_files/submitTempDocument.php',
                            data: { "type": 'in', "table_id": table_id, "table_name": table_name, "temp_person": temp_person, "temp_purpose": temp_purpose, "temp_remarks": temp_remarks },
                            type: 'post',
                            dataType: 'json',
                            cache: false,
                            success: function (response) {
                                if (response.includes('Successfully')) {
                                    swalSuccess('success', 'Document Taken In Successfully');
                                    getSignedDocInfoTable();
                                    getChequeInfoTable();
                                    getDocInfoTable();
                                    getMortInfoTable();
                                    getEndorsementInfoTable();
                                    $('.closetempin').trigger('click');
                                } else if (response.includes('Error')) {
                                    swalError('Warning', 'Error in Document Taking Out');
                                }
                            }
                        })
                    }
                );
            }
        }
    });
}

function getFeedbackAccess() {
    $.post(
        'api/user_creation_files/user_creation_data.php',
        {id:''},
        function(response) {

            if (response.length > 0) {
                let screens = response[0].screens;
                // Convert to array
                let screenArray = screens.split(',');

                if (screenArray.includes('10')) {
                    console.log('jjj');
                    $('#add_cus_feedback').show();
                } else {
                    console.log('gggg');
                    $('#add_cus_feedback').hide();
                }
                getFeedBackTable();
                getFeedbackName();
            }
        },
        'json'
    );
}

function getFeedbackName() {
    $.ajax({
        url: 'api/loan_entry/getFeedbackName.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#feedback_label") .empty() .append("<option value=''>Select Feedback Label</option>");
            for (var i = 0; i < data.length; i++) {
                var feedback_name = data[i]["feedback_name"];
                var id = data[i]["id"];
                $("#feedback_label").append( "<option value='" + id + "'>" + feedback_name + "</option>"
                );
            }

        }
    });
}

function getFeedBackLabelList() {
  $.post('api/loan_entry/get_feedback_name_list.php', { }, function (response) {
        var columnMapping = [
            'sno',
            'feedback_name',
            'action'
        ];
        appendDataToTable('#cus_feedbackListTable', response, columnMapping);
        setdtable('#cus_feedbackListTable');
        
    }, 'json')
}

function deleteFeedbackName(id) {
    $.post('api/loan_entry/delete_feedback_name.php', { id : id }, function (response) {
        if (response == '0') {
            swalError('Warning', 'Feedback Name already used');
        } else if (response == '1') {
            swalSuccess('Success', 'FeedBack Name Deleted Successfully!')
        } else if(response == '2'){
            swalError('Warning', 'Feedback name Delete failed');
        }
        else {
            swalError('Error', 'Error Occurred!')
        }
        getFeedBackLabelList();
        $("#feedbackname").val('');
        $("#fedbackname_id").val('');
    });
}

//////////////////////////////////////////////
