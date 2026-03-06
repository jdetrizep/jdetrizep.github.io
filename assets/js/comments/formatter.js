/**
 * CommentsFormatter - Formateo de fechas y texto
 * Responsable de formatear fechas de forma legible
 */

export class CommentsFormatter {
  static MINUTE_MS = 60000;
  static HOUR_MS = 3600000;
  static DAY_MS = 86400000;

  /**
   * Formatea una fecha de forma relativa (hace X tiempo)
   * @param {Date} date - Fecha a formatear
   * @returns {string} Fecha formateada
   */
  static formatDate(date) {
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / this.MINUTE_MS);
    const hours = Math.floor(diff / this.HOUR_MS);
    const days = Math.floor(diff / this.DAY_MS);
    
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

  /**
   * Obtiene el color del contador de caracteres según la longitud
   * @param {number} length - Longitud actual del texto
   * @param {number} maxLength - Longitud máxima permitida
   * @returns {string} Color CSS
   */
  static getCharCountColor(length, maxLength) {
    const ratio = length / maxLength;
    
    if (ratio > 0.9) return '#dc3545'; // Rojo
    if (ratio > 0.8) return '#ffc107'; // Amarillo
    return '#6c757d'; // Gris
  }
}