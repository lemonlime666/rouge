<?php

echo "傳送成功",$_POST["sendText"];
$today=date("Y-m-d");
session_start();
if( isset($_SESSION["mail"])){ //已登入
    $memInfo = array("memNo"=>$_SESSION["memNo"],"name"=>$_SESSION["name"], "mail"=>$_SESSION["mail"], "adrs"=>$_SESSION["adrs"], "phone"=>$_SESSION["phone"], "voteD"=>$_SESSION["voteD"]);
    require_once("connect.php");

    //判斷是修改資料還是新增資料
    $searchSql = "SELECT CARD_VOTESUM FROM rouge.card WHERE MAKEUP_NO = (SELECT MAKEUP_NO FROM makeup where mem_no = '{$_SESSION["memNo"]}')";
    $searchs = $pdo ->query($searchSql);
    $searchrow = $searchs->fetch(PDO::FETCH_ASSOC);

    if($searchrow["CARD_VOTESUM"]== null){
        // echo "新增資料";
        $upsql = "UPDATE `card` SET `CARD_VOTE` = 0, `CARD_INF` = '{$_POST["sendText"]}' ,`CARD_VOTESUM` =0 , `CARD_VOTEDATE` = '$today' WHERE MAKEUP_NO = (SELECT MAKEUP_NO FROM makeup where mem_no ='{$_SESSION["memNo"]}')";
        $upaffectedRows =$pdo ->exec($upsql);
        echo "歡迎參加投票<br>";
    }else{
        $upsql = "UPDATE `card` SET `CARD_INF` = '{$_POST["sendText"]}'  WHERE MAKEUP_NO = (SELECT MAKEUP_NO FROM makeup where mem_no ='{$_SESSION["memNo"]}')";
        $upaffectedRows =$pdo ->exec($upsql);
        echo "修改理念完成";
    }




}else{ //未登入
	echo "{}";
}

?>