
function boot () {
	FastClick.attach(document.body);
	
	var header = $('.header.header-main');
	var body = $('body');
	var headerInnerHeight = $('.header.header-main .inner').outerHeight()
	var reviewHeader = $('.review-header-content');
	
	$(window).on('scroll', function(e) {
		var scroll = $(window).scrollTop();
		
		if(scroll > headerInnerHeight){
			body.addClass('fixed-menu');
		} else {
			body.removeClass('fixed-menu');
		}
		
		if(scroll > (headerInnerHeight + 50)) {
			body.addClass('fixed-menu-small');
		} else {
			body.removeClass('fixed-menu-small');
		}
		
		if(scroll > (headerInnerHeight + 250)) {
			body.addClass('fixed-player');
		} else {
			body.removeClass('fixed-player');
		}
		
		if (reviewHeader.length) {
			var offsetTop = reviewHeader.offset().top - 150;
			var height = reviewHeader.outerHeight();
			
			if(scroll > offsetTop && scroll < (offsetTop + reviewHeader.outerHeight())) {
				var perc = 1 - (scroll-offsetTop)/height;
				reviewHeader.css({opacity : perc});
			}
		}
	})
	
	$('.play-button').on('click', function (e) {
		e.preventDefault();
		$('.player').toggleClass('playing');
	})
	$('.user-controll.drawer, .drawer-favorites .close').on('click', function (e) {
		e.preventDefault();
		$('.drawer-favorites').toggleClass('open');
	})
	
	$('.drawer-favorites .article-remove').on('click', function (e) {
		e.preventDefault();
		var item = $(this).parents('.article-list-item:first');
		item.addClass('remove');
		window.setTimeout(function() {
			item.css({'max-height': 0, 'padding' : 0});
		}, 400)
	})
	
	$('.image-magnify').on('click', function(e) {
		e.preventDefault();
		
		
		var holder = $(this).parents('.image-holder:first');
		var image = holder.find('img').attr('src');
		var text =  holder.find('p').text();
		
		showOverlay(image, text);
	});
	
	
	$('.overlay .close').on('click', closeOverlay)
	$(window).on('keydown', function(e){
		if(e.keyCode == 27){
			e.preventDefault();
			closeOverlay();
		}
	})
	
	
	function showOverlay (image, text) {
		$('.overlay img').attr('src', image);
		$('.overlay').addClass('open');
	}
	
	function closeOverlay () {
		$('.overlay').removeClass('open');
	}
}

var Ajax = function(){

	var ajax = {
		controller : function(controller, method, args, callback){

			$.ajax({
				url : api,
				data: {controller : controller, method : method, args: args},
				success : function(resp){
                    
					if(typeof callback === 'function')
						callback(resp.success, resp);
				}
			})
		}
	};

	return ajax;
}

