/**
 * Sistema de Calificación de Estrellas para Posts (Refactorizado)
 * Versión modular con separación de responsabilidades
 * 
 * Arquitectura:
 * - RatingStorage: Manejo de localStorage
 * - RatingCalculator: Cálculos y estadísticas
 * - RatingUI: Manipulación del DOM
 * - RatingController: Coordinación de módulos
 */

import { RatingController } from './rating/controller.js';

(function() {
  'use strict';

  /**
   * Inicializa el sistema de calificaciones para todos los contenedores
   */
  function initRatings() {
    const ratingContainers = document.querySelectorAll('.stars-container');
    
    if (ratingContainers.length === 0) {
      return;
    }

    // Crear una instancia del controlador para cada contenedor
    const controllers = [];
    ratingContainers.forEach(container => {
      try {
        const controller = new RatingController(container);
        controllers.push(controller);
      } catch (error) {
        console.error('Error al inicializar calificaciones:', error);
      }
    });

    // Exportar función global para limpiar calificaciones (desarrollo/testing)
    globalThis.clearPostRatings = function(postId) {
      if (postId) {
        // Limpiar calificaciones de un post específico
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
      globalThis.location.reload();
    };

    // Guardar referencia global para debugging
    globalThis.ratingControllers = controllers;
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRatings);
  } else {
    initRatings();
  }

})();