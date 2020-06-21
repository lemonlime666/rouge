window.addEventListener('load', function () {

    //for swiper
    let swiperImg = document.getElementsByClassName('swiperimg');
    let swiperPageBox = document.getElementById('swiperPage');

    //動態新增pagination
    for (i = 0; i < swiperImg.length; i++) {
        let swiperPage = document.createElement('button');
        swiperPage.className = 'swiperPageCount';
        swiperPage.innerText = i + 1;
        swiperPageBox.appendChild(swiperPage);
        $('.swiperPageCount:nth-child(1)').addClass('activeAdvert');
        $(`.swiperPageCount:nth-child(${i+1})`).addClass('mfont');
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
                counter--;
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
                counter++;
            }
            $(this).toggleClass('activeAdvert');
            setTimeout(function () {
                $('.innerBtn:nth-child(2)').toggleClass('activeAdvert');
            }, 800);
            $(`#swiperPage button`).removeClass('activeAdvert');
            $(`.swiperPageCount:nth-child(${counter})`).addClass('activeAdvert');
        });

        //pagination swipe
        for (i = 1; i <= $('.swiperPageCount').length; i++) {
            $(`.swiperPageCount:nth-child(${i})`).click(swipeChange(i));

        }

        function swipeChange(i) {
            return function () {
                $('.swiperimgContent:nth-child(1)').animate({
                    marginLeft: `${(i-1)*-100}%`,
                });
                $(`#swiperPage button`).removeClass('activeAdvert');
                $(`.swiperPageCount:nth-child(${i})`).addClass('activeAdvert');
                counter = i;
            }
        }

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
    swipe();

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
    function pg4Change1() {
        for (i = 1; i <= $('.pg4ColorBox1 span').length; i++) {
            $(`.pg4ColorBox1 span:nth-child(${i})`).click(pg4ChangeContent1(i));
        }
    }
    pg4Change1();

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
    function pg4Change2() {
        for (i = 1; i <= $('.pg4ColorBox2 span').length; i++) {
            $(`.pg4ColorBox2 span:nth-child(${i})`).click(pg4ChangeContent2(i));
        }
    }
    pg4Change2();

    function pg4ChangeContent2(i) {
        return function () {
            $('.pg4ColorBox1 span').removeClass('stickClick');
            $('.pg4ColorBox2 span').removeClass('stickClick');
            $(`.pg4ColorBox2 span:nth-child(${i})`).toggleClass('stickClick');

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
});