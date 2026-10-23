#!/usr/bin/env python3
"""Screenshots of docs/mockups/<set>/*.html -> docs/screenshots/mockups-<set>/"""
import os, sys, subprocess, time, glob
from playwright.sync_api import sync_playwright
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SET = sys.argv[1] if len(sys.argv) > 1 else "v2"
OUT = os.path.join(ROOT, "docs", "screenshots", f"mockups-{SET}"); os.makedirs(OUT, exist_ok=True)
PORT = 8766
srv = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "--bind", "127.0.0.1"], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1.0)
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for f in sorted(glob.glob(os.path.join(ROOT, "docs", "mockups", SET, "*.html"))):
            name = os.path.splitext(os.path.basename(f))[0]
            for dev, vp in (("desktop", {"width": 1440, "height": 900}), ("mobile", {"width": 390, "height": 844})):
                ctx = b.new_context(viewport=vp); page = ctx.new_page()
                page.goto(f"http://127.0.0.1:{PORT}/docs/mockups/{SET}/{os.path.basename(f)}", wait_until="networkidle")
                page.evaluate("""async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); } window.scrollTo(0, 0); }""")
                page.wait_for_timeout(1500)
                page.screenshot(path=os.path.join(OUT, f"{name}-{dev}-fold.png"), full_page=False)
                page.screenshot(path=os.path.join(OUT, f"{name}-{dev}.png"), full_page=True)
                ctx.close()
        b.close()
finally:
    srv.terminate()
print("screenshots in", OUT)
