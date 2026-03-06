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

import { getApps, initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { CommentsController } from './comments/controller.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA4Dzhnk7-QkknIrQWhMNCC5as1CSs-Y7M",
  authDomain: "jdetrizep-blog.firebaseapp.com",
  databaseURL: "https://jdetrizep-blog-default-rtdb.firebaseio.com",
  projectId: "jdetrizep-blog",
  storageBucket: "jdetrizep-blog.firebasestorage.app",
  messagingSenderId: "355885882700",
  appId: "1:355885882700:web:894592581a7627f4c183e9"
};

// Inicializar Firebase (reutilizar app existente si ya está inicializada)
let app;
const existingApps = getApps();
if (existingApps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = existingApps[0];
}
const database = getDatabase(app);

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