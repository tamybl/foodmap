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
	var countID = 0;
	$.ajax({
		type: 'GET',
		url: 'https://developers.zomato.com/api/v2.1/search?entity_id=83&entity_type=city',
		data: { 'apikey': '08745b89950bcfdb5f7288709f442690' 
	},
		success: function(restaurants) {
			console.log('success', restaurants);
			$.each(restaurants['restaurants'], function(i, restaurant) {
				$('#locals').append('<div class="col-xs-6 content-food" data-toggle="modal" data-target="#modal_'+countID+'"><h4 class="title visible-xs hidden-md hidden-lg">' +restaurant.restaurant.name + '</h4>' + '<img src="'+restaurant.restaurant.featured_image+'" class="img-responsive" id="img_'+ countID +'"><div class="title-overlay" id="hover_'+countID+'" style="display:none"><p>'+restaurant.restaurant.name+'</p></div><div class="cat-hide">'+restaurant.restaurant.cuisines +'</div></div>');

				$('#modal-container').append('<!-- Modal --> <div class="modal fade" id="modal_'+countID+'" role="dialog"><div class="modal-dialog">' + 
					'<!-- Modal content-->' + 
					'<div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">' +restaurant.restaurant.name + '</h4></div><div class="modal-body"><div><iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d13320.939744860902!2d'+restaurant.restaurant.location.longitude+'!3d'+restaurant.restaurant.location.latitude+'!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2scl!4v1513090132518" width="100%" height="150" frameborder="0" allowfullscreen></iframe></div><div class="row"><div class="col-xs-6"><p><strong>Dirección:</strong> '+restaurant.restaurant.location.address+' </p></div><div class="col-xs-6"><p><strong>Precio para Dos:</strong> '+restaurant.restaurant.currency+restaurant.restaurant.average_cost_for_two+'</p></div>' + 
					'</div></div><div class="modal-footer text-center"><button type="button" class="btn btn-default">Pedir ahora</button></div></div></div></div>');
				countID++;
			});

			$('#categories').change(function () {
				/* :contains revisa si existe coincidencia filtrando
				* por el keyword y mostrando el resultado con show().
				*/
				var keyword = $(this).val();
				$('.content-food').hide();
				$(".content-food:contains('" + keyword + "')").show();
			});	
			$('.content-food').on('mouseover',function () {
				var hoverID = $(this).index();
				console.log(hoverID);
    		$('#hover_'+hoverID).show();
			});
			$('.content-food').on('mouseout', function () {
				var hoverID = $(this).index();
    		$('#hover_'+hoverID).hide();
			});
		},
	});	
});
