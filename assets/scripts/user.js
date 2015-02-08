var countNotifications;

$(document).ready(function(){
	
	var ajax = Ajax();
	
	countNotifications = function(){
		ajax.controller('user', 'countNotification', {}, function(success, response){
			if(success) {
				console.log('Update notification count', response.count);
				updateNoticeCount(response.count, true);
			}
		})
	}
	
	$('.remove-notification').on('click', function(e){
		e.preventDefault();
		
		var id = $(this).parents('.notification:first').data('id');
		
		ajax.controller('user', 'removeNotification', { notificationId : id }, function(success, response){
			if(success) {
				$('.notification[data-id='+id+']').remove();
				updateNoticeCount(response.count);
				
				if(!$('.notification').length){
					$('.user-activity-feed').append("<h2 class='big-center'>Du har inga notiser</h2>")
				}
			}
		})
	})
	
	$('.button-game-subscribe').on('click', function(e) {
		e.preventDefault();
		
		var box = $(this);
		var header = $(this).parents('.game-header:first');
		
		if(box.hasClass('is-favorite')){
			ajax.controller('user', 'removeGame', {gameId : header.data('id')}, function() {
				box.removeClass('is-favorite');
			})
		} else {
			ajax.controller('user', 'addGame', {gameId : header.data('id')}, function() {
				box.addClass('is-favorite');
			})
		}
		
	})
	
	$('.settings-switch').each(function(key, item){
		var switcher = $(item);
		
		switcher.on('click','.option', function(){
			
			switcher.find('.option').removeClass('active');
			$(this).addClass('active');
			switcher.find('input').val($(this).data('value'));
			
		});
		
		var value = switcher.find('input').val();
		switcher.find('.option[data-value='+value+']').addClass('active');
	});
	
	var user = $('.header-main .user-link');
	var notice = user.data('number');
	if(notice){
		
		window.setTimeout(function(){
			user.addClass('notice');
		}, 500);	
	}
	
	var delay = 500;
	
	$('.header-main .user-controll').each(function(key, item){
		var controll = $(item);
		var notice = controll.data('number');
		
		if(notice){
			delay += 200;
			window.setTimeout(function(){
				controll.addClass('notice');
			}, delay);
		}
	})
	
	var page = 2;
	
	$('.load-activity').on('click', function() {
		
		var button = $(this);
		var feed = $('.user-activity-feed');
		var loader = Ladda.create( this );

		// Start loading
		loader.start();
		
		var userId = feed.data('user');
		
		ajax.controller('user', 'getFeed', {userId : userId, page : page}, function(success, response){
			loader.stop();
			
			if(success){
				page++;
				for(var i in response.items) {
					feed.append(response.items[i]);
				}
				
				if(!response.items.length){
					button.hide();
				}
			}
		})
	})
})

function updateNoticeCount(count, animate){
	
	count = parseInt(count);
	
	if(count > 0){
		var current = parseInt($('.header-main .user-link').attr('data-number'));
		if(isNaN(current)){
			current = 0;
		}
		
		if(count > current){
			$('.header-main .user-link').attr('data-number', count);
			$('.user-profile .inner-left .notifications').attr('data-number', count);
			
			if(animate){
				$('.header-main .user-link').removeClass('notice');
				
				window.setTimeout(function(){
					$('.header-main .user-link').addClass('notice');
				}, 10)
			}
		}
	} else {
		$('.header-main .user-link').removeAttr('data-number');
		$('.user-profile .inner-left .notifications').removeAttr('data-number');
	}
}
