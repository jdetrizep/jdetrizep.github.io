/**
 * CommentsController - Controlador principal del sistema de comentarios
 * Orquesta todos los módulos y maneja la lógica de negocio
 */

import { CommentsStorage } from './storage.js';
import { CommentsValidator } from './validator.js';
import { CommentsSanitizer } from './sanitizer.js';
import { CommentsNotification } from './notification.js';
import { CommentsUI } from './ui.js';

export class CommentsController {
  /**
   * @param {Object} database - Instancia de Firebase Database
   * @param {HTMLFormElement} form - Formulario de comentarios
   */
  constructor(database, form) {
    this.form = form;
    this.postId = form.dataset.postId;
    
    // Referencias DOM
    this.nameInput = form.querySelector('#comment-name');
    this.commentInput = form.querySelector('#comment-text');
    this.charCount = form.querySelector('.char-count .current');
    this.submitBtn = form.querySelector('.submit-comment-btn');
    this.btnText = this.submitBtn.querySelector('.btn-text');
    this.btnLoading = this.submitBtn.querySelector('.btn-loading');
    
    this.commentsList = document.querySelector('.comments-list');
    this.commentsCount = document.querySelector('.comments-count .count');
    this.noComments = document.querySelector('.no-comments');
    
    // Inicializar módulos
    this.storage = new CommentsStorage(database, this.postId);
    this.ui = new CommentsUI(this.commentsList, this.commentsCount, this.noComments);
    this.userId = CommentsStorage.getUserId();
    
    this.init();
  }

  /**
   * Inicializa el controlador
   */
  init() {
    this.loadComments();
    this.attachEventListeners();
  }

  /**
   * Adjunta event listeners
   */
  attachEventListeners() {
    // Contador de caracteres
    this.commentInput.addEventListener('input', () => {
      this.updateCharCount();
    });
    
    // Envío de formulario
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  /**
   * Actualiza el contador de caracteres
   */
  updateCharCount() {
    const length = this.commentInput.value.length;
    CommentsUI.updateCharCount(
      this.charCount,
      length,
      CommentsValidator.MAX_COMMENT_LENGTH
    );
  }

  /**
   * Maneja el envío del formulario
   */
  async handleSubmit() {
    const name = this.nameInput.value.trim();
    const comment = this.commentInput.value.trim();
    
    // Validar
    const validation = CommentsValidator.validate(name, comment);
    if (!validation.valid) {
      CommentsNotification.show(validation.error, 'error');
      return;
    }
    
    // Mostrar estado de carga
    this.setLoading(true);
    
    // Guardar comentario
    await this.saveComment(name, comment);
  }

  /**
   * Guarda un comentario
   */
  async saveComment(name, comment) {
    try {
      const commentData = {
        name: CommentsSanitizer.sanitizeHTML(name),
        comment: CommentsSanitizer.sanitizeHTML(comment),
        timestamp: Date.now(),
        date: new Date().toISOString(),
        userId: this.userId
      };
      
      await this.storage.saveComment(commentData);
      
      // Limpiar formulario
      this.form.reset();
      this.updateCharCount();
      this.setLoading(false);
      
      // Mostrar notificación
      CommentsNotification.show('¡Comentario publicado exitosamente!', 'success');
      
      // Scroll al nuevo comentario
      this.ui.scrollToLatest();
    } catch (error) {
      console.error('Error al guardar comentario:', error);
      this.setLoading(false);
      CommentsNotification.show('Error al publicar el comentario. Intenta de nuevo.', 'error');
    }
  }

  /**
   * Carga comentarios desde Firebase
   */
  loadComments() {
    this.storage.listenToComments(
      (comments) => this.handleCommentsLoaded(comments),
      (error) => this.handleCommentsError(error)
    );
  }

  /**
   * Maneja comentarios cargados
   */
  handleCommentsLoaded(comments) {
    // Actualizar contador
    this.ui.updateCount(comments.length);
    
    // Mostrar/ocultar mensaje de sin comentarios
    this.ui.toggleNoComments(comments.length === 0);
    
    if (comments.length === 0) {
      this.ui.clearComments();
      return;
    }
    
    // Limpiar y renderizar comentarios
    this.ui.clearComments();
    comments.forEach(comment => {
      this.ui.renderComment(
        comment,
        this.userId,
        (commentId, userId) => this.handleDelete(commentId, userId)
      );
    });
  }

  /**
   * Maneja errores al cargar comentarios
   */
  handleCommentsError(error) {
    console.error('Error cargando comentarios:', error);
    CommentsNotification.show('Error al cargar comentarios', 'error');
  }

  /**
   * Maneja la eliminación de un comentario
   */
  handleDelete(commentId, commentUserId) {
    // Verificar permisos
    if (!CommentsValidator.canDelete(commentUserId, this.userId)) {
      CommentsNotification.show('Solo puedes eliminar tus propios comentarios', 'error');
      return;
    }
    
    // Mostrar confirmación
    CommentsNotification.showDeleteConfirmation(
      () => this.performDelete(commentId)
    );
  }

  /**
   * Ejecuta la eliminación del comentario
   */
  async performDelete(commentId) {
    try {
      await this.storage.deleteComment(commentId);
      CommentsNotification.show('Comentario eliminado', 'info');
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      CommentsNotification.show('Error al eliminar el comentario', 'error');
    }
  }

  /**
   * Establece el estado de carga
   */
  setLoading(loading) {
    if (loading) {
      CommentsUI.enableLoadingState(
        this.submitBtn,
        this.btnText,
        this.btnLoading
      );
    } else {
      CommentsUI.disableLoadingState(
        this.submitBtn,
        this.btnText,
        this.btnLoading
      );
    }
  }
}