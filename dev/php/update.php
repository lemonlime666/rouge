
<?php 
try {
	$dsn = "mysql:host=localhost;port=3306;dbname=rouge;charset=utf8";
	$user = "root";
	$password = "840420";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
	$pdo = new PDO($dsn, $user, $password, $options);
	echo "連線成功~<br>";

  // $sql = "insert into series (SER_NAME, SER_ENGNAME, SER_IMGURL, SER_TEXT) values ({$_GET["SER_NAME"]},{$_GET["SER_ENGNAME"]},{$_GET["SER_IMGURL"]},{$_GET["SER_TEXT"]});
    echo $_GET["123"];
    // $sql = "update series set SER_NAME = '{$_GET["SER_NAME"]}' where SER_NO = 1"; //sql語法錯誤
    // $sql = "update series set SER_NAME = '無敵水潤系列' where SER_NO = 1;";
	// $sql = "update products set price = price + 200"; //正確sql語法
	// $affectedRows = $pdo->exec($sql);
	// echo "成功的異動了{$affectedRows}筆資料<br>";	
} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
}

?> 