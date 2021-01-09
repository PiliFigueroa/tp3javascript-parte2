//FUNCIONES DE VALIDACION ACA

const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');
console.log(form)
console.log(inputs)

const expressions = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
    address: /[a-zA-Z0-9_+-]{1,60}/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /[0-9]{3,13}/ // 1 a 13 numeros. //agregarle poder poner Solo números, espacios y/o guiones medios}$/  []
}

const fields = {
    name: false,
    address: false,
    email: false,
    phone: false
}

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

validateField = (expression, input, field) => {

    if (expression.test(input.value)) {
        document.getElementById(`${field}-group`).classList.remove('form-group-incorrect');
        document.getElementById(`${field}-group`).classList.add('form-group-correct');
        document.querySelector(`#${field}-group i`).classList.add('fa-check-circle');
        document.querySelector(`#${field}-group i`).classList.remove('fa-times-circle');
        document.querySelector(`#${field}-group .form-input-error`).classList.remove('form-input-error-active');
        fields[field] = true;
    } else {
        document.getElementById(`${field}-group`).classList.add('form-group-incorrect');
        document.getElementById(`${field}-group`).classList.remove('form-group-correct');
        document.querySelector(`#${field}-group i`).classList.add('fa-times-circle');
        document.querySelector(`#${field}-group i`).classList.remove('fa-check-circle');
        document.querySelector(`#${field}-group i .form-input-error`).classList.add('form-input-error-active');
        fields[field] = false;
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

        document.getElementById('form-message-success').classList.add('form-message-success-active');
        setTimeout(() => {
            document.getElementById('form-message-success').classList.remove('form-message-success-active');
        }, 5000);

        document.querySelectorAll('.form-group-correct').forEach((icon) => {
            icon.classList.remove('form-group-correct');
        });
    } else {
        document.getElementById('form-message').classList.add('form-message-active');
    }
});