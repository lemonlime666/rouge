<?php

try{
  require_once("connect.php");
  $resultData = json_decode($_POST["signUpInfo"]);
  
  $sqlresult = "update `maintenance` SET `MTC_CLASS` = 3, `MTC_DATE` = :today WHERE `maintenance`.`MTC_RSL` = 1"
  // $sqlresult = "select * FROM product WHERE MTC_CLASS=:answer";
  $pdoresult = $pdo->prepare($sqlresult);
  $pdoresult->bindValue(":today", $resultData->today);
  // $pdoresult->bindValue(":answer", $_POST["answer"]); //memNO
  // $pdoresult->bindValue(":class", $_POST["class"]);
  $pdoresult->execute();

  //如果找得資料，取回資料，送出xml文件
  if($pdoresult->rowCount()==0){
    echo "{}";
}else{
    // $result = $pdoresult ->fetchALL(PDO::FETCH_ASSOC);
    // echo json_encode($result);
    
}
}catch(PDOException $e){
  $err = array("error" => "system error~");
  echo json_encode($err);
}
// header('Location: anylize.php');
// exit();
?>