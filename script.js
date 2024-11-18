$("a#add_personnel").on("click", function(){
    openAddPersonnelModal();
});

function openAddPersonnelModal() {
    $.ajax({
        url: "form.php",
        dataType: "html",
        success: function (returnedData) {
            Swal.fire({
                title: "PERSONNEL DETAILS",
                html: returnedData,
                didOpen: function () {
                    employee_select();
                    listener();
                    listener1();
                    setupFormSwitching();
                    addSO();
                },
                showConfirmButton: false,
                allowOutsideClick: false,     
            });
        },
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
                            openAddPersonnelModal();
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

function listener1() {
    $("#save1").on("click", function() {
        let detail = {
            save1: true,
            name1: $("#name1").val(),
            mname1: $("#mname1").val(),
            lname1: $("#lname1").val(),
            position1: $("#position1").val(),
            school1: $("#school1").val(),
            purpose1: $("#purpose1").val(),
            status1: $("#status1").val(),
            effectivity1: $("#effectivity1").val(),
            so_number1: $("#so_number1").val(),
            control1: $("#control1").val(),
            date1: $("#date1").val(),
        };
        let validation = true;
        for (let key in detail) {
            if (detail[key] === "") {
                validation = false;
                toastr.error("Please fill in all required fields.");
                break;
            }
        }

        if (validation) {
            $.ajax({
                url: "save_function.php",
                type: "POST",
                data: detail,
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
                            openAddPersonnelModal();
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

function setupFormSwitching() {
    $("#switchForm").on("click", function() {
        $("#saveform").toggle();
        $("#saveform1").toggle();
    });
};

function addSO() {
    $("#switchForm1").on("click", function() {
        $("#saveform2").toggle();
        $("#saveform").toggle();
    });
};

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



$('#toggleInput').change(function() {
    if ($(this).is(':checked')) {
        $('#selectPersonnelDiv').hide();
        $('#manualInputDiv').show();
    } else {
        $('#selectPersonnelDiv').show();
        $('#manualInputDiv').hide();
    }
});



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

$(document).ready(function() {
    // Initialize the first table
    var table1 = $('#retirement_table').DataTable({
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
                    $(win.document.body).find('th:nth-last-child(-n+2), td:nth-last-child(-n+2)').css('display', 'none');
                    $(win.document.body).prepend('<h3 style="text-align:center;"><b>RETIRED PERSONNEL</b></h3>');
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
        lengthMenu: [
            [10, 25, 50, 100, 100000000000000],
            [10, 25, 50, 100, "All"]
        ],
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
            },
            {
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
    });


    
    var table2 = $('#retirement_table1').DataTable({
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
                    $(win.document.body).find('th:nth-last-child(-n+2), td:nth-last-child(-n+2)').css('display', 'none');
                    $(win.document.body).prepend('<h3 style="text-align:center;"><b>RETIRED PERSONNEL</b></h3>');
                },
                orientation: 'landscape'
            }
        ],
        ajax: {
            url: "fetch_function.php",
            type: "POST",
            data: { retirement_table1: true },
            error: function(thrown) {
                console.log("Ajax request failed: " + thrown);
            }
        },
        lengthMenu: [
            [10, 25, 50, 100, 100000000000],
            [10, 25, 50, 100, "All"]
        ],
        columns: [
            { "data": "fname" },
            { "data": "middle_name" },
            { "data": "lastname" },
            { "data": "position" },
            { "data": "school" },
            { "data": "purpose" },
            { "data": "status" },
            { "data": "effectivity" },
            { "data": "SO_number" },
            { "data": "control_number" },
            { "data": "date" },
            {
                "data": null,
                render: function(data, type, row) {
                    return "<button class='btn btn-primary edit' data-personnel='" + row.id + "'>EDIT</button>";
                }
            },
            {
                "data": null,
                render: function(data, type, row) {
                    return "<button class='btn btn-danger delete' data-delete='" + row.id + "'>Delete</button>";
                }
            }
        ],
        drawCallback: function() {
            edit1();
            deleteID();
        }
    });


    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $.fn.dataTable.tables({visible: true, api: true}).columns.adjust();
    });

   
    function edit() {
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
                            html: '<label>Purpose:</label>' +
                                  '<input id="swal-input1" class="form-control mb-2" value="' + data[0].purpose + '">' +
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
                                            $('#retirement_table, #retirement_table1').DataTable().ajax.reload(null, false);
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

   
    function edit1() {
        $('#retirement_table1').on('click', 'button.edit', function() {
            let id = $(this).data('personnel');
            $.ajax({
                url: 'fetch_function.php',
                type: 'POST',
                data: {
                    getdata1: true,
                    id: id
                },
                success: function(response) {
                    if (response.trim() !== "") {
                        var data = JSON.parse(response);
                        var id = data[0].id;
                        var name = data[0].firstname;
                        Swal.fire({
                            title: 'Personal Data of ' + name,
                            html: '<label>Purpose:</label>' +
                                  '<input id="swal-input1" class="form-control mb-2" value="' + data[0].purpose + '">' +
                                  '<label>Status:</label>' +
                                  '<input id="swal-input2" class="form-control mb-2" value="' + data[0].status + '">' +
                                  '<label>Effectivity:</label>' +
                                  '<input id="swal-input3" class="form-control mb-2" value="' + data[0].effectivity + '">' +
                                  '<label>SO Number:</label>' +
                                  '<input id="swal-input4" class="form-control mb-2" value="' + data[0].SO_number + '">' +
                                  '<label>Control Number:</label>' +
                                  '<input id="swal-input5" class="form-control mb-2" value="' + data[0].control_number + '">',
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
                                            $('#retirement_table, #retirement_table1').DataTable().ajax.reload(null, false);
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




    function deleteID() {
        $('#retirement_table, #retirement_table2').on('click', '.delete', function() {
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
                                $('#retirement_table, #retirement_table1').DataTable().ajax.reload(null, false);
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


function deleteID() {
    $('#retirement_table1').on('click', '.delete', function() {
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
                        delete1: true,
                        id: id
                    },
                    success: function(response) {
                        if (response.trim() === "Your data has been deleted.") {
                            Swal.fire(
                                'Deleted!',
                                'File has been deleted successfully.',
                                'success'
                            );
                            $('#retirement_table, #retirement_table1').DataTable().ajax.reload(null, false);
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

    


document.addEventListener("DOMContentLoaded", function() {
    setInterval(function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var element = document.getElementById("totalRetiredCount");
                if (element) { 
                    element.innerHTML = this.responseText;
                }
            }
        };
        xhttp.open("GET", "update_class.php", true);
        xhttp.send();
    }, 5000);
});

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




$("form.intent").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);

    Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we process your request.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    $.ajax({
        url: "save_function.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(returnedData) {
            Swal.close();
            if (returnedData == 1) {
                Swal.fire({
                    icon: "success",
                    title: "Submitted Successfully",
                    allowOutsideClick: false,
                    showConfirmButton: true,
                    showCloseButton: false
                }).then(() => {
                    $('#successModal').modal('show');
                });
            } else if (returnedData == 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Upload Failed! Check your Network",
                    allowOutsideClick: false,
                    showConfirmButton: true,
                    showCloseButton: false
                });
            } 
        },
    });
});




$(document).ready(function() {
    var table =  $('#intent').DataTable({
        serverSide: true,
        responsive: true,
        lengthChange: true,
        autoWidth: false,
        ajax: {
            url: "fetch_function.php",
            type: "POST",
            data: { fetchintent: true },
            error: function(thrown) {
                console.log("Ajax request failed: " + thrown);
            }
        },
        columns: [
            {
            "data": "filename"
            },
            { 
                "data": "intent_letter",
                "render": function(data) {
                    return data;
                }
            },
            
            { "data": "date" },
            {"data": "remarks"
              
            },
            { 
                "data": "checklist", 
                "render": function(data, type, row) {
                  return `
                    <a type="button" class="btn btn-info btn-sm" style="align-items:center" onclick="openChecklistModalview(${row.id})">
                      <span><i class="fa fa-eye">View Requirements</i></span>
                    </a>`;
                }
              }
              
        ]
    });
    setInterval(function() {
        table.ajax.reload(null, false); 
    }, 2000); 
    });


    $(document).on('change', '.custom-file-input', function(event) {
        var inputFile = event.currentTarget;
        $(inputFile).parent().find('.custom-file-label').html(inputFile.files[0].name);
    });


    function openChecklistModalview(intentId) {
        $.ajax({
          url: 'fetch_function.php',
          type: 'POST',
          data: { view_checklist: true, intent_id: intentId },
          success: function(response) {
            let data = JSON.parse(response);
      
        
            $('#viewChecklistId').text(intentId);
      
  
            let checklistHtml = '';
            data.checklist.forEach(item => {
              checklistHtml += `
                <tr>
                  <td>${item.requirement}</td>
                  <td>${item.status == 1 ? 'Completed' : 'Not yet'}</td>
                </tr>
              `;
            });
      
   
            $('#viewChecklistBody').html(checklistHtml);
      

            $('#viewChecklistModal').modal('show');
          },
          error: function() {
            toastr.error('Failed to fetch checklist data.');
          }
        });
      }
      

    $(document).ready(function() {
        $('#admin_intent').DataTable({
          serverSide: true,
          responsive: true,
          lengthChange: true,
          autoWidth: false,
          ajax: {
            url: "fetch_function.php",
            type: "POST",
            data: { fetchadminintent: true },
            error: function(thrown) {
              console.log("Ajax request failed: " + thrown);
            }
          },
          columns: [
            { "data": "filename" },
            { "data": "intent_letter" },
            { "data": "date" },
            { 
                "data": "remarks",
                "render": function(data, type, row) {
                    return data + ' <button class="btn btn-sm btn-warning" onclick="editRemarks(' + row.id + ', \'' + data + '\')">Add Remarks</button>';
                }
            },
            { "data": "checklist", "render": function(data, type, row) {
                return '<a type="button" class="btn btn-info" onclick="openChecklistModal(' + row.id + ')"><span><i class="fa fa-pen"></i></span></a>';
              }
            },
          ]
        });
      });
      

      function editRemarks(id, currentRemarks) {

        $('#edit_id').val(id);
        $('#edit_remarks').val(currentRemarks);
    

        $('#editRemarksModal').modal('show');
    }
    
    $('#saveRemarksBtn').click(function() {
        var id = $('#edit_id').val();
        var remarks = $('#edit_remarks').val();
    
 
        $.ajax({
            url: 'save_function.php',
            type: 'POST',
            data: { id: id, remarks: remarks },
            success: function(response) {
                if (response === 'success') {
          
                    $('#editRemarksModal').modal('hide');
                    
                    $('#admin_intent').DataTable().ajax.reload();
    
                    toastr.success("Remarks updated successfully!");
                } else {
                    toastr.success('Failed to update remarks');
                }
            },
            error: function() {
                alert('An error occurred while updating remarks');
            }
        });
    });
    

    function openChecklistModal(retired_intent_id) {
        $.ajax({
          url: 'fetch_function.php',
          type: 'POST',
          data: { retired_intent_id: retired_intent_id },
          success: function(response) {
            let data = JSON.parse(response);
      

    
            let checklistHtml = '';
            data.checklist.forEach(item => {
              checklistHtml += `
                <tr>
                  <td>${item.requirement}</td>
                  <td>
                    <input type="checkbox" class="checklist-item" data-id="${item.id}" ${item.status == 1 ? 'checked' : ''} />
                  </td>
                </tr>
              `;
            });
      
   
            $('#checklistBody').html(checklistHtml);
      
            $('#checklistModal').modal('show');
          },
          error: function() {
            toastr.error('Failed to fetch checklist data.');
          }
        });
      }
      
      $('#saveChecklistBtn').click(function() {
        let updatedChecklist = [];
      
  
        $('.checklist-item').each(function() {
          let itemId = $(this).data('id');
          let status = $(this).prop('checked') ? 1 : 0;
          updatedChecklist.push({ id: itemId, status: status });
        });
      

        $.ajax({
          url: 'save_checklist.php',
          type: 'POST',
          data: { checklist: JSON.stringify(updatedChecklist) },
          success: function(response) {
            if (response == '1') {
              toastr.success('Checklist updated successfully!');
              $('#checklistModal').modal('hide');
            } else {
              toastr.error('Failed to save checklist.');
            }
          },
          error: function() {
            toastr.error('An error occurred while saving the checklist.');
          }
        });
      });
      