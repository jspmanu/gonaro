const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Only animate sections BELOW the hero
document.querySelectorAll('section:not(.hero)').forEach(el => {
  observer.observe(el);
});
