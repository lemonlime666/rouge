<?php 
session_start();
$no = $_SESSION['memNo'];
$alterData = json_decode($_POST["alterStr"]);
$errMsg = "";

try{
    require_once("connectWade.php");
    $sql = "update MEMBERS set MEM_NAME=:name, MEM_ADRS=:adrs, MEM_MAIL=:mail, MEM_PHON=:phone where MEM_NO=$no";
    $alt = $pdo->prepare($sql);
	$alt->bindValue(":name", $alterData->name);
    $alt->bindValue(":adrs", $alterData->adrs);
    $alt->bindValue(":mail", $alterData->mail);
    $alt->bindValue(":phone", $alterData->phone);
    $alt->execute();
    
    $_SESSION["name"] = $alterData->name;
    $_SESSION["mail"] = $alterData->mail;
    $_SESSION["adrs"] = $alterData->adrs;
    $_SESSION["phone"] = $alterData->phone;

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