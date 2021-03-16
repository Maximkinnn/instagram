<?php

    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING); 
    $pass = filter_var(trim($_POST['pass']), FILTER_SANITIZE_STRING);  

        // if (mb_strlen($name) < 2 || mb_strlen($name) > 26) {

        //     echo "Недопустимая длина имени";
        //     exit(); 
    
        // }

        // else if (mb_strlen($pass) <pre 8 || mb_strlen($pass) > 26) {

        //     echo "Недопустимая длина пароля";
        //     exit(); 
    
        // }

        // if (empty($_POST['name']) && empty($_POST['pass'])) {

        //     exit('Текстовые поля не заполнены');

        // } else {

        //     echo '</pre>';
        //     print_r($_POST);
        //     echo '</pre>';

        // }

    $mysql = new mysqli ('localhost', 'root', 'root', 'register-form');
    $mysql -> query("INSERT INTO `users` (`pass`, `name`) VALUES('$pass', '$name')"); 
    $mysql -> close();

    header('Location: /');
    exit();

?>
