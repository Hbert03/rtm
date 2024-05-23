<?php
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

    mysqli_close($conn);
}

?>
