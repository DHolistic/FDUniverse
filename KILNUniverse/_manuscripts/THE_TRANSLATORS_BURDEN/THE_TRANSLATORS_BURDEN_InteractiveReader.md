# THE TRANSLATOR'S BURDEN — Interactive Reader (Chapter-style)

This file mirrors the master manuscript but includes per-chapter metadata for the interactive reader mapping (`chapter-data.json`). Use this when packaging chapters into the interactive reader.

Example chapter metadata (update to match `chapter-data.json`):

<!--
{
  "chapter": 1,
  "title": "The Discovery",
  "pages": "1-12",
  "assets": []
}
-->

For Chapter 13, pick the epilogue variant you want to include in the reader or include both as optional extras:

<!--
{
  "chapter": 13,
  "title": "Epilogue",
  "variant": "A or B",
  "assets": []
}
-->

Packaging note:
- To include both epilogues as optional reading paths, add an entry in `chapter-data.json` that points to both `THE_TRANSLATORS_BURDEN_Chapter_13_Epilogue_A.md` and `THE_TRANSLATORS_BURDEN_Chapter_13_Epilogue_B.md` as alternates.
