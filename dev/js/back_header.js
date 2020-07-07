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

	// window.addEventListener('resize', () => {
	// 	let winWidth = window.innerWidth;
	// })

	window.addEventListener('resize', () => {
		let winWidth = window.innerWidth;
		console.log(winWidth);
	})
});
//header