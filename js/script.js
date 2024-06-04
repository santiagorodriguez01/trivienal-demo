function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}
// Función para verificar si un elemento está en la vista del usuario
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para activar los efectos cuando se desplaza la página
function activateEffects() {
    console.log('Activating effects...');
    var content = document.querySelector('.content');
    var frames = document.querySelectorAll('.frame');

    // Si el contenido está en la vista, añade la clase para activar el efecto
    if (isInViewport(content)) {
        content.classList.add('animate');
    } else {
        content.classList.remove('animate');
    }

    // Si los frames están en la vista, añade la clase para activar el efecto a cada uno
    frames.forEach(function(frame) {
        if (isInViewport(frame)) {
            frame.classList.add('animate');
        } else {
            frame.classList.remove('animate');
        }
    });
}

// Escucha el evento de desplazamiento de la página y activa los efectos
window.addEventListener('scroll', activateEffects);

// Activa los efectos al cargar la página
window.addEventListener('load', activateEffects);
