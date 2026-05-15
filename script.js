// Pacific Nomad Brewing — interactions

(() => {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Reveal on scroll
  const targets = document.querySelectorAll(
    '.section__head, .almanac__col, .card-stat, .beer, .upcoming, .polaroid, .visiting-card, .visit__aside, .gathering__lead, .gathering__foot, .tap__intro, .cellar__intro'
  );
  targets.forEach(el => el.classList.add('reveal'));

  // ?reveal=1 — show all sections at once (used for printing / static rendering)
  if (location.search.includes('reveal')) {
    targets.forEach(el => el.classList.add('is-in'));
    return;
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger when several reveal at once
          setTimeout(() => entry.target.classList.add('is-in'), i * 70);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(el => io.observe(el));
  } else {
    targets.forEach(el => el.classList.add('is-in'));
  }

  // Subtle hero parallax on scroll
  const seal = document.querySelector('.hero__seal-wrap');
  const quote = document.querySelector('.hero__quote');
  if (seal && quote && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = Math.min(window.scrollY, 600);
          seal.style.setProperty('transform', `translateY(${y * 0.15}px)`);
          quote.style.setProperty('transform', `translateY(${y * 0.08}px)`);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
