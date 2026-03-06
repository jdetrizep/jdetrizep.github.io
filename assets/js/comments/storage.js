/**
 * Módulo de almacenamiento para el sistema de comentarios
 * Maneja todas las operaciones con Firebase Realtime Database
 */

import { ref, set, push, remove, onValue, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

export class CommentStorage {
  /**
   * Crea una instancia del gestor de almacenamiento
   * @param {Object} database - Instancia de Firebase Database
   * @param {string} postId - ID del post
   */
  constructor(database, postId) {
    this.database = database;
    this.postId = postId;
    this.commentsRef = ref(database, `comments/${postId}`);
  }

  /**
   * Guarda un nuevo comentario en Firebase
   * @param {Object} commentData - Datos del comentario
   * @param {string} commentData.name - Nombre del autor
   * @param {string} commentData.comment - Texto del comentario
   * @param {string} commentData.userId - ID del usuario
   * @returns {Promise<string>} ID del comentario creado
   */
  async saveComment(commentData) {
    try {
      const newCommentRef = push(this.commentsRef);
      const comment = {
        name: commentData.name,
        comment: commentData.comment,
        timestamp: Date.now(),
        date: new Date().toISOString(),
        userId: commentData.userId
      };
      
      await set(newCommentRef, comment);
      return newCommentRef.key;
    } catch (error) {
      console.error('Error al guardar comentario:', error);
      throw new Error('No se pudo guardar el comentario');
    }
  }

  /**
   * Elimina un comentario de Firebase
   * @param {string} commentId - ID del comentario a eliminar
   * @returns {Promise<void>}
   */
  async deleteComment(commentId) {
    try {
      const commentRef = ref(this.database, `comments/${this.postId}/${commentId}`);
      await remove(commentRef);
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      throw new Error('No se pudo eliminar el comentario');
    }
  }

  /**
   * Escucha cambios en tiempo real de los comentarios
   * @param {Function} callback - Función a ejecutar cuando hay cambios
   * @param {Function} errorCallback - Función a ejecutar en caso de error
   */
  listenToComments(callback, errorCallback) {
    onValue(this.commentsRef, (snapshot) => {
      const comments = [];
      
      snapshot.forEach((childSnapshot) => {
        const comment = childSnapshot.val();
        comment.id = childSnapshot.key;
        comments.push(comment);
      });
      
      // Ordenar por más reciente primero
      comments.sort((a, b) => b.timestamp - a.timestamp);
      
      callback(comments);
    }, (error) => {
      console.error('Error cargando comentarios:', error);
      if (errorCallback) {
        errorCallback(error);
      }
    });
  }

  /**
   * Obtiene todos los comentarios una sola vez
   * @returns {Promise<Array>} Array de comentarios
   */
  async getAllComments() {
    try {
      const snapshot = await get(this.commentsRef);
      const comments = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const comment = childSnapshot.val();
          comment.id = childSnapshot.key;
          comments.push(comment);
        });
        
        comments.sort((a, b) => b.timestamp - a.timestamp);
      }
      
      return comments;
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
      throw new Error('No se pudieron cargar los comentarios');
    }
  }

  /**
   * Obtiene el ID único del usuario desde localStorage
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