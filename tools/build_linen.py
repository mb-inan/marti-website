#!/usr/bin/env python3
"""Generate the tileable linen texture used as the page ground: python3 tools/build_linen.py [strength 0-1]
Writes assets/img/linen.webp (seamless, 2x for high-density screens; shown at half size by CSS)."""
import os, sys, random
from PIL import Image, ImageFilter
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "img", "linen.webp")
STRENGTH = float(sys.argv[1]) if len(sys.argv) > 1 else 0.55
SIZE = 720                      # px in the file; CSS shows it at 360 css px
THREAD = 6                      # px per thread in the file (3 css px): a fairly coarse linen
GROUND = np.array([244, 240, 232], dtype=float)   # --ground #F4F0E8 (linen, brand package 27 Oct 2026)

rng = np.random.default_rng(7)
n = SIZE // THREAD

def threads(axis):
    """One brightness value per thread, with slubs (random thicker/darker spots) along its length."""
    base = rng.normal(0, 1, n)                                    # thread-to-thread variation
    img = np.repeat(base[:, None], SIZE, axis=1)                  # each thread constant along its length
    slub = rng.normal(0, 1, (n, SIZE // 24))                      # slow variation along the thread
    slub = np.repeat(slub, 24, axis=1)
    img = img * 0.6 + slub * 0.5
    img = np.repeat(img, THREAD, axis=0)                          # thread thickness
    # round-ish profile across each thread: darker at the gaps between threads
    prof = np.cos(np.linspace(-np.pi, np.pi, THREAD, endpoint=False)) * 0.5 + 0.5
    prof = np.tile(prof, n)[:, None]
    img = img * 0.6 + (prof - 0.5) * 1.6
    return img if axis == 0 else img.T

h, v = threads(0), threads(1)
# a plain weave: horizontal threads show on alternate cells, vertical on the others
cell_y = (np.arange(SIZE) // THREAD) % 2
cell_x = (np.arange(SIZE) // THREAD) % 2
mask = (cell_y[:, None] + cell_x[None, :]) % 2                     # 0/1 checkerboard of thread cells
weave = np.where(mask == 0, h, v)
grain = rng.normal(0, 0.35, (SIZE, SIZE))
tex = weave + grain
tex = (tex - tex.mean()) / tex.std()                              # normalise

# soften a touch so it reads as cloth, not pixels
img = Image.fromarray(np.clip(tex * 40 + 128, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))
tex = (np.asarray(img).astype(float) - 128) / 40

amp = 9.0 * STRENGTH                                              # brightness swing in 8-bit units
rgb = GROUND[None, None, :] + tex[:, :, None] * amp * np.array([1.0, 0.95, 0.85])[None, None, :]  # warmer in the shadows
out = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8), "RGB")
os.makedirs(os.path.dirname(OUT), exist_ok=True)
out.save(OUT, quality=86, method=6)
print(OUT, os.path.getsize(OUT) // 1024, "KB, strength", STRENGTH)
