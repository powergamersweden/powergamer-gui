function share(method, url){
    
    var params = {
		method : method
	};
    
    if(url){
        params.url = url;
    }
    
	_share(params);
}

function _share(settings)
{
	settings = $.extend({method : 'facebook', facebookId : '', url : window.location.href, title : document.title, message : '', image : null , open : null, close: null}, settings);

	var height = 450;
	var customWindow = null;
	var url = '';
	var id = '';

	if(settings.method == 'facebook') {
		url = "https://www.facebook.com/dialog/share?redirect_uri="+ 
			settings.url + "&app_id="+settings.facebookId+"&description="+settings.message+"&display=popup&href="+settings.url+"&name="+settings.title;
		id = 'facebookWindow';


	} else if(settings.method == 'twitter')
	{
		height = 260;
		url = 'http://twitter.com/share?text=' + settings.message + '&url='+ settings.url;
		id = 'twitterWindow';
	}
	else if(settings.method == 'pusha')
	{
		url = 'http://www.pusha.se/posta?url='+ settings.url +'&title='+settings.title+'&description='+settings.message
		id = 'pushaWindow';

	}
	else if(settings.method == 'google')
	{
		height = 450;
		url = 'https://plus.google.com/share?url=' + settings.url;
		id = 'googlePlusWindow';
	}

	var style = 'height='+height+', width=650, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0';

	// Open custom window
	customWindow = window.open( url, id, style );
	
	// Callback when ready
	if(typeof settings.open === 'function')
	{
		$(customWindow.document).ready(function()
		{
			settings.open();
		});
	}

	// Callback when closed
	if(typeof settings.close === 'function')
	{
		var customWindowInterval = window.setInterval(function()
		{
			if(customWindow.closed)
			{
				clearInterval(customWindowInterval);
				settings.close();
			}
		}, 100);
	}	
}