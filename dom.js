//FUNCIONES DE VALIDACION ACA

const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expressions = {
    name: /[a-zA-ZÀ-ÿ\s]{1,50}/,
    address: /[a-zA-Z0-9_+-]{1,60}/,
    email: /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]/,
    phone: /[\s-\d]{8,}/
}

const fields = {
    name: false,
    address: false,
    email: false,
    phone: false
}

let validar = false;

const validateForm = (e) => {

    switch (e.target.name) {

        case "name":
            validateField(expressions.name, e.target, 'name');
            break;

        case "email":
            validateField(expressions.email, e.target, 'email');
            break;

        case "address":
            validateField(expressions.address, e.target, 'address');
            break;
        case "phone":
            validateField(expressions.phone, e.target, 'phone');
            break;
    }
}

const validateField = (expression, input, field) => {

    if (expression.test(input.value)) {
        document.getElementById(`${field}-group`).classList.remove('form-group-incorrect');
        document.getElementById(`${field}-group`).classList.add('form-group-correct');
        fields[field] = true;
        //return true;
    } else {
        document.getElementById(`${field}-group`).classList.add('form-group-incorrect');
        document.getElementById(`${field}-group`).classList.remove('form-group-correct');
        fields[field] = false;
        // return false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (fields.name && fields.address && fields.email && fields.phone) {
        form.reset();
        //console.log('formulario enviado');
        document.getElementById('form-message-success').classList.add('form-message-success-active');
        document.getElementById('form-message').style.display = 'none';
        setTimeout(() => {
            document.getElementById('form-message-success').classList.remove('form-message-success-active');
        }, 5000);
    } else {
        document.getElementById('form-message').classList.add('form-message-active');
        //console.log('formulario no enviado');
    }
});


const table = document.getElementById('users-list');
const tbody = document.querySelector('tbody');
const myModalDelete = document.getElementById('my-modal-delete');

const createTable = (users) => {

    for (let index in users) {
        // Creo elementos
        const user = users[index];
        const tr = document.createElement('tr');
        const nameTd = document.createElement('td');
        const emailTd = document.createElement('td');
        const addressTd = document.createElement('td');
        const phoneTd = document.createElement('td');

        // Agrego valores
        nameTd.innerHTML = user.fullname;
        emailTd.innerHTML = user.email;
        addressTd.innerHTML = user.address;
        phoneTd.innerHTML = user.phone;
        tr.setAttribute('id', user.id)

        // Hago appends
        tr.appendChild(nameTd);
        tr.appendChild(emailTd);
        tr.appendChild(addressTd);
        tr.appendChild(phoneTd);

        tbody.appendChild(tr);
    }
}
//createTable();

const createUserRequest = () => {
    const inputFullname = document.getElementById('fullname');
    const inputEmail = document.getElementById('email');
    const inputAddress = document.getElementById('address');
    const inputPhone = document.getElementById('phone');
    //const createdAt = '';
    //const id = '';
    const fullname = inputFullname.value;
    const email = inputEmail.value;
    const address = inputAddress.value;
    const phone = inputPhone.value;
    return { fullname, email, address, phone }
}

const createActions = () => {
    const rows = tbody.childNodes;
    rows.forEach(row => {

        const buttonEdit = document.createElement('button');
        const buttonDelete = document.createElement('button');
        const td = document.createElement('td');
        buttonEdit.className = 'btn btn-outline-secondary';
        buttonEdit.innerHTML = `<i class="material-icons" title="Edit">&#xE254;</i>`;
        buttonEdit.setAttribute('data-toggle', 'modal');
        buttonEdit.setAttribute('data-target', '#mymodal');
        buttonDelete.className = 'btn btn-outline-danger mx-2';
        buttonDelete.innerHTML = `<i class="material-icons" title="Delete">&#xE872;</i>`;
        buttonDelete.setAttribute('data-toggle', 'modal');
        buttonDelete.setAttribute('data-target', '#my-delete-modal'); //como pasar datos a la modal
        buttonDelete.setAttribute('data-id', row.id)

        td.appendChild(buttonDelete);
        td.appendChild(buttonEdit);
        row.appendChild(td);
    })
}
