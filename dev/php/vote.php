<?php
session_start();
if( isset($_SESSION["mail"])){ //已登入
    $memInfo = array("memNo"=>$_SESSION["memNo"],"name"=>$_SESSION["name"], "mail"=>$_SESSION["mail"], "adrs"=>$_SESSION["adrs"], "phone"=>$_SESSION["phone"], "voteD"=>$_SESSION["voteD"]);
    if($_SESSION["voteD"]==null || date("Ym",strtotime($_SESSION["voteD"])) < date("Ym")){
        //echo  date("Ym");
        require_once("connect.php");
        $voteday= date("Ymd");
        $sql2="UPDATE `rouge`.`members` SET `VOTE_DATE` = '$voteday' WHERE (`MEM_NO` = '{$_SESSION["memNo"]}');";
        // echo $sql2;
        $affectedMemRows =$pdo ->exec($sql2);
        $sql="UPDATE `rouge`.`card` SET `CARD_VOTESUM` = `CARD_VOTESUM` + '1' WHERE (`CARD_NO` = '{$_GET["cardNo"]}');";
        //echo $sql;
        $affectedRows =$pdo ->exec($sql);
        //echo "成功的異動了 {$affectedRows} 筆資料<br>";

        // echo "成功的異動了 {$affectedMemRows} 筆資料<br>";
        echo "投票成功";
    }else{
        echo "你本月份已投過票了";
    }
   
    // $sql="UPDATE `rouge`.`card` SET `CARD_VOTESUM` = `CARD_VOTESUM` + '1' WHERE (`CARD_NO` = '6');";
    // echo $sql;
    // $affectedRows =$pdo ->exec($sql);
    
    // echo "成功登入並且得到".$_GET["cardNo"];


    // echo json_encode($memInfo);
}else{ //未登入
    echo "錯誤行號",$e->getLine(),"<br>";//2.這邊才接得到例外物件
    echo "錯誤原因",$e->getMessage(),"<br>";
    echo "未登入";
    
}
?>

