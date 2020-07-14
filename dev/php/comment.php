<?php
$commentInfo = json_decode($_POST["commentInfo"]);
try{
  require_once("connect.php");
    $sql = "insert into `message` (SER_NO, MEM_NO, MES_DATE, MES_TEXT, MES_STATUS) values (:serno, :memno, :mesdate, :mestext ,'0')";
    $procomment = $pdo->prepare($sql);
    $procomment->bindValue(":serno", $commentInfo->SER_NO);
    $procomment->bindValue(":memno", $commentInfo->MEM_NO);
    $procomment->bindValue(":mesdate", $commentInfo->MES_DATE);
    $procomment->bindValue(":mestext", $commentInfo->MES_TEXT);
    $procomment->execute();
  
}catch(PDOException $e){
  echo $e->getMessage();

}
?>