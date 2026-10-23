const loanCategory = new Choices("#loan_category", {
  removeItemButton: true,
  noChoicesText: "Select Category",
  allowHTML: true,
});

const map_name = new Choices("#map_name", {
  removeItemButton: true,
  noChoicesText: "Select",
  allowHTML: true,
});

$("#map_name").closest(".choices").hide();

$(document).ready(function () {
  $("#type").change(function () {
    let type = $(this).val();

    $("#by_user").val("").hide();

    // Clear Line dropdown
    map_name.removeActiveItems();
    map_name.clearChoices();
    $("#map_name").closest(".choices").hide();

    // Clear Loan Category selections and reload options
    loanCategory.clearStore();
    getUserLoanCategories();

    // clear sub status
    $("#sub_status_type").val("");

    // Clear report tables and footers
    $("#pending_table, #current_table, #od_table").hide().find("tbody").empty();

    $("#current_table tfoot").empty();
    $("#pending_table tfoot").empty();
    $("#od_table tfoot").empty();

    // Reset header text
    $(".card-header").text("Customer Status Report");

    // Destroy existing DataTables
    ["#pending_table", "#current_table", "#od_table"].forEach(function (table) {
      if ($.fn.DataTable.isDataTable(table)) {
        $(table).DataTable().clear().destroy();
      }
    });

    if (type == "1") {
      $("#by_user")
        .empty()
        .append("<option value=''>Select User</option>")
        .show();

      getUserNames();
    } else if (type == "2") {
      $("#map_name").closest(".choices").show();
      getLineNames();
    }
  });

  $("#reset_btn").click(function () {
    let search_date = $("#search_date").val();
    let type = $("#type").val();
    let selected_user = $("#by_user").val();
    let map_name = $("#map_name").val();
    let loan_category = $("#loan_category").val();
    let sub_status_type = $("#sub_status_type").val();

    if (!search_date || !type || !loan_category || !sub_status_type) {
      swalError("Please Select All Fields!", "All fields are required.");
      return;
    }

    if ((type == 1 && !selected_user) || (type == "2" && !map_name)) {
      swalError("Please Select All Fields!", "All fields are required.");
      return;
    }

    const headerText = type == "2" ? "Line Name" : "User Name";

    $("#currentNameHeader").text(headerText);
    $("#pendingNameHeader").text(headerText);
    $("#odNameHeader").text(headerText);

    $("#current_table, #pending_table, #od_table, .dataTables_wrapper").hide();

    if (sub_status_type == "1") {
      $(".card-header").text("Current Report");
      $("#current_table").show();
      currentReportCount(
        search_date,
        type,
        selected_user,
        map_name,
        loan_category,
        sub_status_type,
      );
    } else if (sub_status_type == "2") {
      $(".card-header").text("Pending Report");
      $("#pending_table").show();
      pendingReportCount(
        search_date,
        type,
        selected_user,
        map_name,
        loan_category,
        sub_status_type,
      );
    } else if (sub_status_type == "3") {
      $(".card-header").text("OD Report");
      $("#od_table").show();
      odReportCount(
        search_date,
        type,
        selected_user,
        map_name,
        loan_category,
        sub_status_type,
      );
    }
  });
});

$(function () {
  getUserLoanCategories();
});

