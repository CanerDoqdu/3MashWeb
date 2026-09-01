import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
mapping = json.loads((ROOT / "recovered-media-map.json").read_text(encoding="utf-8"))
urls = {
    item["fileName"]: f"https://cdn.myikas.com/images/{item['id']}/image_1080.webp"
    for item in mapping
}
pattern = re.compile(r"https://cdn\.myikas\.com/images/3mash/([^/\"']+\.webp)")
updated_files = []
replacements = 0

for path in list((ROOT / "src").rglob("*.ts")) + list((ROOT / "src").rglob("*.tsx")):
    text = path.read_text(encoding="utf-8")

    def replace(match: re.Match[str]) -> str:
        filename = match.group(1)
        replacement = urls.get(filename)
        if replacement is None:
            return match.group(0)
        nonlocal_replacements[0] += 1
        return replacement

    nonlocal_replacements = [0]
    new_text = pattern.sub(replace, text)
    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        updated_files.append(str(path.relative_to(ROOT)))
        replacements += nonlocal_replacements[0]

print(f"UPDATED_FILES={len(updated_files)}")
print(f"REPLACEMENTS={replacements}")