const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const objectGroups = [
  ['.home-hero', 'hero-objects', ['axis-chip', 'axis-ring', 'axis-dot']],
  ['.practice-field', 'field-objects', ['field-orbit', 'field-chip', 'field-dot']],
  ['.evidence', 'evidence-objects', ['archive-chip', 'archive-ring', 'archive-dot']],
];

objectGroups.forEach(([selector, groupClass, objectClasses]) => {
  const section = document.querySelector(selector);
  if (!section || section.querySelector(`.${groupClass}`)) return;
  const group = document.createElement('div');
  group.className = `choreo-objects ${groupClass}`;
  group.setAttribute('aria-hidden', 'true');
  objectClasses.forEach((objectClass) => {
    const object = document.createElement('span');
    object.className = `choreo-object ${objectClass}`;
    group.append(object);
  });
  section.append(group);
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
if (menuButton && nav) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

if (reduceMotion) {
  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('in-view'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('.reveal').forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 45}ms`;
    observer.observe(item);
  });

  const scene = document.querySelector('[data-scene]');
  if (scene && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      scene.style.setProperty('--ry', `${x * 5}deg`);
      scene.style.setProperty('--rx', `${y * -4}deg`);
    }, { passive: true });
  }

  const choreographedSections = [...document.querySelectorAll('.home-hero, .practice-field, .evidence, .home-close')];
  let ticking = false;
  const updateChoreography = () => {
    const viewportHeight = window.innerHeight;
    choreographedSections.forEach((section) => {
      const bounds = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, ((viewportHeight * 0.22) - bounds.top) / bounds.height));
      section.style.setProperty('--p', progress.toFixed(4));
    });
    ticking = false;
  };
  const requestChoreographyUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateChoreography);
    }
  };
  requestChoreographyUpdate();
  window.addEventListener('scroll', requestChoreographyUpdate, { passive: true });
  window.addEventListener('resize', requestChoreographyUpdate, { passive: true });
}
