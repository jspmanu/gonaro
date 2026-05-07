/* ───────────────────────────────────────────────────────────
   NĀRO motion-animations.js
   - Scroll-triggered fade-up for [data-motion="up"]
   - Count-up for [data-count-up]
   - Staggered children for [data-stagger]
   - Nav scroll shadow toggle
   - JS-gated visibility (no JS = elements stay visible)
   - 1s safety fallback that reveals anything still hidden
─────────────────────────────────────────────────────────── */

/* Mark JS as available immediately so CSS may hide elements safely.
   CSS hide rules are scoped to `.js-motion ...` so a JS failure leaves
   content visible. */
document.documentElement.classList.add('js-motion');

(function () {
  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var IO_OPTS = { threshold: 0.05, rootMargin: '0px 0px -50px 0px' };

  /* ── Helpers ─────────────────────────────────────────── */
  function reveal(el) {
    el.classList.add('animate-in');
  }

  function inViewport(el) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var vw = window.innerWidth || document.documentElement.clientWidth;
    return r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw;
  }

  /* ── 1. Scroll fade-up + sections (legacy) ───────────── */
  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        reveal(entry.target);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, IO_OPTS);

  var fadeTargets = [].slice.call(
    document.querySelectorAll('[data-motion="up"], section:not(.hero):not([data-motion])')
  );
  fadeTargets.forEach(function (el) { fadeObserver.observe(el); });

  /* ── 2. Staggered children inside [data-stagger] ─────── */
  var stagObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var children = entry.target.querySelectorAll('[data-stagger-child]');
      var delay = parseInt(entry.target.dataset.staggerDelay || '200', 10);
      children.forEach(function (child, i) {
        if (prefersReduced) {
          reveal(child);
        } else {
          setTimeout(function () { reveal(child); }, i * delay);
        }
      });
      stagObserver.unobserve(entry.target);
    });
  }, IO_OPTS);

  var stagTargets = [].slice.call(document.querySelectorAll('[data-stagger]'));
  stagTargets.forEach(function (el) { stagObserver.observe(el); });

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

  /* ── 4. Reveal anything already in viewport on load ──── */
  function revealInViewport() {
    fadeTargets.forEach(function (el) {
      if (!el.classList.contains('animate-in') && inViewport(el)) reveal(el);
    });
    stagTargets.forEach(function (el) {
      if (inViewport(el)) {
        var children = el.querySelectorAll('[data-stagger-child]');
        var delay = parseInt(el.dataset.staggerDelay || '200', 10);
        children.forEach(function (child, i) {
          if (child.classList.contains('animate-in')) return;
          if (prefersReduced) reveal(child);
          else setTimeout(function () { reveal(child); }, i * delay);
        });
      }
    });
    document.querySelectorAll('[data-count-up]').forEach(function (el) {
      if (!el.dataset._counted && inViewport(el)) {
        el.dataset._counted = '1';
        runCountUp(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealInViewport);
  } else {
    revealInViewport();
  }

  /* ── 5. Safety net: reveal anything still hidden after 1s */
  setTimeout(function () {
    document.querySelectorAll('[data-motion="up"]:not(.animate-in), [data-stagger-child]:not(.animate-in)').forEach(reveal);
    document.querySelectorAll('[data-count-up]').forEach(function (el) {
      if (!el.dataset._counted) {
        el.dataset._counted = '1';
        runCountUp(el);
      }
    });
  }, 1000);

  /* ── 6. Nav scroll shadow ────────────────────────────── */
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
