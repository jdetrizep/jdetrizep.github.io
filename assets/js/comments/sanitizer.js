/**
 * CommentsSanitizer - Sanitización y seguridad de contenido
 * Responsable de prevenir XSS y sanitizar HTML
 */

export class CommentsSanitizer {
  /**
   * Sanitiza texto HTML para prevenir XSS
   * @param {string} str - Texto a sanitizar
   * @returns {string} Texto sanitizado
   */
  static sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  /**
   * Convierte URLs en texto a enlaces seguros
   * @param {string} text - Texto que puede contener URLs
   * @param {HTMLElement} container - Contenedor donde agregar el contenido
   */
  static linkifySafe(text, container) {
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
}