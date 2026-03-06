/**
 * Controlador principal del sistema de calificaciones
 * Coordina los módulos de Storage, Calculator y UI
 */

import { RatingStorage } from './storage.js';
import { RatingCalculator } from './calculator.js';
import { RatingUI } from './ui.js';

export class RatingController {
  /**
   * Crea una instancia del controlador de calificaciones
   * @param {HTMLElement} container - Contenedor de las estrellas
   */
  constructor(container) {
    this.postId = container.dataset.postId;
    
    // Inicializar módulos
    this.storage = new RatingStorage(this.postId);
    this.ui = new RatingUI(container);
    
    this.init();
  }

  /**
   * Inicializa el sistema de calificaciones
   */
  init() {
    // Cargar y mostrar calificaciones existentes
    this.loadAndDisplayRatings();
    
    // Configurar event listeners
    this.ui.attachEventListeners(
      (index) => this.handleHover(index),
      () => this.handleMouseLeave(),
      (value) => this.handleRating(value)
    );
    
    // Verificar si el usuario ya calificó
    this.checkUserRating();
  }

  /**
   * Maneja el evento hover
   * @param {number} index - Índice de la estrella
   */
  handleHover(index) {
    this.ui.handleHover(index);
  }

  /**
   * Maneja el evento mouse leave
   */
  handleMouseLeave() {
    this.ui.handleMouseLeave();
  }

  /**
   * Maneja el evento de calificación
   * @param {number} value - Valor de la calificación (1-5)
   */
  handleRating(value) {
    // Validar calificación
    if (!RatingCalculator.isValidRating(value)) {
      this.ui.showMessage('Calificación inválida. Debe ser entre 1 y 5.', 'error');
      return;
    }

    // Verificar si ya calificó
    const existingRating = this.storage.getUserRating();
    if (existingRating !== null) {
      this.ui.showMessage('Ya has calificado este artículo anteriormente', 'warning');
      return;
    }

    // Guardar calificación
    const savedUser = this.storage.saveUserRating(value);
    const savedRating = this.storage.addRating(value);
    
    if (!savedUser || !savedRating) {
      this.ui.showMessage(
        'Error al guardar calificación. Verifica que las cookies estén habilitadas.',
        'error'
      );
      return;
    }

    // Actualizar visualización
    this.loadAndDisplayRatings();
    this.ui.markAsRated(value);
    this.ui.showMessage('¡Gracias por tu calificación!', 'success');
    this.ui.disable();
  }

  /**
   * Carga las calificaciones y actualiza la visualización
   */
  loadAndDisplayRatings() {
    const ratings = this.storage.getAllRatings();
    const stats = RatingCalculator.getStatistics(ratings);
    const starsDisplay = RatingCalculator.getStarsDisplay(stats.average);
    
    this.ui.updateDisplay(stats.average, stats.count, starsDisplay);
  }

  /**
   * Verifica si el usuario ya calificó este post
   */
  checkUserRating() {
    const userRating = this.storage.getUserRating();
    
    if (userRating !== null) {
      // Marcar las estrellas como calificadas
      this.ui.markAsRated(userRating);
      this.ui.disable();
      
      // Mostrar mensaje informativo
      const plural = userRating > 1 ? 's' : '';
      this.ui.showMessage(
        `Tu calificación: ${userRating} estrella${plural}`,
        'info'
      );
    }
  }

  /**
   * Limpia todas las calificaciones (útil para desarrollo/testing)
   */
  clearRatings() {
    this.storage.clear();
    this.loadAndDisplayRatings();
    this.ui.enable();
    this.ui.showMessage('Calificaciones eliminadas', 'info');
  }
}