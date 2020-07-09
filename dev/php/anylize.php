<?php
try{
  require_once("connect.php");
  //lateYear
  $sqllateYear = "SELECT * FROM `product` WHERE `PRO_SEASON` LIKE '1'";
  $pdolateYear = $pdo->query($sqllateYear);
  
  // sun
  $sqlsun = "SELECT * FROM `product` WHERE `PRO_USETIME` LIKE '0'";
  $pdosun = $pdo->query($sqlsun);

  //night
  $sqlnight = "SELECT * FROM `product` WHERE `PRO_USETIME` LIKE '1'";
  $pdonight = $pdo->query($sqlnight);

  //earlyYear
  $sqlearlYear = "SELECT * FROM `product` WHERE `PRO_SEASON` LIKE '0'";
  $pdoearlYear = $pdo->query($sqlearlYear);
  
  //如果找得資料，取回資料，送出xml文件
  if($pdolateYear->rowCount()==0){
    echo "{}";
}else{
    $lateYear = $pdolateYear ->fetchALL(PDO::FETCH_ASSOC);
    echo json_encode($lateYear);
}
}catch(PDOException $e){
  $err = array("error" => "system error~");
  echo json_encode($err);
}
?>