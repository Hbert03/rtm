$("a#add_personnel").on("click", function(){
    $.ajax({
        url: "form.php",
        dataType: "html",
        success: function (returnedData) {
            swal.fire({
                title: "PERSONNEL DETAILS",
                html: returnedData,
                didOpen: function () {
                    employee_select();
                    listener();
                },
        showConfirmButton: false,
        allowOutsideClick: false,     
    });
    },
})
});
function employee_select() {
    $('select.personnel').select2({
        theme: "bootstrap4",
        placeholder: 'Select an employee', 
        containerCssClass: "select-employee",
        ajax: {
            url: 'fetch_function.php',
            type: 'post',
            dataType: "json",
            delay: 250,
            data: function (params) {
                return {
                    employee_select: true,
                    term: params.term
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data.results, function (employee) {
                        return {
                            id: employee.hris_code,
                            text: employee.fullname
                        };
                    })
                };
            },
            cache: true
        },
        minimumInputLength: 0,
        allowClear: true
    }).on('select2:select', function (e) {
        var hris_code = e.params.data.id;
        fetchPosition(hris_code); 
    });
}

function fetchPosition(hris_code) {
    $.ajax({
        url: 'fetch_details.php', 
        type: 'POST',
        dataType: 'json',
        data: { hris_code: hris_code },
        success: function(response) {
            if (response.success) {
                $('input#position').val(response.position); 
                $('input#school').val(response.school); 
            } else {
                console.error('Failed to fetch position.');
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX error:', status, error);
        }
    });
}
function listener() {
    $("#save").on("click", function() {
        let details = {
            save: true,
            personnel: $("#personnel").val(),
            position: $("#position").val(),
            school: $("#school").val(),
            purpose: $("#purpose").val(),
            status: $("#status").val(),
            effectivity: $("#effectivity").val(),
            so_number: $("#so_number").val(), 
            control: $("#control").val(),
            date: $("#date").val(),
        };
        let validation = true;
        for (let key in details) {
            if (details[key] === "") {
                validation = false;
                toastr.error("Please fill in all required fields.");
                break;
            }
        }

        if (validation) {
            $.ajax({
                url: "save_function.php",
                type: "POST",
                data: details,
                success: function(returnedData) {
                    if (returnedData == 1) {
                        Swal.fire({
                            icon: "success",
                            title: "Personnel Saved",
                            allowOutsideClick: false,
                            showConfirmButton: true,
                            showCloseButton: false
                        }).then(() => {
                            $("input[type=text], textarea").val("");
                        });
                    } else if (returnedData == -1) {
                        Swal.fire({
                            icon: "warning",
                            title: "Personnel Already in Retired List",
                            allowOutsideClick: false,
                            showConfirmButton: true,
                            showCloseButton: false
                        });
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "ERROR",
                            allowOutsideClick: false,
                            showConfirmButton: true,
                            showCloseButton: false
                        });
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error:", error);
                }
            });
        }
    });
}
$(document).ready(function() {
    $('#retirement_table').DataTable({
        serverSide: true,
        responsive: true,
        lengthChange: true,
        autoWidth: false,
        dom: 'lBfrtip',
        buttons: [
            "copy", 
            "csv", 
            "excel", 
            {
                extend: 'print',
                customize: function(win) {
                    $(win.document.body).css('font-size', '10pt');
                    $(win.document.body).find('title').remove(); 
                    $(win.document.body).find('table tr th:last-child, table tr td:last-child').css('display', 'none');
                    $(win.document.body).prepend('<h1 style="text-align:center;">REPORT RETIRED PERSONNEL</h1>');
                },
                orientation: 'landscape'
            }
        ],
        ajax: {
            url: "fetch_function.php",
            type: "POST",
            data: { retirement_table: true },
            error: function(thrown) {
                console.log("Ajax request failed: " + thrown);
            }
        },
        columns: [
            { "data": "firstname" },
            { "data": "lastname" },
            { "data": "position" },
            { "data": "school" },
            { "data": "purpose" },
            { "data": "status" },
            { "data": "effectivity" },
            { "data": "SO_numbers" },
            { "data": "control_no" },
            { "data": "date" },
            {
                "data": null,
                render: function(data, type, row) {
                    return "<button class='btn btn-primary edit' data-personnel='" + row.hris_code + "'>EDIT</button>";
                }
            },   {
                "data": null,
                render: function(data, type, row) {
                    return "<button class='btn btn-danger delete' data-delete='" + row.id + "'>Delete</button>";
                }
            }
        ],
        drawCallback: function() {
            edit();
            deleteID();
        }
    });

function  deleteID(){
    $('#retirement_table').on('click', '.delete', function() {
        var id = $(this).data('delete');
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete it?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'fetch_function.php',
                    type: 'POST',
                    data: {
                        delete: true,
                        id: id
                    },
                    success: function(response) {
                        if (response.trim() === "Your data has been deleted.") {
                            Swal.fire(
                                'Deleted!',
                                'File has been deleted successfully.',
                                'success'
                            );
                            $('#retirement_table').DataTable().ajax.reload(null, false);
                        } else {
                            Swal.fire(
                                'Failed!',
                                'Failed to delete file.',
                                'error'
                            );
                        }
                    },
                });
            }
        });
    });
}
});

