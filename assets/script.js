document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const target = document.getElementById(button.dataset.copy);
    if (!target) return;
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(target.innerText);
      button.textContent = 'Copied';
    } catch (_) {
      button.textContent = 'Select text to copy';
    }
    window.setTimeout(() => { button.textContent = original; }, 1600);
  });
});

// Keep the navigation aligned with the section currently being read.
const sectionLinks = [...document.querySelectorAll('.nav-links a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px' });
  document.querySelectorAll('main .hero, main section[id]').forEach((section) => observer.observe(section));
}

// The original figures remain readable without JavaScript.
const viewer = document.querySelector('.image-viewer');
if (viewer && typeof viewer.showModal === 'function') {
  const expandedImage = viewer.querySelector('img');
  const caption = viewer.querySelector('#viewer-caption');
  document.querySelectorAll('main figure img, .method-block img').forEach((img) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'figure-expand';
    button.setAttribute('aria-label', `Expand figure: ${img.alt}`);
    button.setAttribute('aria-haspopup', 'dialog');
    img.before(button);
    button.append(img);
    button.addEventListener('click', () => {
      expandedImage.src = img.currentSrc || img.src;
      expandedImage.alt = img.alt;
      caption.textContent = img.closest('figure, .method-block').querySelector('h3')?.textContent || 'MixTok · Figure detail';
      viewer.showModal();
      document.body.classList.add('viewer-open');
      viewer.querySelector('.viewer-body').scrollTo(0, 0);
    });
  });
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', (event) => {
    if (event.target !== viewer) return;
    const rect = viewer.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => document.body.classList.remove('viewer-open'));
}
