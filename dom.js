// VARIABLES
const form = document.getElementById('form');
const formEdit = document.getElementById('form-edit');
const inputs = document.querySelectorAll('form input');
const buttonAddUser = document.getElementById('btn-add-user');
const buttonEditUser = document.getElementById('btn-edit-user');
const idDelete = document.getElementById('id-delete');
const idEdit = document.getElementById('id-edit');

// OBJETO CON EXPRESIONES REGULARES PARA VALIDACIÓN DE FORMULARIOS EN MODALES
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

//FUNCIÓN PARA VALIDAR FORMULARIO
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

//FUNCIÓN PARA VALIDAR INPUTS CON EXPRESIONES REGULARES Y CSS
const validateField = (expression, input, field) => {

    if (expression.test(input.value)) {
        document.getElementById(`${field}-group`).classList.remove('form-group-incorrect');
        document.getElementById(`${field}-group`).classList.add('form-group-correct');
        document.getElementById(`${field}-edit-group`).classList.remove('form-group-incorrect');
        document.getElementById(`${field}-edit-group`).classList.add('form-group-correct');
        fields[field] = true;
    } else {
        document.getElementById(`${field}-group`).classList.add('form-group-incorrect');
        document.getElementById(`${field}-group`).classList.remove('form-group-correct');
        document.getElementById(`${field}-edit-group`).classList.add('form-group-incorrect');
        document.getElementById(`${field}-edit-group`).classList.remove('form-group-correct');
        fields[field] = false;
    }
}

//FUNCIÓN PARA HABILITAR BOTONES PARA AGREGAR Y EDITAR USUARIOS
const enableSubmitFormButton = (e) => {
    e.preventDefault();
    if (fields.name && fields.address && fields.email && fields.phone) {
        buttonAddUser.classList.remove('disabled');
        buttonEditUser.classList.remove('disabled');
        document.getElementById('form-message').classList.remove('form-message-active');
        document.getElementById('form-edit-message').classList.remove('form-message-active');
    } else {
        buttonAddUser.classList.add('disabled');
        buttonEditUser.classList.add('disabled');
        document.getElementById('form-message').classList.add('form-message-active');
        document.getElementById('form-edit-message').classList.add('form-message-active');
        setTimeout(() => {
            document.getElementById('form-edit-message').classList.remove('form-message-active');
        }, 3000);
    }
}

//EVENTOS QUE VALIDAN LOS DATOS INGRESADOS EN CASO DE CLICKEAR SOBRE O FUERA DE LAS MODALES
inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
    input.addEventListener('blur', enableSubmitFormButton);
    input.addEventListener('keyup', enableSubmitFormButton);
});

//FUNCIÓN FINAL DE VALIDACIÓN PARA CONFIRMAR ÉXITO O NO EN EL ENVÍO DE DATOS Y HABILITA BOTÓN DE ENVÍO
const finalValidation = (e) => {
    e.preventDefault();

    if (fields.name && fields.address && fields.email && fields.phone) {
        form.reset();
        document.getElementById('form-message-success').classList.add('form-message-success-active');
        document.getElementById('form-message').style.display = 'none';
        setTimeout(() => {
            document.getElementById('form-message-success').classList.remove('form-message-success-active');
        }, 5000);

        document.getElementById('form-edit-message-success').classList.add('form-message-success-active');
        document.getElementById('form-edit-message').style.display = 'none';
        setTimeout(() => {
            document.getElementById('form-edit-message-success').classList.remove('form-message-success-active');
        }, 5000);

    } else if (input.value = '') {
        buttonAddUser.classList.add('disabled');
        buttonEditUser.classList.add('disabled');
    }
}
//EVENTOS PARA LA VALIDACIÓN DE INPUTS EN MODALES
form.addEventListener('submit', finalValidation);
formEdit.addEventListener('submit', finalValidation);

// FUNCIONES CREADORAS
const table = document.getElementById('users-list');
const tbody = document.querySelector('tbody');

const createTable = (users) => {
    document.getElementById('tbody').innerHTML = "";
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

const createUserRequest = () => {
    // Traigo elementos
    const inputFullname = document.getElementById('fullname');
    const inputEmail = document.getElementById('email');
    const inputAddress = document.getElementById('address');
    const inputPhone = document.getElementById('phone');
    // Asigno valores
    const fullname = inputFullname.value;
    const email = inputEmail.value;
    const address = inputAddress.value;
    const phone = inputPhone.value;
    return { fullname, email, address, phone }
}

//FUNCIÓN PARA MOSTRAR INFO DEL USUARIO SELECCIONADO
const showUserInfo = (data) => {
    inputFullname.value = data.fullname;
    inputEmail.value = data.email;
    inputAddress.value = data.address;
    inputPhone.value = data.phone;
}

// Traigo elementos de modal edit
const inputFullname = document.getElementById('edit-fullname');
const inputEmail = document.getElementById('edit-email');
const inputAddress = document.getElementById('edit-address');
const inputPhone = document.getElementById('edit-phone');
const createUserPutRequest = () => {
    // Asigno valores
    const fullname = inputFullname.value;
    const email = inputEmail.value;
    const address = inputAddress.value;
    const phone = inputPhone.value;
    return { fullname, email, address, phone }
}

//FETCH GET POR ID PARA TRAER EL USUARIO SELECCIONADO PARA EDITAR
const getUser = (id) => {
    fetch(`${urlBase}/users?id=${id}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            showUserInfo(data[0]);
        })
        .catch(error => console.log(`error en fetch GET /users: ${error}`))
}

//FUNCIÓN CREADORA DE BOTONES ELIMINAR Y EDITAR EN TABLA
const createActions = () => {
    const rows = tbody.childNodes;
    rows.forEach(row => {
        // Creo elementos
        const buttonEdit = document.createElement('button');
        const buttonDelete = document.createElement('button');
        const td = document.createElement('td');
        // Seteo valores y atributos a buttonEdit
        buttonEdit.className = 'btn btn-outline-secondary';
        buttonEdit.innerHTML = `<i class="material-icons" title="Edit">&#xE254;</i>`;
        buttonEdit.setAttribute('data-toggle', 'modal');
        buttonEdit.setAttribute('data-target', '#my-edit-modal');
        // Seteo valores y atributos a buttonDelete
        buttonDelete.className = 'btn btn-outline-danger mx-2';
        buttonDelete.innerHTML = `<i class="material-icons" title="Delete">&#xE872;</i>`;
        buttonDelete.setAttribute('data-toggle', 'modal');
        buttonDelete.setAttribute('data-target', '#my-delete-modal');
        // Eventos
        buttonDelete.addEventListener("click", () => {
            idDelete.value = row.id;
        });
        buttonEdit.addEventListener('click', () => {
            idEdit.value = row.id;
            getUser(row.id);
        });
        // Hago appends
        td.appendChild(buttonDelete);
        td.appendChild(buttonEdit);
        row.appendChild(td);
    })
}
