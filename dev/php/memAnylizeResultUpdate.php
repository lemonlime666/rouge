<?php

try{
  session_start();
  require_once("connect.php"); 
  $sqlresult = "UPDATE `maintenance` SET `MTC_CLASS` = :class, `MTC_DATE` = :today WHERE `maintenance`.`MEM_NO` = :mem_no";
  $pdoresult = $pdo->prepare($sqlresult);
  $pdoresult->bindValue(":today", $_POST['today']);
  $pdoresult->bindValue(":mem_no", $_SESSION['memNo']);
  $pdoresult->bindValue(":class", $_POST["class"]);
  $pdoresult->execute();

}catch(PDOException $e){
  $err = array("error" => "system error~");
  echo json_encode($err);
}
?>