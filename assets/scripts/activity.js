$(document).ready(function(){

	var ajax = Ajax();
	
	$('.activity-comment-link').on('click', function(e){
		e.preventDefault();
		
		var activity = $(this).parents('.activity:first');
		$('.activity-comments, .comment-form').hide();
		activity.find('.activity-comments, .comment-form').show();
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