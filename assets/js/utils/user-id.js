/**
 * Utilidad para manejo de ID de usuario
 * Módulo compartido para evitar duplicación de código
 */

/**
 * Genera o recupera un ID único para el usuario
 * El ID se almacena en localStorage para persistencia
 * @returns {string} ID único del usuario
 */
export function getUserId() {
  let userId = localStorage.getItem('firebase_user_id');
  
  if (!userId) {
    // Generar nuevo ID único usando timestamp y string aleatorio
    userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem('firebase_user_id', userId);
  }
  
  return userId;
}

/**
 * Limpia el ID de usuario del localStorage
 * Útil para testing o reset de usuario
 */
export function clearUserId() {
  localStorage.removeItem('firebase_user_id');
}

/**
 * Verifica si existe un ID de usuario
 * @returns {boolean} true si existe un ID
 */
export function hasUserId() {
  return localStorage.getItem('firebase_user_id') !== null;
}