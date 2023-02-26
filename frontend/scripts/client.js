function editClient() {
  document.querySelector(".bg-model").style.display = "flex";
  let client_name = document.querySelector(".clinet_name");
  let client_email = document.querySelector(".clinet_email");
  let client_address = document.querySelector(".clinet_address");
  let client_note = document.querySelector(".clinet_note");

  document
    .querySelector("#submit_client_button")
    .addEventListener("submit", async () => {
      try {
        let obj = {
          name: client_name.value,
          address: client_address.value,
          email: client_email.value,
          note: client_note.value,
        };

        let fetching = await fetch()
        
      } catch (error) {

      }
    });
  console.log(val);
}
function close_details() {
  document.querySelector(".bg-model").style.display = "none";
}

let clientName = document.getElementById("clientName");
function addClient() {
  let array = JSON.parse(localStorage.getItem("clientDetails")) || [];
  let obj = {
    name: clientName.value,
    address: "",
    email: "",
    note: "",
  };
  array.push(obj);
  localStorage.setItem("clientDetails", JSON.stringify(array));
  displayClient(array);
}

function displayClient(array) {
  let dataColumn = document.querySelector(".client_parent_content");
  dataColumn.innerHTML = array
    .map((item) => {
      return `<div class="client_child_content">
        <div id="client_name">${item.name}</div>
        <div id="client_address">${item.address}</div>
        <div class="icons">
        <div id="note_icon"><span class="material-symbols-outlined">description</span></div>
        <div class="edit_icon" onClick="editClient()"><span class="material-symbols-outlined">edit</span></div>
        <div id="show_more"><span class="material-symbols-outlined">more_vert</span></div>
        </div>
        </div>`;
    })
    .join("");

  let edit_icon = document.querySelectorAll(".edit_icon");
  console.log(edit_icon);
  for (let valuee in edit_icon) {
    console.log("working");
  }
}

let array = JSON.parse(localStorage.getItem("clientDetails"));
displayClient(array);
