const workReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const addWorkObjects = (section, groupClass, objectClasses) => {
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
};

addWorkObjects(document.querySelector('.work-hero'), 'work-hero-objects', ['work-chip', 'work-ring', 'work-dot']);
addWorkObjects(document.querySelector('.archive-note'), 'boundary-objects', ['boundary-chip', 'boundary-ring']);
document.querySelectorAll('.work-thread').forEach((section, index) => {
  addWorkObjects(section, `thread-objects-${index + 1}`, ['thread-chip', 'thread-ring', 'thread-dot']);
  const group = section.querySelector(`.thread-objects-${index + 1}`);
  if (group) group.classList.add('thread-objects');
});

const workChapters = [...document.querySelectorAll('.work-hero, .work-thread, .video-archive, .archive-note')];
if (workReduceMotion) {
  workChapters.forEach((chapter) => chapter.style.setProperty('--p', '.5'));
} else {
  let workTicking = false;
  const updateWorkChoreography = () => {
    const viewportHeight = window.innerHeight;
    workChapters.forEach((chapter) => {
      const bounds = chapter.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, ((viewportHeight * 0.22) - bounds.top) / bounds.height));
      chapter.style.setProperty('--p', progress.toFixed(4));
    });
    workTicking = false;
  };
  const requestWorkUpdate = () => {
    if (workTicking) return;
    workTicking = true;
    window.requestAnimationFrame(updateWorkChoreography);
  };
  requestWorkUpdate();
  window.addEventListener('scroll', requestWorkUpdate, { passive: true });
  window.addEventListener('resize', requestWorkUpdate, { passive: true });
}
