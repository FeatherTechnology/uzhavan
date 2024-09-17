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
        $('#closed_report_table').DataTable().destroy();
        $('#closed_report_table').DataTable({
            "order": [
                [0, "desc"]
            ],
            'processing': true,
            'serverSide': true,
            'serverMethod': 'post',
            'ajax': {
                'url': 'api/report_files/get_closed_report.php',
                'data': function (data) {
                    var search = $('input[type=search]').val();
                    data.search = search;
                    data.from_date = $('#from_date').val();
                    data.to_date = $('#to_date').val();
                }
            },
            dom: 'lBfrtip',
            buttons: [{
                extend: 'excel',
                title: "Closed Report List"
            },
            {
                extend: 'colvis',
                collectionLayout: 'fixed four-column',
            }
            ],
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api();

                // Remove formatting to get integer data for summation
                var intVal = function (i) {
                    return typeof i === 'string' ?
                        i.replace(/[\$,]/g, '') * 1 :
                        typeof i === 'number' ?
                            i : 0;
                };

                // Array of column indices to sum
                var columnsToSum = [10];

                // Loop through each column index
                columnsToSum.forEach(function (colIndex) {
                    // Total over all pages for the current column
                    var total = api
                        .column(colIndex)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    // Update footer for the current column
                    $(api.column(colIndex).footer()).html(`<b>` + total.toLocaleString() + `</b>`);
                });
            }
        });

    })
});
