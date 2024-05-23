<?php
include('database.php');

if(isset($_POST['report'])){
    $term = $_POST['term'];
    $query = "SELECT * FROM tbl_office";
    if (!empty($term)) {
        $query .= " WHERE office_name LIKE '%$term%' OR office_id LIKE '%$term%'";
    }

    $result = $conn->query($query);
    $response = [];
    while ($row = $result->fetch_assoc()) {
        $response['data'][] = $row;
    }
    echo json_encode($response);
}
?>