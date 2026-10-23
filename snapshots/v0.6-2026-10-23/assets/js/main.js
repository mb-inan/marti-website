/* MARTI — shared rail (navigation) and footer, mobile menu, placeholder review bar,
   the stitched seam and the garment page transition (v0.5).
   The rail and the footer live here once, so a change to the menu or the addresses is one edit.
   REVIEW_MODE: true while the site is a template. Set to false before launch and the placeholder
   highlights and the review bar disappear (the <mark class="ph"> tags can stay).
   SEAM / TRANSITIONS: feature flags for the stitch work. Both respect prefers-reduced-motion. */

const REVIEW_MODE = true;
const SEAM = true;
const TRANSITIONS = true;
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
   Sewn length (0–1): two thirds at the top of the page, growing to three quarters as you scroll,
   fully sewn only at the very bottom. On load it is sewn in from zero. */
/* v0.6: the seam is drawn as thread. Two needle rows (straight stitches) and a looper thread that crosses
   diagonally between them and wraps each row — the underside of a chain / cording stitch. The thread is one
   continuous SVG path revealed along its own length (stroke-dashoffset), so it is sewn stitch by stitch and
   pulled out again stitch by stitch. At the live end a loose tail of thread hangs and swings (small verlet
   rope driven by the end point's movement). Holes sit in the cloth under the thread. */
