<?php
  $getdate = '[{"comNo":"1","comName":"水潤光感唇膏","comImg":"./image/lip-color/S3R-1-01.png","comNum":1,"comPrice":"750"}]|null|750|"111111111111"';
  $strarr= explode("|", $getdate);
  // print_r($strarr);
  echo $strarr[1];
  $orderlist= json_decode($strarr[0]);
  $order = json_decode($strarr[1]); //禮物
  $totalprice = $strarr[2];
  $address = str_replace('"',"",$strarr[3]);
  // echo $order->GIF_NO;
  $getday = date("Y-m-d");
   // echo $strarr[2];

  // print_r($strarr);
   //判斷禮物是否為空
  //  echo $getdate;
?>