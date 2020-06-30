<?php
try{
  require_once("connect.php");
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