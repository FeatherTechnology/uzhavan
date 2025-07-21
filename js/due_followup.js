const subStatusMultiselect = new Choices('#sub_status_mapping', {
    removeItemButton: true,
    noChoicesText: 'Select Customer Status',
    allowHTML: true
});

$(document).ready(function () {

    $('#show_due_followup').click(function () {
        let cusSts = $("#sub_status_mapping").val();
        let comm_date = $("#comm_date").val();
        OnLoadFunctions(cusSts, comm_date);
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
    });


});

$(function () {
    getSubStsMapping(); //Call Customer status dropdown.

    let cus_Sts = $("#customer_status").val();
    let cusSts = cus_Sts.split(',');

    if (cusSts != '') {
        OnLoadFunctions(cusSts, '');
    }
});

function getSubStsMapping() {
    let subStatus = ['OD', 'Pending', 'Current'];
    let editSubStatus = $('#customer_status').val() || '';

    subStatusMultiselect.clearStore();
    $.each(subStatus, function (index, val) {
        let selected = '';
        if (editSubStatus.includes(val)) {
            selected = 'selected';
        }
        let items = [
            { value: val, label: val, selected: selected },
        ]
        subStatusMultiselect.setChoices(items);
        subStatusMultiselect.init();
    });

}

function OnLoadFunctions(cusSts, comm_date) {
    if (!cusSts || cusSts.length === 0) {
        warningSwal('Warning!', 'Select Customer Status.');
        return;
    }

    let params = {
        cusSts: cusSts,
        comm_date: comm_date
    };

    serverSideTable('#due_followup_table', params, 'api/due_followup/due_followup_data.php');
}
function getLoanListTable(cus_id) {
    // let cus_id = $('#cus_id_upd').val();
    $.post('api/due_followup/customer_loan_list.php', { cus_id }, function (response) {
        var columnMapping = [
            'sno',
            'loan_id',
            'loan_category',
            'loan_date',
            'loan_amount',
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
