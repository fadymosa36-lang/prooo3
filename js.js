// ═══════════════════════════════════════════
//   FADY MOSA — PORTFOLIO JS v2
//   Premium Features · 2026
// ═══════════════════════════════════════════

// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('done');
    // Trigger hero reveal after load
    document.querySelectorAll('[data-reveal],[data-reveal-left],[data-reveal-right]').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), 200 + i * 120);
    });
  }, 2000);
});

// ── THEME TOGGLE (Dark / Light) ──
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('fady-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle && themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('fady-theme', next);
});

// ── SCROLL PROGRESS BAR ──
const scrollFill = document.getElementById('scroll-fill');
function updateScrollProgress() {
  if (!scrollFill) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollFill.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ── NAV SCROLL STATE ──
const navEl = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (!navEl) return;
  navEl.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── CURSOR ──
const dot = document.getElementById('dot');
const ring = document.getElementById('ring');
if (dot && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
  });
  (function loop() {
    rx += (mx - rx) * .09; ry += (my - ry) * .09;
    ring.style.transform = `translate(${rx - 16}px,${ry - 16}px)`;
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.pj-dot,.drawer-link').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}

// ── MOBILE HAMBURGER + DRAWER ──
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('mobile-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');

function openDrawer() {
  hamburger && hamburger.classList.add('open');
  drawer && drawer.classList.add('open');
  drawerOverlay && drawerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  hamburger && hamburger.classList.remove('open');
  drawer && drawer.classList.remove('open');
  drawerOverlay && drawerOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
hamburger && hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeDrawer() : openDrawer();
});
drawerOverlay && drawerOverlay.addEventListener('click', closeDrawer);
document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// ── REVEAL ANIMATIONS ──
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('in'), i * 80);
  });
}, { threshold: .06 });
document.querySelectorAll('[data-reveal],[data-reveal-left],[data-reveal-right],.reveal').forEach(el => obs.observe(el));

const skObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: .2 });
document.querySelectorAll('.sk-card').forEach(el => skObs.observe(el));

// ── NAV ACTIVE SECTION HIGHLIGHTING ──
const secs = document.querySelectorAll('section[id]');
const nas = document.querySelectorAll('.n-links a');
window.addEventListener('scroll', () => {
  let id = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 180) id = s.id; });
  nas.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
  });
}, { passive: true });

// ── EYEBROW TYPING EFFECT ──
const words = ['Front-end Developer', 'Problem Solver', 'SQL Developer', 'Open Source Builder', 'UI/UX Enthusiast'];
let wi = 0, ci = 0, del = false;
const eyebrowEl = document.getElementById('eyebrow-text');
function type() {
  if (!eyebrowEl) return;
  const w = words[wi];
  if (!del) {
    eyebrowEl.textContent = w.slice(0, ++ci);
    if (ci === w.length) { del = true; setTimeout(type, 2400); return; }
  } else {
    eyebrowEl.textContent = w.slice(0, --ci);
    if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, del ? 38 : 72);
}
setTimeout(type, 2200);

// ── COUNTER ANIMATION (Hero Stats) ──
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  if (!target) return;
  let current = 0;
  const step = Math.ceil(target / 40);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(interval);
  }, 40);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: .5 });
document.querySelectorAll('.stat-num[data-count]').forEach(el => counterObs.observe(el));

// ── PROJECT IMAGE SLIDER (WorkerHub) ──
function initSliders() {
  document.querySelectorAll('.pj-img-slider').forEach(slider => {
    const slides = slider.querySelectorAll('.pj-slide');
    const dots = slider.querySelectorAll('.pj-dot');
    if (!slides.length) return;
    let current = 0;
    let timer;

    function goTo(n) {
      slides[current].classList.remove('active');
      dots[current] && dots[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current] && dots[current].classList.add('active');
    }

    function startAuto() {
      timer = setInterval(() => goTo(current + 1), 3200);
    }
    function stopAuto() { clearInterval(timer) }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
    });

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    startAuto();
  });
}
initSliders();

// ── PROJECT FILTER ──
const filterBtns = document.querySelectorAll('.pj-filter');
const pjItems = document.querySelectorAll('.pj-item');
const pjPhPair = document.querySelector('.pj-ph-pair');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    // Placeholder pair: always visible
    if (pjPhPair) {
      pjPhPair.style.opacity = '1';
      pjPhPair.style.display = '';
    }

    pjItems.forEach((item, i) => {
      const cat = item.getAttribute('data-category') || '';
      const match = filter === 'all' || cat === filter;

      if (match) {
        item.classList.remove('filtered-out');
        item.style.opacity = '0';
        item.style.display = '';
        setTimeout(() => { item.style.opacity = '1'; }, i * 60);
      } else {
        item.style.opacity = '0';
        setTimeout(() => {
          item.classList.add('filtered-out');
        }, 300);
      }
    });
  });
});

