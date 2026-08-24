/**
 * Shopfront Studio / Market Signal
 * Swiss retail wayfinding meets contemporary editorial art direction.
 * Use ink, counter cream, and signal tangerine; preserve the asymmetric aisle-map rhythm.
 */
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronRight,
  Menu,
  MoveUpRight,
  Sparkles,
  X,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "Shop websites",
    description:
      "Clear, shoppable sites shaped around your stock, your customers, and the way your team really works.",
    detail: "UX · development · launch",
    tone: "cream",
  },
  {
    number: "02",
    title: "Campaigns & edits",
    description:
      "Campaign creative and short-form video edits that turn a weekly offer or launch into a local signal.",
    detail: "Creative · video · rollout",
    tone: "orange",
  },
  {
    number: "03",
    title: "Retail identity",
    description:
      "Visual systems and launch kits that make every channel look like it belongs to the same shop.",
    detail: "Design · direction · toolkits",
    tone: "lime",
  },
];

const process = [
  ["01", "Walk the floor", "We listen to the daily reality of your counter, catalogue, neighbourhood, and customers."],
  ["02", "Find the signal", "We turn the clearest reason to visit into a campaign and a digital experience with a point of view."],
  ["03", "Put it in the window", "We ship the assets, pages, and playbook needed to stay active long after launch day."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroSceneRef = useRef<HTMLElement>(null);
  const teamSectionRef = useRef<HTMLElement>(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const section = teamSectionRef.current;
    if (!section) return;

    let frame = 0;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const schedulePaint = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = section.getBoundingClientRect();
        const progress = clamp((window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.16));
        const benitto = clamp((progress - 0.17) / 0.42);
        const abisheik = clamp((progress - 0.42) / 0.42);

        section.style.setProperty("--benitto-opacity", `${0.2 + benitto * 0.8}`);
        section.style.setProperty("--benitto-y", `${(1 - benitto) * 58}px`);
        section.style.setProperty("--benitto-turn", `${(1 - benitto) * -3}deg`);
        section.style.setProperty("--benitto-skills", `${benitto}`);
        section.style.setProperty("--abisheik-opacity", `${0.2 + abisheik * 0.8}`);
        section.style.setProperty("--abisheik-y", `${(1 - abisheik) * 58}px`);
        section.style.setProperty("--abisheik-turn", `${(1 - abisheik) * 3}deg`);
        section.style.setProperty("--abisheik-skills", `${abisheik}`);
      });
    };

    schedulePaint();
    window.addEventListener("scroll", schedulePaint, { passive: true });
    window.addEventListener("resize", schedulePaint);
    return () => {
      window.removeEventListener("scroll", schedulePaint);
      window.removeEventListener("resize", schedulePaint);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const section = heroSceneRef.current;
    if (!section) return;

    let frame = 0;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    const paintScene = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / range);
      const eased = progress * progress * (3 - 2 * progress);

      section.style.setProperty("--scene-scale", `${1 + eased * 0.1}`);
      section.style.setProperty("--scene-image-x", `${eased * -42}px`);
      section.style.setProperty("--scene-window-x", `${eased * -86}px`);
      section.style.setProperty("--scene-window-y", `${eased * -30}px`);
      section.style.setProperty("--rail-back-x", `${eased * 78}px`);
      section.style.setProperty("--rail-mid-x", `${eased * -52}px`);
      section.style.setProperty("--rail-front-y", `${eased * -83}px`);
      section.style.setProperty("--disc-y", `${eased * -66}px`);
      section.style.setProperty("--disc-turn", `${eased * 22}deg`);
      section.style.setProperty("--plinth-x", `${eased * 62}px`);
      section.style.setProperty("--copy-y", `${eased * -28}px`);
      section.style.setProperty("--copy-opacity", `${1 - eased * 0.16}`);
      section.style.setProperty("--scene-veil", `${eased * 0.58}`);
      section.style.setProperty("--hint-opacity", `${1 - progress * 3.3}`);
      section.style.setProperty("--hint-scale", `${Math.min(1, progress * 2.2)}`);
    };

    const schedulePaint = () => {
      if (!frame) frame = window.requestAnimationFrame(paintScene);
    };

    paintScene();
    window.addEventListener("scroll", schedulePaint, { passive: true });
    window.addEventListener("resize", schedulePaint);
    return () => {
      window.removeEventListener("scroll", schedulePaint);
      window.removeEventListener("resize", schedulePaint);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site-shell">
      <div className="top-rule" />
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Shopfront Studio home" onClick={closeMenu}>
          <img src="/manus-storage/shopfront-logo_1518a960.png" alt="Shopfront Studio symbol" />
          <span>SHOPFRONT<br />STUDIO</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">Selected work</a>
          <a href="#scope">What we do</a>
          <a href="#team">The team</a>
          <a href="#method">Our method</a>
        </nav>

        <a className="header-cta" href="#contact">
          Let&apos;s talk <ArrowUpRightIcon />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#work" onClick={closeMenu}>Selected work <ArrowRight size={18} /></a>
            <a href="#scope" onClick={closeMenu}>What we do <ArrowRight size={18} /></a>
            <a href="#team" onClick={closeMenu}>The team <ArrowRight size={18} /></a>
            <a href="#method" onClick={closeMenu}>Our method <ArrowRight size={18} /></a>
            <a href="#contact" onClick={closeMenu}>Let&apos;s talk <ArrowRight size={18} /></a>
          </nav>
        )}
      </header>

      <main id="top">
        <section ref={heroSceneRef} className="scroll-hero-section" aria-labelledby="hero-title">
          <div className="scroll-hero-stage">
          <div className="hero-rail" aria-hidden="true">
            <span>SCROLL THE DISPLAY</span>
            <ArrowDownRight size={19} />
          </div>
          <div className="retail-scene" aria-hidden="true">
            <img className="scene-atmosphere" src="/manus-storage/shopfront-3d-window-keyframe_a6906135.jpg" alt="" />
            <div className="scene-window-crop">
              <img src="/manus-storage/shopfront-hero_9ab16615.jpg" alt="" />
            </div>
            <span className="scene-rail scene-rail-back" />
            <span className="scene-rail scene-rail-mid" />
            <span className="scene-rail scene-rail-front" />
            <span className="scene-disc"><i>OPEN</i></span>
            <span className="scene-plinth" />
            <span className="scene-pedestal" />
            <span className="scene-sheen" />
          </div>
          <div className="scroll-hero-copy">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Digital creative for local retail</div>
            <h1 id="hero-title">
              Your best<br />
              <em>window display</em><br />
              belongs online.
            </h1>
            <div className="hero-bottom-row">
              <p>A two-person studio pairing precise development with design and video edits that stop the scroll.</p>
              <a href="#scope" className="circle-link" aria-label="See what we do">
                <ArrowDownRight size={26} />
              </a>
            </div>
          </div>
          <div className="scene-system-tag" aria-hidden="true">
            <span>DISPLAY SYSTEM</span>
            <strong>01</strong>
          </div>
          <div className="scene-scroll-cue" aria-hidden="true">
            <span>ENTER THE WINDOW</span>
            <i><b /></i>
          </div>
          <div className="scene-exit-veil" aria-hidden="true" />
          </div>
          <div className="scroll-beat beat-one" aria-hidden="true">
            <span>01 / PULL THE STREET IN</span>
            <strong>Shop-window thinking,<br />built for the scroll.</strong>
          </div>
          <div className="scroll-beat beat-two" aria-hidden="true">
            <span>02 / SET THE OFFER</span>
            <strong>Every layer earns<br />its place in the display.</strong>
          </div>
          <div className="scroll-beat beat-three" aria-hidden="true">
            <span>03 / TAKE IT WITH YOU</span>
            <strong>Now the story<br />hits the street.</strong>
          </div>
        </section>

        <section className="ticker" aria-label="Studio capabilities">
          <div className="ticker-track">
            <span>WE MAKE RETAIL <i>FEEL</i> CURRENT</span><b>✦</b>
            <span>WE MAKE RETAIL <i>FEEL</i> CURRENT</span><b>✦</b>
            <span>WE MAKE RETAIL <i>FEEL</i> CURRENT</span><b>✦</b>
          </div>
        </section>

        <section className="intro-section" id="work">
          <div className="intro-label">/ 01 — THE WORK</div>
          <div className="intro-grid">
            <div className="intro-quote">
              <span className="marker-orb">01</span>
              <p>Commerce has changed. <strong>Neighbourhood attention</strong> is still earned one smart message at a time.</p>
            </div>
            <div className="intro-side">
              <p>We make the digital side of a shop feel as considered as the physical one: readable, memorable, and ready to sell.</p>
              <a href="#contact" className="text-link">Tell us what&apos;s on your shelf <ArrowRight size={18} /></a>
            </div>
          </div>
          <div className="feature-panel">
            <div className="feature-image-frame">
              <img src="/manus-storage/shopfront-campaign_ec6714db.jpg" alt="Abstract retail campaign collage with citrus and orange promotion stickers" />
              <span className="vertical-stamp">CAMPAIGN DESIGN</span>
            </div>
            <div className="feature-copy">
              <div className="feature-counter"><span>01</span><span>—</span><span>Featured system</span></div>
              <h2>Give every<br /><em>offer</em> a point<br />of view.</h2>
              <p>One campaign language, working across the website, paid ads, social, short-form cuts, menus, posters, and the place where customers make their final decision.</p>
              <div className="feature-tags">
                <span>Campaign creative</span><span>Retail launch</span><span>Content system</span>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="scope">
          <div className="service-heading">
            <div className="intro-label light-label">/ 02 — THE SCOPE</div>
            <h2>Small team.<br />Big <em>signal.</em></h2>
            <p>Bring us one sharp need—or put both halves of the studio to work.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className={`service-card ${service.tone}`} key={service.number}>
                <div className="service-top"><span>{service.number}</span><MoveUpRight size={23} /></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-detail">{service.detail}</div>
              </article>
            ))}
          </div>
          <div className="service-footnote"><Sparkles size={15} /> Built to be picked up by real teams—not left in a deck.</div>
        </section>

        <section ref={teamSectionRef} className="team-section" id="team" aria-labelledby="team-title">
          <div className="team-aisle-strip">
            <div><img src="/manus-storage/shopfront-logo_1518a960.png" alt="" /><span>AISLE 03 / TWO-PERSON STUDIO</span></div>
            <span>DEV ↔ VISUAL</span>
          </div>
          <div className="team-heading">
            <div className="intro-label">/ 03 — THE TEAM</div>
            <h2 id="team-title">Two people.<br />One <em>retail</em><br />signal.</h2>
            <p>Benitto makes the digital experience move. Abisheik makes the visual story land. Together, they turn shop-floor thinking into a connected local-commerce system.</p>
          </div>
          <div className="team-roles">
            <article className="team-card build-card">
              <div className="team-card-top"><span>01 / THE BUILDER</span><span className="role-glyph">01</span></div>
              <div className="role-index"><small>DEVELOPMENT LEAD</small>BENITTO<br />JOSHUA</div>
              <h3>Build the<br />digital shelf.</h3>
              <p>Benitto turns the studio’s ideas into interactive experiences: from launch-ready websites to playable worlds and AI-powered tools.</p>
              <div className="role-tags skill-tags"><span>Game Dev</span><span>Web Dev</span><span>AI LLMs</span></div>
            </article>
            <article className="team-card visual-card">
              <div className="team-card-top"><span>02 / THE VISUAL LEAD</span><span className="role-glyph">02</span></div>
              <div className="role-index"><small>VISUAL LEAD</small>ABISHEIK</div>
              <h3>Make the<br />offer move.</h3>
              <p>Abisheik gives campaigns their pace, polish, and stopping power across motion edits, web design, and on-brand visual details.</p>
              <div className="role-tags skill-tags"><span>Video Editor</span><span>Web Designer</span><span>Photoshop Designer</span></div>
            </article>
          </div>
          <p className="team-connector"><span>Scroll to see code and craft become one signal.</span><ArrowRight size={18} /></p>
        </section>

        <section className="case-study-section">
          <div className="case-study-visual">
            <div className="window-crop">
              <img src="/manus-storage/shopfront-work_afd5a85a.jpg" alt="A neighborhood grocery storefront with orange graphic window framing" />
            </div>
            <div className="case-sticker">LOCAL<br />LOOKS<br />GOOD</div>
            <span className="image-caption"><img src="/manus-storage/shopfront-logo_1518a960.png" alt="" /> A street-side identity<br />that keeps working inside.</span>
          </div>
          <div className="case-study-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Field notes / retail identity</div>
            <h2>Make a name<br />on your <em>street.</em></h2>
            <p>Your customers do not separate the window, the website, the campaign cut, and the social post. Neither do we. We build the cues that make a local business feel instantly familiar from every angle.</p>
            <ul className="check-list">
              <li><Check size={16} /> Distinctive brand building blocks</li>
              <li><Check size={16} /> Built for seasonal changeovers</li>
              <li><Check size={16} /> Designed around real buying moments</li>
            </ul>
          </div>
        </section>

        <section className="method-section" id="method">
          <div className="method-top">
            <div>
              <div className="intro-label">/ 04 — THE METHOD</div>
              <h2>From shop floor<br />to <em>scroll stop.</em></h2>
            </div>
            <p>No handoff maze. No vague ‘brand moment.’ Just a tight retail loop that gets sharper as it moves.</p>
          </div>
          <div className="process-grid">
            {process.map(([number, title, description]) => (
              <article className="process-step" key={number}>
                <span className="process-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <ChevronRight size={22} />
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-orb" aria-hidden="true"><span>GET<br />VISIBLE</span></div>
          <div className="contact-copy">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Let&apos;s make it visible</div>
            <h2>Ready to put<br />your shop <em>out front?</em></h2>
            <p>Bring the launch, refresh, promotion, or bigger retail question. You&apos;ll work directly with a developer and a designer-editor from the first move.</p>
          </div>
          <a className="contact-link" href="mailto:hello@shopfront.studio" aria-label="Email Shopfront Studio">
            <span>START A<br />CONVERSATION</span>
            <ArrowRight size={28} />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#top"><img src="/manus-storage/shopfront-logo_1518a960.png" alt="" /> <span>SHOPFRONT<br />STUDIO</span></a>
        <p>Development, design & video for the<br />places people buy from nearby.</p>
        <div className="footer-links"><a href="#scope">Services</a><a href="#team">Team</a><a href="#method">Method</a><a href="#contact">Contact</a></div>
        <span>© 2026 / Built for local commerce</span>
      </footer>
    </div>
  );
}

function ArrowUpRightIcon() {
  return <span aria-hidden="true">↗</span>;
}
