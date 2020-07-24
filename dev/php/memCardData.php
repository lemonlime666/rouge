<?php
session_start();
try{
    if( isset($_SESSION['mail']) ){
        require_once("connect.php");
        $sql ="SELECT card.* 
        FROM card 
        join makeup 
        on card.MAKEUP_NO = makeup.MAKEUP_NO
        join members 
        on members.MEM_NO = makeup.MEM_NO
        where members.MEM_NO ='{$_SESSION["memNo"]}';";
        $info = $pdo->query($sql);
        
   
        if($info->rowCount() == 0){ //無此會員資料
            echo "查無資料";
          }else{
            $cardInfo = $info->fetch(PDO::FETCH_ASSOC);
            echo json_encode($cardInfo);
        }
    
    }else{
        echo "請先登入會員";
    }

}catch(PDOException $e){
    $errMsg .='錯誤行號'. $e->getLine();
    $errMsg .='錯誤訊息'. $e->getMessage();
}

?>