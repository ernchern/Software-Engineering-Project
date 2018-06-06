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
    // var student_id = 0;
    var student_name = '';
    
    $( document ).ready( function () {
        // Get query parameters        
        // console.log("in?")
        $('#checkbox').click(function(){
            if(document.getElementById("registerSubmit").disabled == true)
            $('#registerSubmit').prop('disabled',false);
            else
            $('#registerSubmit').prop('disabled',true);
        })

        $('#registerSubmit').click(function (event) {  
            event.preventDefault();
            var student_id = $('#userRegister').val();
            var name = $('#nameRegister').val();
            var email = $('#emailRegister').val();
            var password = $('#passwordRegister').val();
            const picture = $("#profile_pic").get(0).files[0];
            const picture_name = (+new Date()) + '-' + picture.name;
            const metadata = {
                contentType: picture.type
            };

            if (student_id.length === 0) {
                alert("Please fill in the student id");
                student_name = '';
                student_id = 0;
            }
            else{
                if (student_id !== 0) {
                    console.log("inside if");
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
                        // Sign-out successful.
                        firebase.auth().onAuthStateChanged(function (user) {
                            if(user) {
                                user.updateProfile({
                                    displayName: student_id
                                }).then(function() {
                                    database.ref('students/' + student_id).set({
                                        student_name: name,
                                        email: email,
                                        profile_picture: picture_name
                                    }).then(function (snapshot) {
                                        storage.ref("photos/" + picture_name).put(picture, metadata).then(function (snapshot) {
                                            alert("Club Page is created!");
                                            window.location.replace("student-profile.html?student=" + student_id);
                                        });
                                    });
                                }).catch(function(error) {
                                    alert(error.message);
                                });
                            }
                        });
                    }).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(error);
                        if (errorCode == 'auth/weak-password') {
                            alert('The password is too weak.');
                        } else {
                            alert(errorMessage);
                        }
                    });
                }
            }
        })
    });    
          
    function logUser(user,student_id) {
        var ref = firebase.database().ref("users");
        var obj = {
            "user": user,
            "student_id": student_id
        };
        ref.push(obj); // or however you wish to update the node
    }