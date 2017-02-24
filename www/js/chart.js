function displayPieChart(data,canvasId) {
	
	var config =  { 		               
		animationSteps: 100,
		animationEasing: 'easeInOutQuart',
		labelFontSize: 20,
		animateScale: true,
		segmentStrokeWidth: 20,
	};

	var ctx = document.getElementById(canvasId).getContext("2d");
	new Chart(ctx).Pie(data,config);
}	
