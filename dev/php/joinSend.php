<?php

echo "傳送成功",$_POST["sendText"];
$today=date("Y-m-d");
session_start();
if( isset($_SESSION["mail"])){ //已登入
    $memInfo = array("memNo"=>$_SESSION["memNo"],"name"=>$_SESSION["name"], "mail"=>$_SESSION["mail"], "adrs"=>$_SESSION["adrs"], "phone"=>$_SESSION["phone"], "voteD"=>$_SESSION["voteD"]);

    require_once("connect.php");
    echo "修改資料";
    $upsql = "UPDATE `rouge`.`card` SET `CARD_VOTE` = 0, `CARD_INF` = '{$_POST["sendText"]}' ,`CARD_VOTESUM` =null , `CARD_VOTEDATE` = '$today' WHERE MAKEUP_NO = (SELECT MAKEUP_NO FROM rouge.makeup where mem_no ='{$_SESSION["memNo"]}')";
    $upaffectedRows =$pdo ->exec($upsql);
    echo "成功的修改了 {$upaffectedRows} 筆資料<br>";



}else{ //未登入
	echo "{}";
}

?>