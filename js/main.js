/* Children Of God Ministry — motion & the drifting light field.
   Signature element: soft gold motes rising like light through a window,
   with a GSAP-orchestrated hero and a pinned "Our Foundation" scripture moment. */

(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------- Light field */
  class LightField {
    constructor(canvas, { density = 1, reactive = false } = {}) {
      this.c = canvas;
      this.ctx = canvas.getContext('2d');
      this.density = density;
      this.reactive = reactive;
      this.motes = [];
      this.mouse = { x: 0.5, y: 0.5, active: false };
      this.resize();
      window.addEventListener('resize', () => this.resize());
      if (reactive) {
        canvas.parentElement.addEventListener('pointermove', (e) => {
          const r = this.c.getBoundingClientRect();
          this.mouse.x = (e.clientX - r.left) / r.width;
          this.mouse.y = (e.clientY - r.top) / r.height;
          this.mouse.active = true;
        });
      }
    }
    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = this.c.clientWidth, h = this.c.clientHeight;
      this.c.width = w * dpr; this.c.height = h * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.w = w; this.h = h;
      const target = Math.round((w * h) / 34000 * this.density);
      this.count = Math.max(14, Math.min(target, 90));
      this.motes = Array.from({ length: this.count }, () => this.spawn(true));
    }
    spawn(initial = false) {
      const palette = ['#d4aa5a', '#c18e35', '#f2e0b8'];
      return {
        x: Math.random() * this.w,
        y: initial ? Math.random() * this.h : this.h + 10,
        r: Math.random() * 1.8 + 0.5,
        vy: -(Math.random() * 0.28 + 0.08),
        vx: (Math.random() - 0.5) * 0.18,
        life: 0,
        max: Math.random() * 420 + 260,
        color: palette[(Math.random() * palette.length) | 0],
        flick: Math.random() * Math.PI * 2,
      };
    }
    step() {
      const { ctx, w, h } = this;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < this.motes.length; i++) {
        const e = this.motes[i];
        e.life++;
        e.flick += 0.05;
        let drift = e.vx + Math.sin(e.life * 0.015) * 0.1;
        if (this.reactive && this.mouse.active) {
          drift += (this.mouse.x - e.x / w) * 0.15;
        }
        e.x += drift;
        e.y += e.vy;
        const p = e.life / e.max;
        const alpha = Math.sin(Math.min(p, 1) * Math.PI) * (0.4 + Math.sin(e.flick) * 0.18);
        const radius = e.r * (1 + Math.sin(e.flick) * 0.15);
        ctx.beginPath();
        ctx.fillStyle = e.color;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.shadowColor = e.color;
        ctx.shadowBlur = 10;
        ctx.arc(e.x, e.y, radius, 0, Math.PI * 2);
        ctx.fill();
        if (e.y < -10 || e.life > e.max || e.x < -20 || e.x > w + 20) this.motes[i] = this.spawn();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      this.raf = requestAnimationFrame(() => this.step());
    }
    start() { if (!this.raf) this.step(); }
    // A calm, static single frame for reduced-motion users.
    paintStatic() {
      const { ctx } = this;
      ctx.globalCompositeOperation = 'lighter';
      this.motes.forEach((e) => {
        ctx.beginPath(); ctx.fillStyle = e.color; ctx.globalAlpha = 0.3;
        ctx.shadowColor = e.color; ctx.shadowBlur = 8;
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    }
  }

  const heroCanvas = document.getElementById('lightfield');
  const scrCanvas = document.getElementById('lightfield2');
  const heroField = heroCanvas && new LightField(heroCanvas, { density: 1, reactive: true });
  const scrField = scrCanvas && new LightField(scrCanvas, { density: 0.6 });
  if (reduce) {
    heroField && heroField.paintStatic();
    scrField && scrField.paintStatic();
  } else {
    heroField && heroField.start();
    scrField && scrField.start();
  }

  /* ----------------------------------------------------------------- Nav + progress */
  const nav = document.getElementById('nav');
  const progress = document.getElementById('progress');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----------------------------------------------------------------- GSAP */
  if (reduce || !window.gsap) {
    const intro = document.getElementById('intro');
    if (intro) intro.style.display = 'none';
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Dawn intro → hero
  const intro = document.getElementById('intro');
  const tl = gsap.timeline();
  tl.to('.intro-spark', { boxShadow: '0 0 50px 20px rgba(212,170,90,0.85)', scale: 3, duration: 0.7, ease: 'power2.out' })
    .to('#intro', { autoAlpha: 0, duration: 0.6, ease: 'power2.inOut', onComplete: () => intro && (intro.style.display = 'none') }, '+=0.15')
    // Hero headline: rise + fade, line by line
    .from('.hero-title .line', { yPercent: 115, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.12 }, '-=0.3')
    .from('section:first-of-type .reveal', { y: 26, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }, '-=0.7');

  // Scroll reveals (skip the hero's, already handled)
  gsap.utils.toArray('.reveal').forEach((el) => {
    if (el.closest('section:first-of-type')) return;
    gsap.from(el, {
      y: 34, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%' },
    });
  });

  // Pinned "Our Foundation": hold, let the light drift, gently scale the verse
  ScrollTrigger.create({
    trigger: '#foundation',
    start: 'top top',
    end: '+=120%',
    pin: true,
    pinSpacing: true,
  });
  gsap.fromTo('#verse',
    { scale: 0.94, opacity: 0.25 },
    { scale: 1, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: '#foundation', start: 'top 80%', end: 'top top', scrub: true } });
  gsap.to('#verseTag', {
    letterSpacing: '0.6em', ease: 'none',
    scrollTrigger: { trigger: '#foundation', start: 'top bottom', end: 'top top', scrub: true },
  });

  // Subtle parallax on the hero title
  gsap.utils.toArray('.hero-title').forEach((el) => {
    gsap.to(el, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } });
  });
})();
