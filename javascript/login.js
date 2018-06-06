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
    var student_id = 0;
    var student_name = '';
    
    $( document ).ready( function () {
        // Get query parameters
        
        $("#loginSubmit").click(function(event) {
            event.preventDefault();
            student_id = $("#student_id").val();
            student_pass = $("#password").val();
            if (student_id.length === 0) {
                alert("Please fill in the student id");
                student_name = '';
                student_id = 0;
            }
            else if(student_pass.length === 0){
                alert("Please fill in the password");
                student_name = '';
                student_id = 0;
            }
            else {
                console.log(student_id);
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                  });
                // database.ref('students/' + student_id).once("value").then(function (snapshot) {
                //     console.log(snapshot.val());
                //     if (snapshot.val() === null) {
                //         alert("No student with such ID");
                //         student_id = 0;
                //         student_pass = '';
                //     }
                //     else if(snapshot.val().password != student_pass){
                //         alert("Incorrect Password");
                //         student_id = 0;
                //         student_pass = '';
                //     }
                //     else {
                //         //login success
                //         window.location.replace("index.html");
                //         // onclick="location.href='index.html';" 
                        
                //     }
                // });
            }
    
        });
    
        
          
          
    });
    

    