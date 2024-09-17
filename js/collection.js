$(document).ready(function(){
    $(document).on('click','.collection-details',function(){
        let cusId = $(this).attr('value');
        getPersonalInfo(cusId);
        OnLoadFunctions(cusId)
        $('#collection_list').hide();
        $('#back_to_coll_list').show();
        $('#coll_main_container').show();
    });

    $('#back_to_coll_list').click(function(){
        swapTableAndCreation();
    });

    $('#collection_mode').change(function(){
        var collection_mode = $(this).val();
        if(collection_mode != ''){
            getBankNames();
            getChequeList();
        }
        //Clear All Value initially
        $('#trans_id').val('')
        $('#trans_date').val('')
        $('#cheque_no').val('')
        if(collection_mode == '2'){ //Cheque
            $('.cheque').show();
            $('.transaction').show();
            
        }else if(collection_mode >= '3' && collection_mode <= '5'){ // ECS / IMPS/NEFT/RTGS / UPI Transaction
            $('.cheque').hide();
            $('.transaction').show();

        }else if(collection_mode == '1'){ //Cash
            $('.cheque').hide();
            $('.transaction').hide();

        }else{//If nothing chosen
            $('.cheque').hide();
            $('.transaction').hide();
        }
    });

    $(document).on('click','.pay-due', function(){
        let cp_id = $(this).attr('value');
        $('.colls-cntnr').hide();
        $('#back_to_coll_list').hide();
        $('.coll_details').show();
        $('#back_to_loan_list').show();
        // setCurrentDate('#collection_date'); //To set collection date.
        
        {
            // Get today's date
            var today = new Date().toISOString().split('T')[0];
            //Set loan date
            $('#collection_date').val(today);
        }

        //To get the loan category ID to store when collection form submitted
        $.ajax({
            url:'api/collection_files/collection_details.php',
            data: {"cp_id":cp_id},
            dataType:'json',
            type:'post',
            cache: false,
            success:function(response){
                $('#loan_category_id').val(response['loan_category']);

                if(response['collection_access'] =='2'){
                    $('.collection_access_div').hide();

                }else{
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
            data: {'cp_id':cp_id},
            dataType:'json',
            type:'post',
            cache: false,
            success: function(response){
                //Display all value to readonly fields
                $('#tot_amt').val(response['total_amt'])
                $('#paid_amt').val(response['total_paid'])
                $('#bal_amt').val(response['balance'])
                $('#due_amt').val(response['due_amt'])
                $('#pending_amt').val(response['pending'])
                $('#pend_amt').val(response['pending'])
                $('#payable_amt').val(response['payable'])
                $('#payableAmount').val(response['payable'])
                $('#penalty').val(response['penalty'])
                $('#coll_charge').val(response['coll_charge']);

                if(response['loan_type'] == "interest"  ){
                    $('.till-date-int').show();
                    $('#till_date_int').val(response['till_date_int'].toFixed(0))
                    $('#tot_amt').prev().prev().text('Principal Amount')
                    $('#due_amt').prev().prev().text('Interest Amount')

                    $('.emiLoanDiv').hide()
                    $('.intLoanDiv').show()

                    //Show all in span class
                    $('.totspan').text('*')
                    $('.paidspan').text('*')
                    $('.balspan').text('*')
                    $('.pendingspan').text('*')
                    $('.payablespan').text('*')

                }else{
                    $('.till-date-int').hide();
                    $('#till_date_int').val('')
                    $('#tot_amt').prev().prev().text('Total Amount')
                    $('#due_amt').prev().prev().text('Due Amount')

                    $('.emiLoanDiv').show()
                    $('.intLoanDiv').hide()
                    
                    //to get how many due are pending till now
                    var totspan = (response['total_amt'] / response['due_amt']).toFixed(1);
                    var paidspan =(response['total_paid'] / response['due_amt']).toFixed(1);
                    var balspan =(response['balance'] / response['due_amt']).toFixed(1);
                    var pendingspan =(response['pending'] / response['due_amt']).toFixed(1);
                    var payablespan =(response['payable'] / response['due_amt']).toFixed(1);
                    
                    //Show all in span class
                    $('.totspan').text('* (No of Due : '+totspan+')')
                    $('.paidspan').text('* (No of Due : '+paidspan+')')
                    $('.balspan').text('* (No of Due : '+balspan+')')
                    $('.pendingspan').text('* (No of Due : '+pendingspan+')')
                    $('.payablespan').text('* (No of Due : '+payablespan+')')
                }
                
                //To set limitations for input fields
                $('#due_amt_track').on('blur', function() {
                    if (parseInt($(this).val()) > response['balance']) {
                        alert("Enter a Lesser Value");
                        $(this).val("");
                        $('#total_paid_track').val("");
                    }
                    $('#pre_close_waiver').trigger('blur');//this will check whether preclosure amount crosses limit
                });

                $('#princ_amt_track').on('blur', function() {
                    if (parseInt($(this).val()) > response['balance']) {
                        alert("Enter a Lesser Value");
                        $(this).val("");
                        $('#total_paid_track').val("");
                    }
                    $('#pre_close_waiver').trigger('blur');//this will check whether preclosure amount crosses limit
                });

                $('#int_amt_track').on('blur', function() {
                    if (parseInt($(this).val()) > response['payable']) {
                        alert("Enter a Lesser Value");
                        $(this).val("");
                        $('#total_paid_track').val("");
                    }
                });
                
                $('#penalty_track').on('blur', function() {
                    if (parseInt($(this).val()) > response['penalty']) {
                        alert("Enter a Lesser Value");
                        $(this).val("");
                        $('#total_paid_track').val("");
                    }
                });
                
                $('#coll_charge_track').on('blur', function() {
                    if (parseInt($(this).val()) > response['coll_charge']) {
                        alert("Enter a Lesser Value");
                        $(this).val("");
                        $('#total_paid_track').val("");
                    }
                });
                
                //To set Limitation that should not cross its limit with considering track values and previous readonly values
                $('#pre_close_waiver').on('blur', function() {
                    if(response['loan_type'] == "emi" ){
                        var due_track = $('#due_amt_track').val();
                        if (parseFloat($(this).val()) > response['balance'] - due_track) {
                            alert("Enter a Lesser Value");
                            $(this).val("");
                            $('#total_waiver').val("");
                        }
                    }else if(response['loan_type'] == 'interest'){
                        var princ_track = $('#princ_amt_track').val();
                        if (parseFloat($(this).val()) > response['balance'] - princ_track) {
                            alert("Enter a Lesser Value");
                            $(this).val("");
                            $('#total_waiver').val("");
                        }
                    }
                });
                
                $('#penalty_waiver').on('blur', function() {
                    var penalty_track = $('#penalty_track').val();
                    if (parseFloat($(this).val()) > response['penalty'] - penalty_track) {
                        alert("Enter a Lesser Value");
                        $(this).val("");
                        $('#total_waiver').val("");
                    }
                });
                
                $('#coll_charge_waiver').on('blur', function() {
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
    
    $(document).on('click','#back_to_loan_list', function(){
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

    $('#due_amt_track, #princ_amt_track, #int_amt_track, #penalty_track , #coll_charge_track').blur(function(){
        
        var due_amt_track = ($('#due_amt_track').val()!='') ? $('#due_amt_track').val() : 0;
        var penalty_track = ($('#penalty_track').val()!='') ? $('#penalty_track').val() : 0;
        var coll_charge_track = ($('#coll_charge_track').val()!='') ? $('#coll_charge_track').val() : 0;
        var princ_amt_track = ($('#princ_amt_track').val()!='') ? $('#princ_amt_track').val() : 0;
        var int_amt_track = ($('#int_amt_track').val()!='') ? $('#int_amt_track').val() : 0;
        
        var total_paid_track = parseInt(due_amt_track) + parseInt(princ_amt_track) + parseInt(int_amt_track) + parseInt(penalty_track) + parseInt(coll_charge_track);
        $('#total_paid_track').val(total_paid_track)
    });

    $('#pre_close_waiver , #penalty_waiver , #coll_charge_waiver').blur(function(){
        
        var pre_close_waiver = ($('#pre_close_waiver').val()!='') ? $('#pre_close_waiver').val() : 0;
        var penalty_waiver = ($('#penalty_waiver').val()!='') ? $('#penalty_waiver').val() : 0;
        var coll_charge_waiver = ($('#coll_charge_waiver').val()!='') ? $('#coll_charge_waiver').val() : 0;

        var total_waiver = parseInt(pre_close_waiver) + parseInt(penalty_waiver) + parseInt(coll_charge_waiver);
        $('#total_waiver').val(total_waiver)
    });

    $(document).on('click','.due-chart', function(){
        var cp_id = $(this).attr('value');
        var cus_id = $('#cus_id').val();
        dueChartList(cp_id,cus_id); // To show Due Chart List.
        setTimeout(()=>{
            $('.print_due_coll').click(function(){
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
                            url:'api/collection_files/print_collection.php',
                            data:{'coll_id':id},
                            type:'post',
                            cache:false,
                            success:function(html){
                                $('#printcollection').html(html)
                                // Get the content of the div element
                                var content = $("#printcollection").html();
                            }
                        })
                    }
                })
            })
        },1000)
    });
    
    $(document).on('click','.penalty-chart', function(){
        let cp_id = $(this).attr('value');
        let cus_id = $('#cus_id').val();
        $.ajax({
            //to insert penalty by on click
            url: 'api/collection_files/collection_loan_details.php',
            data: {'cp_id':cp_id},
            dataType:'json',
            type:'post',
            cache: false,
            success: function(response){
                penaltyChartList(cp_id,cus_id); //To show Penalty List.
            }
        })
    });
    
    $(document).on('click','.fine-chart', function(){
        var cp_id = $(this).attr('value');
        fineChartList(cp_id) //To Show Fine Chart List
    });

    // $(document).on('click','.coll-charge', function(){
    //     var cp_id = $(this).attr('value');
    //     resetcollCharges(cp_id);  //Fine
    // }); 
    $('#collection_mode').on('change', function () {
        resetValidation();
    });
    $('#submit_collection').click(function(event){
        event.preventDefault();
        getCollectionCode();
        $(this).attr('disabled', true);
        let collData = {
            'cp_id' : $('#cp_id').val(),
            'cus_id' : $('#cus_id').val(),
            'cus_name' : $('#cus_name').val(),
            'area_id' : $('#area_id').val(),
            'branch_id' : $('#branch_id').val(),
            'line_id' : $('#line_id').val(),
            'loan_category_id' : $('#loan_category_id').val(),
            'status' : $('#status').val(),
            'sub_status' : $('#sub_status').val(),
            'tot_amt' : $('#tot_amt').val(),
            'paid_amt' : $('#paid_amt').val(),
            'bal_amt' : $('#bal_amt').val(),
            'due_amt' : $('#due_amt').val(),
            'pending_amt' : $('#pending_amt').val(),
            'payable_amt' : $('#payable_amt').val(),
            'penalty' : $('#penalty').val(),
            'coll_charge' : $('#coll_charge').val(),
            'due_amt_track' : $('#due_amt_track').val(),
            'princ_amt_track' : $('#princ_amt_track').val(),
            'int_amt_track' : $('#int_amt_track').val(),
            'penalty_track' : $('#penalty_track').val(),
            'coll_charge_track' : $('#coll_charge_track').val(),
            'total_paid_track' : $('#total_paid_track').val(),
            'pre_close_waiver' : $('#pre_close_waiver').val(),
            'penalty_waiver' : $('#penalty_waiver').val(),
            'coll_charge_waiver' : $('#coll_charge_waiver').val(),
            'total_waiver' : $('#total_waiver').val(),
            'collection_date' : $('#collection_date').val(),
            'collection_id' : $('#collection_id').val(),
            'collection_mode' : $('#collection_mode').val(),
            'bank_id' : $('#bank_id').val(),
            'cheque_no' : $('#cheque_no').val(),
            'trans_id' : $('#trans_id').val(),
            'trans_date' : $('#trans_date').val()
        }

        if(isFormDataValid(collData)){
            $.post('api/collection_files/submit_collection.php', collData, function(response){
                if(response == '1'){
                    swalSuccess('Success', 'Collection Added Successfully.');

                }else if(response == '2'){
                    swalError('Error', 'Failed to Insert Collection');
                    
                }else if(response == '3'){
                    swalSuccess('Success', 'Moved to Closed Successfully.');
                }
                $('#submit_collection').attr('disabled', false);
                $('#back_to_loan_list').trigger('click');
            },'json');
        }else{
            $('#submit_collection').attr('disabled', false);
        }
    });//submit END.

    $(document).on('click', '.due-chart', function() {
        $('#due_chart_model').modal('show');
    });

    $(document).on('click', '.penalty-chart', function() {
        $('#penalty_model').modal('show');
    });

    $(document).on('click', '.fine-chart', function(e) {
        $('#fine_model').modal('show');
    });

    $(document).on('click', '.fine-form', function(e) {
        let cpid = $(this).attr('value');
        $('#fine_cp_id').val(cpid);
        $('#fine_form_modal').modal('show');
        setCurrentDate('#fine_date');
        getFineFormTable(cpid);
    });

    //Fine Submit
    $('#fine_form_submit').click(function(event){
        event.preventDefault();
        let fine_cp_id = $('#fine_cp_id').val();
        let cus_id = $('#cus_id').val();
        let fine_date = $('#fine_date').val();
        let fine_purpose = $('#fine_purpose').val();
        let fine_Amnt = $('#fine_Amnt').val();
        var data = [ 'fine_cp_id','cus_id','fine_date','fine_purpose','fine_Amnt']
        
        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#'+entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });

        if(isValid){
            $.post('api/collection_files/submit_fine_form.php', {fine_cp_id, cus_id, fine_date, fine_purpose, fine_Amnt}, function(response){
                if(response == '1'){
                    swalSuccess('Success', 'Fine Added Successfully.');
                    getFineFormTable(fine_cp_id);
                }else{
                    swalError('Error', 'Failed to Add Fine');
                }
            },'json');
        }
    })

});
/////////////////////////////////////////////////////////////////////////   Document END /////////////////////////////////////////////////////////////////////////
$(function(){
    getCollectionListTable();
});

function getCollectionListTable(){
        serverSideTable('#collection_list_table','', 'api/collection_files/collection_list.php');
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
        getCollectionListTable();
    }
}

function getPersonalInfo(cusId){
    $.post('api/common_files/personal_info.php', { cus_id: cusId }, function(response){
        if(response.length > 0){
            $('#cus_id').val(response[0].cus_id);
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
            if(response[0].pic !=''){
                img.attr('src', path + response[0].pic);
            }else{
                img.attr('src', 'img/avatar.png');
            }
        }
    },'json');
}

function getBankNames(){
    $.ajax({
        url: 'api/common_files/bank_name_list.php',
        data: {},
        dataType: 'json',
        type: 'post',
        cache :false,
        success: function(response){
            $('#bank_id').empty();
            $('#bank_id').append('<option value="">Select Bank Name</option>');
            $.each(response,function(ind,val){
                $('#bank_id').append('<option value="'+val['id']+'">'+val['bank_name']+'</option>');
            })

        }
    })
}

function getChequeList(){
    let cp_id = $('#cp_id').val();
    $.ajax({
        url: 'api/common_files/cheque_no_list.php',
        data: {cp_id},
        dataType: 'json',
        type: 'post',
        cache :false,
        success: function(response){
            $('#cheque_no').empty();
            $('#cheque_no').append('<option value="">Select Cheque No</option>');
            $.each(response,function(ind,val){
                $('#cheque_no').append('<option value="'+val['id']+'">'+val['cheque_no']+'</option>');
            })

        }
    })
}

function OnLoadFunctions(cus_id){
    //To get loan sub Status
    var pending_arr = [];
    var od_arr = [];
    var due_nil_arr = [];
    var balAmnt = [];
    $.ajax({
        url: 'api/collection_files/resetCustomerStatus.php',
        data: {'cus_id':cus_id},
        dataType:'json',
        type:'post',
        cache: false,
        success: function(response){
            if(response.length != 0){

                for(var i=0;i< response['pending_customer'].length;i++){
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
    }).then(function(){
            showOverlay();//loader start
            var pending_sts = $('#pending_sts').val()
            var od_sts = $('#od_sts').val()
            var due_nil_sts = $('#due_nil_sts').val()
            var bal_amt = balAmnt;
            $.ajax({
                //in this file, details gonna fetch by customer ID, Not by req id (Because we need all loans from customer)
                url: 'api/collection_files/collection_loan_list.php',
                data: {'cus_id':cus_id,'pending_sts':pending_sts,'od_sts':od_sts,'due_nil_sts':due_nil_sts,'bal_amt':bal_amt},
                type:'post',
                dataType: 'json',
                cache: false,
                success: function(response){
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
                }
            });
            hideOverlay();//loader stop
        }); 
}//Auto Load function END

function getCollectionCode(){
    $.ajax({
        url:'api/collection_files/collection_code.php',
        data:{},
        dataType: 'json',
        type: 'post',
        cache: false,
        success: function(response){
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

    // Check if all three fields are empty
    const allThreeFieldsEmpty = !collData['due_amt_track'] && !collData['penalty_track'] && !collData['coll_charge_track'];

    if (allThreeFieldsEmpty) {
        if (!validateField(collData['due_amt_track'], 'due_amt_track')) {
            isValid = false;
        }
        if (!validateField(collData['penalty_track'], 'penalty_track')) {
            isValid = false;
        }
        if (!validateField(collData['coll_charge_track'], 'coll_charge_track')) {
            isValid = false;
        }
    } else {
        // Reset border color for the fields if any one of them is filled
        $('#due_amt_track').css('border', '1px solid #cecece');
        $('#penalty_track').css('border', '1px solid #cecece');
        $('#coll_charge_track').css('border', '1px solid #cecece');
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
}

function closeFineChartModal(){
    $('#fine_form_modal').modal('hide');
    let cus_id = $('#cus_id').val();
    OnLoadFunctions(cus_id);
}

function getFineFormTable(cp_id){
    $.post('api/collection_files/fine_form_list.php', {cp_id}, function(response){
        let fineColumn =[
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
    },'json');
}

//Due Chart List
function dueChartList(cp_id,cus_id){
    $.ajax({
        url: 'api/collection_files/get_due_chart_list.php',
        data: {'cp_id':cp_id,'cus_id':cus_id},
        type:'post',
        cache: false,
        success: function(response){
            $('#due_chart_table_div').empty();
            $('#due_chart_table_div').html(response);
        }
    }).then(function(){

        $.post('api/collection_files/get_due_method_name.php',{cp_id},function(response){
            $('#dueChartTitle').text('Due Chart ( '+ response['due_method'] + ' - '+ response['loan_type'] +' )');
        },'json');
    })

}

//Penalty Chart List
function penaltyChartList(cp_id,cus_id){
    $.ajax({
        url: 'api/collection_files/get_penalty_chart_list.php',
        data: {'cp_id':cp_id,'cus_id':cus_id},
        type:'post',
        cache: false,
        success: function(response){
            $('#penalty_chart_table_div').empty()
            $('#penalty_chart_table_div').html(response)
        }
    });//Ajax End.
}

//Fine Chart List
function fineChartList(cp_id){
    $.ajax({
        url: 'api/collection_files/get_fine_chart_list.php',
        data: {'cp_id':cp_id},
        type:'post',
        cache: false,
        success: function(response){
            $('#fine_chart_table_div').empty()
            $('#fine_chart_table_div').html(response)
        }
    });//Ajax End.
}