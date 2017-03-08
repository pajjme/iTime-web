class httpCommunicator{
	constructor(){};
	communicateWithServer(url,data,type){
		return new Promise(function(resolve,reject){
			let req = new XMLHttpRequest()
			req.open(type,url)
			req.onload = function() {
    			if(req.status == 200) {
    				console.log(req.response)
        			resolve(req.response);
    			}		
    			else{
    				reject(Error(req.statusText));
    			}
			}
			switch(type){
				case "POST":
					req.send(JSON.stringify(data));
					break;
				case "GET":
					req.send()
			}
		})
	}
	/* OLD
	getFromServer(url, reqD){
		return new Promise(function(resolve, reject){
			let req = new XMLHttpRequest()
			req.open("GET",url)
			req.onload = function() {
    			if(req.status == 200) {
        			resolve(req.response)
    			}
    			else{
    				reject(Error(req.statusText))
    			}		
			}
			req.send()
		})	
	}*/
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
