<?php
session_start();
if( isset($_SESSION["mail"])){ //已登入
    $memInfo = array("memNo"=>$_SESSION["memNo"],"name"=>$_SESSION["name"], "mail"=>$_SESSION["mail"], "adrs"=>$_SESSION["adrs"], "phone"=>$_SESSION["phone"], "voteD"=>$_SESSION["voteD"]);
  
    try{
      require_once("connect.php");
      // echo "連線成功~<br>";
      
    $sql = "SELECT MAKEUP_URL FROM makeup where MAKEUP_NO ='{$_SESSION["memNo"]}'";
      $cardURL = $pdo->query($sql);
      if($cardURL->rowCount() == 0){ //無此會員資料
        echo "查無資料";
      }else{
        $cardURLColum = $cardURL->fetch(PDO::FETCH_ASSOC);
        echo  $cardURLColum["MAKEUP_URL"] ;
        // echo json_encode($cardURLColum);
    }
    }catch(PDOException $e){
      echo $e->getMessage();
    }


}else{ //未登入
	echo "未登入";
}

?>