function edit(){
    $('#retirement_table').on('click', 'button.edit', function() {
        let hris_code = $(this).data('personnel');
        $.ajax({
            url: 'fetch_function.php',
            type: 'POST',
            data: {
                getdata: true,
                hris_code: hris_code
            },
            success: function(response) {
                if (response.trim() !== "") {
                    var data = JSON.parse(response);
                    var id = data[0].id;
                    var name = data[0].firstname;
                    Swal.fire({
                        title: 'Personal Data of ' + name,
                        html:    '<label>Purpose:</label>' +
                                '<input id="swal-input1" class="form-control mb-2"  value="' + data[0].purpose + '">' +
                                '<label>Status:</label>' +
                                '<input id="swal-input2" class="form-control mb-2" value="' + data[0].status + '">' +
                                '<label>Effectivity:</label>' +
                                '<input id="swal-input3" class="form-control mb-2" value="' + data[0].effectivity + '">' +
                                '<label>SO Number:</label>' +
                                '<input id="swal-input4" class="form-control mb-2" value="' + data[0].SO_numbers + '">' +
                                '<label>Control Number:</label>' +
                                '<input id="swal-input5" class="form-control mb-2" value="' + data[0].control_no + '">',
                        focusConfirm: false,
                        confirmButtonText: 'Update',
                        preConfirm: () => {
                            const value1 = document.getElementById('swal-input1').value;
                            const value2 = document.getElementById('swal-input2').value; 
                            const value3 = document.getElementById('swal-input3').value;
                            const value4 = document.getElementById('swal-input4').value;
                            const value5 = document.getElementById('swal-input5').value;
                            return [value1, value2, value3, value4, value5];
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const [value1, value2, value3, value4, value5] = result.value;
                            $.ajax({
                                url: 'fetch_function.php',
                                type: 'POST',
                                data: {
                                    update: true,
                                    id: id,
                                    purpose: value1,
                                    status: value2,
                                    effectivity: value3,
                                    SO_numbers: value4,
                                    control_no: value5, 
                                },
                                success: function(response) {
                                    if (response.trim() === "Updated Successfully") {
                                        Swal.fire(
                                            'Updated!',
                                            'File has been updated successfully.',
                                            'success'
                                        );
                                        $('#retirement_table').DataTable().ajax.reload(null, false);
                                    } else {
                                        Swal.fire(
                                            'Failed!',
                                            'Failed to update file.',
                                            'error'
                                        );
                                    }
                                },
                               
                            });
                        }
                    });
                } 
            },
        });
    });
}

setInterval(function() {
   
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         
            document.getElementById("totalRetiredCount").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "update_class.php", true);
    xhttp.send();
}, 2000); 

function confirmLogout() {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("logoutForm").submit();
        }
    });
}


