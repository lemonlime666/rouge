<?php
   date_default_timezone_set('Asia/Taipei');
session_start();
if( isset($_SESSION["mail"])){ //已登入
    $memInfo = array("memNo"=>$_SESSION["memNo"],"name"=>$_SESSION["name"], "mail"=>$_SESSION["mail"], "adrs"=>$_SESSION["adrs"], "phone"=>$_SESSION["phone"], "voteD"=>$_SESSION["voteD"]);
    echo $_SESSION["voteD"];
    require_once("connect.php");
    //要傳抓一次日期不能用SESSION 會有問題
   

    $find ="SELECT * FROM members where MEM_NO ='{$_SESSION["memNo"]}'";
    $findRows = $pdo-> query($find);
    $findRow = $findRows->fetch(PDO::FETCH_ASSOC);
  
  
   if($_SESSION["voteD"]==null || date("Ym",strtotime($findRow["VOTE_DATE"])) < date("Ym")){
        echo  date("Ym");
      
        $voteday= date("Y-m-d");
        $sql2="UPDATE `members` SET `VOTE_DATE` = '$voteday' WHERE (`MEM_NO` = '{$_SESSION["memNo"]}');";
        // echo $sql2;
        $affectedMemRows =$pdo ->exec($sql2);
        $sql="UPDATE `card` SET `CARD_VOTESUM` = `CARD_VOTESUM` + '1' WHERE (`CARD_NO` = '{$_GET["cardNo"]}');";
        //echo $sql;
        $affectedRows =$pdo ->exec($sql);
        echo "投票成功";

   }else{
       echo "你本月份已投過票了";
   }
   


}else{ //未登入
 
    echo "未登入";
    
}
?>

