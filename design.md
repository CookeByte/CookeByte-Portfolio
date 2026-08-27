# CookeByte — Stitch Design Specification

## Project Definition

**CookeByte** is a two-person retail creative studio that makes websites, campaign creative, retail identity, and short-form video for local shops, marts, and neighbourhood brands. The site should feel like a physical shop window translated into a digital display: bold, editorial, directional, and practical.

> **Core visual idea:** “Swiss retail wayfinding meets contemporary editorial art direction.” The design is a physical display system—rails, tickets, product plinths, route numbers, and utility labels—not a generic agency landing page.

The design must be high-energy but legible. The studio’s two disciplines—development and visual design/video editing—should have equal presence throughout the page.

## Master Prompt for Stitch

```text
Design a premium, responsive one-page website for “CookeByte”, a two-person creative studio that builds websites, campaign creative, retail identity, and short-form video for local shops and marts.

Art direction: Swiss retail wayfinding mixed with contemporary print editorial and a cinematic 3D shop-window installation. It must feel like a physical retail display system, not a corporate SaaS site and not a generic portfolio. Use hard edges, thin black rules, oversized compressed-feeling black typography, numbered routes, ticket labels, asymmetrical grids, 3D display objects, and restrained pixel/utility details.

Palette: ink #171817, cream #F4F0E8, soft cream #EBE5D9, signal orange #FF5A36, lime #D5E668. Use cream as the main paper surface; ink as the structural dark surface; signal orange only for important emphasis; lime for labels, stamps, and availability cues. Avoid gradients except subtle product-light/glass reflections in the 3D hero.

Typography: Archivo Black for display headlines, DM Sans for readable body text, and Monocraft or IBM Plex Mono for labels, navigation, metadata, counters, and buttons. Headlines should use very tight tracking and 0.88–0.95 line-height. Use lowercase/uppercase intentionally; labels are uppercase utility text.

Required sections: sticky header; immersive scroll-led shop-window hero; animated lime ticker; dark featured-system statement; orange three-service grid; two interactive team cards; three Work With Us route cards; three-step method; dark contact CTA; precise footer. Include mobile adaptations with a compact route-menu trigger and stacked cards.

Accessibility: maintain strong contrast, preserve visible focus states, never put tiny essential copy on orange, and provide a reduced-motion static fallback. Use real text for all content, not text embedded in images.
```

## Visual System

| Token | Value | Design role |
|---|---:|---|
| `--ink` | `#171817` | Primary typography, dark fields, borders, footer. |
| `--cream` | `#F4F0E8` | Main paper surface and primary light card. |
| `--soft-cream` | `#EBE5D9` | Quiet secondary surfaces and receipt/detail fields. |
| `--orange` | `#FF5A36` | Signal colour for key words, top rule, CTA state, and offset shadow. |
| `--lime` | `#D5E668` | Utility stamp, status dot, ticker, metadata and selected-state accent. |
| `--line` | `rgba(23,24,23,.22)` | Hairline dividers on light surfaces. |
| `--ease-out` | `cubic-bezier(.23,1,.32,1)` | Default sharp but physical transition curve. |

### Colour Distribution

Use **cream for roughly half of the page**, ink for the hero/feature/contact sections, orange for the services field and high-priority emphasis, and lime as short visual punctuation. Do not create a rainbow layout. Orange should rarely fill two adjacent sections; its power comes from contrast with ink and cream.

### Typography Rules

| Role | Typeface | Specification |
|---|---|---|
| Major display headings | Archivo Black | `clamp(46px, 5.5vw, 92px)`, line-height `0.88–0.92`, tracking around `-0.07em`. |
| Large card titles | Archivo Black | `30–56px`, tight tracking, short 2–4 word phrases. |
| Body copy | DM Sans | `15–17px`, medium weight, line-height `1.45–1.55`. |
| Labels, routes, nav, buttons | Monocraft | `8–12px`, uppercase, letter-spacing `0.07–0.14em`. |
| Secondary control/nav fallback | Space Grotesk | `10–13px`, 700 weight, if Monocraft is unavailable. |

