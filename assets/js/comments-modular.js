/**
 * Sistema de Comentarios Modular con Firebase
 * Arquitectura refactorizada con separación de responsabilidades
 *
 * Módulos:
 * - storage.js: Manejo de Firebase Database
 * - validator.js: Validación de datos
 * - sanitizer.js: Seguridad y sanitización
 * - formatter.js: Formateo de fechas y texto
 * - notification.js: Sistema de notificaciones
 * - ui.js: Renderizado de interfaz
 * - controller.js: Orquestador principal
 */

import { getFirebaseDatabase } from './firebase-config.js';
import { CommentsController } from './comments/controller.js';

// Obtener instancia de Firebase Database
const database = getFirebaseDatabase();

(function() {
  'use strict';

  /**
   * Inicializa el sistema de comentarios
   */
  function initComments() {
    const commentForm = document.querySelector('.comment-form');
    
    if (commentForm) {
      const commentsController = new CommentsController(database, commentForm);
      
      // Guardar referencia global para debugging
      globalThis.commentsController = commentsController;
    }
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComments);
  } else {
    initComments();
  }

})();