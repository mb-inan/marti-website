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
const Seam = (() => {
  let el, sewn = 0, target = 0, raf = 0, locked = false, label = null;

  function targetFromScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 1;
    if (p >= 0.985) return 1;
    return 0.66 + 0.09 * p;
  }
  function apply() {
    el.style.setProperty("--sewn", sewn.toFixed(4));
    if (label) label.update(sewn);
  }
  function loop() {
    const d = target - sewn;
    if (Math.abs(d) < 0.0015) { sewn = target; apply(); raf = 0; return; }
    sewn += d * 0.085;                       /* ease toward the target, like thread catching up */
    apply();
    raf = requestAnimationFrame(loop);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(loop); }

  function mount() {
    if (!SEAM || document.querySelector(".seam")) return;
    el = document.createElement("div");
    el.className = "seam";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `<div class="seam-holes"></div><div class="seam-shadow"></div><div class="seam-thread"></div><div class="seam-end"></div>`;
    document.body.appendChild(el);
    if (SEAM_LABEL && window.MARTI_makeSeamLabel) label = window.MARTI_makeSeamLabel(el);
    if (reduceMotion()) { sewn = 1; target = 1; apply(); return; }
    sewn = 0; apply();
    addEventListener("scroll", () => { if (!locked) { target = targetFromScroll(); kick(); } }, { passive: true });
    addEventListener("resize", () => { if (!locked) { target = targetFromScroll(); kick(); } });
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
