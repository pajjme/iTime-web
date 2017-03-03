class commWrapper{
	constructor(){
		if(arguments.length > 0) {this.authorization_code = "{auth_code: "+arguments[0].code+" }"}
	};
	sendToServ(stri){
		var req = new XMLHttpRequest()
		req.open("POST",stri)
		req.onreadystatechange = function() {
    		if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
        		console.log(req.response)
    		}		
		}
		req.send(JSON.stringify(this.authorization_code));
	}
	getFromServ(stri){
		return new Promise(function(resolve, reject){
			var req = new XMLHttpRequest()
			req.open("GET",stri)
			req.onreadystatechange = function() {
    			if(req.status == 200) {
        			resolve(req.response)
    			}
    			else{
    				reject(Error(req.statusText))
    			}		
			}
			req.send()})	
	}
	makeString(){
		return("info: "+this.info+", data:"+this.data)
	}
}



class elementManager{
	constructor(){
		this.elements = Array.from(arguments)
		}

	swapVisibility(e1,e2,first,second){
		this.elements[e1].style.visibility = first
		this.elements[e2].style.visibility = second
	}

	updateData(e1){
		var com = commWrapper()
		var data = com.getFromServ()

	} 
}


