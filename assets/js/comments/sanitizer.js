/**
 * Módulo de sanitización HTML para el sistema de comentarios
 * Previene ataques XSS y sanitiza entrada del usuario
 */

export class HTMLSanitizer {
  /**
   * Sanitiza texto HTML para prevenir XSS
   * @param {string} str - Texto a sanitizar
   * @returns {string} Texto sanitizado
   */
  static sanitize(str) {
    if (!str) return '';
    
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  /**
   * Convierte URLs en texto a enlaces clickeables de forma segura
   * @param {string} text - Texto que puede contener URLs
   * @param {HTMLElement} container - Contenedor donde agregar el contenido
   */
  static linkify(text, container) {
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

  /**
   * Limpia espacios en blanco excesivos
   * @param {string} str - Texto a limpiar
   * @returns {string} Texto limpio
   */
  static trim(str) {
    return str ? str.trim().replace(/\s+/g, ' ') : '';
  }

  /**
   * Valida que una URL sea segura
   * @param {string} url - URL a validar
   * @returns {boolean} true si es segura
   */
  static isSafeUrl(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }
}