$(document).ready(pagination(1));
$(function(){
	
	
	$('#code').on('keyup',function(){
		var dato = $('#code').val();
		var url = '/alumn/list/'+dato;
		$.ajax({
		type:'POST',
		url:url,
		data:'/list/'+dato,
		success: function(datos){
			$('#data').html(datos);
		}
	});
	return false;
	});
	
});
