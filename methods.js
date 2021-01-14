const urlBase = 'https://5ff65d8d941eaf0017f379f0.mockapi.io';

fetch(urlBase + '/users')
    .then(response => response.json())
    .then(data => {
        createTable(data)
        createActions();
    })
    .catch(error => console.log("error en GET /users: " + error))

const registerUser = (e) => {
    e.preventDefault();
    //validateForm();
    fetch(`${urlBase}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(createUserRequest())
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'index.html';
            }
            return response.json();
        })
        .then(data => console.log("response body POST /users: " + data))
        .catch(error => console.log("error en POST /users: " + error))
}
// if (!validar) {
//     document.getElementById('btn-add-user').disabled = true;
// } else {
//     document.getElementById('btn-add-user').disabled = false;

//const addUserBtn = document.getElementById('btn-add-user');

form.addEventListener('submit', registerUser);
// }
//const params = new URLSearchParams(window.location.search)
//for (const param in params) {
//    console.log(param)
//}
//const id = params.get('fullname');

const buttonConfirmDelete = document.getElementById('confirm-delete-user');
const rows = tbody.childNodes;
//let id = rows[0].getAttribute('id');
let id = row.id;
rows.forEach(row => {
    buttonConfirmDelete.setAttribute('data-target', row.id)
});


const deleteUser = () => {

    fetch(`${urlBase}/users/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            return response.json()
        })
        .then(data => console.log(data))
        .catch(error => console.log(error))

    console.log('Eliminar' + id)
}

buttonConfirmDelete.addEventListener('click', () => deleteUser())