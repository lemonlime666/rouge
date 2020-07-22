<?php
  $getdate = $_POST["sendData"];
  $strarr= explode("|", $getdate);
  // print_r($strarr);
  // echo $strarr[0];
  $orderlist= json_decode($strarr[0]);
  $order = json_decode($strarr[1]); //禮物
  $order =str_replace('"',"",$order->GIF_NO);
  $totalprice = $strarr[2];
  $address = str_replace('"',"",$strarr[3]);
  // echo $order->GIF_NO;
  $getday = date("Y-m-d");
   // echo $strarr[2];



   
  



  session_start();
  if( isset($_SESSION["mail"])){ //已登入

      //寫入訂單
    require_once("connect.php");
    $sql="INSERT INTO `pro_order` (`MEM_NO`, `ORD_UAL`, `ORD_PRICE`, `GIF_NO`, `ORD_DATE`,`ORP_ADRS`) VALUES ({$_SESSION["memNo"]}, 0, $totalprice, $order, '$getday','$address');
    ";
    $pdo->query($sql);


    $findsql="SELECT  ord_no FROM pro_order where MEM_NO ='{$_SESSION["memNo"]}' order by ORD_NO desc limit 1";
    $finds = $pdo->query($findsql);
  
   
    $find =$finds ->fetch(PDO::FETCH_ASSOC);
    $inserfindno =$find["ord_no"];
  
    for($i=0;$i<count($orderlist);$i++){
        $insersql= "INSERT INTO `ord_list` (`ORD_NO`, `PRO_NO`, `ORD_LIST_NUM`, `ORD_PRICE`) VALUES ('$inserfindno', '{$orderlist[$i]->comNo}', '{$orderlist[$i]->comNum}', '{$orderlist[$i]->comPrice}');";
        $pdo->exec($insersql);
    }
    echo "購買成功";
  }else{ //未登入
    echo "未登入";
  }

?>