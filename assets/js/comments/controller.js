/**
 * Controlador principal del sistema de comentarios
 * Coordina la interacción entre todos los módulos
 */

import { CommentStorage } from './storage.js';
import { CommentValidator } from './validator.js';
import { CommentRenderer } from './renderer.js';
import { HTMLSanitizer } from './sanitizer.js';
import { NotificationManager } from './notification.js';
import { ModalManager } from './modal.js';

export class CommentController {
  /**
   * Crea una instancia del controlador de comentarios
   * @param {Object} database - Instancia de Firebase Database
   * @param {HTMLElement} form - Formulario de comentarios
   */
  constructor(database, form) {
    this.form = form;
    this.postId = form.dataset.postId;
    
    // Elementos del formulario
    this.nameInput = form.querySelector('#comment-name');
    this.commentInput = form.querySelector('#comment-text');
    this.charCount = form.querySelector('.char-count .current');
    this.submitBtn = form.querySelector('.submit-comment-btn');
    this.btnText = this.submitBtn.querySelector('.btn-text');
    this.btnLoading = this.submitBtn.querySelector('.btn-loading');
    
    // Elementos de la lista
    this.commentsList = document.querySelector('.comments-list');
    this.commentsCount = document.querySelector('.comments-count .count');
    this.noComments = document.querySelector('.no-comments');
    
    // Inicializar módulos
    this.userId = CommentStorage.getUserId();
    this.storage = new CommentStorage(database, this.postId);
    this.renderer = new CommentRenderer(
      this.commentsList,
      this.commentsCount,
      this.noComments,
      this.userId
    );
    
    this.init();
  }

  /**
   * Inicializa el controlador y sus event listeners
   */
  init() {
    // Cargar comentarios existentes
    this.loadComments();
    
    // Event listener para el contador de caracteres
    this.commentInput.addEventListener('input', () => {
      this.updateCharCount();
    });
    
    // Event listener para el formulario
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  /**
   * Carga los comentarios desde Firebase
   */
  loadComments() {
    this.storage.listenToComments(
      (comments) => {
        this.renderer.renderComments(comments);
        
        // Actualizar el renderizado con el callback de eliminación
        comments.forEach(comment => {
          const element = this.commentsList.querySelector(`[data-comment-id="${comment.id}"]`);
          if (element && comment.userId === this.userId) {
            const deleteBtn = element.querySelector('.delete-comment-btn');
            if (deleteBtn) {
              deleteBtn.addEventListener('click', () => this.handleDelete(comment.id, comment.userId));
            }
          }
        });
      },
      (error) => {
        NotificationManager.error('Error al cargar comentarios');
      }
    );
  }

  /**
   * Actualiza el contador de caracteres
   */
  updateCharCount() {
    const length = this.commentInput.value.length;
    this.charCount.textContent = length;
    
    // Cambiar color según el nivel de advertencia
    const warningLevel = CommentValidator.getWarningLevel(length);
    
    switch (warningLevel) {
      case 'critical':
        this.charCount.style.color = '#dc3545';
        break;
      case 'warning':
        this.charCount.style.color = '#ffc107';
        break;
      default:
        this.charCount.style.color = '#6c757d';
    }
  }

  /**
   * Maneja el envío del formulario
   */
  async handleSubmit() {
    const name = HTMLSanitizer.trim(this.nameInput.value);
    const comment = HTMLSanitizer.trim(this.commentInput.value);
    
    // Validar entrada
    const validation = CommentValidator.validate(name, comment);
    if (!validation.valid) {
      NotificationManager.error(validation.error);
      return;
    }
    
    // Mostrar estado de carga
    this.setLoading(true);
    
    try {
      // Sanitizar y guardar
      const commentData = {
        name: HTMLSanitizer.sanitize(name),
        comment: HTMLSanitizer.sanitize(comment),
        userId: this.userId
      };
      
      const commentId = await this.storage.saveComment(commentData);
      
      // Limpiar formulario
      this.form.reset();
      this.updateCharCount();
      this.setLoading(false);
      
      // Mostrar notificación de éxito
      NotificationManager.success('¡Comentario publicado exitosamente!');
      
      // Resaltar el nuevo comentario después de un momento
      setTimeout(() => {
        this.renderer.highlightNewest();
      }, 500);
    } catch (error) {
      this.setLoading(false);
      NotificationManager.error('Error al publicar el comentario. Intenta de nuevo.');
    }
  }

  /**
   * Maneja la eliminación de un comentario
   * @param {string} commentId - ID del comentario
   * @param {string} commentUserId - ID del usuario que creó el comentario
   */
  async handleDelete(commentId, commentUserId) {
    // Verificar que sea el propio comentario
    if (commentUserId !== this.userId) {
      NotificationManager.error('Solo puedes eliminar tus propios comentarios');
      return;
    }
    
    // Mostrar modal de confirmación
    const confirmed = await ModalManager.showDeleteConfirmation();
    
    if (!confirmed) {
      return;
    }
    
    try {
      await this.storage.deleteComment(commentId);
      NotificationManager.info('Comentario eliminado');
    } catch (error) {
      NotificationManager.error('Error al eliminar el comentario');
    }
  }

  /**
   * Establece el estado de carga del botón de envío
   * @param {boolean} loading - true para mostrar estado de carga
   */
  setLoading(loading) {
    if (loading) {
      this.submitBtn.disabled = true;
      this.btnText.style.display = 'none';
      this.btnLoading.style.display = 'inline';
    } else {
      this.submitBtn.disabled = false;
      this.btnText.style.display = 'inline';
      this.btnLoading.style.display = 'none';
    }
  }

  /**
   * Limpia el formulario
   */
  reset() {
    this.form.reset();
    this.updateCharCount();
  }
}