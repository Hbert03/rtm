<?php
include('database.php');
if (isset($_POST['checklist'])) {
    date_default_timezone_set('Asia/Manila');
    $checklist = $_POST['checklist'];
    $now = date('Y-m-d H:i:s');

    foreach ($checklist as $item) {
        $id = $item['id'];
        $status = $item['status'];
        $remarks = $conn->real_escape_string($item['remarks']);

        $query = "UPDATE retired_intent_requirements 
                  SET status = $status, remarks = '$remarks', remarks_date = '$now' 
                  WHERE id = $id";
        $conn->query($query);
    }

    echo json_encode(['success' => true]);
}


?>
