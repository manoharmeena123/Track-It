const baseUrl = "https://faithful-deer-lingerie.cyclic.app";

// inputs
let memberName = document.querySelector(".membr_name");
let memberemail = document.querySelector(".membr_email");
let hrRate = document.querySelector("#bill_rate");
let user = localStorage.getItem("email");


let count = 0;
let countRole = 0;
let main_div = document.querySelector(".client_parent_content");


// to add member details
let addForm = document.getElementById("addMember_form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (memberName.value == "") {
    alert("Please add Member name");
    return;
  } else if (memberemail.value == "") {
    alert("Please add Member Email");
    return;
  } else if (hrRate.value == "") {
    alert("Please add Hourly Rate");
    return;
  }

  let obj = {
    name: memberName.value,
    email: memberemail.value,
    billableRate: hrRate.value,
    user: localStorage.getItem("email") || null,
  };
  add_Member(obj);
});




// add member function
async function add_Member(obj) {
  try {
    let response = await fetch(`${baseUrl}/team/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("user"),
      },
      body: JSON.stringify(obj),
    });

    let res = await response.json();
    if (res.msg == "Team Member Successfully Added") {
      document.querySelector(".bg-model-add").style.display = "none";
      document.querySelector("#hideBox").style.display = "block";
      memberName.value = "";
      memberemail.value = "";
      hrRate.value = "";
    }
    alert(res.msg);
    fetch_members();
  } catch (error) {
    console.log(error);
  }
}




// Fetching members data
async function fetch_members() {
  try {
    let res = await fetch(`${baseUrl}/team/`, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("user"),
        "Content-type": "application/json",
        email: localStorage.getItem("email")
      },
    });
    let data = await res.json();
    display_members(data);
  } catch (error) {
    console.log(error);
  }
}

fetch_members();



// member date template
function display_members(data) {
  main_div.innerHTML = data.map((elem) => {
    return `
      <div class="client_child_content" data-user-id="${elem._id}">
        <div class="membr_name">&nbsp;&nbsp;&nbsp;&nbsp; ${elem.name}</div>
        <div class="membr_email">${elem.email}</div>
        <div class="hourlyrate_div">
        <div class="changeRate" onclick="changeRate(event, '${elem._id}')">
            <input type="number" data-set="${elem._id}" name="hourlyRate" value="${elem.billableRate}">
            <a class="">Change</a>
        </div>
        <div class="changeRate" onclick="changeRole(event ,'${elem._id}')">
            <input type="text" data-set="${elem._id}" name="role" value="${elem.role}">
            <a class="">Change</a>
          </div>
        </div>
      </div>`;
  }).join("");
}



// Changing Team Member Rate from this function
async function changeRate(event, id) {
  count++;
  const hourlyRateValue = event.target.parentElement.querySelector('input[name="hourlyRate"]').value;
  try {
    let res = await fetch(`${baseUrl}/team/${id}`, {
      method: "PATCH",
      headers: {
        authorization: localStorage.getItem("user"),
        "Content-type": "application/json"
      },
      body: JSON.stringify({ "billableRate": hourlyRateValue })
    });
    let data = await res.json();
    if (count % 2 == 0) {
      alert(data.msg);
    }
  } catch (error) {
    console.log(error);
  }
}


function changeRole() {
  document.querySelector("#hideBox").style.display = "none";
  document.querySelector(".bg-model_role").style.display = "flex";
}


function closeRate() {
  document.querySelector(".bg-model").style.display = "none";
  document.querySelector("#hideBox").style.display = "block";
}


function closeRole() {
  document.querySelector(".bg-model_role").style.display = "none";
  document.querySelector("#hideBox").style.display = "block";
}


function closeMember() {
  document.querySelector(".bg-model-add").style.display = "none";
  document.querySelector("#hideBox").style.display = "block";
}


function addMember() {
  document.querySelector("#hideBox").style.display = "none";
  document.querySelector(".bg-model-add").style.display = "flex";
}



async function changeRole(event ,id) {
  countRole++;

  const inputData = event.target.parentElement.querySelector('input[name="role"]').value;
  try {
    let res = await fetch(`${baseUrl}/team/${id}`, {
      method: "PATCH",
      headers: {
        authorization: localStorage.getItem("user"),
        "Content-type": "application/json"
      },
      body: JSON.stringify({ "role": inputData })
    });
    let data = await res.json();
    if (countRole % 2 == 0) {
      alert(data.msg);
    }
  } catch (error) {
    console.log(error);
  }
};