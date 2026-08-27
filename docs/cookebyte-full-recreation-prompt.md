# Full CookeByte Website Recreation Prompt

Copy everything inside the prompt block below into Stitch or another AI website builder.

```text
Create a complete, polished, responsive one-page marketing website for **CookeByte**, a two-person retail creative studio. The studio designs and builds websites, campaign creative, retail identity, and short-form video for local shops, marts, supermarkets, and neighbourhood brands.

This must feel like a high-end digital retail display—not a generic agency, SaaS product, startup landing page, or template portfolio. The art direction is **Swiss retail wayfinding + modern editorial print design + a cinematic 3D shop-window installation**. The page has strong visual rhythm, precise grids, oversized typography, numbered routes, ticket labels, 3D retail-display objects, and clean functional calls to action.

## Design personality

The core metaphor is “a shop window built for the scroll.” Every section should feel like it belongs to one physical display system: rails, plinths, route labels, pricing tickets, aisle numbers, and directional arrows. It is energetic and slightly playful, but still professional, trustworthy, and readable.

Use hard edges, narrow 1px divider lines, asymmetrical layouts, large type blocks, compact Monocraft utility labels, and dimensional objects with believable shadows. Avoid soft rounded SaaS cards, purple/blue gradients, glassmorphism, generic blobs, stock corporate office imagery, excessive neon, enormous empty hero whitespace, or luxury serif aesthetics.

## Exact visual system

Use this palette exactly:
- Ink / near-black: #171817
- Cream / paper: #F4F0E8
- Soft cream: #EBE5D9
- Signal orange: #FF5A36
- Lime signal: #D5E668
- Divider line: rgba(23, 24, 23, 0.22)

Colour use: cream is the main page field, ink is the structural dark field, orange is the strongest action/emphasis colour, and lime is used for route labels, status markers, tickets, and selected moments. Do not put orange or lime on every surface. Use contrast deliberately.

Typography:
- Use **Archivo Black** for all display headlines and large card titles. Tight tracking around -0.07em and line-height around 0.88–0.92.
- Use **DM Sans** for paragraphs and body copy. Use 15–17px with 1.45–1.55 line height.
- Use **Monocraft** for buttons, navigation, section labels, metadata, route counters, footer directory text, and form labels. If unavailable, use IBM Plex Mono or Space Mono.
- Use a lighter geometric sans such as Space Grotesk for the highlighted word in display headlines.

All major headers are left-aligned, very large, compact, and split across intentional lines. Highlight only one word or phrase with orange or lime, e.g. “Small team. Big signal.”

## Global components

Create these reusable visual components:

1. **CookeByte C stamp:** A lime square with a clipped lower-right corner and a bold black “C” inside. Use it in route bars, section labels, the loader, panels, and footer.
2. **Route bar:** A slim ink strip with a left-side label and right-side metadata in Monocraft. Example: “C  ROUTE 04 / WORK WITH US” on the left, “PROJECT · PRICING · PARTNERS” on the right.
3. **Utility tag:** A 1px outlined, uppercase Monocraft label with 6–9px padding.
4. **Primary control:** Ink background, cream Monocraft text, orange hover background, arrow aligned to the right. On press, scale to 0.97.
5. **Circle call-to-action:** Lime or orange filled circle with small uppercase copy and a directional arrow. Use slight rotation or a 2px lift on hover.
6. **Hard offset shadow:** Use sharp 7–13px diagonal orange or ink offset shadows on key cards and panels. Do not blur every shadow.
7. **Private overlay panel:** Cream content slab above a dark translucent background, with an orange offset backplane. Hard edges, close button in the upper right, scrollable content, and visible focus states.

## Full page structure and content

### 0. Launch loader

Start with an optional full-screen launch loader. Background ink. Add an 8px orange top bar. Center a lime clipped-corner C stamp above a large Monocraft CookeByte wordmark that resolves from a short pixel/glitch shuffle. Include small labels:
- “COOKEBYTE / SIGNAL BOOT” at top left
- “RETAIL CREATIVE / DIGITAL DISPLAY” above the wordmark
- “COMPILING THE WINDOW” beneath it
- “01 / OPENING THE DISPLAY” at bottom left
- A lime loading bar across the bottom
- “TAP FOR SOUND” as a small lime control
- “EST. 2026” at bottom right

Use a large, subtle concentric ring behind the wordmark and one oversized orange circle offset at the top right. The live version should last approximately three seconds then fade and lift up; provide a reduced-motion version that resolves quickly.

### 1. Sticky site header

Create a cream header with a thin bottom rule. On the left, show the lime C stamp and a two-line pixel wordmark:
- “COOKE” in ink
- “BYTE” in orange
- “CREATIVE SYSTEMS” in tiny utility copy below

On desktop, include compact navigation links: “Selected work”, “What we do”, “The team”, “Work with us”, “Our method”. On the right, provide a dark rectangular “Let’s talk ↗” CTA and a small lime sound toggle.

On mobile, hide the full navigation and show a compact menu / route trigger. Keep touch targets generous and avoid the custom desktop cursor on touch devices.

### 2. Entry / scroll-to-cook window

After the loader, show a tall dark entry moment. Place a portrait-oriented high-quality image or visual of a futuristic retail creative installation in the center. Overlay “SCROLL TO COOK” in Monocraft. Add an orange-and-lime headline treatment reading:
- “BECOME A PARTNER”
- “OF COOKEBYTES”

In a live site, this framed window expands smoothly as the visitor scrolls. In the static Stitch design, show the fully framed scene plus a subtle “SCROLL TO OPEN ↓” cue.

### 3. Immersive 3D shop-window hero

Build the first major hero as an ink-background 3D retail-display composition. On desktop, add a narrow 67px vertical left rail reading “SCROLL THE DISPLAY”. The hero has a text field on the left and 3D display objects on the right.

Hero copy:
- Utility line with orange dot: “DIGITAL CREATIVE FOR LOCAL RETAIL”
- Large heading: “What are we / Gonna Cook?” with “Gonna Cook?” in signal orange
- Supporting copy: “A two-person studio pairing precise development with design and video edits that stop the scroll.”
- Lime circle arrow CTA linking to the services section
- Small metadata tag: “DISPLAY SYSTEM 01”
- Scroll cue: “ENTER THE WINDOW”

3D composition requirements:
- Use a dark retail interior or storefront image as the background.
- Add a tilted thick-framed display/window containing a campaign or shop visual.
- Add three orange industrial rails at different depths and angles.
- Add a lime dimensional disc labelled “OPEN” with a small reflection.
- Add a pale geometric plinth and a dark pedestal to anchor the scene.
- Use subtle glass reflections, hard drop shadows, perspective, and depth. No floating random icons.

For the live site, make the window, rails, disc, and plinth move very slightly at different speeds on scroll. As the hero finishes, fade into the cream content field. Motion must not be required to understand the page.

### 4. Capability ticker

Add a full-width lime ticker strip with black borders above and below. It repeats the phrase:
“WE MAKE RETAIL FEEL CURRENT ✦ WE MAKE RETAIL FEEL CURRENT ✦ WE MAKE RETAIL FEEL CURRENT”

Use Archivo Black for the phrase, with “FEEL” in orange. In a live site, slowly loop this ticker horizontally. Disable it for reduced-motion visitors.

### 5. Featured system statement

Create a wide ink panel with a thin internal grid/rail texture on the right. Add a lime C stamp at the top and a dimensional lime circle with an orange offset shadow at the lower right.

Content:
- Label: “01 — FEATURED SYSTEM”
- Headline: “Give every / offer a point / of view.” with “offer” in orange
- Paragraph: “One campaign language, working across the website, paid ads, social, short-form cuts, menus, posters, and the place where customers make their final decision.”
- Tags: “CAMPAIGN CREATIVE”, “RETAIL LAUNCH”, “CONTENT SYSTEM”

Keep this section text-led, editorial, and high contrast. Do not make it a conventional portfolio grid.

### 6. Services section

Use a bold orange full-width field with a very subtle print/paper grain texture. Add a cream C ticket near the edge. Header layout is asymmetrical: section label at upper left, large headline on the left, a compact explanation on the right.

Content:
- Label: “/ 02 — THE SCOPE”
- Heading: “Small team. / Big signal.” with “signal” in cream
- Supporting copy: “Bring us one sharp need—or put both halves of the studio to work.”

Below, create three contiguous bordered cards with no rounded corners:

Card 01: “Shop websites”
Description: “Clear, shoppable sites shaped around your stock, your customers, and the way your team really works.”
Detail: “UX · DEVELOPMENT · LAUNCH”

Card 02: “Campaigns & edits”
Description: “Campaign creative and short-form video edits that turn a weekly offer or launch into a local signal.”
Detail: “CREATIVE · VIDEO · ROLLOUT”

Card 03: “Retail identity”
Description: “Visual systems and launch kits that make every channel look like it belongs to the same shop.”
Detail: “DESIGN · DIRECTION · TOOLKITS”

Each card includes its number, a northeast arrow, and the detail label. Live hover state: card becomes ink, type becomes cream, card lifts 7px with a sharp offset shadow. Keep the card grid stacked and readable on mobile.

Under the cards, add the footnote: “✦ Built to be picked up by real teams—not left in a deck.”

### 7. Team section

Use a cream background with faint orange and lime concentric outline shapes cropped off the upper right. Begin with an ink route strip:
- Left: “C  AISLE 03 / TWO-PERSON STUDIO”
- Right: “DEV ↔ VISUAL”

Heading and supporting copy:
- Label: “/ 03 — THE TEAM”
- Heading: “Two people. / Two skill sets. / One signal.” with “skill sets.” in orange
- Copy: “Two sides of the same shopfront: Benitto builds what customers use; Abisheik shapes what customers notice and remember.”

Create two tall, equally weighted interactive profile cards.

Profile card 01, dark:
- Accent lime
- Number: “01”
- Role: “Development lead”
- Name: “Benitto Joshua”
- Handle/status: “@benitto.builds  • Building live”
- Skills: “GAME DEV”, “WEB DEV”, “AI LLMS”
- Links: “MAIL”, “GITHUB”, “PORTFOLIO”
- Use a temporary storefront/retail image, clearly structured to be replaceable later.

Profile card 02, light:
- Accent orange
- Number: “02”
- Role: “Visual lead”
- Name: “Abisheik”
- Handle/status: “@abisheik.edits  • Cutting fresh”
- Skills: “VIDEO EDITOR”, “WEB DESIGNER”, “GRAPHIC DESIGNER”
- Links: “MAIL”, “GITHUB”, “INSTAGRAM”
- Use a temporary campaign/video-editorial image, clearly structured to be replaceable later.

In the live build, cards get a restrained pointer tilt, cursor-following radial glare, image scale of 1.05, and accent-colour edge/shadow. Remove these desktop-only effects on touch devices and in reduced-motion mode. Include the small line: “Move across each card to read the skill signal. →”

### 8. Work With Us conversion section

Use an ink background and a route bar:
- “C  ROUTE 04 / WORK WITH US”
- “PROJECT · PRICING · PARTNERS”

Content:
- Label: “/ 04 — MAKE THE MOVE”
- Heading: “One shop. / A whole network.” with “network” in lime
- Copy: “Whether you need a better digital shopfront, a clear estimate, or one visual system across multiple locations, choose the route that fits.”

Add three bordered conversion route cards:

1. “01 / TERMS & CONDITIONS”
   Heading: “Know the terms.”
   Copy: “Clear scope, working rhythm, and handover expectations before the work begins.”
   Action: “VIEW TERMS →”

2. “02 / PRICING GUIDE”
   Heading: “Get the right quote.” with “right” in orange
   Copy: “We price around your scope, retail footprint, and launch timeline—not a one-size package.”
   Action: “VIEW STARTING PACKAGES →”

3. “03 / BRING US THE BRIEF”
   Heading: “Bring us the brief.” with “brief” in orange
   Copy: “For a new website, campaign, video edit, or a full shopfront refresh.”
   Action: “OPEN PROJECT BRIEF →”

Footnote: “Need a different route? Send the short version. We’ll map the right next move together.”

The cards open private in-page panels. Do not show starting package pricing in the main public scroll flow.

### 9. Private panel states

Create three visual panel screens that use the same cream slab with orange offset-shadow styling.

Terms panel:
- Label: “C  TERMS & CONDITIONS”
- Heading: “Read the legal suite.”
- Contained document/PDF viewer placeholder.

Pricing panel:
- Label: “C  PRIVATE STARTING PACKAGES”
- Heading: “Pick the right entry point.”
- Three pricing cards: Basic shop website “₹10K”, Online shop setup “₹10K+”, Immersive shopfront “₹13K+”.
- Explain that exact pricing is scope-based and private.

Project brief panel:
- Label: “PRIVATE PROJECT BRIEF”
- Heading: “Send the short version.”
- Copy: “Tell us what you are making. We’ll record the project brief and generate an in-site CookeByte receipt.”
- Fields: Your name; Shop or business; Email for your receipt record; Project type; Budget range; What needs to move?; consent checkbox.
- Primary action: “CREATE PROJECT RECEIPT →”

Include a success receipt panel after submission:
- Heading: “Brief received.”
- Label: “C  PROJECT RECEIPT / 01”
- Prominent orange receipt ID such as “CB-YYYYMMDD-XXXXXX”
- Logged time, contact, business, project type, budget, email on file, and submitted brief summary.
- Note: “In-site receipt created. Automated email delivery will be available once CookeByte connects an email service.”
- Actions: “BACK TO THE SITE →” and “SEND ANOTHER BRIEF”

### 10. Method section

Use a quiet cream background to reset the visual rhythm after the conversion area. Add an orange C stamp and:
- Label: “/ 05 — THE METHOD”
- Heading: “From shop floor / to scroll stop.” with “scroll stop.” in orange
- Copy: “No handoff maze. No vague ‘brand moment.’ Just a tight retail loop that gets sharper as it moves.”

Use three adjacent, hard-bordered process cards:

01 — Walk the floor
“We listen to the daily reality of your counter, catalogue, neighbourhood, and customers.”

02 — Find the signal
“We turn the clearest reason to visit into a campaign and a digital experience with a point of view.”

03 — Put it in the window
“We ship the assets, pages, and playbook needed to stay active long after launch day.”

Add one small chevron to each card. No photography in this section.

### 11. Contact finale

Create a final high-contrast ink section. Let a large lime circle crop in from the upper edge. Add an orange C stamp and an overlapping pair of right-side circles: lime “START A CONVERSATION” and orange “GET VISIBLE”.

Copy:
- Utility line: “LET’S MAKE IT VISIBLE” with orange dot
- Heading: “Ready to put / your shop out front?” with “out front?” in lime
- Paragraph: “Bring the launch, refresh, promotion, or bigger retail question. You’ll work directly with a developer and a designer-editor from the first move.”
- Main CTA: “START A CONVERSATION →”

### 12. Footer

Use a compact ink footer with the C stamp and CookeByte wordmark. Include:
- “Development, design & video for the places people buy from nearby.”
- Links: “Services”, “Team”, “Method”, “Contact”, “GitHub ↗”
- “© 2026 / Built for local commerce”

## Interaction and motion requirements

- Use a 3-second optional loader followed by a 460ms upward fade/lift.
- Use a cinematic scroll expansion for the entry window and a light parallax shift within the 3D hero.
- Use a slow horizontal capability ticker on desktop.
- Use 180–220ms custom-eased card, button, and link transitions. Buttons should feel tactile on click with scale(0.97).
- Utility buttons use a short 330ms pixel/letter-spacing flicker on hover only.
- Profile cards get subtle desktop pointer tilt and glare only. Do not add it on mobile.
- The desktop custom cursor can be a small targeting reticle that reacts to interactive controls, but it must be disabled for touch devices and reduced motion.
- Preserve keyboard navigation, native focus visibility, and clear loading/error/success form states.
- For prefers-reduced-motion, remove scroll parallax, ticker movement, card tilt, hover glitch, loader shuffle, and bounce. Render the final static state promptly.

## Responsive rules

Desktop above 850px: use the asymmetric header, vertical hero rail, three-column service grid, two-column team cards, and three-column process grid.

Tablet 600–850px: reduce headline scale, simplify the hero depth, keep clear spacing, and preserve content hierarchy.

Mobile under 600px: use 20–24px horizontal padding; hide desktop navigation; use a compact route-menu button; stack all card groups into one column; remove the vertical hero rail; simplify the hero to a tall central framed retail image; preserve large enough display typography; do not shrink card content into cramped multi-column layouts.

## Accessibility and quality bar

- Use semantic headings, native buttons, links, labels, and form controls.
- Do not put essential information inside imagery.
- Maintain high contrast: cream type on ink, ink type on cream/lime/orange.
- Give all visible interactive elements clear focus states.
- All in-page panels must close with Escape and a visible close control.
- Use alt text for meaningful images and hide decorative 3D geometry from screen readers.
- Avoid fabricated client reviews, ratings, testimonials, or fake logos.

## Final visual guardrails

The site should look editorial, retail-specific, and designed by a small creative studio with strong code and visual craft. It should feel physically constructed from display materials, not automatically assembled from soft rounded components. Keep typography dominant, imagery intentional, and every section distinct while preserving the same ink/cream/orange/lime system.
```
