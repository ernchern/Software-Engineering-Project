// var config = {
// apiKey: "AIzaSyAvVTgyZW_IpBkNyWKDUFnJjNKlDlcl7Bo",
// authDomain: "kaist-scms.firebaseapp.com",
// databaseURL: "https://kaist-scms.firebaseio.com",
// projectId: "kaist-scms",
// storageBucket: "kaist-scms.appspot.com",
// messagingSenderId: "716217260337"
// };
// firebase.initializeApp(config);
// var database = firebase.database();
// var storage = firebase.storage();
// var student_id = 0;
// var student_name = '';
// var authorizedPage = 0;
// var user_id = 0;
//var clubs_entered = [];

$( document ).ready( function () {

    var ref = firebase.database().ref("clubs");
    ref.once("value")
      .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            club = childSnapshot.key;
            clubsList = "<li class='list-group-item'><a href='club-page.html?club=" + club+ "'>" + club + "</a></li>";
            document.getElementById("clubs-all").innerHTML += clubsList;
    });
});
});    



