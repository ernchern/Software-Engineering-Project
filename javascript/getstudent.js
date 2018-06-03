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
//var clubs_entered = [];

$( document ).ready( function () {
    //var student_id = 20140940;
    //var studentId = firebase.auth().currentUser.uid;
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.has('student')); // true
    console.log(urlParams.get('student')); // "edit"
    student_id = urlParams.get('student');

    //populate_page(student_id);

    database.ref('students/' + student_id).once("value").then(function (snapshot) {
        console.log(snapshot.val());
        student_name = snapshot.val()["name"];
        $("#student-name").text(student_name);
        clubs_entered = snapshot.val()["clubs"];
       
        //add list of clubs to html:
        for (var I = 0; I < clubs_entered.length; I++)
        {
                let ii = I; //make I constant for one iteration;
                var club = clubs_entered[ii];
                clubsList = "<li class='list-group-item'><a href='club-page.html?club=" + club+ "'>" + club + "</a></li>";
                document.getElementById("club-name").innerHTML += clubsList;
               
                var query = firebase.database().ref("clubs/"+clubs_entered[ii]+"/announcement_list").orderByKey();
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
                            
                            console.log(clubs_entered);
                            console.log(ii);
                            console.log(club);
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
    
    });
});


