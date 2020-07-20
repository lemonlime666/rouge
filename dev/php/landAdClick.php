<?php 
$adno = $_POST["adno"];
$errMsg = "";

try{
    require_once("connectWade.php");
    $sql = "update ADSCHEDULE set CLICK = CLICK+1 WHERE AD_NO = :adno";
    $alt = $pdo->prepare($sql);
    $alt->bindValue(":adno",$adno);
    $alt->execute();
    
}catch (PDOException $e){
    $errMsg .= "錯誤行號 : ". $e->getLine(). "<br>";
	$errMsg .= "錯誤原因 : ". $e->getMessage(). "<br>";	
}
if($errMsg == ""){
	echo "異動成功";
}else{
	echo $errMsg;
}
?>