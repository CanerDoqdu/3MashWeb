import os
import sys
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = r"c:\Users\caner\3MashWeb"
SRC_DIR = os.path.join(ROOT_DIR, "src")
ALL_TR_PATH = os.path.join(SRC_DIR, "utils", "all_translations.json")

print(">>> Starting automated code rewrite for tLocalized across all components...")

with open(ALL_TR_PATH, "r", encoding="utf-8") as f:
    translations = json.load(f)

# Common Turkish words to detect Turkish strings
TR_CHAR_PATTERN = re.compile(r'[şğıİöüçŞĞÖÜÇ]')

def get_english(tr_text):
    clean = tr_text.strip()
    if clean in translations:
        return translations[clean]
    # Check case variations
    for k, v in translations.items():
        if k.strip().lower() == clean.lower():
            return v
    return None

def process_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    original = content
    rel_path = os.path.relpath(file_path, ROOT_DIR).replace("\\", "/")
    
    # Skip non-component utility files
    if rel_path in ["src/utils/i18n.ts", "src/utils/all_translations.json"]:
        return 0

    # Determine relative import path to i18n
    file_dir = os.path.dirname(file_path)
    rel_to_utils = os.path.relpath(os.path.join(SRC_DIR, "utils", "i18n"), file_dir).replace("\\", "/")
    if not rel_to_utils.startswith("."):
        rel_to_utils = "./" + rel_to_utils

    replacements = 0

    # 1. Replace double-quoted Turkish strings passed as fallbacks or props: "Türkçe Metin" -> tLocalized("Türkçe Metin", "English Text")
    # Only if NOT already inside tLocalized( or t(
    def replace_dq_string(match):
        nonlocal replacements
        full = match.group(0)
        prefix = match.group(1) # char before quote
        str_val = match.group(2)
        
        # Avoid already wrapped
        if "tLocalized(" in prefix or "t(" in prefix or "translateText(" in prefix:
            return full
        if "import " in prefix or "from " in prefix or "require(" in prefix:
            return full
        if "className" in prefix or "style" in prefix or "href" in prefix or "id=" in prefix:
            return full
        if str_val.startswith("http") or str_val.startswith("/") or str_val.startswith("#") or str_val.startswith("data:"):
            return full
        if len(str_val) < 2 or str_val.isascii() and not (" " in str_val or str_val in translations):
            return full

        en_val = get_english(str_val)
        if en_val and en_val != str_val:
            replacements += 1
            # Escape quotes in strings
            safe_tr = str_val.replace('"', '\\"')
            safe_en = en_val.replace('"', '\\"')
            return f'{prefix}tLocalized("{safe_tr}", "{safe_en}")'
        return full

    # Regex for standard string arguments in functions or object properties: key: "Türkçe" or fn("Türkçe")
    content = re.sub(
        r'([\(\,\:\=\?]\s*)"([^"\n\r]{2,150})"',
        replace_dq_string,
        content
    )

    if content != original:
        # Check if tLocalized is imported
        if "tLocalized" not in original:
            if "import" in content:
                content = f'import {{ tLocalized }} from "{rel_to_utils}";\n' + content

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        return replacements

    return 0

total_replacements = 0
files_changed = 0

for root, _, files in os.walk(os.path.join(SRC_DIR, "components")):
    for file in files:
        if file.endswith((".tsx", ".ts")) and not file.endswith(".d.ts"):
            fp = os.path.join(root, file)
            count = process_file(fp)
            if count > 0:
                files_changed += 1
                total_replacements += count
                print(f"  [✓] {os.path.relpath(fp, ROOT_DIR)}: {count} strings rewritten")

for root, _, files in os.walk(os.path.join(SRC_DIR, "sub-components")):
    for file in files:
        if file.endswith((".tsx", ".ts")) and not file.endswith(".d.ts"):
            fp = os.path.join(root, file)
            count = process_file(fp)
            if count > 0:
                files_changed += 1
                total_replacements += count
                print(f"  [✓] {os.path.relpath(fp, ROOT_DIR)}: {count} strings rewritten")

print("\n" + "=" * 60)
print(f">>> Code rewrite complete: {total_replacements} strings updated across {files_changed} files.")
print("=" * 60)
