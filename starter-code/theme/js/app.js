firebase.initializeApp(config);
  var databaseReference = firebase.database();


$(document).ready(function(){
                   $("#userList").hide();
       $("#newArticle").click(function(event){
        event.preventDefault();
  		console.log("list clicked");

  	});
  $("#logout").click(function(event){
        event.preventDefault();
  		console.log("logout clicked");
      firebase.auth().signOut().then(function() {
  // Sign-out successful.
          $("#signIn").show();
          $("#userList").hide();

}).catch(function(error) {
  // An error happened.
          alert(error);
});
  	});
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
        alert(errorCode+"/n"+errorMessage);

        // ...
      });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
    // User is signed in.
            var user = firebase.auth().currentUser;
            var email = user.email;
      		$("#popUp").addClass( "loader hidden" );
            $("#signIn").hide();
            $("#userList").text(email)
            $("#userList").show();
//           $("#inputEmailIn").attr("placeholder", "email").blur();

//            $("#inputEmailIn").
//            $("#inputPassIn").text("");

  } else {
    // No user is signed in.
      console.log("No user is signed in");
  }
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
      var user = firebase.auth().currentUser;
    var email = user.email;
      console.log(email);
      		$("#popUp").addClass( "loader hidden" );
            $("#signIn").hide();
            $("#userList").text(email)
            $("#userList").show();
//           $("#inputEmailIn").attr("placeholder", "email").blur();

//            $("#inputEmailIn").
//            $("#inputPassIn").text("");

  } else {
    // No user is signed in.
      console.log("No user is signed in");
  }
});
    });
});



