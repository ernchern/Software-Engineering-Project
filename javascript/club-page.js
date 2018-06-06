var config = {
    apiKey: "AIzaSyAvVTgyZW_IpBkNyWKDUFnJjNKlDlcl7Bo",
    authDomain: "kaist-scms.firebaseapp.com",
    databaseURL: "https://kaist-scms.firebaseio.com",
    projectId: "kaist-scms",
    storageBucket: "kaist-scms.appspot.com",
    messagingSenderId: "716217260337"
  };
  firebase.initializeApp(config);

var str = decodeURIComponent(window.location.search);
var theleft = str.indexOf("=") + 1;
var club=str.substring(theleft,str.length);
firebase.database().ref("clubs/"+club+"/club_picture").on('value', function (snapshot) {
    var addr = snapshot.val();
    console.log(addr);
    firebase.storage().ref().child('photos/'+addr).getDownloadURL().then(function(url) {
         var test = url;
         document.querySelector('img').src = test;

    });
});

var str = decodeURIComponent(window.location.search);
var theleft = str.indexOf("=") + 1;
var club=str.substring(theleft,str.length);
///var club="PUD badminton";
document.getElementById("club name").innerHTML = club;
firebase.database().ref('clubs/'+club).on("value",
function (snapshot) {
	document.getElementById("club description").innerHTML = snapshot.val()["club_description"];
	});

// var user_id=firebase.auth().currentUser.student_id;
var user_id=20140940;

firebase.database().ref("clubs/"+club+"/members/"+ user_id).on('value', function (snapshot) {
        var member = snapshot.val();
		console.log(member);
		if (member!== null) {
			document.getElementById("option").innerHTML="<h2>Option</h2><body class='btn-group'>"
				+"<button class='button' type='button' id='post'><i>Post an announcement</i></button>"
				+"</body>";
		}
		document.getElementById("post").onclick = function() {
			window.location.href="post-announcement.html?club="+club;
		};
	});	

firebase.database().ref("clubs/"+club+"/admin/"+ user_id).on('value', function (snapshot) {
        var admin = snapshot.val();
		console.log(admin);
		if (admin!== null) {
			document.getElementById("option").innerHTML="<h2>Option</h2><body class='btn-group'>"
				+"<button class='button' type='button' id='post'><i>Post an announcement</i></button><p></p>"
				+"<button class='button' type='button' id='add-member'><i>Add a new member</i></button><p></p>"
				+"<button class='button' type='button' id='remove-member'><i>Remove a member</i></button>"
				+"</body>";
		}
		document.getElementById("post").onclick = function() {
			window.location.href="post-announcement.html?club="+club;
		};
		document.getElementById("add-member").onclick = function() {
			window.location.href="add-member.html?club="+club;
		};
    });
    
    var str = decodeURIComponent(window.location.search);
	var theleft = str.indexOf("=") + 1;
	var club=str.substring(theleft,str.length);
	firebase.database().ref("clubs/"+club+"/admin").on('value', function (snapshot) {
        var admin = snapshot.val();
        console.log(admin);
        var id;
		var html="";
        for (id in admin) {
            if (admin.hasOwnProperty(id)) {
                html=html+"<li>" +admin[id] + "</li>";	
            }
        }
		document.getElementById("admin list").innerHTML = html;
    });
	
	firebase.database().ref("clubs/"+club+"/members").on('value', function (snapshot) {
        var members = snapshot.val();
        console.log(members);
        var id;
		var html="";
        for (id in members) {
            if (members.hasOwnProperty(id)) {
                html=html+"<li>" +members[id] + "</li><p></p>";	
            }
        }
		document.getElementById("member list").innerHTML = html;
    });
	
	firebase.database().ref("clubs/"+club+"/announcement_list").on('value', function (snapshot) {
        var announcement = snapshot.val();
        console.log(announcement);
        var id;
		var html="";
        for (id in announcement) {
                html=html+"<main style='border-style: solid; padding:10px;'><p  style='font-weight: bold;'>" +announcement[id].announcement_title 
						+ "</p><p>"+announcement[id].announcement_body+"</p><p style='font-style: italic;'> posted by "+announcement[id].announcement_author
						+" on "+announcement[id].announcement_date+"</p></main>";
        }
		document.getElementById("announcement").innerHTML = html;
    });