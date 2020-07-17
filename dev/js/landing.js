window.addEventListener('load', function () {

    //動態抓取資料圖片
    $.ajax({
        type: "get",
        url: "./php/indexAd.php",
        dataType: "json",
        success(data) {
            for (i = 0; i < data.length; i++) {
                let div = document.createElement('div');
                div.classList.add("swiperimgContent");
                let ahref = document.createElement('a');
                let adimg = document.createElement('img');
                adimg.classList.add('swiperimg');
                adimg.setAttribute('src', `${data[i].AD_IMGURL}`);
                adimg.setAttribute('data-class', `${data[i].PRO_CLASS}`);
                adimg.setAttribute('data-series', `${data[i].SER_NO}`);
                adimg.setAttribute('data-adno', `${data[i].AD_NO}`);
                ahref.appendChild(adimg);
                div.appendChild(ahref);
                document.querySelector('.swiperimgBox').appendChild(div);
            }
            createPagination();
            linkToShop();
        },
        error(xhr) {
            console.log(xhr.responseText);
        }
    })

    //跳轉商品頁面，系列編號setLocal，在執行跳轉
    function linkToShop(){
        let adimg = document.querySelectorAll('.swiperimg');
        for(let i=0; i<adimg.length; i++){
            adimg[i].addEventListener('click', function(e){
                if(e.target.dataset.class == 0){
                    // alert('口紅商品頁');
                    localStorage.setItem('lipsname', e.target.dataset.series);
                    addClick(e.target.dataset.adno);
                    document.location.href = "./product.html"; //這邊改成口紅商品頁面連結
                }else if (e.target.dataset.class == 1){
                    // alert('保養品商品頁');
                    localStorage.setItem('carename', e.target.dataset.series);
                    addClick(e.target.dataset.adno);
                    document.location.href = "./product1.html"; //這邊改成保養品商品頁面連結
                } 
            })
        }
    }

    function addClick(adno){
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200) {
                console.log('okok');
            }else{
                alert(xhr.status);
            }
        }
        xhr.open("post", "./php/landAdClick.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(`adno=${adno}`);
        // ALTER TABLE ADSCHEDULE add CLICK int NOT null DEFAULT 0
    }

    //for swiper
    function createPagination() {
        let a = document.querySelector('.swiperimgBox');
        let swiperImg = document.getElementsByClassName('swiperimg');
        let swiperPageBox = document.getElementById('swiperPage');

        //動態新增pagination
        for (i = 0; i < swiperImg.length; i++) {
            let swiperPage = document.createElement('button');
            swiperPage.className = 'swiperPageCount';
            swiperPage.innerText = i + 1;
            swiperPage.dataset.page = i + 1;
            swiperPageBox.appendChild(swiperPage);
            $('.swiperPageCount:nth-child(1)').addClass('activeAdvert');
            $(`.swiperPageCount:nth-child(${i+1})`).addClass('mfont');
        }
        swipe();
    }

    //changeSwiper
    function swipe() {
        //var counter
        var counter = 1;

        //prev next swipe
        $('.innerBtn:nth-child(1)').click(function () {
            if (counter > 1) {
                $('.swiperimgContent:nth-child(1)').animate({
                    marginLeft: `${(2-counter)*100}%`,
                })
                clearInterval(autoSwipe);
                counter--;
                autoSwipe = setInterval(autoSwipeCount, 6000);
            }
            $(this).toggleClass('activeAdvert');
            setTimeout(function () {
                $('.innerBtn:nth-child(1)').toggleClass('activeAdvert');
            }, 800);

            $(`#swiperPage button`).removeClass('activeAdvert');
            $(`.swiperPageCount:nth-child(${counter})`).addClass('activeAdvert');
        });

        $('.innerBtn:nth-child(2)').click(function () {
            if (counter < $('.swiperimgContent').length) {
                $('.swiperimgContent:nth-child(1)').animate({
                    marginLeft: `${(counter)*-100}%`,
                })
                clearInterval(autoSwipe);
                counter++;
                autoSwipe = setInterval(autoSwipeCount, 6000);
            }
            $(this).toggleClass('activeAdvert');
            setTimeout(function () {
                $('.innerBtn:nth-child(2)').toggleClass('activeAdvert');
            }, 800);
            $(`#swiperPage button`).removeClass('activeAdvert');
            $(`.swiperPageCount:nth-child(${counter})`).addClass('activeAdvert');
        });

        //pagination swipe
        $('#swiperPage button').click(function (e) {
            let i = e.target.dataset.page;
            $('.swiperimgContent:nth-child(1)').animate({
                marginLeft: `${(i-1)*-100}%`,
            });
            $(`#swiperPage button`).removeClass('activeAdvert');
            $(this).addClass('activeAdvert');
            counter = i;
            clearInterval(autoSwipe);
            autoSwipe = setInterval(autoSwipeCount, 6000);
        })

        //autoSwipe
        let direction = 0;
        let autoSwipe = setInterval(autoSwipeCount, 6000);

        function autoSwipeCount() {
            if (direction == 0) { //正走
                if (counter < $('.swiperimgContent').length) {
                    $('.swiperimgContent:nth-child(1)').animate({
                        marginLeft: `${(counter)*-100}%`,
                    });
                    counter++;
                    // console.log('1');
                } else if (counter == $('.swiperimgContent').length) {
                    $('.swiperimgContent:nth-child(1)').animate({
                        marginLeft: `${(2-counter)*100}%`,
                    });
                    direction += 1;
                    counter--;
                    // console.log('2');
                }

            } else if (direction == 1) { //逆走
                if (counter > 1) {
                    $('.swiperimgContent:nth-child(1)').animate({
                        marginLeft: `${(2-counter)*100}%`,
                    });
                    counter--;
                    // console.log('3');
                } else if (counter == 1) {
                    $('.swiperimgContent:nth-child(1)').animate({
                        marginLeft: `${(counter)*-100}%`,
                    });
                    counter++;
                    direction -= 1;
                    // console.log('4');
                }
            }

            $(`#swiperPage button`).removeClass('activeAdvert');
            $(`.swiperPageCount:nth-child(${counter})`).addClass('activeAdvert');
        }
    }

    //pg3changBack
    function pg3Change() {
        for (i = 1; i <= $('.pg3BtnBox span').length; i++) {
            $(`.pg3BtnBox span:nth-child(${i})`).click(changeConfirm(i));
        }
    }
    pg3Change();

    function changeConfirm(i) {
        return function () {
            $('.pg3BtnBox span').removeClass('itemCheck');
            $(`.pg3BtnBox span:nth-child(${i})`).toggleClass('itemCheck');

            if (i == 1) {
                $('.sec3back ').css({
                    backgroundColor: 'rgba(141, 0, 21, 0.75)',
                });
                $('.pg3ImgBox:nth-child(1) img').attr('src', './image/pg3img2.jpg');
                $('.pg3ImgBox:nth-child(2) img').attr('src', './image/pg3img1.jpg');
                $('.femiModel img').attr('src', 'image/model1.png');
                $('.pg3ItemTitle div img').attr('src', 'image/lip1.png');
                $('.itemClass').text('鑽石閃耀水潤光感潤色唇膏');
                $('#pg3BackText1').text('SHEER');
                $('#pg3BackText2').text('LIPSTICKS');
                $('.pg3ItemTitle p').text('水潤光感系列');
            } else if (i == 2) {
                $('.sec3back ').css({
                    backgroundColor: 'rgba(44, 51, 66, .75)',
                });
                $('.pg3ImgBox:nth-child(1) img').attr('src', './image/pg3img9.jpg');
                $('.pg3ImgBox:nth-child(2) img').attr('src', './image/pg3img4.jpg');
                $('.femiModel img').attr('src', 'image/model4.png');
                $('.pg3ItemTitle div img').attr('src', 'image/lip2.png');
                $('.itemClass').text('絕對完美迷霧絲絨霧感唇膏');
                $('#pg3BackText1').text('MATTE');
                $('#pg3BackText2').text('LIPSTICKS');
                $('.pg3ItemTitle p').text('絲絨霧感系列');
            } else if (i == 3) {
                $('.sec3back ').css({
                    backgroundColor: 'rgba(153, 130, 94, .75)',
                });
                $('.pg3ImgBox:nth-child(1) img').attr('src', './image/pg3img6.jpg');
                $('.pg3ImgBox:nth-child(2) img').attr('src', './image/pg3img5.jpg');
                $('.femiModel img').attr('src', 'image/model3.png');
                $('.pg3ItemTitle div img').attr('src', 'image/lip3.png');
                $('.itemClass').text('絕對完美奢華光潤霜感唇膏');
                $('#pg3BackText1').text('CREAM');
                $('#pg3BackText2').text('LIPSTICKS');
                $('.pg3ItemTitle p').text('奢華霜感系列');
            } else if (i == 4) {
                $('.sec3back ').css({
                    backgroundColor: 'rgba(113,133,189,.6)',
                });
                $('.pg3ImgBox:nth-child(1) img').attr('src', './image/pg3img7.jpg');
                $('.pg3ImgBox:nth-child(2) img').attr('src', './image/pg3img8.jpg');
                $('.femiModel img').attr('src', 'image/model2.png');
                $('.pg3ItemTitle div img').attr('src', 'image/lip4.png');
                $('.itemClass').text('鑽石閃耀水蜜修護光潤唇膏');
                $('#pg3BackText1').text('SHEER');
                $('#pg3BackText2').text('LIPGLOSS');
                $('.pg3ItemTitle p').text('水感修護系列');
            }
        }
    }

    //pg4Change1
    function pg4Change() {
        for (i = 1; i <= $('.pg4ColorBox1 span').length; i++) {
            $(`.pg4ColorBox1 span:nth-child(${i})`).click(pg4ChangeContent1(i));
        }
        for (i = 1; i <= $('.pg4ColorBox2 span').length; i++) {
            $(`.pg4ColorBox2 span:nth-child(${i})`).click(pg4ChangeContent2(i));
        }
    }
    pg4Change();

    function pg4ChangeContent1(i) {
        return function () {
            $('.pg4ColorBox1 span').removeClass('stickClick');
            $('.pg4ColorBox2 span').removeClass('stickClick');
            $(`.pg4ColorBox1 span:nth-child(${i})`).toggleClass('stickClick');

            if (i == 1) {
                $('.pg4LeftOutsdie img').attr('src', 'image/lipModel1.png');
                $('.pg4colorGuide img').attr('src', 'image/stick01.png');
            } else if (i == 2) {
                $('.pg4LeftOutsdie img').attr('src', 'image/lipModel2.png');
                $('.pg4colorGuide img').attr('src', 'image/stick02.png');
            } else if (i == 3) {
                $('.pg4LeftOutsdie img').attr('src', 'image/lipModel3.png');
                $('.pg4colorGuide img').attr('src', 'image/stick03.png');
            } else if (i == 4) {
                $('.pg4LeftOutsdie img').attr('src', 'image/lipModel4.png');
                $('.pg4colorGuide img').attr('src', 'image/stick04.png');
            }
        }
    }

    //pg4Change2
    function pg4ChangeContent2(i) {
        return function () {
            $('.pg4ColorBox1 span').removeClass('stickClick');
            $('.pg4ColorBox2 span').removeClass('stickClick');
            $(`.pg4ColorBox2 span:nth-child(${i})`).toggleClass('stickClick');

            if (i == 1) {
                $('.pg4LeftOutsdie img').attr('src', 'image/lipModel1.png');
                $('.pg4colorGuide img').attr('src', 'image/stick05.png');
            } else if (i == 2) {
                $('.pg4LeftOutsdie img').attr('src', 'image/lipModel2.png');
                $('.pg4colorGuide img').attr('src', 'image/stick06.png');
            } else if (i == 3) {
                $('.pg4LeftOutsdie img').attr('src', 'image/lipModel3.png');
                $('.pg4colorGuide img').attr('src', 'image/stick07.png');
            } else if (i == 4) {
                $('.pg4LeftOutsdie img').attr('src', 'image/lipModel4.png');
                $('.pg4colorGuide img').attr('src', 'image/stick08.png');
            }
        }
    }

    //pg5
    function forBook() {
        let bookPage = 1;

        $('.bookFront1').click(function (e) {
            e.preventDefault;
            $('.bookRight').css({
                transform: 'rotateY(-180deg)',
            })
            bookPage++;
            $('#bookPage').text(bookPage);
        })
        $('.bookBack1').click(function (e) {
            e.preventDefault;
            $('.bookRight').css({
                transform: 'rotateY(0deg)',
            })
            bookPage--;
            $('#bookPage').text(bookPage);
        })
        $('#bookPrev').click(function () {
            if (bookPage > 1) {
                $('.bookRight').css({
                    transform: 'rotateY(0deg)',
                })
                bookPage--;
                $('#bookPage').text(bookPage);
            }
        })
        $('#bookNext').click(function () {
            if (bookPage < $('.bookPage').length - 1) {
                $('.bookRight').css({
                    transform: 'rotateY(-180deg)',
                })
                bookPage++;
                $('#bookPage').text(bookPage);
            }
        })
    }
    forBook();

    //canvas draw
    function draw() {
        const canvas = document.getElementById("c");
        const ctx = canvas.getContext("2d");

        // var
        let painting = false;
        var varColor = "transparent";

        //forEach getColor();
        let picker = document.querySelectorAll('.colorPicker');
        picker.forEach(function (item, index, array) {
            item.addEventListener('click', function () {
                let style = window.getComputedStyle(item, null).getPropertyValue('color');
                varColor = style;
                $('#c').css({
                    cursor: 'pointer',
                })
            })
        });


        function startPosition(e) {
            painting = true;
            draw(e);
        }

        function endPosition() {
            painting = false;
            ctx.beginPath();
        }

        function draw(e) {
            if (!painting) return;
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            ctx.strokeStyle = varColor;

            var rect = canvas.getBoundingClientRect();
            var scaleX = canvas.width / rect.width;
            var scaleY = canvas.height / rect.height;

            ctx.lineTo((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
        }

        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', endPosition);
        canvas.addEventListener('mousemove', draw);

        $('.clearRect').click(function (e) {
            e.stopPropagation;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        })
    }
    draw();

    document.querySelector('.pg7CardBtn').addEventListener('click', function(){
        let xhr = new XMLHttpRequest;
        xhr.onload = function(){
            if(xhr.status == 200){

                if(xhr.responseText == 0){
                    alert('請先製作您的試妝圖片～');
                    document.location.href = "./makeUpPage.php";
                }else if(xhr.responseText == 1){
                    alert('請先登入會員');
                }
            }else{
                alert(xhr.status);
            }
        }
        xhr.open("get", "./php/linkToCard.php", true);
        xhr.send(null);
    })

    //lazyload
    function lazy() {
        setTimeout(function () {
            $('.pg2').css({
                display: 'table-cell',
            })
        }, 500)
        setTimeout(function () {
            $('.pg3').css({
                display: 'table-cell',
            })
        }, 2000)
        setTimeout(function () {
            $('.pg4').css({
                display: 'inline-table',
            })
        }, 4000)
        setTimeout(function () {
            $('.pg5').css({
                display: 'inline-table',
            })
        }, 6000)
        setTimeout(function () {
            $('.pg7').css({
                display: 'inline-table',
            })
        }, 8000)
    }
    lazy();

});