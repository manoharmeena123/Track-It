
const baseUrl = "https://calm-colt-uniform.cyclic.app";
let memberName = document.querySelector(".membr_name");
let memberemail = document.querySelector(".membr_email");
let hrRate = document.querySelector("#bill_rate");
let main_div = document.querySelector(".client_parent_content");

let addForm = document
  .getElementById("addMember_form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    let obj = {
      name: memberName.value,
      email: memberemail.value,
      hourlyRate: hrRate.value,
    };
    add_Member(obj);
  });

async function fetch_members() {
  try {
    let res = await fetch(`${baseUrl}/team/`, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("user"),
        "Content-type": "application/json",
      },
    });
    let data = await res.json();
    console.log(data);
    display_members(data);
  } catch (error) {
    console.log(error);
  }
}

fetch_members();

async function add_Member(obj) {
  try {
    let ressp = await fetch(`https://calm-colt-uniform.cyclic.app/team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("user"),
      },
      body: JSON.stringify(obj),
    });
    console.log(await ressp.json());
    let res = await ressp.json();
  } catch (error) {
    console.log(error);
  }
}

function display_members(data) {
  main_div.innerHTML = data
    .map((elem) => {
      return `
        <div class="client_child_content" data-user-id="${elem._id}>
                        <div class="membr_name">${elem.name}</div>
                        <div class="membr_email">${elem.email}</div>
                        <div class="hourlyrate_div">
                            <input type="text" name="hourlyRate" value="${elem.billableRate}" class="">
                            <div class="changeRate" onclick="changeRate()"><a class="">Change</a>
                            </div>    
                        </div>
                        <div class="role_div" onclick="changeRole()"><span class="material-symbols-outlined">add_circle</span><a class="">Role</a>
                        </div> 
                        <div class="more_icon">
                            <span class="material-symbols-outlined more_vert">more_vert</span>
                        </div>
                    </div>
        `;
    })
    .join("");
  setTimeout(() => {
    closeMember();
  }, 200);
}

function changeRate() {
  document.querySelector(".bg-model").style.display = "flex";
}
function changeRole() {
  document.querySelector(".bg-model_role").style.display = "flex";
}
function closeRate() {
  document.querySelector(".bg-model").style.display = "none";
}
function closeRole() {
  document.querySelector(".bg-model_role").style.display = "none";
}
function closeMember() {
  document.querySelector(".bg-model-add").style.display = "none";
}
function addMember() {
  document.querySelector(".bg-model-add").style.display = "flex";
}
