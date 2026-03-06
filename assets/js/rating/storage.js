/**
 * Módulo de almacenamiento para el sistema de calificaciones
 * Maneja todas las operaciones con localStorage
 */

export class RatingStorage {
  /**
   * Crea una instancia del gestor de almacenamiento
   * @param {string} postId - ID del post
   */
  constructor(postId) {
    this.postId = postId;
    this.storageKey = `post_rating_${postId}`;
    this.ratingsKey = `post_ratings_${postId}`;
  }

  /**
   * Obtiene la calificación del usuario actual
   * @returns {number|null} La calificación o null si no existe
   */
  getUserRating() {
    try {
      const rating = localStorage.getItem(this.storageKey);
      return rating ? Number.parseInt(rating, 10) : null;
    } catch (error) {
      console.error('Error al leer calificación del usuario:', error);
      return null;
    }
  }

  /**
   * Guarda la calificación del usuario
   * @param {number} rating - Calificación de 1 a 5
   * @returns {boolean} true si se guardó exitosamente
   */
  saveUserRating(rating) {
    try {
      localStorage.setItem(this.storageKey, rating.toString());
      return true;
    } catch (error) {
      console.error('Error al guardar calificación:', error);
      return false;
    }
  }

  /**
   * Obtiene todas las calificaciones del post
   * @returns {number[]} Array de calificaciones
   */
  getAllRatings() {
    try {
      const stored = localStorage.getItem(this.ratingsKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error al leer calificaciones:', error);
      return [];
    }
  }

  /**
   * Agrega una nueva calificación a la lista
   * @param {number} rating - Calificación a agregar
   * @returns {boolean} true si se guardó exitosamente
   */
  addRating(rating) {
    try {
      const ratings = this.getAllRatings();
      ratings.push(rating);
      localStorage.setItem(this.ratingsKey, JSON.stringify(ratings));
      return true;
    } catch (error) {
      console.error('Error al agregar calificación:', error);
      return false;
    }
  }

  /**
   * Limpia todas las calificaciones del post
   */
  clear() {
    try {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.ratingsKey);
    } catch (error) {
      console.error('Error al limpiar calificaciones:', error);
    }
  }
}