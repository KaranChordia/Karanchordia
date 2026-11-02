document.addEventListener('click', function (e) {
  var btn = e.target.closest('.lite-yt-btn');
  if (!btn) return;
  var f = document.createElement('iframe');
  f.src = 'https://www.youtube-nocookie.com/embed/' + btn.dataset.id + '?autoplay=1&rel=0';
  f.title = btn.getAttribute('aria-label');
  f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
  f.allowFullscreen = true;
  f.className = 'lite-yt-frame';
  btn.replaceWith(f);
});
