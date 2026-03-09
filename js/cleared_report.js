$(document).ready(function () {

    $('#from_date').change(function () {
        let from_date = $('#from_date').val();
        let to_date = $('#to_date').val();
        if (from_date > to_date) {
            $('#to_date').val('');
        }
        $('#to_date').attr('min', from_date);
    });

    $('#cleared_report_btn').click(function () {
        // Get user access for download
        let from_date = $('#from_date').val();
        let to_date = $('#to_date').val();
        if (from_date != '' && to_date != '') {

            getUserAccess(function (downloadAccess) {
                // Destroy existing DataTable instance
                $('#cleared_report_table').DataTable().destroy();

                // Initialize an empty array for buttons
                let buttons = [];

                // Add Excel button only if download access is granted
                if (downloadAccess == 1) {
                    buttons.push({
                        extend: 'excel',
                        title: "Cleared Report List"
                    });
                }

                // Add column visibility button
                buttons.push({
                    extend: 'colvis',
                    collectionLayout: 'fixed four-column',
                });

                // Initialize DataTable with dynamic buttons
                $('#cleared_report_table').DataTable({
                    "order": [
                        [0, "desc"]
                    ],
                    'processing': true,
                    'serverSide': true,
                    'serverMethod': 'post',
                    'ajax': {
                        'url': 'api/report_files/get_cleared_report.php',
                        'data': function (data) {
                            var search = $('input[type=search]').val();
                            data.search = search;
                            data.from_date = $('#from_date').val();
                            data.to_date = $('#to_date').val();
                        }
                    },
                    dom: 'lBfrtip',
                    buttons: buttons,  // Use the dynamically constructed buttons array
                    "lengthMenu": [
                        [10, 25, 50, -1],
                        [10, 25, 50, "All"]
                    ],
                    "footerCallback": function (row, data, start, end, display) {
                        var api = this.api();

                        var columnsToSum = [5, 6, 7]; // Credit, Debit, Balance

                        columnsToSum.forEach(function (colIndex) {

                            var total = api
                                .column(colIndex, { page: 'current' })
                                .data()
                                .reduce(function (a, b) {

                                    // Remove commas and convert to number
                                    var x = parseFloat(a.toString().replace(/,/g, '')) || 0;
                                    var y = parseFloat(b.toString().replace(/,/g, '')) || 0;

                                    return x + y;

                                }, 0);

                            // Format with commas
                            total = total.toLocaleString('en-IN');

                            $(api.column(colIndex).footer()).html('<b>' + total + '</b>');
                        });
                    }
                });
            });
        }
        else {
            swalError('Please Fill Dates!', 'Both From and To dates are required.');

        }
    });


});

