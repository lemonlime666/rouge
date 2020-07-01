// header
$(document).ready(function () {
	$('#ham').click(function () {
		$(this).toggleClass('open');

		if ($('#menu').css('left') == `${0}px`) {
			$('#menu').animate({
				left: `${-100}%`,
			}, 250)
			$('#menu').fadeOut(250);
		} else {
			$('#menu').css({
				display:'flex',
			});
			$('#menu').animate({
				left: 0,
			}, 500)
		}
	});

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

	function LoginOrSignup(){
		$('#LoginSignup').click(function(){
			$('#login').show();
		})
		$('.loginBack').click(function(e){
			e.stopPropagation;
			$('#login').hide();
		})
	}
	LoginOrSignup();


});
//header

//login
Vue.component('loginBox', {
    props: [],
    data() {
        return {

        };
    },
    methods: {

    },
    template: `
            <form action="login.php" class="loginForm" method="post">
                <label for="memId">
                    <span>EMAIL</span>
                    <input type="email" name="memId" id="memId">
                </label>
                <label for="memPsw">
                    <span>PASSWORD</span>
                    <input type="password" name="memPsw" id="memPsw">
                </label>
                <input type="submit" value="LOGIN" id="loginSubmit">
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

    },
    template: `
            <form action="signup.php" class="signForm" method="post">
                <label for="memName">
                    <span>NAME</span>
                    <input type="email" name="memName" id="memName">
                </label>
                <label for="memId">
                    <span>EMAIL</span>
                    <input type="email" name="memId" id="memId">
                </label>
                <label for="memPsw">
                    <span>PASSWORD</span>
                    <input type="password" name="memPsw" id="memPsw">
                </label>
                <label for="pswCheck">
                    <span>PASSWORD CHECK</span>
                    <input type="password" id="pswCheck">
                </label>
                <input type="submit" value="SIGNUP" id="signUpSubmit">
            </form>
    `,
})

new Vue({
    el: "#login",
    data: {
        title:'LOGIN',
        subTitle:'SIGNUP',
        content: 'loginBox',
    },
    methods: {
        changeForm() {
            if (this.content == 'loginBox') {
                this.title = 'SIGNUP';
                this.subTitle = 'LOGIN';
                this.content = 'signUpBox';
            } else if (this.content == 'signUpBox') {
                this.title = 'LOGIN';
                this.subTitle = 'SIGNUP';
                this.content = 'loginBox';
            }
        }
    }
});