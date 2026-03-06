/**
 * Módulo de validación para el sistema de comentarios
 * Valida la entrada del usuario antes de guardar
 */

// Constantes de validación
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;
const MIN_COMMENT_LENGTH = 10;
const MAX_COMMENT_LENGTH = 500;

export class CommentValidator {
  /**
   * Valida los datos de un comentario
   * @param {string} name - Nombre del autor
   * @param {string} comment - Texto del comentario
   * @returns {Object} Resultado de la validación {valid: boolean, error: string}
   */
  static validate(name, comment) {
    // Validar que los campos no estén vacíos
    if (!name || !comment) {
      return {
        valid: false,
        error: 'Por favor completa todos los campos'
      };
    }

    // Validar longitud del nombre
    if (name.length < MIN_NAME_LENGTH) {
      return {
        valid: false,
        error: `El nombre debe tener al menos ${MIN_NAME_LENGTH} caracteres`
      };
    }

    if (name.length > MAX_NAME_LENGTH) {
      return {
        valid: false,
        error: `El nombre no puede exceder ${MAX_NAME_LENGTH} caracteres`
      };
    }

    // Validar longitud del comentario
    if (comment.length < MIN_COMMENT_LENGTH) {
      return {
        valid: false,
        error: `El comentario debe tener al menos ${MIN_COMMENT_LENGTH} caracteres`
      };
    }

    if (comment.length > MAX_COMMENT_LENGTH) {
      return {
        valid: false,
        error: `El comentario no puede exceder ${MAX_COMMENT_LENGTH} caracteres`
      };
    }

    // Validación exitosa
    return {
      valid: true,
      error: null
    };
  }

  /**
   * Valida solo el nombre
   * @param {string} name - Nombre a validar
   * @returns {boolean} true si es válido
   */
  static isValidName(name) {
    return name && 
           name.length >= MIN_NAME_LENGTH && 
           name.length <= MAX_NAME_LENGTH;
  }

  /**
   * Valida solo el comentario
   * @param {string} comment - Comentario a validar
   * @returns {boolean} true si es válido
   */
  static isValidComment(comment) {
    return comment && 
           comment.length >= MIN_COMMENT_LENGTH && 
           comment.length <= MAX_COMMENT_LENGTH;
  }

  /**
   * Obtiene el límite máximo de caracteres para comentarios
   * @returns {number} Límite máximo
   */
  static getMaxCommentLength() {
    return MAX_COMMENT_LENGTH;
  }

  /**
   * Obtiene el límite mínimo de caracteres para comentarios
   * @returns {number} Límite mínimo
   */
  static getMinCommentLength() {
    return MIN_COMMENT_LENGTH;
  }

  /**
   * Calcula el nivel de advertencia basado en la longitud del comentario
   * @param {number} length - Longitud actual del comentario
   * @returns {string} 'normal', 'warning', 'critical'
   */
  static getWarningLevel(length) {
    const warningThreshold = MAX_COMMENT_LENGTH * 0.8; // 80%
    const criticalThreshold = MAX_COMMENT_LENGTH * 0.9; // 90%

    if (length >= criticalThreshold) {
      return 'critical';
    } else if (length >= warningThreshold) {
      return 'warning';
    }
    return 'normal';
  }
}