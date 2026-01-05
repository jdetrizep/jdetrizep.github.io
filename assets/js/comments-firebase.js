/**
 * Sistema de Comentarios con Firebase para Posts
 * Guarda los comentarios en Firebase Realtime Database
 */

// Importar Firebase desde CDN
import { getApps, initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, set, push, remove, onValue } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Configuración de Firebase (misma que rating-firebase.js)
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
      
      // Referencia a la base de datos
      this.commentsRef = ref(database, `comments/${this.postId}`);
      
      // Generar ID único para el usuario
      this.userId = this.getUserId();
      
      this.init();
    }

    getUserId() {
      // Intentar obtener ID existente
      let userId = localStorage.getItem('firebase_user_id');
      
      if (!userId) {
        // Generar nuevo ID único
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
        localStorage.setItem('firebase_user_id', userId);
      }
      
      return userId;
    }

    init() {
      // Cargar comentarios existentes y escuchar cambios en tiempo real
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
      
      // Guardar en Firebase
      this.saveComment(name, comment);
    }

    async saveComment(name, comment) {
      try {
        const newCommentRef = push(this.commentsRef);
        const newComment = {
          name: this.sanitizeHTML(name),
          comment: this.sanitizeHTML(comment),
          timestamp: Date.now(),
          date: new Date().toISOString(),
          userId: this.userId  // Guardar ID del usuario que comenta
        };
        
        await set(newCommentRef, newComment);
        
        // Limpiar formulario
        this.form.reset();
        this.updateCharCount();
        this.setLoading(false);
        
        // Mostrar notificación de éxito
        this.showNotification('¡Comentario publicado exitosamente!', 'success');
        
        // Scroll al nuevo comentario después de un momento
        setTimeout(() => {
          const comments = this.commentsList.querySelectorAll('.comment-item');
          if (comments.length > 0) {
            comments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            comments[0].classList.add('highlight');
            setTimeout(() => comments[0].classList.remove('highlight'), 2000);
          }
        }, 500);
      } catch (error) {
        console.error('Error al guardar comentario:', error);
        this.setLoading(false);
        this.showNotification('Error al publicar el comentario. Intenta de nuevo.', 'error');
      }
    }

    loadComments() {
      // Escuchar cambios en tiempo real
      onValue(this.commentsRef, (snapshot) => {
        const comments = [];
        
        snapshot.forEach((childSnapshot) => {
          const comment = childSnapshot.val();
          comment.id = childSnapshot.key;
          comments.push(comment);
        });
        
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
      }, (error) => {
        console.error('Error cargando comentarios:', error);
        this.showNotification('Error al cargar comentarios', 'error');
      });
    }

    renderComment(comment) {
      const commentElement = document.createElement('div');
      commentElement.className = 'comment-item';
      commentElement.dataset.commentId = comment.id;
      
      const date = new Date(comment.timestamp);
      const formattedDate = this.formatDate(date);
      const isOwnComment = comment.userId === this.userId;
      
      // Crear estructura del comentario de forma segura
      const commentHeader = document.createElement('div');
      commentHeader.className = 'comment-header';
      
      const commentAuthor = document.createElement('div');
      commentAuthor.className = 'comment-author';
      
      const authorAvatar = document.createElement('span');
      authorAvatar.className = 'author-avatar';
      authorAvatar.textContent = comment.name.charAt(0).toUpperCase();
      
      const authorName = document.createElement('span');
      authorName.className = 'author-name';
      authorName.textContent = comment.name;
      
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
        const deleteBtn = this.createDeleteButton(comment.id, comment.userId);
        commentMeta.appendChild(deleteBtn);
      }
      
      commentHeader.appendChild(commentAuthor);
      commentHeader.appendChild(commentMeta);
      
      const commentBody = document.createElement('div');
      commentBody.className = 'comment-body';
      
      const commentText = document.createElement('p');
      // Sanitizar y linkificar de forma segura
      this.linkifySafe(comment.comment, commentText);
      
      commentBody.appendChild(commentText);
      
      commentElement.appendChild(commentHeader);
      commentElement.appendChild(commentBody);
      
      this.commentsList.appendChild(commentElement);
    }

    createDeleteButton(commentId, commentUserId) {
      const button = document.createElement('button');
      button.className = 'delete-comment-btn';
      button.dataset.commentId = commentId;
      button.title = 'Eliminar mi comentario';
      
      // Usar innerHTML solo para SVG estático (no contiene datos de usuario)
      button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      `;
      
      button.addEventListener('click', () => this.deleteComment(commentId, commentUserId));
      return button;
    }

    linkifySafe(text, container) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = text.split(urlRegex);
      
      parts.forEach((part, index) => {
        if (index % 2 === 0) {
          // Texto normal - usar textContent para prevenir XSS
          if (part) {
            container.appendChild(document.createTextNode(part));
          }
        } else {
          // URL - crear enlace seguro
          const link = document.createElement('a');
          link.href = part;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = part;
          container.appendChild(link);
        }
      });
    }

    async deleteComment(commentId, commentUserId) {
      // Verificar que sea el propio comentario
      if (commentUserId !== this.userId) {
        this.showNotification('Solo puedes eliminar tus propios comentarios', 'error');
        return;
      }
      
      // Mostrar modal de confirmación personalizado
      this.showDeleteConfirmation(commentId);
    }

    showDeleteConfirmation(commentId) {
      // Crear modal de confirmación
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
      setTimeout(() => modal.classList.add('show'), 10);
      
      // Event listeners
      const cancelBtn = modal.querySelector('.delete-modal-cancel');
      const confirmBtn = modal.querySelector('.delete-modal-confirm');
      
      const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
      };
      
      cancelBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      
      confirmBtn.addEventListener('click', async () => {
        closeModal();
        await this.performDelete(commentId);
      });
    }

    async performDelete(commentId) {
      try {
        const commentRef = ref(database, `comments/${this.postId}/${commentId}`);
        await remove(commentRef);
        this.showNotification('Comentario eliminado', 'info');
      } catch (error) {
        console.error('Error al eliminar comentario:', error);
        this.showNotification('Error al eliminar el comentario', 'error');
      }
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
      const postComments = new PostComments(commentForm);
      // Guardar referencia global para debugging si es necesario
      globalThis.postCommentsInstance = postComments;
    }
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComments);
  } else {
    initComments();
  }

  // Función de utilidad para ver todos los comentarios (consola)
  globalThis.viewAllComments = async function() {
    try {
      const commentsRef = ref(database, 'comments');
      const snapshot = await get(commentsRef);
      
      if (snapshot.exists()) {
        console.table(snapshot.val());
      } else {
        console.log('No hay comentarios aún');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

})();