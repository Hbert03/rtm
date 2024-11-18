<?php
include('session.php');
if (isset($_POST['user']) && isset($_POST['password'])) {

    function validate($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $user = validate($_POST['user']);
    $pass = validate($_POST['password']);
    $pass = md5($pass);

  
    $sql_user = "SELECT * FROM tbl_user WHERE useraccount='$user' AND password='$pass'";
    $result_user = mysqli_query($conn, $sql_user);

    if (mysqli_num_rows($result_user) === 1) {
        $row_user = mysqli_fetch_assoc($result_user);
        $_SESSION['user_id'] = $row_user['user_id'];
        $user_id = $_SESSION['user_id'];
        
        $allowed_user_ids = [340, 487, 351, 522]; 
    
        if (in_array($user_id, $allowed_user_ids)) {
          
            $user_sql = "SELECT u.*, o.office_name FROM tbl_user u 
                         INNER JOIN tbl_office o ON u.user_id = o.id 
                         WHERE u.user_id='$user_id'";
            $user_result = mysqli_query($conn, $user_sql);
    
            if ($user_result && mysqli_num_rows($user_result) === 1) {
                $user_data = mysqli_fetch_assoc($user_result);
                $_SESSION['office_name'] = $user_data['office_name'];
            }
    
            if (in_array($user_id, [487, 351, 340])) {
                header("Location: index.php");
            } else if ($user_id == 522) {
                header("Location: admin.php");
            }
            exit();
        }

    } else {
        $sql_employee = "SELECT * FROM tbl_employee WHERE username='$user' AND password='$pass'";
        $result_employee = mysqli_query($conn, $sql_employee);

        if (mysqli_num_rows($result_employee) === 1) {
            $row_employee = mysqli_fetch_assoc($result_employee);
            $_SESSION['firstname'] = $row_employee['firstname'];
            $_SESSION['hris_code'] = $row_employee['hris_code'];

            header("Location: request_index.php");
            exit();
        } else {
            $_SESSION['login'] = "Wrong password!";
            $_SESSION['login_code'] = "error";
            header("Location: login.php");
            exit();
        }
    }
} else {
    $_SESSION['login'] = "Try Again";
    $_SESSION['login_code'] = "error";
    header("Location: login.php");
    exit();
}
?>
