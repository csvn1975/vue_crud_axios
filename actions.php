<?php

    $dbConnect =  new mysqli('127.0.0.1:3307', 'root', 'root', 'shop');

    function loadUser($mysqli) {
        $users = [];
        $sql = "SELECT id, username, email, address FROM user";
        $result = $mysqli->query($sql);

        while ($row = $result -> fetch_assoc()) {
            array_push($users,  $row);
        }
        $output['users'] = $users;
        echo json_encode($output);
    };

    function getAction(){
        if ( $_SERVER['REQUEST_METHOD'] == "GET")
            return $_GET['action'] ?? '';
        else
            return $_POST['action'] ?? '';;
    }

    $action = getAction();


    switch ($action) {
        case 'load' :
            loadUser($dbConnect);
            break;

        case "insert":

            $username = htmlspecialchars($_POST['username'] ?? '');
            $email = htmlspecialchars($_POST['email'] ?? '');
            $password = password_hash(htmlspecialchars($_POST['password'] ?? ''), PASSWORD_DEFAULT ) ;
            $address = htmlspecialchars($_POST['address'] ?? '');

            if ($username && $email && $password && $address) 
            {
                $sql = "INSERT INTO USER (username, email, password, address) values ('$username', '$email', '$password', '$address')";
                $dbConnect->query($sql);
                if ($dbConnect->errno)
                    echo '{"status": 500,  "message": "add user failed"}';
                else
                    echo '{"status": 200,  "message": "added new user successfully"}';
            } else
                echo '{"status": 500,  "message": "parameters is empty"}';

            break;

        case "update" :

            $id = $_POST['id'] ?? '-1';
            $username = htmlspecialchars($_POST['username'] ?? '');
            $email = htmlspecialchars($_POST['email'] ?? '');
            $address = htmlspecialchars($_POST['address'] ?? '');
            $password = $_POST['password'] ?? '';

            if ($username && $email  && $address) 
            {
                $sql = "UPDATE USER SET username = '$username', email = '$email',  address = '$address'";
                if ($password) 
                    $sql .= ", password= '" . password_hash(htmlspecialchars($password), PASSWORD_DEFAULT ) ."'"; 
                $sql .= " WHERE id in ($id)";
                $dbConnect->query($sql);
                
                if ($dbConnect->errno)
                    echo '{"status": 500,  "message": "update user failed"}';
                else
                    echo '{"status": 200,  "message": "updated user successfully"}';
            } else
                echo '{"status": 500,  "message": "parameters is empty"}';
  
            break;
        case "edit" : 
            echo "delete me";
            break;
        case "delete" : {

            $id = $_GET['id'];
            $sql = "DELETE FROM user where id = $id";
            $dbConnect->query($sql);
            if ($dbConnect->errno)
                echo '{"status": 500,  "message": "delete user failed"}';
            else
                echo '{"status": 200,  "message": "deleted user successfully"}';
            break;       
        }    
    }
    $dbConnect->close();   
?>