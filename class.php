<?php
class Employee {
    private $totalEmployees;

    public function __construct() {
        include('database.php');

        $sql = "SELECT COUNT(*) as total  FROM tbl_employee WHERE active='1'";
        
        $queryIns = $conn->query($sql);
        $personnelData = $queryIns->fetch_assoc();

        if ($personnelData) {
            $this->totalEmployees = $personnelData['total'];
        }
    }

    public function getValue($part) {
        switch ($part) {
            case "totalEmployees":
                return $this->totalEmployees;
            default:
                return null; 
        }
    }
}

class Retired {
    private $totalRetired;

    public function __construct() {
        include('database.php');

        $sql = "SELECT COUNT(*) as total  FROM retired_personnel WHERE purpose ='Retirement'";
        
        $queryIns = $conn->query($sql);
        $retiredData = $queryIns->fetch_assoc();

        if ($retiredData) {
            $this->totalRetired = $retiredData['total'];
        }
    }

    public function getValue($part) {
        switch ($part) {
            case "totalRetired":
                return $this->totalRetired;
            default:
                return null; 
        }
    }
}
?>