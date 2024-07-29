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

    $sql = "SELECT * FROM tbl_user WHERE useraccount='$user' AND password ='$pass'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['user_id'] = $row['user_id'];

        $user_id = $_SESSION['user_id'];
        $allowed_user_id =  [340, 487, 351];
        if (in_array($user_id, $allowed_user_id)) {
            $user_sql = "SELECT u.*, o.office_name FROM tbl_user u INNER JOIN tbl_office o ON u.user_id = o.id WHERE u.user_id='$user_id'";
            $user_result = mysqli_query($conn, $user_sql);
        
            if ($user_result && mysqli_num_rows($user_result) === 1) {
                $user_data = mysqli_fetch_assoc($user_result);
        
                $_SESSION['office_name'] = $user_data['office_name'];
          
            }
			
        header("Location: index.php");
        exit();
    } else {
        $_SESSION['login'] = "INVALID!";
        $_SESSION['login_code'] = "error";
        header("Location: login.php");
        exit();
    }
} else {
    $_SESSION['login'] = "Try Again";
    $_SESSION['login_code'] = "error";
    header("Location: login.php");
    exit();
}
}


?>
