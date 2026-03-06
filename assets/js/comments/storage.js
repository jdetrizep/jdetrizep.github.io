/**
 * CommentsStorage - Manejo de almacenamiento en Firebase
 * Responsable de todas las operaciones CRUD con Firebase Realtime Database
 */

import { ref, set, push, remove, onValue } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

export class CommentsStorage {
  /**
   * @param {Object} database - Instancia de Firebase Database
   * @param {string} postId - ID del post actual
   */
  constructor(database, postId) {
    this.database = database;
    this.postId = postId;
    this.commentsRef = ref(database, `comments/${postId}`);
  }

  /**
   * Guarda un nuevo comentario en Firebase
   * @param {Object} commentData - Datos del comentario
   * @returns {Promise<void>}
   */
  async saveComment(commentData) {
    const newCommentRef = push(this.commentsRef);
    await set(newCommentRef, commentData);
  }

  /**
   * Elimina un comentario de Firebase
   * @param {string} commentId - ID del comentario a eliminar
   * @returns {Promise<void>}
   */
  async deleteComment(commentId) {
    const commentRef = ref(this.database, `comments/${this.postId}/${commentId}`);
    await remove(commentRef);
  }

  /**
   * Escucha cambios en tiempo real de los comentarios
   * @param {Function} onSuccess - Callback cuando se cargan comentarios
   * @param {Function} onError - Callback cuando hay error
   */
  listenToComments(onSuccess, onError) {
    onValue(
      this.commentsRef,
      (snapshot) => {
        const comments = [];
        
        snapshot.forEach((childSnapshot) => {
          const comment = childSnapshot.val();
          comment.id = childSnapshot.key;
          comments.push(comment);
        });
        
        // Ordenar por más reciente primero
        comments.sort((a, b) => b.timestamp - a.timestamp);
        
        onSuccess(comments);
      },
      (error) => {
        onError(error);
      }
    );
  }

  /**
   * Genera o recupera un ID único para el usuario
   * @returns {string} ID del usuario
   */
  static getUserId() {
    let userId = localStorage.getItem('firebase_user_id');
    
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('firebase_user_id', userId);
    }
    
    return userId;
  }
}