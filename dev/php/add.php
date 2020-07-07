
<?php 
try {
	$dsn = "mysql:host=localhost;port=3306;dbname=rouge;charset=utf8";
	$user = "root";
	$password = "840420";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
	$pdo = new PDO($dsn, $user, $password, $options);
	echo "連線成功~<br>";

  // $sql = "insert into series (SER_NAME, SER_ENGNAME, SER_IMGURL, SER_TEXT) values ({$_GET["SER_NAME"]},{$_GET["SER_ENGNAME"]},{$_GET["SER_IMGURL"]},{$_GET["SER_TEXT"]});
    echo "{$_GET["SER_NAME"]}";
    $sql = "insert into series (SER_NAME, SER_ENGNAME, SER_IMGURL, SER_TEXT) values ({$_GET["SER_NAME"]},'SHEER LIPGLOSS','./image/light-lip-04.jpg','全新絕對完美唇膏滿注獨家研發的「鎖水保濕因子」，搭配頂級抗老成分「普拉絲鏈」，針對唇部肌膚組織有卓越修護功效，提供8小時修護效果。天然荷荷巴油能帶給雙唇持久滋潤，不讓乾燥、脫屑等問題找上妳的雙唇。');"; //sql語法錯誤
	// $sql = "update products set price = price + 200"; //正確sql語法
	$affectedRows = $pdo->exec($sql);
	echo "成功的異動了{$affectedRows}筆資料<br>";	
} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
}

?> 
