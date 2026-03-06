/**
 * Módulo de gestión de modales para el sistema de comentarios
 * Maneja la creación y control de diálogos modales
 */

// Constantes de configuración
const MODAL_ANIMATION_DURATION = 300;

export class ModalManager {
  /**
   * Muestra un modal de confirmación
   * @param {Object} options - Opciones del modal
   * @param {string} options.title - Título del modal
   * @param {string} options.message - Mensaje del modal
   * @param {string} options.icon - Emoji o icono a mostrar
   * @param {string} options.confirmText - Texto del botón de confirmación
   * @param {string} options.cancelText - Texto del botón de cancelar
   * @returns {Promise<boolean>} true si se confirmó, false si se canceló
   */
  static showConfirmation(options) {
    return new Promise((resolve) => {
      const {
        title = '¿Estás seguro?',
        message = 'Esta acción no se puede deshacer',
        icon = '⚠️',
        confirmText = 'Confirmar',
        cancelText = 'Cancelar'
      } = options;

      // Crear modal
      const modal = document.createElement('div');
      modal.className = 'delete-modal-overlay';
      modal.innerHTML = `
        <div class="delete-modal">
          <div class="delete-modal-icon">${icon}</div>
          <h3 class="delete-modal-title">${title}</h3>
          <p class="delete-modal-message">${message}</p>
          <div class="delete-modal-buttons">
            <button class="delete-modal-cancel">${cancelText}</button>
            <button class="delete-modal-confirm">${confirmText}</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Animar entrada
      setTimeout(() => modal.classList.add('show'), 10);
      
      // Función para cerrar el modal
      const closeModal = (confirmed) => {
        modal.classList.remove('show');
        setTimeout(() => {
          modal.remove();
          resolve(confirmed);
        }, MODAL_ANIMATION_DURATION);
      };
      
      // Event listeners
      const cancelBtn = modal.querySelector('.delete-modal-cancel');
      const confirmBtn = modal.querySelector('.delete-modal-confirm');
      
      cancelBtn.addEventListener('click', () => closeModal(false));
      confirmBtn.addEventListener('click', () => closeModal(true));
      
      // Cerrar al hacer click fuera del modal
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(false);
        }
      });
      
      // Cerrar con tecla Escape
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal(false);
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
    });
  }

  /**
   * Muestra un modal de confirmación para eliminar
   * @returns {Promise<boolean>} true si se confirmó la eliminación
   */
  static showDeleteConfirmation() {
    return this.showConfirmation({
      title: '¿Eliminar comentario?',
      message: 'Esta acción no se puede deshacer',
      icon: '⚠️',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar'
    });
  }

  /**
   * Cierra todos los modales activos
   */
  static closeAll() {
    const modals = document.querySelectorAll('.delete-modal-overlay');
    modals.forEach(modal => {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), MODAL_ANIMATION_DURATION);
    });
  }
}