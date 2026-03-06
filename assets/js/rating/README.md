# Sistema de Calificaciones Refactorizado

## 📁 Estructura del Proyecto

```
rating/
├── storage.js      # Gestión de localStorage
├── calculator.js   # Cálculos y estadísticas
├── ui.js          # Manipulación del DOM
├── controller.js  # Coordinador principal
└── README.md      # Este archivo
```

## 🏗️ Arquitectura

El sistema ha sido refactorizado siguiendo el **principio de responsabilidad única (SRP)** y patrones de diseño modernos.

### Módulos

#### 1. RatingStorage (`storage.js`)
**Responsabilidad:** Gestión de datos en localStorage

**Métodos principales:**
- `getUserRating()` - Obtiene la calificación del usuario
- `saveUserRating(rating)` - Guarda la calificación del usuario
- `getAllRatings()` - Obtiene todas las calificaciones
- `addRating(rating)` - Agrega una nueva calificación
- `clear()` - Limpia todas las calificaciones

**Beneficios:**
- Manejo centralizado de errores de localStorage
- Fácil migración a otros sistemas de almacenamiento
- Testeable de forma aislada

#### 2. RatingCalculator (`calculator.js`)
**Responsabilidad:** Cálculos matemáticos y estadísticas

**Métodos principales:**
- `calculateAverage(ratings)` - Calcula el promedio
- `getStarsDisplay(average)` - Genera representación visual
- `isValidRating(rating)` - Valida calificaciones
- `getStatistics(ratings)` - Obtiene estadísticas completas

**Beneficios:**
- Lógica de negocio separada
- Funciones puras (sin efectos secundarios)
- Fácil de testear con unit tests

#### 3. RatingUI (`ui.js`)
**Responsabilidad:** Manipulación del DOM y presentación

**Métodos principales:**
- `handleHover(index)` - Efecto hover en estrellas
- `handleMouseLeave()` - Remueve efecto hover
- `markAsRated(value)` - Marca estrellas como calificadas
- `updateDisplay(average, count, starsDisplay)` - Actualiza estadísticas
- `showMessage(text, type)` - Muestra mensajes al usuario
- `disable()` / `enable()` - Control de interacción

**Beneficios:**
- Toda la lógica de UI en un solo lugar
- Fácil de modificar el diseño visual
- Separación clara entre lógica y presentación

#### 4. RatingController (`controller.js`)
**Responsabilidad:** Coordinación entre módulos

**Métodos principales:**
- `init()` - Inicializa el sistema
- `handleRating(value)` - Procesa una calificación
- `loadAndDisplayRatings()` - Carga y muestra datos
- `checkUserRating()` - Verifica calificación existente

**Beneficios:**
- Punto único de entrada
- Coordina la comunicación entre módulos
- Facilita el testing de integración

## 🔄 Flujo de Datos

```
Usuario interactúa con UI
         ↓
    Controller recibe evento
         ↓
    Valida con Calculator
         ↓
    Guarda con Storage
         ↓
    Actualiza UI
```

## 📊 Comparación: Antes vs Después

### Antes (rating.js)
```
❌ 212 líneas en un solo archivo
❌ Clase con múltiples responsabilidades
❌ Difícil de testear
❌ Acoplamiento alto
❌ Difícil de mantener
```

### Después (rating/)
```
✅ 4 módulos especializados
✅ Cada módulo con una responsabilidad
✅ Fácil de testear (unit tests)
✅ Bajo acoplamiento
✅ Fácil de mantener y extender
```

## 🚀 Uso

### Importación
```javascript
import { RatingController } from './rating/controller.js';
```

### Inicialización
```javascript
const container = document.querySelector('.stars-container');
const controller = new RatingController(container);
```

### Testing
```javascript
// Limpiar calificaciones de un post
window.clearPostRatings('post-id');

// Limpiar todas las calificaciones
window.clearPostRatings();
```

## 🧪 Testing

### Unit Tests Recomendados

#### RatingStorage
```javascript
describe('RatingStorage', () => {
  it('should save and retrieve user rating', () => {
    const storage = new RatingStorage('test-post');
    storage.saveUserRating(5);
    expect(storage.getUserRating()).toBe(5);
  });
});
```

#### RatingCalculator
```javascript
describe('RatingCalculator', () => {
  it('should calculate average correctly', () => {
    const ratings = [5, 4, 3, 4, 5];
    expect(RatingCalculator.calculateAverage(ratings)).toBe(4.2);
  });
});
```

## 🔧 Extensibilidad

### Agregar nuevo backend de almacenamiento

1. Crear nueva clase que implemente la misma interfaz que `RatingStorage`
2. Modificar `RatingController` para usar la nueva clase
3. No se requieren cambios en otros módulos

Ejemplo:
```javascript
// rating/firebase-storage.js
export class FirebaseStorage {
  getUserRating() { /* implementación Firebase */ }
  saveUserRating(rating) { /* implementación Firebase */ }
  // ... otros métodos
}

// En controller.js
import { FirebaseStorage } from './firebase-storage.js';
this.storage = new FirebaseStorage(this.postId);
```

### Agregar nuevas estadísticas

1. Agregar método en `RatingCalculator`
2. Actualizar `RatingUI` para mostrar la nueva estadística
3. Llamar desde `RatingController`

## 📝 Mejores Prácticas

1. **Nunca modificar el DOM desde Storage o Calculator**
2. **Todas las validaciones deben estar en Calculator**
3. **Todos los mensajes al usuario deben pasar por UI**
4. **Controller es el único que conoce todos los módulos**

## 🐛 Debugging

### Ver todas las instancias activas
```javascript
console.log(window.ratingControllers);
```

### Inspeccionar estado de un controlador
```javascript
const controller = window.ratingControllers[0];
console.log(controller.storage.getAllRatings());
```

## 📚 Recursos

- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)
- [Module Pattern](https://www.patterns.dev/posts/module-pattern/)

## 🔄 Migración desde rating.js

Para migrar del sistema antiguo al nuevo:

1. Reemplazar `rating.js` por `rating-refactored.js` en el HTML
2. Los datos en localStorage son compatibles (no se pierden calificaciones)
3. La API pública es la misma (`window.clearPostRatings`)

## 📄 Licencia

Mismo que el proyecto principal.

---

**Última actualización:** 6 de marzo de 2026  
**Versión:** 2.0.0 (Refactorizada)