$(document).ready(function () {

    getLineDropdown();
    getLoanCategoryDropdown();

    // Reset / Search button click
    $('#reset_btn').click(function () {
        const line = $('#line').val();
        const loan_cat = $('#loan_cat').val();

        if (line !== "" && loan_cat !== "") {
            const loanCatText = $('#loan_cat option:selected').text();
            $('#Loan_category').text("Loan Category : " + loanCatText);

            // Reload table
            areaLoanCountReportTable();
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Details',
                text: 'Please select both Line and Loan Category before Search.',
                confirmButtonColor: '#009688'
            });
        }
    });
});

// -------------------------------------------
// Populate line Dropdown
function getLineDropdown() {
    $.ajax({
        url: 'api/due_followup/get_line_dropdown.php',
        type: 'post',
        dataType: 'json',
        success: function (response) {
            response.sort((a, b) => a.linename.localeCompare(b.linename));
            $('#line').empty().append('<option value="">Select Line</option><option value="0">All</option>');
            response.forEach(t => {
                $('#line').append(`<option value="${t.id}">${t.linename}</option>`);
            });
        }
    });
}

// -------------------------------------------
// Populate Loan Category Dropdown
function getLoanCategoryDropdown() {
    $.ajax({
        url: 'api/common_files/loan_category_creation_list.php',
        type: 'post',
        dataType: 'json',
        success: function (response) {
            response.sort((a, b) => a.loan_category.localeCompare(b.loan_category));
            $('#loan_cat').empty().append('<option value="">Select Loan Category</option><option value="0">All</option>');
            response.forEach(cat => {
                $('#loan_cat').append(`<option value="${cat.id}">${cat.loan_category}</option>`);
            });
        }
    });
}

// -------------------------------------------
// Load DataTable
function areaLoanCountReportTable() {
    const tableId = '#area_loan_count_report_table';

    // Destroy existing table if exists
    if ($.fn.DataTable.isDataTable(tableId)) {
        $(tableId).DataTable().destroy();
    }

    // Initialize DataTable
    var area_loan_count_report_table = $(tableId).DataTable({
        ...getStateSaveConfig('area_loan_count_report_table'),
        order: [[1, "asc"]],
        processing: true,
        serverSide: true,
        infoCallback: customDataTableInfo,
        serverMethod: 'post',
        ajax: {
            url: 'api/report_files/getAreaLoanCountReport.php',
            data: function (data) {
                data.line = $('#line').val();
                data.loan_cat = $('#loan_cat').val();
                var search = $('input[type=search]').val();
                data.search = search;
            }
        },
        dom: 'lBfrtip',
        buttons: [
            {
                extend: 'excel',
                title: "Area Loan Count Report",
                action: function (e, dt, button, config) {
                    var defaultAction = $.fn.dataTable.ext.buttons.excelHtml5.action;
                    var dynamic = 'Area_Loan_Count_Report'; // dynamic filename
                    config.title = dynamic;
                    config.filename = dynamic;
                    defaultAction.call(this, e, dt, button, config);
                }
            },
            {
                extend: 'colvis',
                collectionLayout: 'fixed four-column',
            }
        ],
        lengthMenu: [[10, 25, 50, -1], 
                     [10, 25, 50, "All"] ],
        columns: [
            { data: null, render: function(data, type, row, meta){ return meta.row + meta.settings._iDisplayStart + 1; }, orderable:false },
            { data: "area_name" },
            { data: "line" },
            { data: "customer_count" },
            { data: "loan_count" },
            { data: "payable_zero_count" },
            { data: "Current" },
            { data: "Pending" },
            { data: "OD" },
            { data: "Error" },
            { data: "Legal" },
        ],
        drawCallback: function () {
            paginationFunction('area_loan_count_report_table');
        }
    });

    // Initialize ColVis features
    initColVisFeatures(area_loan_count_report_table, 'area_loan_count_report_table');
}
  // Reusable DataTables info callback. - Overrides the default info text and displays only the current range and total filtered entries.
        function customDataTableInfo(settings, start, end, max, total, pre) {
            return 'Showing ' + start + ' to ' + end + ' of ' + total + ' entries';
        }