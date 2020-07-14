<?php
 require_once("connect.php");
//拉前三
$sql= "SELECT * FROM rouge.card where CARD_VOTE =1 and MONTH(CURDATE()) <= MONTH(CARD_VOTEDATE) order by CARD_VOTESUM desc limit 3;";
$topThreesql = $pdo ->query($sql);
$topThree = $topThreesql->fetchAll(PDO::FETCH_ASSOC);

session_start();
if( isset($_SESSION["mail"])){ //已登入
    $memInfo = array("memNo"=>$_SESSION["memNo"],"name"=>$_SESSION["name"], "mail"=>$_SESSION["mail"], "adrs"=>$_SESSION["adrs"], "phone"=>$_SESSION["phone"], "voteD"=>$_SESSION["voteD"]);
  
    //判斷有明信片資料嗎
    $find ="SELECT card.CARD_NO ,card.CARD_URL ,makeup.MAKEUP_NO, members.MEM_NO FROM rouge.card 
    join rouge.makeup 
    on card.MAKEUP_NO = makeup.MAKEUP_NO
    join rouge.members 
    on members.MEM_NO = makeup.MEM_NO
    where members.MEM_NO ='{$_SESSION["memNo"]}';";
    
    $findRows = $pdo ->query($find);
    if($findRows->rowCount() == 0){ //無此會員資料
        echo "尚未有明信片資料"."|".json_encode($topThree);
    }else{
      $findRow = $findRows->fetch(PDO::FETCH_ASSOC);
      echo   $findRow["CARD_URL"]."|".json_encode($topThree);
      // echo json_encode($cardURLColum);
    //抓會員的明信片圖片
    }
    //

    // echo json_encode($memInfo);
}else{ //未登入 沒登入指傳回TOP3
    // echo "錯誤行號",$e->getLine(),"<br>";//2.這邊才接得到例外物件
    // echo "錯誤原因",$e->getMessage(),"<br>";
	echo  "未登入會員"."|".json_encode($topThree);
}
?>