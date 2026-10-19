"""Make centered product-detail previews from the existing ToniPR screenshots.

The interface is not redrawn or retouched. The dashboard crop shows the complete
welcome/format overview; dialog crops retain all of their controls. Unrelated
desktop capture badges and the public marketing demo are excluded. Originals stay.
"""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
sources = root / "public" / "tonipr" / "case-study"
destination = root / "public" / "tonipr" / "previews"
destination.mkdir(parents=True, exist_ok=True)

previews = [
    ("product-dashboard.png", "dashboard-overview.jpg", (540, 0, 2895, 1040)),
    ("interview-focus.png", "interview-direction.jpg", (530, 156, 2410, 1272)),
    ("camera-setup.png", "recording-preparation.jpg", (530, 0, 2410, 1428)),
    # Focus on the question and complete tone choices, not the capture badge/footer.
    ("interview-tone.png", "voice-selection.jpg", (770, 240, 2170, 1110)),
    # Detail crops remove unrelated page sections, not any content within these cards.
    ("how-it-works.png", "three-step-workflow.jpg", (120, 338, 1300, 889)),
    ("content-kit.png", "source-and-story.jpg", (120, 75, 1295, 700)),
]
for source, output, bounds in previews:
    image = Image.open(sources / source).convert("RGB").crop(bounds)
    image.thumbnail((1600, 1400), Image.Resampling.LANCZOS)
    image.save(destination / output, quality=93, optimize=True)
    print(f"{output}: {image.width}x{image.height}")
