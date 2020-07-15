<?php
try{
  require_once("connect.php");
  // $sql = "SELECT * FROM rouge.product,rouge.series where rouge.product.SER_NO =  rouge.series.SER_NO and rouge.series.SER_NO = '{$_GET["SER_NO"]}'";
  $sql = " SELECT  product.PRO_NO, product.PRO_NAME, series.PRO_CLASS, product.PRO_UAL, product.PRO_IMGS, product.PRO_IMG, ifnull(ROUND(product.PRO_PRICE*(SELECT promo_list.SP_DISCOUNT FROM rouge.promo_program join rouge.promo_list on promo_program.SP_NO = promo_list.SP_NO where NOW() >= SP_START and  now() <=SP_END and promo_list.SER_NO =  product.SER_NO), 0) , ROUND(product.PRO_PRICE*1, 0)) AS 'PRO_PRICE', product.MTC_CLASS, product.SER_NO, series.SER_NAME, series.SER_ENGNAME, series.SER_IMGURL, series.SER_TEXT, product.PRO_COLOR, product.PRO_SEASON, product.PRO_USETIME 
  FROM promo_program  
  JOIN promo_list 
  ON promo_program.SP_NO = promo_list.SP_NO
  right JOIN product
  ON product.SER_NO = promo_list.SER_NO
 join series
  on product.SER_NO = series.SER_NO
  where product.SER_NO = '{$_GET["SER_NO"]}'";
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