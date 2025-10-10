# Canonical Character Names - FDUniverse

**Purpose:** Definitive reference for correct character names and spellings
**Created:** 2025-10-10
**Decision Reference:** Master Questionnaire Questions 5-6
**Status:** CANONICAL - Use these names in ALL documents

---

## How to Use This Document

**For Writing:**
- Use ONLY the names in the "CANONICAL" column
- Never use names in the "DEPRECATED" column
- Check this document when uncertain about spelling

**For Editing:**
- Find and replace all deprecated names with canonical versions
- Update Character Bio, manuscripts, and Story Bible
- Cross-reference completed in files marked ✅

---

## Primary Characters

### The Four Daughters (Prophecy Quartet)

| Character | CANONICAL NAME | Deprecated/Alternate Names | Status |
|-----------|---------------|---------------------------|--------|
| Protagonist | **Talia Veyne** | (No variations) | ✅ Consistent |
| Fire Daughter | **Seraphina** [SURNAME TBD] | (To be developed) | ⚠️ Needs expansion |
| Shadow Daughter | **Ophelia** [SURNAME TBD] | (To be developed) | ⚠️ Needs expansion |
| Mind/Heart Daughter | **Alina** [SURNAME TBD] | (To be developed) | ⚠️ Needs expansion |

**Note:** Seraphina, Ophelia, and Alina require full character development (see `_development/Other_Daughters_Development_Plan.md`)

---

### Daring Star Crew

| Role | CANONICAL NAME | Deprecated/Alternate Names | Decision Source |
|------|---------------|---------------------------|-----------------|
| Captain | **Captain Darius Greaves** | (No variations) | ✅ Consistent |
| First Mate | **Mallory Trevanth** | ~~Mallory Fenton~~, ~~Mallory Hawke~~ | Q6 - Character A |
| Navigator | **Coren Vale** | ~~Coren Vail~~, ~~Coren Albright~~ | Q6 - Character B |
| First Mate (alt) | **Renna Dray** | ~~Lira~~, ~~Lira DeWitt~~ | Q6 - Character C |
| Second Mate | **Jeric "Fox" Forlan** | ~~Vance~~ | Q6 - Character D |
| Ship's Cook | **Edda Thornhill** (CANONICAL) | ~~Renaud Dufresne~~ (earlier draft/different ship) | Q6 - Character G |

**Critical:** Edda Thornhill is canonical cook on Daring Star. If Renaud Dufresne appears, flag for review—may be different ship/timeline.

---

### Veyne Family (Nobility)

| Relationship to Talia | CANONICAL NAME | Deprecated/Alternate Names | Critical Notes |
|----------------------|---------------|---------------------------|----------------|
| Father (antagonist) | **Lord Alaric Veyne** | ~~Lord Thaddeus Veyne~~, ~~Thaddeus Veyne~~ | Q6 - Character E |
| Mother (deceased) | **Lady Lyanna Veyne** | (No variations) | ✅ **MOTHER** - see family structure |
| Maternal Aunt (deceased) | **Elara Greaves** | **NOT Lyanna** (see critical error below) | ✅ **AUNT** - see family structure |
| Twin Sister | **Isolde Veyne** | (No variations) | ✅ Consistent |
| Half-Brother | **Arthur Veyne** | ~~Damien Veyne~~ | Q6 - Character F |
| Father's Second Wife | [NAME TBD] | (Arthur's mother) | ⚠️ Needs naming |

---

### CRITICAL FAMILY STRUCTURE CLARIFICATION

**MAJOR ERROR IDENTIFIED AND CORRECTED:**

**Manuscript V2/V3 line 20 said:** "after the death of her aunt, Lyanna" ❌ WRONG

**Correct Family Relationships:**
- **Lyanna Veyne** = Talia's **MOTHER** (deceased when Talia was 4-5)
- **Elara Greaves** = Talia's **AUNT** (Lyanna's sister, died protecting Talia at age 6)

**Action Required:**
- Find and replace: "aunt, Lyanna" → "aunt, Elara" in ALL manuscripts
- Verify all references use Lyanna = mother, Elara = aunt
- See `Talias_Death_Cover_Story_CANONICAL.md` for full backstory

**Decision Source:** Q5 - Elara/Lyanna Naming Conflict (Option A selected)

---

### Supporting Characters

| Character | CANONICAL NAME | Deprecated/Alternate Names | Relationship |
|-----------|---------------|---------------------------|--------------|
| Ship's Doctor | **Dr. Elias [SURNAME TBD]** | (No variations) | Distant cousin to **Lyanna** (mother's side) |
| [More to be added] | | | |

