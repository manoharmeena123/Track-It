let prjct_Name = document.querySelector(".project_name");
let clnt_Name = document.querySelector("#selectClient");
let access = document.querySelector(".private");

let boolean = false;


document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    if (prjct_Name.value == "") {
        alert("Please add Project Name");
        return;
    } else if (clnt_Name.value == "") {
        alert("Please select Project client");
        return;
    } else if (localStorage.getItem("email") == null || localStorage.getItem("email") == "" || localStorage.getItem("email") == undefined) {
        alert("Please Login");
        setTimeout(() => {
            window.location.href = "../files/login.html"
        }, 2000)
        return;
    }

    let obj = {
        "projectName": prjct_Name.value,
        "clientName": clnt_Name.value,
        "access": boolean ? "Public" : "Private",
        "user": localStorage.getItem("email")
    }



    saveForm(obj);

})


// Save Data
async function saveForm(obj) {
    try {
        let data = await fetch(`https://faithful-deer-lingerie.cyclic.app/projects/`, {
            method: "POST",
            headers: {
                'Content-type': "application/json",
                'authorization': localStorage.getItem("user")
            },
            body: JSON.stringify(obj)
        });

        let res = await data.json();
        if (res.msg == "Project Successfully Added") {
            document.querySelector('.bg-model').style.display = 'none';
            document.querySelector('#hideThis').style.display = 'block';
        }
        alert(res.msg);
        if (res.msg == "Project Successfully Added") {
            renderData();
        }
    } catch (error) {
        alert("Something Went Wrong Please Try Again");
    }
}



// To fetch and render all data
async function renderData() {
    let email = localStorage.getItem("email");
    try {
        let data = await fetch(`https://faithful-deer-lingerie.cyclic.app/projects/${email}`, {
            method: "GET",
            headers: {
                'Content-type': "application/json",
                'authorization': localStorage.getItem("user")
            }
        });

        let res = await data.json();
        displayProject(res);
    } catch (error) {
        alert("Something Went Wrong Please Try Again");
    }
}
renderData();


function displayProject(array) {
    let dataColumn = document.querySelector(".body_div_prnt");
    dataColumn.innerHTML = array.map((item) => {
        const milliseconds = item.timeTracked;
        const seconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

        return `<div class="body_div_head body_columns">
                    <div class="name">${item.projectName}</div>
                    <div class="client">${item.clientName}</div>
                    <div class="tracked">${timeString}</div>
                    <div class="access">${item.access}</div>
                    <div id="deleteBox" onclick='deleteProject("${item._id}")'>
                        <button id="deleteButton">Delete</button>
                    </div>
                </div>`
    }).join("");
};



function makePublic() {
    if (boolean) {
        boolean = false;
    } else {
        boolean = true;
    }
}



// To Fetch and Show the Clients Data in select tag
async function getAllClients() {
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

        if (res.length == 0) {
            setTimeout(() => {
                confirm("You don't have any Client Click on OK to add Client");
                if (confirm) {
                    window.location.href = "../files/client.html";
                } else {
                    document.querySelector('.bg-model').style.display = 'none';
                    document.querySelector('#hideThis').style.display = 'block';
                }
            }, 2000)
        } else {
            let array = [];
            array = res.map((item) => {
                return `
                    <option value="${item.name}">${item.name}</option>
                `;
            })
            document.getElementById("selectClient").innerHTML += array;
        }
    } catch (error) {
        console.log("Error while getting userData " + error);
    }
};



// Delete Project Function
async function deleteProject(id) {
    const confirmed = confirm("Do you really want to delete Project?");

    if (confirmed) {
        try {
            let data = await fetch(`https://faithful-deer-lingerie.cyclic.app/projects/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': "application/json",
                    'authorization': localStorage.getItem("user")
                }
            });
            let res = await data.json();
            alert(res.msg);
            renderData();
        } catch (error) {
            console.log("Error while getting userData " + error);
        }
    }
}