<?php
include('database.php');

if (isset($_POST['hris_code'])) {
    $hris_code = $_POST['hris_code'];

    $sql = "SELECT e.*, o.office_name FROM tbl_employee e LEFT JOIN tbl_office o ON e.department_id = o.id WHERE hris_code = '$hris_code'";
    $query = $conn->query($sql);

    if ($query) {
        $result = $query->fetch_assoc();
        $position = $result['position'];
        $school = $result['office_name']; 
    
        if ($position !== null && $school !== null) {
            echo json_encode(array('success' => true, 'position' => $position, 'school' => $school)); 
        } else {
            echo json_encode(array('success' => false, 'message' => 'Position or school not found')); 
        }
    } else {
        echo json_encode(array('success' => false, 'message' => 'Query failed')); 
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'Invalid request')); 
}
?>
