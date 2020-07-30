<?php

try{
  session_start();
  require_once("connect.php"); 
  $sqlresult = 'SELECT * FROM `maintenance` WHERE `MEM_NO` = :mem_no';
  $pdoresult = $pdo->prepare($sqlresult);
  $pdoresult->bindValue(":mem_no", $_SESSION['memNo']);
  $pdoresult->execute();

  if($pdoresult->rowCount() == 0){
    $sqlresult1 = 'INSERT INTO `maintenance` (`MEM_NO`, `MTC_CLASS`, `MTC_DATE`) VALUES (:mem_no, :class, :today)';
    $pdoresult1 = $pdo->prepare($sqlresult1);
    $pdoresult1->bindValue(":mem_no", $_SESSION['memNo']);
    $pdoresult1->bindValue(":today", $_POST['today']);
    $pdoresult1->bindValue(":class", $_POST["class"]);
    $pdoresult1->execute();

  }else{
    $sqlresult2 = "UPDATE `maintenance` SET `MTC_CLASS` = :class, `MTC_DATE` = :today WHERE `maintenance`.`MEM_NO` = :mem_no";
    $pdoresult2 = $pdo->prepare($sqlresult2);
    $pdoresult2->bindValue(":mem_no", $_SESSION['memNo']);
    $pdoresult2->bindValue(":today", $_POST['today']);
    $pdoresult2->bindValue(":class", $_POST["class"]);
    $pdoresult2->execute();
  }

}catch(PDOException $e){
  $err = array("error" => "system error~");
  echo json_encode($err);
}
?>