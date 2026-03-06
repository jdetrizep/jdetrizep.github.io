/**
 * CommentsNotification - Sistema de notificaciones
 * Responsable de mostrar mensajes al usuario
 */

export class CommentsNotification {
  static DISPLAY_DURATION = 3000;
  static ANIMATION_DELAY = 10;
  static FADE_OUT_DURATION = 300;

  /**
   * Muestra una notificación al usuario
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo de notificación (info, success, error)
   */
  static show(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `comment-notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => notification.classList.add('show'), this.ANIMATION_DELAY);
    
    // Animar salida y remover
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), this.FADE_OUT_DURATION);
    }, this.DISPLAY_DURATION);
  }

  /**
   * Muestra un modal de confirmación para eliminar
   * @param {Function} onConfirm - Callback cuando se confirma
   * @param {Function} onCancel - Callback cuando se cancela
   */
  static showDeleteConfirmation(onConfirm, onCancel = null) {
    const modal = document.createElement('div');
    modal.className = 'delete-modal-overlay';
    modal.innerHTML = `
      <div class="delete-modal">
        <div class="delete-modal-icon">⚠️</div>
        <h3 class="delete-modal-title">¿Eliminar comentario?</h3>
        <p class="delete-modal-message">Esta acción no se puede deshacer</p>
        <div class="delete-modal-buttons">
          <button class="delete-modal-cancel">Cancelar</button>
          <button class="delete-modal-confirm">Eliminar</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animar entrada
    setTimeout(() => modal.classList.add('show'), this.ANIMATION_DELAY);
    
    const cancelBtn = modal.querySelector('.delete-modal-cancel');
    const confirmBtn = modal.querySelector('.delete-modal-confirm');
    
    const closeModal = () => {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), this.FADE_OUT_DURATION);
      if (onCancel) onCancel();
    };
    
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    
    confirmBtn.addEventListener('click', () => {
      closeModal();
      onConfirm();
    });
  }
}