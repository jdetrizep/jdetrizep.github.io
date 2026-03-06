/**
 * Módulo de renderizado para el sistema de comentarios
 * Maneja toda la manipulación del DOM y la presentación visual
 */

import { DateFormatter } from './formatter.js';
import { HTMLSanitizer } from './sanitizer.js';

// Constantes de configuración
const HIGHLIGHT_DURATION = 2000;

export class CommentRenderer {
  /**
   * Crea una instancia del renderizador
   * @param {HTMLElement} commentsList - Contenedor de la lista de comentarios
   * @param {HTMLElement} commentsCount - Elemento del contador
   * @param {HTMLElement} noComments - Elemento de "sin comentarios"
   * @param {string} currentUserId - ID del usuario actual
   */
  constructor(commentsList, commentsCount, noComments, currentUserId) {
    this.commentsList = commentsList;
    this.commentsCount = commentsCount;
    this.noComments = noComments;
    this.currentUserId = currentUserId;
  }

  /**
   * Renderiza una lista de comentarios
   * @param {Array} comments - Array de comentarios a renderizar
   */
  renderComments(comments) {
    // Actualizar contador
    this.commentsCount.textContent = comments.length;
    
    // Mostrar/ocultar mensaje de "sin comentarios"
    if (comments.length === 0) {
      this.noComments.style.display = 'block';
      this.clearComments();
      return;
    }
    
    this.noComments.style.display = 'none';
    
    // Limpiar lista actual
    this.clearComments();
    
    // Renderizar cada comentario
    comments.forEach(comment => {
      this.renderComment(comment);
    });
  }

  /**
   * Renderiza un comentario individual
   * @param {Object} comment - Datos del comentario
   * @param {Function} onDelete - Callback para eliminar comentario
   */
  renderComment(comment, onDelete) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    commentElement.dataset.commentId = comment.id;
    
    const date = new Date(comment.timestamp);
    const formattedDate = DateFormatter.formatRelative(date);
    const fullDate = DateFormatter.formatFull(date);
    const isOwnComment = comment.userId === this.currentUserId;
    
    // Crear header del comentario
    const header = this.createCommentHeader(comment, formattedDate, fullDate, isOwnComment, onDelete);
    
    // Crear body del comentario
    const body = this.createCommentBody(comment);
    
    commentElement.appendChild(header);
    commentElement.appendChild(body);
    
    this.commentsList.appendChild(commentElement);
  }

  /**
   * Crea el header de un comentario
   * @private
   */
  createCommentHeader(comment, formattedDate, fullDate, isOwnComment, onDelete) {
    const header = document.createElement('div');
    header.className = 'comment-header';
    
    // Autor
    const author = document.createElement('div');
    author.className = 'comment-author';
    
    const avatar = document.createElement('span');
    avatar.className = 'author-avatar';
    avatar.textContent = comment.name.charAt(0).toUpperCase();
    
    const name = document.createElement('span');
    name.className = 'author-name';
    name.textContent = comment.name;
    
    if (isOwnComment) {
      const badge = document.createElement('span');
      badge.className = 'own-comment-badge';
      badge.textContent = ' (Tú)';
      name.appendChild(badge);
    }
    
    author.appendChild(avatar);
    author.appendChild(name);
    
    // Meta (fecha y botón eliminar)
    const meta = document.createElement('div');
    meta.className = 'comment-meta';
    
    const dateElement = document.createElement('span');
    dateElement.className = 'comment-date';
    dateElement.textContent = formattedDate;
    dateElement.title = fullDate;
    
    meta.appendChild(dateElement);
    
    if (isOwnComment && onDelete) {
      const deleteBtn = this.createDeleteButton(comment.id, onDelete);
      meta.appendChild(deleteBtn);
    }
    
    header.appendChild(author);
    header.appendChild(meta);
    
    return header;
  }

  /**
   * Crea el body de un comentario
   * @private
   */
  createCommentBody(comment) {
    const body = document.createElement('div');
    body.className = 'comment-body';
    
    const text = document.createElement('p');
    // Sanitizar y linkificar de forma segura
    HTMLSanitizer.linkify(comment.comment, text);
    
    body.appendChild(text);
    
    return body;
  }

  /**
   * Crea el botón de eliminar
   * @private
   */
  createDeleteButton(commentId, onDelete) {
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
    
    button.addEventListener('click', () => onDelete(commentId));
    return button;
  }

  /**
   * Limpia todos los comentarios de la lista
   */
  clearComments() {
    const existingComments = this.commentsList.querySelectorAll('.comment-item');
    existingComments.forEach(c => c.remove());
  }

  /**
   * Resalta un comentario específico
   * @param {string} commentId - ID del comentario a resaltar
   */
  highlightComment(commentId) {
    const comment = this.commentsList.querySelector(`[data-comment-id="${commentId}"]`);
    if (comment) {
      comment.scrollIntoView({ behavior: 'smooth', block: 'center' });
      comment.classList.add('highlight');
      setTimeout(() => comment.classList.remove('highlight'), HIGHLIGHT_DURATION);
    }
  }

  /**
   * Resalta el comentario más reciente
   */
  highlightNewest() {
    const comments = this.commentsList.querySelectorAll('.comment-item');
    if (comments.length > 0) {
      const newest = comments[0];
      newest.scrollIntoView({ behavior: 'smooth', block: 'center' });
      newest.classList.add('highlight');
      setTimeout(() => newest.classList.remove('highlight'), HIGHLIGHT_DURATION);
    }
  }

  /**
   * Actualiza el contador de comentarios
   * @param {number} count - Número de comentarios
   */
  updateCount(count) {
    this.commentsCount.textContent = count;
  }
}