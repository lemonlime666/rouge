<?php
try{
	require_once("connect.php");
	// echo "連線成功~<br>";
  $sql = "SELECT *
  FROM promo_program
  right join series 
  on (select promo_program.SER_NO where now()>SP_START
    and now()<SP_END) = series.SER_NO
  where PRO_CLASS = 1 ;";
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