let prjct_Name = document.querySelector(".project_name");
let clnt_Name = document.querySelector(".clnt_name");
let access = document.querySelector(".private");

document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault();
    let obj = {
        projectName : prjct_Name.value,
        clientName : clnt_Name.value,
        access : access.value,
    }
    // console.log(obj);

})


function addProjects() {
    document.querySelector(".bg-model").style.display = 'flex';

};
function closeProjects() {
    document.querySelector(".bg-model").style.display = 'none';
};
function changeColor() {
    document.querySelector(".star_icon").style.color = 'orange';
}