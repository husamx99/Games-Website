$(document).ready(function(){
    $("#signIn").click(function(event){
        event.preventDefault();
  		console.log("button clicked");
     
  		$("#popUp").removeClass( "loader hidden" )   
  	});

  	$('.closePopUp').click(function(event){
    	console.log("x clicked");
		$("#popUp").addClass( "loader hidden" );
	})
});