function getUserNames() {
  $.post(
    "api/customer_status_report_files/getAllUserList.php",
    {
      screen_name: 'Collection Status',
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

function getUserLoanCategories() {
  $.ajax({
    url: "api/customer_status_report_files/getLoanCategories.php",
    type: "POST",
    dataType: "json",

    success: function (response) {
      // Clear existing Choices.js options
      loanCategory.clearChoices();

      // Populate loan categories
      loanCategory.setChoices(
        response.map(function (val) {
          return {
            value: String(val.id),
            label: val.loan_category,
          };
        }),
        "value",
        "label",
        true,
      );
    },

    error: function (xhr, status, error) {
      console.error("Failed to load loan categories:", error);
      console.error(xhr.responseText);
    },
  });
}

function currentReportCount(
  search_date,
  type,
  selected_user,
  map_name,
  loan_category,
  sub_status_type,
) {
  $.ajax({
    url: "api/report_files/CurrentCustomerCountReport.php",
    method: "POST",
    data: {
      search_date: search_date,
      type: type,
      user_id: selected_user,
      map_name: map_name,
      loan_category: loan_category,
      sub_status_type: sub_status_type,
    },
    success: function (res) {
      try {
        const parsed = JSON.parse(res);

        if (!parsed.data || parsed.data.length === 0) {
          $("#current_table thead").html(
            "<tr><th colspan='10'>No data found for the selected filters</th></tr>",
          );
          $("#current_table").DataTable().clear().draw();
          return;
        }

        const { data, totalRow } = sortReportData(parsed);

        const columns = [
          { data: "sno" },
          { data: "date" },
          { data: "fullname" },
          { data: "loan_category" },
          { data: "total_count" },
          { data: "t_current_count" },
          { data: "payable_zero" },
          { data: "balance_count" },
          { data: "paid" },
          { data: "partially_paid" },
          { data: "totals_paid" },
          {
            data: "paid_percentage",
            render: function (data) {
              return Number(data).toFixed(1) + " %";
            },
          },
          { data: "unpaid" },
          {
            data: "unpaid_percentage",
            render: function (data) {
              return Number(data).toFixed(1) + " %";
            },
          },
          { data: "from_pending" },
        ];

        $("#current_table").DataTable().destroy();
        var current_table = $("#current_table").DataTable({
          ...getStateSaveConfig("current_table"),
          data: data,
          columns: columns,

          dom: "lBfrtip",
          buttons: [
            {
              extend: "excelHtml5",
              title: "Current Customer Count Report",
              action: function (e, dt, button, config) {
                let excelTitle = "Current Customer Count Report";
                excelExportAction(e, dt, button, config, excelTitle);
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
            searchFunction("current_table");
            paginationFunction("current_table");
          },
        });

        // Pass the table variable to the initColVisFeatures function
        initColVisFeatures(current_table, "current_table");

        let CurrentPaidPercent =
          totalRow.balance_count > 0
            ? (totalRow.totals_paid / totalRow.balance_count) * 100
            : 0;
        let CurrentUnpaidPercent =
          totalRow.balance_count > 0
            ? (totalRow.unpaid / totalRow.balance_count) * 100
            : 0;

        let footerHtml = `<tr>
                    <td></td>
                    <td></td>
                    <td><b>Total</b></td>
                    <td></td>
                    <td><b>${totalRow.total_count}</b></td>
                    <td><b>${totalRow.t_current_count}</b></td>
                    <td><b>${totalRow.payable_zero}</b></td>
                    <td><b>${totalRow.balance_count}</b></td>
                    <td><b>${totalRow.paid}</b></td>
                    <td><b>${totalRow.partially_paid}</b></td>
                    <td><b>${totalRow.totals_paid}</b></td>
                    <td><b>${CurrentPaidPercent.toFixed(1)} %</b></td>
                    <td><b>${totalRow.unpaid}</b></td>
                    <td><b>${CurrentUnpaidPercent.toFixed(1)} %</b></td>
                    <td><b>${totalRow.from_pending}</b></td>
                </tr>`;

        $("#current_table tfoot").html(footerHtml);
      } catch (e) {
        console.error("Invalid JSON:", res);
        swalError("Error", "File returing Error kindly contact admin.");
      }
    },
    error: function (xhr, status, error) {
      console.error(error);
      alert("AJAX request failed");
    },
  });
}

function pendingReportCount(
  search_date,
  type,
  selected_user,
  map_name,
  loan_category,
  sub_status_type,
) {
  $.ajax({
    url: "api/report_files/PendingCustomerCountReport.php",
    method: "POST",
    data: {
      search_date: search_date,
      type: type,
      user_id: selected_user,
      map_name: map_name,
      loan_category: loan_category,
      sub_status_type: sub_status_type,
    },
    success: function (res) {
      try {
        const parsed = JSON.parse(res);

        if (!parsed.data || parsed.data.length === 0) {
          $("#pending_table thead").html(
            "<tr><th colspan='10'>No data found for the selected filters</th></tr>",
          );
          $("#pending_table").DataTable().clear().draw();
          return;
        }

        const { data, totalRow } = sortReportData(parsed);

        const columns = [
          { data: "sno" },
          { data: "date" },
          { data: "fullname" },
          { data: "loan_category" },
          { data: "total_count" },
          { data: "t_pending_count" },
          { data: "today_pending_clear" },
          { data: "t_pending_clear" },
          { data: "partially_paid" },
          { data: "total_paid_pending" },
          {
            data: "paid_percentage",
            render: function (data) {
              return Number(data).toFixed(1) + " %";
            },
          },
          { data: "unpaid" },
          {
            data: "unpaid_percentage",
            render: function (data) {
              return Number(data).toFixed(1) + " %";
            },
          },
        ];

        $("#pending_table").DataTable().destroy();
        $("#pending_table").DataTable({
          data: data,
          columns: columns,

          dom: "lBfrtip",
          buttons: [
            {
              extend: "excelHtml5",
              title: "Pending Customer Count Report",
              action: function (e, dt, button, config) {
                let excelTitle = "Pending Customer Count Report";
                excelExportAction(e, dt, button, config, excelTitle);
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
            searchFunction("pending_table");
            paginationFunction("pending_table");
          },
        });

        let PendingPaidPercent =
          totalRow.t_pending_count > 0
            ? (totalRow.total_paid_pending / totalRow.t_pending_count) * 100
            : 0;
        let PendingUnpaidPercent =
          totalRow.t_pending_count > 0
            ? (totalRow.unpaid / totalRow.t_pending_count) * 100
            : 0;

        let footerHtml = `<tr>
                    <td></td>
                    <td></td>
                    <td><b>Total</b></td>
                    <td></td>
                    <td><b>${totalRow.total_count}</b></td>
                    <td><b>${totalRow.t_pending_count}</b></td>
                    <td><b>${totalRow.today_pending_clear}</b></td>
                    <td><b>${totalRow.t_pending_clear}</b></td>
                    <td><b>${totalRow.partially_paid}</b></td>
                    <td><b>${totalRow.total_paid_pending}</b></td>
                    <td><b>${PendingPaidPercent.toFixed(1)} %</b></td>
                    <td><b>${totalRow.unpaid}</b></td>
                    <td><b>${PendingUnpaidPercent.toFixed(1)} %</b></td>
                </tr>`;

        $("#pending_table tfoot").html(footerHtml);
      } catch (e) {
        console.error("Invalid JSON:", res);
        swalError("Error", "File returing Error kindly contact admin.");
      }
    },
    error: function (xhr, status, error) {
      console.error(error);
      alert("AJAX request failed");
    },
  });
}

function odReportCount(
  search_date,
  type,
  selected_user,
  map_name,
  loan_category,
  sub_status_type,
) {
  $.ajax({
    url: "api/report_files/odCustomerCountReport.php",
    method: "POST",
    data: {
      search_date: search_date,
      type: type,
      user_id: selected_user,
      map_name: map_name,
      loan_category: loan_category,
      sub_status_type: sub_status_type,
    },
    success: function (res) {
      try {
        const parsed = JSON.parse(res);

        if (!parsed.data || parsed.data.length === 0) {
          $("#od_table thead").html(
            "<tr><th colspan='10'>No data found for the selected filters</th></tr>",
          );
          $("#od_table").DataTable().clear().draw();
          return;
        }

        const { data, totalRow } = sortReportData(parsed);

        const columns = [
          { data: "sno" },
          { data: "date" },
          { data: "fullname" },
          { data: "loan_category" },
          { data: "total_count" },
          { data: "t_od_count" },
          { data: "today_od_clear" },
          { data: "t_od_clear" },
          { data: "partially_paid" },
          { data: "total_paid_od" },
          {
            data: "paid_percentage",
            render: function (data) {
              return Number(data).toFixed(1) + " %";
            },
          },
          { data: "unpaid" },
          {
            data: "unpaid_percentage",
            render: function (data) {
              return Number(data).toFixed(1) + " %";
            },
          },
        ];

        $("#od_table").DataTable().destroy();
        $("#od_table").DataTable({
          data: data,
          columns: columns,

          dom: "lBfrtip",
          buttons: [
            {
              extend: "excelHtml5",
              title: "OD Customer Count Report",
              action: function (e, dt, button, config) {
                let excelTitle = "OD Customer Count Report";
                excelExportAction(e, dt, button, config, excelTitle);
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
            searchFunction("od_table");
            paginationFunction("od_table");
          },
        });

        let odPaidPercent =
          totalRow.t_od_count > 0
            ? (totalRow.total_paid_od / totalRow.t_od_count) * 100
            : 0;
        let odUnpaidPercent =
          totalRow.t_od_count > 0
            ? (totalRow.unpaid / totalRow.t_od_count) * 100
            : 0;

        let footerHtml = `<tr>
                    <td></td>
                    <td></td>
                    <td><b>Total</b></td>
                    <td></td>
                    <td><b>${totalRow.total_count}</b></td>
                    <td><b>${totalRow.t_od_count}</b></td>
                    <td><b>${totalRow.today_od_clear}</b></td>
                    <td><b>${totalRow.t_od_clear}</b></td>
                    <td><b>${totalRow.partially_paid}</b></td>
                    <td><b>${totalRow.total_paid_od}</b></td>
                    <td><b>${odPaidPercent.toFixed(1)} %</b></td>
                    <td><b>${totalRow.unpaid}</b></td>
                    <td><b>${odUnpaidPercent.toFixed(1)} %</b></td>
                </tr>`;

        $("#od_table tfoot").html(footerHtml);
      } catch (e) {
        console.error("Invalid JSON:", res);
        swalError("Error", "File returing Error kindly contact admin.");
      }
    },
    error: function (xhr, status, error) {
      console.error(error);
      alert("AJAX request failed");
    },
  });
}

function sortReportData(parsed) {
  const data = parsed.data || [];

  // Keep the Total row separately
  const totalRow = data.length > 0 ? data[data.length - 1] : null;

  if (totalRow && totalRow.fullname === "Total") {
    data.pop();
  }

  // Loan category order
  const categoryOrder = {
    Monthly: 1,
    Weekly: 2,
    Daily: 3,
  };

  // Automatically identify line names
  function getLineOrder(name) {
    const match = String(name ?? "")
      .trim()
      .match(/^([A-Za-z]+)(\d+)$/);

    if (!match) {
      return {
        prefix: String(name ?? "")
          .trim()
          .toUpperCase(),
        number: 0,
      };
    }

    return {
      prefix: match[1].toUpperCase(),
      number: Number(match[2]),
    };
  }

  // Sort by category, then line name
  data.sort((a, b) => {
    const categoryA = categoryOrder[a.loan_category] ?? 999;
    const categoryB = categoryOrder[b.loan_category] ?? 999;

    if (categoryA !== categoryB) {
      return categoryA - categoryB;
    }

    const lineA = getLineOrder(a.fullname);
    const lineB = getLineOrder(b.fullname);

    const prefixCompare = lineA.prefix.localeCompare(lineB.prefix);

    if (prefixCompare !== 0) {
      return prefixCompare;
    }

    return lineA.number - lineB.number;
  });

  // Reassign serial numbers
  data.forEach((row, index) => {
    row.sno = index + 1;
  });

  return { data, totalRow };
}
