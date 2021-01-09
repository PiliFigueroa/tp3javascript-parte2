//FUNCIONES DE VALIDACION ACA

const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expressions = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
    address: /[a-zA-Z0-9_+-]{1,60}/,
    email: /^[a-zA-Z0-9_+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/,
    phone: /[0-9]{3,13}/
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

const validateField = (expression, input, field) => {

    if (expression.test(input.value)) {
        document.getElementById(`${field}-group`).classList.remove('form-group-incorrect');
        document.getElementById(`${field}-group`).classList.add('form-group-correct');
        fields[field] = true;
    } else {
        document.getElementById(`${field}-group`).classList.add('form-group-incorrect');
        document.getElementById(`${field}-group`).classList.remove('form-group-correct');
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