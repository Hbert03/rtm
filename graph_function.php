<?php

function fetchData() {
    global $conn; 
    include('database.php'); 
    $data = array('labels' => array(), 'values' => array());

    $currentMonthLabel = date('F Y'); 
    
    $sql = "SELECT COUNT(*) as total 
    FROM retired_personnel 
    WHERE MONTH(date) = MONTH(CURDATE()) 
    AND YEAR(date) = YEAR(CURDATE()) AND purpose = 'Retirement'";

    $result1 = $conn->query($sql);
    while ($row = $result1->fetch_assoc()) {
        $data['labels'][] = 'Retired Personnel in ' . $currentMonthLabel; 
        $data['values'][] = $row['total'];
    }

    $sql = "SELECT COUNT(*) as total 
    FROM retired_personnel 
    WHERE MONTH(date) = MONTH(CURDATE()) 
    AND YEAR(date) = YEAR(CURDATE()) AND purpose = 'Deceased'";

    $result2 = $conn->query($sql);
    while ($row = $result2->fetch_assoc()) {
        $data['labels'][] = 'Deceased Personnel in ' . $currentMonthLabel; 
        $data['values'][] = $row['total'];
    }

    
    $sql = "SELECT COUNT(*) as total 
    FROM retired_personnel 
    WHERE MONTH(date) = MONTH(CURDATE()) 
    AND YEAR(date) = YEAR(CURDATE()) AND purpose = 'Transfer'";

    $result2 = $conn->query($sql);
    while ($row = $result2->fetch_assoc()) {
        $data['labels'][] = 'Transfer Personnel in ' . $currentMonthLabel; 
        $data['values'][] = $row['total'];
    }

       
    $sql = "SELECT COUNT(*) as total 
    FROM retired_personnel 
    WHERE MONTH(date) = MONTH(CURDATE()) 
    AND YEAR(date) = YEAR(CURDATE()) AND purpose = 'Resign'";

    $result2 = $conn->query($sql);
    while ($row = $result2->fetch_assoc()) {
        $data['labels'][] = 'Resign Personnel in ' . $currentMonthLabel; 
        $data['values'][] = $row['total'];
    }


    return $data;   
}


$data = fetchData();


header('Content-Type: application/json');
echo json_encode($data);





?>