// ── CONTACT FORM VALIDATION + SUBMISSION ──
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('formSubmitBtn');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

function validateField(input, errId, msg) {
  const errEl = document.getElementById(errId);
  if (!input.value.trim()) {
    input.classList.add('error');
    if (errEl) errEl.textContent = msg;
    return false;
  }
  if (input.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value.trim())) {
      input.classList.add('error');
      if (errEl) errEl.textContent = 'Please enter a valid email address.';
      return false;
    }
  }
  input.classList.remove('error');
  if (errEl) errEl.textContent = '';
  return true;
}

// Live validation on blur
['fname','femail','fsubject','fmessage'].forEach(id => {
  const msgs = { fname: 'Name is required.', femail: 'Email is required.', fsubject: 'Subject is required.', fmessage: 'Message is required.' };
  const errIds = { fname: 'err-name', femail: 'err-email', fsubject: 'err-subject', fmessage: 'err-message' };
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('blur', () => validateField(el, errIds[id], msgs[id]));
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        el.classList.remove('error');
        const errEl = document.getElementById(errIds[id]);
        if (errEl) errEl.textContent = '';
      }
    });
  }
});

if (form && submitBtn) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const nameOk = validateField(document.getElementById('fname'), 'err-name', 'Name is required.');
    const emailOk = validateField(document.getElementById('femail'), 'err-email', 'Email is required.');
    const subjectOk = validateField(document.getElementById('fsubject'), 'err-subject', 'Subject is required.');
    const msgOk = validateField(document.getElementById('fmessage'), 'err-message', 'Message is required.');

    if (!nameOk || !emailOk || !subjectOk || !msgOk) return;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.submit-text').style.display = 'none';
    submitBtn.querySelector('.submit-spinner').style.display = 'flex';
    submitBtn.querySelector('.submit-arrow').style.display = 'none';
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok || response.status === 200) {
        // Success
        if (successMsg) successMsg.style.display = 'flex';
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      if (errorMsg) errorMsg.style.display = 'flex';
    } finally {
      // Restore button
      submitBtn.disabled = false;
      submitBtn.querySelector('.submit-text').style.display = '';
      submitBtn.querySelector('.submit-spinner').style.display = 'none';
      submitBtn.querySelector('.submit-arrow').style.display = '';
    }
  });
}

// ── FLOATING BACK TO TOP + CIRCULAR PROGRESS ──
const fabTop = document.getElementById('fab-top');
const fabProg = fabTop && fabTop.querySelector('.fab-prog');
const CIRCUMFERENCE = 2 * Math.PI * 19; // r=19, C = 2πr ≈ 119.38

window.addEventListener('scroll', () => {
  if (!fabTop) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;

  // Show/hide FAB
  fabTop.classList.toggle('visible', scrollTop > 300);

  // Update SVG circle progress
  if (fabProg) {
    const offset = CIRCUMFERENCE * (1 - progress);
    fabProg.style.strokeDashoffset = offset;
  }
}, { passive: true });

