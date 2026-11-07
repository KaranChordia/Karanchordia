// Content and navigation remain usable with JavaScript disabled.
document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const activeAnimations = new Set();
function animate(element, frames, options) {
  if (motionPreference.matches || !element.animate) return;
  const animation = element.animate(frames, options);
  activeAnimations.add(animation);
  animation.finished.catch(() => {}).finally(() => activeAnimations.delete(animation));
}
// One quiet entrance per heading. No hidden content or scroll-bound animation.
const headings = document.querySelectorAll('h1, .section-heading h2, .maker-note h2, .story-chapters h2, .case-sequence h2, .studio-close>a');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      animate(entry.target, [
        { opacity: .2, transform: 'translateY(24px)', filter: 'blur(7px)' },
        { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' }
      ], { duration: 950, easing: 'cubic-bezier(.16,1,.3,1)' });
    });
  }, { threshold: .15 });
  headings.forEach(heading => observer.observe(heading));
}
const controls = document.querySelectorAll('.button-link, .site-header nav a, .text-link, .primary-link, .lite-yt-btn, .contact-paths>a');
controls.forEach(control => {
  control.classList.add('press-surface');
  function pulse(event) {
    if (motionPreference.matches) return;
    const bounds = control.getBoundingClientRect();
    const wave = document.createElement('span');
    wave.className = 'press-wave';
    wave.setAttribute('aria-hidden', 'true');
    const pointer = event.type === 'pointerdown';
    wave.style.setProperty('--press-x', `${pointer ? event.clientX - bounds.left : bounds.width / 2}px`);
    wave.style.setProperty('--press-y', `${pointer ? event.clientY - bounds.top : bounds.height / 2}px`);
    control.append(wave);
    wave.addEventListener('animationend', () => wave.remove(), { once: true });
    setTimeout(() => wave.remove(), 650);
  }
  control.addEventListener('pointerdown', pulse);
  control.addEventListener('keydown', event => {
    if (!event.repeat && (event.key === 'Enter' || (event.key === ' ' && control.tagName === 'BUTTON'))) pulse(event);
  });
});
motionPreference.addEventListener('change', event => {
  if (!event.matches) return;
  activeAnimations.forEach(animation => animation.cancel());
  document.querySelectorAll('.press-wave').forEach(wave => wave.remove());
});

// Keep native navigation and show immediate feedback while the next page loads.
const dock = document.querySelector('#site-nav');
if (dock) {
  // Production uses Vercel clean URLs. Rewrite only the dock's internal
  // routes there so navigation does not pay for an avoidable .html redirect;
  // localhost keeps the source-file URLs for the static preview server.
  if (!/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    const cleanRoutes = { 'index.html': '/', 'work.html': '/work', 'insights.html': '/insights', 'about.html': '/about', 'contact.html': '/contact' };
    dock.querySelectorAll('a').forEach(link => {
      const path = new URL(link.href, location.href).pathname.split('/').pop();
      if (cleanRoutes[path]) link.href = cleanRoutes[path];
    });
  }
  const status = document.createElement('div');
  status.className = 'dock-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  dock.after(status);
  const prefetched = new Set();
  dock.querySelectorAll('a').forEach(link => {
    const prefetch = () => {
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.href === location.href || prefetched.has(url.href)) return;
      prefetched.add(url.href);
      const hint = document.createElement('link');
      hint.rel = 'prefetch';
      hint.href = url.href;
      document.head.append(hint);
    };
    link.addEventListener('pointerenter', prefetch, { once: true });
    link.addEventListener('focus', prefetch, { once: true });
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
      const destination = new URL(link.href, location.href);
      if (destination.origin !== location.origin || (destination.pathname === location.pathname && destination.search === location.search)) return;
      dock.querySelectorAll('.is-navigating').forEach(item => item.classList.remove('is-navigating'));
      link.classList.add('is-navigating');
      status.textContent = `Opening ${link.textContent.trim()}…`;
    });
  });
  window.addEventListener('pageshow', () => {
    status.textContent = '';
    dock.querySelectorAll('.is-navigating').forEach(item => item.classList.remove('is-navigating'));
  });
}

