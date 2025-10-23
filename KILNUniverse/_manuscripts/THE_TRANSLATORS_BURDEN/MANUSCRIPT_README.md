# THE TRANSLATOR'S BURDEN — Manuscript README

Purpose
- This folder contains the completed manuscript export and supporting metadata for "THE TRANSLATOR'S BURDEN." Use this README to guide packaging, distribution, and integration with the interactive reader.

Key files
- `THE_TRANSLATORS_BURDEN_Master_Export.md` — Full single-file export containing Chapters 1–12 and both Epilogues (A & B). Primary source for conversions.
- `THE_TRANSLATORS_BURDEN_Full_Manuscript.md` — Human-readable summary and distribution pointer.
- `MANUSCRIPT_CHANGELOG.md` — Change log and provenance of edits.
- `chapters/` — Per-chapter prose markdown files (editable). Use for line-level edits and chapter reordering if required.
- `visual_design/animation_pilot/` — Pilot assets and demo pages (animation work paused per instruction).

Quick start — Local export suggestions
1. Review `THE_TRANSLATORS_BURDEN_Master_Export.md` in a Markdown viewer for a full read-through.
2. To build an EPUB or PDF, I can produce automated builds (Pandoc or similar). Provide front-matter (title, author name, year, edition, ISBN if needed) and any styling choices (fonts, heading levels, drop-caps), and I will generate the files and add them to this folder.
3. If you need a single-epilogue canonical version, say which epilogue (A or B) should be kept; I will output a trimmed master export.

Editorial notes
- The master export currently contains both Epilogue variants; it also embeds protagonist seed ownership for Aude, Caelen, and Riva. If you prefer alternate names or further edits (copyedit, line edits, tighten pacing), request the scope and I will apply a targeted pass.
- The manuscript is formatted as plain Markdown for portability. For print or distribution, I recommend a tidy front-matter and CSS (for EPUB) or a LaTeX template (for PDF).

Next steps I can take (pick any):
- Generate EPUB and PDF builds with supplied front-matter.
- Produce a single-epilogue canonical manuscript (remove alternative epilogue).
- Run a light copyedit pass focusing on grammar and pacing (I will present a summary of notable suggestions before bulk changes).
- Produce a chapter-indexed JSON mapping for the interactive reader if you want metadata updated.

Contact me with the option(s) you want and I'll proceed.
