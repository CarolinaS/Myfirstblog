jQuery(document).ready(function ($) {
    $('.counter').counterUp({
        delay: 100,
        time: 1200
    });

    $('#datatable').dataTable();
	


    $('#example').DataTable( {
        initComplete: function () {
            this.api().columns().every( function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
 
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                column.data().unique().sort().each( function ( d, j ) {
    if(column.search() === '^'+d+'$'){
        select.append( '<option value="'+d+'" selected="selected">'+d+'</option>' )
    } else {
        select.append( '<option value="'+d+'">'+d+'</option>' )
    }
} );
            } );
        }
    } );

   var table= $('#example2').DataTable( {
     
        initComplete: function () {
            this.api().columns().every( function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
 
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                column.data().unique().sort().each( function ( d, j ) {
    if(column.search() === '^'+d+'$'){
        select.append( '<option value="'+d+'" selected="selected">'+d+'</option>' )
    } else {
        select.append( '<option value="'+d+'">'+d+'</option>' )
    }
} );
            } ); 
        } 
    } );
 
  $('a.toggle-vis').on( 'click', function (e) {
        e.preventDefault();
 
        var column = table.column( $(this).attr('data-column') );
 
        column.visible( ! column.visible() );
    } );


 $("#apply").on('click', function() {
 var action1 = $('#op').val();
 var $t=$(this);
 switch(parseInt(action1)) {
 case 1:
   $t.attr("data-target","#one" );
   break;
 case 2:
   $t.attr("data-target","#two" );
   break;

 default:
 }

 

});

 $("#ingreso").on('click', function() {
 var dato = $('#code').val();
		var url = '/alumn/list/'+dato;
		$.ajax({
		type:'POST',
		url:url,
		//data:'/list/'+dato,
		success: function(datos){
			$('#tab').html(datos);
		}
	});
	return false;
	});
	
	 $("#apply2").on('click', function() {
 var action1 = $('#op2').val();
 var $t=$(this);
 switch(parseInt(action1)) {
 case 1:
   $t.attr("data-target","#three" );
   break;
 case 2:
   $t.attr("data-target","#four" );
   break;
   
 default:
 }

 

});

 $('#max').keyup( function() {
        table.draw();
    } );

    $('#datepicker').datepicker({
        format: "yyyy/MM/dd",
        language: 'espanol',
        autoclose: true
    });
    
    $('#datepicker2').datepicker({
        format: "yyyy/MM/dd",
        language: 'espanol',
        autoclose: true
    });
    //Fecha de Nacimiento
    $('#home_dep').change(function () {
        $(this).get_location('home_pro')
        $('#location_id').find('option').remove()
        $('#location_id').append('<option value="">---</option>')
    })
    $('#home_pro').change(function () {
        $(this).get_location('location_id')
    })

    //Fecha de Domicilio
    $('#birth_dep').change(function () {
        $(this).get_location('birth_pro')
        $('#birth_location_id').find('option').remove()
        $('#birth_location_id').append('<option value="">---</option>')
    })
    $('#birth_pro').change(function () {
        $(this).get_location('birth_location_id')
    })

});

function calcAge(birthday) {
    return ((Date.now() - birthday) / 31557600000).toString().split('.')[0];
}

$.fn.extend({
    get_location: function (child) {
        $.ajax({
            type: "POST",
            url: '/location/get_location',
            data: {id: $(this).val()},
            dataType: 'json',
            success: function (response) {
                if (response.status == 'ERROR')
                    alert('Se ha presentado un error al obtener los datos de las ciudades')
                else
                    $('#' + child).select(response.data)
            }
        });
    },
    select: function (data) {
        var $this = $(this)
        $this.find('option').remove()
        $this.append('<option value="">---</option>')
        $.each(data, function (index, value) {
            $this.append('<option value="' + index + '">' + value + '</option>')
        })
    }
});

$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var max = parseInt( $('#max').val(), 10 );
        var age = parseFloat( data[14] ) || 0;
        if ( (  isNaN( max ) )  ||
             ( max <= age   ) )
        {
            return true;
        }
        return false;
    }
);