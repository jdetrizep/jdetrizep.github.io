/**
 * Módulo de formateo de fechas para el sistema de comentarios
 * Convierte timestamps a formatos legibles
 */

export class DateFormatter {
  /**
   * Formatea una fecha a formato relativo (ej: "Hace 2 horas")
   * @param {Date|number} date - Fecha a formatear
   * @returns {string} Fecha formateada
   */
  static formatRelative(date) {
    const dateObj = date instanceof Date ? date : new Date(date);
    const now = new Date();
    const diff = now - dateObj;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Hace un momento';
    if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (days < 7) return `Hace ${days} día${days > 1 ? 's' : ''}`;
    
    return this.formatAbsolute(dateObj);
  }

  /**
   * Formatea una fecha a formato absoluto (ej: "15 mar 2026")
   * @param {Date|number} date - Fecha a formatear
   * @returns {string} Fecha formateada
   */
  static formatAbsolute(date) {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    return dateObj.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  /**
   * Formatea una fecha a formato completo para tooltips
   * @param {Date|number} date - Fecha a formatear
   * @returns {string} Fecha formateada
   */
  static formatFull(date) {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleString('es-ES');
  }

  /**
   * Obtiene el timestamp actual
   * @returns {number} Timestamp en milisegundos
   */
  static now() {
    return Date.now();
  }
}