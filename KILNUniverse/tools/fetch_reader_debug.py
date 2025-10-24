import urllib.request
import sys

def fetch(url):
    try:
        with urllib.request.urlopen(url, timeout=5) as r:
            status = r.getcode()
            body = r.read(4000).decode('utf-8', errors='replace')
            print(f"URL: {url}\nSTATUS: {status}\nBODY_SNIPPET:\n{body}\n{'-'*60}\n")
    except Exception as e:
        print(f"URL: {url}\nERROR: {e}\n{'-'*60}\n")

urls = [
    'http://localhost:8000/chapter-data.local.json',
    'http://localhost:8000/manuscript_sources/first-void/FIRST_VOID_CHAPTER_01_EXPANDED.md',
    'http://localhost:8000/_manuscripts/THE_FIRST_VOID/CHAPTERS_TFV/FIRST_VOID_CHAPTER_01_EXPANDED.md',
    'http://localhost:8000/manuscript_sources/chapters/THE_TRANSLATORS_BURDEN_Chapter_1_Script.md'
]

for u in urls:
    fetch(u)
