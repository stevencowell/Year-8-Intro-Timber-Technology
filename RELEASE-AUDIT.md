# Year 8 Intro Timber Technology — flagship release audit

Audit date: 6 August 2026
Course status: Year 8 elective, not Technology Mandatory
Release decision: local gates passed; rendered live verification required after deployment

## Authority and boundaries

- The unchanged two-page `assets/resources/Footstool.pdf` is the sole dimensional and construction authority. SHA-256: `2e7d2f0c74415810cbc45dabab767f01a664ed076195773e6badbb4838ef6fa1`.
- Slide 19 is excluded as dimensional authority because its 360/375 values conflict.
- Current school SOPs and teacher directions control practical work. The course does not invent construction details, materials, safety procedures, machine settings, assessment dates, marks or weightings.
- No generated workshop or hybrid-tool imagery is included. The rejected cropped source-title hero and obsolete eight-section data files were removed.

## Student-learning package

- Ten paired-week module routes contain 30 named theory sections.
- Each section contains three substantial theory parts, exactly 10 unique source-grounded checks, precise retry feedback, and one written-evidence scaffold.
- Total: 300 knowledge checks and 30 autosaving written responses.
- Student details, device-local autosave wording, Print / Save PDF and Main Menu return paths are present.
- The folio provides 12 evidence cards across all 10 modules, progress state, JSON backup/restore, folio-only reset and one-card-per-page printing.

## Resource destinations

- Busy Work provides a hub plus 10 routes with 10 distinct mechanics, meaningful feedback, persistence and printable evidence where appropriate.
- YouTube learning provides three topic-mapped clips. Playback is student activated, uses `youtube-nocookie.com`, and provides accessible fallbacks. Metadata, thumbnail and embed endpoints returned 200 on 6 August 2026.
- The plan route shows both unchanged page previews with accurate captions and visible Open larger access to the original PDF.
- Teacher Resources states the course and assessment boundaries, links the source program, plan and teaching deck, and lists unresolved local controls as Action required.

## Verified local gates

- Structural validator: 10 modules, 30 sections, 300 checks, unique question text, 220–300 theory words per section, balanced answer positions, source-safe retry feedback, 10 distinct Busy Work mechanics, privacy-enhanced YouTube manifest and authoritative PDF hash.
- Route crawl: 43 internal routes/assets returned successfully.
- Static Pages delivery: `.nojekyll` preserves the verified static package without theme processing.
- JavaScript syntax: all scripts passed.
- Desktop browser QA: landing, every module, folio and resource routes rendered without console errors or horizontal overflow.
- True 390 px QA: landing, every module, folio, Busy Work, YouTube, plan and Teacher Resources rendered at `innerWidth = scrollWidth = 390` with a usable compact menu.
- Interaction QA: incorrect/correct feedback, answer persistence, written-response persistence, folio readiness, YouTube start/stop and Busy Work route count passed.
- Print QA: module evidence printed across 13 pages with all three theory sections and responses; folio printed 12 clear evidence-card pages.

## Release boundary

A Git push is not live proof. The final release record must separately confirm the deployed commit, rendered desktop and 390 px routes, authoritative plan hash, video destinations, Main Page card and clean `HEAD == origin/main` state.
