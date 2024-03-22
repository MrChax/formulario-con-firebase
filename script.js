// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDqv5hfM12EZ9QXaLgeILjNHxzEozYnwOU",
    authDomain: "datos-de-formulario-8a4fb.firebaseapp.com",
    projectId: "datos-de-formulario-8a4fb",
    storageBucket: "datos-de-formulario-8a4fb.appspot.com",
    messagingSenderId: "407321269764",
    appId: "1:407321269764:web:506e91b362cb7e6ca80751",
    measurementId: "G-XCBNP37MFM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();






const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    //console.log(e);

    const nombre = document.getElementById('name').value;
    const correo = document.getElementById('email').value;
    const contrasenia = document.getElementById('password').value;

    const errorNombre = document.getElementById('nameError');
    const errorEmail = document.getElementById('emailError');
    const errorPw = document.getElementById('passwordError');

    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const regexPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    let nombreEnvio;
    let mailEnvio;
    let pwEnvio;

    if (nombre.trim().length == 0 || nombre == undefined || nombre == '' || nombre == null) {
        errorNombre.textContent = `Porfavor introduce un nombre`;
    } else {
        errorNombre.textContent = '';
        nombreEnvio = nombre;
    }
    
    if (!regexEmail.test(correo)) {
        errorEmail.textContent = `Hubo un error con su correo`;
    } else {
        errorEmail.textContent = '';
        mailEnvio = correo;
    }
    
    if (!regexPw.test(contrasenia)) {
        errorPw.textContent = `Hubo un error con su pw`;
    } else {
        errorPw.textContent = '';
        pwEnvio = contrasenia;
    }
    
    if (nombreEnvio && mailEnvio && pwEnvio) {

        db.collection("users").add({
            nombre: nombreEnvio,
            email: mailEnvio,
            contrasenia: pwEnvio
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        alert('Formulario enviado con exito')
        formulario.reset();
    }
});

/*const enviarDatos = () => {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}*/