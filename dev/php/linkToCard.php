<?php
session_start();
if( isset($_SESSION["mail"])){ //已登入
    echo "0";
}else{ //未登入
	echo "1";
}
?>