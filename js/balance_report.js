$(document).ready(function () {

    //Closed Report Table
    $('#bal_report_btn').click(function () {
        $('#bal_report_table').DataTable().destroy();
        $('#bal_report_table').DataTable({
            "order": [
                [0, "desc"]
            ],
            'processing': true,
            'serverSide': true,
            'serverMethod': 'post',
            'ajax': {
                'url': 'api/report_files/get_bal_report.php',
                'data': function (data) {
                    var search = $('input[type=search]').val();
                    data.search = search;
                    data.to_date = $('#to_date').val();
                }
            },
            dom: 'lBfrtip',
            buttons: [{
                extend: 'excel',
                title: "Balance Report List"
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
                var columnsToSum = [12, 13, 15, 16, 17, 18];
    
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
