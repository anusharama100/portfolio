"""Derive portfolio evidence from unmodified, full-page browser captures.

Capture sources: https://krokos.bio/ and https://krokos.bio/press, 2026-10-17.
The overview is a labeled contact sheet, not a reconstructed website screen.
Run with Pillow installed; the original full-page captures remain untouched.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

asset_dir = Path(__file__).resolve().parents[1] / "public" / "krokos"
home = Image.open(asset_dir / "redesign-landing-full.jpg").convert("RGB")
press = Image.open(asset_dir / "redesign-press-full.jpg").convert("RGB")

# Boundaries follow complete live sections at the captured 1280px desktop width.
sections = [
    ("Opening", "redesign-opening.jpg", 0, 910),
    ("The need", "redesign-story.jpg", 910, 1584),
    ("The approach", "redesign-approach.jpg", 2192, 2949),
    ("The product", "redesign-building.jpg", 4060, 4819),
    ("The people", "redesign-team.jpg", 7036, 7759),
    ("The next step", "redesign-contact.jpg", 7775, 8208),
]

overview = Image.new("RGB", (1600, 1000), "white")
draw = ImageDraw.Draw(overview)
heading = ImageFont.load_default(size=30)
label_font = ImageFont.load_default(size=23)
note_font = ImageFont.load_default(size=20)
draw.text((40, 30), "KROKOS BIO / LANDING PAGE FLOW", fill="#30351e", font=heading)
draw.text((40, 76), "Selected sections of the published website, in reading order", fill="#5c5f55", font=note_font)

for index, (label, filename, top, bottom) in enumerate(sections):
    section = home.crop((0, top, home.width, bottom))
    section.save(asset_dir / filename, quality=92, optimize=True)
    x = 40 + (index % 3) * 512
    y = 144 + (index // 3) * 400
    draw.text((x, y), f"0{index + 1} / {label}", fill="#30351e", font=label_font)
    preview = ImageOps.contain(section, (496, 314), Image.Resampling.LANCZOS)
    frame_y = y + 44
    draw.rectangle((x, frame_y, x + 495, frame_y + 313), outline="#d9dacf", width=1)
    overview.paste(preview, (x + (496 - preview.width) // 2, frame_y + (314 - preview.height) // 2))

draw.text((40, 964), "Full-page capture available in the case study.", fill="#5c5f55", font=note_font)
overview.save(asset_dir / "redesign-landing-flow.jpg", quality=94, optimize=True)
press.crop((0, 603, press.width, 1622)).save(asset_dir / "redesign-press-coverage.jpg", quality=93, optimize=True)
print("Prepared six section screenshots, the landing-page overview, and Press coverage.")
