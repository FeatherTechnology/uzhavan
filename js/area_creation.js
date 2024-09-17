//Area Multi select initialization
const intance = new Choices('#area_name', {
    removeItemButton: true,
    noChoicesText: 'Select Area',
    allowHTML: true
});

$(document).ready(function () {
    $('.add_area_btn, .back_to_area_btn').click(function () {
        swapTableAndCreation();

    });

    $('#branch_name').change(function () {
        getModalAttr();
        getLineNameDropdown();
        getAreaNameDropdown();
    });
    /////////////////////////////////////////////////////Line Modal START///////////////////////////////////////////////////
    $('#submit_addline').click(function () {
        event.preventDefault();
        let linename = $('#addline_name').val(); let branch_id = $('#branch_name').val(); let id = $('#addline_name_id').val();
        var data = ['addline_name',]

        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });

        if (branch_id == '') {
            swalError('Warning', 'Kindly select Branch Name!');
        } else {
            if (linename != '') {
                if (isValid) {
                    $.post('api/area_creation_files/submit_line_name.php', { linename, branch_id, id }, function (response) {
                        if (response == '1') {
                            swalSuccess('Success', 'Line Added Successfully!');
                        } else if (response == '0') {
                            swalSuccess('Success', 'Line Updated Successfully!');
                        } else if (response == '2') {
                            swalError('Warning', 'Line Name Already Exists!');
                        }

                        getLineNameTable();
                    }, 'json');
                    clearLineNameFields(); //To Clear All Fields in line name creation.
                }

            }
        }
    });

    $(document).on('click', '.linenameActionBtn', function () {
        var id = $(this).attr('value'); // Get value attribute
        $.post('api/area_creation_files/get_line_name_data.php', { id }, function (response) {
            $('#addline_name_id').val(id);
            $('#addline_name').val(response[0].linename);
        }, 'json');
    });

    $(document).on('click', '.linenameDeleteBtn', function () {
        var id = $(this).attr('value'); // Get value attribute
        swalConfirm('Delete', 'Do you want to Delete the Line Name?', deleteLineName, id);
        return;
    });
    /////////////////////////////////////////////////////Line Modal END///////////////////////////////////////////////////

    /////////////////////////////////////////////////////Area Modal START///////////////////////////////////////////////////
    $('#submit_addarea').click(function () {
        event.preventDefault();
        let areaname = $('#addarea_name').val(); let status = $('#area_status').val(); let branch_id = $('#branch_name').val(); let id = $('#addarea_name_id').val();
        var data = ['addarea_name', 'area_status',]

        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#' + entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        if (branch_id == '') {
            swalError('Warning', 'Kindly select Branch Name!');
        } else {
            if (areaname != '' && status != '' && status != null) {
                if (isValid) {
                    $.post('api/area_creation_files/submit_area_name.php', { areaname, status, branch_id, id }, function (response) {
                        if (response == '1') {
                            swalSuccess('Success', 'Area Added Successfully!');
                        } else if (response == '0') {
                            swalSuccess('Success', 'Area Updated Successfully!');
                        } else if (response == '2') {
                            swalError('Warning', 'Area Name Already Exists!');
                        } else if (response == '3') {
                            swalError('Access Denied', 'Used in Area Creation.');
                        }

                        getAreaNameTable();
                    }, 'json');
                    clearAreaNameFields();
                }

            }
        }
    });

    $(document).on('click', '.areanameActionBtn', function () {
        var id = $(this).attr('value'); // Get value attribute
        $.post('api/area_creation_files/get_area_name_data.php', { id }, function (response) {
            $('#addarea_name_id').val(id);
            $('#addarea_name').val(response[0].areaname);
            $('#area_status').val(response[0].status);
        }, 'json');
    });

    $(document).on('click', '.areanameDeleteBtn', function () {
        var id = $(this).attr('value'); // Get value attribute
        swalConfirm('Delete', 'Do you want to Delete the Area Name?', deleteAreaName, id);
        return;
    });
    /////////////////////////////////////////////////////Area Modal END///////////////////////////////////////////////////

    $('#submit_area_creation').click(function () {
        event.preventDefault();
        //Validation
        let branch_id = $('#branch_name').val(); let line_id = $('#line_name').val(); let area_id = $('#area_name').val(); let id = $('#area_creation_id').val();
        var data = [ 'branch_name','line_name']
        
        var isValid = true;
        data.forEach(function (entry) {
            var fieldIsValid = validateField($('#'+entry).val(), entry);
            if (!fieldIsValid) {
                isValid = false;
            }
        });
        let isMultiSelectValid = validateMultiSelectField('area_name',intance);
        if (isValid && isMultiSelectValid) {
            /////////////////////////// submit page AJAX /////////////////////////////////////
            area_id = area_id.join(",");
            $.post('api/area_creation_files/submit_area_creation.php', { branch_id, line_id, area_id, id }, function (response) {
                if (response == '1') {
                    swalSuccess('Success', 'Area Added Successfully!');
                } else {
                    swalSuccess('Success', 'Area Updated Successfully!')
                }

                $('#area_creation').trigger('reset');
                getAreaCreationTable();
                swapTableAndCreation();//to change to div to table content.

            });
            /////////////////////////// submit page AJAX END/////////////////////////////////////
        }
    });

    ///////////////////////////////////// EDIT Screen START   /////////////////////////////////////
    $(document).on('click', '.areaCreationActionBtn', function () {
        var id = $(this).attr('value'); // Get value attribute
        $.post('api/area_creation_files/area_creation_data.php', { id }, function (response) {
            $('#area_creation_id').val(id);
            $('#line_name2').val(response[0].line_id);

            getBranchList();
            setTimeout(() => {
                $('#branch_name').val(response[0].branch_id);
                $('#area_name2').val(response[0].area_id);
                getLineNameDropdown();
                getAreaNameDropdown();
            }, 500);

            setTimeout(() => {
                $('#line_name').val(response[0].line_id);
                $('#area_name').val(response[0].area_id);
                getModalAttr();
            }, 1000);

            swapTableAndCreation();//to change to div to table content.
        }, 'json');
    })
    ///////////////////////////////////// EDIT Screen END  /////////////////////////////////////
    ///////////////////////////////////// Delete Screen START  /////////////////////////////////////
    $(document).on('click', '.areaCreationDeleteBtn', function () {
        let id = $(this).attr('value'); // Get value attribute
        swalConfirm('Delete', 'Do you want to Delete the Area Creation?', deleteAreaCreation, id);
        return;
    });
    ///////////////////////////////////// Delete Screen END  /////////////////////////////////////

    $('#line_name').change(function () {
        let lineID = $('#line_name2').val();
        $.post('api/area_creation_files/validate_line_name.php', { lineID }, function (response) {
            if (response == '0') {
                swalError('Access Denied', 'Used in User Creation');
                $('#line_name').val(lineID);
            }
        }, 'json');
    });

});//Document END.

