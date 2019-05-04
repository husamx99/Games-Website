$(document).ready(function(){
    $("#signIn").click(function(event){
        event.preventDefault();
  		console.log("button clicked");
     	$('#signUpForm').hide();
  		$("#popUp").removeClass( "loader hidden" )   
  	});

    $('.closePopUp').click(function(event){
    	console.log("x clicked");
		$("#popUp").addClass( "loader hidden" );
	})

  	$('#signUpA').click(function(event){
  		event.preventDefault();
    	console.log("x clicked");
		$('#signUpForm').show();
		$('#signInForm').hide();
	})
	  	$('#signInA').click(function(event){
  		event.preventDefault();
    	console.log("x clicked");
		$('#signUpForm').hide();
		$('#signInForm').show();
	})
});



