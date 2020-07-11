<?php
try{
  require_once("connect.php");
  // $sqlresult = "select * FROM product WHERE MTC_CLASS=:answer";
  // $pdoresult = $pdo->prepare($sqlresult);
  $sqllateYear = "select * from product where PRO_SEASON = :season and (PRO_USETIME =:useTime OR PRO_USETIME =2)";
  $pdolateYear = $pdo->prepare($sqllateYear);
  $pdolateYear->bindValue(":season", $_POST["season"]);
  $pdolateYear->bindValue(":useTime", $_POST["useTime"]);
  $pdolateYear->execute();
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