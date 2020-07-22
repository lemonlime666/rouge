<?php








  //結果
    session_start();
    if(isset($_SESSION["mail"])){ //已登入
      require_once("connect.php");
      $sql = "select MEM_ADRS from members where MEM_MAIL = '{$_SESSION["mail"]}';";
      $member = $pdo->query($sql);
      $memberRow = $member->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($memberRow);
    }else{ //未登入
      echo "未登入";

    }
    

?>