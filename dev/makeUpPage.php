<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Make UP</title>
    <link rel="stylesheet" href="./css/makeUp.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Noto+Serif+TC:wght@200;300;400;500;600;700;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="./js/filesaver.js"></script>
</head>

<body>
    <section class="M_background">
        <p class="M_bgf">ROUGE</p>
        <div class="M_line"></div>
        <!-- 燈箱 -->
        <div id="id01" class="modal">
            <form class="modal-content animate" method="post">
                <div class="container">
                    <h1>前往明信片製作頁面</h1>
                    <p>點選下方確定鈕，幫照片裝飾得更美麗！</p>
                    <div>
                        <button type="button" onclick="document.getElementById('id01').style.display='none'" class="btn2-1">返回</button>
                        <!-- <button type="button" onclick="location.href='card.html'" class="btn3-1">確定</button> -->
                        <button type="button" class="btn3-1" onclick="savingImage()">確定</button>

                    </div>
                </div>
            </form>
        </div>
        <!-- 燈箱 -->
        <main class="M_makeup">
            <div class="M_left">
                <!-- option button tab -->
                <div class="M_catalog">
                    <button class="M_opt" data-list="M_first">MODEL</button>
                    <button class="M_opt" data-list="M_second">LIP STICKS</button>
                </div>
                <div class="M_option" id="M_mainOption">
                    <!-- model tab start -->
                    <div class="M_optionGroup M_first">
                        <button class="M_btn"><img src="./image/model/model01-hei-res-non.png" alt="" style="width: 60%;" id="M_chooseModel1" onclick="loadImage1()"></button>
                        <button class="M_btn"><img src="./image/model/model02-hei-res-non.png" alt="" style="width: 60%;" id="M_chooseModel2" onclick="loadImage2()"></button>
                        <button class="M_btn"><img src="./image/model/model03-hei-res-non.png" alt="" style="width: 60%;" id="M_chooseModel3" onclick="loadImage3()"></button>
                        <button class="M_btn"><img src="./image/model/model04-hei-res-non.png" alt="" style="width: 60%;" id="M_chooseModel4" onclick="loadImage4()"></button>
                        <button class="M_btn"><img src="./image/model/model05-hei-res-non.png" alt="" style="width: 60%;" id="M_chooseModel5" onclick="loadImage5()"></button>
                        <button class="M_btnSec" id="M_chooseMode6">上傳照片</button>
                    </div>
                    <!-- model tab end -->

                    <!-- products & color tab start -->
                    <div class="M_optionGroup M_second">
                        <ul class="M_lipsticksSer" id="M_menu-app">
                            <?php
                            try {
                                require_once("./php/connect.php");
                                //抓取兩個表格資料 撈出口紅資料共4筆
                                $sql1 = "SELECT count(distinct SER_NAME) FROM product, series where product.SER_NO=series.SER_NO AND PRO_COLOR LIKE '%'";
                                $series_name = $pdo->prepare($sql1);
                                $series_name->execute();
                                $no_of_ser = $series_name->fetch();
                                $val_of_color_counter = 0;  //動態新增ID
                                for ($i = 1; $i <= $no_of_ser[0]; $i++) {
                                    //最外層li
                                    echo '<li class="M_menu">
                                    <button class="M_control">';
                                    $sql_ser_name = "SELECT distinct SER_NAME FROM product, series where product.SER_NO=series.SER_NO AND PRO_COLOR LIKE '%' and series.SER_NO = $i";
                                    $MAKEUP_URL_1 = $pdo->prepare($sql_ser_name);
                                    $MAKEUP_URL_1->execute();
                                    $ser_name = $MAKEUP_URL_1->fetch();
                                    echo "$ser_name[0] </button>  <div class=\"M_seriesPanel\">";  //內層顏色div開始
                                    //撈取資料庫顏色指令
                                    $sql_ser_ind_color = "SELECT PRO_COLOR FROM product, series where product.SER_NO=series.SER_NO AND PRO_COLOR LIKE '%' and series.ser_no = $i";
                                    $MAKEUP_colors = $pdo->query($sql_ser_ind_color);  //撈取後端全部資料
                                    while ($color = $MAKEUP_colors->fetch()) {
                                        $val_of_color_counter++;  //動態新增ID
                                        echo "<div class=\"M_pcColor\" style=\"background-color:$color[0];\" id=\"color$val_of_color_counter\"></div>";
                                    }
                                    echo '<div class="M_pcnone" ><i class="fas fa-ban fa-4x"></i></div>';
                                    echo '</li>';
                                }
                            } catch (PDOException $e) {
                                echo $e->getMessage();
                            }
                            ?>
                        </ul>
                    </div>
                    <!-- products & color tab end -->
                </div>
            </div>
            <!-- middle content model & customize pic -->
            <div class="M_middle">
                <!-- <img class="M_img M_mimg" src="./image/model/model02-hei-res-non.png" alt="" id="M_bigModel"> -->
                <div class="M_imggrop">
                    <form class="M_imagecus" id="M_imageGroup" method="POST">
                        <input type="hidden" name="myImage" id="hidden_data">
                        <canvas class="M_canvas" id="painter" width="500" height="580"></canvas>
                        <p class="M_text">尚未選擇檔案</p>
                    </form>
                    <input id="M_uploadimg" type="file" hidden>
                    <button id="M_customBtn">選擇檔案</button>
                </div>
            </div>
            <div class="M_right">
                <h1 class="M_title">系列名稱</h1>
                <img src="./image/product.gif" alt="" style="width: 65%;" class="M_productImg" />
                <div class="M_content">
                    <!-- <h3 class="M_titleSec">完美持色飽和</h3> -->
                    <p class="M_detail">描述描述描述</p>
                </div>
                <div class="M_group">
                    <button class="M_contentbtn">加入購物車</button>
                    <button class="M_contentbtn" onclick="document.getElementById('id01').style.display='block'">製作明信片</button>
                </div>
                <div class="M_group">
                    <button class="M_social"><i class="fab fa-facebook fa-4x"></i></button>
                    <button class="M_social"><i class="fab fa-line fa-4x"></i></button>
                    <button class="M_social" id="M_download" onclick="M_saveImage()"><i class="fas fa-file-download fa-4x"></i></button>
                    <!-- <button class="M_social" id="M_Modeldownload"><i class="fas fa-file-download fa-4x"></i></button> -->
                </div>
            </div>
        </main>
    </section>


    <!-- PHONE -->

    <div class="M_rightgroup">
        <button class="M_shoppingBag"><i class="fas fa-shopping-bag fa-3x"></i></button>
        <button class="M_shoppingBag" onclick="location.href='card.html'"><i class="far fa-address-card fa-3x"></i></button>
    </div>


    <script src="./js/makeUp.js"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js'></script>

    <script>
        //下載自製圖
        function M_saveImage() {
            const canvasImg = document.querySelector('#painter');
            canvasImg.toBlob(function(blob) {
                saveAs(blob, 'test.png')
            })
        }

        //model & 自製圖

        let modelSrc = "";
        // window.addEventListener("load", function() {
        //         modelSrc = "upload";
        // })


        function loadImage1() {
            var canvas = document.getElementById("painter");
            var ctx = canvas.getContext("2d");
            var img = new Image();
            img.onload = function() {
                ctx.clearRect(0, 0, 700, 700);
                ctx.drawImage(img, 0, 0, 500, 600); //drawImage(img,x,y,width,height)
            }
            modelSrc = img.src = document.getElementById("M_chooseModel1").src;
            alert(modelSrc);
        }

        function loadImage2() {
            var canvas = document.getElementById("painter");
            var ctx = canvas.getContext("2d");
            var img = new Image();
            img.onload = function() {
                ctx.clearRect(0, 0, 700, 700);
                ctx.drawImage(img, 0, 0, 500, 600); //drawImage(img,x,y,width,height)
            }
            modelSrc = img.src = document.getElementById("M_chooseModel2").src;
            alert(modelSrc);
        }

        function loadImage3() {
            var canvas = document.getElementById("painter");
            var ctx = canvas.getContext("2d");
            var img = new Image();
            img.onload = function() {
                ctx.clearRect(0, 0, 700, 700);
                ctx.drawImage(img, 0, 0, 500, 600); //drawImage(img,x,y,width,height)
            }
            modelSrc = img.src = document.getElementById("M_chooseModel3").src;
            alert(modelSrc);
        }

        function loadImage4() {
            var canvas = document.getElementById("painter");
            var ctx = canvas.getContext("2d");
            var img = new Image();
            img.onload = function() {
                ctx.clearRect(0, 0, 700, 700);
                ctx.drawImage(img, 0, 0, 500, 600); //drawImage(img,x,y,width,height)
            }
            modelSrc = img.src = document.getElementById("M_chooseModel4").src;
            alert(modelSrc);

        }

        function loadImage5() {
            var canvas = document.getElementById("painter");
            var ctx = canvas.getContext("2d");
            var img = new Image();
            img.onload = function() {
                ctx.clearRect(0, 0, 700, 700);
                ctx.drawImage(img, 0, 0, 500, 600); //drawImage(img,x,y,width,height)
            }
            modelSrc = img.src = document.getElementById("M_chooseModel5").src;
            alert(modelSrc);
        }

        //存圖到資料庫
        function savingImage() {
            document.getElementById('id01').style.display='block';
            var M_canvas = document.getElementById("painter");
            var dataURL = M_canvas.toDataURL("image/png");
            document.getElementById('hidden_data').value = dataURL;
            var formData = new FormData(document.getElementById("M_imageGroup"));

            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                if (xhr.status == 200) {

                    if (xhr.responseText == "error") {
                        alert("Error");
                    } else {
                        alert('Succesfully uploaded');

                    }
                } else {
                    alert(xhr.status)
                }
            }

            xhr.open('POST', './php/makeUp.php', true);
            xhr.send(formData);
        }
    </script>

    <script>
        window.addEventListener("load", function() {
            let circles = document.querySelectorAll(".M_pcColor");
            for (let i = 0; i < circles.length; i++) {
                circles[i].onclick = function(e) {
                    alert(modelSrc + e.target.id.substr(5));
                    modelSrc = img.src = document.getElementById("M_chooseModel1").src;
                    // modelSrc.attr("src", "./image/model/model0" + changeModel + "-hei-res-" + changeLipColor + ".png")

                    // function changeImg() {
                    //     var canvas = document.getElementById("painter");
                    //     var ctx = canvas.getContext("2d");
                    //     var img = new Image();
                    //     img.onload = function() {
                    //         ctx.clearRect(0, 0, 700, 700);
                    //         ctx.drawImage(img, 0, 0, 500, 600); //drawImage(img,x,y,width,height)
                    //     }
                    //     modelSrc = img.src = document.getElementById("color01").src;

                    // }
                }

            }
        })
    </script>


</body>

</html>