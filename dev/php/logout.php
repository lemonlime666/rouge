<?php 
session_start();
unset($_SESSION["memNo"]);
unset($_SESSION["name"]);
unset($_SESSION["adrs"]);
unset($_SESSION["mail"]);
unset($_SESSION["psw"]);
unset($_SESSION["phone"]);
unset($_SESSION["voteD"]);
echo '已登出';
?>