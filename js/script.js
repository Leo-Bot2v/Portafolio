function toggleMenu() {
    const menu = document.getElementById("menu");
    if (menu.classList.contains("menu-oculto")) {
        menu.classList.remove("menu-oculto");
        menu.classList.add("menu-visible");
    } else {
        menu.classList.remove("menu-visible");
        menu.classList.add("menu-oculto");
    }
}

function invisible() {
    const div = document.getElementById("menu");
    div.classList.remove("menu-visible");
    div.classList.add("menu-oculto");
}

document.getElementById("ocultar").addEventListener("click", function() {
    invisible();
});

let modoOscuro = false;

document.getElementById("LinghtMode").addEventListener("click", function() {
    const div = document.getElementById("color");
    if (modoOscuro) {
        document.getElementById("LinghtMode").src = "./img/button/LinghtMode.jpeg";
        div.classList.remove("bodylingh");
    } else {
        document.getElementById("LinghtMode").src = "./img/button/DarkMode.jpeg";
        div.classList.add("bodylingh");
    }
    modoOscuro = !modoOscuro; 
});

function puntoactual(N) {
    const puntos = document.querySelectorAll('.punto'); 
    puntos.forEach((punto) => {
        punto.classList.remove("punto-activo");
    });
    if (N < puntos.length) {
        puntos[N].classList.add("punto-activo");
    }
}

const elementosCarrusel = document.getElementById('elementosCarrusel');
let indiceActual = 0;

fetch('../json/projects.json')
    .then(response => response.json())
    .then(proyectos => {
        for (const proyecto in proyectos) {
            const item = proyectos[proyecto][0];
            const div = document.createElement('div');
            div.className = 'carrusel-item';
            div.innerHTML = `
                <div class="project">
                    <img class="imagen_carrusel" src="${item.img}" alt="${item.titulo}">
                    <div class="carrusel-caption">
                        <h2>${item.titulo}</h2>
                        <p>${item.descripción}</p>
                    </div>
                </div>
            `;
            elementosCarrusel.appendChild(div);
        }
        actualizarCarrusel();
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

const actualizarCarrusel = () => {
    const totalItems = elementosCarrusel.children.length;
    elementosCarrusel.style.transform = `translateX(-${indiceActual * 100}%)`;
    puntoactual(indiceActual);
};

document.getElementById('botonSiguiente').addEventListener('click', () => {
    indiceActual = (indiceActual + 1) % elementosCarrusel.children.length;
    actualizarCarrusel();
});

document.getElementById('botonAnterior').addEventListener('click', () => {
    indiceActual = (indiceActual - 1 + elementosCarrusel.children.length) % elementosCarrusel.children.length;
    actualizarCarrusel();
});

setInterval(() => {
    indiceActual = (indiceActual + 1) % elementosCarrusel.children.length;
    actualizarCarrusel();
}, 5000);

function verificarPantalla() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const originalWidth = screen.width;
    const originalHeight = screen.height;
    const invisible = document.getElementById("invi");
    const visible = document.getElementById("main");
    
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile || (width < originalWidth * 0.5) || (height < originalHeight * 0.5)) {
        invisible.classList.add("invisible");
        visible.classList.add('visible');
        
    } else {
        invisible.classList.remove("invisible");
        visible.classList.remove('visible');
    }
}

window.addEventListener("resize", verificarPantalla);

verificarPantalla();

document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    const visible = document.getElementById("main");

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.intersectionRatio <= 0.04) {
                visible.classList.add('visible');
            } else {
                visible.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.04
    });
  
    observer.observe(header);
    
    verificarVisibilidad();

    window.addEventListener("resize", verificarVisibilidad);
});

function verificarVisibilidad() {
    const header = document.querySelector('header');
    const visible = document.getElementById("main");
    const rect = header.getBoundingClientRect();
    
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        visible.classList.add('visible');
    } else {
        visible.classList.remove('visible');
    }
}

document.getElementById('miFormulario').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('message').value;

    if (nombre && email && mensaje) {
        const fechaActual = new Date();
        const fecha = fechaActual.toLocaleDateString();
        const hora = fechaActual.toLocaleTimeString();

        window.location.href = './html/Mensajes.html?nombre=' + encodeURIComponent(nombre) +
            '&email=' + encodeURIComponent(email) + 
            '&mensaje=' + encodeURIComponent(mensaje) +
            '&fecha=' + encodeURIComponent(fecha) +
            '&hora=' + encodeURIComponent(hora);
    } else {
        alert('Por favor, completa todos los campos.');
    }
});
