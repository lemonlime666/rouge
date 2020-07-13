
    <?php
    try {
        require_once("./connect.php");

        //series table
        $sql2 = "SELECT * FROM rouge.series";
        // $sql2 = "SELECT * FROM rouge.series where PRO_CLASS = :pro_class and SER_NAME= :ser_name ";
        $SERIES = $pdo->prepare($sql2);
        // $SERIES->bindValue(":pro_class", $_GET["pro_class"]);
        // $SERIES->bindValue(":ser_name", $_GET["ser_name"]);
        $SERIES->execute();
        $rowsS = $SERIES->fetchAll(PDO::FETCH_ASSOC);  //抓所有欄位資料

        $newrowsS = array($rowsS[0]["SER_NAME"], $rowsS[0]["SER_IMGURL"], $rowsS[0]["SER_TEXT"]);
        echo json_encode($newrowsS);


        //series table

        // $sql2 = "SELECT ser_name FROM rouge.series where PRO_CLASS =0";
        // $SERIES = $pdo->prepare($sql2);
        // $SERIES->execute();
        // $rowsS = $SERIES->fetch(PDO::FETCH_ASSOC);  //抓所有欄位資料


        // for($s=1 ; $s <= $rowsS[0] ; $s++){
        // echo json_encode($rowsS);



        // }





        //makeUp table  要指定資料夾存路徑
        // $sql1 = "select * from makeup";

        $upload_dir = "../image/makeup_member/";  //檢查資料夾存不存在
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir);
        }
        $imgDataStr = $_POST['myImage']; //收到convas.toDataURL()送來的資料
        $imgDataStr = str_replace('data:image/png;base64,', '', $imgDataStr); //將檔案格式的資訊拿掉
        // $imgDataStr = str_replace(' ', '+', $imgDataStr);
        $data = base64_decode($imgDataStr);
        //準備好要存的filename
        $fileName = date("Ymd");  //或time()
        $file = $upload_dir . $fileName . ".png";
        $success = file_put_contents($file, $data);
        $file = substr($file, 1);
        echo $file;
        // echo $success ? $file : 'error';


        //新增
        // session_start();
        // if (isset($_SESSION["mail"])) { //已登入
        //     $memInfo = array("memNo" => $_SESSION["memNo"], "name" => $_SESSION["name"], "mail" => $_SESSION["mail"], "adrs" => $_SESSION["adrs"], "phone" => $_SESSION["phone"], "voteD" => $_SESSION["voteD"]);
        //     require_once("connect.php");

            //要先查看他有資料嗎決定新增還是修改
            //$find = "SELECT * FROM makeup join members on makeup.MEM_NO = members.MEM_NO where  makeup.MEM_NO ='{$_SESSION["memNo"]}'";

            $find = "SELECT * FROM makeup join members on makeup.MEM_NO = members.MEM_NO where  makeup.MEM_NO =1";

            $findRows = $pdo->query($find);
            if ($findRows->rowCount() == 0) {
                echo "新增資料";
                $sql = "INSERT INTO `rouge`.`makeup` (`MEM_NO`,  `MAKEUP_URL`) VALUES ('{$_SESSION["memNo"]}',  '$file')";
                echo $sql;
                $pdo->exec($sql);
                
            } else {
                echo "修改資料";
                $upsql = "UPDATE `rouge`.`makeup` SET `MAKEUP_URL` = '$file' WHERE (`MEM_NO` = 1);
                ";
                $pdo->exec($upsql);
                
            }

            // $sql="insert into CARD(CARD_URL, MAKEUP_NO,CARD_VOTE,CARD_TEXT) values ('$file',(SELECT MAKEUP_NO FROM rouge.makeup where mem_no ='{$_SESSION["memNo"]}'),'0','$imgDatatext');";
            // echo $sql;
            // $affectedRows =$pdo ->exec($sql);
            // echo "成功的異動了 {$affectedRows} 筆資料<br>";

            // echo json_encode($memInfo);
        // } else { //未登入
        //     echo "錯誤行號", $e->getLine(), "<br>"; //2.這邊才接得到例外物件
        //     echo "錯誤原因", $e->getMessage(), "<br>";
        //     echo "{}";
        // }
    } catch (PDOException $e) {
        echo $e->getMessage();
    }






    ?>
