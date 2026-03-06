/**
 * Módulo de notificaciones para el sistema de comentarios
 * Muestra mensajes toast al usuario
 */

// Constantes de configuración
const NOTIFICATION_DURATION = 3000;
const ANIMATION_DURATION = 300;

export class NotificationManager {
  /**
   * Muestra una notificación al usuario
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo de notificación: 'success', 'error', 'warning', 'info'
   */
  static show(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `comment-notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto-cerrar después del tiempo configurado
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), ANIMATION_DURATION);
    }, NOTIFICATION_DURATION);
  }

  /**
   * Muestra una notificación de éxito
   * @param {string} message - Mensaje a mostrar
   */
  static success(message) {
    this.show(message, 'success');
  }

  /**
   * Muestra una notificación de error
   * @param {string} message - Mensaje a mostrar
   */
  static error(message) {
    this.show(message, 'error');
  }

  /**
   * Muestra una notificación de advertencia
   * @param {string} message - Mensaje a mostrar
   */
  static warning(message) {
    this.show(message, 'warning');
  }

  /**
   * Muestra una notificación informativa
   * @param {string} message - Mensaje a mostrar
   */
  static info(message) {
    this.show(message, 'info');
  }

  /**
   * Elimina todas las notificaciones activas
   */
  static clearAll() {
    const notifications = document.querySelectorAll('.comment-notification');
    notifications.forEach(notification => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), ANIMATION_DURATION);
    });
  }
}