Keep display headlines black on cream or cream on ink. One word or phrase may be orange, rendered in a lighter geometric sans rather than italic serif. Example: **“Small team. Big _signal._”**

## Page Architecture

| Route | Section | Background | Intended feeling |
|---:|---|---|---|
| 00 | Launch loader + entry | Ink | A short pixel display boots before the shop window opens. |
| 01 | Scroll-led hero | Ink | Cinematic digital retail installation, depth and physical scale. |
| — | Capability ticker | Lime | Fast, confident movement between the hero and content. |
| 01 | Featured system | Ink | Editorial statement on campaign consistency. |
| 02 | The scope | Orange | Three high-contrast service cards, like an aisle signage system. |
| 03 | The team | Cream | Two equal but visually distinct skill profiles. |
| 04 | Work with us | Ink | Three conversion routes: terms, pricing, project brief. |
| 05 | The method | Cream | A clean three-step operational process. |
| — | Contact | Ink | A circular orange/lime CTA construction, direct and human. |
| — | Footer | Ink | Compact closing directory. |

### 1. Launch Loader: `00 / SIGNAL BOOT`

Create a full-screen ink panel with an 8px orange top rule. Place a lime clipped-corner `C` ticket above a large Monocraft wordmark that resolves from a pixel scramble into `COOKE BYTE`. Add a thin lime loading bar at the bottom with small utility copy: `01 / OPENING THE DISPLAY`, `TAP FOR SOUND`, and `EST. 2026`.

The loader lasts about three seconds on a live site, then lifts vertically away. In Stitch, show the resolved final state. Use a single orange circle and a faint concentric ring behind the wordmark; avoid sparkles, glassmorphism, or many floating shapes.

### 2. Hero: `01 / DISPLAY SYSTEM`

Build the first main screen as a shop-window installation. On desktop, use a narrow 67px left vertical rail carrying `SCROLL THE DISPLAY`, then a large content field and an image/3D display field. The background is ink. The composition includes:

| Layer | Element | Treatment |
|---|---|---|
| Back | Retail interior image | Dark, cinematic, low-saturation retail environment. |
| Middle | Tilted framed screen/window | Thick ink frame, slight 3D perspective, a campaign/retail visual inside. |
| Front | Orange rails | 2–3 glossy industrial rails crossing the scene at distinct depths. |
| Accent | Lime display disc | A dimensional circle labelled `OPEN`, with a soft specular highlight. |
| Base | Pale plinth + dark pedestal | Grounds the objects; use realistic hard shadows. |
| Copy | Hero title | `What are we / Gonna Cook?` aligned left of the 3D scene. |

Add a small label `DIGITAL CREATIVE FOR LOCAL RETAIL`, an orange dot, a lime circular arrow CTA, `DISPLAY SYSTEM 01`, and `ENTER THE WINDOW`. On scroll, the window and rails should shift subtly, then fade into cream. Do not make this section dependent on motion to be understood.

### 3. Lime Capability Ticker

Place a full-width lime bar after the hero. Use a large Archivo Black repeating phrase such as `WE MAKE RETAIL FEEL CURRENT`, separated by orange four-point markers. In a live build, this loops horizontally at a slow, continuous speed; in a static design, show one clean cropped run.

### 4. Featured System: `01 — FEATURED SYSTEM`

Use an ink editorial panel. Keep the left 55–60% for a big cream display headline: `Give every / offer a point / of view.` The word **offer** is orange. Place body copy below and three outlined tags: `CAMPAIGN CREATIVE`, `RETAIL LAUNCH`, `CONTENT SYSTEM`. On the right, use subtle orange diagonal rails and a lime round stamp with an orange offset shadow. This section must read as a statement panel, not an image gallery.

### 5. Services: `02 — THE SCOPE`

Make this a full orange field with a subtle paper/grain texture. The heading is ink: `Small team. / Big signal.` The word **signal** is cream. Put three tightly bordered service cards in a row:

