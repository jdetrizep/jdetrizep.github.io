/**
 * CommentsUI - Renderizado de interfaz de usuario
 * Responsable de crear y manipular elementos DOM
 */

import { CommentsFormatter } from './formatter.js';
import { CommentsSanitizer } from './sanitizer.js';

export class CommentsUI {
  static HIGHLIGHT_DURATION = 2000;
  static SCROLL_DELAY = 500;

  /**
   * @param {HTMLElement} commentsList - Contenedor de comentarios
   * @param {HTMLElement} commentsCount - Elemento del contador
   * @param {HTMLElement} noComments - Mensaje de sin comentarios
   */
  constructor(commentsList, commentsCount, noComments) {
    this.commentsList = commentsList;
    this.commentsCount = commentsCount;
    this.noComments = noComments;
  }

  /**
   * Actualiza el contador de comentarios
   * @param {number} count - Número de comentarios
   */
  updateCount(count) {
    this.commentsCount.textContent = count;
  }

  /**
   * Muestra u oculta el mensaje de sin comentarios
   * @param {boolean} show - Si debe mostrar el mensaje
   */
  toggleNoComments(show) {
    this.noComments.style.display = show ? 'block' : 'none';
  }

  /**
   * Limpia todos los comentarios del DOM
   */
  clearComments() {
    const existingComments = this.commentsList.querySelectorAll('.comment-item');
    existingComments.forEach(c => c.remove());
  }

  /**
   * Renderiza un comentario en el DOM
   * @param {Object} comment - Datos del comentario
   * @param {string} currentUserId - ID del usuario actual
   * @param {Function} onDelete - Callback para eliminar
   */
  renderComment(comment, currentUserId, onDelete) {
    try {
      // Validar datos del comentario
      if (!comment?.id || !comment?.name || !comment?.comment) {
        console.error('Datos de comentario inválidos:', comment);
        return;
      }

      const commentElement = document.createElement('div');
      commentElement.className = 'comment-item';
      commentElement.dataset.commentId = comment.id;
      
      const date = new Date(comment.timestamp);
      
      // Validar fecha
      if (Number.isNaN(date.getTime())) {
        console.error('Timestamp inválido:', comment.timestamp);
        return;
      }
      
      const formattedDate = CommentsFormatter.formatDate(date);
      const isOwnComment = comment.userId === currentUserId;
      
      // Crear header del comentario
      const commentHeader = this.createCommentHeader(
        comment.name,
        formattedDate,
        date,
        isOwnComment,
        comment.id,
        comment.userId,
        onDelete
      );
      
      // Crear body del comentario
      const commentBody = this.createCommentBody(comment.comment);
      
      commentElement.appendChild(commentHeader);
      commentElement.appendChild(commentBody);
      
      this.commentsList.appendChild(commentElement);
    } catch (error) {
      console.error('Error renderizando comentario:', error);
      // No mostrar notificación al usuario para no interrumpir la experiencia
      // El comentario simplemente no se mostrará
    }
  }

  /**
   * Crea el header de un comentario
   * @private
   */
  createCommentHeader(name, formattedDate, date, isOwnComment, commentId, userId, onDelete) {
    try {
      const commentHeader = document.createElement('div');
      commentHeader.className = 'comment-header';
      
      const commentAuthor = document.createElement('div');
      commentAuthor.className = 'comment-author';
      
      const authorAvatar = document.createElement('span');
      authorAvatar.className = 'author-avatar';
      authorAvatar.textContent = name && name.length > 0 ? name.charAt(0).toUpperCase() : '?';
      
      const authorName = document.createElement('span');
      authorName.className = 'author-name';
      authorName.textContent = name || 'Anónimo';
      
      if (isOwnComment) {
        const badge = document.createElement('span');
        badge.className = 'own-comment-badge';
        badge.textContent = ' (Tú)';
        authorName.appendChild(badge);
      }
      
      commentAuthor.appendChild(authorAvatar);
      commentAuthor.appendChild(authorName);
      
      const commentMeta = document.createElement('div');
      commentMeta.className = 'comment-meta';
      
      const commentDate = document.createElement('span');
      commentDate.className = 'comment-date';
      commentDate.textContent = formattedDate;
      commentDate.title = date.toLocaleString();
      
      commentMeta.appendChild(commentDate);
      
      if (isOwnComment) {
        const deleteBtn = this.createDeleteButton(commentId, userId, onDelete);
        commentMeta.appendChild(deleteBtn);
      }
      
      commentHeader.appendChild(commentAuthor);
      commentHeader.appendChild(commentMeta);
      
      return commentHeader;
    } catch (error) {
      console.error('Error creando header de comentario:', error);
      // Retornar un header básico en caso de error
      const fallbackHeader = document.createElement('div');
      fallbackHeader.className = 'comment-header';
      fallbackHeader.textContent = 'Error al cargar comentario';
      return fallbackHeader;
    }
  }

  /**
   * Crea el body de un comentario
   * @private
   */
  createCommentBody(commentText) {
    const commentBody = document.createElement('div');
    commentBody.className = 'comment-body';
    
    const commentTextElement = document.createElement('p');
    CommentsSanitizer.linkifySafe(commentText, commentTextElement);
    
    commentBody.appendChild(commentTextElement);
    
    return commentBody;
  }

  /**
   * Crea el botón de eliminar
   * @private
   */
  createDeleteButton(commentId, userId, onDelete) {
    const button = document.createElement('button');
    button.className = 'delete-comment-btn';
    button.dataset.commentId = commentId;
    button.title = 'Eliminar mi comentario';
    
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>
    `;
    
    button.addEventListener('click', () => onDelete(commentId, userId));
    return button;
  }

  /**
   * Hace scroll al comentario más reciente y lo resalta
   */
  scrollToLatest() {
    setTimeout(() => {
      const comments = this.commentsList.querySelectorAll('.comment-item');
      if (comments.length > 0) {
        comments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        comments[0].classList.add('highlight');
        setTimeout(() => comments[0].classList.remove('highlight'), this.HIGHLIGHT_DURATION);
      }
    }, this.SCROLL_DELAY);
  }

  /**
   * Actualiza el contador de caracteres
   * @param {HTMLElement} charCount - Elemento del contador
   * @param {number} length - Longitud actual
   * @param {number} maxLength - Longitud máxima
   */
  static updateCharCount(charCount, length, maxLength) {
    charCount.textContent = length;
    charCount.style.color = CommentsFormatter.getCharCountColor(length, maxLength);
  }

  /**
   * Activa el estado de carga del botón
   * @param {HTMLElement} submitBtn - Botón de envío
   * @param {HTMLElement} btnText - Texto del botón
   * @param {HTMLElement} btnLoading - Indicador de carga
   */
  static enableLoadingState(submitBtn, btnText, btnLoading) {
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
  }

  /**
   * Desactiva el estado de carga del botón
   * @param {HTMLElement} submitBtn - Botón de envío
   * @param {HTMLElement} btnText - Texto del botón
   * @param {HTMLElement} btnLoading - Indicador de carga
   */
  static disableLoadingState(submitBtn, btnText, btnLoading) {
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
  }
}