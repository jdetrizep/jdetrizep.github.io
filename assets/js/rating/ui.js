/**
 * Módulo de interfaz de usuario para el sistema de calificaciones
 * Maneja toda la manipulación del DOM y la presentación visual
 */

// Constantes de configuración
const ANIMATION_DURATION = 300;
const MESSAGE_DISPLAY_TIME = 5000;

export class RatingUI {
  /**
   * Crea una instancia del gestor de UI
   * @param {HTMLElement} container - Contenedor de las estrellas
   */
  constructor(container) {
    this.container = container;
    this.stars = container.querySelectorAll('.star');
    
    const widget = container.closest('.rating-widget');
    this.ratingValue = widget.querySelector('.rating-value');
    this.ratingStars = widget.querySelector('.rating-stars');
    this.ratingCount = widget.querySelector('.count');
    this.ratingMessage = widget.querySelector('.rating-message');
  }

  /**
   * Maneja el efecto hover sobre las estrellas
   * @param {number} index - Índice de la estrella (0-4)
   */
  handleHover(index) {
    this.stars.forEach((star, i) => {
      if (i <= index) {
        star.classList.add('hover');
      } else {
        star.classList.remove('hover');
      }
    });
  }

  /**
   * Remueve el efecto hover de todas las estrellas
   */
  handleMouseLeave() {
    this.stars.forEach(star => star.classList.remove('hover'));
  }

  /**
   * Marca las estrellas como calificadas con animación
   * @param {number} value - Número de estrellas a marcar (1-5)
   */
  markAsRated(value) {
    this.stars.forEach((star, i) => {
      if (i < value) {
        star.classList.add('active');
        setTimeout(() => {
          star.classList.remove('active');
          star.classList.add('rated');
        }, ANIMATION_DURATION);
      }
    });
  }

  /**
   * Actualiza la visualización de las estadísticas
   * @param {number} average - Promedio de calificaciones
   * @param {number} count - Número total de calificaciones
   * @param {string} starsDisplay - Representación visual de estrellas
   */
  updateDisplay(average, count, starsDisplay) {
    this.ratingValue.textContent = average.toFixed(1);
    this.ratingStars.textContent = starsDisplay;
    this.ratingCount.textContent = count;
  }

  /**
   * Muestra un mensaje al usuario
   * @param {string} text - Texto del mensaje
   * @param {string} type - Tipo de mensaje: 'success', 'warning', 'info', 'error'
   */
  showMessage(text, type = 'success') {
    this.ratingMessage.textContent = text;
    this.ratingMessage.style.display = 'block';
    
    // Aplicar estilos según el tipo
    const styles = {
      success: { background: '#d4edda', color: '#155724' },
      warning: { background: '#fff3cd', color: '#856404' },
      info: { background: '#d1ecf1', color: '#0c5460' },
      error: { background: '#f8d7da', color: '#721c24' }
    };
    
    const style = styles[type] || styles.info;
    this.ratingMessage.style.background = style.background;
    this.ratingMessage.style.color = style.color;

    // Ocultar después de un tiempo
    setTimeout(() => {
      this.ratingMessage.style.display = 'none';
    }, MESSAGE_DISPLAY_TIME);
  }

  /**
   * Deshabilita la interacción con las estrellas
   */
  disable() {
    this.container.style.pointerEvents = 'none';
  }

  /**
   * Habilita la interacción con las estrellas
   */
  enable() {
    this.container.style.pointerEvents = 'auto';
  }

  /**
   * Agrega event listeners a las estrellas
   * @param {Function} onHover - Callback para hover
   * @param {Function} onMouseLeave - Callback para mouse leave
   * @param {Function} onClick - Callback para click
   */
  attachEventListeners(onHover, onMouseLeave, onClick) {
    this.stars.forEach((star, index) => {
      // Hover effect
      star.addEventListener('mouseenter', () => onHover(index));
      star.addEventListener('mouseleave', onMouseLeave);
      
      // Click para calificar
      star.addEventListener('click', () => onClick(index + 1));
    });
  }
}