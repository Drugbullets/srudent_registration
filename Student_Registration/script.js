const genders = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" }
];

const condition = [
    { id: 1, name: "true" },
    { id: 2, name: "false" }
];

const hobbies = [
    { id: 1, name: "Movies" },
    { id: 2, name: "Music" },
    { id: 3, name: "Sports" },
    { id: 4, name: "Reading" },
    { id: 5, name: "Traveling" }
];

const states = [
    { id: 1, name: "Tamil Nadu", cities: [{ name: "Chennai" }, { name: "Coimbatore" }] },
    { id: 2, name: "Andhra Pradesh", cities: [{ name: "Vizag" }, { name: "Guntur" }] },
    { id: 3, name: "Rajasthan", cities: [{ name: "Jaipur" }, { name: "Jodhpur" }] },
];

let editRowIndex = null;

document.addEventListener("DOMContentLoaded", () => {
    const genderGroup = document.getElementById("genderGroup");
    const hobbyGroup = document.getElementById("hobbyGroup");
    const stateDropdown = document.getElementById("state");
    const cityDropdown = document.getElementById("city");

genders.forEach(gender => {
        const genderDiv = document.createElement("div");
        genderDiv.innerHTML = `
            <label>
                <input type="radio" name="gender" value="${gender.name}"> ${gender.name}
            </label>`;
        genderGroup.appendChild(genderDiv);
    });

 hobbies.forEach(hobby => {
        const hobbyDiv = document.createElement("div");
        hobbyDiv.innerHTML = `
            <label>
                <input type="checkbox" name="hobbies" value="${hobby.name}"> ${hobby.name}
            </label>`;
        hobbyGroup.appendChild(hobbyDiv);
    });

    states.forEach(state => {
        stateDropdown.innerHTML += `<option value="${state.id}">${state.name}</option>`;
    });

    stateDropdown.addEventListener("change", () => {
        cityDropdown.innerHTML = `<option value="">Select City</option>`;
        const selectedState = states.find(state => state.id == stateDropdown.value);
        if (selectedState) {
            selectedState.cities.forEach(city => {
                cityDropdown.innerHTML += `<option value="${city.name}">${city.name}</option>`;
            });
        }
    });
    stateDropdown.dispatchEvent(new Event("change"));

    document.getElementById("registrationForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value;
		const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const dob = document.getElementById("dob").value;
        const state = stateDropdown.options[stateDropdown.selectedIndex].text;
        const city = cityDropdown.value;
        const selectedHobbies = Array.from(document.querySelectorAll('input[name="hobbies"]:checked'))
            .map(hobby => hobby.value);

        if (!/^[A-Za-z]+$/.test(firstName)) {
            alert("First Name must contain only letters!");
            return;
        }
        if (!/^[A-Za-z]+[0-9]+$/.test(lastName)) {
            alert("Username must contain only letters and numbers!");
            return;
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            alert("Phone Number must be exactly 10 digits!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const tableBody = document.querySelector("#studentTable tbody");

        const rowHTML = `
            <tr>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${email}</td>
                <td>${gender}</td>
                <td>${dob}</td>
                <td>${phoneNumber}</td>
                <td>${state}</td>
                <td>${city}</td>
                <td>${selectedHobbies.join(", ")}</td>
                <td>
                    <button onclick="editRow(this)">Edit</button>
                    <button onclick="deleteRow(this)">Delete</button>
                </td>
            </tr>`;

        if (editRowIndex === null) {
            tableBody.innerHTML += rowHTML;
        } else {
            tableBody.rows[editRowIndex].innerHTML = rowHTML;
            editRowIndex = null;
        }

        this.reset();
        stateDropdown.dispatchEvent(new Event("change"));
    });
});

function editRow(button) {
    const row = button.closest("tr");
    const cells = row.getElementsByTagName("td");
    editRowIndex = row.rowIndex - 1;

    document.getElementById("firstName").value = cells[0].innerText;
	document.getElementById("lastName").value = cells[1].innerText;
    document.getElementById("email").value = cells[2].innerText;
    document.querySelector(`input[value="${cells[3].innerText}"]`).checked = true;
    document.getElementById("dob").value = cells[4].innerText;
    document.getElementById("phoneNumber").value = cells[5].innerText;
    document.getElementById("state").value = states.find(s => s.name === cells[6].innerText).id;
    document.getElementById("state").dispatchEvent(new Event("change"));

    setTimeout(() => {
        document.getElementById("city").value = cells[7].innerText;
    }, 100);
}

function deleteRow(button) {
    button.closest("tr").remove();
}