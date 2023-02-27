

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




// Weekly Section
// https://calm-colt-uniform.cyclic.app/projects/

async function getData() {
    try {
        let data = await fetch(`https://calm-colt-uniform.cyclic.app/tasks`, {
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
    console.log(data)
    let dataArray = [];
    let endTimeDataArray = [];
    let totalTimeToShow = 0;
    for (let a = 0; a < data.length; a++) {
        dataArray.push(data[a].totalTimeInSec)
        let aa = data[0].endTime.split(" ");
        let dayname = aa[0];
        let month = aa[1];
        let day = aa[2];
        let year = aa[3];
        endTimeDataArray.push(dayname+" "+day+" "+ month+" "+ year)
        totalTimeToShow += data[a].totalTimeInSec;
    }

    

    


    let hours = Math.floor(totalTimeToShow / 3600);
    let remaining_seconds = totalTimeToShow % 3600;
    let minutes = Math.floor(remaining_seconds / 60);
    let seconds = Math.floor(remaining_seconds % 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    };
    let showExactTIme = hours + ":" + minutes + ":" + seconds;
    console.log(showExactTIme);

    document.querySelector("#totalWorkHour").innerHTML = showExactTIme;




    const barGraph = document.getElementById('BarGraph').getContext('2d');

    new Chart(barGraph, {
        type: 'bar',
        data: {
            labels: endTimeDataArray || ['-'],
            datasets: [{
                label: 'Total Seconds',
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
                let totalTime = item.totalTimeInSec;
                return getAsCard(id, title, totalTime);
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

    let hours = Math.floor(value / 3600);
    let remaining_seconds = value % 3600;
    let minutes = Math.floor(remaining_seconds / 60);
    let seconds = Math.floor(remaining_seconds % 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    };
    let showExactTIme = hours + ":" + minutes + ":" + seconds;



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
                label: `Total Work Hours ${showExactTIme}    Total Work Seconds`,
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




function getAsCard(id, title, totalTime) {
    let hours = Math.floor(totalTime / 3600);
    let remaining_seconds = totalTime % 3600;
    let minutes = Math.floor(remaining_seconds / 60);
    let seconds = Math.floor(remaining_seconds % 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    };
    let showExactTIme = hours + ":" + minutes + ":" + seconds;

    return `
    <div class="data-box data-box-values" data-id="${id}" data-time="${totalTime}">
        <p data-id="${id}" data-time="${totalTime}">${title}</p>
        <p data-id="${id}" data-time="${totalTime}">${hours + " : " + minutes + " : " + seconds}</p>
    </div>
    `;
};




// Weekly Section
document.querySelector("#weekly").addEventListener("click", async function getData() {
    try {
        let data = await fetch(`https://calm-colt-uniform.cyclic.app/tasks`, {
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
                let startTime = item.startTime;
                let endTime = item.endTime;
                let totalTime = item.totalTimeInSec;
                return getAsCard2(id, title, startTime, endTime, totalTime);
            })
            .join("")}
      </div>
  `;
};



function getAsCard2(id, title, startTime, endTime, totalTime) {
    let hours = Math.floor(totalTime / 3600);
    let remaining_seconds = totalTime % 3600;
    let minutes = Math.floor(remaining_seconds / 60);
    let seconds = Math.floor(remaining_seconds % 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    };
    let showExactTIme = hours + ":" + minutes + ":" + seconds;

    return `
    <div class="data-box-detailed" data-id="${id}">
        <p class="give-space-for-project-name">${title}</p>
        <p>${startTime.split("GMT")[0]}</p>
        <p>${endTime.split("GMT")[0]}</p>
        <p>${showExactTIme}</p>
    </div>
    `;
};
