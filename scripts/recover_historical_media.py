import base64
import re
import subprocess
from pathlib import Path
from io import BytesIO

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
CHECKPOINT = "2e6bf57"
OUTPUT = ROOT / "recovered-media"
FILES = subprocess.check_output(
    ["git", "ls-tree", "-r", "--name-only", CHECKPOINT, "src"],
    cwd=ROOT,
    text=True,
    encoding="utf-8",
).splitlines()
PATTERN = re.compile(
    r"(?:(?:export\s+)?(?:const|let|var)\s+(?P<name>[A-Za-z0-9_]+)\s*=|export\s+default)\s*"
    r"['\"](?P<data>data:image/[^'\"]+;base64,[A-Za-z0-9+/=]+)['\"]",
    re.IGNORECASE,
)


def slug(value: str) -> str:
    return re.sub(r"(?<!^)(?=[A-Z])", "-", value).replace("_", "-").lower()


count = 0
for relative_path in FILES:
    if not relative_path.endswith((".ts", ".tsx")):
        continue
    try:
        source = subprocess.check_output(
            ["git", "show", f"{CHECKPOINT}:{relative_path}"],
            cwd=ROOT,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
    except subprocess.CalledProcessError:
        continue
    for match in PATTERN.finditer(source):
        header, encoded = match.group("name"), match.group("data")
        raw = base64.b64decode(encoded.split(",", 1)[1])
        image = Image.open(BytesIO(raw)).convert("RGBA")
        filename = slug(header or Path(relative_path).stem) + ".webp"
        destination = OUTPUT / filename
        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, "WEBP", quality=88, method=6)
        count += 1

print(f"RECOVERED_WEBP={count}")