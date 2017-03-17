let startApp = function() {
	let startAppHttpCommunicator = new httpCommunicator();
	let startAppHtmlElementManager = new htmlElementStyleManager(document.getElementById('gSignInWrapper'),	document.getElementById("gSignOutWrapper"));
	gapi.load('auth2', function(){
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
				document.getElementById('remItime').style.visibility = "visible"
				let dataToBeSent = {auth_code: resp.code}
				startAppHttpCommunicator.communicateWithServer("http://127.0.0.1:5000/login",dataToBeSent,"POST").then(function(resp){
					if(resp == 1){
						gapi.client.load('calendar', 'v3', function() {
    						let request = gapi.client.calendar.calendars.insert({
      							'summary': "iTime-Calendar-0001"
    						});     
    						request.execute(function(resp) {
      							console.log("new account created")
    						});
  						});	
					}
					else{
						console.log("account already exists")
					}
				});
			})}, 
			function(error) {window.alert(0)}
		);

	//Revokes the authentication with the google api.
		document.getElementById('customBtn2').addEventListener("click", function() {
			auth2.disconnect()
			startAppHtmlElementManager.swapVisibility(0,1,"visible","hidden")
			document.getElementById('remItime').style.visibility = "hidden"
		});
	});

	//This button removes the iTime calendar if such a calendar exists on in the user's google calendar

	document.getElementById('removeCalendarButton').addEventListener("click", function() {
		let calendarListObj;
		gapi.client.load('calendar', 'v3', function() {
    		let request = gapi.client.calendar.calendarList.list();     
    		request.execute(function(resp) {
    			console.log(resp)
    			var idToBeDeleted = resp.items.find(x => x.summary == "iTime-Calendar-0001")
    			if(!(idToBeDeleted == undefined)){	 
    				console.log(idToBeDeleted.id)
      				let request2 = gapi.client.calendar.calendars.delete({
      					'calendarId': idToBeDeleted.id
      				});     
    					request2.execute(function(resp) {
      						console.log("iTime calendar deleted")
    				});
    			}
    			else{
    				console.log("No iTime calendar exists")
    			}
    		})
		});
	});

	/*Gets (hopefully, not tested with BE) user data from the week before the currently selected week and changes the currently
	selected week to the previous week.*/

	document.getElementById('prev').addEventListener("click", function() {
		let newdate = moveDate(-1,7,currentStartDate);
		let ret = updatePieChart(newdate.toISOString().substring(0,10),currentStartDate.toISOString().substring(0,10));
		if(ret[2]){
			currentEndDate = currentStartDate;
			currentStartDate = newdate;
			document.getElementById('info1').innerHTML = currentStartDate.toISOString().substring(0,10);
			document.getElementById('info2').innerHTML = currentEndDate.toISOString().substring(0,10);
			document.getElementById('tot').innerHTML = ret[3];

		}
		else{
			console.log("NO CALENDAR DATA FOR THAT MONTH");
			document.getElementById('prev').style.visibility = "hidden";
		}
		if(ret[1]){
			document.getElementById('prev').style.visibility = "hidden";
		}
		if(document.getElementById('next').style.visibility === "hidden"){
			document.getElementById('next').style.visibility = "visible";
		}
	})

	/*Gets (hopefully, not tested with BE) user data from the week after the currently selected week and changes the currently
	selected week to the next week.*/

	document.getElementById('next').addEventListener("click", function() {
		let newdate = moveDate(1,7,currentEndDate);
		let ret = updatePieChart(currentEndDate.toISOString().substring(0,10),newdate.toISOString().substring(0,10));
		if(ret[2]){
			currentStartDate = currentEndDate;
			currentEndDate = newdate;
			document.getElementById('info1').innerHTML = currentStartDate.toISOString().substring(0,10);
			document.getElementById('info2').innerHTML = currentEndDate.toISOString().substring(0,10);
			document.getElementById('tot').innerHTML = ret[3];
		}
		else{
			console.log("NO CALENDAR DATA FOR THAT MONTH");
			document.getElementById('next').style.visibility = "hidden";
		}
		if(ret[1]){
			document.getElementById('next').style.visibility = "hidden";
		}
		if(document.getElementById('prev').style.visibility === "hidden"){
			document.getElementById('prev').style.visibility = "visible";
		}
	})
}