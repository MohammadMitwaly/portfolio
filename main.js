/* Auteur Studio interactions & hidden gems
   - Konami Code → Don't Panic theme
   - 42s idle → starfield + subtle 42
   - Directors buttons → palette swap
   - V-W-V → accent cycle (Vampire Weekend)
   - Rigatoni / Cookies → recipe modal
   - Film frame scroll → heading highlights
*/

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const root = document.documentElement;
  const progressEl = $('#progress');
  const letterbox = $('#letterbox');
  const sceneIndicator = $('#scene-indicator');
  const toTopBtn = $('#toTop');
  const paletteBtn = $('#palette-btn');
  const paletteTray = $('#palette-tray');

  // Year
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Theme helpers
  const defaultTitle = document.title;
  const h1 = $('.display');
  const fortyTwo = $('#forty-two');
  const starfield = $('#starfield');
  const tagline = $('.tagline');

  function applyTheme(name) {
    root.setAttribute('data-theme', name);
    if (name === 'dontpanic') {
      if (h1) h1.title = "Don't Panic";
      document.title = "Don't Panic — Mo Mitwaly";
      fortyTwo?.removeAttribute('hidden');
    } else {
      if (h1) h1.title = h1.getAttribute('data-title-default') || 'Mo Mitwaly';
      document.title = defaultTitle;
      fortyTwo?.setAttribute('hidden', '');
    }
    // Sync browser UI color with current theme background
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
      if (bg) metaTheme.setAttribute('content', bg);
    }
    try { localStorage.setItem('auteur_theme', name); } catch {}
  }

  // Directors palette buttons
  $$('.directors .pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      const t = btn.getAttribute('data-theme');
      if (t) applyTheme(t);
    });
  });

  // Music recommendation
  (function musicRec() {
    const slot = $('#rec-slot');
    const btn = $('#btn-recommend');
    if (!slot || !btn) return;
    const picks = [
      'Vampire Weekend — Modern Vampires of the City',
      'Daft Punk — Random Access Memories',
      'The Strokes — Is This It',
      'The Weeknd — Echoes of Silence',
      'Bad Bunny — Debí Tirar Más Fotos',
      'Rosalía - Los Ángeles',
      'SZA - Ctrl'
    ];
    let i = 0;
    btn.addEventListener('click', () => {
      slot.textContent = picks[i % picks.length];
      i++;
    });
  })();

  // Persisted theme on load
  (function initTheme() {
    try {
      const saved = localStorage.getItem('auteur_theme');
      if (saved) applyTheme(saved);
      else {
        // ensure meta theme color is synced even for default theme
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
          const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
          if (bg) metaTheme.setAttribute('content', bg);
        }
      }
    } catch {}
  })();

  // Recipe modal
  (function recipes() {
    const modal = $('#recipe-modal');
    if (!modal) return;
    const body = $('#recipe-body');
    const title = $('#recipe-title');

    const html = {
      cookies: `
        <p><strong>Chocolate Chip Cookies</strong> — crisp edges, soft center.</p>
        <h4>Ingredients</h4>
        <ul>
          <li>225g all-purpose flour</li>
          <li>170g butter (browned + cooled)</li>
          <li>150g brown sugar, 80g white sugar</li>
          <li>1 egg + 1 yolk</li>
          <li>1 tsp baking soda, 1/2 tsp salt</li>
          <li>200g dark chocolate chips/chunks</li>
        </ul>
        <h4>Method</h4>
        <ol>
          <li>Cream sugars + butter. Add egg + yolk. Fold in dry ingredients.</li>
          <li>Chill 30–60 min. Scoop 60g balls.</li>
          <li>Bake 180°C / 356°F for 10–12 min. Tap tray mid‑bake for crinkles.</li>
          <li>Finish with flaky salt.</li>
        </ol>
        <p class="muted">Tip: Underbake slightly; carryover heat sets the center.</p>
      `,
      rigatoni: `
        <p><strong>Pasta Al Forno (Rigatoni)</strong> — cozy, golden top.</p>
        <h4>Ingredients</h4>
        <ul>
          <li>Rigatoni 500g</li>
          <li>Tomato sauce (garlic, olive oil, basil)</li>
          <li>Mozzarella + parmesan</li>
          <li>Béchamel layer for extra luxe</li>
        </ul>
        <h4>Method</h4>
        <ol>
          <li>Par‑boil rigatoni (−2 min from package). Toss with sauce.</li>
          <li>Layer sauce‑pasta, mozzarella, béchamel (optional), repeat.</li>
          <li>Top with parmesan. Bake 200°C / 392°F until bubbling + golden.</li>
          <li>Rest 10 minutes before serving for clean slices.</li>
        </ol>
        <p class="muted">Tip: Reserve some pasta water to loosen sauce; it should be glossy, not watery.</p>
      `,
    };

    function openRecipe(key) {
      if (!html[key]) return;
      if (title) title.textContent = key === 'cookies' ? 'Chocolate Chip Cookies' : 'Pasta Al Forno (Rigatoni)';
      if (body) body.innerHTML = html[key];
      if ('showModal' in modal) modal.showModal();
      else modal.setAttribute('open', '');
    }

    $$('[data-recipe]').forEach((el) => {
      el.addEventListener('click', () => openRecipe(el.getAttribute('data-recipe')));
    });

    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        modal.close?.();
        modal.removeAttribute('open');
      }
    });
  })();

  // Konami Code → Don't Panic
  (function konami() {
    const seq = ['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
    const pressed = [];
    window.addEventListener('keydown', (e) => {
      pressed.push(e.key.toLowerCase());
      if (pressed.length > seq.length) pressed.shift();
      if (seq.every((v, i) => pressed[i] === v)) {
        applyTheme('dontpanic');
        showStarfield();
      }
    });
  })();

  // V-W-V accent cycle
  (function vwv() {
    const target = ['v','w','v'];
    const picks = ['#b5893b', '#d96b6b', '#4a7a8c', '#6cb3c4', '#8c6e4d'];
    let idx = 0; const buf = [];
    window.addEventListener('keydown', (e) => {
      buf.push(e.key.toLowerCase());
      if (buf.length > target.length) buf.shift();
      if (target.every((v, i) => buf[i] === v)) {
        idx = (idx + 1) % picks.length;
        root.style.setProperty('--accent', picks[idx]);
      }
    });
  })();

  // Idle 42s → starfield + 42
  let idleTimer = null;
  function resetIdle() {
    if (idleTimer) clearTimeout(idleTimer);
    hideStarfield();
    idleTimer = setTimeout(() => {
      showStarfield();
      if (h1) h1.title = 'Life, the Universe & Everything';
      fortyTwo?.removeAttribute('hidden');
    }, 42000);
  }
  ['mousemove','keydown','touchstart','scroll'].forEach((ev) => window.addEventListener(ev, resetIdle));
  resetIdle();

  function ensureStars() {
    if (!starfield || starfield.childElementCount > 0) return;
    const count = 120;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      s.style.left = Math.random() * 100 + 'vw';
      s.style.top = Math.random() * 100 + 'vh';
      // Randomize twinkle and opacity via CSS variables
      const op = (0.6 + Math.random() * 0.4).toFixed(2);
      const dur = (2 + Math.random() * 4).toFixed(2) + 's';
      s.style.setProperty('--op', op);
      s.style.setProperty('--dur', dur);
      if (Math.random() < 0.2) { s.style.width = '3px'; s.style.height = '3px'; }
      frag.appendChild(s);
    }
    starfield.appendChild(frag);
  }
  function showStarfield() { ensureStars(); starfield?.classList.add('show'); }
  function hideStarfield() { starfield?.classList.remove('show'); }

  // Film-frame scroll: emphasize active section headings
  (function frameOnScroll() {
    const titles = $$('.section-title');
    if (!('IntersectionObserver' in window) || titles.length === 0) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('framed');
        else e.target.classList.remove('framed');
      });
    }, { root: null, threshold: 0.5 });
    titles.forEach((t) => obs.observe(t));
  })();

  // Film-strip keyboard navigation (Left/Right to scroll)
  (function filmStripKeys() {
    const strip = document.querySelector('.film-strip');
    if (!strip) return;
    strip.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        strip.scrollBy({ left: 200, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        strip.scrollBy({ left: -200, behavior: 'smooth' });
      }
    });
  })();

  // Scroll progress bar
  (function progressBar() {
    if (!progressEl) return;
    let ticking = false;
    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      progressEl.style.transform = `scaleX(${p})`;
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  })();

  // Back-to-top FAB visibility + click
  (function backToTop() {
    if (!toTopBtn) return;
    function setVis() {
      if (window.scrollY > 600) toTopBtn.removeAttribute('hidden');
      else toTopBtn.setAttribute('hidden', '');
    }
    window.addEventListener('scroll', setVis, { passive: true });
    window.addEventListener('resize', setVis);
    setVis();
    toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  })();

  // Palette tray interactions
  (function palette() {
    if (!paletteBtn || !paletteTray) return;
    const swatches = $$('.swatch', paletteTray);
    function openTray(open) {
      const willOpen = open ?? !paletteTray.classList.contains('open');
      paletteTray.classList.toggle('open', willOpen);
      paletteTray.setAttribute('aria-hidden', String(!willOpen));
      if (willOpen) paletteTray.querySelector('.swatch')?.focus();
    }
    paletteBtn.addEventListener('click', () => openTray());
    document.addEventListener('click', (e) => {
      if (!paletteTray.classList.contains('open')) return;
      const within = paletteTray.contains(e.target) || paletteBtn.contains(e.target);
      if (!within) openTray(false);
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') openTray(false); });
    swatches.forEach((sw) => sw.addEventListener('click', () => { const t = sw.getAttribute('data-theme'); if (t) applyTheme(t); openTray(false); }));

    // Keyboard navigation among swatches
    paletteTray.addEventListener('keydown', (e) => {
      const keys = ['ArrowRight','ArrowLeft','Home','End'];
      if (!keys.includes(e.key)) return;
      const focusables = $$('.swatch', paletteTray);
      const idx = focusables.indexOf(document.activeElement);
      if (e.key === 'Home') { e.preventDefault(); focusables[0]?.focus(); return; }
      if (e.key === 'End') { e.preventDefault(); focusables.at(-1)?.focus(); return; }
      if (idx === -1) return;
      e.preventDefault();
      const delta = e.key === 'ArrowRight' ? 1 : -1;
      let next = (idx + delta + focusables.length) % focusables.length;
      focusables[next]?.focus();
    });
  })();

  // Theater letterbox when film-strip in view
  (function theaterMode() {
    if (!letterbox) return;
    const strip = document.querySelector('.film-strip');
    if (!('IntersectionObserver' in window) || !strip) return;
    const on = () => { letterbox.classList.add('show'); document.documentElement.classList.add('theater'); };
    const off = () => { letterbox.classList.remove('show'); document.documentElement.classList.remove('theater'); };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { e.isIntersecting ? on() : off(); });
    }, { threshold: 0.35 });
    obs.observe(strip);
  })();

  // Scene indicator: show active section title briefly
  (function sceneCue() {
    if (!sceneIndicator) return;
    const titles = $$('.section-title');
    if (!('IntersectionObserver' in window) || titles.length === 0) return;
    let hideTO = null; let last = '';
    function show(text) {
      if (!text || text === last) return; last = text;
      sceneIndicator.textContent = text;
      sceneIndicator.classList.add('show');
      clearTimeout(hideTO);
      hideTO = setTimeout(() => sceneIndicator.classList.remove('show'), 1600);
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) show(e.target.textContent.trim()); });
    }, { threshold: 0.6 });
    titles.forEach((t) => obs.observe(t));
  })();

  // Reveal on scroll
  (function reveal() {
    const nodes = [
      ...$$('.card'),
      ...$$('.film-strip'),
      ...$$('.album-grid'),
      ...$$('.section-title')
    ];
    if (nodes.length === 0 || !('IntersectionObserver' in window)) return;
    nodes.forEach((n) => n.classList.add('reveal'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: 0.25 });
    nodes.forEach((n) => obs.observe(n));
  })();

  // Typewriter effect for tagline (respects reduced motion)
  (function typewriter() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!tagline || reduce || tagline.dataset.typed === '1') return;
    const full = tagline.textContent?.trim() || '';
    let i = 0; tagline.textContent = '';
    tagline.dataset.typed = '1';
    function step() {
      if (i > full.length) return;
      tagline.textContent = full.slice(0, i);
      i++;
      const delay = 16 + Math.random() * 34;
      setTimeout(step, delay);
    }
    step();
  })();

  // Shortcuts toast (toggle with '?') and show once on first visit
  (function shortcutsToast() {
    const toast = $('#toast');
    if (!toast) return;
    let hideTO = null;
    function show(ms = 4000) {
      toast.removeAttribute('hidden');
      toast.classList.add('show');
      clearTimeout(hideTO);
      hideTO = setTimeout(hide, ms);
    }
    function hide() { toast.classList.remove('show'); }
    window.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key === '?' || (key === '/' && e.shiftKey)) {
        e.preventDefault();
        if (toast.classList.contains('show')) hide(); else show(6000);
      }
    });
    try {
      const seen = localStorage.getItem('auteur_toast_shown');
      if (!seen) { show(6000); localStorage.setItem('auteur_toast_shown', '1'); }
    } catch {}
  })();

  // Clickable scroll progress: seek on click
  (function progressSeek() {
    if (!progressEl) return;
    function onClick(e) {
      const rect = progressEl.getBoundingClientRect();
      const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
      const ratio = rect.width ? x / rect.width : 0;
      const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
      window.scrollTo({ top: ratio * docHeight, behavior: 'smooth' });
    }
    progressEl.addEventListener('click', onClick);
  })();

  // Rail navigation: build dots and track active section
  (function railNav() {
    const rail = $('#rail-nav');
    if (!rail) return;
    const sections = $$('.section').filter((s) => s.id);
    rail.innerHTML = '';
    sections.forEach((sec) => {
      const dot = document.createElement('button');
      dot.className = 'rail-dot';
      const title = $('.section-title', sec)?.textContent?.trim() || sec.id;
      dot.setAttribute('aria-label', title);
      dot.dataset.target = sec.id;
      dot.addEventListener('click', () => document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      rail.appendChild(dot);
    });
    if (!('IntersectionObserver' in window)) return;
    const dots = $$('.rail-dot', rail);
    const map = new Map(sections.map((sec, i) => [sec.id, dots[i]]));
    function activate(id) {
      dots.forEach((d) => { d.classList.remove('active'); d.removeAttribute('aria-current'); });
      const el = map.get(id);
      if (el) { el.classList.add('active'); el.setAttribute('aria-current', 'true'); }
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) activate(e.target.id); });
    }, { threshold: 0.5 });
    sections.forEach((sec) => obs.observe(sec));
    if (sections[0]) activate(sections[0].id);
  })();

  // Random theme swatch
  (function randomSwatch() {
    const btn = $('#swatch-random');
    if (!btn) return;
    const themes = ['auteur', 'wes', 'villeneuve', 'pta', 'dontpanic'];
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      let pick = themes[Math.floor(Math.random() * themes.length)];
      let guard = 10;
      while (pick === current && guard--) pick = themes[Math.floor(Math.random() * themes.length)];
      applyTheme(pick);
    });
  })();

  // Image lightbox for film posters and album art
  (function lightbox() {
    const dlg = $('#lightbox');
    const imgEl = $('#lightbox-img');
    const caption = $('#lightbox-caption');
    if (!dlg || !imgEl) return;
    function open(src, alt) {
      imgEl.src = src; imgEl.alt = alt || '';
      if (caption) caption.textContent = alt || '';
      if ('showModal' in dlg) dlg.showModal(); else dlg.setAttribute('open', '');
    }
    function close() { dlg.close?.(); dlg.removeAttribute('open'); imgEl.src = ''; }
    document.addEventListener('click', (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.matches('.film-strip img, .album-grid img')) {
        e.preventDefault();
        open(t.getAttribute('src'), t.getAttribute('alt') || '');
      }
    });
    dlg.addEventListener('click', (e) => {
      const rect = dlg.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) close();
    });
  })();

  // Subtle tilt effect on hover for images (respects reduced motion)
  (function tilt() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const targets = [...$$('.film-strip img'), ...$$('.album-grid img')];
    targets.forEach((el) => {
      el.classList.add('tilt');
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width; // 0..1
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - y) * 8;
        const ry = (x - 0.5) * 8;
        el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  })();

  // Credits dialog (open via button or key 'C')
  (function credits() {
    const btn = $('#btn-credits');
    const dlg = $('#credits');
    if (!dlg) return;
    function open() { if ('showModal' in dlg) dlg.showModal(); else dlg.setAttribute('open', ''); }
    function close() { dlg.close?.(); dlg.removeAttribute('open'); }
    btn?.addEventListener('click', (e) => { e.preventDefault(); open(); });
    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        if (dlg.open) close(); else open();
      }
    });
    dlg.addEventListener('click', (e) => {
      const rect = dlg.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) close();
    });
  })();
})();
