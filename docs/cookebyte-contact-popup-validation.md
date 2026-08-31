# CookeByte Contact Popup Validation

The contact directory was consolidated into two footer-adjacent triggers inside the dark Contact section: **WhatsApp the team** and **Call the team**. Each opens a single in-page CookeByte panel containing both team members, instead of exposing two separate phone links in the main section.

The WhatsApp panel contains prefilled click-to-chat links for Benitto Joshua at `+91 638 191 4606` and Abisheik at `+91 890 334 6957`. The phone panel contains matching `tel:` links. Both panels use the existing private-panel backdrop, close button, cream surface, orange offset treatment, and lime/orange signal cards.

Source validation confirmed both active and static production branches contain the two popup modes, both WhatsApp targets, both phone targets, and the accessible “Close contact options” control. TypeScript validation, tests, and production builds passed for both branches. WhatsApp target URLs returned HTTP 200. Full-page desktop and mobile previews were captured after the update; the public page remains visually stable and the Contact trigger layout stacks at the mobile breakpoint.

The popup controls are designed to close with the visible close button, backdrop click, or Escape, and they lock document scrolling while open. WhatsApp opens a new tab or the WhatsApp app; phone links open the device dialler. No automatic message is sent by the website.
