var startApp = function() {
	gapi.load('auth2', function(){
		var startAppHttpCommunicator = new httpCommunicator();
		var startAppHtmlElementManager = new htmlElementStyleManager(document.getElementById('gSignInWrapper'),
			document.getElementById("gSignOutWrapper"));
		// Retrieve the singleton for the GoogleAuth library and set up the client.
		auth2 = gapi.auth2.init({
			client_id: '856845744679-fr7uheupsjm65udbao75b6no8vjl8cm0.apps.googleusercontent.com',
			cookiepolicy: 'single_host_origin',
			scope: 'https://www.googleapis.com/auth/calendar'
		});
	
		auth2.attachClickHandler(
			document.getElementById('customBtn'), //what document element is the click attached to
			{}, //OPTIONS
			function() {auth2.grantOfflineAccess().then(function(resp) {
				console.log(resp.code);
				startAppHtmlElementManager.swapVisibility(0,1,"hidden","visible");
				var dataToBeSent = {auth_code: resp.code}
				startAppHttpCommunicator.sendToServer("http://127.0.0.1:5000/login",dataToBeSent);
			})}, 
			function(error) {window.alert(0)}
		);
		document.getElementById('customBtn2').addEventListener("click", function() {
			auth2.disconnect()
			startAppHtmlElementManager.swapVisibility(0,1,"visible","hidden")
		});
	});
	document.getElementById('customBtn3').addEventListener("click", function() {
		gapi.client.load('calendar', 'v3', function() {
    		var request = gapi.client.calendar.calendars.insert({
      			'summary': "LOL28637"
    		});     
    		request.execute(function(resp) {
      			console.log(resp)
    		});
  		});	
	});
	document.getElementById('customBtn4').addEventListener("click", function() {
		var calendarListObj;
		gapi.client.load('calendar', 'v3', function() {
    		var request = gapi.client.calendar.calendarList.list();     
    		request.execute(function(resp) {
    			console.log(resp.items[0].id)
      			var request2 = gapi.client.calendar.calendars.delete({
      				'calendarId': resp.items[0].id
      			});     
    				request2.execute(function(resp) {
      					console.log(resp)
    			});
    		})
		});
	});
}