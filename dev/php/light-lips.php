<?php
try{
	require_once("connect.php");
	// echo "連線成功~<br>";
  $sql = "select * from series where PRO_CLASS = 0";
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