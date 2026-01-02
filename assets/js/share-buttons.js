function copyToClipboard(text, event) {
  navigator.clipboard.writeText(text).then(function() {
    // Cambiar el botón temporalmente
    const button = event ? event.currentTarget : null;
    if (!button) {
      // Mostrar solo el toast sin el alert
      const toast = document.createElement('div');
      toast.className = 'copy-toast';
      toast.textContent = '✓ Enlace copiado al portapapeles';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
      return;
    }
    const originalText = button.querySelector('span').textContent;
    button.querySelector('span').textContent = '✓ Copiado';
    button.classList.add('copied');
    
    // Mostrar toast
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = '✓ Enlace copiado al portapapeles';
    document.body.appendChild(toast);
    
    // Restaurar después de 2 segundos
    setTimeout(() => {
      button.querySelector('span').textContent = originalText;
      button.classList.remove('copied');
      toast.remove();
    }, 2000);
  }).catch(function(err) {
    console.error('Error al copiar:', err);
    alert('No se pudo copiar el enlace');
  });
}