/**
 * Sistema de Comentarios Refactorizado con Firebase
 * Arquitectura modular con separación de responsabilidades
 * 
 * Módulos:
 * - CommentStorage: Operaciones con Firebase
 * - CommentValidator: Validación de entrada
 * - CommentRenderer: Renderizado del DOM
 * - DateFormatter: Formateo de fechas
 * - HTMLSanitizer: Sanitización de HTML
 * - ModalManager: Gestión de modales
 * - NotificationManager: Notificaciones al usuario
 * - CommentController: Coordinador principal
 */

// Importar Firebase desde CDN
import { getApps, initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Importar el controlador
import { CommentController } from './comments/controller.js';

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

/**
 * Inicializa el sistema de comentarios
 */
function initComments() {
  const commentForm = document.querySelector('.comment-form');
  
  if (commentForm) {
    const commentController = new CommentController(database, commentForm);
    
    // Guardar referencia global para debugging
    globalThis.commentController = commentController;
    
    console.log('✅ Sistema de comentarios refactorizado inicializado');
  }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComments);
} else {
  initComments();
}

// Función de utilidad para debugging (consola)
globalThis.debugComments = {
  /**
   * Obtiene el controlador actual
   */
  getController: () => globalThis.commentController,
  
  /**
   * Obtiene el ID del usuario actual
   */
  getUserId: () => globalThis.commentController?.userId,
  
  /**
   * Limpia el formulario
   */
  resetForm: () => globalThis.commentController?.reset(),
  
  /**
   * Información del sistema
   */
  info: () => {
    console.log('Sistema de Comentarios Refactorizado');
    console.log('Módulos: 8');
    console.log('Arquitectura: Modular con SRP');
    console.log('Estado: Activo');
  }
};

console.log('💬 Sistema de comentarios cargado. Usa debugComments.info() para más información.');