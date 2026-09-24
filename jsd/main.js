
// Todays Date
$(function () {
	var interval = setInterval(function () {
		var momentNow = moment();
		$('#today-date').html(momentNow.format('DD') + ' ' + ' '
			+ momentNow.format('- dddd').substring(0, 12));
	}, 100);
});
$(function () {
	var interval = setInterval(function () {
		var momentNow = moment();
		$('#todays-date').html(momentNow.format('DD MMMM YYYY'));
	}, 100);
});
// Loading
$(function () {
	$("#loading-wrapper").fadeOut(3000);
});
// Textarea characters left
$(function () {
	$('#characterLeft').text('140 characters left');
	$('#message').keydown(function () {
		var max = 140;
		var len = $(this).val().length;
		if (len >= max) {
			$('#characterLeft').text('You have reached the limit');
			$('#characterLeft').addClass('red');
			$('#btnSubmit').addClass('disabled');
		}
		else {
			var ch = max - len;
			$('#characterLeft').text(ch + ' characters left');
			$('#btnSubmit').removeClass('disabled');
			$('#characterLeft').removeClass('red');
		}
	});
});
// Todo list
$('.todo-body').on('click', 'li.todo-list', function () {
	$(this).toggleClass('done');
});
// Tasks
(function ($) {
	var checkList = $('.task-checkbox'),
		toDoCheck = checkList.children('input[type="checkbox"]');
	toDoCheck.each(function (index, element) {
		var $this = $(element),
			taskItem = $this.closest('.task-block');
		$this.on('click', function (e) {
			taskItem.toggleClass('task-checked');
		});
	});
})(jQuery);
// Tasks Important Active
$('.task-actions').on('click', '.important', function () {
	$(this).toggleClass('active');
});
// Tasks Important Active
$('.task-actions').on('click', '.star', function () {
	$(this).toggleClass('active');
});
// Countdown
$(document).ready(function () {
	
	countdown();
	setInterval(countdown, 1000);
	function countdown() {
		var now = moment(), // get the current moment
			// May 28, 2013 @ 12:00AM
			then = moment([2020, 10, 7]),
			// get the difference from now to then in ms
			ms = then.diff(now, 'milliseconds', true);
		// If you need years, uncomment this line and make sure you add it to the concatonated phrase
		/*
		years = Math.floor(moment.duration(ms).asYears());
		then = then.subtract('years', years);
		*/
		// update the duration in ms
		ms = then.diff(now, 'milliseconds', true);
		// get the duration as months and round down
		// months = Math.floor(moment.duration(ms).asMonths());

		// // subtract months from the original moment (not sure why I had to offset by 1 day)
		// then = then.subtract('months', months).subtract('days', 1);
		// update the duration in ms
		ms = then.diff(now, 'milliseconds', true);
		days = Math.floor(moment.duration(ms).asDays());

		then = then.subtract(days, 'days');
		// update the duration in ms
		ms = then.diff(now, 'milliseconds', true);
		hours = Math.floor(moment.duration(ms).asHours());

		then = then.subtract(hours, 'hours');
		// update the duration in ms
		ms = then.diff(now, 'milliseconds', true);
		minutes = Math.floor(moment.duration(ms).asMinutes());

		then = then.subtract(minutes, 'minutes');
		// update the duration in ms
		ms = then.diff(now, 'milliseconds', true);
		seconds = Math.floor(moment.duration(ms).asSeconds());

		// concatonate the variables
		diff = '<div class="num">' + days + ' <span class="text"> Days Left</span></div>';
		$('#daysLeft').html(diff);
	}
});
// Bootstrap JS ***********
// Tooltip
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})
$(function () {
	$('[data-toggle="popover"]').popover()
})
// Custom Sidebar JS
jQuery(function ($) {
	// Dropdown menu
	$(".sidebar-dropdown > a").click(function () {
		$(".sidebar-submenu").slideUp(200);
		if ($(this).parent().hasClass("active")) {
			$(".sidebar-dropdown").removeClass("active");
			$(this).parent().removeClass("active");
		} else {
			$(".sidebar-dropdown").removeClass("active");
			$(this).next(".sidebar-submenu").slideDown(200);
			$(this).parent().addClass("active");
		}
	});
	//toggle sidebar
	$("#toggle-sidebar").click(function () {
		$(".page-wrapper").toggleClass("toggled");
	});
	// Pin sidebar on click
	$("#pin-sidebar").click(function () {
		if ($(".page-wrapper").hasClass("pinned")) {
			// unpin sidebar when hovered
			$(".page-wrapper").removeClass("pinned");
			$('.logo').css('visibility', 'visible');
			$("#sidebar").unbind("hover");

		} else {
			$(".page-wrapper").addClass("pinned");
			$('.logo').css('visibility', 'hidden');
			$("#sidebar").off('hover').hover(
				function () {
					// console.log("mouseenter");
					$(".page-wrapper").addClass("sidebar-hovered");
				},
				function () {
					// console.log("mouseout");
					$(".page-wrapper").removeClass("sidebar-hovered");
				}
			)
		}
	});
	// Pinned sidebar
	$(function () {
		$("#sidebar").hover(
			function () {
				// console.log("mouseenter");
				$(".page-wrapper").addClass("sidebar-hovered");
				$(".page-wrapper").hasClass("pinned") ? $('.logo').css('visibility', 'visible') : '';
			},
			function () {
				// console.log("mouseout");
				$(".page-wrapper").removeClass("sidebar-hovered");
				$(".page-wrapper").hasClass("pinned") ? $('.logo').css('visibility', 'hidden') : '';
			}
		)
	});
	// Toggle sidebar overlay
	$("#overlay").click(function () {
		$(".page-wrapper").toggleClass("toggled");
	});
	// Added by Srinu 
	$(function () {
		// When the window is resized, 
		$(window).resize(function () {
			// When the width and height meet your specific requirements or lower
			if ($(window).width() <= 768) {
				$(".page-wrapper").removeClass("pinned");
			}
		});
		// When the window is resized, 
		$(window).resize(function () {
			// When the width and height meet your specific requirements or lower
			if ($(window).width() >= 768) {
				$(".page-wrapper").removeClass("toggled");
			}
		});
	});
});
//this will set all alert messages with class 'alert' in slow fade out
setTimeout(function () {
	$('.alert').fadeOut('slow');
}, 2000);
//this will disable clicking outside of a modal in overall project
$('.modal').attr({
	'data-backdrop': "static",
	'data-keyboard': "false"
});
//this will disable auto complete in all input fields
$('input').attr('autocomplete', 'off');
// this will prevent normal window.alert messages to set it as swal
window.alert = function (message) {
	Swal.fire({
		text: message,
		target: 'body',
		toast: true,
		position: 'top-right',
		timer: 2000,
		showConfirmButton: true,
		confirmButtonColor: 'var(--primary-color)',
		timerProgressBar: true,
	})
	return false;
};
////////// Show Loader if ajax function is called inside anywhere in entire project  ////////
$(document).ajaxStart(function () {
	showOverlay();
});

