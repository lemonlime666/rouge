<?php
  $getdate = $_POST["sendData"];

  $strarr= explode("|", $getdate);
  // print_r($strarr);
  // echo $strarr[0];
  $orderlist= json_decode($strarr[0]);
  $order = json_decode($strarr[1]);
  $totalprice = $strarr[2];
  // echo $order->GIF_NO;
  $getday = date("Y-m-d");
   // echo $strarr[2];
  //寫入訂單
  // require_once("connect.php");
  // $sql="INSERT INTO `rouge`.`pro_order` (`MEM_NO`, `ORD_UAL`, `ORD_PRICE`, `GIF_NO`, `ORD_DATE`,`ORP_ADRS`) VALUES ('1', '0', '$totalprice', '$order->GIF_NO', '$getday','桃園市中壢區');
  // ";
  // $sql = "select * from product where PRO_CLASS = 0";
  // $pdo->query($sql);
  require_once("connect.php");
  $findsql="SELECT  ord_no FROM rouge.pro_order where MEM_NO =1  order by ORD_NO desc limit 1";
  $finds = $pdo->query($findsql);

 
  $find =$finds ->fetch(PDO::FETCH_ASSOC);
  $inserfindno =$find["ord_no"];


  
  // $insersql= "INSERT INTO `rouge`.`ord_list` (`ORD_NO`, `PRO_NO`, `ORD_LIST_NUM`, `ORD_PRICE`) VALUES ('$inserfindno', '{$orderlist[0]->comNo}', '{$orderlist[0]->comNum}', '{$orderlist[0]->comPrice}');";
  // $pdo->exec($insersql);

  
  for($i=0;$i<count($orderlist);$i++){
    $no= $orderlist[$i]->comNo;
    $Num= $orderlist[$i]->comNum;
    $price=$orderlist[$i]->comPrice;

    echo $no,"  ";
      // $insersql= "INSERT INTO `rouge`.`ord_list` (`ORD_NO`, `PRO_NO`, `ORD_LIST_NUM`, `ORD_PRICE`) VALUES ('$inserfindno', '$no', '$Num', '$price');";
      // $pdo->exec($insersql);
  }


//  echo  $orderlist[0]->comNo;
  session_start();
  if( isset($_SESSION["mail"])){ //已登入
    if(isset($_SESSION["adrs"])){
      //輸入訂單
      // require_once("connect.php");
      // $sql="INSERT INTO `rouge`.`pro_order` (`MEM_NO`, `ORD_UAL`, `ORD_PRICE`, `GIF_NO`, `ORD_DATE`,`ORP_ADRS`) VALUES ('1', '0', '$totalprice', '$order->GIF_NO', '$getday','{$_SESSION["adrs"]}');
      // ";
      // $pdo->query($sql);
      //

      //找尋剛剛新增的訂單
      // $findsql="SELECT  ord_no FROM rouge.pro_order where MEM_NO ='{$_SESSION["memNo"]}'  order by ORD_NO desc limit 1;";
      // $finds =$pdo->query($sql);

      // $find =$finds ->fetch(PDO::FETCH_ASSOC);
      // echo $find["ord_no"];
    }else{
      echo "請回會員輸入地址";
    }

  }else{ //未登入
    echo "未登入";
  }

?>