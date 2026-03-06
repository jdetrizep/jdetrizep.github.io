/**
 * Tags Page JavaScript
 * Maneja la funcionalidad de la página de tags
 */

(function() {
  'use strict';

  /**
   * Maneja errores de carga de imágenes
   */
  function handleImageErrors() {
    const images = document.querySelectorAll('.post-image-fallback');
    images.forEach(img => {
      img.addEventListener('error', function() {
        this.classList.add('error');
      });
    });
  }

  /**
   * Aplica tamaños de fuente dinámicos a los tag bubbles
   */
  function applyDynamicFontSizes() {
    const tagBubbles = document.querySelectorAll('.tag-bubble');
    
    tagBubbles.forEach(bubble => {
      const count = parseInt(bubble.getAttribute('data-size'), 10);
      if (count) {
        const fontSize = (count * 0.15) + 0.8;
        bubble.style.fontSize = `${fontSize}rem`;
      }
    });
  }

  /**
   * Implementa scroll suave a las secciones de tags
   */
  function setupSmoothScroll() {
    const tagBubbles = document.querySelectorAll('.tag-bubble');
    
    tagBubbles.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
          history.pushState(null, null, '#' + targetId);
        }
      });
    });
  }

  /**
   * Resalta el tag activo basado en la posición del scroll
   */
  function highlightActiveTag() {
    const sections = document.querySelectorAll('.tag-section');
    const bubbles = document.querySelectorAll('.tag-bubble');
    
    let currentSection = null;
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
      if (section.offsetTop <= scrollPosition) {
        currentSection = section;
      }
    });
    
    bubbles.forEach(bubble => {
      bubble.style.opacity = '0.6';
      if (currentSection && bubble.getAttribute('href') === '#' + currentSection.id) {
        bubble.style.opacity = '1';
        bubble.style.fontWeight = '700';
      } else {
        bubble.style.fontWeight = '500';
      }
    });
  }

  /**
   * Inicializa todas las funcionalidades cuando el DOM está listo
   */
  function init() {
    applyDynamicFontSizes();
    handleImageErrors();
    setupSmoothScroll();
    highlightActiveTag();
    
    // Escuchar eventos de scroll con throttling implícito
    window.addEventListener('scroll', highlightActiveTag);
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();