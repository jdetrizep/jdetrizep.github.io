/**
 * i18n.js — Cadenas de interfaz para el JavaScript del cliente (comentarios y rating).
 * El idioma se deriva del atributo <html lang> que jekyll-polyglot fija por idioma
 * (es en la raíz, en bajo /en/). Las cadenas estáticas de las plantillas viven en
 * _data/<lang>/strings.yml; este módulo cubre solo los textos generados por JS.
 */

const LANG = (document.documentElement.lang || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';

const DICT = {
  es: {
    comments: {
      published: '¡Comentario publicado exitosamente!',
      publishError: 'Error al publicar el comentario. Intenta de nuevo.',
      loadError: 'Error al cargar comentarios',
      onlyOwn: 'Solo puedes eliminar tus propios comentarios',
      deleted: 'Comentario eliminado',
      deleteError: 'Error al eliminar el comentario',
      deleteTitle: '¿Eliminar comentario?',
      deleteMessage: 'Esta acción no se puede deshacer',
      cancel: 'Cancelar',
      confirm: 'Eliminar',
      deleteOwn: 'Eliminar mi comentario',
      anonymous: 'Anónimo',
      you: ' (Tú)',
      allFields: 'Por favor completa todos los campos',
      nameMin: (n) => `El nombre debe tener al menos ${n} caracteres`,
      commentMin: (n) => `El comentario debe tener al menos ${n} caracteres`,
      commentMax: (n) => `El comentario no puede exceder ${n} caracteres`,
    },
    rating: {
      loadError: 'Error al cargar calificaciones',
      already: 'Ya has calificado este artículo anteriormente',
      thanks: '¡Gracias por tu calificación!',
      saveError: 'Error al guardar calificación. Intenta de nuevo.',
      yours: (v) => `Tu calificación: ${v} estrella${v > 1 ? 's' : ''}`,
    },
    date: {
      locale: 'es-ES',
      justNow: 'Hace un momento',
      minutes: (n) => `Hace ${n} minuto${n > 1 ? 's' : ''}`,
      hours: (n) => `Hace ${n} hora${n > 1 ? 's' : ''}`,
      days: (n) => `Hace ${n} día${n > 1 ? 's' : ''}`,
    },
  },
  en: {
    comments: {
      published: 'Comment posted successfully!',
      publishError: 'Error posting your comment. Please try again.',
      loadError: 'Error loading comments',
      onlyOwn: 'You can only delete your own comments',
      deleted: 'Comment deleted',
      deleteError: 'Error deleting the comment',
      deleteTitle: 'Delete comment?',
      deleteMessage: 'This action cannot be undone',
      cancel: 'Cancel',
      confirm: 'Delete',
      deleteOwn: 'Delete my comment',
      anonymous: 'Anonymous',
      you: ' (You)',
      allFields: 'Please fill in all fields',
      nameMin: (n) => `Name must be at least ${n} characters`,
      commentMin: (n) => `Comment must be at least ${n} characters`,
      commentMax: (n) => `Comment cannot exceed ${n} characters`,
    },
    rating: {
      loadError: 'Error loading ratings',
      already: 'You have already rated this article',
      thanks: 'Thanks for your rating!',
      saveError: 'Error saving rating. Please try again.',
      yours: (v) => `Your rating: ${v} star${v > 1 ? 's' : ''}`,
    },
    date: {
      locale: 'en-US',
      justNow: 'Just now',
      minutes: (n) => `${n} minute${n > 1 ? 's' : ''} ago`,
      hours: (n) => `${n} hour${n > 1 ? 's' : ''} ago`,
      days: (n) => `${n} day${n > 1 ? 's' : ''} ago`,
    },
  },
};

export const I18N = DICT[LANG];
export { LANG };
