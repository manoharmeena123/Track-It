const url = "https://faithful-deer-lingerie.cyclic.app";


// To Fetch and Show the Projects Data in select tag
async function getAllProjects() {
    let id = localStorage.getItem("email");
    try {
        let data = await fetch(`${url}/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                authorization: localStorage.getItem("user"),
            },
        });

        let res = await data.json();

        if (res.length == 0) {
        } else {
            let array = [];
            array = res.map((item) => {
                return `
                    <option value="${item.projectName}">${item.projectName}</option>
                `;
            });
            document.getElementById("project__list").innerHTML += array;
        }
    } catch (error) {
        console.log("Error while getting userData " + error);
    }
}
getAllProjects();






var startingTime;
var task;
const timer = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

let startTime;
let intervalId;


async function startTimer() {
    let taskName = document.querySelector("#Timetracker__description");
    let projectName = document.querySelector("#project__list");
    let email = localStorage.getItem("email");

    if (taskName.value == "") {
        alert("Please add Task Name");
        return;
    } else if (projectName.value == "") {
        alert("Please select Project Name");
        return;
    } else if (email == "" || email == undefined || email == null) {
        alert("Please Login");
        window.location.href = "../files/login.html";
        return;
    }

    document.getElementById("startButton").style.display = "none";
    document.getElementById("stopButton").style.display = "block";

    const now = new Date();
    const utcTime = now.toISOString();
    let obj = {
        task: taskName.value,
        date: utcTime,
        startTime: utcTime,
        user: email,
        projectName: projectName.value,
    };

    try {
        const response = await fetch(`${url}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("user"),
            },
            body: JSON.stringify(obj),
        });
        const data = await response.json();
        if (
            data.msg == "Task already Exist" ||
            data.msg == "Something went wrong please try again"
        ) {
            alert(data.msg);
            return;
        } else {
            localStorage.setItem("startingTaskID", data._id);
            localStorage.setItem("startingTaskTime", data.startTime);
            localStorage.setItem("projectName", data.projectName);
            task = data._id;
        }
    } catch (error) {
        console.error(error);
    }

    startingTime = new Date();
    intervalId = setInterval(updateTimer, 1000);
}


async function stopTimer() {
    document.getElementById("startButton").style.display = "block";
    document.getElementById("stopButton").style.display = "none";
    clearInterval(intervalId);


    let prName = localStorage.getItem("projectName");
    let getID = localStorage.getItem("startingTaskID");

    const startingTaskTime = localStorage.getItem("startingTaskTime");
    const startDate = new Date(startingTaskTime);

    const now = new Date();
    const utcTime = now.toISOString();
    let endTime = utcTime;
    let totalTime = now - startDate;

    let updatedObj = {
        "endTime": endTime,
        "totalTime": totalTime
    };

    try {
        const response = await fetch(`${url}/tasks/update/${getID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("user"),
                "projectname": prName
            },
            body: JSON.stringify(updatedObj),
        });
        const data = await response.json();
        console.log(data);
        if (data.msg == "Updated Successfully") {
            location.reload();
        }
    } catch (error) {
        console.error(error);
    }
};

function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = new Date(currentTime - startingTime);
    const hours = elapsedTime.getUTCHours().toString().padStart(2, "0");
    const minutes = elapsedTime.getUTCMinutes().toString().padStart(2, "0");
    const seconds = elapsedTime.getUTCSeconds().toString().padStart(2, "0");
    timer.innerText = `${hours}:${minutes}:${seconds}`;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);






// Show all data list
async function getAllTasks() {
    const id = localStorage.getItem("email");
    try {
        let data = await fetch(`${url}/tasks/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                authorization: localStorage.getItem("user"),
            },
        });
        let res = await data.json();
        displayTimeTracker(res);
    } catch (error) {
        console.log("Error", error);
    }
}
getAllTasks();





// Render Function
function displayTimeTracker(array) {
    let ans = array.map((item) => {
        // converting date into readable format
        const dateString = item.date;
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const formattedDate = date.toLocaleString('en-US', options);

        // Converting total time
        const milliseconds = item.totalTime;
        const seconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;




        return `
            <div class="Timetracker__body__info">
                <div>
                    <span>Started : <b>${formattedDate}</b> </span>
                </div>
                <div>
                    <p>Task :  <span><b>${item.task.substring(0, 150)}</b></span></p>
                </div>
                <div>
                    <span>Project Name : <b>${item.projectName.substring(0, 50)}</b></span>
                </div>
                <div>
                    <span>Total Time :  <b id="${item._id}">${timeString}</b></span>
                </div>
                <div>
                    <button id="restartButton+${item._id}" class="show cssButton" onClick='restartTimer("${item._id}")'>Restart</button>
                    <button id="restopButton+${item._id}" class="hidden cssButton" onClick='stopTimer("${item._id}", "${item.projectName}")'>Stop</button>
                </div>
                <div>
                    <i title=${item.task} onClick="deleteTimeTracker('${item._id}', '${item.projectName}', '${item.totalTime}')" class="far fa-trash-alt"></i>
                </div>
            </div>`
    }).join("");

    document.getElementById("Timetracker__body").innerHTML = ans;
}



async function deleteTimeTracker(id, projectName, totalTime) {
    const confirmed = confirm("Do you really want to delete Task?");

    if (confirmed) {
        try {
            const response = await fetch(`${url}/tasks/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("user"),
                    "projectname": projectName,
                    "totaltime": totalTime
                }
            });
            await response.json();
            getAllTasks();
        } catch (error) {
            console.error(error);
        }
    }
}
