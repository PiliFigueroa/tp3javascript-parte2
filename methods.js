const urlBase = 'https://5ff65d8d941eaf0017f379f0.mockapi.io';

fetch(urlBase + '/users')
    .then(response => response.json())
    .then(data => {
        createTable(data)
    })
    .catch(error => console.log(error))

// fetch (urlBase + '/users', {
//     method: 'POST',
//     headers: {'Content-Type': 'Application/json'
//     }
// })


