

<?php
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
// echo $success ? $file : 'error';

session_start();
if( isset($_SESSION["mail"])){ //已登入
    $memInfo = array("memNo"=>$_SESSION["memNo"],"name"=>$_SESSION["name"], "mail"=>$_SESSION["mail"], "adrs"=>$_SESSION["adrs"], "phone"=>$_SESSION["phone"], "voteD"=>$_SESSION["voteD"]);
    require_once("connect.php");
    $sql="insert into CARD(CARD_URL, MAKEUP_NO,CARD_VOTE,CARD_TEXT) values ('$file',(SELECT MAKEUP_NO FROM rouge.makeup where mem_no ='{$_SESSION["memNo"]}'),'0','$imgDatatext');";
    echo $sql;
    $affectedRows =$pdo ->exec($sql);
    echo "成功的異動了 {$affectedRows} 筆資料<br>";

    // echo json_encode($memInfo);
}else{ //未登入
    echo "錯誤行號",$e->getLine(),"<br>";//2.這邊才接得到例外物件
    echo "錯誤原因",$e->getMessage(),"<br>";
	echo "{}";
}
?>
<?php
// try{
// 	$dsn = "mysql:host=localhost;port=3306;dbname=rouge;charset=utf8";
// 	$user = "root";
// 	$password = "123456";
// 	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
// 	$pdo = new PDO($dsn, $user, $password, $options);
// 	// echo "連線成功~<br>";
//   $sql = "SELECT CARD_URL FROM rouge.card where MAKEUP_NO =1";
//   $cardURL = $pdo->query($sql);
//   if($cardURL->rowCount() == 0){ //無此會員資料
//   	echo "{查無資料}";
//   }else{
//     $cardURLColum = $cardURL->fetch(PDO::FETCH_ASSOC);
//     echo  $cardURLColum["CARD_URL"] ;
//     // echo json_encode($cardURLColum);
// }
// }catch(PDOException $e){
//   echo $e->getMessage();
// }
?>