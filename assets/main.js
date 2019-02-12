// Initialize Firebase
var config = {
  apiKey: "AIzaSyCdgaw55sm3H8fFFhWQde3hBthNVCtfFTs",
  authDomain: "streamingproject1.firebaseapp.com",
  databaseURL: "https://streamingproject1.firebaseio.com",
  projectId: "streamingproject1",
  storageBucket: "streamingproject1.appspot.com",
  messagingSenderId: "507353543186"
};
firebase.initializeApp(config);
var database = firebase.database();

//First render Display blank
renderAllBlank();

//////////////////////////  Event Listeners ///////////////////////////////
            //////////////////  Menu Buttons  /////////////////////
            $('#home-menu').on('click', function () {
              showSearchForm();
            });
            $('#signin-menu').on('click', function () {
              showSigninForm();
            });
            $('#signup-menu').on('click', function () {
              showSignupForm();
            });
            $('#favorites-menu').on('click', function () {
              showFavorites();
            });
            ////////////////////////////////////////////////////////

$('#go2PasswordReset').on('click', function () {
  showPassResetForm();
});

//User to sign up with firebase auth 
$('#signup-button').on('click', function(e){
  e.preventDefault();
  var userName = $('#userNameInput').val();
  var email = $('#emailInput2').val();
  var password = $('#passwordInput2').val();
  if (email.length < 4) {
    $('.alert').text('Please enter a valid email address.');
    return;
  }
  if (password.length < 4) {
    $('.alert').text('Password must be at least 6 characters.');
    return;
  }
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      $('.alert').text('The password is too weak.');
      showSignupForm()
    } else {
      $('.alert').text(errorMessage);
      showSignupForm()
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  database.ref('/userName').push().set({
    userName: userName
  });
  showSearchForm();
  $('#displayName').css('display', 'block');
  $('#favAlert').css('display', 'none');
})

//user sign in 
$('#signin-button').on("click", function (e) {
  e.preventDefault();
  var email = $('#emailInput1').val();
  var password = $('#passwordInput1').val();
  if (email.length < 4) {
    $('.alert').text('Please enter a valid email address.');
    return;
  }
  if (password.length < 4) {
    $('.alert').text('Password must be at least 6 characters.');
    return;
  }
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      $('.alert').text('Wrong password.');
      showSigninForm();
    } else {
      $('.alert').text(errorMessage);
      showSigninForm();
    }
    console.log(error);
  });
  showSearchForm();
  $('#displayName').css('display', 'block');
  $('#favAlert').css('display', 'none');
});

//password reset
$('#passwordReset').on('click', function (e) {
  e.preventDefault();
  var email = $('#emailInput3').val();
  firebase.auth().sendPasswordResetEmail(email).then(function () {
    $('.alert').text('Password Reset Email Sent!');
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      $('.alert').text(errorMessage);
      showPassResetForm();
    } else if (errorCode == 'auth/user-not-found') {
      $('.alert').text(errorMessage);
      showPassResetForm();
    }
    console.log(error);
  });
  showSearchForm();
});

//pushing favorites to firebase
$(document).on('click', '.fav', function () {
  var poster = $(this).attr('data-src');
  var id = $(this).parent().attr("data-imdbID");
  database.ref("/favorites").push({
    poster: poster,
    id: id
  });
});

//listening to authenitfication state changes 
firebase.auth().onAuthStateChanged(function (user) {
  var user = firebase.auth().currentUser;
  //if user then...
  if (user) {
    //display from favorites list in firebase
    database.ref("/favorites").on('child_added', function (snapshot) {
      var snap = snapshot.val();
      console.log(snap);
      var poster = $('<img>').attr('src', snap.poster);
      $('#favorites').append(poster);
    });
    //display user name from firebase
    database.ref('/userName').on('child_added', function (snapshot) {
      var snap = snapshot.val();
      //console.log(snap.user);
      //$('#displayName').text(snap.userName);
    });
    $('#favorites-menu').on('click', function(e){
      e.preventDefault();
      $('#favAlert').css('display', 'none');
    });
    //if no user signed in
  } else {
    $('.alert').text("");
    showSearchForm();
    $('#displayName').css('display', 'none');
    $('#favorites-menu').on('click', function(e){
      e.preventDefault();
      $('#favAlert').css('display', 'block');
    });
  }
});

  //sign out user 
$('#signout-menu').on('click', function () {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut().then(function () {
    console.log('Signed Out');
    $('.alert').empty();
    $('#displayName').css('display', 'none');
  }, function (error) {
    console.error('Sign Out Error', error);
  });
  }
  showSearchForm();
});








/////////////////////// Display Functions /////////////////////////

function renderAllBlank() {       //Blanks out display, use before showing the current "page"
  $('#signin-form').css('display', 'none');
  $('#signup-form').css('display', 'none');
  $('#reset-form').css('display', 'none');
  $('#search-form').css('display', 'none');
  $('#favorites').css('display', 'none');
  $('#search-results').css('display', 'none');
  $('#results-display').css('display', 'none');
  $('#favAlert').css('display', 'none');
  $('.alert').empty();
  $('#streaming-services').css('display', 'none');
  

}
function showSigninForm() {
  renderAllBlank();
  $('#signin-form').css('display', 'block');
}
function showSignupForm() {
  renderAllBlank();
  $('#signup-form').css('display', 'block');
}
function showFavorites() {
  renderAllBlank();
  $('#favorites').css('display', 'block');
  $("#results-display").css("display", 'block');
  $('#streaming-services').css('display', 'block');
}
function showSearchForm() {
  renderAllBlank();
  $('#search-form').css('display', 'block');
  $('#streaming-services').css('display', 'block');
}
function showPassResetForm() {
  renderAllBlank();
  $('#reset-form').css('display', 'block');
}