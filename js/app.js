let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12';
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));


function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" /> 
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2> 
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>`;
    });
    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {

    let emp = employees[index];
    let firstName = emp.name.first;
    let lastName = emp.name.last;
    let largePicture = emp.picture.large;
    let dob = emp.dob;
    let phone = emp.phone;
    let email = emp.email;
    let location = emp.location;

    let date = new Date(dob.date);

    console.log(location.street);

    const modalHTML = `
    <img class="avatar" src="${largePicture}" />
        <div class="text-container">
            <h2 class="name">${firstName} ${lastName}</h2>
            <p class="email">${email}</p>
            <p class="address">${location.city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${location.street.number} ${location.street.name}, ${location.state} ${location.postcode}</p> 
            <p>Birthday:${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p> 
        </div>
        `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}


gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});


modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});