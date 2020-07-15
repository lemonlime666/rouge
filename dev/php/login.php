<?php
    session_start();

    $loginInfo = json_decode($_POST["loginInfo"]);

    try{
    require_once("connect.php");
    $sql = "select * from `MEMBERS` where MEM_MAIL=:mail and PASSWORD=:psw";
    $member = $pdo->prepare($sql); 
    $member->bindValue(":mail", $loginInfo->memMail);
    $member->bindValue(":psw", $loginInfo->memPsw);
    $member->execute();

    if( $member->rowCount()==0){ //查無此人
        echo "{}";
    }else{ //登入成功
        //自資料庫中取回資料
        $memRow = $member->fetch(PDO::FETCH_ASSOC);

        //將登入者的資訊寫入SESSION
        $_SESSION["memNo"] = $memRow["MEM_NO"];
        $_SESSION["name"] = $memRow["MEM_NAME"];
        $_SESSION["mail"] = $memRow["MEM_MAIL"];
        $_SESSION["adrs"] = $memRow["MEM_ADRS"];
        $_SESSION["phone"] = $memRow["MEM_PHON"];
        $_SESSION["voteD"] = $memRow["VOTE_DATE"];

        //送出登入者的姓名資料
        $memInfo = array("memNo"=>$_SESSION["memNo"],"name"=>$_SESSION["name"], "mail"=>$_SESSION["mail"], "adrs"=>$_SESSION["adrs"], "phone"=>$_SESSION["phone"], "voteD"=>$_SESSION["voteD"]);

        echo json_encode($memInfo);
    }
    }catch(PDOException $e){
    echo $e->getMessage();
    }
?>