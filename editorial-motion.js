(() => {
  const sections = [...document.querySelectorAll('[data-scroll-section]')];
  const timeline = [...document.querySelectorAll('.timeline li')];
  const yearEcho = document.querySelector('[data-timeline-year]');
  const rows = [...document.querySelectorAll('.essay-row')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width:901px)');
  let frame;
  function update() {
    frame = null;
    const height = window.innerHeight;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const progress = motion.matches || !desktop.matches ? 0 : Math.max(0,Math.min(1,(height*.2-rect.top)/rect.height));
      section.style.setProperty('--section',progress.toFixed(4));
    });
    if (timeline.length) {
      let current = 0;
      timeline.forEach((item,index) => { if (item.getBoundingClientRect().top < height*.55) current=index; });
      timeline.forEach((item,index) => item.classList.toggle('timeline-active',index===current));
      if (yearEcho) {
        const text = timeline[current].querySelector('.timeline-year').textContent;
        const year = text.match(/\d{4}/)?.[0] || '';
        if (yearEcho.textContent !== year) yearEcho.textContent=year;
      }
    }
    rows.forEach(row => { const rect=row.getBoundingClientRect(); row.classList.toggle('reading-active',rect.top<height*.65 && rect.bottom>height*.35); });
  }
  function schedule() { if (!frame) frame=requestAnimationFrame(update); }
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  motion.addEventListener('change',schedule);
  desktop.addEventListener('change',schedule);
  update();
})();
