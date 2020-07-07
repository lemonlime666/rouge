<?php
try{
	$dsn = "mysql:host=localhost;port=3306;dbname=rouge;charset=utf8";
	$user = "root";
	$password = "123456";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
	$pdo = new PDO($dsn, $user, $password, $options);
	// echo "連線成功~<br>";
  $sql = "SELECT CARD_URL FROM rouge.card where MAKEUP_NO =1";
  $cardURL = $pdo->query($sql);
  if($cardURL->rowCount() == 0){ //無此會員資料
  	echo "{查無資料}";
  }else{
    $cardURLColum = $cardURL->fetch(PDO::FETCH_ASSOC);
    echo  $cardURLColum["CARD_URL"] ;
    // echo json_encode($cardURLColum);
}
}catch(PDOException $e){
  echo $e->getMessage();
}
?>