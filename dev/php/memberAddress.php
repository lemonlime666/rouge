<?php
  // session_start();
  // if( isset($_SESSION["mail"])){ //已登入
    
  // }
  

  // try{
  //   require_once("connect.php");
  //   $sql = "select * from rouge.members where MEM_MAIL = 'rouge@gmal.com';";
  //   $member = $pdo->query($sql);
  
  //   if($member->rowCount() == 0){
  //     echo "{查無資料}";
  //   }else{
  //   $memberRow = $member->fetchAll(PDO::FETCH_ASSOC);
  //   echo json_encode($memberRow);
  //   }

  // }catch(PDOException $e){
  //   echo $e->getMessage();
  // }

  //測試
    // require_once("connect.php");
    // $sql = "select * from rouge.members where MEM_MAIL = 'rouge@gmal.com';";
    // $member = $pdo->query($sql);
    // $memberRow = $member->fetchAll(PDO::FETCH_ASSOC);
    // echo json_encode($memberRow);
      







  //結果
    session_start();
    if(isset($_SESSION["mail"])){ //已登入
      require_once("connect.php");
      $sql = "select MEM_ADRS from rouge.members where MEM_MAIL = '{$_SESSION["mail"]}';";
      $member = $pdo->query($sql);
      $memberRow = $member->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($memberRow);
    }else{ //未登入
      echo "未登入";

    }
    

?>