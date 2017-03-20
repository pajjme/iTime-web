let startApp = function() {
	let calId;
	let startAppHttpCommunicator = new httpCommunicator();
	let startAppHtmlElementManager = new htmlElementStyleManager(document.getElementById('loginbutton'),	document.getElementById("logoutbutton"));
	gapi.load('auth2', function(){
		auth2 = gapi.auth2.init({
			client_id: '856845744679-fr7uheupsjm65udbao75b6no8vjl8cm0.apps.googleusercontent.com',
			cookiepolicy: 'single_host_origin',
			scope: 'https://www.googleapis.com/auth/calendar'
		});
		auth2.attachClickHandler(
			document.getElementById('loginbutton'), //what document element is the click attached to
			{}, //OPTIONS
			function() {auth2.grantOfflineAccess().then(function(resp) {
				console.log(resp.code);
				startAppHtmlElementManager.swapVisibility(0,1,"hidden","visible");
				let dataToBeSent = {auth_code: resp.code}
				startAppHttpCommunicator.communicateWithServer("http://127.0.0.1:5000/login",dataToBeSent,"POST").then(function(resp){
					if(resp == 1){
						gapi.client.load('calendar', 'v3', function() {
    						let request = gapi.client.calendar.calendars.insert({
      							'summary': "iTime-Calendar-0001"
    						});     
    						request.execute(function(resp) {
      							console.log("new account created")
      							calId = resp.id;
      							console.log(resp.id);
    						});
  						});	
					}
					else{
						console.log("account already exists")
					}
					document.getElementById('mainContainer').style.visibility = "visible"
					displayChart();//testing
					//REAL CODE:
					/*let d = new date();
					updatePieChart(moveDate(7,-1, d).toISOString().substring(0,10),d.toISOString().substring(0,10))*/
				});
			})}, 
			function(error) {window.alert(0)}
		);

	//Revokes the authentication with the google api.
		document.getElementById('logoutbutton').addEventListener("click", function() {
			auth2.disconnect()
			startAppHtmlElementManager.swapVisibility(0,1,"visible","hidden")
			document.getElementById('mainContainer').style.visibility = "hidden"
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



//adds elements to a the calendar.

	document.getElementById('addEvent').addEventListener("click", function() {
		let frm = document.getElementById('addEventForm');
		let year = parseInt(frm.elements[1].value.substring(0,4));
		let month = parseInt(frm.elements[1].value.substring(5,7))-1; //Horrible datehack here as well. :)
		let day = parseInt(frm.elements[1].value.substring(8,10));
		let sDate = new Date(year,month,day,parseInt(frm.elements[2].value.substring(0,2)),parseInt(frm.elements[2].value.substring(3,5)));
		let eDate = new Date(year,month,day,parseInt(frm.elements[3].value.substring(0,2)),parseInt(frm.elements[3].value.substring(3,5)));
		sDate = sDate.toISOString();
		eDate = eDate.toISOString();

		let event = {
			"summary" :frm.elements[0].value,
			"description" : '#'+frm.elements[4].value,
			"start" : {
				"dateTime" : sDate,
				"timeZone" : "Europe/Stockholm"
			},
			"end" : {
				"dateTime" : eDate,
				"timeZone" : "Europe/Stockholm"
			}
		}

		gapi.client.load('calendar', 'v3', function() {
			let request = gapi.client.calendar.events.insert({
				'calendarId' : calId,
				'resource' : event
			});
			request.execute(function(resp){
				console.log("event inserted");
			})
		})
		for (var i = 0; i < frm.length-1; i++) {
			frm.elements[i].value = "";
		}

	})

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