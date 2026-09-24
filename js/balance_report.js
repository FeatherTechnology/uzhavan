$(document).ready(function () {

    //Closed Report Table
    $('#bal_report_btn').click(function () {

        let to_date = $('#to_date').val();

        if (to_date != '') {

            // Destroy existing DataTable if already initialized
            if ($.fn.DataTable.isDataTable('#bal_report_table')) {
                $('#bal_report_table').DataTable().destroy();
            }

            getUserAccess(function (downloadAccess) {

                let buttons = [];

                // Excel - only when download permission is 1
                if (downloadAccess == 1) {

                    buttons.push({
                        extend: 'excel',
                        title: 'Balance Report List'
                    });

                }

                // Column visibility
                buttons.push({
                    extend: 'colvis',
                    collectionLayout: 'fixed four-column'
                });

                // Remove old DataTable events
                $('#bal_report_table').off(
                    'preXhr.dt xhr.dt error.dt draw.dt'
                );

                // Show loader before AJAX request
                $('#bal_report_table').on('preXhr.dt', function () {
                    showOverlay();
                });

                // Hide loader after successful AJAX response
                $('#bal_report_table').on('xhr.dt', function () {
                    hideOverlay();
                });

                // Hide loader if AJAX error occurs
                $('#bal_report_table').on('error.dt', function () {
                    hideOverlay();
                });

                // Initialize DataTable
                let table = $('#bal_report_table').DataTable({

                    // State save
                    ...getStateSaveConfig('bal_report_table'),

                    // Default order
                    "order": [
                        [0, "desc"]
                    ],
                    "processing": true,
                    "serverSide": true,
                    "serverMethod": "post",
                    "ajax": {
                        "url": "api/report_files/get_bal_report.php",
                        "data": function (data) {
                            // Get DataTables search value
                            let searchValue = data.search.value;
                            // Fallback to DataTables search box
                            if (!searchValue) {
                                searchValue = $('#bal_report_table_filter input').val() || '';
                            }
                            // Send search value
                            data.search = searchValue;
                            // Send date
                            data.to_date = $('#to_date').val();
                        }
                    },

                    // DataTables DOM
                    "dom": "lBfrtip",
                    "buttons": buttons,
                    "lengthMenu": [
                        [10, 25, 50, -1],
                        [10, 25, 50, "All"]
                    ],
                    "footerCallback": function (row,data,start,end,display) {
                        let api = this.api();
                        // Convert value to number
                        let intVal = function (i) {
                            return typeof i === 'string'
                                ? i.replace(/[\₹$,]/g, '') * 1
                                : typeof i === 'number'
                                    ? i
                                    : 0;
                        };
                        // Columns to calculate total
                        let columnsToSum = [ 13,14,16,17,18,19];
                        // Calculate total for each column
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
                                total.toLocaleString('en-IN') +
                                '</b>'
                            );
                        });
                    },

                    // After DataTable draw
                    "drawCallback": function () {
                        // Server-side search functionality
                        searchFunction('bal_report_table');
                        // Pagination functionality
                        paginationFunction('bal_report_table');
                        // Column visibility functionality
                        initColVisFeatures(
                            table,
                            'bal_report_table'
                        );

                    }

                });

            });

        } else {

            swalError(
                'Warning',
                'Please Select Date'
            );

        }

    });
});