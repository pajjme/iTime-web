var startApp = function() {
    //document.getElementById("gSignOutWrapper").style.visibility="hidden"
    gapi.load('auth2', function(){
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
        client_id: '856845744679-fr7uheupsjm65udbao75b6no8vjl8cm0.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'https://www.googleapis.com/auth/calendar'
    });
    //attachClickHandler(document.getElementById('customBtn1'), {}, function(googleUser) {googleUser.signIn();}, function() {window.alert(0)}); 
    //attachSignin(document.getElementById('customBtn'));
    auth2.attachClickHandler(
        document.getElementById('customBtn'), //what document element is the click attached to
        {}, //OPTIONS
        function() {auth2.grantOfflineAccess().then(function(resp) {document.getElementById('gSignInWrapper').style.visibility="hidden";document.getElementById("gSignOutWrapper").style.visibility="visible"/*ADD function that sends resp repackaged with the email as a json*/})}, 
        function(error) {window.alert(0)}
    );
    document.getElementById('customBtn2').addEventListener("click", function() {auth2.disconnect(); document.getElementById('gSignInWrapper').style.visibility="visible";document.getElementById("gSignOutWrapper").style.visibility="hidden"});
    });
};


