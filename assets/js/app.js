$(document).ready(function () {
	// Paginas en Hide()
	$('.pages').hide();
	$('#page_0').show();
	// Splash Page 0
	splash(3000);
	function splash(time) {
		setTimeout(function () {
  	$('#page_0').fadeOut(); }, time);
  	$('#page_1').delay(3500).fadeIn();
	}

	// Base de Datos API
	var count = 0;
	$.ajax({
		type: 'GET',
		url: 'https://developers.zomato.com/api/v2.1/search?entity_id=83&entity_type=city',
		data: { 'apikey': '08745b89950bcfdb5f7288709f442690' 
	},
		success: function(restaurants) {
			console.log('success', restaurants);
			$.each(restaurants['restaurants'], function(i, restaurant) {
				$('#list').append('<li>Local: ' + count++ + restaurant + '</li>');
			});
		},
	});
	
});
