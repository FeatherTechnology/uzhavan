$(document).ready(function () {
  $("#from_date").change(function () {
    let from_date = $("#from_date").val();
    let to_date = $("#to_date").val();
    if (from_date > to_date) {
      $("#to_date").val("");
    }
    $("#to_date").attr("min", from_date);
  });

  $("#approval_report_btn").click(function (event) {
    event.preventDefault();
    let from_date = $("#from_date").val();
    let to_date = $("#to_date").val();
    let data = {
      from_date: $("#from_date").val(),
      to_date: $("#to_date").val(),
    };
    if (from_date != "" && to_date != "") {
      serverSideTable(
        "#approval_report_table",
        data,
        "api/report_files/get_approval_report.php",
      );
    } else {
      swalError("Please Fill Dates!", "Both From and To dates are required.");
    }
  });
});
