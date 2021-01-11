const urlBase = 'https://5ff65d8d941eaf0017f379f0.mockapi.io';

fetch(urlBase + '/users')
    .then(response => response.json())
    .then(data => {
        createTable(data)
        createActions();
    })
    .catch(error => console.log(error))

const registerUser = (e) => {
    e.preventDefault();
    fetch(`${urlBase}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(createObject())
    })
        .then(response => {
            console.log(response);
            if (response.ok) {
                window.location.href = 'index.html';
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.log(error))
}
form.addEventListener('submit', registerUser);