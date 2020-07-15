<?php
$commentInfo = json_decode($_POST["commentInfo"]);
$datetime = date ("Y-m-d");


session_start();
if( isset($_SESSION["mail"])){ //已登入
    $memInfo = array("memNo"=>$_SESSION["memNo"],"name"=>$_SESSION["name"], "mail"=>$_SESSION["mail"], "adrs"=>$_SESSION["adrs"], "phone"=>$_SESSION["phone"], "voteD"=>$_SESSION["voteD"]);

    try{
      require_once("connect.php");
      $sql = "insert into `message` (SER_NO, MEM_NO, MES_DATE, MES_TEXT, MES_STATUS) values (:serno, :memno, :mesdate, :mestext ,'0')";
      $procomment = $pdo->prepare($sql);
      $procomment->bindValue(":serno", $commentInfo->SER_NO);
      $procomment->bindValue(":memno", $_SESSION["memNo"]);
      $procomment->bindValue(":mesdate", $datetime);
      $procomment->bindValue(":mestext", $commentInfo->MES_TEXT);
      $procomment->execute();
      echo "留言成功";


      }catch(PDOException $e){
        echo $e->getMessage();
      
      }
    // echo json_encode($memInfo);
}else{ //未登入
	echo "未登入";
}


?>