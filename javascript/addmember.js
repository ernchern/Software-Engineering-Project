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
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.has('club')); // true
    console.log(urlParams.get('club')); // "edit"
    club = urlParams.get('club');

    populate_page(club);

    $("#search_student").click(function() {
        student_id = myTrim($("#id-input").val());
        if (student_id.length === 0) {
            alert("Please fill in the student id");
            student_name = '';
            student_id = 0;
        }
        else {
            console.log(student_id);

            database.ref('students/' + student_id).once("value").then(function (snapshot) {
                console.log(snapshot.val());
                if (snapshot.val() === null) {
                    alert("No student with such ID");
                    student_id = 0;
                    student_name = '';
                }
                else {
                    student_name = snapshot.val()["name"];
                    console.log(student_name);
                    var search_result = $("#search_result");
                    search_result.empty();
                    var html = "<div class='col-md-3'><a href='student-profile.html?student=";
                    html += student_id + "'>" + student_id + "</a></div>";
                    html += "<div class='col-md-7'><a href='student-profile.html?student=";
                    html += student_id + "'>" + student_name + "</a></div>";
                    search_result.append(html);
                }
            });
        }

    });

    $("#add_student").click(function () {
        console.log(student_id);
        console.log(student_name);
        if (student_id !== 0) {
            console.log("inside if");
            database.ref('clubs/' + club + '/members/' + student_id).set(student_name).then(function (snapshot) {
                $("#search_result").empty();
                student_id = 0;
                student_name = '';
            });
        }
    });

    $("#cancel_addition").click(function () {
        $("#search_result").empty();
        student_id = 0;
        student_name = '';
    });
});

function populate_page(club) {
    $("#header-add").text("Add new members to " + club);
    $("#header-current").text("Current members of " + club);

    database.ref("clubs/" + club + "/members").on('value', function (snapshot) {
        var members = snapshot.val();
        console.log(members);
        var id;
        var html;
        var member_list = $("#current_members");
        member_list.empty();
        for (id in members) {
            if (members.hasOwnProperty(id)) {
                html = "<li class='list-group-item'><a href='student-profile.html?student=" + id + "'>" + id + "<span class='pull-right'>" + members[id] + "</span></a></li>";
                member_list.append(html);
            }
        }
    });
}

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}