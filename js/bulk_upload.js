$(document).ready(function () {
    $('#bk_submit').click(function (event) {
        event.preventDefault(); // Prevent the default form submission
        let fileValidation = $('#upload_btn').val();
        let isValid = true;
        // Validate the upload_btn field
        if (!validateField(fileValidation, 'upload_btn')) {
            isValid = false;
        }
        // If the validation passes, proceed with uploading the Excel file to the database
        if (isValid) {
            uploadExcelToDB();
        }
    });
});
function uploadExcelToDB() {
    let excelFile = $('#upload_btn')[0].files[0];
    let formData = new FormData();
    formData.append('excelFile', excelFile);

    $.ajax({
        url: 'api/bulk_upload_files/customerBulkUpload.php',
        data: formData,
        type: 'POST',
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.includes('Bulk Upload Completed')) {
                swalSuccess('Success', 'Uploaded Successfully');
            } else if (response.includes('Insertion completed till Serial No')) {
                Swal.fire({
                    html: response,
                    icon: 'error',
                    showConfirmButton: true,
                    confirmButtonColor: 'var(--primary-color)',
                });
            } else if (response.includes('File is not in Excel Format')) {
                swalError('Alert', 'The uploaded file is not in the correct format.');
            }
        },
        complete: function () {
            $('#bk_submit').removeAttr('disabled');
        }
    });
}
