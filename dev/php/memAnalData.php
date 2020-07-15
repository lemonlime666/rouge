<?php 
$errMsg = "";
session_start();
try{
    if( isset($_SESSION['mail']) ){
        require_once("connectWade.php");
        $sql = "select a.*, b.* FROM MAINTENANCE a JOIN MT_INFO b on a.MTC_CLASS = b.MTC_CLASS WHERE a.MEM_NO = {$_SESSION["memNo"]} and a.MTC_DATE = (select Max(MTC_DATE) From MAINTENANCE)";
        $info = $pdo->query($sql);
        $info -> execute();
        $allinfo = $info->fetch(PDO::FETCH_ASSOC);
        echo json_encode($allinfo);
    }else{
        echo "請先登入會員";
    }

}catch(PDOException $e){
    $errMsg .='錯誤行號'. $e->getLine();
    $errMsg .='錯誤訊息'. $e->getMessage();
}
if($errMsg != ''){
    echo $errMsg;
}
?>