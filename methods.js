const urlBase = 'https://5ff65d8d941eaf0017f379f0.mockapi.io';

fetch(`${urlBase}/users`)
    .then(response => response.json())
    .then(data => {
        createTable(data)
        createActions();
    })
    .catch(error => console.log("error en GET /users: " + error))

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
        .then(data => console.log(data))
        .catch(error => console.log(error))
}

buttonConfirmDelete.addEventListener('click', () => {
    const idDelete = document.getElementById('id-delete');
    deleteUser(idDelete.value);
});