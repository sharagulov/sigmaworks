<?php
$login = $_POST['login'];
$pass = $_POST['pass'];
$repass = $_POST['repass'];
$mail = $_POST['mail'];
$orgname = $_POST['orgname'];
$ogrn = $_POST['ogrn'];
$flag = 0;
if(empty($login)) {
    header('Location: /');
}