const Seam = (() => {
  const NS = "http://www.w3.org/2000/svg";
  const W = 26, X1 = 8, X2 = 18, PITCH = 15, STITCH = 11.5;   /* px: seam width, the two rows, stitch pitch and length */
  const TAIL_N = 8, TAIL_SEG = 3.2;                              /* loose tail: 8 links of 3.2 px (about 24 px) */
  let el, svg, gLoop, tailPaths = [], holesG, clipL, clipR, pitches = 0;
  let H = 0, loopLen = 0, loopPath;
  let sewn = 0, target = 0, raf = 0, locked = false, label = null;
  let pts = [], prev = [], anchorPrev = null, simRaf = 0, calm = 0;

  function targetFromScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 1;
    if (p >= 0.985) return 1;
    return 0.66 + 0.09 * p;
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
    H = innerHeight;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("width", W); svg.setAttribute("height", H);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const defs = mk("defs", {});
    const rg = mk("radialGradient", { id: "seam-hole" }, defs);
    mk("stop", { offset: "0", "stop-color": "#241109", "stop-opacity": ".55" }, rg);
    mk("stop", { offset: ".55", "stop-color": "#241109", "stop-opacity": ".18" }, rg);
    mk("stop", { offset: "1", "stop-color": "#241109", "stop-opacity": "0" }, rg);
    /* cotton: a little turbulence roughens the thread's edge so it reads as fibre, not vector */
    const fr = { filterUnits: "userSpaceOnUse", x: -12, y: -12, width: W + 24, height: H + 24 };
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
      mk("ellipse", { cx: X1, cy: y + STITCH + 1.2, rx: 2.1, ry: 1.2, fill: "url(#seam-hole)" }, holesG);
      mk("ellipse", { cx: X2, cy: y + STITCH + 1.2, rx: 2.1, ry: 1.2, fill: "url(#seam-hole)" }, holesG);

      /* looper: across from the left row to the right row, wrap it, back under to the left row, wrap it */
      loop += (i ? "" : `M${X1},${y} `) +
        `C${X1 + 3},${y + 3} ${X2 - 3.5},${yb - 6} ${X2},${yb - 3.2} ` +
        `C${X2 + 3.4},${yb - 1.6} ${X2 + 2.2},${yb + 1.8} ${X2 - 1.4},${yb + 0.6} ` +
        `C${X2 - 4},${yb - 0.4} ${X1 + 3.6},${yb - 0.2} ${X1 + 1.4},${yb + 0.4} ` +
        `C${X1 - 2.4},${yb + 1.6} ${X1 - 2.6},${yb - 1.8} ${X1},${yb} `;
    }
    /* straight stitches: a dashed line per row (dash = stitch, gap = the hole), revealed stitch by stitch
       through a clip rectangle whose height is quantised to whole pitches */
    clipL = mk("rect", { x: 0, y: 0, width: W, height: 0 }, mk("clipPath", { id: "seam-clip-l" }, defs));
    clipR = mk("rect", { x: 0, y: 0, width: W, height: 0 }, mk("clipPath", { id: "seam-clip-r" }, defs));
    threadLayers(mk("g", { class: "rows", "clip-path": "url(#seam-clip-l)" }), `M${X1},0 L${X1},${n * PITCH}`);
    threadLayers(mk("g", { class: "rows", "clip-path": "url(#seam-clip-r)" }), `M${X2},0 L${X2},${n * PITCH}`);
    gLoop = threadLayers(mk("g", { class: "loop" }), loop);
    loopPath = gLoop.querySelector(".th-body");
    loopLen = loopPath.getTotalLength();
    gLoop.style.strokeDasharray = `${loopLen} ${loopLen}`;
    const gTail = mk("g", { class: "tail" });
    tailPaths = ["th-shadow", "th-body", "th-light"].map(c => mk("path", { class: c, d: "" }, gTail));
    /* tail starts hanging straight down from the thread end */
    pts = []; prev = [];
    const a = endPoint();
    for (let i = 0; i < TAIL_N; i++) { pts.push({ x: a.x - i * 1.1, y: a.y + i * TAIL_SEG * .92 }); prev.push({ x: a.x - i * 1.1, y: a.y + i * TAIL_SEG * .92 }); }
    anchorPrev = { x: a.x, y: a.y };
  }
  function endPoint() { return loopPath.getPointAtLength(Math.max(0, Math.min(loopLen, loopLen * sewn))); }

  /* ---- sewing progress ---- */
  function apply() {
    el.style.setProperty("--sewn", sewn.toFixed(4));
    gLoop.style.strokeDashoffset = loopLen * (1 - sewn);
    /* straight stitches appear as the looper wraps their row (right row half a pitch before the left), and vanish
       again when it is pulled back: clip heights in whole pitches */
    const k = sewn * pitches + 0.0005;
    clipR.setAttribute("height", Math.max(0, Math.floor(k + 0.5)) * PITCH);
    clipL.setAttribute("height", Math.max(0, Math.floor(k)) * PITCH);
    el.classList.toggle("is-closed", sewn >= 0.995);
    if (label) label.update(sewn);
    wake();
  }
  function loop() {
    const d = target - sewn;
    if (Math.abs(d) < 0.0008) { sewn = target; apply(); raf = 0; return; }
    sewn += d * 0.085;                       /* ease toward the target, like thread catching up */
    apply();
    raf = requestAnimationFrame(loop);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(loop); }

  /* ---- the loose tail: a short rope hanging from the live end of the thread ---- */
  function wake() { calm = 0; if (!simRaf) simRaf = requestAnimationFrame(sim); }
  function sim() {
    const a = endPoint();
    const ax = a.x - anchorPrev.x, ay = a.y - anchorPrev.y;    /* how far the needle moved this frame */
    anchorPrev = { x: a.x, y: a.y };
    pts[0].x = a.x; pts[0].y = a.y;
    let energy = Math.abs(ax) + Math.abs(ay);
    for (let i = 1; i < TAIL_N; i++) {
      const p = pts[i], q = prev[i];
      const pull = Math.max(-2.5, Math.min(2.5, ay));              /* the needle's motion tugs the tail, but only so much */
      let vx = (p.x - q.x) * 0.90 - ax * 0.25 - 0.06 * i / TAIL_N, vy = (p.y - q.y) * 0.90 - pull * 0.25;   /* damped; a light drape toward the rail */
      q.x = p.x; q.y = p.y;
      p.x += vx; p.y += vy + 0.22;                                /* gravity */
      energy += Math.abs(vx) + Math.abs(vy);
    }
    for (let k = 0; k < 5; k++) {                                 /* keep the links at their length */
      pts[0].x = a.x; pts[0].y = a.y;
      for (let i = 1; i < TAIL_N; i++) {
        const p = pts[i], o = pts[i - 1];
        let dx = p.x - o.x, dy = p.y - o.y, d = Math.hypot(dx, dy) || 1e-6, diff = (d - TAIL_SEG) / d;
        if (i === 1) { p.x -= dx * diff; p.y -= dy * diff; }
        else { p.x -= dx * diff * .5; p.y -= dy * diff * .5; o.x += dx * diff * .5; o.y += dy * diff * .5; }
      }
    }
    for (let i = 1; i < TAIL_N; i++) {                            /* final pass from the anchor out: the thread can never stretch */
      const p = pts[i], o = pts[i - 1];
      const dx = p.x - o.x, dy = p.y - o.y, d = Math.hypot(dx, dy) || 1e-6;
      if (d > TAIL_SEG) { p.x = o.x + dx / d * TAIL_SEG; p.y = o.y + dy / d * TAIL_SEG; }
    }
    /* draw it as a smooth curve */
    let d = `M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`;
    for (let i = 1; i < TAIL_N - 1; i++) {
      const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2;
      d += ` Q${pts[i].x.toFixed(2)},${pts[i].y.toFixed(2)} ${mx.toFixed(2)},${my.toFixed(2)}`;
    }
    tailPaths.forEach(p => p.setAttribute("d", d));
    calm = energy < 0.03 ? calm + 1 : 0;
    if (calm > 40 && !raf) { simRaf = 0; return; }               /* rope is still: stop simulating */
    simRaf = requestAnimationFrame(sim);
  }

  function mount() {
    if (!SEAM || document.querySelector(".seam")) return;
    el = document.createElement("div");
    el.className = "seam";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `<div class="seam-shadow"></div>`;
    svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "seam-svg");
    el.appendChild(svg);
    document.body.appendChild(el);
    build();
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
    kick();
  }
  /* rip open: quick, with a shake */
  function rip() {
    if (!el) return Promise.resolve();
    locked = true;
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
  function resewFromZero() { sewn = 0; apply(); locked = false; target = targetFromScroll(); kick(); }
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
