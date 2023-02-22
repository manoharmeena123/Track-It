function close_details() {
    document.querySelector(".bg-model").style.display = 'none';
};

let clientName = document.getElementById("clientName");

function addClient() {
    let array = JSON.parse(localStorage.getItem("clientDetails")) || [];
    let obj = {
        name : clientName.value,
        address: "",
        email: "",
        note: ""
    }
    array.push(obj);
    localStorage.setItem("clientDetails",JSON.stringify(array));
    displayClient(array);
}

function displayClient(array) {
    let dataColumn = document.querySelector(".client_parent_content");
    // dataColumn.innerHTML = ``;
    dataColumn.innerHTML = array.map((item)=>{
        return `<div class="client_child_content">
        <div id="client_name">${item.name}</div>
        <div id="client_address">${item.address}</div>
        <div class="icons">
            <div id="note_icon"><span class="material-symbols-outlined">description</span></div>
            <div class="edit_icon" onClick="edit()"><span class="material-symbols-outlined">edit</span></div>
            <div id="show_more"><span class="material-symbols-outlined">more_vert</span></div>
        </div>
        </div>`
    }).join("");
    
    // let editClient = document.querySelector(".material-symbols-outlined");
    // console.log(editClient)
    // for(let key of editClient){
    //     key.addEventListener("click",(event)=>{
    //     document.querySelector(".bg-model").style.display = 'flex';
    //               let dataId = event.target.dataset.id;
    //               console.log(dataId);
    //     });
    //   };
    

}
let array = JSON.parse(localStorage.getItem("clientDetails"));
displayClient(array);


function editClient() {
    document.querySelector(".bg-model").style.display = 'flex';
};