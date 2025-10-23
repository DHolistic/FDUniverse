DB Attempt — Sandbox

Purpose
- A small local sandbox to paste HTML, CSS and JS and preview the result.

Files
- index.html — the sandbox UI
- style.css — styles for the sandbox
- script.js — wires editors to the live preview and autosave
- open.ps1 — PowerShell script to open the sandbox in the default browser on Windows

Usage
1. Open `open.ps1` or run it from PowerShell to launch the sandbox in your default browser.
2. Paste HTML, CSS and JS into the respective panes. Click Run or press Ctrl+Enter to render.
3. Toggle Autosave to persist the current contents in localStorage.

Security
- This sandbox runs code locally in an iframe with a restricted sandbox attribute. Still avoid pasting untrusted code that may attempt to access local resources.

Extensions (ideas)
- Add a server-backed save/load snippets feature.
- Add syntax highlighting with Prism or CodeMirror.
- Add export/import of snippets as files.
