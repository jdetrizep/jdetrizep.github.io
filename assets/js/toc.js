(function() {
  // Generar TOC
  function generateTOC() {
    const content = document.querySelector('.post-content');
    if (!content) {
      console.log('No se encontró .post-content');
      return;
    }
    
    const headings = content.querySelectorAll('h2, h3');
    console.log('Encabezados encontrados:', headings.length);
    
    if (headings.length === 0) {
      document.getElementById('toc').style.display = 'none';
      return;
    }
    
    const tocContent = document.getElementById('toc-content');
    const ul = document.createElement('ul');
    let currentH2 = null;
    
    headings.forEach((heading, index) => {
      // Agregar ID si no tiene
      if (!heading.id) {
        const text = heading.textContent.trim().toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        heading.id = text || 'heading-' + index;
      }
      
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + heading.id;
      a.textContent = heading.textContent.trim();
      a.addEventListener('click', function(e) {
        e.preventDefault();
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, null, '#' + heading.id);
      });
      
      li.appendChild(a);
      
      if (heading.tagName === 'H2') {
        ul.appendChild(li);
        currentH2 = li;
      } else if (heading.tagName === 'H3' && currentH2) {
        let subUl = currentH2.querySelector('ul');
        if (!subUl) {
          subUl = document.createElement('ul');
          currentH2.appendChild(subUl);
        }
        subUl.appendChild(li);
      }
    });
    
    tocContent.appendChild(ul);
  }
  
  // Toggle TOC
  const toggleButton = document.getElementById('toc-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', function() {
      const content = document.getElementById('toc-content');
      const button = this;
      
      content.classList.toggle('collapsed');
      button.classList.toggle('collapsed');
      button.textContent = content.classList.contains('collapsed') ? '+' : '−';
    });
  }
  
  // Highlight active section
  function highlightActiveSection() {
    const headings = document.querySelectorAll('.post-content h2, .post-content h3');
    const tocLinks = document.querySelectorAll('.toc-content a');
    
    let activeHeading = null;
    const scrollPosition = window.scrollY + 100;
    
    headings.forEach(heading => {
      if (heading.offsetTop <= scrollPosition) {
        activeHeading = heading;
      }
    });
    
    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (activeHeading && link.getAttribute('href') === '#' + activeHeading.id) {
        link.classList.add('active');
      }
    });
  }
  
  // Reading progress
  function updateReadingProgress() {
    const content = document.querySelector('.post-content');
    if (!content) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = content.offsetHeight;
    const scrollTop = window.scrollY;
    const docTop = content.offsetTop;
    
    const scrolled = scrollTop - docTop;
    const progress = (scrolled / (documentHeight - windowHeight)) * 100;
    
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
      progressBar.style.width = Math.min(Math.max(progress, 0), 100) + '%';
    }
  }
  
  // Inicializar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('DOMContentLoaded fired');
      generateTOC();
      highlightActiveSection();
      updateReadingProgress();
    });
  } else {
    console.log('DOM already ready');
    generateTOC();
    highlightActiveSection();
    updateReadingProgress();
  }
  
  // Event listeners
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      highlightActiveSection();
      updateReadingProgress();
    }, 50);
  });
  
  window.addEventListener('resize', updateReadingProgress);
})();