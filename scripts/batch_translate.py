# -*- coding: utf-8 -*-
"""
High-performance batch translator for all_translations.json
Using deep-translator with thread pooling, exponential backoff, and UTF-8 safety.
"""
import json
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

# Ensure UTF-8 output on Windows console
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

INPUT = os.path.join(os.path.dirname(__file__), "..", "src", "utils", "all_translations.json")
PROGRESS_FILE = os.path.join(os.path.dirname(__file__), "translation_progress.json")

NUM_WORKERS = 8  # Safe concurrency to avoid rate limits
SAVE_INTERVAL = 15

from deep_translator import GoogleTranslator

def translate_single(text):
    """Translate one text with retry logic."""
    if not text or not text.strip():
        return text
    
    # Don't translate pure numbers, short codes, symbols
    stripped = text.strip()
    if stripped.isdigit() or len(stripped) <= 1:
        return text

    for attempt in range(3):
        try:
            translator = GoogleTranslator(source='tr', target='en')
            res = translator.translate(text)
            if res and res.strip():
                return res
            return text
        except Exception as e:
            time.sleep(1.0 + attempt * 1.5)
    return text

def main():
    print("=== 3Mash Global Translation Engine ===")
    
    with open(INPUT, "r", encoding="utf-8") as f:
        all_translations = json.load(f)

    progress = {}
    if os.path.exists(PROGRESS_FILE):
        try:
            with open(PROGRESS_FILE, "r", encoding="utf-8") as f:
                progress = json.load(f)
            print(f"Loaded progress: {len(progress)} entries already completed.")
        except Exception:
            progress = {}

    # Identify entries needing translation:
    # 1. key == value (untranslated copy-paste)
    # 2. Not yet in progress
    todo = []
    for k, v in all_translations.items():
        if k in progress:
            continue
        if k == v:
            todo.append(k)

    print(f"Total entries: {len(all_translations)}")
    print(f"Already translated & saved: {len(progress)}")
    print(f"Remaining to translate: {len(todo)}\n")

    if not todo:
        print("All entries translated! Writing to all_translations.json...")
        for k, v in progress.items():
            all_translations[k] = v
        with open(INPUT, "w", encoding="utf-8") as f:
            json.dump(all_translations, f, ensure_ascii=False, indent=2)
        print("Done!")
        return

    completed_count = 0
    total_todo = len(todo)

    with ThreadPoolExecutor(max_workers=NUM_WORKERS) as executor:
        # Submit all tasks
        future_to_key = {executor.submit(translate_single, key): key for key in todo}

        for future in as_completed(future_to_key):
            key = future_to_key[future]
            try:
                translated_text = future.result()
                progress[key] = translated_text
            except Exception as e:
                progress[key] = key

            completed_count += 1

            if completed_count % 10 == 0 or completed_count == total_todo:
                percent = (completed_count / total_todo) * 100
                print(f"Progress: [{completed_count}/{total_todo}] ({percent:.1f}%) translated...")

            # Periodic save
            if completed_count % SAVE_INTERVAL == 0:
                with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
                    json.dump(progress, f, ensure_ascii=False, indent=2)
                # Also update main file so live site gets updates in real-time
                for k, v in progress.items():
                    all_translations[k] = v
                with open(INPUT, "w", encoding="utf-8") as f:
                    json.dump(all_translations, f, ensure_ascii=False, indent=2)

    # Final save
    print("\nFinalizing and saving all translations...")
    for k, v in progress.items():
        all_translations[k] = v

    with open(INPUT, "w", encoding="utf-8") as f:
        json.dump(all_translations, f, ensure_ascii=False, indent=2)

    with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
        json.dump(progress, f, ensure_ascii=False, indent=2)

    print("=== Translation Complete! ===")
    print(f"Total database size: {len(all_translations)} entries")

if __name__ == "__main__":
    main()
