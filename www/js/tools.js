class httpCommunicator{
	constructor(){
	};
	sendToServer(url,data){
		var req = new XMLHttpRequest()
		req.open("POST",url)
		req.onreadystatechange = function() {
    		if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
        		console.log(req.response)
    		}		
		}
		req.send(JSON.stringify(data));
	}
	getFromServer(url){
		return new Promise(function(resolve, reject){
			var req = new XMLHttpRequest()
			req.open("GET",url)
			req.onreadystatechange = function() {
    			if(req.status == 200) {
        			resolve(req.response)
    			}
    			else{
    				reject(Error(req.statusText))
    			}		
			}
			req.send()
		})	
	}
}



class htmlElementStyleManager{
	constructor(htmlElementId){
		this.elements = Array.from(arguments)
	}

	swapVisibility(e1,e2,vis1,vis2){
		this.elements[e1].style.visibility = vis1
		this.elements[e2].style.visibility = vis2
	}
}


