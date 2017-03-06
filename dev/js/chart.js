function displayPieChart(data,canvasId) {
	
	var options =  { 		               
		animationSteps: 100,
		animationEasing: 'easeInOutQuart',
		labelFontSize: 20,
		animateScale: true,
		segmentStrokeWidth: 20,
	};

	var ctx = document.getElementById(canvasId).getContext("2d");
	
	var myPieChart = new Chart(ctx,{
    	type: 'pie',
    	data: data,
    	options: options
	});
}	
