<?php 
$orderInfo = array();
$a= '';
session_start();
$no = $_SESSION['memNo'];
$status = $_POST['status'];
try{
    if( isset($_SESSION["mail"]) ) {
        require_once("connectWade.php");
        $sql = "select * from `PRO_ORDER` WHERE MEM_NO = $no AND ORD_UAL = $status";
        $order = $pdo->query($sql); 
        $order->execute();

        if( $order->rowCount()==0){ //查無此人
            echo "{}";
        }else{
            $orderRow = $order->fetchAll(PDO::FETCH_ASSOC);
            for($i=0; $i<count($orderRow); $i++){
                array_push($orderInfo,$orderRow[$i]);
            }
            echo json_encode($orderInfo);
        }
    }else{
        echo "請先登入會員";
    }
}catch(PDOException $e){
    $a .= "錯誤行號 : ". $e->getLine(). "<br>";
	$a .= "錯誤原因 : ". $e->getMessage(). "<br>";	
}
?>