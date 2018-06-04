/**
 * Created by alisher on 5/26/18.
 */
// Initialize Firebase
jQuery( document ).ready(function($) {
var config = {
apiKey: "AIzaSyAvVTgyZW_IpBkNyWKDUFnJjNKlDlcl7Bo",
authDomain: "kaist-scms.firebaseapp.com",
databaseURL: "https://kaist-scms.firebaseio.com",
projectId: "kaist-scms",
storageBucket: "",
messagingSenderId: "716217260337"
};
firebase.initializeApp(config);

// Firebase Database setup
var database = firebase.database();
  
var studentsRef = database.ref('students');

// Bind comments to firebase

studentsRef.on('value', function (snapshot) {
    console.log("Updated")
    var studentsObject = snapshot.val()
    var email = studentsObject.email;
    var password = studentsObject.password;
    var clubs = studentsObject.clubs;
    var name = studentsObject.name;
    console.log(studentsObject);
//   renderstudents(studentsObject)
})

function addMessage(studentID,email, password) {
  var submitObject = {
    
    email: email,
    password: password,
  }
  console.log("HEY");
  studentsRef.child(studentID).setValue(submitObject)
}

function renderstudents(students) {
  const htmls = Object.values(students).map(function (comment) {
    return `
      <div>
      <b>${comment.name}</b> : <i>${comment.message}</i>
      </div>
    `
  })
  $('.students').html(htmls)
}

$('#registerSubmit').click(function () {  

  var studentID = $('#userRegister').val()
  var email = $('#emailRegsiter').val()
  var password = $('#passwordRegister').val()
  console.log(studentID,email, password)
  addMessage(studentID, email, password)
  return false
})

document.getElementById("registerSubmit").addEventListener("click",function(){
  var studentID = $('#userRegister').val()
  var email = $('#emailRegsiter').val()
  var password = $('#passwordRegister').val()
  console.log(studentID,email, password)
  writeUserData(studentID, email, password)
  
});

function writeUserData(userId, email,password) {
  firebase.database().ref('students/' + userId).set({    
    email: email,
    password: password
  });
}
// firebase.database().ref('students/' + 20160000).set({    
//   email: "ba@gmail.com",
//   password: "password"
// });
// var studentID = $('#userRegister').val()
//   var email = $('#emailRegsiter').val()
//   var password = $('#passwordRegister').val()
// var submitObject = {
    
//   email: "aba",
//   password: "passw",
// }
// console.log("HEY");
// studentsRef.child("studentID").setValue(submitObject)

});


