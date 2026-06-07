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
