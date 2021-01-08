
//FUNCIONES DE VALIDACION ACA

const modal = document.getElementById('my-modal');
const inputs = document.querySelectorAll('#form-control');

const expressions = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
    address: /^[a-zA-Z0-9_.+-]{1,60}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{8,15}\s?\-?$/, // 7 a 14 numeros. //agregarle poder poner Solo números, espacios y/o guiones medios}$/  []
}

const fields = {
    name: false,
    address: false,
    email: false,
    phone: false
}