

<?php


session_start();
if( isset($_SESSION["mail"])){ //已登入
  //產生圖檔

  $upload_dir = "../image/saveCard//";  //檢查資料夾存不存在
    if( !file_exists($upload_dir)){
      mkdir($upload_dir);
    }
    $imgDataStr = $_POST['hidden_data'];//收到convas.toDataURL()送來的資料
    $imgDatatext = $_POST['cardText'];
    // echo $_POST['hidden_data'];
    $imgDataStr = str_replace('data:image/png;base64,', '', $imgDataStr); //將檔案格式的資訊拿掉
    // $imgDataStr = str_replace(' ', '+', $imgDataStr);
    $data = base64_decode($imgDataStr);
    //準備好要存的filename
    $fileName = date("Ymd-h-i-s");  //或time()
    $file = $upload_dir . $fileName . ".png";
    $success = file_put_contents($file, $data);
    $file= substr($file,1);
    echo $file;
    echo $success ? $file : 'error';




    $memInfo = array("memNo"=>$_SESSION["memNo"],"name"=>$_SESSION["name"], "mail"=>$_SESSION["mail"], "adrs"=>$_SESSION["adrs"], "phone"=>$_SESSION["phone"], "voteD"=>$_SESSION["voteD"]);
    require_once("connect.php");

      


    //要先查看他有資料嗎決定新增還是修改
    $find ="SELECT CARD_NO, CARD_URL, makeup.MAKEUP_NO, CARD_TEXT, CARD_VOTE, CARD_INF, CARD_VOTESUM, CARD_VOTEDATE, members.MEM_NO FROM 
    card join makeup  
    on card.MAKEUP_NO = makeup.MAKEUP_NO 
    join members 
    on members.MEM_NO = makeup.MEM_NO 
    and makeup.MEM_NO ='{$_SESSION["memNo"]}';";
    $findRows = $pdo ->query($find);

   
    if($findRows->rowCount()==0){
      // echo "新增資料";
      $sql="insert into CARD(CARD_URL, MAKEUP_NO,CARD_VOTE,CARD_TEXT) values ('$file',(SELECT MAKEUP_NO FROM makeup where mem_no ='{$_SESSION["memNo"]}'),'0','$imgDatatext');";
      // echo $sql;
      $affectedRows =$pdo ->exec($sql);


       //讀取要丟給FB的IMGURL
      $fbimgurl = "SELECT   right(CARD_URL,21)  'afterimgurl' FROM
     card join makeup  
      on card.MAKEUP_NO = makeup.MAKEUP_NO 
      join members 
      on members.MEM_NO = makeup.MEM_NO 
      and makeup.MEM_NO ='{$_SESSION["memNo"]}'";
      $fbimgurlrow = $pdo ->query($fbimgurl);
      $imgRow = $fbimgurlrow->fetch(PDO::FETCH_ASSOC);
      echo "成功的新增了 {$affectedRows} 筆資料"."|". $imgRow["afterimgurl"];



    }else{
      // echo "修改資料";
      $upsql = "UPDATE `card` SET `CARD_URL` = '$file', `CARD_TEXT` = '$imgDatatext', `CARD_VOTE` =1,`CARD_INF` = null ,`CARD_VOTESUM` =null , `CARD_VOTEDATE` = null WHERE MAKEUP_NO = (SELECT MAKEUP_NO FROM makeup where mem_no ='{$_SESSION["memNo"]}')";
      $upaffectedRows =$pdo ->exec($upsql);

       //讀取要丟給FB的IMGURL
      $fbimgurl = "SELECT   right(CARD_URL,21)  'afterimgurl' FROM
      card join makeup  
      on card.MAKEUP_NO = makeup.MAKEUP_NO 
      join members 
      on members.MEM_NO = makeup.MEM_NO 
      and makeup.MEM_NO ='{$_SESSION["memNo"]}'";
      $fbimgurlrow = $pdo ->query($fbimgurl);
      $imgRow = $fbimgurlrow->fetch(PDO::FETCH_ASSOC);

      echo "成功的修改了 {$upaffectedRows} 筆資料"."|". $imgRow["afterimgurl"];
    }



    

    
}else{ //未登入
    // echo "錯誤行號",$e->getLine(),"<br>";//2.這邊才接得到例外物件
    // echo "錯誤原因",$e->getMessage(),"<br>";
  	echo "未登入";
}


?>