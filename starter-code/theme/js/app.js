firebase.initializeApp(config);
  var databaseReference = firebase.database();


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
	});

  	$('#signUpA').click(function(event){
  		event.preventDefault();
    	console.log("x clicked");
		$('#signUpForm').show();
		$('#signInForm').hide();
	});
	  	$('#signInA').click(function(event){
  		event.preventDefault();
    	console.log("x clicked");
		$('#signUpForm').hide();
		$('#signInForm').show();
	});
    	$('#signUpButt').click(function(event){
  		event.preventDefault();
                var name = $("#inputNameUp").val();
        var email = $("#inputEmailUp").val();
        var password = $("#inputPassUp").val();
            console.log(password+" "+email);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    });
      	$('#signInButt').click(function(event){
  		event.preventDefault();
        var email = $("#inputEmailIn").val();
        var password = $("#inputPassIn").val();
            console.log(password+" "+email);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode+"/n"+errorMessage);
        // ...
      });
            firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
      
      		$("#popUp").addClass( "loader hidden" );

  } else {
    // No user is signed in.
      console.log("error");
  }
});
    });
});



