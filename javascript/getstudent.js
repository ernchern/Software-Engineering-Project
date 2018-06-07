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
var student_id = 0;
var student_name = '';
var authorizedPage = 0;
var user_id = 0;
//var clubs_entered = [];

$( document ).ready( function () {
    //var student_id = 20140940;
    //var studentId = firebase.auth().currentUser.uid;
    var urlParams = new URLSearchParams(window.location.search);
    student_id = urlParams.get('student');
    console.log(student_id);
    
     firebase.auth().onAuthStateChanged(function(user) {
        user_id = user.displayName;
        console.log("current user " +  user_id);
        if (student_id==user_id) {
            student_id = user_id;
            authorizedPage = 1; //to show announcements
        }
        if (student_id == null){
            student_id = user_id;
            authorizedPage = 1;
        }
        if (authorizedPage == 1){
            var button = '<a href="create-club.html"> \
            <button type="button" class="btn btn-secondary" style = "width:100%">\
                <i class="fa fa-plus-square-o"></i>&nbsp; Create club \
            </button> \
        </a>'
            document.getElementById("create-club-but").innerHTML += button;
        }
    
     console.log(student_id);
    //populate_page(student_id);
    var clubs_entered = [];
    database.ref('students/' + student_id).once("value").then(function (snapshot) {
        student_name = snapshot.val()["student_name"];
        profile_photo = snapshot.val()["profile_picture"];
        if (profile_photo==null){
            photo = "images/avatar/default.png";
            document.getElementById("profile-photo").src = photo;
        }
        else {
            var storageRef = storage.ref('photos')
            firebase.storage().ref().child('photos/'+profile_photo).getDownloadURL().then(function(url) {
            var photo= url;
            document.getElementById("profile-photo").src = photo;
            });
        }
        $("#student-name").text(student_name);


        var ref = firebase.database().ref("clubs");
        ref.once("value")
          .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var memberExist = childSnapshot.child("members/"+student_id).exists();
                    if (memberExist) {
                    clubs_entered.push(childSnapshot.key);
                    club = childSnapshot.key;
                    console.log(childSnapshot.key);
                    console.log(clubs_entered);
                      
                    clubsList = "<li class='list-group-item'><a href='club-page.html?club=" + club+ "'>" + club + "</a></li>";
                    document.getElementById("clubs-entered").innerHTML += clubsList;
                    
                    if (authorizedPage) {
                        var query = firebase.database().ref("clubs/"+club+"/announcement_list").orderByKey();
                        query.once("value")
                          .then(function(snapshot) {
                            snapshot.forEach(function(childSnapshot) {
                                var key = childSnapshot.key;
                                var ref = firebase.database().ref("clubs/"+key+"/announcement_list");
                                ref.once("value")
                                  .then(function(snapshot) {
                                    var author = childSnapshot.val()["announcement_author"];
                                    var body = childSnapshot.val()["announcement_body"];
                                    var date = childSnapshot.val()["announcement_date"];
                                    var title = childSnapshot.val()["announcement_title"];
                                    
                                    //add announcement to html
                                     announcement = 
                                     '<div class="row">\
                                         <div class="col-md-8 offset-md-3 mr-auto ml-auto"> \
                                            <div class="card"> \
                                                <div class="card-header"> \
                                                    <strong class="card-title">' + title + '</strong> \
                                                    <small><span class="badge badge-light float-right mt-1">' + date + '</span></small> \
                                                    <small><span class="badge badge-light float-right mt-1"><a href="student-page.html?student=' + author + '">' + author + '</a></span></small> \
                                                    <br><small><span class="badge badge-light float-right mt-1">\
                                                        <a href="club-page.html?club=' + club + '">' 
                                                        + club + 
                                                    '</a></span></small>\
                                                </div> \
                                                <div class="card-body">\
                                                    <p class="card-text">' + body + '</p> \
                                                </div> \
                                            </div> \
                                         </div>\
                                    </div>';
                                    
                                    document.getElementById("feed").innerHTML += announcement;

     
                                });
                            });
                        });
                    }
                }     
            });
        });

    
    });
    var clubs_managed = [];
    var ref = firebase.database().ref("clubs");
    ref.once("value")
      .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var clubExist = childSnapshot.child("admin/"+student_id).exists();
                if (clubExist) {
                clubs_managed.push(childSnapshot.key);
                console.log(childSnapshot.key);
                console.log(clubs_managed);
                managedClubsList = "<li class='list-group-item'><a href='club-page.html?club=" + childSnapshot.key+ "'>" + childSnapshot.key + "</a></li>";
                document.getElementById("clubs-managed").innerHTML += managedClubsList;
            }     
        });
    });
});    
});


