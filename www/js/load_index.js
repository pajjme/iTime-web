window.onload = function() {
	var pieData = [
		{
			value : 30,
			color : "#F38630",
			label : 'Sleep',
			labelColor : 'white',
		},
		{
			value : 30,
			color : "#F34353",
			label : 'Sleep',
			labelColor : 'white',
		},
		{
			value : 30,
			color : "#F37364",
			label : 'SleepHej',
			labelColor : 'blue',
		}

	];

	displayPieChart(pieData,"canvas");
};
