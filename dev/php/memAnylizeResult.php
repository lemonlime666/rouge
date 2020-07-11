<?php

try{
  require_once("connect.php");
  // $sqlresult = "select * from `produvt` where MTC_CLASS= :type";
  $sqlresult = "select * FROM product WHERE MTC_CLASS=:answer";
  $pdoresult = $pdo->prepare($sqlresult);
  $pdoresult->bindValue(":answer", $_POST["answer"]);
  $pdoresult->execute();
  //如果找得資料，取回資料，送出xml文件
  if($pdoresult->rowCount()==0){
    echo "{}";
}else{
    $result = $pdoresult ->fetchALL(PDO::FETCH_ASSOC);
    echo json_encode($result);
    
}
}catch(PDOException $e){
  $err = array("error" => "system error~");
  echo json_encode($err);
}
// header('Location: anylize.php');
// exit();
?>