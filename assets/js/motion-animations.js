/* ───────────────────────────────────────────────────────────
   NĀRO motion-animations.js
   - Scroll-triggered fade-up for [data-motion="up"]
   - Count-up for [data-count-up]
   - Staggered children for [data-stagger]
   - Nav scroll shadow toggle
─────────────────────────────────────────────────────────── */
(function () {
  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Scroll fade-up + sections (legacy) ───────────── */
  var ioOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, ioOpts);

  document.querySelectorAll('[data-motion="up"]').forEach(function (el) {
    fadeObserver.observe(el);
  });

  // Keep legacy behavior for sections that don't have data-motion
  document.querySelectorAll('section:not(.hero):not([data-motion])').forEach(function (el) {
    fadeObserver.observe(el);
  });

  /* ── 2. Staggered children inside [data-stagger] ─────── */
  var stagObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var children = entry.target.querySelectorAll('[data-stagger-child]');
      var delay = parseInt(entry.target.dataset.staggerDelay || '200', 10);
      children.forEach(function (child, i) {
        if (prefersReduced) {
          child.classList.add('animate-in');
        } else {
          setTimeout(function () { child.classList.add('animate-in'); }, i * delay);
        }
      });
      stagObserver.unobserve(entry.target);
    });
  }, ioOpts);

  document.querySelectorAll('[data-stagger]').forEach(function (el) {
    stagObserver.observe(el);
  });

  /* ── 3. Count-up numbers ─────────────────────────────── */
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function runCountUp(el) {
    var target = parseFloat(el.dataset.countUp);
    if (isNaN(target)) return;
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var dur = parseInt(el.dataset.duration || '1400', 10);
    var decimals = parseInt(el.dataset.decimals || '0', 10);

    if (prefersReduced) {
      el.textContent = prefix + target.toFixed(decimals) + suffix;
      return;
    }

    var start = performance.now();
    function tick(now) {
      var progress = Math.min((now - start) / dur, 1);
      var value = target * easeOut(progress);
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(tick);
  }

  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        runCountUp(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-count-up]').forEach(function (el) {
    countObserver.observe(el);
  });

  /* ── 4. Nav scroll shadow ────────────────────────────── */
  var nav = document.getElementById('main-nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 8) nav.classList.add('nav--scrolled');
      else nav.classList.remove('nav--scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
