<?php
include('class.php');

$retired = new Retired();
$totalRetired = $retired->getValue("totalRetired");

echo $totalRetired;
?>
