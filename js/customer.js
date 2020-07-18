const uri = "https:localhost:5001/api/customer";
let customers = [];

function getItem() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error("Unable to get customers.", error));
}

function addItem() {
    const firstNameInputText = document.getElementById("add-firstName");
    const lastNameInputText = document.getElementById("add-lastName");
    const addressInputText = document.getElementById("add-address");
    const phoneResInputText = document.getElementById("add-phoneRes");
    const phoneMobInputText = document.getElementById("add-phoneMob");
    const enrollDateInputText = document.getElementById("add-enrollDate");
    // const isActiveInputText = document.getElementById("add-isActive");
    const createdByInputText = document.getElementById("add-createdBy");
    const createdOnInputText = document.getElementById("add-createdOn");
    const updatedByInputText = document.getElementById("add-updatedBy");
    const updatedOnInputText = document.getElementById("add-updatedOn");

    const item = {
        firstName: firstNameInputText.value.trim(),
        lastName: lastNameInputText.value.trim(),
        address: addressInputText.value.trim(),
        phoneRes: parseInt(phoneResInputText.value.trim()),
        phoneMob: parseInt(phoneMobInputText.value.trim()),
        enrollDate: enrollDateInputText.value.trim(),
        // isActive: isActiveInputText.value.trim(),
        createdBy: createdByInputText.value.trim(),
        createdOn: createdOnInputText.value.trim(),
        updatedBy: updatedByInputText.value.trim(),
        updatedOn: updatedOnInputText.value.trim()
    };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: item,
        redirect: 'follow'
    };


    fetch(uri, requestOptions)
        .then(response => response.json())
        .then(() => {
            getItems();
            firstNameInputText.value = "";
            lastNameInputText.value = "";
            addressInputText.value = "";
            phoneResInputText.value = "";
            phoneMobInputText.value = "";
            enrollDateInputText.value = "";
            // isActiveInputText.value = "";
            createdByInputText.value = "";
            createdOnInputText.value = "";
            updatedByInputText.value = "";
            updatedOnInputText.value = "";
        })
        .catch(error => console.error("Unable to add Customer.", error));
}

function deleteItem() {
    const itemId = document.getElementById("delete-id").value.trim();
    fetch(`${uri}/${itemId}`, {
        method: "DELETE",
        "Access-Control-Allow-Origin": "*"

    })
        .then(() => getItems())
        .catch(error => console.error("Unable to delete Customer.", error));
}

function displayDeleteForm(id) {
    const item = customers.find(item => item.id === id);
    document.getElementById("delete-id").value = item.id;
}

function displayEditForm(id) {
    const item = customers.find(item => item.id === id);
    document.getElementById("edit-id").value = item.id;
    document.getElementById("edit-firstName").value = item.firstName;
    document.getElementById("edit-lastName").value = item.lastName;
    document.getElementById("edit-address").value = item.address;
    document.getElementById("edit-phoneRes").value = item.phoneRes;
    document.getElementById("edit-phoneMob").value = item.phoneMob;
    document.getElementById("edit-enrollDate").value = item.enrollDate;
    // document.getElementById("edit-isActive").value = item.isActive;
    document.getElementById("edit-createdBy").value = item.createdBy;
    document.getElementById("edit-createdOn").value = item.createdOn;
    document.getElementById("edit-updatedBy").value = item.updatedBy;
    document.getElementById("edit-updatedOn").value = item.updatedOn;
}

function updateItem() {
    const itemId = document.getElementById("edit-id").value.trim();
    const item = {
        id: parseInt(itemId),
        firstName: document.getElementById("edit-firstName").value.trim(),
        lastName: document.getElementById("edit-lastName").value.trim(),
        address: document.getElementById("edit-address").value.trim(),
        phoneRes: parseInt(document.getElementById("edit-phoneRes").value.trim()),
        phoneMob: parseInt(document.getElementById("edit-phoneMob").value.trim()),
        enrollDate: document.getElementById("edit-enrollDate").value.trim(),
        // isActive: document.getElementById("edit-isActive").value.trim(),
        createdBy: document.getElementById("edit-createdBy").value.trim(),
        createdOn: document.getElementById("edit-createdOn").value.trim(),
        updatedBy: document.getElementById("edit-updatedBy").value.trim(),
        updatedOn: document.getElementById("edit-updatedOn").value.trim()
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: item,
        redirect: 'follow'
    };

    fetch(`${uri}/${itemId}`, requestOptions)
        .then(() => getItems())
        .catch(error => console.error("Unable to update item.", error));

    return false;
}

function _displayCount(itemCount) {
    const name = itemCount === 1 ? "entry" : "entries";
    document.getElementById(
        "counter"
    ).innerHTML = `Showing <b>${itemCount}</b> ${name}`;
}


function _displayItems(data) {
    const tBody = document.getElementById("customers");
    tBody.innerHTML = "";
    _displayCount(data.length);
    const button = document.createElement("button");

    data.forEach(item => {
        let editButton = document.createElement("a");
        editButton.href = "#editModal";
        editButton.className = "edit";
        editButton.setAttribute("onclick", `displayEditForm(${item.id})`);
        editButton.setAttribute("data-toggle", "modal");
        editButton.innerHTML = "<i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i>";

        let deleteButton = document.createElement("a");
        deleteButton.href = "#deleteModal";
        deleteButton.className = "delete";
        deleteButton.setAttribute("onclick", `displayDeleteForm(${item.id})`);
        deleteButton.setAttribute("data-toggle", "modal");
        deleteButton.innerHTML = "<i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i>";

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let id = document.createTextNode(item.id);
        td1.appendChild(id);

        let td2 = tr.insertCell(1);
        let firstName = document.createTextNode(item.firstName);
        td2.appendChild(firstName);

        let td3 = tr.insertCell(2);
        let lastName = document.createTextNode(item.lastName);
        td3.appendChild(lastName);

        let td4 = tr.insertCell(3);
        let address = document.createTextNode(item.address);
        td4.appendChild(address);

        let td5 = tr.insertCell(4);
        let phoneRes = document.createTextNode(item.phoneRes);
        td5.appendChild(phoneRes);

        let td6 = tr.insertCell(5);
        let phoneMob = document.createTextNode(item.phoneMob);
        td6.appendChild(phoneMob);

        let td7 = tr.insertCell(6);
        let enrollDate = document.createTextNode(item.enrollDate);
        td7.appendChild(enrollDate);

        let td8 = tr.insertCell(7);
        let isActive = document.createTextNode(item.isActive);
        td8.appendChild(isActive);

        let td9 = tr.insertCell(8);
        td9.appendChild(editButton);
        td9.appendChild(deleteButton);
    });

    customers = data;
}