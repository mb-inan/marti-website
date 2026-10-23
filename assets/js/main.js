/* MARTI — shared rail (navigation) and footer, mobile menu, placeholder review bar,
   the stitched seam and the garment page transition (v0.5).
   The rail and the footer live here once, so a change to the menu or the addresses is one edit.
   REVIEW_MODE: true while the site is a template. Set to false before launch and the placeholder
   highlights and the review bar disappear (the <mark class="ph"> tags can stay).
   SEAM / TRANSITIONS: feature flags for the stitch work. Both respect prefers-reduced-motion. */

const REVIEW_MODE = true;
const SEAM = true;
const TRANSITIONS = true;
const SEAM_MOBILE = true;      /* v0.7: horizontal seam under the top bar on phones (set false to keep phones plain) */
const SEAM_LABEL = typeof window.MARTI_SEAM_LABEL !== "undefined" ? window.MARTI_SEAM_LABEL : false;

const SITE = {
  name: "MARTI",
  descriptor: "Womenswear manufacturing.",
  legal: "Martı Tekstil Ltd. Şti.",
  nav: [
    ["capabilities.html", "Capabilities"],
    ["process.html", "Process"],
    ["factory.html", "Factory"],
    ["compliance.html", "Compliance"],
    ["contact.html", "Contact"],
  ],
};

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function currentPage(path) {
  const p = (path || location.pathname).split("/").pop();
  return p === "" ? "index.html" : p;
}

/* ---------- chrome ---------- */
function rail() {
  const here = currentPage();
  const links = SITE.nav
    .map(([href, label]) => `<a href="${href}"${here === href ? ' aria-current="page"' : ""}>${label}</a>`)
    .join("");
  return `
  <a class="skip" href="#main">Skip to content</a>
  <aside class="rail" id="site-rail">
    <a class="brand" href="index.html" aria-label="${SITE.name} home">
      <span class="wordmark">${SITE.name}</span>
      <span class="descriptor">${SITE.descriptor}</span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav class="nav" id="site-nav" aria-label="Main">${links}</nav>
    <a class="rail-cta" href="contact.html">Start a conversation</a>
    <div class="rail-foot">Commercial office in Manchester<br>Production in İzmir, Türkiye</div>
  </aside>`;
}