$(document).ajaxStop(function () {
	hideOverlay();
});

showOverlay();

window.addEventListener('load', function () {
	hideOverlay();
});

function showOverlay() {

	// Don't create another overlay if one already exists
	if (document.querySelector('.overlay')) {
		return;
	}

	var overlayDiv = document.createElement('div');
	overlayDiv.classList.add('overlay');

	var loaderDiv = document.createElement('div');
	loaderDiv.classList.add('loader');

	var overlayText = document.createElement('span');
	overlayText.classList.add('overlay-text');
	overlayText.innerText = 'Please Wait';

	overlayDiv.appendChild(loaderDiv);
	overlayDiv.appendChild(overlayText);

	document.body.appendChild(overlayDiv);
}

function hideOverlay() {

	var overlayDiv = document.querySelector('.overlay');

	if (overlayDiv) {
		overlayDiv.remove();
	}
}
function getUserAccess(callback) {
	$.ajax({
		url: 'api/user_creation_files/get_download_access.php', // Replace with your endpoint
		method: 'POST',
		dataType: 'json', // Expect JSON response
		success: function (response) {
			// Check if response contains download_access
			const downloadAccess = response.download_access || 0; // Default to 0 if not found
			callback(downloadAccess);
		},
	});
}

// Initialize DataTable with user access controls
function setdtable(table_id) {
	// Fetch user access and initialize DataTable based on it
	getUserAccess(function (downloadAccess) {
		let buttons = [];
		// Add Excel button if download access is 1
		if (downloadAccess == 1) {
			buttons.push({
				extend: 'excel',
				title: "Export Data"
			});
		}
		// Add other buttons
		buttons.push({
			extend: 'colvis',
			collectionLayout: 'fixed four-column',
		});
		// Initialize DataTable
		$(table_id).DataTable({
			'processing': true,
			'iDisplayLength': 10,
			"lengthMenu": [
				[10, 25, 50, -1],
				[10, 25, 50, "All"]
			],
			"createdRow": function (row, data, dataIndex) {
				$(row).find('td:first').html(dataIndex + 1);
			},
			"drawCallback": function (settings) {
				this.api().column(0).nodes().each(function (cell, i) {
					cell.innerHTML = i + 1;
				});
				searchFunction(table_id.replace(/^#/, ''));
				paginationFunction(table_id.replace(/^#/, ''));
			},
			dom: 'lBfrtip',
			buttons: buttons
		});

	});
}
///////////////////////////////////////////////////////////////////////////////////
///Append Row in Table TBody after getting response from ajax. ///common for all table//// Just send table id, response from ajax, Column in table. 
function appendDataToTable(tableSelector, response, columnMapping) {
	$(tableSelector).DataTable().destroy();
	let tableBody = $(tableSelector + ' tbody');
	tableBody.empty(); // Clear any existing rows in the table body

	// Iterate over the JSON data
	$.each(response, function (index, item) {
		// Create a new table row
		var row = $('<tr>');
		// Iterate over the column mapping
		$.each(columnMapping, function (key, value) {
			// Create a table cell with the data
			if (value === 'sno') {
				$('<td>').text(index + 1).appendTo(row); // Add serial number
			} else if (item.hasOwnProperty(value)) {

				if (value === 'action' || value === 'upload' || value === 'charts' || value === 'info') {
					// If the key is 'action' or 'upload', insert the HTML content directly
					$('<td>').html(item[value]).appendTo(row);
				} else {
					// Otherwise, insert the text content
					$('<td>').text(item[value]).appendTo(row);
				}
			}
		});
		// Append the row to the table body
		tableBody.append(row);
	});
}
/////////////////////////////////////////////////////

function serverSideTable(tableSelector, params, apiUrl) {
	 const tableId = tableSelector.replace(/^#/, '');

    getUserAccess(function (downloadAccess) {

        let buttons = [];

        // Excel - only when download permission is 1
        if (downloadAccess == 1) {
            buttons.push({
                extend: 'excel',
                title: tableId
            });
        }

        // Column visibility
        buttons.push({
            extend: 'colvis',
            collectionLayout: 'fixed four-column'
        });

       

        // Destroy existing DataTable
        if ($.fn.DataTable.isDataTable(tableSelector)) {
            $(tableSelector).DataTable().destroy();
        }

        // Remove old events
        $(tableSelector).off(
            'preXhr.dt xhr.dt error.dt draw.dt'
        );

        // Loader
        $(tableSelector).on('preXhr.dt', function () {
            showOverlay();
        });

        $(tableSelector).on('xhr.dt', function () {
            hideOverlay();
        });

        $(tableSelector).on('error.dt', function () {
            hideOverlay();
        });

        const table = $(tableSelector).DataTable({

            ...getStateSaveConfig(tableId),

            order: [[0, "desc"]],

            processing: true,

            serverSide: true,

            serverMethod: 'post',

            ajax: {
                url: apiUrl,

                data: function (data) {

                    let searchValue = data.search.value;

                    if (!searchValue) {
                        searchValue = $('input[type=search]').val();
                    }

                    data.search = searchValue;

                    data.params = params;
                }
            },

            dom: 'lBfrtip',

            buttons: buttons,

            lengthMenu: [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],

            drawCallback: function () {

                setDropdownScripts();

                searchFunction(tableId);

                paginationFunction(tableId);

                initColVisFeatures(
                    table,
                    tableId
                );
            }
        });

    });
}



////////////////////////////////////////////////////



//Swal alert section *************************
function swalSuccess(title, text) {
	Swal.fire({
		icon: 'success',
		title: title,
		text: text,
		showConfirmButton: false,
		timerProgressBar: true,
		timer: 2000,
	})
}
function swalSuccessOk(title, text, callback) {
	Swal.fire({
		icon: 'success',
		title: title,
		text: text,
		showConfirmButton: true,
		confirmButtonText: 'OK',
		confirmButtonColor: '#333c61',
		allowOutsideClick: false,
		allowEscapeKey: false
	}).then((result) => {
		if (result.isConfirmed && typeof callback === "function") {
			callback(); // ✅ run only after OK
		}
	});
}


function swalError(title, text) {
	Swal.fire({
		icon: 'error',
		title: title,
		text: text,
		confirmButtonColor: 'var(--primary-color)',
	})
}
function swalInfo(title, text) {
	Swal.fire({
		icon: 'info',
		title: title,
		text: text,
		confirmButtonColor: 'var(--primary-color)',
	})
}
function swalConfirm(title, text, functionname, idvalue, noCallback) {
	Swal.fire({
		title: title,
		text: text,
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#333c61',
		cancelButtonColor: '#d33',
		cancelButtonText: 'No',
		confirmButtonText: 'Yes'
	}).then((result) => {
		if (result.isConfirmed) {
			functionname(idvalue);
		} else if (noCallback) {
			noCallback();
		}
	});
}
function checkMobileNo(mobileno, selector) {
	if (mobileno != '') {
		let mobileNoRegex = /[6-9]{1}[0-9]{9}$/;
		if (!(mobileNoRegex.test(mobileno))) {
			swalError('Warning', 'Enter valid Mobile Number.')
			$('#' + selector).val('')
		}
	}
}
function checkLandlineFormat(number, selector) {
	if (number != '') {
		let regex = /^\d{8,12}$/; // Landline number format (8 to 12 digits)
		if (!regex.test(number)) {
			swalError('Warning', 'Enter a valid landline number.');
			$('#' + selector).val('');
		}
	}
}
function validateEmail(emailInput, selector) {
	// Regular expression for email validation
	if (emailInput != '') {
		let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(emailInput)) {
			swalError('Warning', 'Kindly enter valid Email address');
			$('#' + selector).val('');
		}
	}
}

function setDropdownScripts() {
	$('.dropdown').off().click(function (event) {
		// Toggle dropdown
		$('.dropdown').not(this).removeClass('active');
		$(this).toggleClass('active');
	});

	$(document).click(function (event) {
		var target = $(event.target);

		// Close dropdown if clicking outside, but allow logout link to work
		if (!target.closest('.dropdown').length && !target.closest('.logout-link').length) {
			$('.dropdown').removeClass('active');
		}
	});

	// Ensure logout works even when dropdown is active
	$('.logout-link').off().click(function (event) {
		$('.dropdown').removeClass('active'); // Close dropdowns
	});
}

// function checkInputFileSize(input, allowdsize, img) {
// 	if (input.files.length > 0) {
// 		const fileSize = input.files[0].size; // Get the size of the selected file
// 		const maxSize = allowdsize * 1024; // Maximum size in bytes (200 KB)
// 		if (fileSize > maxSize) {
// 			alert("Maximum File Size " + allowdsize + " KB. Please select a smaller file.");
// 			input.value = ''; // Clear the selected file
// 			img.attr('src', 'img/avatar.png');
// 		}
// 	}
// }
function compressImage(input, targetSizeKB) {
	if (input.files.length > 0) {
		const fileSize = input.files[0].size;
		const maxSize = targetSizeKB * 1024;

		if (fileSize > maxSize) {
			const file = input.files[0];
			const reader = new FileReader();

			reader.onload = (event) => {
				const img = new Image();

				img.onload = () => {
					const canvas = document.createElement("canvas");
					const ctx = canvas.getContext("2d");

					// Resize image if it exceeds max dimensions
					const maxImageDimension = 800;
					let { width, height } = img;

					if (width > maxImageDimension || height > maxImageDimension) {
						const scale = Math.min(maxImageDimension / width, maxImageDimension / height);
						width *= scale;
						height *= scale;
					}

					canvas.width = width;
					canvas.height = height;
					ctx.drawImage(img, 0, 0, width, height);

					let quality = 0.9;
					const targetSizeBytes = targetSizeKB * 1024;

					function compress() {
						canvas.toBlob((blob) => {
							if (blob.size > targetSizeBytes && quality > 0.1) {
								quality -= 0.1;
								compress(); // Retry
							} else if (blob.size <= targetSizeBytes) {
								const compressedFile = new File([blob], file.name, {
									type: file.type,
									lastModified: Date.now(),
								});
								// ✅ Log compressed size in KB

								const dataTransfer = new DataTransfer();
								dataTransfer.items.add(compressedFile);
								input.files = dataTransfer.files;
							} else {
								alert("Unable to compress below the target size.");
							}
						}, file.type, quality);
					}

					compress();
				};

				img.src = event.target.result;
			};

			reader.readAsDataURL(file);
		}
	}
}

function setCurrentDate(field_id) {
	const curDate = new Date();
	const curYear = curDate.getFullYear();
	const curMonth = curDate.getMonth() + 1;
	const curDay = curDate.getDate();
	$(field_id).val(`${curYear}-${curMonth < 10 ? '0' + curMonth : curMonth}-${curDay < 10 ? '0' + curDay : curDay}`);
}

function validateField(value, fieldId) {
	let response; // Declare the variable locally
	if (value === '' || value === null || value === undefined) {
		response = false;
		$('#' + fieldId).css('border', '1px solid #ff0000');
		swalError('Warning', 'Please fill out mandatory fields!');
	} else {
		response = true;
		$('#' + fieldId).css('border', '1px solid #cecece');
	}
	return response;
}
function validateMultiSelectField(fieldId, choicesInstance) {
	const selectedValues = choicesInstance.getValue(true);
	const choicesElement = $('#' + fieldId).closest('.choices'); // Targeting the Choices.js container

	if (selectedValues.length === 0) {
		choicesElement.find('.choices__inner').css('border', '1px solid #ff0000');
		swalError('Warning', 'Please fill out mandatory fields!');
		return false;
	} else {
		choicesElement.find('.choices__inner').css('border', '1px solid #cecece');
		return true;
	}
}

// function moneyFormatIndia(num) {
// 	var isNegative = false;
// 	if (num < 0) {
// 		isNegative = true;
// 		num = Math.abs(num);
// 	}

// 	var explrestunits = "";
// 	if (num.toString().length > 3) {
// 		var lastthree = num.toString().substr(num.toString().length - 3);
// 		var restunits = num.toString().substr(0, num.toString().length - 3);
// 		restunits = (restunits.length % 2 == 1) ? "0" + restunits : restunits;
// 		var expunit = restunits.match(/.{1,2}/g);
// 		for (var i = 0; i < expunit.length; i++) {
// 			if (i == 0) {
// 				explrestunits += parseInt(expunit[i]) + ",";
// 			} else {
// 				explrestunits += expunit[i] + ",";
// 			}
// 		}
// 		var thecash = explrestunits + lastthree;
// 	} else {
// 		var thecash = num;
// 	}

// 	return isNegative ? "-" + thecash : thecash;
// }

function moneyFormatIndia(num) {
	var isNegative = false;
	if (num < 0) {
		isNegative = true;
		num = Math.abs(num);
	}

	// 🔹 Split decimal part (minimal addition)
	num = num.toString();
	var parts = num.split('.');
	var intPart = parts[0];
	var decPart = parts.length > 1 ? '.' + parts[1] : '';

	var explrestunits = "";
	if (intPart.length > 3) {
		var lastthree = intPart.substr(intPart.length - 3);
		var restunits = intPart.substr(0, intPart.length - 3);
		restunits = (restunits.length % 2 == 1) ? "0" + restunits : restunits;
		var expunit = restunits.match(/.{1,2}/g);
		for (var i = 0; i < expunit.length; i++) {
			if (i == 0) {
				explrestunits += parseInt(expunit[i]) + ",";
			} else {
				explrestunits += expunit[i] + ",";
			}
		}
		var thecash = explrestunits + lastthree + decPart;
	} else {
		var thecash = intPart + decPart;
	}

	return isNegative ? "-" + thecash : thecash;
}


function checkBankTransactionDetails(crdrType, bankId, transId, amount) {
	return $.post('api/accounts_files/accounts/getBankTransactionDetails.php', {
		crdrType,
		bankId,
		transId,
		amount
	}, null, 'json');
}

function nameFormatter(selector) {
	$(selector).on('input', function () {
		let value = $(this).val();

		// Split by space
		let parts = value.split(" ");

		if (parts.length > 1) {
			// Convert second part to CAPS and allow only 2 letters
			parts[1] = parts[1].toUpperCase().replace(/[^A-Z]/g, "").substring(0, 2);
			// Block more than 2 parts
			if (parts.length > 2) {
				parts = parts.slice(0, 2);
			}
		}
		$(this).val(parts.join(" "));
	});
}

function mantraInitDevice() {
	const deviceList = GetConnectedDeviceList();

	console.log("Connected Devices:", deviceList);

	const desc = deviceList?.data?.ErrorDescription;

	if (deviceList?.httpStaus && deviceList?.data?.ErrorCode == "0" && desc) {

		const device = desc.split(":")[1]?.trim();

		if (device) {
			console.log("Device Name:", device);
			const init = InitDevice(device, "");
			console.log("Init result:", init);
			(init.data.ErrorCode != '0') ? alert(`Device Name: ${device}, ${init.data.ErrorDescription}.`) : ''; //Alert show only if device not connected or gets error. 
		} else {
			alert("Fingerprint Device not found in description");
			console.error("Device not found in description");
		}

	} else {
		alert("Fingerprint Device not connected");
		console.error("Device not connected");
	}
}


//////////////////////////////////// Session Logout Time Start ////////////////////////////////////

/* ---------------- CONFIG ---------------- */
let warningTimeout, logoutTimeout;
let swalOpen = false;

const idleTime = 10 * 60 * 1000; // 10 minutes;
const warningDuration = 10 * 1000; // 10 seconds
const STORAGE_KEY = "last-activity";
const FORCE_LOGOUT_KEY = "force-logout";

/* ---------------- HELPERS ---------------- */
const now = () => Date.now();

const getLastActivity = () =>
	Number(localStorage.getItem(STORAGE_KEY)) || now();

const setLastActivity = () =>
	localStorage.setItem(STORAGE_KEY, now());

/* ---------------- TIMER LOGIC ---------------- */
function startTimers() {
	clearTimeout(warningTimeout);
	clearTimeout(logoutTimeout);

	const idle = now() - getLastActivity();
	const remaining = idleTime - idle;

	if (remaining <= 0) {
		showWarning();
		return;
	}

	warningTimeout = setTimeout(
		showWarning,
		Math.max(remaining - warningDuration, 0)
	);
}

/* ---------------- ACTIVITY ---------------- */
function resetTimers() {
	if (swalOpen) hideWarning();
	setLastActivity();
	startTimers();
}

/* ---------------- ALERT ---------------- */
function showWarning() {
	if (swalOpen) return;

	swalOpen = true;

	Swal.fire({
		icon: 'warning',
		title: 'Warning',
		text: 'Session will expire in 10 seconds due to inactivity',
		timer: warningDuration,
		timerProgressBar: true,
		allowOutsideClick: false,
		allowEscapeKey: false,
		showConfirmButton: false
	});

	logoutTimeout = setTimeout(() => {
		window.location.href = 'logout.php';
	}, warningDuration);
}

function hideWarning() {
	swalOpen = false;
	Swal.close();
}

/* ---------------- EVENT BINDINGS ---------------- */

// Initial load
window.addEventListener("load", () => {
	setLastActivity();
	startTimers();
});

// Keyboard (capture phase → works with SweetAlert)
document.addEventListener("keydown", resetTimers, true);

// Mouse activity
window.addEventListener("mousemove", resetTimers);

// STORAGE SYNC (IDLE + FORCE LOGOUT)
window.addEventListener("storage", (e) => {

	// Idle activity sync
	if (e.key === STORAGE_KEY) {
		if (swalOpen) hideWarning();
		startTimers();
	}

	// Force logout across all tabs
	if (e.key === FORCE_LOGOUT_KEY) {
		window.location.href = 'logout.php';
	}
});

//////////////////////////////////// Session Logut Time End ////////////////////////////////////

function searchFunction(table_name) {
    let $searchInput = $(`#${table_name}_wrapper .dataTables_filter input[type=search]`);

    $searchInput.attr({
        'title': 'Press Enter or click outside to search',
        'autocomplete': 'off'
    });

    // Remove DataTables' own default keyup/input search listener + any of ours from before
    $searchInput.off('keyup.DT input.DT keyup blur');

    function doSearch() {
        let table = $(`#${table_name}`).DataTable();
        table.search($searchInput.val()).draw();
    }

    // Trigger on Enter key
    $searchInput.on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            doSearch();
        }
    });

    // Trigger on blur (click/tab outside the box)
    $searchInput.on('blur', function (e) {
        doSearch();
    });
}



//////////////////////////////////// Pagination  Start ////////////////////////////////////

function paginationFunction(tableId) {
    const table = $(`#${tableId}`).DataTable();
    const pagination = $(`#${tableId}_paginate`);
    const pageInfo = table.page.info();

    // If current page is greater than available pages,
    // automatically move to first page
    if (pageInfo.pages > 0 && pageInfo.page >= pageInfo.pages) {
        localStorage.removeItem(`${tableId}_currentPage`);
        table.page(0).draw('page');
        return;
    }

    // If no data
    if (pageInfo.pages === 0) {
        pagination.html(
            '<span class="paginate_button disabled">No pages</span>'
        );
        return;
    }

    const currentPage = pageInfo.page;
    const totalPages = pageInfo.pages;
    const maxVisible = 6;

    // Save current page
    localStorage.setItem(
        `${tableId}_currentPage`,
        currentPage
    );

    pagination.empty();

    // Add pagination button
    const addButton = (
        label,
        pageNum,
        isActive = false,
        isDisabled = false
    ) => {
        const classList = ['paginate_button'];

        if (isActive) {
            classList.push('current');
        }

        if (isDisabled) {
            classList.push('disabled');
        }

        pagination.append(`
            <span
                class="${classList.join(' ')}"
                data-page="${pageNum}"
            >
                ${label}
            </span>
        `);
    };

    // Previous
    addButton(
        'Previous',
        currentPage - 1,
        false,
        currentPage === 0
    );

    // First page
    addButton(
        1,
        0,
        currentPage === 0
    );

    // Middle pages
    if (totalPages > 1) {

        let start = Math.max(
            1,
            currentPage - Math.floor(maxVisible / 2)
        );

        let end = start + maxVisible - 1;

        // Keep last page visible
        if (end >= totalPages - 1) {
            end = totalPages - 2;

            start = Math.max(
                1,
                end - maxVisible + 1
            );
        }

        // Left ellipsis
        if (start > 1) {
            pagination.append(
                '<span class="paginate_ellipsis">...</span>'
            );
        }

        // Page numbers
        for (let i = start; i <= end; i++) {

            addButton(
                i + 1,
                i,
                currentPage === i
            );
        }

        // Right ellipsis
        if (end < totalPages - 2) {
            pagination.append(
                '<span class="paginate_ellipsis">...</span>'
            );
        }

        // Last page
        addButton(
            totalPages,
            totalPages - 1,
            currentPage === totalPages - 1
        );
    }

    // Next
    addButton(
        'Next',
        currentPage + 1,
        false,
        currentPage === totalPages - 1 || totalPages === 1
    );

    // Jump to page input
    if ($(`#${tableId}_jumpToPage`).length === 0) {

        pagination.append(`
            <input
                type="number"
                id="${tableId}_jumpToPage"
                min="1"
                max="${totalPages}"
                placeholder="Page"
                style="
                    width: 60px;
                    height: 30px;
                    margin-left: 10px;
                "
            />
        `);

    } else {

        // Update max when total pages changes
        $(`#${tableId}_jumpToPage`)
            .attr('max', totalPages)
            .val('');
    }

    // Pagination button click
    pagination
        .off('click')
        .on(
            'click',
            '.paginate_button',
            function () {

                if ($(this).hasClass('disabled')) {
                    return;
                }

                const page = parseInt(
                    $(this).attr('data-page'),
                    10
                );

                if (!isNaN(page)) {

                    table
                        .page(page)
                        .draw('page');
                }
            }
        );

    // Jump to page
    $(`#${tableId}_jumpToPage`)
        .off('keypress')
        .on('keypress', function (e) {

            if (e.which === 13 || e.which === 9) {

                const inputPage = parseInt(
                    $(this).val(),
                    10
                );

                if (
                    !isNaN(inputPage) &&
                    inputPage > 0 &&
                    inputPage <= totalPages
                ) {

                    table
                        .page(inputPage - 1)
                        .draw('page');

                } else {

                    alert(
                        `Please enter a valid page number (1 - ${totalPages})`
                    );
                }
            }
        });
}

/*
 * Get saved page when DataTable is initialized
 */
  const isPageReloaded = performance.getEntriesByType("navigation")[0]?.type === "reload";
function getDisplayStart(tableId, pageLength = 10) {

    if (isPageReloaded) {

        localStorage.removeItem(
            `${tableId}_currentPage`
        );

        return 0;
    }

    const savedPage = localStorage.getItem(
        `${tableId}_currentPage`
    );

    if (
        savedPage !== null &&
        !isNaN(parseInt(savedPage, 10))
    ) {

        return parseInt(savedPage, 10) * pageLength;
    }

    return 0;
}

//////////////////////////////////// Pagination  End ////////////////////////////////////


function getStateSaveConfig(tableId) {

    return {

        // Keep DataTables state save
        stateSave: true,

        // Save only column visibility in our custom localStorage
        stateSaveParams: function (settings, data) {

            const visibility = settings.aoColumns.map(
                col => col.bVisible
            );

            localStorage.setItem(
                tableId + "_colVis",
                JSON.stringify(visibility)
            );
        },

        // Restore column visibility
        stateLoadParams: function (settings, data) {

            const saved = localStorage.getItem(
                tableId + "_colVis"
            );

            if (!saved) {
                return;
            }

            const visibility = JSON.parse(saved);

            visibility.forEach((isVisible, index) => {

                if (settings.aoColumns[index]) {
                    settings.aoColumns[index].bVisible =
                        isVisible;
                }
            });
        }
    };
}

function initColVisFeatures(table, tableId) {

	const STORAGE_KEY = tableId + "_colVis";
	const COLLECTION_SELECTOR = '.dt-button-collection .buttons-columnVisibility';

	// 1. Sync ColVis button active state with column
	function syncButtonActiveState() {
		table.buttons('.buttons-columnVisibility').each(function (idx) {
			const btn = table.button(idx);
			const colIdx = btn.conf?._fnInit?.columns;
			if (colIdx === undefined) return;
			btn.active(table.column(colIdx).visible());
		});
	}

	// 2. Apply green/red color classes
	function updateColVisColors() {
		$(COLLECTION_SELECTOR).each(function () {
			const isActive = $(this).hasClass('active');
			$(this)
				.toggleClass('active-column', isActive)
				.toggleClass('inactive-column', !isActive);
		});
	}

	// 3. One master fix (state + color)
	function fixColVisUI() {
		syncButtonActiveState();
		updateColVisColors();
	}

	// 4. Restore column visibility from localStorage
	function applySavedVisibility() {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (!saved) return;

		JSON.parse(saved).forEach((isVisible, i) => {
			table.column(i).visible(isVisible, false);
		});

		table.columns.adjust();
	}

	// 5. Event bindings
	function bindColVisEvents() {
		table.on('buttons-collection.dt column-visibility.dt', fixColVisUI);

		$(document)
			.off('click.colvisFix_' + tableId)
			.on('click.colvisFix_' + tableId, '.buttons-collection', fixColVisUI);
	}

	// 6. Execution order (DO NOT CHANGE)
	applySavedVisibility(); // restore actual column state
	bindColVisEvents(); // attach listeners
	fixColVisUI(); // initial correction
}