let summary = document.querySelector("#summary");
let weekly = document.querySelector("#weekly");

summary.addEventListener("click", ()=>{
    document.getElementById("weeklySection").style.display="none";
    document.getElementById("weekly").style.backgroundColor="white";
    document.getElementById("weekly").style.color="black";

    document.getElementById("summary").style.backgroundColor="#E4EAEE";
    document.getElementById("summary").style.color="black";
    document.getElementById("showSummary").style.display="block";
});

weekly.addEventListener("click", ()=>{
    document.getElementById("showSummary").style.display="none";
    document.getElementById("summary").style.backgroundColor="white";
    document.getElementById("summary").style.color="black";

    document.getElementById("weekly").style.backgroundColor="#E4EAEE";
    document.getElementById("weekly").style.color="black";
    document.getElementById("weeklySection").style.display="block";
});






const barGraph = document.getElementById('BarGraph').getContext('2d');

new Chart(barGraph, {
    type: 'bar',
    data: {
        labels: ['20 Feb', '21 Feb', '22 Feb', '23 Feb', '24 Feb', '25 Feb', '26 Feb'],
        datasets: [{
            label: 'Total Week Hours',
            data: [12, 19, 3, 5, 2, 3, 2],
            backgroundColor: ['#36A2EB', '#FF6384', '#4BC0C0', '#FF9F40', '#9966FF', 'royalblue'],
            barThickness: 100,
            borderRadiuns: {
                topRight: 10
            }
        }
    ]
    },
    option: {
        responsive: true,
    } 
});



const pieChart = document.getElementById('pieChart').getContext('2d');

new Chart(pieChart, {
    type: 'doughnut',
    data: {
        labels: ['Total Work Hours'],
        datasets: [{
            label: 'Total Week Hours',
            data: [12],
            backgroundColor: ['#36A2EB'],
            barThickness: 100,
            borderRadiuns: {
                topRight: 10
            }
        }
    ]
    },
    option: {
        responsive: true,
    } 
});