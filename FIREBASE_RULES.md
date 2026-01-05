# Configuración de Reglas de Firebase para Comentarios

## Instrucciones para configurar Firebase Realtime Database

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **jdetrizep-blog**
3. En el menú lateral, ve a **Realtime Database**
4. Haz clic en la pestaña **Rules** (Reglas)
5. Reemplaza las reglas existentes con las siguientes:

```json
{
  "rules": {
    "ratings": {
      "$postId": {
        ".read": true,
        "users": {
          "$userId": {
            ".write": "!data.exists()"
          }
        },
        "stats": {
          ".write": true
        }
      }
    },
    "comments": {
      "$postId": {
        ".read": true,
        "$commentId": {
          ".write": true,
          ".validate": "newData.hasChildren(['name', 'comment', 'timestamp', 'date'])",
          "name": {
            ".validate": "newData.isString() && newData.val().length >= 2 && newData.val().length <= 50"
          },
          "comment": {
            ".validate": "newData.isString() && newData.val().length >= 10 && newData.val().length <= 500"
          },
          "timestamp": {
            ".validate": "newData.isNumber()"
          },
          "date": {
            ".validate": "newData.isString()"
          }
        }
      }
    }
  }
}
```

## Explicación de las reglas:

### Para Ratings (Calificaciones):
- **Lectura**: Permitida para todos
- **Escritura**: Solo si el usuario no ha calificado antes
- **Stats**: Escritura permitida para actualizar estadísticas

### Para Comments (Comentarios):
- **Lectura**: Permitida para todos (cualquiera puede ver comentarios)
- **Escritura**: Permitida para todos (cualquiera puede agregar/eliminar comentarios)
- **Validación**: 
  - Nombre: 2-50 caracteres
  - Comentario: 10-500 caracteres
  - Timestamp: debe ser número
  - Date: debe ser string

## Reglas más restrictivas (opcional)

Si quieres que solo usuarios autenticados puedan comentar, usa estas reglas:

```json
{
  "rules": {
    "ratings": {
      "$postId": {
        ".read": true,
        "users": {
          "$userId": {
            ".write": "auth != null && !data.exists()"
          }
        },
        "stats": {
          ".write": "auth != null"
        }
      }
    },
    "comments": {
      "$postId": {
        ".read": true,
        "$commentId": {
          ".write": "auth != null",
          ".validate": "newData.hasChildren(['name', 'comment', 'timestamp', 'date'])"
        }
      }
    }
  }
}
```

## Después de configurar las reglas:

1. Haz clic en **Publish** (Publicar)
2. Espera unos segundos para que se apliquen
3. Recarga tu sitio web
4. Los comentarios deberían funcionar correctamente

## Verificar que funciona:

En la consola del navegador, ejecuta:
```javascript
viewAllComments()
```

Esto mostrará todos los comentarios almacenados en Firebase.