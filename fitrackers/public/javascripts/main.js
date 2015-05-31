(function($) {  

	     function submitForm()  {
                  var formData = JSON.stringify($("#local-sign-in").serializeArray());
                  $.ajax({
                    type: "POST",
                    url: "localhost:3000",
                    data: data,
                    success: function(){},
                    dataType: "json",
                    contentType : "application/json"
                  });
                };

			$("#buttonSignUp").click(function() {
				location.href = "/signup";
			})

			$("#buttonRegister").click(function() {
				 // Use AJAX to post the object to our adduser service
		/*		  var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }*/



        		var newUser = {
        			'fname': $("#inputRegisterFname").val(),
        			'lname': $("#inputRegisterLname").val(),
        			'username': $("#inputRegisterUsername").val(),
        			'password': $("#inputRegisterPassword").val(),
        			'email': $("#inputRegisterEmail").val()
        		}

		       var request = $.ajax({
		       		url: 'http://localhost:3000/signup',
		       		async: false,
		            type: 'POST',
		            data: newUser,
		          	contentType: "application/x-www-form-urlencoded",
		            dataType: 'json'
		            
		        });

		       request.success(function(result) {

            console.log(result);

        });

        request.fail(function(jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });
		
    });
/*$.ajax({
        url: 'http://localhost:3000',
        dataType: "json",
        jsonpCallback: "data",
        cache: false,
        timeout: 5000,
        success: function(data) {
          //  $("#test").append(data);
          alert('success');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error');
        }
    });*/


/* $("#linkHome").click(function() {
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

	
    });*/



})(jQuery);