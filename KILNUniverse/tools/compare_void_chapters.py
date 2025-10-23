#!/usr/bin/env python3

import os
import sys
import argparse
import json
import difflib
import re


def normalize_text(s):
    return " ".join(s.split())


def stats_for_pair(draft_path, expanded_path):
    with open(draft_path, 'r', encoding='utf-8') as f:
        draft = f.read()
    with open(expanded_path, 'r', encoding='utf-8') as f:
        expanded = f.read()

    draft_norm = normalize_text(draft)
    expanded_norm = normalize_text(expanded)

    draft_words = len(draft_norm.split())
    expanded_words = len(expanded_norm.split())
    draft_lines = draft.splitlines()
    expanded_lines = expanded.splitlines()

    # containment: is draft (normalized) a substring of expanded (normalized)?
    containment = draft_norm in expanded_norm

    # compute diff stats on lines
    d = difflib.unified_diff(draft_lines, expanded_lines, lineterm='')
    added = 0
    removed = 0
    for line in d:
        if line.startswith('+++') or line.startswith('---') or line.startswith('@@'):
            continue
        if line.startswith('+'):
            added += 1
        elif line.startswith('-'):
            removed += 1

    # ratio of sizes
    size_ratio = expanded_words / draft_words if draft_words > 0 else None

    return {
        'draft_path': draft_path,
        'expanded_path': expanded_path,
        'draft_words': draft_words,
        'expanded_words': expanded_words,
        'size_ratio': size_ratio,
        'containment': containment,
        'added_lines': added,
        'removed_lines': removed,
    }


def find_pairs(dirpath):
    files = os.listdir(dirpath)
    # map chapter number -> paths
    draft_map = {}
    expanded_map = {}
    # regex to capture chapter number
    r = re.compile(r'FIRST[_ ]VOID[_ ]CHAPTER[_ ](\d{1,2})', re.IGNORECASE)
    for f in files:
        m = r.search(f)
        if not m:
            continue
        num = int(m.group(1))
        up = f.upper()
        if 'DRAFT' in up:
            draft_map[num] = os.path.join(dirpath, f)
        elif 'EXPAND' in up:
            expanded_map[num] = os.path.join(dirpath, f)

    pairs = []
    for num in sorted(set(list(draft_map.keys()) + list(expanded_map.keys()))):
        draft = draft_map.get(num)
        expanded = expanded_map.get(num)
        pairs.append((num, draft, expanded))
    return pairs


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--dir', default='_manuscripts/THE_FIRST_VOID/chapters', help='Chapters directory')
    args = p.parse_args()

    dirpath = args.dir
    if not os.path.isdir(dirpath):
        print('ERROR: directory not found:', dirpath)
        sys.exit(2)

    pairs = find_pairs(dirpath)
    results = []
    for num, draft, expanded in pairs:
        if not draft or not os.path.isfile(draft):
            results.append({'chapter': num, 'draft_path': draft, 'expanded_path': expanded, 'error': 'draft not found'})
            continue
        if not expanded or not os.path.isfile(expanded):
            results.append({'chapter': num, 'draft_path': draft, 'expanded_path': expanded, 'error': 'expanded not found'})
            continue
        stats = stats_for_pair(draft, expanded)
        stats['chapter'] = num
        results.append(stats)

    # print human readable
    print('First Void chapters comparison\n')
    for r in sorted(results, key=lambda x: x.get('draft_path')):
        fname = os.path.basename(r.get('draft_path'))
        if 'error' in r:
            print(f"{fname}: ERROR - {r['error']}")
            continue
        status = 'CONTAINS' if r['containment'] else 'DIFFERENT'
        ratio = f"{r['size_ratio']:.2f}" if r['size_ratio'] else 'N/A'
        print(f"{fname}: draft {r['draft_words']}w -> expanded {r['expanded_words']}w (ratio {ratio}), {status}, +{r['added_lines']} -{r['removed_lines']}")

    # summary
    total = len([r for r in results if 'error' not in r])
    contains = len([r for r in results if r.get('containment')])
    different = total - contains
    print('\nSummary:')
    print(f'  Pairs analyzed: {total}')
    print(f'  Expanded contains draft: {contains}')
    print(f'  Expanded differs from draft: {different}')

    # also print JSON to stdout for automation
    print('\nJSON:\n')
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
