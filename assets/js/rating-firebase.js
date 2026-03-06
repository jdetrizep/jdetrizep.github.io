/**
 * Sistema de Calificación de Estrellas para Posts con Firebase
 * Guarda las calificaciones en Firebase Realtime Database
 */

// Importar Firebase desde CDN
import { ref, set, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getFirebaseDatabase } from './firebase-config.js';
import { getUserId } from './utils/user-id.js';

// Obtener instancia de Firebase Database
const database = getFirebaseDatabase();

(function() {
  'use strict';

  // Clase para manejar el sistema de calificación
  class PostRating {
    constructor(container) {
      this.container = container;
      this.postId = container.dataset.postId;
      this.stars = container.querySelectorAll('.star');
      
      // Validar que el widget existe
      const widget = container.closest('.rating-widget');
      if (!widget) {
        throw new Error('Rating widget container not found');
      }
      
      this.ratingValue = widget.querySelector('.rating-value');
      this.ratingStars = widget.querySelector('.rating-stars');
      this.ratingCount = widget.querySelector('.count');
      this.ratingMessage = widget.querySelector('.rating-message');
      
      // Validar elementos requeridos
      if (!this.ratingValue || !this.ratingStars || !this.ratingCount || !this.ratingMessage) {
        throw new Error('Required rating elements not found in DOM');
      }
      
      // Generar ID único para el usuario (basado en fingerprint del navegador)
      this.userId = getUserId();
    }

    /**
     * Método factory estático para crear e inicializar una instancia
     * @param {HTMLElement} container - Contenedor de estrellas
     * @returns {Promise<PostRating>} Instancia inicializada
     */
    static async create(container) {
      const instance = new PostRating(container);
      await instance.init();
      return instance;
    }

    async init() {
      try {
        // Cargar calificaciones existentes desde Firebase
        await this.loadRatings();
        
        // Agregar event listeners
        this.stars.forEach((star, index) => {
          // Hover effect
          star.addEventListener('mouseenter', () => this.handleHover(index));
          star.addEventListener('mouseleave', () => this.handleMouseLeave());
          
          // Click para calificar
          star.addEventListener('click', () => this.handleRating(index + 1));
        });

        // Verificar si el usuario ya calificó
        await this.checkUserRating();
      } catch (error) {
        console.error('Error inicializando calificaciones:', error);
        this.showMessage('Error al cargar calificaciones', 'warning');
      }
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

    async handleRating(value) {
      try {
        // Verificar si ya calificó
        const userRatingRef = ref(database, `ratings/${this.postId}/users/${this.userId}`);
        const snapshot = await get(userRatingRef);
        
        if (snapshot.exists()) {
          this.showMessage('Ya has calificado este artículo anteriormente', 'warning');
          return;
        }

        // Guardar la calificación del usuario
        await set(userRatingRef, {
          rating: value,
          timestamp: Date.now()
        });

        // Actualizar estadísticas
        await this.updateStats();

        // Actualizar la visualización
        await this.loadRatings();
        
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
      } catch (error) {
        console.error('Error guardando calificación:', error);
        this.showMessage('Error al guardar calificación. Intenta de nuevo.', 'warning');
      }
    }

    async updateStats() {
      try {
        const ratingsRef = ref(database, `ratings/${this.postId}/users`);
        const snapshot = await get(ratingsRef);
        
        if (snapshot.exists()) {
          const users = snapshot.val();
          const ratings = Object.values(users).map(u => u.rating);
          const sum = ratings.reduce((acc, val) => acc + val, 0);
          const average = (sum / ratings.length).toFixed(1);
          
          // Actualizar estadísticas
          const statsRef = ref(database, `ratings/${this.postId}/stats`);
          await set(statsRef, {
            average: Number.parseFloat(average),
            count: ratings.length,
            lastUpdated: Date.now()
          });
        }
      } catch (error) {
        console.error('Error actualizando estadísticas:', error);
      }
    }

    async loadRatings() {
      try {
        const statsRef = ref(database, `ratings/${this.postId}/stats`);
        const snapshot = await get(statsRef);
        
        if (snapshot.exists()) {
          const stats = snapshot.val();
          this.updateDisplay(stats.average, stats.count);
        } else {
          this.updateDisplay(0, 0);
        }
      } catch (error) {
        console.error('Error cargando calificaciones:', error);
        this.updateDisplay(0, 0);
      }
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

    updateDisplay(average, count) {
      this.ratingValue.textContent = average.toFixed(1);
      this.ratingStars.textContent = this.getStarsDisplay(average);
      this.ratingCount.textContent = count;
    }

    async checkUserRating() {
      try {
        const userRatingRef = ref(database, `ratings/${this.postId}/users/${this.userId}`);
        const snapshot = await get(userRatingRef);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const value = userData.rating;
          
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
      } catch (error) {
        console.error('Error verificando calificación del usuario:', error);
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
  async function initRatings() {
    // Validar que Firebase esté inicializado
    if (!database) {
      console.error('Firebase database not initialized');
      return;
    }

    const ratingContainers = document.querySelectorAll('.stars-container');
    
    // Inicializar todas las instancias de forma asíncrona
    const initPromises = Array.from(ratingContainers).map(async (container) => {
      try {
        await PostRating.create(container);
      } catch (error) {
        console.error('Error initializing rating for container:', container, error);
      }
    });

    // Esperar a que todas las instancias se inicialicen
    await Promise.all(initPromises);
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRatings);
  } else {
    initRatings();
  }

  // Función de utilidad para ver todas las calificaciones (consola)
  globalThis.viewAllRatings = async function() {
    try {
      const ratingsRef = ref(database, 'ratings');
      const snapshot = await get(ratingsRef);
      
      if (snapshot.exists()) {
        console.table(snapshot.val());
      } else {
        console.log('No hay calificaciones aún');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

})();