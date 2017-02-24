var googleUser = {};
var startApp = function() {
	gapi.load('auth2', function(){
		// Retrieve the singleton for the GoogleAuth library and set up the client.
		auth2 = gapi.auth2.init({
			client_id: '856845744679-fr7uheupsjm65udbao75b6no8vjl8cm0.apps.googleusercontent.com',
			cookiepolicy: 'single_host_origin',
		});
		attachSignin(document.getElementById('customBtn'));
		auth2.attachClickHandler(document.getElementById('customBtn2'), {}, function() {auth2.disconnect();}, function() {window.alert(0)});
	});
}

function attachSignin(element) {
console.log(element.id);
auth2.attachClickHandler(element, {},
	function(googleUser) {
		document.getElementById('name').innerText = "Signed in: " +
			googleUser.getBasicProfile().getName();
	},function(error) {
		alert(JSON.stringify(error, undefined, 2));
	});
}





