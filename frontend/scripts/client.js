
let clientName = document.getElementById("clientName");
let clientAddress = document.getElementById("clientAddress");
let clientEmail = document.getElementById("clientEmail");



// To add the Data
async function addClient() {
  if (clientName.value == "") {
    alert("Please add Client Name");
    return;
  } else if (clientEmail.value == "") {
    alert("Please add Client Email");
    return;
  } else if (clientAddress.value == "") {
    alert("Please add Client Address");
    return;
  } else if (!clientEmail.value.includes("@")) {
    alert("Email is not valid");
    return;
  }

  let obj = {
    "name": clientName.value,
    "email": clientEmail.value,
    "address": clientAddress.value,
    "user": localStorage.getItem("email")
  }
  try {
    let data = await fetch(`https://faithful-deer-lingerie.cyclic.app/clients/`, {
      method: "POST",
      headers: {
        'Content-type': "application/json",
        'authorization': localStorage.getItem("user")
      },
      body: JSON.stringify(obj)
    });
    let res = await data.json();
    alert(res.msg);
    getData();
  } catch (error) {
    console.log("Error while getting userData " + error);
  }


  clientName.value = "";
  clientEmail.value = "";
  clientAddress.value = "";
};



// To Fetch and Show the data
async function getData() {
  try {
    let data = await fetch(`https://faithful-deer-lingerie.cyclic.app/clients/`, {
      method: "GET",
      headers: {
        'Content-type': "application/json",
        'authorization': localStorage.getItem("user"),
        'email': localStorage.getItem("email") || null
      }
    });
    let res = await data.json();
    displayClient(res);
  } catch (error) {
    console.log("Error while getting userData " + error);
  }
};
getData();

function displayClient(array) {
  let dataColumn = document.querySelector(".client_parent_content");
  dataColumn.innerHTML = array.map((item) => {
    return `<div class="client_child_content">
            <div id="client_name">${item.name}</div>
            <div id="client_name">${item.email}</div>
            <div id="client_name">${item.address}</div>
            <div id="deleteBox" onclick='deleteClient("${item._id}")'>
            <button id="deleteButton">Delete</button>
            </div>
        </div>`
  }).join("");
};

async function deleteClient(id) {
  const confirmed = confirm("Do you really want to delete client?");

  if (confirmed) {
    try {
      let data = await fetch(`https://faithful-deer-lingerie.cyclic.app/clients/${id}`, {
        method: "DELETE",
        headers: {
          'Content-type': "application/json",
          'authorization': localStorage.getItem("user")
        }
      });
      let res = await data.json();
      alert(res.msg);
      getData();
    } catch (error) {
      console.log("Error while getting userData " + error);
    }
  }
};
