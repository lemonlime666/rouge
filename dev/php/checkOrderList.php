<?php 
session_start();
$data = json_decode($_POST['obj']);
$no = $_SESSION['memNo'];
$listInfo = array();
$a = '';
try{
    require_once("connectWade.php");
    $sql = "select a.ORD_NO, a.ORD_LIST_NUM, a.ORD_PRICE, b.PRO_NAME, d.GIF_NAME from ORD_LIST a join PRODUCT b on a.PRO_NO = b.PRO_NO join PRO_ORDER c on a.ORD_NO = c.ORD_NO left join GIFT d on c.ORD_GIFT = d.GIF_NO where a.ORD_NO=:num and c.MEM_NO = $no and c.ORD_UAL=:status";
    $list = $pdo->prepare($sql);
    $list->bindValue(":num", $data->ordNo);
    $list->bindValue(":status", $data->ordStatus);
    $list->execute();
    if( $list->rowCount()==0){ //查無此人
        echo '{}';
    }else{
        $listRow = $list->fetchAll(PDO::FETCH_ASSOC);
        for($i=0; $i<count($listRow); $i++){
            array_push($listInfo,$listRow[$i]);
        }
        echo json_encode($listInfo);
    }
}catch(PDOException $e){
    $a .= "錯誤行號 : ". $e->getLine(). "<br>";
    $a .= "錯誤原因 : ". $e->getMessage(). "<br>";
    echo $a;	
}
?>