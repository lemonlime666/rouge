<?php
try{ //連線成功
	require_once("connect.php");
	// echo "連線成功~<br>";
  $sql = "SELECT *
  FROM promo_program
  right join series 
  on (select promo_program.SER_NO where now()>SP_START
    and now()<SP_END) = series.SER_NO
  where PRO_CLASS = 1 ;";
  $series = $pdo->query($sql); //執行指領


  if($series->rowCount() == 0){ //跑sql指令看有沒有結果
  	echo "{查無資料}";
  }else{
    $seriesRow = $series->fetchAll(PDO::FETCH_ASSOC); //把結果撈出來
    echo json_encode($seriesRow); //把結果寫成json字串
}
}catch(PDOException $e){ //連線失敗
  echo $e->getMessage();
}
?>