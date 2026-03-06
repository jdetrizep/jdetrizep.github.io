/**
 * Configuración compartida de Firebase
 * Módulo centralizado para evitar duplicación de código
 */

import { getApps, initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA4Dzhnk7-QkknIrQWhMNCC5as1CSs-Y7M",
  authDomain: "jdetrizep-blog.firebaseapp.com",
  databaseURL: "https://jdetrizep-blog-default-rtdb.firebaseio.com",
  projectId: "jdetrizep-blog",
  storageBucket: "jdetrizep-blog.firebasestorage.app",
  messagingSenderId: "355885882700",
  appId: "1:355885882700:web:894592581a7627f4c183e9"
};

/**
 * Inicializa Firebase (reutiliza app existente si ya está inicializada)
 * @returns {Object} Objeto con app y database
 */
export function initializeFirebase() {
  let app;
  const existingApps = getApps();
  
  if (existingApps.length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = existingApps[0];
  }
  
  const database = getDatabase(app);
  
  return { app, database };
}

/**
 * Obtiene la instancia de Firebase Database
 * @returns {Object} Firebase Database instance
 */
export function getFirebaseDatabase() {
  const { database } = initializeFirebase();
  return database;
}