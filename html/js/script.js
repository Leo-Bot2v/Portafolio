const params = new URLSearchParams(window.location.search);
const nombreUsuario = params.get('nombre');
const emailUsuario = params.get('email');
const mensajeInicial = params.get('mensaje');

const chatBox = document.getElementById('chatBox');
let lastSender = '';

if (mensajeInicial) {
    mostrarMensaje(nombreUsuario, emailUsuario, mensajeInicial);
}

document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nuevoMensaje = document.getElementById('messageInput').value;

    if (nuevoMensaje) {
        mostrarMensaje(nombreUsuario, emailUsuario, nuevoMensaje);
        document.getElementById('messageInput').value = '';
    }
});

function mostrarMensaje(nombre, email, texto) {
    const messageElement = document.createElement('div');
    const senderInfo = document.createElement('div');
    const separator = document.createElement('div');
    const fechaHoraElement = document.createElement('div');

    const fechaHoraActual = new Date();
    const fecha = fechaHoraActual.toLocaleDateString();
    const hora = fechaHoraActual.toLocaleTimeString();

    if (lastSender !== `${nombre} (${email})`) {
        senderInfo.className = 'sender-info';
        senderInfo.innerHTML = `${nombre}<br>${email}`;
        chatBox.appendChild(senderInfo);
        lastSender = `${nombre} (${email})`;
    }

    messageElement.className = 'message user';
    messageElement.innerHTML = texto;
    chatBox.appendChild(messageElement);

    fechaHoraElement.className = 'fecha-hora';
    fechaHoraElement.innerHTML = `<br>${fecha} ${hora}`;
    chatBox.appendChild(fechaHoraElement);

    if (lastSender !== `${nombre} (${email})`) {
        separator.className = 'separator';
        chatBox.appendChild(separator);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

function guardartxt(nombre, email, mensaje, fecha, hora) {
    const archivoTxt = '../html/db/mens.txt';

    window.onload = function() {
        fetch(archivoTxt)
            .then(response => response.text())
            .then(data => {
                console.log("Archivo editado")
                const nuevoContenido = `${data}\nNombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}\n---------\nFecha: ${fecha} Hora: ${hora}\n`;
                document.getElementById('messageEdit').value = nuevoContenido; 
                guardarEnServidor(nuevoContenido);
            })
            .catch(error => console.error('Error al cargar el archivo:', error));
    };
}

function guardarEnServidor(contenido) {
    fetch('../html/db/mens.txt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8' // Asegúrate de incluir el charset
        },
        body: JSON.stringify({ contenido: contenido })
    })
    .then(response => {
        if (response.ok) {
            alert('El mensaje ha sido actualizado correctamente.');
        } else {
            alert('Error al actualizar el mensaje: ' + response.status + ' ' + response.statusText);
        }
    })
    .catch(error => console.error('Error al enviar el contenido editado:', error));    
}
