<?php
try{
  require_once("connect.php");
  $sql = "select * from product where PRO_CLASS = 0";
  $product = $pdo->query($sql);

  if($product->rowCount() == 0){
    echo "{查無資料}";
  }else{
    $productRow = $product->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($productRow);
  }
}catch(PDOException $e){
  echo $e->getMessage();

}
?>