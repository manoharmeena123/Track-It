let playBtn = document.getElementById("playbutton")

function youtubeVideo() {
    window.location.href = "https://youtu.be/NMZhFs_b0Aw"
}


let check = document.getElementById("check")
let videoImg = document.getElementById("videoImg")
check.addEventListener("click", (e) => {
    if (check.checked === false) {
        videoImg.setAttribute("src", "https://clockify.me/assets/images/time-tracker-screenshot.svg")
    }
    else {
        videoImg.setAttribute("src", "https://clockify.me/assets/images/time-tracker-dark-screenshot.svg")
    }
})