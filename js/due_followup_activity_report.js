const map_name = new Choices("#map_name", {
  removeItemButton: true,
  noChoicesText: "Select",
  allowHTML: true,
});

$("#map_name").closest(".choices").hide();

$(document).ready(function () {
  $("#from_date").change(function () {
    const fromDate = $(this).val();
    const toDate = $("#to_date").val();
    $("#to_date").attr("min", fromDate);

    // Check if from_date is greater than to_date
    if (toDate && fromDate > toDate) {
      $("#to_date").val(""); // Clear the invalid value
    }
  });

  $("#type").change(function (e) {
    let type = $(this).val();
    $("#by_user").val("").hide();
    $("#map_name").closest(".choices").hide();
    map_name.clearStore();
    $("#commitment_report_table").DataTable().destroy();
    $("#commitment_report_table tbody").empty();

    if (type == "1") {
      $("#by_user").val("").show();
      $("#by_user").empty().append("<option value=''>Select User</option>");
      getUserNames();
    } else if (type == "2") {
      $("#map_name").closest(".choices").show();
      getLineNames();
    }
  });

  //commitment Report Table
  $("#reset_btn").click(function () {
    commitmentReportTable();
  });
});

function getUserNames() {
  $.post(
    "api/customer_status_report_files/getAllUserList.php",
    {
      screen_name: "Due Followup Activity",
    },
    function (response) {
      $("#by_user").empty().append("<option value=''>Select User</option>");

      $.each(response, function (index, val) {
        $("#by_user").append(
          $("<option>", {
            value: val.id,
            text: val.name,
          }),
        );
      });
    },
    "json",
  );
}

function getLineNames() {
  $.ajax({
    url: "api/customer_status_report_files/getAllLineList.php",
    type: "POST",
    dataType: "json",

    success: function (response) {
      // Clear existing options from Choices.js
      map_name.clearChoices();

      // Populate the existing Choices.js instance
      map_name.setChoices(
        response.map(function (val) {
          return {
            value: String(val.id),
            label: val.linename,
          };
        }),
        "value",
        "label",
        true,
      );
    },

    error: function (xhr, status, error) {
      console.error("Failed to load line names:", error);
      console.error(xhr.responseText);
    },
  });
}

function commitmentReportTable() {
  let fromDate = $("#from_date").val();
  let toDate = $("#to_date").val();
  let selectedType = $("#type").val();
  let selected_user = $("#by_user").val();

  let selectedVal = "";

  if (selectedType === "1") {
    // User
    selectedVal = "1"; // dummy value
  } else if (selectedType === "2") {
    // Line
    selectedVal = $("#map_name").val();
  }

  // Common validation
  if (!fromDate || !toDate || !selectedType) {
    swalError("Warning", "From Date, To Date, and Type are required.");
    return;
  }

  // User validation
  if (selectedType === "1" && !selected_user) {
    swalError("Warning", "Please select a user are required.");
    return;
  }

  // Line validation
  if (selectedType === "2" && !selectedVal) {
    swalError("Warning", "Mapping is required.");
    return;
  }

  $("#commitment_report_table").DataTable().destroy();
  // Declare table variable to store the DataTable instance
  var commitment_report_table = $("#commitment_report_table").DataTable({
    ...getStateSaveConfig("commitment_report_table"),
    order: [[0, "asc"]],
    processing: true,
    serverSide: true,
    infoCallback: customDataTableInfo,
    serverMethod: "post",
    ajax: {
      url: "api/report_files/get_due_followup_activity_report.php",
      data: function (data) {
        data.search = $("#search").val();
        data.from_date = $("#from_date").val();
        data.to_date = $("#to_date").val();
        data.selectedType = $("#type").val();
        data.selectedVal = selectedVal;
        data.user_id = $("#by_user").val();
      },
    },
    dom: "lBfrtip",
    buttons: [
      {
        extend: "excel",
        title: "Due Followup Activity List",
        action: function (e, dt, button, config) {
          var defaultAction = $.fn.dataTable.ext.buttons.excelHtml5.action;
          var dynamic = curDateJs("Due_Followup_Activity"); // or any base
          config.title = dynamic; // for versions that use title as filename
          config.filename = dynamic; // for html5 filename
          defaultAction.call(this, e, dt, button, config);
        },
      },
      {
        extend: "colvis",
        collectionLayout: "fixed four-column",
      },
    ],
    lengthMenu: [
      [10, 25, 50, -1],
      [10, 25, 50, "All"],
    ],
    drawCallback: function () {
      searchFunction("commitment_report_table");
    },
  });

  // Pass the table variable to the initColVisFeatures function
  initColVisFeatures(commitment_report_table, "commitment_report_table");
}
