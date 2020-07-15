<?php 
	$dsn = "mysql:host=localhost;port=3306;dbname=ROUGE;charset=utf8";
	$user = "root";
	$password = "840420";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
	$pdo = new PDO($dsn, $user, $password, $options);
?>