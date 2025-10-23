#!/usr/bin/env python3
import re
import os
from pathlib import Path

# Directory with expanded chapters
BASE = Path('_manuscripts/THE_FIRST_VOID/CHAPTERS Expanded')

# Replacement mapping - keys are regex patterns, values are replacement strings
# Use word boundaries where appropriate. Handle possessive forms via regex groups.
REPLACEMENTS = [
    # Partner -> Anahata-Dhara (preserve possessive/apostrophe-s)
    (r"\bPartner\b", "Anahata-Dhara"),
    (r"\bPartner's\b", "Anahata-Dhara's"),
    (r"\bPartner,", "Anahata-Dhara,"),
    (r"\bPartner\.", "Anahata-Dhara."),

    # Efficiency-Seeker -> Adhikara-Klesha
    (r"\bEfficiency-Seeker\b", "Adhikara-Klesha"),
    (r"\bEfficiency-Seeker's\b", "Adhikara-Klesha's"),
    (r"\bEfficiency-Seeker,", "Adhikara-Klesha,"),
    (r"\bEfficiency-Seeker\.", "Adhikara-Klesha."),

    # Title-like references to "the manipulator" -> Adhikara-Klesha
    (r"\bthe manipulator\b", "Adhikara-Klesha"),
    (r"\bThe manipulator\b", "Adhikara-Klesha"),

    # Optional: replace "manipulator" when clearly a name reference (less aggressive)
    (r"\bManipulator\b", "Adhikara-Klesha"),

    # If there are any archaic ROLE tokens, handle them (case-sensitive conservative)
    (r"\bPartner's\b", "Anahata-Dhara's")
]

# Files to process - only markdown files in the dir
md_files = sorted([p for p in BASE.glob('*.md') if p.is_file()])
if not md_files:
    print('No expanded markdown files found in', BASE)
    raise SystemExit(1)

modified = []
for p in md_files:
    text = p.read_text(encoding='utf-8')
    original = text
    for pattern, repl in REPLACEMENTS:
        text = re.sub(pattern, repl, text)
    if text != original:
        p.write_text(text, encoding='utf-8')
        modified.append(p.name)

print('Modified files:', modified)
print('Done')
