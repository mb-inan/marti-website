#!/usr/bin/env python3
"""Full-page screenshots of every page, desktop and mobile, into docs/screenshots/<version>/.

Usage: python3 tools/screenshot.py v0.1
Starts a local static server on port 8765, screenshots, stops the server.
"""
import os, sys, subprocess, time
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VER = sys.argv[1] if len(sys.argv) > 1 else "dev"
OUT = os.path.join(ROOT, "docs", "screenshots", VER)
os.makedirs(OUT, exist_ok=True)
PAGES = ["index", "capabilities", "process", "factory", "compliance", "contact"]
PORT = 8765

srv = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "--bind", "127.0.0.1"], cwd=ROOT,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1.0)
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, vp in (("desktop", {"width": 1440, "height": 900}), ("mobile", {"width": 390, "height": 844})):
            ctx = b.new_context(viewport=vp, device_scale_factor=1)
            page = ctx.new_page()
            for pg in PAGES:
                page.goto(f"http://127.0.0.1:{PORT}/{pg}.html", wait_until="networkidle")
                # scroll through so lazy images load, then back to top
                page.evaluate("""async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); }""")
                page.wait_for_timeout(800)
                page.screenshot(path=os.path.join(OUT, f"{pg}-{name}.png"), full_page=True)
                if pg == "index":
                    page.screenshot(path=os.path.join(OUT, f"{pg}-{name}-fold.png"), full_page=False)
            ctx.close()
        b.close()
finally:
    srv.terminate()
print("screenshots in", OUT)
