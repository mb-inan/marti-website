/* MARTI — shared rail (navigation) and footer, mobile menu, placeholder review bar.
   The rail and the footer live here once, so a change to the menu or the addresses is one edit.
   REVIEW_MODE: true while the site is a template. Set to false before launch and the placeholder
   highlights and the review bar disappear (the <mark class="ph"> tags can stay). */

const REVIEW_MODE = true;

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

function currentPage() {
  const p = location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
}

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

function heroVideo() {
  const v = document.querySelector(".hero video");
  if (!v) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { v.removeAttribute("autoplay"); v.pause(); return; }
  v.play().catch(() => {});
}

function reviewBar() {
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

document.addEventListener("DOMContentLoaded", () => { mountChrome(); heroVideo(); reviewBar(); });
