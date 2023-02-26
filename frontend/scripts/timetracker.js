var btn=document.getElementById("timer_start")
var counter= document.getElementById("timer");
var flag=0;

var count=0;
btn.addEventListener("click",()=>{
if(btn.textContent== "Start"){
    start()
}
else {
    stop()
}
});
function start (){
    if(flag === 0){
        var start=setInterval(()=>{
            count=count+1;
            counter.textContent= count;
            btn.innerHTML="Stop";
            btn.style.background="red";
            btn.style.color="white";
            btn.style.border.color="red";
            flag=1;

            btn.addEventListener("click", ()=>{
                clearInterval(start)
                btn.innerHTML="Start";
                flag=0;
                btn.style.background="#5FBDF7";
                btn.style.color="white";
                btn.style.border.color="#5FBDF7";
            })
        },1000)
    }
}

////////////////////////////////////////////////
// btn.addEventListener("click",stop);
function stop(){
        btn.innerHTML="Start";
        flag=0;

        if(btn.value= "Stop")
            flag=1;
            var name= document.getElementById("query").value;

        
        if(name === ""){
            alert("Please fill the details")
        }
    //    let html=""
    let arr=JSON.parse(localStorage.getItem("userdata")) || []
var a= document.getElementById("query");
var b = document.getElementById("timer");

let obj={
    name :a.value,
    count:b.textContent,
}
arr.push(obj)
localStorage.setItem("userdata",JSON.stringify(arr))
count=0;
a.innerText=""
b.innerText="00:00:00";
document.getElementById("timetracker_body").innerHTML="";
console.log(arr)
arr.forEach((el)=>{
let div=document.createElement("div")
div.classList.add("details")
    let ab= `
  
    <div class="name" >
    <input  placeholder=""  id="desc"  value="${el.name}" >
</div>
<div class="project">
        <i class="fa-solid fa-circle-plus" id="plus"></i>
        <p class="p">Project</p>

</div>

<div class="tag">
<img src="https://app.clockify.me/assets/nav-icons/tags.svg" alt="" class="tag">
</div>
<div class="dollar">
<p>$</p>
</div>
<div class="calender">
<img src="https://app.clockify.me/assets/nav-icons/calendar.svg" alt="" class="calender">
</div>
<div class="time">
 <input type="number"  value="${el.count}" id="counttime" > 
</div>
<div class="play">
<img src="https://app.clockify.me/assets/ui-icons/play.svg" alt="" class="play">
</div>
<div class="menubtn">
<img src="https://app.clockify.me/assets/ui-icons/menu-dots-vertical.svg" alt="" class="menubtn">
<ul class="subclass">
    <li class="delete"><button type="button" class="delete">Delete</button></li>
</ul>
</div>
   
  `
  div.innerHTML=ab;

  
  document.getElementById("timetracker_body").append(div);

}) 

}