| Card | Title | Copy focus | Base colour |
|---:|---|---|---|
| 01 | Shop websites | Clear, shoppable, useful digital shopfronts. | Cream |
| 02 | Campaigns & edits | Campaign creative and short-form video that stops the scroll. | Orange |
| 03 | Retail identity | Visual systems that make all customer touchpoints belong together. | Cream |

Each card includes a route number, northeast-arrow icon, short body copy, and Monocraft detail line. On hover, the card becomes ink, text becomes cream, and the panel lifts about 7px with a hard offset shadow. In Stitch, present the non-hover state and optionally a companion hover state.

### 6. Team: `03 — TWO-PERSON STUDIO`

Use a cream field with faint orange and lime concentric outline circles. Begin with a black utility bar: lime `C` stamp, `AISLE 03 / TWO-PERSON STUDIO`, then `DEV ↔ VISUAL`. Use a wide heading: `Two people. / Two skill sets. / One signal.`

Design two tall profile cards as equal partners:

| Profile | Theme | Accent | Content |
|---|---|---|---|
| Benitto Joshua | Ink panel / cream type | Lime | Development lead; Game Dev, Web Dev, AI LLMs. |
| Abisheik | Cream panel / ink type | Orange | Visual lead; Video Editor, Web Designer, Graphic Designer. |

Each card contains a temporary retail/editorial image, role, handle, live-status dot, oversized name, skill tags, and compact social links. Use a 3D edge strip matching the accent colour. In a live build, use restrained pointer tilt and a radial glare; on mobile, remove pointer effects and keep the cards readable.

### 7. Work With Us: `04 / MAKE THE MOVE`

Use a near-black/ink section. Add a black route bar with cream utility labels and orange/lime visual cues. The headline is cream: `One shop. / A whole network.` with **network** in lime. Place three bordered destination cards:

1. **Terms & Conditions** — `Know the terms.`
2. **Pricing Guide** — `Get the right quote.`
3. **Bring Us the Brief** — `Bring us the brief.`

These are conversion routes rather than public content blocks. Each has a number, a compact description, and a Monocraft action at the bottom. Primary actions open an in-site panel rather than take the visitor to a separate page.

#### Private Panel States

The panel overlays the current page with a dark translucent backdrop and a cream surface with an orange offset shadow. It should be accessible, closeable with `×`, and able to scroll inside the panel. Define three panel variants:

| Panel | Key content |
|---|---|
| Terms | Large heading and a contained PDF/document viewer. |
| Pricing | Three private starting-package cards, never in the public page flow. |
| Brief | Project brief form, then a cream receipt state with the server-provided reference ID. |

### 8. Method: `05 — THE METHOD`

Use a cream field with the heading `From shop floor / to scroll stop.` Highlight **scroll stop** in orange. Below, use three contiguous bordered process cards: `01 Walk the floor`, `02 Find the signal`, and `03 Put it in the window`. Each contains a short practical paragraph and a minimal chevron. Do not add decorative images here; the contrast and precision should give this section its calmness.

### 9. Contact

Use an ink panel with a large lime partial circle breaking in from the upper edge. The heading is cream: `Ready to put / your shop out front?` with **out front** in lime. On the right, create overlapping circular CTA shapes—one lime `START A CONVERSATION`, one orange `GET VISIBLE`—with sharp black text and a directional arrow. The actual action opens the mail or project-brief route.

### 10. Footer

Use a concise ink footer: CookeByte wordmark, one-line studio descriptor, compact links (`Services`, `Team`, `Method`, `Contact`, `GitHub ↗`), and `© 2026 / Built for local commerce`. All labels use Monocraft or the utility fallback.

## Component Specification

| Component | Construction | States |
|---|---|---|
| `C` stamp | Lime square with a clipped lower-right corner; ink letter `C`. | Static; can appear inside black utility strips. |
| Route strip | Dark rectangular band, label left, metadata right. | Static. |
| Display card | Hard border, no rounding, edge-to-edge content. | Hover: ink fill, 7px lift, hard offset shadow. |
| Utility tag | 1px outline, uppercase mono label, 6–9px padding. | Hover: accent-filled label. |
| Circle CTA | Lime or orange circle with compact uppercase copy. | Hover: rotate slightly or translate `-2px`. |
| Primary button | Ink fill with cream mono label; arrow aligned right. | Hover: orange fill; Active: scale to `0.97`. |
| Private panel | Cream rectangular slab with orange offset backplane. | Open/close: opacity + `translateY`, never scale from zero. |
| Receipt | Thin horizontal rules, receipt ID in orange, metadata labels in mono. | On success only; no animation required. |

