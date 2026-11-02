(() => {
  const chapters = [...document.querySelectorAll('[data-home-chapter]')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 901px)');
  const captions = ['01 / See the story.', '02 / Shape the system.', '03 / Keep the judgment.'];
  const folioCaption = document.querySelector('[data-folio-caption]');
  let frame;
  function update() {
    frame = null;
    chapters.forEach((chapter) => {
      const rect = chapter.getBoundingClientRect();
      const range = chapter.offsetHeight - window.innerHeight;
      const progress = motion.matches || !desktop.matches ? 0 : Math.max(0, Math.min(1, -rect.top / Math.max(range, 1)));
      chapter.style.setProperty('--chapter', progress.toFixed(4));
      const stage = Math.min(2, Math.floor(progress * 3));
      if (chapter.classList.contains('hero-chapter') && folioCaption) {
        const caption = motion.matches || !desktop.matches ? 'Story / System / Judgment' : captions[stage];
        if (folioCaption.textContent !== caption) folioCaption.textContent = caption;
      }
      if (chapter.classList.contains('practice-field')) {
        chapter.querySelectorAll('.method-ribbon span').forEach((word, index) => {
          word.classList.toggle('word-active', index === stage);
        });
        chapter.querySelectorAll('.constellation-item').forEach((item, index) => {
          item.classList.toggle('method-active', index === stage);
        });
      }
    });
  }
  function requestUpdate() { if (!frame) frame = requestAnimationFrame(update); }
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  motion.addEventListener('change', requestUpdate);
  desktop.addEventListener('change', requestUpdate);
  update();
})();
