// Botón Scroll to Top
(function() {
  'use strict';

  // Crear el botón
  const scrollButton = document.createElement('button');
  scrollButton.id = 'scroll-to-top';
  scrollButton.innerHTML = '↑';
  scrollButton.setAttribute('aria-label', 'Volver arriba');
  scrollButton.setAttribute('title', 'Volver arriba');
  
  // Agregar el botón al body
  document.body.appendChild(scrollButton);

  // Mostrar/ocultar el botón según el scroll
  function toggleScrollButton() {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  }

  // Scroll suave hacia arriba
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Event listeners
  window.addEventListener('scroll', toggleScrollButton);
  scrollButton.addEventListener('click', scrollToTop);

  // Verificar posición inicial
  toggleScrollButton();
})();