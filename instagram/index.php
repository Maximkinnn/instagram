<?php 

    $login = filter_var(trim($_POST['login']), FILTER_SANITIZE_STRING); 
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING); 
    $pass = filter_var(trim($_POST['pass']), FILTER_SANITIZE_STRING); 

    if (mb_strlen($login) < 5 || mb_strlen($login) > 26) {

        echo "Недопустимая длина логина";
        exit(); 

        } else if (mb_strlen($name) < 2 || mb_strlen($name) > 26) {

            echo "Недопустимая длина имени";
            exit(); 
    
        }

        else if (mb_strlen($pass) < 8 || mb_strlen($pass) > 26) {

            echo "Недопустимая длина пароля";
            exit(); 
    
        }

    $mysql = new mysqli ('localhost', 'root', 'root', 'register-form');
    $mysql -> query("INSERT INTO `users` (`login`, `pass`, `name`) VALUES('$login', '$pass', '$name')"); 
    $mysql -> close();

    header('Location: /');
    exit();

?>