//OnLoad/////
$(function () {
    getAreaCreationTable();
    getBranchList();
});

function getAreaCreationTable() {
    $.post('api/area_creation_files/area_creation_list.php', function (response) {
        var columnMapping = [
            'sno',
            'areaname',
            'linename',
            'branch_name',
            'action'
        ];
        appendDataToTable('#area_creation_table', response, columnMapping);
        setdtable('#area_creation_table');
    }, 'json');
}
function swapTableAndCreation() {
    if ($('.area_table_content').is(':visible')) {
        $('.area_table_content').hide();
        $('.add_area_btn').hide();
        $('#area_creation_content').show();
        $('.back_to_area_btn').show();
    } else {
        $('.area_table_content').show();
        $('.add_area_btn').show();
        $('#area_creation_content').hide();
        $('.back_to_area_btn').hide();

        $('#area_name2').val('');
        $('#line_name2').val('');
        $('#area_creation').trigger('reset');
        $('#area_creation_id').val('0');
        $('#line_modal_btn')
            .removeAttr('data-toggle')
            .removeAttr('data-target');

        $('#area_modal_btn')
            .removeAttr('data-toggle')
            .removeAttr('data-target');
        getLineNameDropdown();
        getAreaNameDropdown();
        getAreaCreationTable();
    }
}

function getBranchList() {
    $.post('api/common_files/get_branch_list.php', function (response) {
        let appendBranchOption = '';
        appendBranchOption += '<option value="">Select Branch</option>';
        $.each(response, function (index, val) {
            appendBranchOption += '<option value="' + val.id + '">' + val.branch_name + '</option>';
        });
        $('#branch_name').empty().append(appendBranchOption);

    }, 'json');
}

function getLineNameTable() {
    let branch_id = $('#branch_name').val();
    if (branch_id != '') {
        $.post('api/area_creation_files/line_name_list.php', { branch_id }, function (response) {
            let lineNameColumn = [
                "sno",
                "linename",
                "action"
            ]
            appendDataToTable('#line_creation_table', response, lineNameColumn);
            setdtable('#line_creation_table');
        }, 'json');

    } else {
        swalError('Warning', 'Kindly Select the Branch Name');
    }
}

