<?php
try{
  require_once("connect.php");

  $sql = "select * from message where SER_NO = '{$_GET["ser"]}' and MES_STATUS = 0";
  $message = $pdo->query($sql);

  if($message->rowCount() == 0){
    echo "{查無資料}";
  }else{
    $messageRow = $message->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($messageRow);
  }
}catch(PDOException $e){
  echo $e->getMessage();

}
?>