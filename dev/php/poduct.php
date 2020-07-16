<?php
try{
  require_once("connect.php");
  // $sql = "SELECT * FROM rouge.product,rouge.series where rouge.product.SER_NO =  rouge.series.SER_NO and rouge.series.SER_NO = '{$_GET["SER_NO"]}'";
  $sql = "  SELECT product.PRO_NO, product.PRO_NAME, series.PRO_CLASS, product.PRO_UAL, product.PRO_IMGS, product.PRO_IMG,product.MTC_CLASS, product.SER_NO, series.SER_NAME, series.SER_ENGNAME, series.SER_IMGURL, series.SER_TEXT, product.PRO_COLOR, product.PRO_SEASON, product.PRO_USETIME 
  ,round(product.PRO_PRICE*ifnull(promo_program.SP_DISCOUNT,1 )) AS 'PRO_PRICE'
   FROM product
   left JOIN promo_program 
   ON (select promo_program.SER_NO where now()>SP_START
   and now()<SP_END) = product.SER_NO
   join series
  on product.SER_NO = series.SER_NO
  where product.SER_NO = '{$_GET["SER_NO"]}' && product.PRO_UAL = 0";
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