function getLineNameDropdown() {
    let branch_id = $('#branch_name').val();
    let line_name2 = $('#line_name2').val();
    $.post('api/area_creation_files/get_line_name_dropdown.php', { branch_id }, function (response) {
        let appendLineNameOption = '';
        appendLineNameOption += '<option value="">Select Line Name</option>';
        $.each(response, function (index, val) {
            let disabled = (val.disabled == true) ? 'disabled' : '';
            let selected = '';
            if (val.id == line_name2) {
                selected = 'selected';
                disabled = '';
            }
            appendLineNameOption += '<option value="' + val.id + '" ' + selected + ' ' + disabled + '>' + val.linename + '</option>';
        });
        $('#line_name').empty().append(appendLineNameOption);

        clearLineNameFields();
    }, 'json');
}

function getAreaNameTable() {
    let branch_id = $('#branch_name').val();
    let params = { 'branch_id': branch_id };
    if (branch_id != '') {
        serverSideTable('#area_name_table', params, 'api/area_creation_files/area_name_list.php');
    } else {
        swalError('Warning', 'Kindly Select the Branch Name');
    }
}

function getAreaNameDropdown() {
    let branch_id = $('#branch_name').val();
    let area_name2 = $('#area_name2').val();
    $.post('api/area_creation_files/get_area_name_dropdown.php', { branch_id }, function (response) {
        intance.clearStore();
        $.each(response, function (index, val) {
            let checked = val.disabled;
            let selected = '';
            if (area_name2.includes(val.id)) {
                selected = 'selected';
                checked = false;
            }
            let items = [
                {
                    value: val.id,
                    label: val.areaname,
                    selected: selected,
                    disabled: checked,
                }
            ];
            intance.setChoices(items);
            intance.init();
        });

        clearAreaNameFields();
    }, 'json');
}

function getModalAttr() {
    let branchid = $('#branch_name').val();
    if (branchid != '') {
        $('#line_modal_btn')
            .attr('data-toggle', 'modal')
            .attr('data-target', '#add_line_name_modal');

        $('#area_modal_btn')
            .attr('data-toggle', 'modal')
            .attr('data-target', '#add_area_name_modal');
    } else {
        $('#line_modal_btn')
            .removeAttr('data-toggle')
            .removeAttr('data-target');

        $('#area_modal_btn')
            .removeAttr('data-toggle')
            .removeAttr('data-target');
    }
}

function deleteLineName(id) {
    $.post('api/area_creation_files/delete_line_name.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('Success', 'Line Name Deleted Successfully.');
            getLineNameTable();
        } else if (response == '0') {
            swalError('Access Denied', 'Used in Area Creation.');
        } else if (response == '2') {
            swalError('Access Denied', 'Used in User Creation.');
        } else {
            swalError('Warning', 'Error occur While Delete Line Name.');
        }
    }, 'json');
}

function deleteAreaName(id) {
    $.post('api/area_creation_files/delete_area_name.php', { id }, function (response) {
        if (response == '1') {
            swalSuccess('Success', 'Area Name Deleted Successfully');
            getAreaNameTable();
        } else if (response == '0') {
            swalError('Access Denied', 'Used in Area Creation.');
        } else {
            swalError('Warning', 'Error occur while Delete Area Name.');
        }
    }, 'json');
}

function deleteAreaCreation(id) {
    $.post('api/area_creation_files/delete_area_creation.php', { id }, function (response) {
        if (response == '0') {
            swalError('Access Denied', 'Used in Another Screen');
        } else if (response == '1') {
            swalSuccess('Success', 'Area creation Deleted Successfully');
            getAreaCreationTable();
        } else if (response == '2') {
            swalError('Access Denied', 'Used in User Creation');
        } else {
            swalError('Warning', 'Area Creation Delete Failed!');
        }
    });
}

function clearAreaNameFields() {
    $('#addarea_name').val('');
    $('#area_status').val('');
    $('#addarea_name_id').val('0');
    $('#area_status').css('border', '1px solid #cecece');
    $('#addarea_name').css('border', '1px solid #cecece');
    $('#area_name').closest('.choices').find('.choices__inner').css('border', '1px solid #cecece');
}

function clearLineNameFields() {
    $('#addline_name').val('');
    $('#addline_name_id').val('0');
    $('#addline_name').css('border', '1px solid #cecece');
}
$('button[type="reset"], .back_to_area_btn').click(function (event) {
    event.preventDefault();
    $('#branch_name').css('border', '1px solid #cecece');
    $('#line_name').css('border', '1px solid #cecece');
});
