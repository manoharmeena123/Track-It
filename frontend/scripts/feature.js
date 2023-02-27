let tab = "summary"


let check = document.querySelectorAll("[data-tab]");
check.forEach((e) => {
  e.addEventListener("click", () => {
    let target = e.dataset.tab;
    let focus = document.querySelectorAll("[data-tab]");
    switch(target){
        case "summary" : for(let i=0;i<focus.length;i++){
            if(focus[i].dataset.tab == "summary"){
                focus[i].classList.add("selected");
              }else{
                focus[i].classList.remove("selected");
              }
            };
            tab = "summary";
            image(tab);
            break;
        case "details" : for(let i=0;i<focus.length;i++){
            if(focus[i].dataset.tab == "details"){
                focus[i].classList.add("selected");
              }else{
                focus[i].classList.remove("selected");
              }
            };
            tab = "details";
            image(tab);
            break;
        case "weekly" : for(let i=0;i<focus.length;i++){
            if(focus[i].dataset.tab == "weekly"){
                focus[i].classList.add("selected");
              }else{
                focus[i].classList.remove("selected");
              }
            };
            tab = "weekly";
            image(tab);
            break;
    }

  });
});

let image = (tab) =>{
    if(tab == "summary"){
        document.querySelector(".changeImage").innerHTML = ""
        let image1 = document.createElement("img");
        image1.setAttribute("class","over")
        image1.src = "https://clockify.me/assets/images/features/features-reports-explainer.svg"
        let image2 = document.createElement("img");
        image2.setAttribute("class","base")
        image2.src = "https://clockify.me/assets/images/features/features-reports-screenshot.svg"
        document.querySelector(".changeImage").append(image1,image2)
    }
    else if(tab == "details"){
        document.querySelector(".changeImage").innerHTML = ""
        let image1 = document.createElement("img");
        image1.setAttribute("class","over")
        image1.src = "https://clockify.me/assets/images/features/features-detailed-explainer.svg"
        let image2 = document.createElement("img");
        image2.setAttribute("class","base")
        image2.src = "https://clockify.me/assets/images/features/features-detailed-screenshot.svg"
        document.querySelector(".changeImage").append(image1,image2)
    }
    else if(tab == "weekly"){
        document.querySelector(".changeImage").innerHTML = ""
        let image1 = document.createElement("img");
        image1.setAttribute("class","over")
        image1.src = "https://clockify.me/assets/images/features/features-weekly-explainer.svg"
        let image2 = document.createElement("img");
        image2.setAttribute("class","base")
        image2.src = "https://clockify.me/assets/images/features/features-weekly-screenshot.svg"
        document.querySelector(".changeImage").append(image1,image2)
    }
}
image(tab);