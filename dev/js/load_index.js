window.onload = function() {

	startApp();
	displayChart();
	document.getElementById("info").innerHTML = val;
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