## Spacing and Grid

Use a desktop max content width of **1150px**. Standard horizontal padding is `4.2vw` on desktop, `20–24px` on mobile. Major vertical section padding ranges from `80px` to `110px`; cards have `22–28px` internal padding. Borders are 1px. Avoid rounded corners entirely except for display discs, status dots, and selected circle controls.

Headlines should not be centered except inside the loader. Most content should align to an intentional left edge, while a secondary paragraph or metadata sits to the right. This creates the distinct asymmetric wayfinding rhythm.

## Responsive Direction

| Breakpoint | Layout decision |
|---|---|
| Desktop: `> 850px` | Keep wide asymmetric header, 3-column service and process grids, two team cards, left hero rail. |
| Tablet: `600–850px` | Reduce headline size, make hero scene less perspective-heavy, preserve two-column information relationships where possible. |
| Mobile: `< 600px` | Hide desktop nav, show route-menu trigger, stack all card grids, use 20px page padding, make team/profile cards full width. |
| Reduced motion | Resolve loader quickly; no ticker movement, parallax, tilt, bounce, or hover-glitch effects. |

On mobile, preserve the section order and visual contrast. Do not shrink desktop cards into unreadably dense panels. The hero should become a tall framed image with one central focal object, concise title copy, and no essential vertical rail text.

## Motion and Interaction

| Interaction | Timing | Behaviour |
|---|---:|---|
| Loader exit | `460ms` | Fade and lift up after the three-second sequence. |
| Page reveal | `850ms` | Subtle blur-to-sharp and opacity reveal. |
| Card hover | `180–220ms` | Translate up / show hard shadow; no bouncy easing. |
| Utility-link glitch | `330ms` | Two or three pixel-offset steps on hover only. |
| Hero parallax | Scroll-linked | Move rails/window/disc at different small distances. |
| Team-card tilt | `180ms` | Desktop pointer interaction only; remove on touch and reduced-motion. |
| Panel open | `220–360ms` | Opacity plus short vertical travel; preserve keyboard focus. |

Motion should support physical depth and wayfinding. Do **not** use constant floating UI, excessive entrance animations, spinning logos, or neon effects.

## Accessibility Requirements

Use real semantic headings and native buttons/links. All dark fields use cream text; all cream, lime, or orange fields use ink text. Keep focus rings visible in orange or lime. Provide text alternatives for images; 3D decorative geometry should be hidden from assistive technology. Never communicate a status through colour alone—include an icon, label, or text such as `AVAILABLE`.

The private panel must trap focus when opened, close with `Escape`, and return focus to its trigger. Forms need native validation plus a clear error message region. Respect `prefers-reduced-motion` for every non-essential animation.

## Design Guardrails

**Do:** use sharply cropped retail photography, physical display objects, editorial type blocks, exact route numbers, thin borders, one accent colour at a time, and concise retail language.

**Do not:** use stock office-team imagery, rounded SaaS cards, purple gradients, glassmorphism, serif-heavy luxury styling, blob shapes, generic `Learn More` buttons, or image-only text. The design must stay structured and practical beneath the visual drama.

## Stitch Build Order

1. Create the global palette, typography styles, top orange rule, and `C` stamp component.
2. Build the responsive header, footer, and page grid before detailed sections.
3. Build the scroll-hero static composition with all 3D display layers.
4. Add the ticker, featured panel, services grid, team profiles, conversion routes, method, and contact panel.
5. Create desktop and mobile variants for the header, hero, services, team, and conversion panels.
6. Add hover, focus, loading, panel-open, form-error, and receipt-success states.
7. Review at 1440px, 1024px, 768px, and 390px wide. Check that every essential label is readable and that all utility type has adequate contrast.
