/**
 * Sistema de Calificación de Estrellas para Posts
 * Guarda las calificaciones en localStorage del navegador
 */

(function() {
  'use strict';

  // Clase para manejar el sistema de calificación
  class PostRating {
    constructor(container) {
      this.container = container;
      this.postId = container.dataset.postId;
      this.stars = container.querySelectorAll('.star');
      this.ratingValue = container.closest('.rating-widget').querySelector('.rating-value');
      this.ratingStars = container.closest('.rating-widget').querySelector('.rating-stars');
      this.ratingCount = container.closest('.rating-widget').querySelector('.count');
      this.ratingMessage = container.closest('.rating-widget').querySelector('.rating-message');
      
      this.storageKey = `post_rating_${this.postId}`;
      this.ratingsKey = `post_ratings_${this.postId}`;
      
      this.init();
    }

    init() {
      // Cargar calificaciones existentes
      this.loadRatings();
      
      // Agregar event listeners
      this.stars.forEach((star, index) => {
        // Hover effect
        star.addEventListener('mouseenter', () => this.handleHover(index));
        star.addEventListener('mouseleave', () => this.handleMouseLeave());
        
        // Click para calificar
        star.addEventListener('click', () => this.handleRating(index + 1));
      });

      // Verificar si el usuario ya calificó
      this.checkUserRating();
    }

    handleHover(index) {
      this.stars.forEach((star, i) => {
        if (i <= index) {
          star.classList.add('hover');
        } else {
          star.classList.remove('hover');
        }
      });
    }

    handleMouseLeave() {
      this.stars.forEach(star => star.classList.remove('hover'));
    }

    handleRating(value) {
      // Verificar si ya calificó
      const userRating = localStorage.getItem(this.storageKey);
      
      if (userRating) {
        this.showMessage('Ya has calificado este artículo anteriormente', 'warning');
        return;
      }

      // Guardar la calificación del usuario
      localStorage.setItem(this.storageKey, value);
      
      // Agregar a la lista de calificaciones
      const ratings = this.getRatings();
      ratings.push(value);
      localStorage.setItem(this.ratingsKey, JSON.stringify(ratings));

      // Actualizar la visualización
      this.updateDisplay();
      
      // Marcar estrellas como calificadas
      this.stars.forEach((star, i) => {
        if (i < value) {
          star.classList.add('active');
          setTimeout(() => {
            star.classList.remove('active');
            star.classList.add('rated');
          }, 300);
        }
      });

      // Mostrar mensaje de agradecimiento
      this.showMessage('¡Gracias por tu calificación!', 'success');

      // Deshabilitar más clics
      this.container.style.pointerEvents = 'none';
    }

    getRatings() {
      const stored = localStorage.getItem(this.ratingsKey);
      return stored ? JSON.parse(stored) : [];
    }

    calculateAverage() {
      const ratings = this.getRatings();
      if (ratings.length === 0) return 0;
      
      const sum = ratings.reduce((acc, val) => acc + val, 0);
      return (sum / ratings.length).toFixed(1);
    }

    getStarsDisplay(average) {
      const fullStars = Math.floor(average);
      const hasHalfStar = average % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      
      let display = '★'.repeat(fullStars);
      if (hasHalfStar) display += '⯨';
      display += '☆'.repeat(emptyStars);
      
      return display;
    }

    loadRatings() {
      this.updateDisplay();
    }

    updateDisplay() {
      const average = this.calculateAverage();
      const ratings = this.getRatings();
      
      this.ratingValue.textContent = average;
      this.ratingStars.textContent = this.getStarsDisplay(parseFloat(average));
      this.ratingCount.textContent = ratings.length;
    }

    checkUserRating() {
      const userRating = localStorage.getItem(this.storageKey);
      
      if (userRating) {
        const value = parseInt(userRating);
        
        // Marcar las estrellas como calificadas
        this.stars.forEach((star, i) => {
          if (i < value) {
            star.classList.add('rated');
          }
        });
        
        // Deshabilitar más clics
        this.container.style.pointerEvents = 'none';
        
        // Mostrar mensaje informativo
        this.showMessage(`Tu calificación: ${value} estrella${value > 1 ? 's' : ''}`, 'info');
      }
    }

    showMessage(text, type = 'success') {
      this.ratingMessage.textContent = text;
      this.ratingMessage.style.display = 'block';
      
      // Cambiar color según el tipo
      if (type === 'warning') {
        this.ratingMessage.style.background = '#fff3cd';
        this.ratingMessage.style.color = '#856404';
      } else if (type === 'info') {
        this.ratingMessage.style.background = '#d1ecf1';
        this.ratingMessage.style.color = '#0c5460';
      } else {
        this.ratingMessage.style.background = '#d4edda';
        this.ratingMessage.style.color = '#155724';
      }

      // Ocultar después de 5 segundos
      setTimeout(() => {
        this.ratingMessage.style.display = 'none';
      }, 5000);
    }
  }

  // Inicializar cuando el DOM esté listo
  function initRatings() {
    const ratingContainers = document.querySelectorAll('.stars-container');
    
    ratingContainers.forEach(container => {
      new PostRating(container);
    });
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRatings);
  } else {
    initRatings();
  }

  // Exportar función para limpiar calificaciones (útil para desarrollo)
  window.clearPostRatings = function(postId) {
    if (postId) {
      localStorage.removeItem(`post_rating_${postId}`);
      localStorage.removeItem(`post_ratings_${postId}`);
      console.log(`Calificaciones eliminadas para: ${postId}`);
    } else {
      // Limpiar todas las calificaciones
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('post_rating_') || key.startsWith('post_ratings_')) {
          localStorage.removeItem(key);
        }
      });
      console.log('Todas las calificaciones han sido eliminadas');
    }
    location.reload();
  };

})();