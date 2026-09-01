from pathlib import Path
import re

root = Path(r'c:\Users\caner\3MashWeb')
files = list((root / 'src').rglob('*.ts'))

pattern = re.compile(
    r"(?P<assign>(?:export\s+)?(?:const|let|var)\s+(?P<name>[A-Za-z0-9_]+)\s*=\s*|export\s+default\s+)(?P<quote>['\"])(?P<data>data:(?:image|video)/[^'\"]+;base64,[A-Za-z0-9+/=]+)(?P=quote)",
    re.IGNORECASE,
)

changed = []
for path in files:
    text = path.read_text(encoding='utf-8')
    def repl(match):
        name = match.group('name')
        data = match.group('data').lower()
        quote = match.group('quote')
        assign = match.group('assign')
        ext = 'mp4' if 'data:video/' in data else ('webp' if 'webp' in data else 'png')
        base_name = name or path.stem
        slug = re.sub(r'(?<!^)(?=[A-Z])', '-', base_name)
        slug = slug.replace('_', '-').replace(' ', '-')
        slug = re.sub(r'[^a-z0-9-]+', '-', slug.lower()).strip('-')
        if not slug:
            slug = path.stem.lower().replace('_', '-')
        url = f'https://cdn.myikas.com/images/3mash/{slug}.{ext}'
        return f'{assign}{quote}{url}{quote}'

    new_text = pattern.sub(repl, text)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        changed.append(str(path.relative_to(root)))

print(f'UPDATED_FILES={len(changed)}')
for item in changed:
    print(item)
