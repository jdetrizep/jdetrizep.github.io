/**
 * Sistema de Comentarios para Posts
 * Guarda los comentarios en localStorage del navegador
 */

(function() {
  'use strict';

  // Clase para manejar el sistema de comentarios
  class PostComments {
    constructor(form) {
      this.form = form;
      this.postId = form.dataset.postId;
      this.nameInput = form.querySelector('#comment-name');
      this.commentInput = form.querySelector('#comment-text');
      this.charCount = form.querySelector('.char-count .current');
      this.submitBtn = form.querySelector('.submit-comment-btn');
      this.btnText = this.submitBtn.querySelector('.btn-text');
      this.btnLoading = this.submitBtn.querySelector('.btn-loading');
      
      this.commentsList = document.querySelector('.comments-list');
      this.commentsCount = document.querySelector('.comments-count .count');
      this.noComments = document.querySelector('.no-comments');
      
      this.storageKey = `post_comments_${this.postId}`;
      
      this.init();
    }

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

    updateCharCount() {
      const length = this.commentInput.value.length;
      this.charCount.textContent = length;
      
      // Cambiar color si se acerca al límite
      if (length > 450) {
        this.charCount.style.color = '#dc3545';
      } else if (length > 400) {
        this.charCount.style.color = '#ffc107';
      } else {
        this.charCount.style.color = '#6c757d';
      }
    }

    handleSubmit() {
      const name = this.nameInput.value.trim();
      const comment = this.commentInput.value.trim();
      
      // Validación
      if (!name || !comment) {
        this.showNotification('Por favor completa todos los campos', 'error');
        return;
      }
      
      if (name.length < 2) {
        this.showNotification('El nombre debe tener al menos 2 caracteres', 'error');
        return;
      }
      
      if (comment.length < 10) {
        this.showNotification('El comentario debe tener al menos 10 caracteres', 'error');
        return;
      }
      
      // Mostrar estado de carga
      this.setLoading(true);
      
      // Simular delay de red
      setTimeout(() => {
        this.saveComment(name, comment);
        this.setLoading(false);
      }, 500);
    }

    saveComment(name, comment) {
      const comments = this.getComments();
      
      const newComment = {
        id: Date.now(),
        name: this.sanitizeHTML(name),
        comment: this.sanitizeHTML(comment),
        date: new Date().toISOString(),
        timestamp: Date.now()
      };
      
      comments.push(newComment);
      localStorage.setItem(this.storageKey, JSON.stringify(comments));
      
      // Limpiar formulario
      this.form.reset();
      this.updateCharCount();
      
      // Recargar comentarios
      this.loadComments();
      
      // Mostrar notificación de éxito
      this.showNotification('¡Comentario publicado exitosamente!', 'success');
      
      // Scroll al nuevo comentario
      setTimeout(() => {
        const newCommentElement = document.querySelector(`[data-comment-id="${newComment.id}"]`);
        if (newCommentElement) {
          newCommentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          newCommentElement.classList.add('highlight');
          setTimeout(() => newCommentElement.classList.remove('highlight'), 2000);
        }
      }, 100);
    }

    getComments() {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    }

    loadComments() {
      const comments = this.getComments();
      
      // Actualizar contador
      this.commentsCount.textContent = comments.length;
      
      if (comments.length === 0) {
        this.noComments.style.display = 'block';
        // Limpiar lista de comentarios
        const existingComments = this.commentsList.querySelectorAll('.comment-item');
        existingComments.forEach(c => c.remove());
        return;
      }
      
      this.noComments.style.display = 'none';
      
      // Ordenar por más reciente primero
      comments.sort((a, b) => b.timestamp - a.timestamp);
      
      // Limpiar lista actual
      const existingComments = this.commentsList.querySelectorAll('.comment-item');
      existingComments.forEach(c => c.remove());
      
      // Renderizar comentarios
      comments.forEach(comment => {
        this.renderComment(comment);
      });
    }

    renderComment(comment) {
      const commentElement = document.createElement('div');
      commentElement.className = 'comment-item';
      commentElement.setAttribute('data-comment-id', comment.id);
      
      const date = new Date(comment.date);
      const formattedDate = this.formatDate(date);
      
      commentElement.innerHTML = `
        <div class="comment-header">
          <div class="comment-author">
            <span class="author-avatar">${comment.name.charAt(0).toUpperCase()}</span>
            <span class="author-name">${comment.name}</span>
          </div>
          <div class="comment-meta">
            <span class="comment-date" title="${date.toLocaleString()}">${formattedDate}</span>
            <button class="delete-comment-btn" data-comment-id="${comment.id}" title="Eliminar comentario">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="comment-body">
          <p>${this.linkify(comment.comment)}</p>
        </div>
      `;
      
      // Agregar event listener para eliminar
      const deleteBtn = commentElement.querySelector('.delete-comment-btn');
      deleteBtn.addEventListener('click', () => this.deleteComment(comment.id));
      
      this.commentsList.appendChild(commentElement);
    }

    deleteComment(commentId) {
      if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
        return;
      }
      
      const comments = this.getComments();
      const filtered = comments.filter(c => c.id !== commentId);
      localStorage.setItem(this.storageKey, JSON.stringify(filtered));
      
      this.loadComments();
      this.showNotification('Comentario eliminado', 'info');
    }

    formatDate(date) {
      const now = new Date();
      const diff = now - date;
      
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);
      
      if (minutes < 1) return 'Hace un momento';
      if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
      if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
      if (days < 7) return `Hace ${days} día${days > 1 ? 's' : ''}`;
      
      return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }

    sanitizeHTML(str) {
      const temp = document.createElement('div');
      temp.textContent = str;
      return temp.innerHTML;
    }

    linkify(text) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
      });
    }

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

    showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = `comment-notification ${type}`;
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      setTimeout(() => notification.classList.add('show'), 10);
      
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }
  }

  // Inicializar cuando el DOM esté listo
  function initComments() {
    const commentForm = document.querySelector('.comment-form');
    
    if (commentForm) {
      new PostComments(commentForm);
    }
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComments);
  } else {
    initComments();
  }

  // Exportar función para limpiar comentarios (útil para desarrollo)
  window.clearPostComments = function(postId) {
    if (postId) {
      localStorage.removeItem(`post_comments_${postId}`);
      console.log(`Comentarios eliminados para: ${postId}`);
    } else {
      // Limpiar todos los comentarios
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('post_comments_')) {
          localStorage.removeItem(key);
        }
      });
      console.log('Todos los comentarios han sido eliminados');
    }
    location.reload();
  };

})();