function footer() {
  const y = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div>
        <a class="brand" href="index.html"><span class="wordmark">${SITE.name}</span><span class="descriptor">${SITE.descriptor}</span></a>
        <p class="mt-2 small" style="max-width:38ch;opacity:.8">Thirty years of woven womenswear, made in İzmir, Türkiye, for brands across the United Kingdom and Europe.</p>
      </div>
      <div>
        <h4>Commercial office</h4>
        <address><mark class="ph" data-ph="T-ukco">[UK Ltd name]</mark><br><mark class="ph" data-ph="T-addr-uk">[Street, number]</mark><br>Manchester, United Kingdom<br><a href="mailto:hello@example.com"><mark class="ph" data-ph="T-mail-uk">hello@[domain]</mark></a></address>
      </div>
      <div>
        <h4>Production</h4>
        <address>${SITE.legal}<br><mark class="ph" data-ph="T-addr-tr">[Street, number]</mark><br>Bergama, İzmir, Türkiye<br><a href="mailto:production@example.com"><mark class="ph" data-ph="T-mail-tr">production@[domain]</mark></a></address>
      </div>
      <div>
        <h4>Pages</h4>
        <ul>${SITE.nav.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
      </div>
      <div class="legal">
        <span>© ${y} ${SITE.legal}. MARTI is a trading name of <mark class="ph" data-ph="T-tradingname">[legal entity to confirm]</mark>.</span>
        <span><a href="#">Privacy</a> &nbsp; <a href="#">Code of conduct</a></span>
      </div>
    </div>
  </footer>`;
}

function mountChrome() {
  document.body.insertAdjacentHTML("afterbegin", rail());
  document.body.insertAdjacentHTML("beforeend", footer());
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  });
}

function closeMenu() {
  const toggle = document.querySelector(".nav-toggle"), nav = document.getElementById("site-nav");
  if (!toggle || !nav || !nav.classList.contains("is-open")) return;
  nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "Menu";
}

function setCurrentNav() {
  const here = currentPage();
  document.querySelectorAll("#site-nav a").forEach(a => {
    if (currentPage(new URL(a.href, location.href).pathname) === here) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

/* ---------- per-page ---------- */
function heroVideo() {
  const v = document.querySelector(".hero video");
  if (!v) return;
  if (reduceMotion()) { v.removeAttribute("autoplay"); v.pause(); return; }
  v.play().catch(() => {});
}

function reviewBar() {
  document.querySelector(".review-bar")?.remove();
  const marks = document.querySelectorAll("mark.ph");
  const figs = document.querySelectorAll("img[src*='/img/ph/'], video[data-ph]");
  if (!REVIEW_MODE) { marks.forEach(m => m.classList.remove("ph")); return; }
  const bar = document.createElement("div");
  bar.className = "review-bar";
  bar.setAttribute("role", "status");
  bar.innerHTML = `<span class="dot" aria-hidden="true"></span><span>Template review: ${marks.length} text placeholders, ${figs.length} image slots on this page</span><button type="button">Hide marks</button>`;
  const btn = bar.querySelector("button");
  const saved = (() => { try { return localStorage.getItem("marti-ph-hidden") === "1"; } catch (e) { return false; } })();
  const apply = (hidden) => {
    document.body.classList.toggle("ph-hidden", hidden);
    btn.textContent = hidden ? "Show marks" : "Hide marks";
    try { localStorage.setItem("marti-ph-hidden", hidden ? "1" : "0"); } catch (e) {}
  };
  apply(saved);
  btn.addEventListener("click", () => apply(!document.body.classList.contains("ph-hidden")));
  document.body.appendChild(bar);
}

function initPage() { heroVideo(); reviewBar(); setCurrentNav(); }

/* ---------- the seam ----------
   Sewn length (0–1): two fifths at the top of the page, growing in proportion to the scroll,
   fully sewn at the bottom. On load it is sewn in slowly from zero. */
/* v0.6: the seam is drawn as thread. Two needle rows (straight stitches) and a looper thread that crosses
   diagonally between them and wraps each row — the underside of a chain / cording stitch. The thread is one
   continuous SVG path revealed along its own length (stroke-dashoffset), so it is sewn stitch by stitch and
   pulled out again stitch by stitch. While the seam moves, a short taut lead runs from the last stitch
   toward the unseen needle; at rest the thread simply ends at the last stitch. Holes sit in the cloth under the thread. */
const Seam = (() => {
  const NS = "http://www.w3.org/2000/svg";
  const W = 26, X1 = 8, X2 = 18, PITCH = 15, STITCH = 11.5;   /* px: seam width, the two rows, stitch pitch and length */
  let el, svg, gLoop, tailPaths = [], holesG, clipL, clipR, pitches = 0;
  let H = 0, loopLen = 0, loopPath;
  let horiz = false;                                             /* phones: the seam runs left→right under the top bar */
  const mobileMQ = window.matchMedia("(max-width: 1000px)");
  /* (u, v): u runs along the seam, v across it. Vertical: x = v, y = u. Horizontal: x = u, y = v. */
  const P = (u, v) => horiz ? `${u},${v}` : `${v},${u}`;
  let sewn = 0, target = 0, raf = 0, locked = false, label = null;
  let anchorPrev = null, simRaf = 0, calm = 0;

  /* Sewn length follows the scroll in proportion: two fifths at the top of the page, growing linearly to
     fully sewn at the bottom. */
  const SEWN_AT_TOP = 0.4;
  function targetFromScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 1;
    return SEWN_AT_TOP + (1 - SEWN_AT_TOP) * p;
  }

  /* ---- geometry ---- */
  function mk(tag, attrs, parent) { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); (parent || svg).appendChild(n); return n; }
  function threadLayers(parent, d) {
    /* one thread = shadow on the cloth, a roughened halo (matte cotton), the body, a dull lit edge;
       all on the same path, so the same dash progress reveals every layer */
    mk("path", { d, class: "th-shadow" }, parent);
    mk("path", { d, class: "th-fuzz" }, parent);
    mk("path", { d, class: "th-body" }, parent);
    mk("path", { d, class: "th-light" }, parent);
    return parent;
  }
  function build() {
    horiz = mobileMQ.matches;
    el.classList.toggle("is-horizontal", horiz);
    el.classList.toggle("is-plain", horiz);                     /* phones: no cotton filter, same geometry */
    if (horiz) {
      const bar = document.querySelector(".rail");
      const barH = bar ? Math.round(bar.getBoundingClientRect().height) : 64;
      el.style.top = `${barH - 13}px`;
    } else el.style.top = "";
    H = horiz ? innerWidth : innerHeight;                        /* length of the seam */
    svg.setAttribute("viewBox", horiz ? `0 0 ${H} ${W}` : `0 0 ${W} ${H}`);
    svg.setAttribute("width", horiz ? H : W); svg.setAttribute("height", horiz ? W : H);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const defs = mk("defs", {});
    const rg = mk("radialGradient", { id: "seam-hole" }, defs);
    mk("stop", { offset: "0", "stop-color": "#241109", "stop-opacity": ".55" }, rg);
    mk("stop", { offset: ".55", "stop-color": "#241109", "stop-opacity": ".18" }, rg);
    mk("stop", { offset: "1", "stop-color": "#241109", "stop-opacity": "0" }, rg);
    /* cotton: a little turbulence roughens the thread's edge so it reads as fibre, not vector */
    const fr = horiz ? { filterUnits: "userSpaceOnUse", x: -12, y: -12, width: H + 24, height: W + 24 }
                     : { filterUnits: "userSpaceOnUse", x: -12, y: -12, width: W + 24, height: H + 24 };
    const f1 = mk("filter", Object.assign({ id: "seam-fuzz" }, fr), defs);
    mk("feTurbulence", { type: "fractalNoise", baseFrequency: ".9", numOctaves: "2", seed: "3" }, f1);
    mk("feDisplacementMap", { in: "SourceGraphic", scale: "1.6" }, f1);
    mk("feGaussianBlur", { stdDeviation: ".35" }, f1);
    const f2 = mk("filter", Object.assign({ id: "seam-fuzz-soft" }, fr), defs);
    mk("feTurbulence", { type: "fractalNoise", baseFrequency: ".9", numOctaves: "2", seed: "3" }, f2);
    mk("feDisplacementMap", { in: "SourceGraphic", scale: ".7" }, f2);
    const n = Math.ceil(H / PITCH) + 2;
    pitches = n;
    let loop = "";
    holesG = mk("g", { class: "holes" });
    for (let i = 0; i < n; i++) {
      const y = i * PITCH, yb = y + PITCH;
      /* holes at the end of each straight stitch, both rows */
      const hu = y + STITCH + 1.2, ra = horiz ? 1.2 : 2.1, rb = horiz ? 2.1 : 1.2;
      mk("ellipse", { cx: horiz ? hu : X1, cy: horiz ? X1 : hu, rx: ra, ry: rb, fill: "url(#seam-hole)" }, holesG);
      mk("ellipse", { cx: horiz ? hu : X2, cy: horiz ? X2 : hu, rx: ra, ry: rb, fill: "url(#seam-hole)" }, holesG);

      /* looper: across from the first row to the second, wrap it, back under to the first row, wrap it */
      loop += (i ? "" : `M${P(y, X1)} `) +
        `C${P(y + 3, X1 + 3)} ${P(yb - 6, X2 - 3.5)} ${P(yb - 3.2, X2)} ` +
        `C${P(yb - 1.6, X2 + 3.4)} ${P(yb + 1.8, X2 + 2.2)} ${P(yb + 0.6, X2 - 1.4)} ` +
        `C${P(yb - 0.4, X2 - 4)} ${P(yb - 0.2, X1 + 3.6)} ${P(yb + 0.4, X1 + 1.4)} ` +
        `C${P(yb + 1.6, X1 - 2.4)} ${P(yb - 1.8, X1 - 2.6)} ${P(yb, X1)} `;
    }
    /* straight stitches: a dashed line per row (dash = stitch, gap = the hole), revealed stitch by stitch
       through a clip rectangle whose height is quantised to whole pitches */
    const clipBox = horiz ? { x: 0, y: 0, width: 0, height: W } : { x: 0, y: 0, width: W, height: 0 };
    clipL = mk("rect", clipBox, mk("clipPath", { id: "seam-clip-l" }, defs));
    clipR = mk("rect", clipBox, mk("clipPath", { id: "seam-clip-r" }, defs));
    threadLayers(mk("g", { class: "rows", "clip-path": "url(#seam-clip-l)" }), `M${P(0, X1)} L${P(n * PITCH, X1)}`);
    threadLayers(mk("g", { class: "rows", "clip-path": "url(#seam-clip-r)" }), `M${P(0, X2)} L${P(n * PITCH, X2)}`);
    gLoop = threadLayers(mk("g", { class: "loop" }), loop);
    loopPath = gLoop.querySelector(".th-body");
    loopLen = loopPath.getTotalLength();
    gLoop.style.strokeDasharray = `${loopLen} ${loopLen}`;
    const gTail = mk("g", { class: "tail" });                 /* 'tail' = the lead to the needle */
    tailPaths = ["th-shadow", "th-body", "th-light"].map(c => mk("path", { class: c, d: "" }, gTail));
    const a = endPoint(); anchorPrev = { x: a.x, y: a.y }; vel = 0; leadLen = 0; leadOp = 0; resetRope(a);
  }
  function endPoint() { return loopPath.getPointAtLength(Math.max(0, Math.min(loopLen, loopLen * sewn))); }

  /* ---- sewing progress ---- */
  function apply() {
    el.style.setProperty("--sewn", sewn.toFixed(4));
    gLoop.style.strokeDashoffset = loopLen * (1 - sewn);
    /* straight stitches appear as the looper wraps their row (right row half a pitch before the left), and vanish
       again when it is pulled back: clip heights in whole pitches */
    const k = sewn * pitches + 0.0005, dim = horiz ? "width" : "height";
    clipR.setAttribute(dim, Math.max(0, Math.floor(k + 0.5)) * PITCH);
    clipL.setAttribute(dim, Math.max(0, Math.floor(k)) * PITCH);
    el.classList.toggle("is-closed", sewn >= 0.995);
    if (label) label.update(sewn);
    wake();
  }
  /* On a page open (and after a page change) the thread is sewn in slowly over INTRO_MS with an ease-out,
     so the seam comes down to its two-fifths point rather than snapping there; after that it follows the scroll. */
  const INTRO_MS = 1900;
  let introT0 = 0, introFrom = 0;
  function loop(now) {
    if (introT0) {
      const k = Math.min(1, (now - introT0) / INTRO_MS), e = 1 - Math.pow(1 - k, 3);
      sewn = introFrom + (target - introFrom) * e;
      apply();
      if (k >= 1) introT0 = 0; else { raf = requestAnimationFrame(loop); return; }
    }
    const d = target - sewn;
    if (Math.abs(d) < 0.0008) { sewn = target; apply(); raf = 0; return; }
    sewn += d * 0.085;                       /* ease toward the target, like thread catching up */
    apply();
    raf = requestAnimationFrame(loop);
  }
  function startIntro() { introT0 = performance.now(); introFrom = sewn; }
  function kick() { if (!raf) raf = requestAnimationFrame(loop); }

  /* ---- the live end ----
     Desktop (vertical seam): a short length of thread hangs from the last stitch and sways very gently when the
     page is still (a small verlet rope: gravity, a slow breath of air, strong damping, links that can never
     stretch). Scrolling pulls it along, so the stitching continues out of the swaying thread and, when unpicked,
     back into it. Hidden once the seam is fully closed.
     Phone (horizontal seam): no hanging thread; while the seam moves a short taut lead runs from the last stitch
     toward the unseen needle, forward when sewing and back when unpicking; at rest the thread ends at the stitch. */
  const ROPE_N = 6, ROPE_SEG = 2.6;                              /* about 15 px of loose thread */
  let pts = [], prev = [], vel = 0, leadLen = 0, leadOp = 0, t0 = performance.now();
  function wake() { calm = 0; if (!simRaf) simRaf = requestAnimationFrame(sim); }
  function resetRope(a) {
    pts = []; prev = [];
    for (let i = 0; i < ROPE_N; i++) { const q = { x: a.x - i * 0.6, y: a.y + i * ROPE_SEG * .97 }; pts.push({ ...q }); prev.push({ ...q }); }
  }
  function sim(now) {
    const a = endPoint();
    const ax = a.x - anchorPrev.x, ay = a.y - anchorPrev.y;    /* how far the needle moved this frame */
    anchorPrev = { x: a.x, y: a.y };
    if (horiz) {                                                 /* ---- phone: the taut lead ---- */
      vel = vel * 0.78 + ax * 0.22;
      const speed = Math.abs(vel);
      const wantLen = Math.min(16, speed * 5), wantOp = Math.min(1, speed * 0.9);
      leadLen += (wantLen - leadLen) * 0.25; leadOp += (wantOp - leadOp) * 0.2;
      const dir = Math.sign(vel) || 1, mid = (X1 + X2) / 2;
      const d = `M${a.x.toFixed(2)},${a.y.toFixed(2)} Q${(a.x + dir * leadLen * .55).toFixed(2)},${(a.y + (mid - a.y) * .35).toFixed(2)} ${(a.x + dir * leadLen).toFixed(2)},${(a.y + (mid - a.y) * .6).toFixed(2)}`;
      tailPaths.forEach(p => { p.setAttribute("d", d); p.style.opacity = leadOp.toFixed(3); });
      calm = speed < 0.02 && leadOp < 0.02 ? calm + 1 : 0;
      if (calm > 20 && !raf) { simRaf = 0; return; }
      simRaf = requestAnimationFrame(sim); return;
    }
    /* ---- desktop: the swaying thread ---- */
    if (sewn >= 0.995) { simRaf = requestAnimationFrame(sim); return; }   /* closed: hidden by CSS, nothing to do */
    const t = (now - t0) / 1000;
    const breath = 0.022 * Math.sin(t * 1.35) + 0.008 * Math.sin(t * 3.1 + 1.2);   /* a slow movement of air */
    const pull = Math.max(-2.5, Math.min(2.5, ay));
    pts[0].x = a.x; pts[0].y = a.y;
    for (let i = 1; i < ROPE_N; i++) {
      const p = pts[i], q = prev[i], w = i / ROPE_N;
      const vx = (p.x - q.x) * 0.93 - ax * 0.25 + breath * w - 0.03 * w,   /* damped; air; a light drape toward the rail */
            vy = (p.y - q.y) * 0.93 - pull * 0.25;
      q.x = p.x; q.y = p.y;
      p.x += vx; p.y += vy + 0.18;                               /* gravity */
    }
    for (let k = 0; k < 4; k++) {                                 /* links keep their length */
      pts[0].x = a.x; pts[0].y = a.y;
      for (let i = 1; i < ROPE_N; i++) {
        const p = pts[i], o = pts[i - 1];
        const dx = p.x - o.x, dy = p.y - o.y, d = Math.hypot(dx, dy) || 1e-6, diff = (d - ROPE_SEG) / d;
        if (i === 1) { p.x -= dx * diff; p.y -= dy * diff; }
        else { p.x -= dx * diff * .5; p.y -= dy * diff * .5; o.x += dx * diff * .5; o.y += dy * diff * .5; }
      }
    }
    for (let i = 1; i < ROPE_N; i++) {                            /* final pass from the anchor out: it can never stretch */
      const p = pts[i], o = pts[i - 1];
      const dx = p.x - o.x, dy = p.y - o.y, d = Math.hypot(dx, dy) || 1e-6;
      if (d > ROPE_SEG) { p.x = o.x + dx / d * ROPE_SEG; p.y = o.y + dy / d * ROPE_SEG; }
    }
    let d = `M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`;
    for (let i = 1; i < ROPE_N - 1; i++) {
      const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2;
      d += ` Q${pts[i].x.toFixed(2)},${pts[i].y.toFixed(2)} ${mx.toFixed(2)},${my.toFixed(2)}`;
    }
    tailPaths.forEach(p => { p.setAttribute("d", d); p.style.opacity = ""; });
    simRaf = requestAnimationFrame(sim);                          /* keeps swaying while the page is open; paused by the browser in background tabs */
  }

  function mount() {
    if (!SEAM || document.querySelector(".seam")) return;
    if (!SEAM_MOBILE && mobileMQ.matches) return;
    el = document.createElement("div");
    el.className = "seam";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `<div class="seam-shadow"></div>`;
    svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "seam-svg");
    el.appendChild(svg);
    document.body.appendChild(el);
    build();
    if (window.ResizeObserver) {                               /* the top bar grows when the menu opens: follow it */
      const bar = document.querySelector(".rail");
      if (bar) new ResizeObserver(() => { if (horiz) { const h = Math.round(bar.getBoundingClientRect().height); el.style.top = `${h - 13}px`; } }).observe(bar);
    }
    mobileMQ.addEventListener?.("change", () => { build(); apply(); kick(); });
    if (SEAM_LABEL && window.MARTI_makeSeamLabel) label = window.MARTI_makeSeamLabel(el);
    if (reduceMotion()) { sewn = 1; target = 1; apply(); el.classList.add("is-static"); return; }
    sewn = 0; apply();
    addEventListener("scroll", () => { if (!locked) { target = targetFromScroll(); kick(); } }, { passive: true });
    let rz = 0;
    addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { build(); if (!locked) target = targetFromScroll(); apply(); kick(); }, 120); });
    sew();
  }
  /* sew in from zero to the scroll target */
  function sew() {
    if (!el) return;
    locked = false;
    target = targetFromScroll();
    startIntro();
    kick();
  }
  /* rip open: quick, with a shake */
  function rip() {
    if (!el) return Promise.resolve();
    locked = true; introT0 = 0;
    cancelAnimationFrame(raf); raf = 0;
    el.classList.add("is-ripping");
    const start = sewn, t0 = performance.now(), dur = 340;
    return new Promise(res => {
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        sewn = start * (1 - k * k);
        apply();
        if (k < 1) requestAnimationFrame(step); else { el.classList.remove("is-ripping"); res(); }
      };
      requestAnimationFrame(step);
    });
  }
  function resewFromZero() { sewn = 0; apply(); locked = false; target = targetFromScroll(); startIntro(); kick(); }
  return { mount, sew, rip, resewFromZero, get value() { return sewn; } };
})();

/* ---------- page transition ----------
   Click on an internal page link: rip the seam, lift the current page as a ghost, swap the new page in
   underneath, drag the ghost off to the right like a cloth, sew the seam back in. Falls back to a normal
   navigation on any problem, and is off when the visitor prefers reduced motion. */
const Transition = (() => {
  let busy = false;

  function eligible(a, e) {
    if (!TRANSITIONS || reduceMotion() || busy) return false;
    if (a.target || a.hasAttribute("download") || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return false;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return false;
    if (!/\.html$/.test(url.pathname) && !url.pathname.endsWith("/")) return false;
    if (url.pathname === location.pathname) return false;     /* same page (anchors): normal behaviour */
    return url;
  }

  async function go(href, push) {
    busy = true;
    document.body.classList.add("is-transitioning");
    try {
      const res = await fetch(href, { headers: { "X-Requested-With": "marti" } });
      if (!res.ok) throw new Error(res.status);
      const doc = new DOMParser().parseFromString(await res.text(), "text/html");
      const newMain = doc.querySelector("main");
      if (!newMain) throw new Error("no main");

      /* ghost of the current page, pinned at the current scroll position */
      const main = document.querySelector("main");
      const foot = document.querySelector(".site-footer");
      const ghost = document.createElement("div");
      ghost.className = "page-ghost";
      if (window.matchMedia("(max-width: 1000px)").matches) {
        const bar = document.querySelector(".rail");
        if (bar) ghost.style.top = `${Math.round(bar.getBoundingClientRect().height)}px`;
      }
      const inner = document.createElement("div");
      inner.style.transform = `translateY(${-scrollY}px)`;
      const mClone = main.cloneNode(true); mClone.style.marginLeft = "0";
      const fClone = foot.cloneNode(true); fClone.style.marginLeft = "0";
      /* a cloned <video> would start loading and playing again; show its poster instead */
      mClone.querySelectorAll("video").forEach(v => {
        const img = document.createElement("img"); img.src = v.poster || ""; img.alt = ""; img.className = v.className;
        img.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover"; v.replaceWith(img);
      });
      inner.appendChild(mClone); inner.appendChild(fClone);
      ghost.appendChild(inner);
      document.body.appendChild(ghost);

      await Seam.rip();

      /* swap the page in underneath */
      main.replaceWith(newMain);
      document.title = doc.title;
      if (push) history.pushState({ marti: true }, "", href);
      scrollTo(0, 0);
      initPage();
      closeMenu();                                               /* phones: the menu was open to get here */

      /* drag the old page away */
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      ghost.classList.add("is-dragging");
      await new Promise(r => { ghost.addEventListener("transitionend", r, { once: true }); setTimeout(r, 900); });
      ghost.remove();

      Seam.resewFromZero();
    } catch (err) {
      location.href = href;                 /* anything odd: just load the page normally */
      return;
    } finally {
      busy = false;
      document.body.classList.remove("is-transitioning");
    }
  }

  function mount() {
    if (!TRANSITIONS) return;
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;
      const url = eligible(a, e);
      if (!url) return;
      e.preventDefault();
      go(url.href, true);
    });
    addEventListener("popstate", () => { go(location.href, false); });
  }
  return { mount, go };
})();

document.addEventListener("DOMContentLoaded", () => {
  mountChrome();
  initPage();
  Seam.mount();
  Transition.mount();
});
window.MARTI = { Seam, Transition, initPage };
