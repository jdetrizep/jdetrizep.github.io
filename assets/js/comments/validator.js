/**
 * CommentsValidator - Validación de datos de comentarios
 * Responsable de validar entradas del usuario
 */

export class CommentsValidator {
  static MIN_NAME_LENGTH = 2;
  static MIN_COMMENT_LENGTH = 10;
  static MAX_COMMENT_LENGTH = 500;

  /**
   * Valida los datos de un comentario
   * @param {string} name - Nombre del autor
   * @param {string} comment - Texto del comentario
   * @returns {Object} { valid: boolean, error: string|null }
   */
  static validate(name, comment) {
    // Validar campos vacíos
    if (!name || !comment) {
      return {
        valid: false,
        error: 'Por favor completa todos los campos'
      };
    }

    // Validar longitud del nombre
    if (name.length < this.MIN_NAME_LENGTH) {
      return {
        valid: false,
        error: `El nombre debe tener al menos ${this.MIN_NAME_LENGTH} caracteres`
      };
    }

    // Validar longitud mínima del comentario
    if (comment.length < this.MIN_COMMENT_LENGTH) {
      return {
        valid: false,
        error: `El comentario debe tener al menos ${this.MIN_COMMENT_LENGTH} caracteres`
      };
    }

    // Validar longitud máxima del comentario
    if (comment.length > this.MAX_COMMENT_LENGTH) {
      return {
        valid: false,
        error: `El comentario no puede exceder ${this.MAX_COMMENT_LENGTH} caracteres`
      };
    }

    return { valid: true, error: null };
  }

  /**
   * Verifica si un usuario puede eliminar un comentario
   * @param {string} commentUserId - ID del usuario que creó el comentario
   * @param {string} currentUserId - ID del usuario actual
   * @returns {boolean}
   */
  static canDelete(commentUserId, currentUserId) {
    return commentUserId === currentUserId;
  }
}