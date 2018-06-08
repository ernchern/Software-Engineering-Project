var str = decodeURIComponent(window.location.search);
var theleft = str.indexOf("=") + 1;
var club=str.substring(theleft,str.length);
document.getElementById("post").addEventListener("click", function() {
    postAnnouncement(club);
});

var config = {
apiKey: "AIzaSyAvVTgyZW_IpBkNyWKDUFnJjNKlDlcl7Bo",
authDomain: "kaist-scms.firebaseapp.com",
databaseURL: "https://kaist-scms.firebaseio.com",
projectId: "kaist-scms",
storageBucket: "kaist-scms.appspot.com",
messagingSenderId: "716217260337"
};
firebase.initializeApp(config);
//var club="KIFC";

function postAnnouncement(club) {

var user_id = 0;
firebase.auth().onAuthStateChanged(function(user) {
	console.log("user:", user);
	user_id=user.displayName;
	var title=document.getElementById("announcementTitle").value;
if (title==="") {
	try {
	alert("Please enter a title.");
	}
	catch(err) {
	document.getElementById("err").innerHTML = err.message;
	}
	return;
}

firebase.database().ref("clubs/"+club+"/members/"+user_id).on('value', function (snapshot) {
	var name = snapshot.val();
	console.log(name);
	console.log(club);
	console.log(user_id);
	var content=document.getElementById("announcementContent").value;
	var date = new Date();
	date = date.toDateString();
	//var name="Ern Chern";
	var announcementData = {
	announcement_author: name,
	announcement_body: content,
	announcement_title: title,
	announcement_date: date
  };
	//var newAnnouncementList = firebase.database().ref().child('clubs').child(club).set('announcement_list');
	var newAnnouncementKey = firebase.database().ref().child('clubs').child(club).child('announcement_list').push().key;
	var updates = {};
		updates['/clubs/'+club+'/announcement_list/' + newAnnouncementKey] = announcementData;
		firebase.database().ref().update(updates);
	document.getElementById("success").innerHTML="Successfully posted! Click to return to club page.";
	document.getElementById("return").innerHTML="<button class='btn btn-link' onclick=return_club()><i>Click</i></button>";
});
});


}
function return_club() {
	window.location="club-page.html?club="+club;
}

function cancelAnnouncement() {
	document.getElementById("announcementTitle").value = "";
	document.getElementById("announcementContent").value = "";
}