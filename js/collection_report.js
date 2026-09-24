$(document).ready(function () {

    $('#from_date').change(function () {
        let from_date = $('#from_date').val();
        let to_date = $('#to_date').val();
        if (from_date > to_date) {
            $('#to_date').val('');
        }
        $('#to_date').attr('min', from_date);
    });

    $('#collection_report_btn').click(function () {

        let from_date = $('#from_date').val();
        let to_date = $('#to_date').val();

        if (from_date != '' && to_date != '') {

            getUserAccess(function (downloadAccess) {

                // Destroy existing DataTable
                if ($.fn.DataTable.isDataTable('#collection_report_table')) {
                    $('#collection_report_table').DataTable().destroy();
                }

                // Remove old events
                $('#collection_report_table').off(
                    'preXhr.dt xhr.dt error.dt draw.dt'
                );

                // Show loader before AJAX request
                $('#collection_report_table').on('preXhr.dt', function () {
                    showOverlay();
                });

                // Hide loader after AJAX response
                $('#collection_report_table').on('xhr.dt', function () {
                    hideOverlay();
                });

                // Hide loader if AJAX error
                $('#collection_report_table').on('error.dt', function () {
                    hideOverlay();
                });

                // Initialize buttons
                let buttons = [];

                // Excel button
                if (downloadAccess == 1) {
                    buttons.push({
                        extend: 'excel',
                        title: 'Collection Report List'
                    });
                }

                // Column visibility
                buttons.push({
                    extend: 'colvis',
                    collectionLayout: 'fixed four-column'
                });

                // Initialize DataTable
                let table = $('#collection_report_table').DataTable({

                    // State save
                    ...getStateSaveConfig('collection_report_table'),

                    "order": [
                        [0, "desc"]
                    ],

                    "processing": true,

                    "serverSide": true,

                    "serverMethod": "post",

                    "ajax": {

                        "url": "api/report_files/get_collection_report.php",

                        "data": function (data) {

                            // Server-side search
                            let searchValue = data.search.value;

                            if (!searchValue) {
                                searchValue =
                                    $('#collection_report_table_filter input').val() || '';
                            }

                            data.search = searchValue;

                            // Date filters
                            data.from_date = $('#from_date').val();
                            data.to_date = $('#to_date').val();
                        }
                    },

                    "dom": "lBfrtip",

                    "buttons": buttons,

                    "lengthMenu": [
                        [10, 25, 50, -1],
                        [10, 25, 50, "All"]
                    ],

                    "footerCallback": function (row, data, start, end, display) {

                        var api = this.api();

                        // Convert value to number
                        var intVal = function (i) {

                            return typeof i === 'string'
                                ? i.replace(/[\₹,]/g, '') * 1
                                : typeof i === 'number'
                                    ? i
                                    : 0;
                        };

                        // Columns to sum
                        var columnsToSum = [15,16,17,18,19,20];

                        columnsToSum.forEach(function (colIndex) {

                            var total = api
                                .column(colIndex)
                                .data()
                                .reduce(function (a, b) {

                                    return intVal(a) + intVal(b);

                                }, 0);

                            $(api.column(colIndex).footer()).html(
                                '<b>' +
                                moneyFormatIndia(total) +
                                '</b>'
                            );
                        });
                    },

                    "drawCallback": function () {

                        // Search functionality
                        searchFunction('collection_report_table');

                        // Pagination functionality
                        paginationFunction('collection_report_table');

                        // Column visibility
                        initColVisFeatures(
                            table,
                            'collection_report_table'
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

