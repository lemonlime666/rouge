// header
$(document).ready(function () {
	$('#ham').click(function () {
		$(this).toggleClass('open');

		if ($('#menu').css('left') == `${0}px`) {
			$('#menu').animate({
				left: `${-100}%`,
			}, 500)
			$('#menu').fadeOut(500);
		} else {
			$('#menu').fadeIn(100);
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


});
//header