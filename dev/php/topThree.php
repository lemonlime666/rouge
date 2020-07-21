<?php
 require_once("connect.php");
//拉前三
$sql= "SELECT * FROM card where CARD_VOTE =0 and MONTH(CURDATE()) <= MONTH(CARD_VOTEDATE) order by CARD_VOTESUM desc limit 3;";
$topThreesql = $pdo ->query($sql);
// $topThree = $topThreesql->fetchAll(PDO::FETCH_ASSOC);

$recallStr="";

if($topThreesql->rowCount() == 0 || $topThreesql->rowCount() < 3){ //無此會員資料
    $recallStr="查無資料";
}else{
    $recallStr = json_encode($topThreesql->fetchAll(PDO::FETCH_ASSOC));  
  
  // echo json_encode($cardURLColum);
//抓會員的明信片圖片
}
session_start();
if( isset($_SESSION["mail"])){ //已登入
    $memInfo = array("memNo"=>$_SESSION["memNo"],"name"=>$_SESSION["name"], "mail"=>$_SESSION["mail"], "adrs"=>$_SESSION["adrs"], "phone"=>$_SESSION["phone"], "voteD"=>$_SESSION["voteD"]);
  
    //判斷有明信片資料嗎
    $find ="SELECT card.CARD_NO ,card.CARD_URL ,makeup.MAKEUP_NO, members.MEM_NO FROM card 
    join makeup 
    on card.MAKEUP_NO = makeup.MAKEUP_NO
    join members 
    on members.MEM_NO = makeup.MEM_NO
    where members.MEM_NO ='{$_SESSION["memNo"]}';";
    
    $findRows = $pdo ->query($find);
    if($findRows->rowCount() == 0){ //無此會員資料
        echo "尚未有明信片資料"."|".$recallStr;
    }else{
      $findRow = $findRows->fetch(PDO::FETCH_ASSOC);
      echo   $findRow["CARD_URL"]."|".$recallStr;
      // echo json_encode($cardURLColum);
    //抓會員的明信片圖片
    }
    //

    // echo json_encode($memInfo);
}else{ //未登入 沒登入指傳回TOP3
    // echo "錯誤行號",$e->getLine(),"<br>";//2.這邊才接得到例外物件
    // echo "錯誤原因",$e->getMessage(),"<br>";
	echo  "未登入會員"."|".$recallStr;
}
?>