**Dr. Elias Clarification:**
- Cousin to **Lyanna Veyne** (Talia's mother) - NOT to Alaric
- Mother's side = SAFE connection (no loyalty to father)
- Explains why he helps protect Talia
- **Decision Source:** Q13 - Dr. Elias Family Connection (Option A)

---

## Character Name Standardization Record

### Corrections Applied

| Deprecated Name | CANONICAL Name | Files Affected | Status |
|----------------|---------------|---------------|--------|
| Mallory Fenton | **Mallory Trevanth** | Character Bio, manuscripts | ⚠️ Pending find-replace |
| Mallory Hawke | **Mallory Trevanth** | Character Bio | ⚠️ Pending find-replace |
| Coren Vail | **Coren Vale** | Character Bio, manuscripts | ⚠️ Pending find-replace |
| Coren Albright | **Coren Vale** | Character Bio | ⚠️ Pending find-replace |
| Lira | **Renna Dray** | Character Bio | ⚠️ Pending find-replace |
| Lira DeWitt | **Renna Dray** | Character Bio | ⚠️ Pending find-replace |
| Vance | **Jeric "Fox" Forlan** | Character Bio | ⚠️ Pending find-replace |
| Lord Thaddeus Veyne | **Lord Alaric Veyne** | Character Bio | ⚠️ Pending find-replace |
| Damien Veyne | **Arthur Veyne** | Character Bio | ⚠️ Pending find-replace |
| Renaud Dufresne (if cook) | **Edda Thornhill** | Character Bio | ⚠️ Pending verification |
| "aunt, Lyanna" | **"aunt, Elara"** | Manuscripts (line 20) | ⚠️ CRITICAL FIX PENDING |

**Implementation Status:** Names defined, find-replace operations NOT YET EXECUTED
**Reason:** Awaiting full implementation pass through all documents
**Next Step:** Systematic find-replace across all FDUniverse files

---

## Find-Replace Operations Required

### Manuscript Corrections (Priority 1 - CRITICAL)

```bash
# CRITICAL: Elara/Lyanna family structure fix
Find: "aunt, Lyanna"
Replace: "aunt, Elara"
Files: THE_FOUR_DAUGHTERS_CHRONICLES - CURRENT.md, all manuscripts
```

### Character Bio Corrections (Priority 2)

```bash
# Mallory surname
Find: "Mallory Fenton"
Replace: "Mallory Trevanth"

Find: "Mallory Hawke"
Replace: "Mallory Trevanth"

# Coren surname
Find: "Coren Vail"
Replace: "Coren Vale"

Find: "Coren Albright"
Replace: "Coren Vale"

# First Mate name
Find: "Lira DeWitt"
Replace: "Renna Dray"

Find: "Lira" (context: First Mate)
Replace: "Renna Dray"

# Second Mate name
Find: "Vance" (context: Second Mate)
Replace: "Jeric 'Fox' Forlan"

# Lord Veyne
Find: "Lord Thaddeus Veyne"
Replace: "Lord Alaric Veyne"

Find: "Thaddeus Veyne"
Replace: "Alaric Veyne"

# Half-Brother
Find: "Damien Veyne"
Replace: "Arthur Veyne"

# Ship's Cook (verify context first)
Find: "Renaud Dufresne" (if cook context)
Replace: "Edda Thornhill"
Note: May be different ship/time—verify before replacing
```

---

## Naming Conventions

### Surnames by Social Class

**Nobility:**
- Pattern: [First] [Surname] (e.g., Alaric Veyne, Lyanna Veyne)
- Titles: Lord/Lady before name
- Family names: Veyne (Talia's family)

**Crew/Common Folk:**
- Pattern: [First] [Surname] (e.g., Mallory Trevanth, Coren Vale)
- Nicknames common: "Fox" Forlan
- Occupational surnames possible: Greaves (armor-maker?), Thornhill (geographic?)

**Guilds:**
- [To be established based on guild affiliations]

---

## Character Naming Guidelines for Future

**When adding new characters:**
1. Check this document first to avoid conflicts
2. Add new name to this document immediately
3. Note any alternate names/nicknames
4. Specify pronunciation if ambiguous
5. Update character relationships

**Avoid:**
- Creating multiple spellings of same name
- Reusing deprecated names
- Ambiguous nicknames without full name reference

---

## Pronunciation Guide (Optional)

| Name | Pronunciation | Notes |
|------|--------------|-------|
| Talia | TAH-lee-ah | Three syllables |
| Veyne | VAYN | Rhymes with "rain" |
| Alaric | AL-ah-rik | Emphasis on first syllable |
| Lyanna | lee-AH-nah | Emphasis on middle |
| Elara | eh-LAR-ah | Emphasis on middle |
| Isolde | ih-ZOHL-duh | Germanic origin |
| Seraphina | ser-ah-FEE-nah | Angelic connotation |
| Ophelia | oh-FEEL-ee-ah | Shakespearean |
| Alina | ah-LEE-nah | Soft "a" |

---

## Cross-References

**Related Documents:**
- `Foundational Character Bio - CANONICAL.md` - Full character details
- `Talias_Death_Cover_Story_CANONICAL.md` - Elara/Lyanna backstory
- `Timeline_and_Backstory_CANONICAL.md` - Arthur's age, family timeline
- `_implementation_logs/05_name_corrections_report.md` - Implementation log

**To Be Updated:**
- All manuscripts with find-replace operations
- Character Bio with canonical names only
- Story Bible with corrected family relationships

---

## Version History

**v1.0 - 2025-10-10:**
- Initial creation
- 11 character name conflicts resolved
- Elara/Lyanna family structure clarified
- Find-replace operations defined
- Implementation pending

---

**Maintained By:** Conflict Resolution System
**Last Updated:** 2025-10-10
**Status:** CANONICAL REFERENCE ✅
**Universe:** FDUNIVERSE ONLY
**Implementation Status:** ⚠️ NAMES DEFINED, FIND-REPLACE PENDING
