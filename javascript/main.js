var config = {
apiKey: "AIzaSyAvVTgyZW_IpBkNyWKDUFnJjNKlDlcl7Bo",
authDomain: "kaist-scms.firebaseapp.com",
databaseURL: "https://kaist-scms.firebaseio.com",
projectId: "kaist-scms",
storageBucket: "",
messagingSenderId: "716217260337"
};
firebase.initializeApp(config);

$( document ).ready( function () {
    $('#logOut').click(function(event){
        event.preventDefault();
        console.log("click");
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("Signed out")
        }).catch(function(error) {
            // An error happened.
            alert(error.message);
        });

    });
});
