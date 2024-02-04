// data de usuarios
const users = [{
    'user': 'kazu',
    'password': '123'
},
{
    'user': 'shuu',
    'password': '123'
},
{
    'user': 'linze',
    'password': '123'
}]


// sacamos el elemtento, que es el formulario con todo su contenido
const loginForm = document.getElementById("login-form");

// Tomamos el formulario, usamos una funcion de evento, para cuando el boton de iniciar sesion sea apretado (submit), se ejecute el codigo
loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // buscamos el input user, guardamos su contenido y lo asignamos a la constante email.
    const user = document.getElementById("user").value;
    // buscamos el input password, guardamos su contenido y lo asignamos a la constante password.
    const password = document.getElementById("password").value;
    // el console.log nos permite ver el resultado en la consola del navegador, en la pestaña de console
    console.log(user, password);

    // Buscar un objeto en el arreglo que tenga el mismo correo electrónico y contraseña
    const result = users.find((element) => element.user === user && element.password === password);

    if (result) {
        // Las credenciales son válidas, se puede permitir el inicio de sesión
        alert("Inicio de sesión exitoso!");
        window.location.href = "./mainPage.html";
    } else {
        // Las credenciales no son válidas, mostrar un mensaje de error
        alert("Credenciales incorrectas, por favor intente de nuevo");
    }
});