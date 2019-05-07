firebase.initializeApp(config);
var databaseReference = firebase.database();
var database = firebase.database();
var storage = firebase.storage();
var selectedFile;
var imageUrl;
var displayName;

$(document).ready(function(){
    
    

    $("#articleFile").on("change", function(event) {
        
var storageRef = firebase.storage().ref();
      
    const file = event.target.files[0];
    const fileName = file.name;

    const uploadTask = storageRef.child(`images/${fileName}`).put(file);

    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      }, (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      }, () => {
         // Do something once upload is complete
         console.log('success');
        //  console.log(uploadTask.fullPath);
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              imageUrl = downloadURL
          console.log('File available at', downloadURL);
        });
      });
});

                   $("#userList").hide();
       $("#newArticle").click(function(event){
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
    $("#addNewArticle").click(function(event){
                event.preventDefault();
  		$("#popUp").removeClass( "loader hidden" )   
             	$('#signUpForm').hide();
                $('#signInForm').hide();
                $('#newArticle').show();

        
  	});
    
    $("#signIn").click(function(event){
        event.preventDefault();
  		console.log("button clicked");
     	$('#signUpForm').hide();
          $('#newArticle').hide();

  		$("#popUp").removeClass( "loader hidden" )   
  	});
// to close pop-up
    $('.closePopUp').click(function(event){
    	console.log("x clicked");
		$("#popUp").addClass( "loader hidden" );
	});
  	$('#signUpA').click(function(event){
  		event.preventDefault();
    	console.log("x clicked");
		$('#signUpForm').show();
		$('#signInForm').hide();
        $('#newArticle').hide();

	});
    
	  	$('#signInA').click(function(event){
  		event.preventDefault();
    	console.log("x clicked");
		$('#signUpForm').hide();
		$('#signInForm').show();
        $('#newArticle').hide();

	});
    
$('#addArticleButt').click(function(event){
  		event.preventDefault();
          var user = firebase.auth().currentUser;
    
          var userId = user.uid;
    
          var name = displayName ;
    console.log(name+"ckkckc");
    	console.log("add article clicked");
        var artTitle = $("#articleTitle").val();
    var artFile = imageUrl
    var artContent = $("#articleContent").val();
        console.log(name);

     firebase.database().ref('articles/').push({
            uid: userId,
            auther: name,
         article_title: artTitle,
         article_content: artContent,
         article_picture:imageUrl,
        });
        getArticles();

	});
    // sign up function

    	$('#signUpButt').click(function(event){
  		event.preventDefault();
                var name = $("#inputNameUp").val();
        var email = $("#inputEmailUp").val();
        var password = $("#inputPassUp").val();
            console.log(password+" "+email+" "+name);
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
            var userId = user.uid
            
      		$("#popUp").addClass( "loader hidden" );
            $("#signIn").hide();
            $("#userList").text(name);
            $("#userList").show();
            console.log(name+" "+"loged")
          writeUserData(userId, name, email);

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
            console.log(user);
      var user = firebase.auth().currentUser;
      let ref = database.ref('/users/' + user.uid).once('value').then(function(snapshot) {
    let userData = snapshot.val();
    console.log(userData.displayName);
         var name = userData.displayName;
          displayName = name;
              console.log(displayName);

            $("#userList").text(name);
});
    var email = user.email;
      		$("#popUp").addClass( "loader hidden" );
            $("#signIn").hide();
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
        $("#articleViewer").hide();

    getArticles();
    
    
});

function getArticles(){
           const arrayOfjQueryArticles = [];

    databaseReference.ref('articles').on('value', (results) => {
     // $messageBoardDiv.empty()

      // VAL() IS A FIREBASE METHOD
      let allArticles = results.val()
      console.log(allArticles);

      results.forEach((article) => {
         console.log(article.val().article_content) ;
          let artAuther = article.val().auther;
          let artTitle = article.val().article_title;
          let artContent = article.val().article_content;
          let artImage = article.val().article_picture;
          let id = article.key;
          console.log(id);
          let newArticle = `
    			<div id=${id} class="review-container">
    				<div class="review-image-container">
    					<img src="${artImage}">
    				</div>
    				<div class="review-content-container">
    					<span>${artTitle}</span><br>
    					<span>By: ${artAuther}</span><br>
    					<span>
    						${artContent} 
    					</span>
    				</div>
    			</div>`;

          
            arrayOfjQueryArticles.push(newArticle)
         $('#main').append(newArticle);

      });
        $('.review-container').on('click', function() { 
    console.log("article clicked!!!!!!!");
       var indexArray = $(this).attr('id');
            console.log(indexArray);
            var artViewAuther = allArticles[indexArray].auther;
            var artViewTitle = allArticles[indexArray].article_title;
            var artViewContent = allArticles[indexArray].article_content;
            var artViewImage = allArticles[indexArray].article_picture;
            $('#artViewTitle').text(artViewTitle);
            $('#artViewAuther').text(artViewAuther);
            $('#artViewcontent').text(artViewContent);
            $("#artViewImage").attr("src", artViewImage);
            $("#allArticles").hide();
            $("#commingSoon").hide(); 
            $("#articleViewer").show();
        

            


})
    
   
})
    };


function writeUserData(userId, name, email) {
    console.log("creating user is working");
    firebase.database().ref('users/' + userId).set({
            displayName: name,
            email: email,
    });
}
function userDisplayName(userId){
    let ref = database.ref('/users/' + userId).once('value').then(function(snapshot) {
    let userData = snapshot.val();
    console.log(userData.displayName);
         var name = userData.displayName;
        return name;
});
}

