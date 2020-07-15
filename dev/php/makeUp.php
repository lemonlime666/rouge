
    <?php

    session_start();

    try {
        if (isset($_SESSION["mail"])) { //檢查是否是會員
            require_once("./connect.php");

            $find = "SELECT * FROM makeup join members on makeup.MEM_NO = members.MEM_NO where  makeup.MEM_NO ='{$_SESSION["memNo"]}'";
            $findRows = $pdo->query($find);
            $findRows->execute();

            //新增
            $upload_dir = "../image/makeup_member/";  //檢查資料夾存不存在
            if (!file_exists($upload_dir)) {
                mkdir($upload_dir);
            }
            $imgDataStr = $_POST['myImage']; //收到convas.toDataURL()送來的資料
            $imgDataStr = str_replace('data:image/png;base64,', '', $imgDataStr); //將檔案格式的資訊拿掉
            $data = base64_decode($imgDataStr);
            //準備好要存的filename
            $fileName = date("Ymd-h-m-s");  //或time()
            $file = $upload_dir . $fileName . ".png";
            $success = file_put_contents($file, $data);
            $file = substr($file, 1);
            echo $file;

            if ($findRows->rowCount() == 0) {

                $sql = "INSERT INTO `rouge`.`makeup` (`MEM_NO`,  `MAKEUP_URL`) VALUES ('{$_SESSION["memNo"]}',  '$file')";
                $insert = $pdo->prepare($sql);
                $insert->execute();
                echo "新增成功";
            } else {
                // echo "修改資料";
                $upsql = "UPDATE `rouge`.`makeup` SET `MAKEUP_URL` = '$file' WHERE (`MEM_NO` = '{$_SESSION["memNo"]}');";
                $pdo->exec($upsql);
            }
        } else { //未登入

            echo "請先登入";
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
        // echo "錯誤行號", $e->getLine(), "<br>"; //2.這邊才接得到例外物件
        // echo "錯誤原因", $e->getMessage(), "<br>";
    }

    ?>
