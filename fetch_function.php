<?php
include('database.php');


if(isset($_POST['personnel'])){
    function getDataTable1($draw, $start, $length, $search) {
        global $conn;

        $sortableColumns = array('hris_code', 'firstname', 'lastname', 'classification');

        $orderBy = 'hris_code';
        $orderDir = 'ASC';

        if (isset($_POST['order'][0]['column']) && isset($_POST['order'][0]['dir'])) {
            $columnIdx = intval($_POST['order'][0]['column']);
            $orderDir = $_POST['order'][0]['dir'];

            if (isset($sortableColumns[$columnIdx])) {
                $orderBy = $sortableColumns[$columnIdx];
            }
        }

        $query = "SELECT e.*, c.classification
        FROM tbl_employee e
        JOIN tbl_emp_classification c ON e.employee_classification = c.id
        WHERE e.active = '1'";

        if (!empty($search)) {
            $query .= " AND (hris_code LIKE '%".$search."%' OR firstname LIKE '%".$search."%' OR lastname LIKE '%".$search."%' OR middlename LIKE '%".$search."%')";
        }
       
        $query .= " ORDER BY $orderBy $orderDir  LIMIT $start, $length";
     

        $result = $conn->query($query);

        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        $totalQuery = "SELECT COUNT(*) as total FROM tbl_employee WHERE active='1'";
        if (!empty($search)) {
            $totalQuery .= " AND (hris_code LIKE '%".$search."%' OR firstname LIKE '%".$search."%' OR lastname LIKE '%".$search."%' OR middlename LIKE '%".$search."%')";
        }
        $totalResult = $conn->query($totalQuery);
        $totalRow = $totalResult->fetch_assoc();
        $totalRecords = $totalRow['total'];

        $output = array(
            "draw"            => intval($draw),
            "recordsTotal"    => intval($totalRecords),
            "recordsFiltered" => intval($totalRecords),
            "data"            => $data
        );

        return json_encode($output);
    }

    // Usage example
    $draw = $_POST["draw"];
    $start = $_POST["start"];
    $length = $_POST["length"];
    $search = $_POST["search"]["value"];

    echo getDataTable1($draw, $start, $length, $search);    
    exit();
}

if(isset($_POST['employee_select'])){
    $empquery = "SELECT *, CONCAT(firstname, ' ', COALESCE(SUBSTRING(middlename, 1, 1), ''), '. ', lastname, ' ', ext_name) AS fullname FROM tbl_employee WHERE 1=1";

    $terms = (isset($_POST['term']) && !empty($_POST['term'])) ? $_POST['term'] : null;

    if($terms){
        $empquery .= " AND (firstname LIKE '%" . $terms . "%'";
        $empquery .= " OR middlename LIKE '%" . $terms . "%'";
        $empquery .= " OR lastname LIKE '%" . $terms . "%')";
    } else {
        $empquery .= " LIMIT 10";
    }

    $queryIns = $conn->query($empquery);
    $employees = array();

    while ($row = $queryIns->fetch_assoc()) {
        $employees[] = $row;
    }

    $conn->close();

    echo json_encode(['results' => $employees]);
};



if (isset($_POST['retirement_table'])) {
    function getDataTable($draw, $start, $length, $search)
    {
        global $conn;

        $sortableColumns = array('hris_code', 'firstname', 'lastname', 'classification');

        $orderBy = 'hris_code';
        $orderDir = 'ASC';

        
        if (isset($_POST['order'][0]['column']) && isset($_POST['order'][0]['dir'])) {
            $columnIdx = intval($_POST['order'][0]['column']);
            $orderDir = $_POST['order'][0]['dir'];

            if (isset($sortableColumns[$columnIdx])) {
                $orderBy = $sortableColumns[$columnIdx];
            }
        }
       
        $query = "SELECT e.firstname, e.lastname, r.* FROM tbl_employee e INNER JOIN retired_personnel r ON e.hris_code = r.hris_code";

        if (!empty($search)) {
            $query .= " AND (e.hris_code LIKE '%" . $search . "%' OR e.firstname LIKE '%" . $search . "%' OR e.lastname LIKE '%" . $search . "%')";
        }

        $query .= " ORDER BY $orderBy $orderDir";

        $query .= " LIMIT $start, $length";

        $result = $conn->query($query);


        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        $totalQuery = "SELECT COUNT(*) AS total 
        FROM tbl_employee e INNER JOIN retired_personnel r ON e.hris_code = r.hris_code";
        if (!empty($search)) {
         $totalQuery .= " AND (e.hris_code LIKE '%".$search."%' OR e.firstname LIKE '%".$search."%' OR e.lastname LIKE '%" . $search."%')";
         }
        $totalResult = $conn->query($totalQuery);
        $totalRow = $totalResult->fetch_assoc();
        $totalRecords = $totalRow['total'];

        $output = array(
            "draw" => intval($draw),
            "recordsTotal" => intval($totalRecords),
            "recordsFiltered" => intval($totalRecords),
            "data" => $data
        );

        return json_encode($output);
    }

    $draw = $_POST["draw"];
    $start = $_POST["start"];
    $length = $_POST["length"];
    $search = $_POST["search"]["value"];

    echo getDataTable($draw, $start, $length, $search);
    exit();
}



if (isset($_POST['getdata'])) {
    $hris_code = $_POST['hris_code'];
    $query = "SELECT e.firstname, e.lastname, r.* FROM tbl_employee e INNER JOIN retired_personnel r ON e.hris_code = r.hris_code WHERE e.hris_code=?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $hris_code); 
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo "Error executing query: " . $conn->error;
    }
    exit();
}


if (isset($_POST['update'])) {
    $id = $_POST['id'];
    $value1 = $_POST['purpose'];
    $value2 = $_POST['status'];
    $value3 = $_POST['effectivity'];
    $value4 = $_POST['SO_numbers'];
    $value5 = $_POST['control_no'];
   

    $query = "UPDATE retired_personnel
              SET purpose = '$value1', status = '$value2', effectivity = '$value3', SO_numbers = '$value4', control_no = '$value5'
              WHERE id = '$id'";
    if (mysqli_query($conn, $query)) {
        echo "Updated Successfully";
    } else {
        echo "Failed to update file in the database.";
    }
}


if (isset($_POST['delete'])) { 
    $fileId = $_POST['id'];
    $query = "DELETE FROM retired_personnel WHERE id = '$fileId'";
    if (mysqli_query($conn, $query)) {
        echo "Your data has been deleted."; 
    } else {
        echo "Failed to delete data."; 
    }
    exit();
}

?>