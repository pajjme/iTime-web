window.onload = function() {

	startApp();
	//displayChart();
	document.getElementById("info1").innerHTML = currentStartDate.toISOString().substring(0,10);
	document.getElementById("info2").innerHTML = currentEndDate.toISOString().substring(0,10);
	document.getElementById("totsum").innerHTML = 9000;


};

function displayChart() {
	var data = {
		labels: [
			"Red",
			"Blue",
			"Yellow"
		],
		datasets: [{
			data: [300, 50, 100],
			backgroundColor: [
				"#FF6384",
				"#36A2EB",
				"#FFCE56"
			],
			hoverBackgroundColor: [
				"#FF6384",
				"#36A2EB",
				"#FFCE56"
			]
		}]
	};

	displayPieChart(data, "canvas");
}
