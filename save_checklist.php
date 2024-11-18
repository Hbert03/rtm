<?php
include('database.php');

if (isset($_POST['checklist'])) {
  $checklist = json_decode($_POST['checklist'], true);
  $success = true;

  foreach ($checklist as $item) {
      $id = $item['id'];
      $status = $item['status'];

      $query = "UPDATE retired_intent_requirements SET status = '$status' WHERE id = '$id'";
      if (!$conn->query($query)) {
          $success = false;
          break;
      }
  }

  echo $success ? '1' : '0';
}

?>
