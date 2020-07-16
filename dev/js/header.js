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
    //header

    //==============================================

    //Login

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
            xhr.open("get", "./php/logout.php", false);
            xhr.send(null);
            document.location.reload();
        }

        if($('#menu').css('left') == `${0}px`){
            $('#ham').removeClass('open');
            $('#menu').animate({
                left: `${-100}%`,
            }, 250)
            $('#menu').fadeOut(250);
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
                }
            }
        }
        xhr.open("get", "./php/getMemberInfo.php", true);
        xhr.send(null);
    }
    getMemberInfo();

    //=============================================================

    //前往會員頁面

    $('#memPage').click(function(){
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                member = JSON.parse(xhr.responseText);
                if (member.mail) { //已登入
                    document.location.href = "./memPage.html"
                }else{
                    alert('請先登入會員');
                    document.getElementById('login').style.display = "flex";
                }
            }
        }
        xhr.open("get", "./php/getMemberInfo.php", true);
        xhr.send(null);
    });

    //=============================================================

    //側邊選單位置RWD

    function sideNavPlace() {
        let sideNav = $('#sidenav').clone(true);
        let winWidth = window.innerWidth;
        if (winWidth <= 1024) {
            $('#menu .menuMid').append(sideNav);
            sideNav.removeClass('inCorner');
            sideNav.addClass('inMenu');
        }
    }
    sideNavPlace();

    window.addEventListener('resize', () => {
        let winWidth = window.innerWidth;
        let resizeTimer = setTimeout(() => {
            if ($('#menu .menuMid #sidenav') && winWidth > 1024) {
                $('#menu .menuMid #sidenav').remove();
            } else if ($('#menu .menuMid #sidenav') && winWidth <= 1024) {
                sideNavPlace();
            }
        }, 100);
    })

    window.addEventListener('resize', () => {
        let winWidth = window.innerWidth;
        console.log(winWidth);
    })
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
                        alert('登入成功');
                        $('#login').hide();
                        $('#LoginSignup').html('LOGOUT');
                        document.location.reload();
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
        passcheck(e) {
            e.preventDefault();
            let name = document.getElementById('s_name');
            let mail = document.getElementById('s_mail');
            let pass = document.getElementById('s_psw');
            let check = document.getElementById('pswCheck');
            let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
            if (pass.value != check.value || pass.value == "" || check.value == "") {
                alert('請再次確認密碼');
                pass.value = "";
                check.value = "";
            } else if (name.value == "") {
                alert('請再次確認姓名');
            } else if (mail.value == "" || mail.value.search(emailRule) == -1) {
                alert('請再次確認電子信箱');
            } else {
                this.$options.methods.signup(e);
            }
        },
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
                        document.location.reload();
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

        },
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
                <input type="submit" value="SIGNUP" id="signUpSubmit" @click="passcheck">
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

//---------------購物車數量計算----------------

//初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log(window.localStorage.shoppingcart)
    let cart = JSON.parse(window.localStorage.shoppingcart)
    let total = 0;
      for(let i=0; i< cart.length; i++){       
          total += cart[i].comNum 
      }
      console.log('物件總數:', total)
      let shoppingcart = document.getElementById('shoppingcart')
      shoppingcart.innerText ="CART("+total+")";
})


//監測物件變化



Object.defineProperty(window.localStorage, 'shoppingcart', {
    get: function () {
        // localStorage.getItem('shoppingcart')
    //   return test;
      return localStorage.getItem('shoppingcart')
    },
    set: function (newValue) {
      // console.log('透過物件變更')
      localStorage.setItem('shoppingcart', newValue)
      //需要觸發的渲染函式可以寫在這...
      let cart = JSON.parse(newValue)
      console.log(cart)
      let total = 0;
      for(let i=0; i< cart.length; i++){       
          total += cart[i].comNum 
      }
      console.log('物件總數:', total)
      let shoppingcart = document.getElementById('shoppingcart')
      shoppingcart.innerText ="CART("+total+")";
      
    }
  })

  // 重寫事件
  const oldSetItem = window.localStorage.setItem
  window.localStorage.setItem = function (key, newValue) {
    var setItemEvent = new Event("setItemEvent")
    setItemEvent.key = 'shoppingcart'
    setItemEvent.newValue = newValue
    window.dispatchEvent(setItemEvent)
    oldSetItem.apply(this, arguments)
  }
  // 添加監聽
  window.addEventListener("setItemEvent", function (e) {
    // console.log('透過函數變更')
    //需要觸發的渲染函式可以寫在這...
    let cart = JSON.parse(e.newValue)
      let total = 0;
      for(let i=0; i< cart.length; i++){       
          total += cart[i].comNum 
      }
      console.log('函數總數:', total)
      let shoppingcart = document.getElementById('shoppingcart')
      shoppingcart.innerText ="CART("+total+")";
    
    
  },false)
//   window.addEventListener('load',function() {
//     console.log(localStorage.getItem('shoppingcart'))
//   })

  