<?php
date_default_timezone_set("Asia/Taipei");
$a ='';
try {
    require_once("connectWade.php");
    $sql = "select * from `ADSCHEDULE` where AD_STATUS=1";
    $ad = $pdo->query($sql);
    $ad->execute();

    if ($ad->rowCount() == 0) {
        echo "沒有相關資料";
    }else{
        $adArr = array();
        $aditem = $ad->fetchAll(PDO::FETCH_ASSOC);
        for($i=0; $i<count($aditem); $i++){
            if( $aditem[$i]["START_DATE"] <= date('Y-m-d')  && $aditem[$i]["END_DATE"] > date('Y-m-d') ) {
                array_push($adArr,$aditem[$i]["AD_IMGURL"]);
            }
        }
        echo json_encode($adArr);
    }
} catch (PDOException $e) {
    $a .= "錯誤行號 : ". $e->getLine(). "<br>";
    $a .= "錯誤原因 : ". $e->getMessage(). "<br>";
    echo $a;
}
?>