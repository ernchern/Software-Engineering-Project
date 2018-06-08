/**
 * Created by alisher on 5/27/18.
 */
var config = {
    apiKey: "AIzaSyAvVTgyZW_IpBkNyWKDUFnJjNKlDlcl7Bo",
    authDomain: "kaist-scms.firebaseapp.com",
    databaseURL: "https://kaist-scms.firebaseio.com",
    projectId: "kaist-scms",
    storageBucket: "kaist-scms.appspot.com",
    messagingSenderId: "716217260337"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var storage = firebase.storage();
    var club;
    var email = '';
    var password = '';
    
    $( document ).ready( function () {
        // Get query parameters
        
        $("#loginSubmit").click(function(event) {
            event.preventDefault();
            email = $("#email").val();
            password = $("#password").val();
            if (email.length === 0) {
                alert("Please fill in the student id");
                password = '';
                email = '';
            }
            else if(password.length === 0){
                alert("Please fill in the password");
                password = '';
                email = '';
            }
            else {
                console.log(email);
                firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
                    // Sign-out successful.
                    firebase.auth().onAuthStateChanged(function (user) {
                        if(user) {
                            student_id = user.displayName;
                            window.location.replace("student-profile.html?student=" + student_id);
                        }
                    });
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(error);

                    alert(errorMessage);

                    // ...
                });
            }
    
        });
    
        
          
          
    });
    

    