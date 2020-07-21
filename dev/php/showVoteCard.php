<?php
//把這個月的之前投票關掉關掉
require_once("connect.php");

$sufeMon="SET SQL_SAFE_UPDATES=0";
$pdo->query($sufeMon);

$sql = "UPDATE `card` SET `CARD_VOTE` = '1' WHERE (MONTH(CURDATE()) > MONTH(CARD_VOTEDATE))";
$showcards = $pdo->query($sql);

$sufeMoff="SET SQL_SAFE_UPDATES=1";
$pdo->query($sufeMoff);


//show出這個月的參加明信片

try{
    require_once("connect.php");
    /*SELECT * FROM rouge.card where CARD_VOTE =1 and MONTH(CURDATE()) <= MONTH(CARD_VOTEDATE);*/
    $sql = "SELECT * FROM card where CARD_VOTE =0 and MONTH(CURDATE()) = MONTH(CARD_VOTEDATE) order by CARD_VOTEDATE";
    $showcards = $pdo->query($sql);
  
    if($showcards->rowCount() == 0 || $showcards->rowCount() < 3 ){
      echo "查無資料";
    }else{
      $showcardRow = $showcards->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($showcardRow);
    }
  }catch(PDOException $e){
    echo $e->getMessage();
  
  }
?>