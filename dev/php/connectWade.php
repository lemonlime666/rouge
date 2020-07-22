<?php 
	$dsn = "mysql:host=localhost;port=3306;dbname=ED101G3;charset=utf8";
	$user = "ed101g3";
	$password = "ed101g3";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
	$pdo = new PDO($dsn, $user, $password, $options);
?>