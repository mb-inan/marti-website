#!/usr/bin/env python3
"""Record a short video of the seam and the page transition: python3 tools/record_demo.py [page.html] [out-name]"""
import os, sys, subprocess, time, glob, shutil
from playwright.sync_api import sync_playwright
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
START = sys.argv[1] if len(sys.argv) > 1 else "index.html"
NAME = sys.argv[2] if len(sys.argv) > 2 else "demo"
PHONE = "--phone" in sys.argv          # record at phone size (390x844, touch)
OUT = os.path.join(ROOT, "docs", "videos"); os.makedirs(OUT, exist_ok=True)
TMP = os.path.join(ROOT, "docs", "videos", "_tmp"); shutil.rmtree(TMP, ignore_errors=True); os.makedirs(TMP)
PORT = 8768
srv = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "--bind", "127.0.0.1"], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        VP = {"width": 390, "height": 844} if PHONE else {"width": 1440, "height": 900}
        ctx = b.new_context(viewport=VP, device_scale_factor=2 if PHONE else 1, is_mobile=PHONE, has_touch=PHONE, record_video_dir=TMP, record_video_size={"width": VP["width"] * (2 if PHONE else 1), "height": VP["height"] * (2 if PHONE else 1)})
        pg = ctx.new_page()
        pg.goto(f"http://127.0.0.1:{PORT}/{START}", wait_until="networkidle")
        pg.wait_for_timeout(2600)                                   # sew-in
        for y in range(0, 2400, 120): pg.mouse.wheel(0, 120); pg.wait_for_timeout(70)
        pg.wait_for_timeout(900)
        pg.evaluate("window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})")
        pg.wait_for_timeout(2200)                                   # fully sewn at the bottom
        for y in range(0, 1800, 150): pg.mouse.wheel(0, -150); pg.wait_for_timeout(60)   # back up: the thread is pulled out again
        pg.wait_for_timeout(1400)
        lab = pg.locator(".seam-label")
        if lab.count(): lab.first.click()
        else:
            if PHONE and not pg.locator("#site-nav.is-open").count(): pg.locator(".nav-toggle").click(); pg.wait_for_timeout(700)
            pg.locator("#site-nav a", has_text="Capabilities").first.click()
        pg.wait_for_timeout(3200)                                   # rip, drag, resew
        for y in range(0, 1200, 120): pg.mouse.wheel(0, 120); pg.wait_for_timeout(70)
        pg.wait_for_timeout(1200)
        if PHONE and not pg.locator("#site-nav.is-open").count(): pg.locator(".nav-toggle").click(); pg.wait_for_timeout(700)
        pg.locator("#site-nav a", has_text="Factory").first.click()
        pg.wait_for_timeout(3000)
        ctx.close(); b.close()
finally:
    srv.terminate()
webm = glob.glob(os.path.join(TMP, "*.webm"))[0]
mp4 = os.path.join(OUT, f"{NAME}.mp4")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", webm, "-c:v", "libx264", "-crf", "24", "-preset", "medium", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-r", "30", mp4], check=True)
shutil.rmtree(TMP, ignore_errors=True)
print(mp4, os.path.getsize(mp4) // 1024, "KB")
