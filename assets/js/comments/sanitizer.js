/**
 * CommentsSanitizer - Sanitización y seguridad de contenido
 * Responsable de prevenir XSS y sanitizar HTML
 *
 * NOTA DE SEGURIDAD:
 * Este módulo usa sanitización básica mediante textContent, que es segura
 * para prevenir XSS en la mayoría de casos. Para aplicaciones que requieren
 * mayor seguridad o permiten HTML enriquecido, considere usar DOMPurify:
 * https://github.com/cure53/DOMPurify
 *
 * Ejemplo con DOMPurify:
 * import DOMPurify from 'dompurify';
 * static sanitizeHTML(str) {
 *   return DOMPurify.sanitize(str, { ALLOWED_TAGS: ['b', 'i', 'em', 'strong'] });
 * }
 */

export class CommentsSanitizer {
  /**
   * Sanitiza texto HTML para prevenir XSS
   * Convierte el contenido completo a texto plano, eliminando cualquier HTML
   * @param {string} str - Texto a sanitizar
   * @returns {string} Texto sanitizado (sin HTML)
   */
  static sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  /**
   * Convierte URLs en texto a enlaces seguros
   * Detecta URLs HTTP/HTTPS y las convierte en enlaces clickeables
   * con atributos de seguridad (noopener noreferrer)
   * @param {string} text - Texto que puede contener URLs
   * @param {HTMLElement} container - Contenedor donde agregar el contenido
   */
  static linkifySafe(text, container) {
    if (!text || !container) return;
    
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    parts.forEach((part, index) => {
      if (index % 2 === 0) {
        // Texto normal - usar textContent para prevenir XSS
        if (part) {
          container.appendChild(document.createTextNode(part));
        }
      } else {
        // URL - crear enlace seguro con validación
        try {
          // Validar que sea una URL válida
          new URL(part);
          const link = document.createElement('a');
          link.href = part;
          link.target = '_blank';
          link.rel = 'noopener noreferrer nofollow'; // nofollow para SEO
          link.textContent = part;
          container.appendChild(link);
        } catch (error) {
          // Si no es una URL válida, tratarla como texto
          // Registrar el error para debugging (solo en desarrollo)
          if (typeof console !== 'undefined' && console.debug) {
            console.debug('URL inválida detectada:', part, error.message);
          }
          container.appendChild(document.createTextNode(part));
        }
      }
    });
  }

  /**
   * Valida que una URL sea segura (HTTP/HTTPS)
   * @param {string} url - URL a validar
   * @returns {boolean} true si la URL es segura
   */
  static isValidURL(url) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (error) {
      // URL malformada - registrar para debugging
      if (typeof console !== 'undefined' && console.debug) {
        console.debug('Error al validar URL:', url, error.message);
      }
      return false;
    }
  }
}