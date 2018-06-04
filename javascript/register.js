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
        console.log("in?")
        $('#registerSubmit').click(function () {  

            student_id = $('#userRegister').val()
            var name = $('#nameRegister').val()
            var email = $('#emailRegsiter').val()
            var password = $('#passwordRegister').val()
            console.log(student_id,name,email, password)
            console.log("hey");
            if (student_id !== 0) {
                console.log("inside if");
                database.ref('students/' + student_id).set({
                    student_name: name,
                    email: email,
                    password: password
                });
            }
            
          })
          
         
    });    
          
    