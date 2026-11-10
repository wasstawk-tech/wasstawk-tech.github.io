(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile menu
  var menuBtn = document.getElementById('menu-toggle');
  var links = document.getElementById('links');
  menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      links.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Copy email
  var copyBtn = document.getElementById('copy-email');
  copyBtn.addEventListener('click', function () {
    var email = 'wasstawk@gmail.com';
    var label = copyBtn.textContent;
    var done = function () {
      copyBtn.textContent = '[ copied ✔ ]';
      setTimeout(function () { copyBtn.textContent = label; }, 1800);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(done, function () { window.prompt('Copy email:', email); });
    } else {
      window.prompt('Copy email:', email);
    }
  });

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typing effect for role
  var typed = document.getElementById('typed');
  var roles = ['Full Stack Developer', 'AI Automation Engineer', 'n8n + GoHighLevel Expert', 'Project Manager'];
  if (typed && !reduceMotion) {
    var r = 0, i = roles[0].length, deleting = true;
    setTimeout(function tick() {
      var word = roles[r];
      if (deleting) {
        i--;
        if (i <= 0) { deleting = false; r = (r + 1) % roles.length; }
      } else {
        i++;
        if (i >= roles[r].length) { deleting = true; typed.textContent = roles[r]; return setTimeout(tick, 2200); }
      }
      typed.textContent = roles[deleting ? r : r].slice(0, Math.max(i, 0));
      setTimeout(tick, deleting ? 35 : 70);
    }, 2200);
  }

  // Matrix-style background
  var canvas = document.getElementById('matrix');
  if (canvas && canvas.getContext && !reduceMotion) {
    var ctx = canvas.getContext('2d');
    var chars = '01<>/{}[]=+*$#アイウエオカキクケコ'.split('');
    var size = 16, cols, drops;
    var resize = function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / size);
      drops = [];
      for (var c = 0; c < cols; c++) drops[c] = Math.random() * -50;
    };
    resize();
    window.addEventListener('resize', resize);
    setInterval(function () {
      if (document.hidden) return;
      ctx.fillStyle = 'rgba(5, 8, 13, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = size + 'px JetBrains Mono, monospace';
      for (var c = 0; c < cols; c++) {
        var y = drops[c] * size;
        ctx.fillStyle = Math.random() > 0.975 ? '#c8ffe9' : '#00ff9c';
        ctx.fillText(chars[(Math.random() * chars.length) | 0], c * size, y);
        if (y > canvas.height && Math.random() > 0.975) drops[c] = 0;
        drops[c] += 0.5;
      }
    }, 55);
  }

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
  items.forEach(function (el) { io.observe(el); });
})();
