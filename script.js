// Year
document.getElementById('y').textContent = new Date().getFullYear();

// Contact form (Formspree-ready)
const FORM_ENDPOINT = ""; // paste your Formspree endpoint here when ready
const form = document.getElementById('contact-form');
const note = document.getElementById('contact-note');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    if (!FORM_ENDPOINT) {
      note.textContent = "Message sent! (demo mode — add your Formspree endpoint to enable email delivery)";
      form.reset();
      return;
    }

    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
      note.textContent = res.ok ? "Thanks! Your message was sent." : "Something went wrong. Please email us directly.";
      if (res.ok) form.reset();
    } catch {
      note.textContent = "Network error. Please try again.";
    }
  });
}

// --- Gallery: auto-hide missing images so there are no broken icons ---
const gallerySection = document.getElementById('gallery');
if (gallerySection) {
  const imgs = [...gallerySection.querySelectorAll('img')];
  let valid = 0;
  imgs.forEach(img => {
    img.addEventListener('load', () => valid++);
    img.addEventListener('error', () => {
      // hide the figure if the image failed to load
      const fig = img.closest('figure');
      if (fig) fig.style.display = 'none';
    });
  });
  // If after a short delay none loaded, hide entire gallery section
  setTimeout(() => {
    const visible = imgs.some(i => i.complete && i.naturalWidth > 0);
    if (!visible) gallerySection.style.display = 'none';
  }, 600);
}
