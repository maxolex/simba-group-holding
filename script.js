const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

document.querySelector('.newsletter form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  document.querySelector('.toast')?.classList.add('show');
  window.setTimeout(() => document.querySelector('.toast')?.classList.remove('show'), 3800);
});

if (!prefersReduced && window.gsap) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.site-header', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' });
  gsap.from('.hero-eyebrow', { x: -30, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' });
  gsap.from('.hero h1', { y: 45, opacity: 0, duration: 1.1, delay: 0.25, ease: 'power4.out' });
  gsap.from('.hero-lede', { y: 25, opacity: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' });
  gsap.from('.hero-actions', { y: 22, opacity: 0, duration: 0.8, delay: 0.65, ease: 'power3.out' });
  gsap.from('.hero-lion', { scale: 0.82, opacity: 0, rotation: -16, duration: 1.6, delay: 0.2, ease: 'power3.out' });

  document.querySelectorAll('.reveal:not(.company-card)').forEach((element) => {
    gsap.fromTo(element, { y: 25, opacity: 0 }, {
      scrollTrigger: { trigger: element, start: 'top 86%', once: true },
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
    });
  });

  gsap.fromTo('.company-card', { y: 35, opacity: 0 }, {
    scrollTrigger: { trigger: '.cards', start: 'top 80%', once: true },
    y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power3.out',
  });

  document.querySelectorAll('[data-count]').forEach((counter) => {
    const target = Number(counter.dataset.count);
    gsap.to(counter, {
      scrollTrigger: { trigger: counter, start: 'top 90%', once: true },
      innerText: target, duration: 1.6, snap: { innerText: 1 }, ease: 'power2.out',
    });
  });

  gsap.to('.hero-lion', {
    yPercent: 8, ease: 'none',
    scrollTrigger: { trigger: '.hero', scrub: true, start: 'top top', end: 'bottom top' },
  });
} else {
  document.querySelectorAll('.reveal').forEach((element) => { element.style.opacity = '1'; element.style.transform = 'none'; });
  document.querySelectorAll('[data-count]').forEach((counter) => { counter.textContent = counter.dataset.count; });
}

const observedSections = [...document.querySelectorAll('main > section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav > a:not(.nav-cta)')];
const updateActiveLink = (id) => navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) updateActiveLink(visible.target.id);
  }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75] });
  observedSections.forEach((section) => sectionObserver.observe(section));
}

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  if (!glow || window.innerWidth < 900) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});