fabTop && fabTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── ULTRA-LUXURY CONSTELLATION & STAR MESH BACKGROUND ──
(function () {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = window.innerWidth;
  let H = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  let particles = [];
  let mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, active: false };
  let scrollY = window.scrollY;
  let scrollVel = 0;
  let lastScrollY = window.scrollY;

  // Track window scroll for subtle parallax reaction while staying fixed
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    scrollVel += (currentY - lastScrollY) * 0.12;
    lastScrollY = currentY;
    scrollY = currentY;
  }, { passive: true });

  window.addEventListener('mousemove', e => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.targetX = -9999;
    mouse.targetY = -9999;
  });

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  // Node Class: Calm, subtle, elegant starlight
  class Node {
    constructor(isInitial = true) {
      this.reset(isInitial);
    }

    reset(isInitial = false) {
      this.x = Math.random() * W;
      this.y = isInitial ? Math.random() * H : (Math.random() > 0.5 ? -15 : H + 15);
      
      // Gentle, calm, slow drift (not rushed or distracting)
      const speed = Math.random() * 0.16 + 0.06;
      const angle = Math.random() * Math.PI * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      // Color types: Soft Champagne Gold or Subtle Celestial Blue
      const roll = Math.random();
      if (roll < 0.78) {
        this.type = 'gold'; // Soft Champagne
        this.baseR = Math.random() * 1.0 + 1.1;
      } else {
        this.type = 'blue'; // Celestial Blue accent
        this.baseR = Math.random() * 1.1 + 1.2;
      }

      // Very few subtle orbital rings (only 1 or 2 across entire canvas)
      this.hasRing = (Math.random() < 0.05);
      this.ringRadius = Math.random() * 8 + 16;
      this.ringPulse = Math.random() * Math.PI * 2;
      this.ringSpeed = Math.random() * 0.008 + 0.004;

      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.012 + 0.006;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      this.pulse += this.pulseSpeed;
      this.ringPulse += this.ringSpeed;

      // Subtle scroll parallax
      this.y -= scrollVel * 0.08;

      // Gentle interactive mouse attraction
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxMouseDist = 140;
        if (dist < maxMouseDist && dist > 0.1) {
          const force = (1 - dist / maxMouseDist) * 0.25;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }

      // Soft wrapping around viewport edges
      const pad = 30;
      if (this.x < -pad) this.x = W + pad;
      if (this.x > W + pad) this.x = -pad;
      if (this.y < -pad) this.y = H + pad;
      if (this.y > H + pad) this.y = -pad;
    }

    draw(isLight) {
      const breath = Math.sin(this.pulse) * 0.2 + 0.8;
      const currentR = this.baseR * breath;

      let coreColor, haloColor, ringColor;

      if (!isLight) {
        // DARK MODE: Refined Champagne & Subtle Celestial Blue (Calm & Elegant)
        if (this.type === 'blue') {
          coreColor = `rgba(140, 185, 255, ${0.65 * breath})`;
          haloColor = `rgba(80, 130, 240, `;
          ringColor = `rgba(100, 155, 255, 0.18)`;
        } else {
          coreColor = `rgba(240, 215, 175, ${0.7 * breath})`;
          haloColor = `rgba(220, 185, 130, `;
          ringColor = `rgba(220, 185, 130, 0.18)`;
        }
      } else {
        // LIGHT MODE
        if (this.type === 'blue') {
          coreColor = `rgba(70, 105, 160, ${0.6 * breath})`;
          haloColor = `rgba(70, 105, 160, `;
          ringColor = `rgba(70, 105, 160, 0.15)`;
        } else {
          coreColor = `rgba(160, 120, 40, ${0.6 * breath})`;
          haloColor = `rgba(160, 120, 40, `;
          ringColor = `rgba(160, 120, 40, 0.15)`;
        }
      }

      // 1. Soft subtle halo
      const haloR = currentR * 3.5;
      const haloGrad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, haloR);
      const maxHaloAlpha = (!isLight ? 0.14 : 0.08) * breath;
      haloGrad.addColorStop(0, haloColor + maxHaloAlpha + ')');
      haloGrad.addColorStop(0.5, haloColor + (maxHaloAlpha * 0.3) + ')');
      haloGrad.addColorStop(1, haloColor + '0)');

      ctx.beginPath();
      ctx.arc(this.x, this.y, haloR, 0, Math.PI * 2);
      ctx.fillStyle = haloGrad;
      ctx.fill();

      // 2. Star central point
      ctx.beginPath();
      ctx.arc(this.x, this.y, currentR, 0, Math.PI * 2);
      ctx.fillStyle = coreColor;
      ctx.fill();

      // 3. Subtle delicate ring (if star has ring)
      if (this.hasRing) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 0.65;
        ctx.stroke();
      }
    }
  }

  function initParticles() {
    // Sparse, calm count: ~34 on desktop, ~18 on mobile (not overcrowded)
    const count = W < 768 ? 18 : 34;
    particles = Array.from({ length: count }, () => new Node(true));
  }

  // Draw gentle, delicate constellation connecting lines
  function drawConstellations(isLight) {
    const maxDist = W < 768 ? 90 : 130;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const factor = 1 - dist / maxDist;
          // Very soft line opacity (0.12 max)
          const alpha = (!isLight ? 0.14 : 0.10) * factor;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          if (!isLight) {
            ctx.strokeStyle = (p1.type === 'blue' || p2.type === 'blue')
              ? `rgba(120, 170, 255, ${alpha * 0.8})`
              : `rgba(225, 195, 145, ${alpha})`;
          } else {
            ctx.strokeStyle = `rgba(160, 120, 40, ${alpha * 0.6})`;
          }

          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Very soft mouse connection
      if (mouse.active) {
        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        const mouseConnDist = 120;

        if (mDistSq < mouseConnDist * mouseConnDist) {
          const mDist = Math.sqrt(mDistSq);
          const mFactor = 1 - mDist / mouseConnDist;
          const mAlpha = (!isLight ? 0.22 : 0.15) * mFactor;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = (!isLight ? `rgba(240, 215, 175, ${mAlpha})` : `rgba(160, 120, 40, ${mAlpha})`);
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse follow
    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;
    }

    // Decay scroll velocity smoothly
    scrollVel *= 0.90;

    // Check current theme
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Clear canvas
    ctx.clearRect(0, 0, W, H);

    // Atmospheric Deep Cosmic Gradient in Dark Mode
    if (!isLight) {
      const bgGrad = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.85);
      bgGrad.addColorStop(0, '#07070f');
      bgGrad.addColorStop(0.65, '#05050b');
      bgGrad.addColorStop(1, '#030307');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);
    }

    // Draw constellation connection web & geometric triangles
    drawConstellations(isLight);

    // Update and draw all stars & radar rings
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(isLight);
    }
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
})();

