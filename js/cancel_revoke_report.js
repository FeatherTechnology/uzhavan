$(document).ready(function () {
  $("#from_date").change(function () {
    let from_date = $("#from_date").val();
    let to_date = $("#to_date").val();
    if (from_date > to_date) {
      $("#to_date").val("");
    }
    $("#to_date").attr("min", from_date);
  });

  $("#type").change(function () {
    $("#screen").val("");
  });

  $("#cancel_revoke_report_btn").click(function (event) {
    event.preventDefault();
    let from_date = $("#from_date").val();
    let to_date = $("#to_date").val();
    let type = $("#type").val();
    let screen = $("#screen").val();
    let data = {
      from_date: $("#from_date").val(),
      to_date: $("#to_date").val(),
      type: type,
      screen: screen,
    };
    if (from_date != "" && to_date != "" && type != "" && screen != "") {
      serverSideTable(
        "#cancel_revoke_report_table",
        data,
        "api/report_files/get_cancel_revoke_report.php",
      );
    } else {
      swalError("Please Select All Fields!", "All fields are required.");
    }
  });
});
