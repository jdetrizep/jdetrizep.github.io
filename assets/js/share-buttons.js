function copyToClipboard(text, event) {
  const button = event ? event.currentTarget : null;
  const copiedLabel = button?.dataset?.copiedLabel || '✓ Copied';
  const successMessage = button?.dataset?.copySuccess || '✓ Link copied to clipboard';
  const errorMessage = button?.dataset?.copyError || '✗ Could not copy the link';

  navigator.clipboard.writeText(text).then(function() {
    // Change button text temporarily
    if (!button) {
      // Show only toast notification
      const toast = document.createElement('div');
      toast.className = 'copy-toast';
      toast.textContent = successMessage;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
      return;
    }

    const originalText = button.querySelector('span').textContent;
    button.querySelector('span').textContent = copiedLabel;
    button.classList.add('copied');
    
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = successMessage;
    document.body.appendChild(toast);
    
    // Restore original state after 2 seconds
    setTimeout(() => {
      button.querySelector('span').textContent = originalText;
      button.classList.remove('copied');
      toast.remove();
    }, 2000);
  }).catch(function(err) {
    console.error('Copy failed:', err);
    
    // Show error toast instead of alert
    const errorToast = document.createElement('div');
    errorToast.className = 'copy-toast error';
    errorToast.textContent = errorMessage;
    document.body.appendChild(errorToast);
    
    setTimeout(() => errorToast.remove(), 3000);
  });
}