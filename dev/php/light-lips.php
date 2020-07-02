<?php
try{
	$dsn = "mysql:host=localhost;port=3306;dbname=rouge;charset=utf8";
	$user = "root";
	$password = "123456";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
	$pdo = new PDO($dsn, $user, $password, $options);
	// echo "連線成功~<br>";
  $sql = "select * from series";
  $series = $pdo->query($sql);


  if($series->rowCount() == 0){ //無此會員資料
  	echo "{查無資料}";
  }else{
    $seriesRow = $series->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($seriesRow);
}
}catch(PDOException $e){
  echo $e->getMessage();
}
?>