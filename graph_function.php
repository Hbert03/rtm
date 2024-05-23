<?php

function fetchData() {
    global $conn; 
    include('database.php'); 
    $data = array('labels' => array(), 'values' => array());

    $currentMonthLabel = date('F Y'); 
    
    $sql = "SELECT COUNT(*) as total FROM retired_personnel WHERE MONTH(date) = MONTH(CURDATE())";
    $result1 = $conn->query($sql);
    while ($row = $result1->fetch_assoc()) {
        $data['labels'][] = 'Retired Personnel in ' . $currentMonthLabel; 
        $data['values'][] = $row['total'];
    }
    return $data;   
}


$data = fetchData();


header('Content-Type: application/json');
echo json_encode($data);





?>
