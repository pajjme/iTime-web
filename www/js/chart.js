function displayPieChart(data,config,canvasId) {
	var ctx = document.getElementById(canvasId).getContext("2d");
	new Chart(ctx).Pie(data,config);
}	
