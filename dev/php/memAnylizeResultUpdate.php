<?php

try{
  session_start();
  require_once("connect.php"); 
  $sqlresult = "INSERT INTO `maintenance` (`MEM_NO`, `MTC_CLASS`, `MTC_DATE`) VALUES (:mem_no, :class, :today);";
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