// The page name and the current section stay visible after the header leaves view.
const sections = [...document.querySelectorAll('main > section[data-section-label]')];
const siteHeader = document.querySelector('.site-header');
if (sections.length && siteHeader) {
  const context = document.createElement('div');
  context.className = 'section-context';
  context.setAttribute('aria-hidden', 'true'); // Avoid repeated announcements while scrolling.
  const page = document.createElement('span');
  page.className = 'section-context-page';
  page.textContent = document.querySelector('main > .case-hero') ? 'Case study' : (document.querySelector('#site-nav a[aria-current]')?.textContent.trim() || 'Home');
  const divider = document.createElement('span');
  divider.className = 'section-context-divider';
  const title = document.createElement('span');
  title.className = 'section-context-title';
  const bar = document.createElement('span');
  bar.className = 'section-context-progress';
  context.append(page, divider, title, bar);
  document.body.append(context);
  let scheduled = false;
  function updateSectionContext() {
    scheduled = false;
    // Switch as soon as a section's top reaches the upper part of the viewport.
    const threshold = Math.max(context.offsetHeight + 16, innerHeight * 0.38);
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= threshold) current = section;
      else break;
    }
    const label = current.dataset.sectionLabel;
    if (title._target === label) {
      // Already showing or swapping to this label.
    } else if (title.textContent && !motionPreference.matches) {
      title._target = label;
      title.classList.add('is-swapping');
      clearTimeout(title._swap);
      title._swap = setTimeout(() => { title.textContent = label; title.classList.remove('is-swapping'); }, 180);
    } else {
      clearTimeout(title._swap);
      title.classList.remove('is-swapping');
      title._target = label;
      title.textContent = label;
    }
    const max = document.documentElement.scrollHeight - innerHeight;
    context.style.setProperty('--p', max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
    context.classList.toggle('is-visible', siteHeader.getBoundingClientRect().bottom <= 0);
  }
  function scheduleSectionContext() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateSectionContext);
    }
  }
  addEventListener('scroll', scheduleSectionContext, { passive: true });
  addEventListener('resize', scheduleSectionContext);
  addEventListener('pageshow', scheduleSectionContext);
  updateSectionContext();
}

// Viewfinder dock: a pill glides to the active item, previews on hover, and a fine line tracks page progress.
if (dock) {
  const glide = document.createElement('span');
  glide.className = 'dock-glide';
  glide.setAttribute('aria-hidden', 'true');
  const progress = document.createElement('span');
  progress.className = 'dock-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.append(document.createElement('i'));
  dock.prepend(glide);
  dock.append(progress);
  const links = [...dock.querySelectorAll('a')];
  const home = dock.querySelector('a[aria-current]');
  function moveTo(link, peek) {
    if (!link) { glide.classList.remove('is-ready'); return; }
    glide.style.width = link.offsetWidth + 'px';
    glide.style.height = link.offsetHeight + 'px';
    glide.style.transform = `translate(${link.offsetLeft}px, ${link.offsetTop}px)`;
    glide.classList.toggle('is-peek', !!peek);
    dock.classList.toggle('is-peeking', !!peek);
    glide.classList.add('is-ready');
  }
  // Place the pill instantly on load, resize and back/forward restore, so it never replays its glide.
  function snap(fn) {
    dock.classList.add('dock-snap');
    fn();
    void glide.offsetWidth;
    requestAnimationFrame(() => requestAnimationFrame(() => dock.classList.remove('dock-snap')));
  }
  if (home) dock.classList.add('has-glide');
  const rest = () => home ? moveTo(home, false) : moveTo(null);
  const settle = () => snap(rest);
  links.forEach(link => {
    link.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse' && link !== home) moveTo(link, true); });
    link.addEventListener('click', () => { if (link !== home) { moveTo(link, false); if (home) home.style.color = '#ead3dc'; link.style.color = '#351426'; } });
  });
  dock.addEventListener('pointerleave', rest);
  addEventListener('resize', settle);
  addEventListener('pageshow', () => { links.forEach(l => l.style.color = ''); settle(); });
  if (document.fonts) document.fonts.ready.then(settle);
  settle();
  let ticking = false;
  const paint = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty('--p', max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }, { passive: true });
  paint();
}
