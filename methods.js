const urlBase = 'https://5ff65d8d941eaf0017f379f0.mockapi.io';

fetch(urlBase + '/users')
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => console.log(error))

