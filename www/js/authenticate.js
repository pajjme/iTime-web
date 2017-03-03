var startApp = function() {
	gapi.load('auth2', function(){
	// Retrieve the singleton for the GoogleAuth library and set up the client.
	auth2 = gapi.auth2.init({
		client_id: '856845744679-fr7uheupsjm65udbao75b6no8vjl8cm0.apps.googleusercontent.com',
		cookiepolicy: 'single_host_origin',
		scope: 'https://www.googleapis.com/auth/calendar'
	});

	var r = new htmlElementStyleManager(document.getElementById('gSignInWrapper'),document.getElementById("gSignOutWrapper"));
	auth2.attachClickHandler(
		document.getElementById('customBtn'), //what document element is the click attached to
		{}, //OPTIONS
		function() {auth2.grantOfflineAccess().then(function(resp) {
			console.log(resp.code);
			r.swapVisibility(0,1,"hidden","visible");
			var s = new httpCommunicator();
			var dataToBeSent = {auth_code: resp.code}
			s.sendToServer("http://127.0.0.1:5000/login",dataToBeSent);
		})}, 
		function(error) {window.alert(0)}
	);
	document.getElementById('customBtn2').addEventListener("click", function() {auth2.disconnect(); r.swapVisibility(0,1,"visible","hidden")});
	});
};