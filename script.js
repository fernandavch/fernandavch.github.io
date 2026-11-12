/* SITE SCRIPT */
(function () {
  var root = document.documentElement;

  /* MENU */
  var btn = document.querySelector('.menu-btn');
  var scrim = document.querySelector('.scrim');
  var side = document.getElementById('sidebar');

  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    if (btn) btn.setAttribute('aria-expanded', open);
  }
  if (btn) {
    btn.addEventListener('click', function () {
      setMenu(!root.classList.contains('menu-open'));
    });
  }
  if (scrim) scrim.addEventListener('click', function () { setMenu(false); });
  if (side) {
    side.addEventListener('click', function (e) {
      if (e.target.closest('.nav a')) setMenu(false);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && root.classList.contains('menu-open')) {
      setMenu(false);
      if (btn) btn.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 800) setMenu(false);
  });

  /* THEME SWITCH */
  var theme = document.getElementById('theme');
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function isDark() {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : mq.matches;
  }
  function sync() { if (theme) theme.setAttribute('aria-checked', isDark()); }

  if (theme) {
    theme.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
  }
  if (mq.addEventListener) mq.addEventListener('change', sync);
  sync();
})();
