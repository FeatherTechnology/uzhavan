$(document).ready(function () {

    $('#from_date').change(function () {
        let from_date = $('#from_date').val();
        let to_date = $('#to_date').val();
        if (from_date > to_date) {
            $('#to_date').val('');
        }
        $('#to_date').attr('min', from_date);
    });

    //Closed Report Table
    $('#closed_report_btn').click(function () {

    let from_date = $('#from_date').val();
    let to_date = $('#to_date').val();

    if (from_date != '' && to_date != '') {

        // Destroy existing DataTable if already initialized
        if ($.fn.DataTable.isDataTable('#closed_report_table')) {
            $('#closed_report_table').DataTable().destroy();
        }

        // Get user access
        getUserAccess(function (downloadAccess) {

            let buttons = [];

            // Excel - only when download permission is 1
            if (downloadAccess == 1) {

                buttons.push({
                    extend: 'excel',
                    title: 'Closed Report List'
                });

            }

            // Column visibility
            buttons.push({
                extend: 'colvis',
                collectionLayout: 'fixed four-column'
            });

            // Remove old DataTable events
            $('#closed_report_table').off(
                'preXhr.dt xhr.dt error.dt draw.dt'
            );

            // Show loader before AJAX request
            $('#closed_report_table').on('preXhr.dt', function () {
                showOverlay();
            });

            // Hide loader after successful AJAX response
            $('#closed_report_table').on('xhr.dt', function () {
                hideOverlay();
            });

            // Hide loader if AJAX error occurs
            $('#closed_report_table').on('error.dt', function () {
                hideOverlay();
            });

            // Initialize DataTable
            let table = $('#closed_report_table').DataTable({

                // State save
                ...getStateSaveConfig('closed_report_table'),

                // Default order
                "order": [
                    [0, "desc"]
                ],

                // Processing
                "processing": true,

                // Server-side processing
                "serverSide": true,

                "serverMethod": "post",

                // AJAX
                "ajax": {

                    "url": "api/report_files/get_closed_report.php",

                    "data": function (data) {

                        // Get DataTables search value
                        let searchValue = data.search.value;

                        // Fallback to DataTables search box
                        if (!searchValue) {

                            searchValue =
                                $('#closed_report_table_filter input').val() || '';

                        }

                        // Send search value
                        data.search = searchValue;

                        // Send dates
                        data.from_date = $('#from_date').val();
                        data.to_date = $('#to_date').val();
                    }
                },

                // DataTables DOM
                "dom": "lBfrtip",

                // Buttons
                "buttons": buttons,

                // Length menu
                "lengthMenu": [
                    [10, 25, 50, -1],
                    [10, 25, 50, "All"]
                ],

                // Footer total
                "footerCallback": function (
                    row,
                    data,
                    start,
                    end,
                    display
                ) {

                    let api = this.api();

                    // Convert value to number
                    let intVal = function (i) {

                        return typeof i === 'string'
                            ? i.replace(/[\₹$,]/g, '') * 1
                            : typeof i === 'number'
                                ? i
                                : 0;
                    };
                    // Column to calculate total
                    let columnsToSum = [11];
                    // Calculate total
                    columnsToSum.forEach(function (colIndex) {
                        let total = api
                            .column(colIndex)
                            .data()
                            .reduce(function (a, b) {

                                return intVal(a) + intVal(b);

                            }, 0);

                        // Update footer
                        $(api.column(colIndex).footer()).html(
                            '<b>' +
                            moneyFormatIndia(total) +
                            '</b>'
                        );

                    });

                },

                // After DataTable draw
                "drawCallback": function () {

                    // Server-side search
                    searchFunction('closed_report_table');

                    // Pagination
                    paginationFunction('closed_report_table');

                    // Column visibility
                    initColVisFeatures(
                        table,
                        'closed_report_table'
                    );
                }
            });

        });

    } else {

        swalError(
            'Please Fill Dates!',
            'Both From and To dates are required.'
        );

    }

});
});
