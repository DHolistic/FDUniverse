#!/usr/bin/env python3
import json
import re
from pathlib import Path

# Fix JSON indentation issue in chapter-data.local.json
manifest_path = Path('_manuscripts/THE_TRANSLATORS_BURDEN/exports/TTB_reader_package/interactive_reader/chapter-data.local.json')

content = manifest_path.read_text(encoding='utf-8')

# Fix malformed markdownPath entries that lack proper indentation
fixed_content = re.sub(
    r'^  "markdownPath":',
    r'        "markdownPath":',
    content,
    flags=re.MULTILINE
)

manifest_path.write_text(fixed_content, encoding='utf-8')
print('Fixed JSON indentation in chapter-data.local.json')

# Validate JSON is now parseable
try:
    data = json.loads(fixed_content)
    print('JSON validation: OK')
    print(f'Stories available: {list(data.keys())}')
    
    # Show first-void markdownPath samples
    if 'first-void' in data:
        first_3 = data['first-void']['chapters'][:3]
        for ch in first_3:
            print(f"  Chapter {ch['number']}: {ch['markdownPath']}")
            
except json.JSONDecodeError as e:
    print(f'JSON validation failed: {e}')