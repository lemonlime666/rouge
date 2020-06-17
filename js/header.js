$(document).ready(function(e){
	$('#ham').click(function(){
		$(this).toggleClass('open');
		
		if($('#menu').css('left') == `${0}px`){
			$('#menu').animate({
				left:`${-100}%`,
			}, 500)
		}else{
			$('#menu').animate({
				left:0,
			}, 500)
		}
	});
	
});
