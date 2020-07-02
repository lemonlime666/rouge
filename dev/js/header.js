// header
$(document).ready(function () {

    //漢堡選單
    $('#ham').click(function () {
        $(this).toggleClass('open');
        if ($('#menu').css('left') == `${0}px`) {
            $('#menu').animate({
                left: `${-100}%`,
            }, 250)
            $('#menu').fadeOut(250);
        } else {
            $('#menu').css({
                display: 'flex',
            });
            $('#menu').animate({
                left: 0,
            }, 500)
        }
    });

    //側邊選單位置
    function sideNavPlace() {
        let sideNav = $('#sidenav').clone(true);
        let winWidth = window.innerWidth;
        if (winWidth <= 996) {
            $('#menu .menuMid').append(sideNav);
            sideNav.removeClass('inCorner');
            sideNav.addClass('inMenu');
        }
    }
    sideNavPlace();

    window.addEventListener('resize', () => {
        let winWidth = window.innerWidth;
        let resizeTimer = setTimeout(() => {
            if ($('#menu .menuMid #sidenav') && winWidth > 996) {
                $('#menu .menuMid #sidenav').remove();
            } else if ($('#menu .menuMid #sidenav') && winWidth <= 996) {
                sideNavPlace();
            }
        }, 100);
    })

    window.addEventListener('resize', () => {
        let winWidth = window.innerWidth;
        console.log(winWidth);
    })
    //header

    //Login
    //==============================================

    var member = {};
    //確認是要登入還登出
    $('#LoginSignup').click(function () {
        if (this.innerHTML == "LOGIN") {
            $('#login').show();
        } else if (this.innerHTML == "LOGOUT") {

            let xhr = new XMLHttpRequest(); //使用Ajax回server端做登出
            xhr.onload = function () {
                if (xhr.status == 200) { //success
                    $('#LoginSignup').html('LOGIN');
                }
            }
            xhr.open("get", "./php/logout.php", true);
            xhr.send(null);
        }
    });

    //========================================================

    //按背景取消登入
    $('.loginBack').click(function (e) {
        e.stopPropagation;
        $('#login').hide();
    });

    //=============================================================

    //一開始就先看看有沒有登入資料
    function getMemberInfo() {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                member = JSON.parse(xhr.responseText);
                if (member.mail) { //已登入
                    $('#LoginSignup').html('LOGOUT');
                    console.log(member.name);
                }
            }
        }
        xhr.open("get", "./php/getMemberInfo.php", true);
        xhr.send(null);
    }
    getMemberInfo();

    //=============================================================

});



//login_Vue
Vue.component('loginBox', {
    props: [],
    data() {
        return {

        };
    },
    methods: {
        login(e) {
            e.preventDefault();
            //AJAX傳送資料到PHP
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    member = JSON.parse(xhr.responseText);
                    if (member.mail) { //登入成功
                        $('#LoginSignup').html('LOGOUT');
                    } else {
                        alert("帳密錯誤");
                    }
                } else {
                    alert("系統錯誤");
                }
            }
            xhr.open("post", "./php/login.php", true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    
            //將資料放入物件中
            let loginInfo = {
                memMail: document.getElementById('mail').value,
                memPsw: document.getElementById('psw').value
            };
    
            let str = JSON.stringify(loginInfo); //loginInfo轉成JSON格式字串
            let data = `loginInfo=${str}`; //將JSON格式字串儲存進陣列中
            xhr.send(data); //傳遞JSON至PHP
    
            //將登入表單上的資料清空，並隱藏起來
            $('#login').hide();
            document.getElementById('mail').value = '';
            document.getElementById('psw').value = '';
        }
    },
    template: `
            <form class="loginForm logdiv" method="post">
                <label for="mail">
                    <span>EMAIL</span>
                    <input type="email" name="mail" id="mail">
                </label>
                <label for="psw">
                    <span>PASSWORD</span>
                    <input type="password" name="psw" id="psw">
                </label>
                <input type="submit" value="LOGIN" id="loginSubmit" @click="login">
            </form>
    `,
})

Vue.component('signUpBox', {
    props: [],
    data() {
        return {

        };
    },
    methods: {
        signup(e) {
            e.preventDefault();
            //AJAX傳送資料到PHP
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    member = JSON.parse(xhr.responseText);
                    if (member.mail) { //登入成功
                        $('#LoginSignup').html('LOGOUT');
                        alert("註冊成功");
                    } else {
                        alert("此信箱已被註冊");
                    }
                } else {
                    alert(xhr.responseText);
                }
            }
            xhr.open("post", "./php/signup.php", true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            //將資料放入物件中
            let signUpInfo = {
                memName: document.getElementById('s_name').value,
                memMail: document.getElementById('s_mail').value,
                memPsw: document.getElementById('s_psw').value
            };

            let str = JSON.stringify(signUpInfo); //signUpInfo轉成JSON格式字串
            let data = `signUpInfo=${str}`; //將JSON格式字串儲存進陣列中
            xhr.send(data); //傳遞JSON至PHP

            //將登入表單上的資料清空，並隱藏起來
            $('#login').hide();
            document.getElementById('s_mail').value = '';
            document.getElementById('s_psw').value = '';
            document.getElementById('s_name').value = '';
            document.getElementById('pswCheck').value = '';
        }
    },
    template: `
            <form class="signForm logdiv" method="post">
                <label for="name">
                    <span>NAME</span>
                    <input type="text" name="name" id="s_name">
                </label>
                <label for="mail">
                    <span>EMAIL</span>
                    <input type="email" name="mail" id="s_mail">
                </label>
                <label for="psw">
                    <span>PASSWORD</span>
                    <input type="password" name="psw" id="s_psw">
                </label>
                <label for="pswCheck">
                    <span>PASSWORD CHECK</span>
                    <input type="password" id="pswCheck">
                </label>
                <input type="submit" value="SIGNUP" id="signUpSubmit" @click="signup">
            </form>
    `,
})

new Vue({
    el: "#login",
    data: {
        title: 'LOGIN',
        subTitle: '< SIGNUP',
        content: 'loginBox',
    },
    methods: {
        //登入或註冊表單切換
        changeForm(e) {
            if (this.content == 'loginBox') {
                e.target.parentElement.style.backgroundColor = "#100026";
                this.title = 'SIGNUP';
                this.subTitle = 'LOGIN >';
                this.content = 'signUpBox';
            } else if (this.content == 'signUpBox') {
                e.target.parentElement.style.backgroundColor = "#01041B";
                this.title = 'LOGIN';
                this.subTitle = '< SIGNUP';
                this.content = 'loginBox';
            }
        },
    },
    mounted() {

    },
});