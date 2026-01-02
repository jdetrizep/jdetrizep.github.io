# Sistema de Calificación de Estrellas para Blog

## 📋 Descripción

Sistema de calificación de 1 a 5 estrellas implementado para los posts del blog. Permite a los lectores calificar los artículos y ver el promedio de calificaciones.

## ✨ Características

- **Calificación de 1 a 5 estrellas**: Sistema intuitivo y visual
- **Almacenamiento local**: Las calificaciones se guardan en localStorage del navegador
- **Promedio de calificaciones**: Muestra el promedio y número total de calificaciones
- **Una calificación por usuario**: Cada usuario solo puede calificar una vez por artículo
- **Diseño responsive**: Se adapta a dispositivos móviles y desktop
- **Modo oscuro**: Compatible con el tema oscuro del sitio
- **Animaciones suaves**: Efectos visuales al interactuar con las estrellas

## 🎨 Componentes Implementados

### 1. HTML Component (`_includes/rating.html`)
Componente reutilizable que se incluye en el layout de posts.

### 2. Estilos (`_sass/klise/_rating.scss`)
- Estilos para las estrellas y contenedor
- Animaciones y efectos hover
- Soporte para modo oscuro
- Diseño responsive

### 3. JavaScript (`assets/js/rating.js`)
- Manejo de eventos de clic y hover
- Almacenamiento en localStorage
- Cálculo de promedios
- Validación de calificaciones únicas

## 🚀 Uso

El sistema se activa automáticamente en todos los posts. Los usuarios verán:

1. **Título**: "¿Te gustó este artículo?"
2. **5 estrellas interactivas**: Para calificar
3. **Promedio actual**: Muestra el rating promedio
4. **Número de calificaciones**: Contador de votos totales

### Interacción del Usuario

1. El usuario pasa el mouse sobre las estrellas (efecto hover)
2. Hace clic en la estrella correspondiente a su calificación
3. El sistema guarda la calificación
4. Muestra un mensaje de agradecimiento
5. Las estrellas se marcan como "calificadas" y se deshabilitan

## 💾 Almacenamiento de Datos

Las calificaciones se almacenan en localStorage con las siguientes claves:

- `post_rating_{post-id}`: Calificación individual del usuario
- `post_ratings_{post-id}`: Array con todas las calificaciones del post

**Nota**: Los datos son locales al navegador del usuario. Para un sistema de calificaciones global, se requeriría un backend.

## 🛠️ Funciones de Desarrollo

### Limpiar Calificaciones

Para desarrollo y pruebas, puedes usar la consola del navegador:

```javascript
// Limpiar calificaciones de un post específico
clearPostRatings('post-id');

// Limpiar todas las calificaciones
clearPostRatings();
```

## 📱 Responsive Design

El sistema se adapta a diferentes tamaños de pantalla:

- **Desktop**: Estrellas grandes (3rem), layout horizontal
- **Tablet**: Estrellas medianas (2.5rem)
- **Mobile**: Estrellas más pequeñas (2.5rem), layout optimizado

## 🎨 Personalización

### Cambiar Colores

Edita `_sass/klise/_rating.scss`:

```scss
.star {
  &.active, &.rated {
    color: #ffd700; // Color de estrellas activas
  }
}
```

### Modificar Textos

Edita `_includes/rating.html`:

```html
<h3>¿Te gustó este artículo?</h3>
<p>Califica de 1 a 5 estrellas</p>
```

### Ajustar Animaciones

En `_sass/klise/_rating.scss`:

```scss
@keyframes starPulse {
  // Personaliza la animación
}
```

## 🔧 Mantenimiento

### Archivos Principales

1. **HTML**: `jekyll-klise/_includes/rating.html`
2. **CSS**: `jekyll-klise/_sass/klise/_rating.scss`
3. **JS**: `jekyll-klise/assets/js/rating.js`
4. **Layout**: `jekyll-klise/_layouts/post.html` (incluye el componente)

### Actualizar el Sistema

Para modificar el comportamiento:

1. Edita `rating.js` para cambiar la lógica
2. Edita `_rating.scss` para cambiar estilos
3. Edita `rating.html` para cambiar la estructura

## 🌐 Limitaciones Actuales

- **Almacenamiento local**: Las calificaciones son por navegador
- **Sin sincronización**: No hay backend para compartir calificaciones entre usuarios
- **Limpieza de caché**: Si el usuario limpia localStorage, pierde su calificación

## 🚀 Mejoras Futuras Posibles

1. **Backend Integration**: Conectar con una base de datos para calificaciones globales
2. **API REST**: Crear endpoints para guardar/recuperar calificaciones
3. **Analytics**: Integrar con Google Analytics para tracking
4. **Comentarios**: Permitir comentarios junto con las calificaciones
5. **Moderación**: Sistema para revisar y aprobar calificaciones

## 📊 Ejemplo de Uso en Producción

Una vez desplegado, cada post mostrará automáticamente el sistema de calificación al final del contenido, antes de los botones de compartir en redes sociales.

## 🐛 Solución de Problemas

### Las estrellas no aparecen
- Verifica que `rating.js` se esté cargando correctamente
- Revisa la consola del navegador por errores

### Los estilos no se aplican
- Asegúrate de que `_rating.scss` esté importado en `main.scss`
- Regenera el sitio Jekyll

### Las calificaciones no se guardan
- Verifica que localStorage esté habilitado en el navegador
- Revisa la consola por errores de JavaScript

## 📝 Notas Adicionales

- El sistema es completamente funcional sin necesidad de backend
- Compatible con Jekyll y GitHub Pages
- No requiere plugins adicionales
- Funciona con JavaScript vanilla (sin dependencias)

---

**Desarrollado para**: Blog jdetrizep.dev  
**Fecha**: Enero 2026  
**Versión**: 1.0.0