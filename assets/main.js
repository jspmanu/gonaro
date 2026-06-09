// NĀRO homepage interactions — extracted to an external file so the strict CSP
// (script-src 'self') can stay in place without 'unsafe-inline'.

// Scroll-reveal for elements with .rv
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

// Frosted-glass nav once scrolled past 50px
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// "In actie" timeline — self-playing offerte → opvolging → gewonnen, loops every 10s.
const demo = document.querySelector('.demo');
if (demo) {
  const status = demo.querySelector('#demoStatus');
  const amt = demo.querySelector('#demoAmt');
  const msgs = demo.querySelectorAll('.tl-msg');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setStatus = (cls, label) => {
    status.className = 'tagp demo-status ' + cls;
    status.innerHTML = '<span class="d"></span>' + label;
  };

  const showFinalState = () => {
    msgs.forEach((m) => m.classList.add('show'));
    amt.classList.add('won');
    setStatus('won', 'Gewonnen');
  };

  if (reduce.matches) {
    // Respect reduced-motion: render the resolved state, skip the loop.
    showFinalState();
  } else {
    let timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));

    const reset = () => {
      timers.forEach(clearTimeout);
      timers = [];
      msgs.forEach((m) => m.classList.remove('show'));
      amt.classList.remove('won');
      setStatus('sent', 'Verstuurd');
    };

    const play = () => {
      reset();                                                   // t=0  Verstuurd
      at(2000, () => { msgs[0].classList.add('show'); setStatus('follow', 'Opvolging dag 3'); });
      at(4000, () => { msgs[1].classList.add('show'); setStatus('follow', 'Opvolging dag 7'); });
      at(6000, () => { msgs[2].classList.add('show'); });
      at(7500, () => { setStatus('won', 'Gewonnen'); amt.classList.add('won'); });
      at(9500, play);                                            // loop ~10s
    };

    // Kick off once the section scrolls into view; pause when fully offscreen.
    let running = false;
    const vis = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !running) { running = true; play(); }
        else if (!e.isIntersecting && running) { running = false; reset(); }
      });
    }, { threshold: 0.25 });
    vis.observe(demo);
  }
}
