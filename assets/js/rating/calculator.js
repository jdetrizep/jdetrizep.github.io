/**
 * Módulo de cálculos para el sistema de calificaciones
 * Maneja todos los cálculos matemáticos y estadísticas
 */

export class RatingCalculator {
  /**
   * Calcula el promedio de calificaciones
   * @param {number[]} ratings - Array de calificaciones
   * @returns {number} Promedio con un decimal
   */
  static calculateAverage(ratings) {
    if (!ratings || ratings.length === 0) {
      return 0;
    }
    
    const sum = ratings.reduce((acc, val) => acc + val, 0);
    return Number.parseFloat((sum / ratings.length).toFixed(1));
  }

  /**
   * Genera la representación visual de estrellas
   * @param {number} average - Promedio de calificaciones
   * @returns {string} String con estrellas (★, ⯨, ☆)
   */
  static getStarsDisplay(average) {
    const fullStars = Math.floor(average);
    const hasHalfStar = average % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let display = '★'.repeat(fullStars);
    if (hasHalfStar) {
      display += '⯨';
    }
    display += '☆'.repeat(emptyStars);
    
    return display;
  }

  /**
   * Valida que una calificación sea válida
   * @param {number} rating - Calificación a validar
   * @returns {boolean} true si es válida (1-5)
   */
  static isValidRating(rating) {
    return Number.isInteger(rating) && rating >= 1 && rating <= 5;
  }

  /**
   * Obtiene estadísticas completas de las calificaciones
   * @param {number[]} ratings - Array de calificaciones
   * @returns {Object} Objeto con estadísticas
   */
  static getStatistics(ratings) {
    if (!ratings || ratings.length === 0) {
      return {
        average: 0,
        count: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratings.forEach(rating => {
      if (Object.hasOwn(distribution, rating)) {
        distribution[rating]++;
      }
    });

    return {
      average: this.calculateAverage(ratings),
      count: ratings.length,
      distribution
    };
  }
}