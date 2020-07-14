

$(document).ready(function () {
    // let my_pro_class = '';
    //接ajax
    $.ajax({
        type: 'GET',
        url: './php/makeUp.php',
        // data:{
        //     pro_class:0,
        //     ser_name:' my_pro_class'
        // },
        success(data) {
            // let s = JSON.parse(data);
            let s = JSON.parse(data);
            s.pop(2605);
            
            
            
            console.log(s);
            // document.querySelector(".M_title").innerHTML = data;
            // document.querySelector(".M_title").innerHTML = s[0];
            // document.querySelector(".M_productImg").innerHTML = s[1];
            // document.querySelector(".M_detail").innerHTML = s[1];
        }
    })





    // Get the modal
    var modal = document.getElementById('id01');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    //ROUGE動畫 start
    var M_text = document.querySelector(".M_bgf");
    var M_stringText = M_text.textContent;
    // 切割成字串
    var M_splitText = M_stringText.split("");
    //原有p標籤文字消失
    M_text.textContent = "";

    for (var i = 0; i < M_splitText.length; i++) {
        //寫入HTML 每個字串前後加標籤 並且指定M_splitText每個i
        M_text.innerHTML += "<span>" + M_splitText[i] + "</span>";
    }

    var M_word = 0;
    var M_time = setInterval(appearSlow, 50);

    function appearSlow() {
        const span = M_text.querySelectorAll('span')[M_word]; //字從第零開始
        span.classList.add('M_fade');
        M_word++
        if (M_word == M_splitText.length) {
            M_complete();
            return;
        }
    }
    function M_complete() {
        clearInterval(M_time);
        M_time = null;
    }
    //ROUGE動畫 end



    //最外層tab function 預設 hide&show
    $(function () {
        $(".M_option .M_optionGroup").hide();
        $(".M_option .M_optionGroup:first-child").show();

        // model & color tabclick function
        $(".M_catalog button").click(function () {
            $(".M_catalog button").removeClass("M_active");
            $(this).addClass("M_active");

            var M_makeUpCurrent_tab_value = $(this).attr("data-list");
            $(".M_option .M_optionGroup").hide();
            $("." + M_makeUpCurrent_tab_value).slideDown(600);
        });
    })



    // products & color tab function 
    $(function () {
        $(".M_menu .M_seriesPanel").hide();
        $(".M_menu:first-child .M_seriesPanel").show();

        $(".M_menu button").click(function (e) {
            e.preventDefault();

            //點 ul.lipsticksSer > li.M_menu > btn.M_contorl 顯示.M_seriesPanel 再找.M_seriesPanel收合
            $(this).siblings(".M_seriesPanel").slideDown().parent().siblings().find(".M_seriesPanel").slideUp();

            //點 ul.lipsticksSer > li.M_menu > btn.M_contorl 加上class M_btn_panel_active
            $(this).addClass("M_btn_panel_active").parent().siblings().find(".M_control").removeClass("M_btn_panel_active");
        });
    });




    //變更model
    $(function () {
        $(".M_first button img").click(function () {
            // 1.先選MODEL
            changeModel = $(this).attr("id").substr(13);
            $("#M_bigModel").attr("src", "./image/model/model0" + changeModel + "-hei-res-non.png");

            // 2.再選唇色
            $(" .M_seriesPanel #color1").click(function () {
                changeLipColor = $(this).attr("id").substr(5);
                $("#M_bigModel").attr("src", "./image/model/model0" + changeModel + "-hei-res-" + changeLipColor + ".png")
            })

            $(" .M_second #lipred").click(function () {
                changeLipColor = $(this).attr("id").substr(3);
                $("#M_bigModel").attr("src", "./image/model/model0" + changeModel + "-hei-res-" + changeLipColor + ".png")
            })

            $(" .M_second #liporange").click(function () {
                changeLipColor = $(this).attr("id").substr(3);
                $("#M_bigModel").attr("src", "./image/model/model0" + changeModel + "-hei-res-" + changeLipColor + ".png")
            })

            $(" .M_second .M_pcnone").click(function () {
                changeLipColor = $(this).attr("id").substr(3);
                $("#M_bigModel").attr("src", "./image/model/model0" + changeModel + "-hei-res-" + changeLipColor + ".png")
            })
        })
    })



    //上傳照片function
    //1.點上傳照片按鈕切換版面+下載btn
    // $(function () {
    //     $(".M_imggrop").hide();
    //     $("#M_chooseMode6").click(function () {

    //         if ($(this).text() == "上傳照片") {
    //             $(this).text("取消上傳");
    //             $("#M_download").show();
    //             $("#M_Modeldownload").hide();
    //         }
    //         else {
    //             $(this).text("上傳照片");
    //             $("#M_download").hide();
    //             $("#M_Modeldownload").show();
    //         }

    //         $("#M_bigModel").toggle();
    //         $(".M_imggrop").toggle();
    //     })
    // })

    //2.點擊上傳檔案function
    var M_uploadimg = document.querySelector("#M_uploadimg");

    //點上傳照片 = 點擊連結input file btn
    $('#M_customBtn').click(function () {
        M_uploadimg.click();
    })

    //draw begin
    const myFile = document.querySelector('#M_uploadimg');
    const canvas = document.querySelector('#painter');
    const ctx = canvas.getContext('2d');

    myFile.addEventListener('change', function (e) {
        const file = e.target.files[0]
        // 宣告一個新圖片
        let img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = function () {
            // 設定 canvas 寬高等同圖片
            // canvas.width = img.width
            // canvas.height = img.height
            // img.width = canvas.width
            // img.height = canvas.height
            // 設定繪製的圖片寬高
            ctx.clearRect(0, 0, 700, 700);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
    })

    ctx.strokeStyle = '#9d3333';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 6;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    // let hue = 100;  // 0;
    let direction = true;

    let picker = document.querySelectorAll('.M_pcColor');
    picker.forEach(function (item, index, array) {
        item.addEventListener('click', function () {
            let M_style = window.getComputedStyle(item, null).getPropertyValue('background-color');
            varM_Color = M_style;
        })
    });

    function draw(e) {
        if (!isDrawing) return;
        console.log(e)
        ctx.strokeStyle = varM_Color;
        // ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    $('.M_pcnone').click(function (e) {
        e.stopPropagation;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    })

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
    // draw end




    //下載Model圖
    // var Mimg = document.querySelector('.M_mimg');

    // $("#M_Modeldownload").click(function () {
    //     var imagePath = Mimg.getAttribute('src');
    //     var fileModelName = getModelFileName(imagePath);

    //     saveAs(imagePath, fileModelName);
    // });

    // function getModelFileName(str) {
    //     return str.substring(str.lastIndexOf('-') + 1);
    // }






});


