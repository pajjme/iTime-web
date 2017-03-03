var startApp = function() {
	gapi.load('auth2', function(){
	// Retrieve the singleton for the GoogleAuth library and set up the client.
	auth2 = gapi.auth2.init({
		client_id: '856845744679-fr7uheupsjm65udbao75b6no8vjl8cm0.apps.googleusercontent.com',
		cookiepolicy: 'single_host_origin',
		scope: 'https://www.googleapis.com/auth/calendar'
	});

	var r = new buttonhider(document.getElementById('gSignInWrapper'),document.getElementById("gSignOutWrapper"));
	auth2.attachClickHandler(
		document.getElementById('customBtn'), //what document element is the click attached to
		{}, //OPTIONS
		function() {auth2.grantOfflineAccess().then(function(resp) {
			console.log(resp.code);
			r.swapVisibility("hidden","visible");
			var s = new sender(resp);
			s.sendToServ("http://127.0.0.1:5000/login");
			 /*var p = new sender(resp,"jonas"); p.makeJSON();/*ADD function that sends resp repackaged with the email as a json*/
		})}, 
		function(error) {window.alert(0)}
	);
	document.getElementById('customBtn2').addEventListener("click", function() {auth2.disconnect(); r.swapVisibility("visible","hidden")});
	});
};


class sender{
	constructor(authorization_code){
		this.authorization_code = "{auth_code: "+authorization_code.code+" }"
	};
	sendToServ(stri){
		var req = new XMLHttpRequest();
		req.open("POST",stri);
		req.onreadystatechange = function() {//Call a function when the state changes.
    		if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
        		console.log(req.response)
    		}		
		}
		req.send(JSON.stringify(this.authorization_code));
	}
	
	makeString(){
		return("info: "+this.info+", data:"+this.data)
	}
}

class buttonhider{
	constructor(elem1,elem2){
		this.elem1 = elem1;
		this.elem2 = elem2;
		}

	swapVisibility(first,second){
		this.elem1.style.visibility = first
		this.elem2.style.visibility = second
	}

}

