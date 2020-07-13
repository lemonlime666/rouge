<?php
//把這個月的之前投票關掉關掉

//show出這個月的參加明信片

try{
    require_once("connectWade.php");
    /*SELECT * FROM rouge.card where CARD_VOTE =1 and MONTH(CURDATE()) <= MONTH(CARD_VOTEDATE);*/
    $sql = "SELECT * FROM rouge.card where CARD_VOTE =1 and MONTH(CURDATE()) <= MONTH(CARD_VOTEDATE)";
    $product = $pdo->query($sql);
  
    if($product->rowCount() == 0){
      echo "{查無資料}";
    }else{
      $productRow = $product->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($productRow);
    }
  }catch(PDOException $e){
    echo $e->getMessage();
  
  }
?>