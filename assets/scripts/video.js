function playVideo(id, width, height) {
	
	var yId = 'youtube'+id;
	
	var player = new YT.Player(yId, {
		height: height,
		width: width,
		videoId: id,
		playerVars : {
			showinfo  : false,
			rel : 0
		},
		events: {
			'onReady': onPlayerReady
		}
	});
	
	function onPlayerReady(e){
		var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
		
		if(!iOS) {
			
			
			switch(quality){
				case 'high':
					player.setPlaybackQuality('highres');
					break;
				case 'medium':
					player.setPlaybackQuality('large');
					break;
				case 'low':
					player.setPlaybackQuality('medium');
					break;
			}
			
			
			player.playVideo();		
		}
		
	}
	
	$(window).resize(function(){
		player.setOption('width')
	})
}

$(document).ready(function(){

	var player = $('.video-player');
	
	player.on('click', function(e){
		e.preventDefault();
		var videoContext = $(this);
		
		if(videoContext.hasClass('playing'))
			return;
		
		videoContext.addClass('playing');

		var id = videoContext.data('id');
		videoContext.find('.video-player-placeholder, .video-player-button-play').hide();
		playVideo(id, player.width(), player.height());
	})
	
	$(window).resize(function(){
		
		if(player.length) {
			var originalSize = {
				width: 1050,
				height: 591
			};

			var scale = originalSize.height/originalSize.width;
			var newHeight = player.width()*scale;
			player.height(newHeight);
			
			var iframe = player.find('iframe');
			
			if(iframe.length) {
				iframe
					.removeAttr('height')
					.removeAttr('width');
				
				iframe.height(newHeight).width(player.width());
			}
		}
		
	})
	
	$(window).trigger('resize');
})
