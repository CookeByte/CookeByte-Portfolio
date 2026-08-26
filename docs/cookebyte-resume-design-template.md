# CookeByte Resume Design Template

> **Design direction:** Swiss retail wayfinding meets a sharp creative-studio CV. Use a cream paper field, black structural blocks, a signal-orange action accent, and a lime metadata accent. The result should read like a compact “creative operating system,” not a conventional corporate résumé.

## 1. Visual System

| Role | Token | Use in the resume |
|---|---:|---|
| Ink | `#171817` | Main text, dividers, dark hero panel, navigation bars. |
| Paper cream | `#F4F0E8` | Primary page background and light card surface. |
| Soft cream | `#EBE5D9` | Note blocks, skill-chip fills, secondary panels. |
| Signal orange | `#FF5A36` | Name emphasis, section number, availability marker, link hover, key achievement. |
| Lime signal | `#D5E668` | Metadata stamp, role index, status dot, subtle highlight. |
| Line | `rgba(23, 24, 23, .22)` | Thin dividers and table rules. |

Use **Archivo Black** for the name, major headings, and numeric section indices. Use **DM Sans** for biography, experience descriptions, and project context. Use **Monocraft** for labels, dates, locations, URLs, microcopy, and controls. If Monocraft is unavailable in a resume tool, substitute **IBM Plex Mono** or **Space Mono**.

| Type level | Recommended styling |
|---|---|
| Name | Archivo Black; 52–72 pt; tight tracking around `-0.07em`; ink with one orange emphasized word. |
| Role line | Monocraft; 10–12 pt; uppercase; generous tracking; lime on an ink panel. |
| Section heading | Archivo Black; 28–40 pt; one highlighted word in orange. |
| Job/project title | DM Sans; 14–18 pt; 700 weight. |
| Body copy | DM Sans; 10.5–12 pt; 1.45–1.55 line height. |
| Metadata | Monocraft; 8–10 pt; uppercase; tracking `0.08em`. |

## 2. Page Architecture

Use a two-column grid on desktop: a **32% information rail** on the left and a **68% content field** on the right. The rail uses ink as its base and stays visually quiet; the content field uses cream. For an A4/Letter PDF, keep page margins between 14 and 18 mm. Avoid rounded cards. Favour thin rules, hard edges, offset shadows, and a single clipped-corner stamp.

| Zone | Content | CookeByte treatment |
|---|---|---|
| Top rule | No content | A 6–8 px orange line across the entire page. |
| Header | Name, role, one-sentence summary, availability | Cream field with an asymmetrical lime “C” stamp at upper right. |
| Left rail | Contact, links, location, skill tags, tools | Ink background; cream text; lime labels and status dot. |
| Experience | Three to five concise roles | Number each entry `01`, `02`, `03`; use rules rather than cards. |
| Selected work | Two to four projects | A cream, orange, or ink display panel with short measurable outcomes. |
| Education / extras | Education, awards, languages | Compressed in a final horizontal strip. |

## 3. Copy-and-Paste Content Template

```text
YOUR NAME
ROLE / DISCIPLINE / LOCATION

I build [what you make] for [who it helps], combining [strength 1] with [strength 2].

AVAILABLE FOR / [FREELANCE · FULL-TIME · COLLABORATION]

CONTACT
EMAIL      you@email.com
PORTFOLIO  yoursite.com
GITHUB     github.com/yourhandle
LINKEDIN   linkedin.com/in/yourhandle
LOCATION   City, Country

01 — EXPERIENCE
ROLE TITLE / COMPANY                              2024—NOW
One sharp sentence explaining the scope of your responsibility.
• Built / led / shipped [specific outcome].
• Improved [metric, process, or customer result].
• Worked with [team, tools, or audience].

02 — SELECTED WORK
PROJECT NAME / TYPE
The problem: [one sentence].
The move: [one sentence].
The signal: [result, metric, release, or audience outcome].

SKILL SIGNAL
Core: Skill 01 · Skill 02 · Skill 03
Tools: Tool 01 · Tool 02 · Tool 03

EDUCATION / EXTRA
Qualification, Institution, Year · Award / certification / language
```

## 4. Resume Layout Wireframe

```text
════════════════════════════════════════════════════════════════════
 SIGNAL ORANGE TOP RULE
════════════════════════════════════════════════════════════════════
 YOUR NAME                                             [ C ]
 ROLE / DISCIPLINE / LOCATION                  AVAILABLE NOW ●
 One concise, human summary with one orange emphasis.
────────────────────────────────────────────────────────────────────
 INK LEFT RAIL                         CREAM CONTENT FIELD
 CONTACT                               01 — EXPERIENCE
 email                                 ROLE / COMPANY        2024—NOW
 portfolio                             Outcome-led overview and 2–3 bullets.
 github
                                      ──────────────────────────────
 SKILL SIGNAL                          02 — SELECTED WORK
 [SKILL] [SKILL]                       PROJECT / TYPE
 [SKILL] [SKILL]                       Problem · Move · Signal

 TOOLS                                ──────────────────────────────
 Tool · Tool · Tool                   03 — EDUCATION / EXTRAS
                                      Compact education and award line.
════════════════════════════════════════════════════════════════════
 PERSONAL SITE / EMAIL / UPDATED MONTH YEAR
════════════════════════════════════════════════════════════════════
```

## 5. Styling Rules

Keep the résumé to **one page** when applying for roles that value quick scanning. Use a second page only for a project case-study appendix. Treat every line as a wayfinding cue: label sections numerically, make dates align in a single right-hand column, and write bullet points as outcomes rather than task lists.

For contrast, maintain ink text on cream, cream text on ink, and ink text on lime. Signal orange should guide attention rather than fill the page: reserve it for the top rule, a highlighted word in a heading, and one offset shadow or project panel. Do not use orange body copy.

Use motion only for a web version of the resume. A 160–220 ms hover lift for project rows and a very short Monocraft character flicker for links is enough. For a PDF, preserve the same hierarchy through static offset shadows, typography, and rules rather than animation.

## 6. Minimal CSS Token Starter

```css
:root {
  --ink: #171817;
  --cream: #f4f0e8;
  --soft-cream: #ebe5d9;
  --orange: #ff5a36;
  --lime: #d5e668;
  --line: rgba(23, 24, 23, 0.22);
  --display: "Archivo Black", sans-serif;
  --body: "DM Sans", sans-serif;
  --utility: "Monocraft", "IBM Plex Mono", monospace;
}

.resume { background: var(--cream); color: var(--ink); }
.resume__top-rule { height: 8px; background: var(--orange); }
.resume__label { font: 10px/1 var(--utility); letter-spacing: .1em; text-transform: uppercase; }
.resume__title { font: 400 clamp(42px, 7vw, 76px)/.88 var(--display); letter-spacing: -.07em; }
.resume__title em { color: var(--orange); font-style: normal; }
.resume__rail { background: var(--ink); color: var(--cream); }
.resume__stamp { background: var(--lime); color: var(--ink); clip-path: polygon(0 0,100% 0,100% 77%,77% 100%,0 100%); }
.resume__section { border-top: 1px solid var(--line); padding: 22px 0; }
```

## 7. Final Checklist

Before export, check that the person’s name appears within the first quarter of the page, that every external link is written in readable text rather than hidden under an icon, that dates use one format throughout, and that the document remains legible in grayscale. Export a **PDF** for applications and maintain the editable source in Figma, Canva, Google Docs, or HTML/CSS.
