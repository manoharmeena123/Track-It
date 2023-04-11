

let summary = document.querySelector("#summary");
let weekly = document.querySelector("#weekly");

summary.addEventListener("click", () => {
    document.getElementById("weeklySection").style.display = "none";
    document.getElementById("weekly").style.backgroundColor = "white";
    document.getElementById("weekly").style.color = "black";

    document.getElementById("summary").style.backgroundColor = "#E4EAEE";
    document.getElementById("summary").style.color = "black";
    document.getElementById("showSummary").style.display = "block";
});

weekly.addEventListener("click", () => {
    document.getElementById("showSummary").style.display = "none";
    document.getElementById("summary").style.backgroundColor = "white";
    document.getElementById("summary").style.color = "black";

    document.getElementById("weekly").style.backgroundColor = "#E4EAEE";
    document.getElementById("weekly").style.color = "black";
    document.getElementById("weeklySection").style.display = "block";
});




async function getData() {
    let id = localStorage.getItem("email");
    try {
        let data = await fetch(`https://faithful-deer-lingerie.cyclic.app/tasks/${id}`, {
            method: "GET",
            headers: {
                'Content-type': "application/json",
                'authorization': localStorage.getItem("user")
            }
        });
        let res = await data.json();
        renderBarGraph(res);
        renderCardList(res);
    } catch (error) {
        console.log("Error while getting userData " + error);
    }
};
getData();

function renderBarGraph(data) {
    let dataArray = [];
    let endTimeDataArray = [];
    let totalTimeToShow = 0;
    for (let a = 0; a < data.length; a++) {



        // converting endTime into readable form
        const date = new Date(data[a].date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const day = date.getUTCDate();
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const year = date.getUTCFullYear();
        const formattedDate = `${dayName} ${day}-${month}-${year}`;
        endTimeDataArray.push(formattedDate)



        totalTimeToShow += data[a].totalTime;
        dataArray.push(data[a].totalTime)
    }


    const milliseconds = totalTimeToShow;
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    var timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;





    document.querySelector("#totalWorkHour").innerHTML = timeString;




    const barGraph = document.getElementById('BarGraph').getContext('2d');

    new Chart(barGraph, {
        type: 'bar',
        data: {
            labels: endTimeDataArray || ['-'],
            datasets: [{
                label: 'Total miliseconds',
                data: dataArray || [0],
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
}







function renderCardList(data) {
    let main = document.querySelector(".dataShow")
    main.innerHTML = `
      <div class="data-box">
          ${data
            .map((item) => {
                let id = item._id;
                let title = item.task;
                let totalTimeinMiliSeconds = item.totalTime;
                const milliseconds = item.totalTime;
                const seconds = Math.floor(milliseconds / 1000);
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const remainingSeconds = seconds % 60;
                var timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
                return getAsCard(id, title, timeString, totalTimeinMiliSeconds);
            })
            .join("")}
      </div>
  `;


    let allDataList = document.querySelectorAll(".data-box-values");
    for (let key of allDataList) {
        key.addEventListener("click", (e) => {
            let showValue = e.target.dataset.time;
            showInPieChart(showValue);
        })
    }
}



function showInPieChart(value) {

    let milliseconds = value;
    let seconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;
    var timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    let showExactTIme = timeString;



    let pieChartSection = document.querySelector("#pie-graph-section")
    pieChartSection.innerHTML = "";

    let canvas = document.createElement("canvas");
    {/* <canvas id="pieChart"></canvas> */ }
    canvas.setAttribute('id', 'pieChart');
    pieChartSection.append(canvas);

    let pieChart = document.getElementById('pieChart').getContext('2d')


    new Chart(pieChart, {
        type: 'doughnut',
        data: {
            labels: ['Total Work Hours'],
            datasets: [{
                label: `Total Work Hours ${showExactTIme}    Total Work miliseconds`,
                data: [value],
                backgroundColor: [getRandomColor()],
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
}

function getRandomColor() {
    // generate random RGB values
    var r, g, b;
    do {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    } while (r < 100 || g < 100 || b < 100);

    // convert to hex string
    var hex = "#" + r.toString(16) + g.toString(16) + b.toString(16);

    return hex;
}




function getAsCard(id, title, totalTime, totalTimeinMiliSeconds) {
    return `
    <div class="data-box data-box-values" data-id="${id}" data-time="${totalTimeinMiliSeconds}">
        <p data-id="${id}" data-time="${totalTimeinMiliSeconds}">${title}</p>
        <p data-id="${id}" data-time="${totalTimeinMiliSeconds}">${totalTime}</p>
    </div>
    `;
};




// Weekly Section
document.querySelector("#weekly").addEventListener("click", async function getData() {
    let id = localStorage.getItem("email");
    try {
        let data = await fetch(`https://faithful-deer-lingerie.cyclic.app/tasks/${id}`, {
            method: "GET",
            headers: {
                'Content-type': "application/json",
                'authorization': localStorage.getItem("user")
            }
        });
        let res = await data.json();

        renderCardList2(res);
    } catch (error) {
        console.log("Error while getting userData " + error);
    }
});



function renderCardList2(data) {
    let main = document.querySelector(".dataShowforDetailedSection");
    main.innerHTML = "";
    main.innerHTML = `
      <div class="dataShowforDetailedSection">
          ${data
            .map((item) => {
                let id = item._id;
                let title = item.task;

                const date = new Date(item.endTime);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                const day = date.getUTCDate();
                const month = date.toLocaleDateString('en-US', { month: 'long' });
                const year = date.getUTCFullYear();
                const hours = date.getUTCHours().toString().padStart(2, '0');
                const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                const seconds = date.getUTCSeconds().toString().padStart(2, '0');
                const formattedDate = `${dayName} ${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;





                let startTime = item.startTime;
                let totalTime = item.totalTime;
                return getAsCard2(id, title, startTime, formattedDate, totalTime);
            })
            .join("")}
      </div>
  `;
};



function getAsCard2(id, title, startTime, endTime, totalTime) {

    const date = new Date(startTime);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const day = date.getUTCDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getUTCFullYear();
    const hourss = date.getUTCHours().toString().padStart(2, '0');
    const minutess = date.getUTCMinutes().toString().padStart(2, '0');
    const secondss = date.getUTCSeconds().toString().padStart(2, '0');
    const formattedDate = `${dayName} ${day}-${month}-${year} ${hourss}:${minutess}:${secondss}`;




    let milliseconds = totalTime;
    let seconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;
    var timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

    let showExactTime = timeString;

    return `
    <div class="data-box-detailed" data-id="${id}">
        <p class="give-space-for-project-name">${title}</p>
        <p>${formattedDate}</p>
        <p>${endTime}</p>
        <p>${showExactTime}</p>
    </div>
    `;
};
