<?php
$errMsg='';
$text=$_POST['no'];

try{
require_once("connect.php");
$sql = "select SER_NAME,SER_IMGURL,SER_TEXT FROM series where PRO_CLASS =0 and SER_NO = $text";
$info = $pdo->query($sql);
$info -> execute();

$allinfo = $info->fetch(PDO::FETCH_ASSOC);

echo json_encode($allinfo);

}catch(PDOException $e){
    $errMsg .='錯誤行號'. $e->getLine();
    $errMsg .='錯誤訊息'. $e->getMessage();
}

// if($errMsg != ''){
//     echo $errMsg
// }



?>