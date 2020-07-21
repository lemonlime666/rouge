

$(document).ready(function () {

    name(localStorage.getItem('lipsname') || 1);

    let panelBtn = document.querySelectorAll('.M_control');
    for (let i = 0; i < panelBtn.length; i++) {
        panelBtn[i].addEventListener('click', function () {
            name(i + 1);
        });
    }


    const SetItem = window.localStorage.setItem;
    window.localStorage.setItem = function (key, newValue) {
        var setItemCart = new Event("setItemCart");  //給新標籤 搭配dispatchEvent() 
        setItemCart.key = key;
        setItemCart.newValue = newValue;
        window.dispatchEvent(setItemCart);  //觸發執行添加監聽事件
        SetItem.apply(this, arguments);   //原有的localStorage
    };

    const tempStore = Object; //建立空物件
    Object.defineProperty(tempStore, 'lipInfo', {
        get() {
            return this.value; //拿到tempStore.Info的樣子
        },
        set(arr) {
            this.value = arr; //設定tempStore.Info的樣子
        }
    })



    var addIntoCart = document.getElementById('goBack');
    let c = document.querySelectorAll('.M_pcColor');

    window.addEventListener("setItemCart", function (e) {
        // console.log(e.key);
        // let arr = JSON.parse(localStorage.getItem('shoppingcart')) || []; //取得購物車裡的東西 如果沒有就是空陣列
        let num = (localStorage.getItem('shoppingcart')) || []; 

        for (i = 0; i < num.length; i++) {
            if(num[i].comNo == num[i].comNo){
                num[i].comNum++;
            }
        }


    })

    for (let i = 0; i < c.length; i++) {
        c[i].addEventListener("click", function (e) {
            let bb = e.target.dataset.pronumber;
            let cc = e.target.dataset.images;
            let dd = e.target.dataset.proname;
            let ee = e.target.dataset.proprice;

            let obj = [{
                comNo: bb,
                comName: dd,
                comImg: cc,
                comNum: 1,
                comPrice: ee
            }]
            tempStore.lipInfo = obj;
            console.log(tempStore.lipInfo);
        })
    }
    addIntoCart.addEventListener('click', function () {
        console.log(tempStore.lipInfo);
        localStorage.setItem('shoppingcart', JSON.stringify(tempStore.lipInfo));

    })




    // addIntoCart.addEventListener('click', function (e) {
    //     let num = JSON.stringify(proArr); //點擊到的系列編號
    //     alert(num);
    // for (i = 0; i < arr.length; i++) {
    //     if (arr[i].cumNo == num) {
    //         // console.log(arr)
    //         if (parseInt(arr[i].cumNum) == 9) {
    //             alert('購買數量已達限制')
    //         } else {
    //             parseInt(arr[i].cumNum)++;
    //             var obj = arr;
    //             arr = [];
    //         }
    //     } else {
    //         // console.log(num)
    //         var obj = {
    //             comNO: num,
    //         }
    //     }
    // }

    // arr.push(obj);
    // localStorage.setItem('shoppingcart', JSON.stringify(arr));
    // console.log(localStorage.getItem('shoppingcart', JSON.stringify(arr)));
    // })

    // btn(加入購物車).addEventListener('click', function (e) {
    //     let num = e.target.dataset.商品編號
    //     for (i = 0; i < arr.length; i++) { //跑原本購物車裡的商品數量
    //         if (arr[i].cumNo == num) { //比對購物車裡面有沒有相同的商品
    //             if (parseInt(arr[i].cumNum) == 9) { //有可能是字串所以要先換成數字
    //                 alert('商品以達到數量限制') //判斷數量使否已經達到9
    //             } else {
    //                 parseInt(arr[i].cumNum)++; //數量沒達到限制就加一
    //                 var obj = arr;
    //                 arr = [];
    //             }
    //         }else{ //如果沒有相同就推進陣列
    //             var obj = {
    //                 //你要推進去的資料
    //                 // ex: 
    //                 comNO : e.target.dataset.商品編號,
    //             }
    //         }
    //     }
    //     arr.push(obj);
    //     localStorage.setItem('shoppingcart', JSON.stringify(arr));
    // })

    // for (i = 0; i < c.length; i++) {
    //     c[i].addEventListener("click", function (e) {
    //         //抓取前端data-set放入localstorage陣列中
    //         proArr = [{
    //             comNo: '',
    //             comName: '',
    //             comImg: '',
    //             comNum:'',
    //             comPrice:''
    //         }]
    //         proArr.comNo = e.target.dataset.pronumber;
    //         proArr.comImg = e.target.dataset.images;
    //         proArr.comName = e.target.dataset.proname;
    //         proArr.comNum = 1;  //試妝頁面限制購買數量1
    //         proArr.comPrice = e.target.dataset.proprice;
    //         // console.log(proArr);

    //         // localStorage.setItem('lipscolor', e.target.dataset.color);
    //         // localStorage.setItem('comNo', e.target.dataset.pronumber);
    //         // localStorage.setItem('comImg', e.target.dataset.images);
    //         // localStorage.setItem('comName', e.target.dataset.proname);
    //         // localStorage.setItem('comPrice', e.target.dataset.proprice);

    //     })
    // }

    //返回前頁start
    // var switchPage = document.getElementById('goBack');

    // switchPage.addEventListener('click', function () {
    //     window.history.go(-1);
    // })
    //返回前頁end



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
    let hue = 100;  // 0;
    let direction = true;

    let picker = document.querySelectorAll('.M_pcColor');
    picker.forEach(function (item, index, array) {
        item.addEventListener('click', function () {
            let M_style = window.getComputedStyle(item, null).getPropertyValue('background-color');
            varM_Color = M_style;
        })
    });

    $('.M_pcnone').click(function (e) {
        e.stopPropagation;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    })

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
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
    // draw end

    // $(window).resize(function() {
    //     var screen=$(window).width();
    // })        

    let screen = document.body.clientWidth;
    if (screen < 768) {
        // alert(screen)
        document.getElementById('painter').style.width = "315px";
        document.getElementById('painter').style.height = "350px";
    } else {
        document.getElementById('painter').style.width = "500px";
        document.getElementById('painter').style.height = "580px";
    }
    // if(screen<768){
    //     // alert(screen)
    //     document.querySelector('.computer').style.display="hidden";
    //     document.querySelector('.phone').style.display="block";
    // }else{
    //     document.querySelector('.computer').style.display="block";
    //     document.querySelector('.phone').style.display="hidden";
    // }





});




function name(aaa) {
    // let aaa = localStorage.getItem('lipsname') || 1;

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            console.log(data.SER_NAME);
            document.querySelector('.M_title').innerHTML = data.SER_NAME;
            document.querySelector('.M_productImg').setAttribute("src", data.SER_IMGURL);
            document.querySelector('.M_detail').innerHTML = data.SER_TEXT;
        } else {
            alert('失敗')
        }
    }
    xhr.open('post', './php/makeUp_getinfo.php', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

    xhr.send(`no=${aaa}`);
    localStorage.setItem('lipsname', aaa);
}

