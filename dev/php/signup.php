<?php
session_start();
$signUpInfo = json_decode($_POST["signUpInfo"]);
try {
    require_once("connectWade.php");
    $sql1 = "select * from `MEMBERS` where MEM_MAIL=:mail";
    $member1 = $pdo->prepare($sql1);
    $member1->bindValue(":mail", $signUpInfo->memMail);
    $member1->execute();

    if ($member1->rowCount() == 0) { //查無此帳號,允許註冊

        //寫入資料庫
        $sql2 = "insert into `MEMBERS` (MEM_NAME, MEM_MAIL, PASSWORD) values (:name, :mail, :psw)";
        $member2 = $pdo->prepare($sql2);
        $member2->bindValue(":name", $signUpInfo->memName);
        $member2->bindValue(":mail", $signUpInfo->memMail);
        $member2->bindValue(":psw", $signUpInfo->memPsw);
        $member2->execute();

        //寫入session
        $sql3 = "select * from `MEMBERS` where MEM_MAIL=:mail and PASSWORD=:psw";
        $member3 = $pdo->prepare($sql3);
        $member3->bindValue(":mail", $signUpInfo->memMail);
        $member3->bindValue(":psw", $signUpInfo->memPsw);
        $member3->execute();
        $memRow = $member3->fetch(PDO::FETCH_ASSOC);

        $_SESSION["memNo"] = $memRow["MEM_NO"];
        $_SESSION["name"] = $memRow["MEM_NAME"];
        $_SESSION["mail"] = $memRow["MEM_MAIL"];
        $_SESSION["adrs"] = $memRow["MEM_ADRS"];
        $_SESSION["phone"] = $memRow["MEM_PHON"];
        $_SESSION["voteD"] = $memRow["VOTE_DATE"];

        //送回資料
        $memInfo = array("memNo"=>$_SESSION["memNo"],"name"=>$_SESSION["name"], "mail"=>$_SESSION["mail"], "adrs"=>$_SESSION["adrs"], "phone"=>$_SESSION["phone"], "voteD"=>$_SESSION["voteD"]);

        echo json_encode($memInfo);
        
    } else {
        echo "{}";
    }

} catch (PDOException $e) {

    echo $e->getMessage();

}
?>
