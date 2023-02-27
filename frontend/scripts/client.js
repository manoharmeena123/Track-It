function editClient() {
  document.querySelector(".bg-model").style.display = 'flex';
  // let client_name = document.querySelector(".clinet_name").value;
  // let client_address = document.querySelector(".clinet_email").value;
  // let client_email = document.querySelector(".clinet_address").value;
  // let client_note = document.querySelector(".clinet_note").value;
  // let save_client = document.querySelector(".submit_bt").addEventListener("submit", (e) => {
  //     e.preventDefault();
      
  // });

};

function close_details() {
  document.querySelector(".bg-model").style.display = 'none';
};

let clientName = document.getElementById("clientName");
let clientAddress = document.getElementById("clientAddress");
let clientEmail = document.getElementById("clientEmail");
function addClient() {
  let array = JSON.parse(localStorage.getItem("clientDetails")) || [];
  let obj = {
      name : clientName.value,
      address: clientAddress.value,
      email: clientEmail.value,
      note: ""
  }
  array.push(obj);
  localStorage.setItem("clientDetails",JSON.stringify(array));
  displayClient(array);
};


function displayClient(array) {
  let dataColumn = document.querySelector(".client_parent_content");
  dataColumn.innerHTML = array.map((item)=>{
      return `<div class="client_child_content">
          <div id="client_name">${item.name}</div>
          <div id="client_address">${item.address}</div>
          <div class="icons">
              <div id="note_icon"><span class="material-symbols-outlined">description</span></div>
              <div class="edit_icon" onClick="editClient()"><span class="material-symbols-outlined">edit</span></div>
              <div id="show_more"><span class="material-symbols-outlined">more_vert</span></div>
          </div>
      </div>`
  }).join("");
  
 
};

let array = JSON.parse(localStorage.getItem("clientDetails"));
displayClient(array);
  