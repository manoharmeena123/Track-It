const urll = "https://faithful-deer-lingerie.cyclic.app";
let intervalIdMap = {};

function restartTimer(id) {
    document.getElementById(`restartButton+${id}`).classList.add("hidden");
    document.getElementById(`restopButton+${id}`).classList.remove("hidden");
    let timerr = document.getElementById(id);
    clearInterval(intervalIdMap[id]);
    intervalIdMap[id] = setInterval(() => startTimer(timerr), 1000);
}

async function stopTimer(id, prName) {
    document.getElementById(`restartButton+${id}`).classList.remove("hidden");
    document.getElementById(`restopButton+${id}`).classList.add("hidden");
    clearInterval(intervalIdMap[id]);
    let x = document.getElementById(id);
    x = timeStringToMilliseconds(x.innerHTML);

    let updatedObj = {
        "totalTime": x,
        "projectName": prName
    };

    try {
        const response = await fetch(`${urll}/tasks/updateTimer/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("user")
            },
            body: JSON.stringify(updatedObj),
        });
        await response.json();
    } catch (error) {
        console.error(error);
    }
}

function startTimer(timerr) {
    var time = timerr.innerHTML;
    var timeArray = time.split(":");
    var hours = parseInt(timeArray[0]);
    var minutes = parseInt(timeArray[1]);
    var seconds = parseInt(timeArray[2]);

    if (seconds < 59) {
        seconds++;
    } else {
        seconds = 0;
        if (minutes < 59) {
            minutes++;
        } else {
            minutes = 0;
            hours++;
        }
    }

    var newTime = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    timerr.innerHTML = newTime;
}



function timeStringToMilliseconds(timeString) {
    const timeParts = timeString.split(':');
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const seconds = parseInt(timeParts[2]);
    return ((hours * 60 + minutes) * 60 + seconds) * 1000;
}