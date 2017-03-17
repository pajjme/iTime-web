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


function updatePieChart(startDateFormatted, endDateFormatted) {
	generalHttpCommunicator = new httpCommunicator();
	let endpoint = "http://127.0.0.1:5000/v1/stats";
	let params = 
	{
		from: startDateFormatted,
		to: endDateFormatted,
	} 
	let url = endpoint+formatParams(params);
	console.log(url);
	generalHttpCommunicator.communicateWithServer(url,null,"GET").then(
		function(resp){
			validate(resp.data);
			displayPieChart(resp.data,canvas);
			let totalSum = resp.data.reduce(function(acc, val) {return acc + val;}, 0);
			return [resp.bool[0],resp.bool[1],1,totalSum];
		},
		function(){
			return [0,0,0,0];
		}
	)
}



function moveDate(direction,days,currentDate){
	let newdat = new Date(currentDate);
	newdat.setDate(newdat.getDate()+(direction)*days);
	return newdat;
}

function getDateFormatted(day,month,year) {
	let ret = new Date(year,month,day+1);
	return ret.toISOString().substring(0,10);
}

//By James Forbes of StackOverflow (http://stackoverflow.com/questions/8064691/how-do-i-pass-along-variables-with-xmlhttprequest)

function formatParams(params){
	return "?" + Object
		.keys(params)
		.map(function(key){
			return key+"="+params[key]
		})
 		.join("&")
}	
