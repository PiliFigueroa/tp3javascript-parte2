// URL del endpoint de nuestra API
const urlBase = 'https://5ff65d8d941eaf0017f379f0.mockapi.io';

// Fetch GET para traer los usuarios
fetch(`${urlBase}/users`)
    .then(response => response.json())
    .then(data => {
        createTable(data)
        createActions();
    })
    .catch(error => console.log("error en GET /users: " + error))

// Fetch POST para agregar un usuario
const registerUser = (e) => {
    e.preventDefault();
    spinner.classList.add('d-inline-block');
    spinner.classList.remove('d-none');
    fetch(`${urlBase}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(createUserRequest())
    })
        .then(response => {
            if (response.ok) {
                spinner.classList.add('d-none');
                spinner.classList.remove('d-inline-block');
                window.location.href = 'index.html';
            }
            return response.json();
        })
        .then(data => console.log("response body POST /users: " + data))
        .catch(error => console.log("error en POST /users: " + error))
}

form.addEventListener('submit', registerUser);

// Fetch DELETE para eliminar el usuario elegido
const buttonConfirmDelete = document.getElementById('confirm-delete-user');

const deleteUser = (id) => {
    fetch(`${urlBase}/users/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'index.html';
            }
            return response.json()
        })
        .then(data => console.log(`response fetch DELETE /users: ${data}`))
        .catch(error => console.log(`error en DELETE /users: ${error}`))
}

buttonConfirmDelete.addEventListener('click', () => {
    const idDelete = document.getElementById('id-delete');
    deleteUser(idDelete.value);
});

const updateUser = (id) => {
    fetch(`${urlBase}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(createUserPutRequest())
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'index.html';
            }
            return response.json()
        })
        .then(data => console.log(data))
        .catch(error => console.log(error))
}

const buttonUpdate = document.getElementById('btn-edit-user');
buttonUpdate.addEventListener('click', () => {
    const idEdit = document.getElementById('id-edit');
    updateUser(idEdit.value);
});


const filterUsersByEmailOrName = (input) => {

    const isEmail = expressions.email.test(input);

    let param = isEmail == true ? "email" : "fullname";

    fetch(`${urlBase}/users?${param}=${input}`)
        .then(response => response.json())
        .then(data => {
            console.log("resultados: " + JSON.stringify(data))
            createTable(data)
            createActions();
        })
        .catch(error => console.log(`error en GET /users: ${error}`))
}

document.getElementById('filter').addEventListener('click', () => {
    filterUsersByEmailOrName(document.getElementById('search').value)
});

