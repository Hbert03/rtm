<?php
session_start();
include('database.php');

if(isset($_POST['save'])) {
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $hris_code = $_POST['personnel'];
    $position = $_POST['position'];
    $school = $_POST['school'];
    $purpose = $_POST['purpose'];
    $status = $_POST['status'];
    $effectivity = $_POST['effectivity'];
    $so_number = $_POST['so_number'];
    $control = $_POST['control'];
    $date = $_POST['date'];
   
    $check_query = "SELECT * FROM retired_personnel WHERE hris_code = '$hris_code'";
    $check_result = mysqli_query($conn, $check_query);

    if (mysqli_num_rows($check_result) > 0) {
    
        echo "-1";
    } else {
        $sql = "INSERT INTO retired_personnel (hris_code, position, school, purpose, status, effectivity, SO_numbers, control_no, date)
                VALUES ('$hris_code','$position', '$school', '$purpose', '$status', '$effectivity', '$so_number', '$control', '$date')";

        if (mysqli_query($conn, $sql)) {
            echo "1";
        } else {
          
            echo "0";
        }
    }

}


if(isset($_POST['save1'])) {
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $name1 = $_POST['name1'];
    $mname1 = $_POST['mname1'];
    $lname1 = $_POST['lname1'];
    $position1 = $_POST['position1'];
    $school1 = $_POST['school1'];
    $purpose1 = $_POST['purpose1'];
    $status1 = $_POST['status1'];
    $effectivity1 = $_POST['effectivity1'];
    $so_number1 = $_POST['so_number1'];
    $control1 = $_POST['control1'];
    $date1 = $_POST['date1'];
   
    
        $sql = "INSERT INTO retired_personnel1 (fname, middle_name, lastname, position, school, purpose, status, effectivity, SO_number, control_number, date)
                VALUES ('$name1', '$mname1', '$lname1', '$position1', '$school1', '$purpose1', '$status1', '$effectivity1', '$so_number1', '$control1', '$date1')";

        if (mysqli_query($conn, $sql)) {
            echo "1";
        } else {
          
            echo "0";
        }
    }

    function createDefaultChecklist($id, $hris_code) {
        global $conn;
        $checklistItems = [
            ["Indorsement from the School Head/Immediate Supervisor"],
            ["Duly filled out GSIS Application Form with passport size ID picture of the member and of the spouse, if married"],
            ["Duly signed Division and School Clearance"],
            ["Declaration of Non-Pendency Case"],
            ["Certificate of No Pending Administrative Case"],
            ["Service Record (Indicate leave of Absence)"],
            ["Certification of Leave Without Pay"],
            ["Photocopy of UMID, back-to-back"]
        ];
    
        foreach ($checklistItems as $item) {
            $query = "INSERT INTO retired_intent_requirements (retired_intent_id, hris, requirement, status) VALUES ('$id','$hris_code', '$item[0]', 0)";
            $conn->query($query);
        }
    }
    


    if (isset($_FILES['intent_letter'])) {
        $hris_code = $_SESSION['hris_code'];
        $intent_letter = $_FILES['intent_letter'];
        $upload_dir = "uploads/";
    
        $filename = basename($intent_letter['name']);
        $intent_letter_path = $upload_dir . $filename;
    
        if (move_uploaded_file($intent_letter['tmp_name'], $intent_letter_path)) {
            $sql = "INSERT INTO retired_intent (hris, filename, intent_letter) VALUES ('$hris_code', '$filename', '$intent_letter_path')";
            
            if (mysqli_query($conn, $sql)) {
         
                $id = mysqli_insert_id($conn);
                createDefaultChecklist($id, $hris_code);
                
                echo "1";
            } else {
                echo "0"; 
            }
        } else {
            echo "File upload failed.";
        }
    
        mysqli_close($conn);
    }
    



if (isset($_POST['id']) && isset($_POST['remarks'])) {
    $id = $_POST['id'];
    $remarks = $_POST['remarks'];


    $remarks = mysqli_real_escape_string($conn, $remarks);

    $query = "UPDATE retired_intent SET remarks = '$remarks' WHERE id = '$id'";

    if ($conn->query($query) === TRUE) {
        echo 'success';
    } else {
        echo 'error';
    }
}

    
    ?>

