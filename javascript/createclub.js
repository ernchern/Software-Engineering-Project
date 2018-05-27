/**
 * Created by alisher on 5/27/18.
 */
$( document ).ready( function () {
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
    $("#create_club").click(function() {
        const club_name = myTrim($("#club_name").val());
        const club_desc = myTrim($("#club_desc").val());
        const picture = $("#club_pic").get(0).files[0];
        const picture_name = (+new Date()) + '-' + picture.name;
        const metadata = {
            contentType: picture.type
        };
        if (club_name.length === 0) {
            alert("Please fill in the club name");
        }
        else if (club_desc.length === 0) {
            alert("please fill in the club description");
        }
        else {
            console.log(picture);
            database.ref('clubs/' + club_name).set({
                admin_id: 20140904,
                club_description: club_desc,
                club_picture: picture_name
            });
            storage.ref("photos/" + picture_name).put(picture, metadata).then(function (snapshot) {
                alert("Club Page is created!");
                window.location.href = "club-page.html"
            });
        }

    });
});

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}