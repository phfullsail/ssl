(function($) {  



 $("#linkHome").click(function() {
 	//$('#linkHome').removeClass('inactive');
	$('#linkHome').addClass('active');
 	});

 $("#linkTop").click(function() {
 	$('#linkTop').removeClass('inactive');
	$('#linkTop').addClass('active');
 	});

 $("#linkall").click(function() {
 	$('#linkall').removeClass('inactive');
	$('#linkall').addClass('active');
 	});

 $("#linkadd").click(function() {
 	$('#linkadd').removeClass('inactive');
	$('#linkadd').addClass('active');
 	});

 $("#linkrate").click(function() {
 	$('#linkrate').removeClass('inactive');
	$('#linkrate').addClass('active');
 	});

 $("#linkreport").click(function() {
 	$('#linkreport').removeClass('inactive');
	$('#linkreport').addClass('active');
 	});

  $("#linkabout").click(function() {
 	$('#linkabout').removeClass('inactive');
	$('#linkabout').addClass('active');
 	});

   $("#linkcontact").click(function() {
 	$('#linkcontact').removeClass('inactive');
	$('#linkcontact').addClass('active');
 	});


$("#btnSignin").click(function() {
//		if( document.getElementById('inputEmail').value != '' && document.getElementById('inputPassword').value != '' ){

	       location.href = "/home";
//	    }

	
    });



})(jQuery);