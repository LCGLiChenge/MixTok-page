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
