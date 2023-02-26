// Graph
var ctx = document.getElementById("myChart");

var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      
      "Monday, Feb 20",
      "Tuesday, Feb 21",
      "Wednesday, Feb 22",
      "Thursday, Feb 23",
      "Friday, Feb 24",
      "Saturday, Feb 25",
    ],
    datasets: [
      {
        data: [1000, 21345 , 18483, 24003, 23489, 24092, 12034],
        lineTension: 0,
        backgroundColor: "transparent",
        borderColor: "#007bff",
        borderWidth: 4,
        pointBackgroundColor: "#007bff",
      },
    ],
  },
  options: {
    tooltips: {
        callbacks: {
          label: (item) => `${item.yLabel} GB`,
        },
      },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
          scaleLabel: {
            display: true,
            labelString: 'Temperature'

        },

        labels:{display:true},
        label:(item) => `${item.yLabel} GB`,
        },
      ],
    },
    legend: {
      display: false,
    },

  },
});