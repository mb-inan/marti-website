#!/usr/bin/env python3
"""Render placeholder images and the photo brief from tools/slots.json.

Usage (from the repo root):  python3 tools/build_placeholders.py

- assets/img/ph/<ID>.jpg      one placeholder per slot, at the slot's aspect ratio
- docs/PHOTO_BRIEF.md         the shooting list, one row per slot

Slots with a reference photo show that photo dimmed, with a band that says it is a
reference and what must change before it can be published. Slots with a reference
video use a frame from the clip. Slots with no reference are a plain panel with the
slot ID, the title and the shooting note.
"""
import json, os, subprocess, textwrap
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageEnhance

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "assets")
OUT = os.path.join(ASSETS, "img", "ph")
os.makedirs(OUT, exist_ok=True)

NAVY = (74, 46, 36)
GROUND = (236, 228, 218)
SALMON = (249, 226, 214)
WHITE = (255, 255, 255)

W = 1600
ASPECTS = {"16:9": 9/16, "3:2": 2/3, "4:5": 5/4, "1:1": 1.0}


def font(size, bold=False):
    cands = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for c in cands:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def frame_from_video(path):
    tmp = "/tmp/_ph_frame.jpg"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "2", "-i", path, "-frames:v", "1", tmp], check=True)
    return Image.open(tmp).convert("RGB")


def fit(im, w, h):
    return ImageOps.fit(im, (w, h), method=Image.LANCZOS, centering=(0.5, 0.45))


def draw_wrapped(d, text, xy, f, fill, width_chars, spacing=6):
    x, y = xy
    for line in textwrap.wrap(text, width_chars):
        d.text((x, y), line, font=f, fill=fill)
        y += f.size + spacing
    return y


def render(slot):
    h = int(W * ASPECTS[slot["aspect"]])
    ref = slot.get("ref")
    if ref:
        p = os.path.join(ASSETS, ref)
        base = frame_from_video(p) if ref.endswith(".mp4") else ImageOps.exif_transpose(Image.open(p)).convert("RGB")
        im = fit(base, W, h)
        im = ImageEnhance.Color(im).enhance(0.55)
        im = ImageEnhance.Brightness(im).enhance(0.72)
        d = ImageDraw.Draw(im, "RGBA")
        band_h = 150 if h >= 900 else 130
        d.rectangle([0, h - band_h, W, h], fill=(74, 46, 36, 235))
        d.text((40, h - band_h + 22), f"{slot['id']}  Reference photo. Not for publication.", font=font(30, True), fill=WHITE)
        note = slot.get("reshoot") or "Reshoot in the same spirit."
        draw_wrapped(d, "Reshoot: " + note, (40, h - band_h + 66), font(24), (240, 232, 224), 95, 4)
        # small id tag top-left
        d.rectangle([40, 40, 40 + 110, 40 + 54], fill=SALMON)
        d.text((56, 48), slot["id"], font=font(32, True), fill=NAVY)
    else:
        im = Image.new("RGB", (W, h), GROUND)
        d = ImageDraw.Draw(im)
        # fine grid to read as a plan, not a photo
        for x in range(0, W, 80):
            d.line([x, 0, x, h], fill=(226, 216, 204), width=1)
        for y in range(0, h, 80):
            d.line([0, y, W, y], fill=(226, 216, 204), width=1)
        d.rectangle([40, 40, 40 + 110, 40 + 54], fill=SALMON)
        d.text((56, 48), slot["id"], font=font(32, True), fill=NAVY)
        y = 130 if h > 1000 else 120
        y = draw_wrapped(d, slot["title"], (40, y), font(44, True), NAVY, 50, 8)
        y += 14
        y = draw_wrapped(d, slot["shoot"], (40, y), font(28), (110, 90, 78), 78, 6)
        d.text((40, h - 70), f"Placeholder, {slot['aspect']}. Photo to be taken.", font=font(24), fill=(140, 124, 112))
    im.save(os.path.join(OUT, f"{slot['id']}.jpg"), quality=80, optimize=True)


def brief(slots):
    lines = ["# Photo brief — placeholder slots", "",
             "Generated from `tools/slots.json` by `tools/build_placeholders.py`. One row per placeholder on the site. "
             "Reference = a photo or clip taken at the factory on 23 October 2026, used only to show the idea. "
             "Every reference carries a note on what must change before it can be published.", "",
             "| ID | Where | Frame | How to shoot | Reference | Before publishing |", "|---|---|---|---|---|---|"]
    for s in slots:
        ref = s.get("ref") or ""
        ref = f"`{os.path.basename(ref)}`" if ref else "none"
        lines.append(f"| {s['id']} | {s['section']} | {s['title']} ({s['aspect']}) | {s['shoot']} | {ref} | {s.get('reshoot') or '—'} |")
    lines += ["", "## Rules that apply to every frame", "",
              "- No customer branding anywhere: hangers, swing tags, cartons, labels.",
              "- No third-party logos (hauliers, machine brands are fine where incidental).",
              "- Nobody smiles at the camera. People work; the camera watches.",
              "- Same light, same angle for every product frame; square crops planned in camera.",
              "- Landscape first; vertical versions for hero and people frames.",
              "- Deliver 2560 px web versions plus full resolution."]
    with open(os.path.join(ROOT, "docs", "PHOTO_BRIEF.md"), "w") as f:
        f.write("\n".join(lines) + "\n")


if __name__ == "__main__":
    data = json.load(open(os.path.join(ROOT, "tools", "slots.json")))
    for s in data["slots"]:
        render(s)
    brief(data["slots"])
    print(f"rendered {len(data['slots'])} placeholders")
