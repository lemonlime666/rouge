<?php
    session_start();
    try{
        if(isset($_SESSION["mail"])){
            echo 'wrong';
        } else{
            echo '1';
        }
    }catch (PDOException $e) {
        echo $e->getMessage();
        // echo "錯誤行號", $e->getLine(), "<br>"; //2.這邊才接得到例外物件
        // echo "錯誤原因", $e->getMessage(), "<br>";
    }





?>