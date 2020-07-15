<?php
session_start();
if( isset($_SESSION["mail"])){ //已登入
    $memInfo = array("memNo"=>$_SESSION["memNo"],"name"=>$_SESSION["name"], "mail"=>$_SESSION["mail"], "adrs"=>$_SESSION["adrs"], "phone"=>$_SESSION["phone"], "voteD"=>$_SESSION["voteD"]);
  
    try{
      $dsn = "mysql:host=localhost;port=3306;dbname=rouge;charset=utf8";
      $user = "root";
      $password = "123456";
      $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
      $pdo = new PDO($dsn, $user, $password, $options);
      // echo "連線成功~<br>";
      
    $sql = "SELECT MAKEUP_URL FROM rouge.makeup where MAKEUP_NO ='{$_SESSION["memNo"]}'";
      $cardURL = $pdo->query($sql);
      if($cardURL->rowCount() == 0){ //無此會員資料
        echo "{查無資料}";
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