window.addEventListener('load', function () {

    //for swiper
    let swiperImg = document.getElementsByClassName('swiperimg');
    let swiperPageBox = document.getElementById('swiperPage');

    //動態新增pagination
    for (i = 0; i < swiperImg.length; i++) {
        let swiperPage = document.createElement('button');
        swiperPage.className = 'swiperPageCount';
        $('.swiperPageCount:nth-child(1)').addClass('activeAdvert');
        swiperPage.innerText = i + 1;
        swiperPageBox.appendChild(swiperPage);
    }

    //changeSwiper
    function swipe() {
        //var counter
        var counter = 1;

        //prev next swipe
        $('.innerBtn:nth-child(1)').click(function () {
            // clearInterval(autoSwipe);
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
            // clearInterval(autoSwipe);
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
        let autoSwipe = setInterval(autoSwipeCount,5000);
        function autoSwipeCount(){
            if (direction == 0) { //正走
                if (counter < $('.swiperimgContent').length) {
                    $('.swiperimgContent:nth-child(1)').animate({
                        marginLeft: `${(counter)*-100}%`,
                    });
                    counter++;
                    console.log('1');
                } else if (counter == $('.swiperimgContent').length) {
                    $('.swiperimgContent:nth-child(1)').animate({
                        marginLeft: `${(2-counter)*100}%`,
                    });
                    direction += 1;
                    counter--;
                    console.log('2');
                }

            } else if (direction == 1) { //逆走
                if (counter > 1) {
                    $('.swiperimgContent:nth-child(1)').animate({
                        marginLeft: `${(2-counter)*100}%`,
                    });
                    counter--;
                    console.log('3');
                } else if (counter == 1) {
                    $('.swiperimgContent:nth-child(1)').animate({
                        marginLeft: `${(counter)*-100}%`,
                    });
                    counter++;
                    direction -= 1;
                    console.log('4');
                }
            }

            $(`#swiperPage button`).removeClass('activeAdvert');
            $(`.swiperPageCount:nth-child(${counter})`).addClass('activeAdvert');
        }
        
    }
    swipe();

});