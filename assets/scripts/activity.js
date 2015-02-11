$(document).ready(function(){

	var ajax = Ajax();
	
	$('.activity-comment-link').on('click', function(e){
		e.preventDefault();
		
		var activity = $(this).parents('.activity:first');
        $('.activity-share').hide();
		$('.activity-comments, .comment-form').hide();
		activity.find('.activity-comments, .comment-form').show();
	})
    
    $('.activity-share-link').on('click', function(e){
		e.preventDefault();
		
        var link = $(this);
		var activity = $(this).parents('.activity:first');
        
		var popup = activity.find('.activity-share');
        
        
       _showPopup(popup, link, function(){
            _showPopup(popup, link);
       });
        
        
	})
    
    function _showPopup (popup, link, callback) {
        var position = {
            top: link.offset().top + link.outerHeight() - 10,
            left: link.offset().left - (popup.outerWidth() / 2) + (link.outerWidth() / 2)
        };
        
        window.setTimeout(function(){
            popup
                .show()
                .addClass('detach')
                .css(position)
                .focus();
            
            if(typeof callback == 'function')
                callback(popup, link);
        }, 50)
    }
	
    $('body').on('click', function(e){
        
        if ($('.activity-share.detach').length){
            if(!$(e.target).closest('.activity-share').length && !$(e.target).closest('.share-button').length){

                    $('.activity-share.detach')
                        .hide()
                        .removeClass('detach');

            }
        }
    })
    
	$('.activity .comment-form .button-submit-comment').on('click', function(e){
		e.preventDefault();
		
		var form = $(this).parents('.comment-form-inner:first');
		var button = $(this);
		var activity = form.find('.activityId').val();
		var comment = form.find('.comment').val();
		
		form.find('.comment').prop('disable', true);
		button.prop('disable', true);
		
		ajax.controller('User', 'comment', { activityId : activity, comment: comment }, function(success, response){
			if(success){
				var activityWrapper = form.parents('.activity:first');
				activityWrapper.find('.activity-comments').append(response.view);
				form.find('.comment').val('');
				form.find('.comment').prop('disable', false);
				button.prop('disable', false);
			}
			
		});
	})
})