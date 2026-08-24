/**
 * Shopfront Studio / Market Signal
 * Swiss retail wayfinding meets contemporary editorial art direction.
 * Use ink, counter cream, and signal tangerine; preserve the asymmetric aisle-map rhythm.
 */
import { useState } from "react";
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
      "Clear, shoppable sites that bring the order of a great shop floor to every screen.",
    detail: "Strategy · design · build",
    tone: "cream",
  },
  {
    number: "02",
    title: "Paid campaigns",
    description:
      "Campaign systems that turn a weekly offer, a new opening, or a seasonal moment into a local signal.",
    detail: "Creative · copy · rollout",
    tone: "orange",
  },
  {
    number: "03",
    title: "Retail identity",
    description:
      "Window graphics, launch kits, and visual rules that make every channel recognise the same shop.",
    detail: "Identity · art direction · toolkits",
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

  const closeMenu = () => setMenuOpen(false);

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
            <a href="#method" onClick={closeMenu}>Our method <ArrowRight size={18} /></a>
            <a href="#contact" onClick={closeMenu}>Let&apos;s talk <ArrowRight size={18} /></a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-rail" aria-hidden="true">
            <span>SCROLL TO STOCK UP</span>
            <ArrowDownRight size={19} />
          </div>
          <div className="hero-content">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Digital creative for local retail</div>
            <h1 id="hero-title">
              Your best<br />
              <em>window display</em><br />
              belongs online.
            </h1>
            <div className="hero-bottom-row">
              <p>Websites and ads with the clarity of a great shop floor—and enough edge to stop the scroll.</p>
              <a href="#scope" className="circle-link" aria-label="See what we do">
                <ArrowDownRight size={26} />
              </a>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src="/manus-storage/shopfront-hero_9ab16615.jpg"
              alt="A warm local market storefront with citrus displays and abstract orange window markers"
            />
            <div className="hero-ticket">
              <span>OPEN<br />FOR BUSINESS</span>
              <div className="ticket-mark">✳</div>
            </div>
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
              <span className="marker-orb">?</span>
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
              <p>One campaign language, working across landing pages, paid ads, social, menus, posters, and the place where customers make their final decision.</p>
              <div className="feature-tags">
                <span>Campaign creative</span><span>Retail launch</span><span>Content system</span>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="scope">
          <div className="service-heading">
            <div className="intro-label light-label">/ 02 — THE SCOPE</div>
            <h2>Small shop.<br />Big <em>signal.</em></h2>
            <p>Pick the lane you need—or bring us the whole aisle.</p>
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

        <section className="case-study-section">
          <div className="case-study-visual">
            <div className="window-crop">
              <img src="/manus-storage/shopfront-work_afd5a85a.jpg" alt="A neighborhood grocery storefront with orange graphic window framing" />
            </div>
            <div className="case-sticker">LOCAL<br />LOOKS<br />GOOD</div>
            <span className="image-caption">A street-side identity<br />that keeps working inside.</span>
          </div>
          <div className="case-study-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Field notes / retail identity</div>
            <h2>Make a name<br />on your <em>street.</em></h2>
            <p>Your customers do not separate the window, the website, and the social post. Neither do we. We build the cues that make a local business feel instantly familiar from every angle.</p>
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
              <div className="intro-label">/ 03 — THE METHOD</div>
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
          <div className="contact-orb" aria-hidden="true"><span>✦</span></div>
          <div className="contact-copy">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Let&apos;s make it visible</div>
            <h2>Ready to put<br />your shop <em>out front?</em></h2>
            <p>Bring the launch, refresh, promotion, or bigger retail question. We&apos;ll find the right first move together.</p>
          </div>
          <a className="contact-link" href="mailto:hello@shopfront.studio" aria-label="Email Shopfront Studio">
            <span>START A<br />CONVERSATION</span>
            <ArrowRight size={28} />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#top">SHOPFRONT<br />STUDIO</a>
        <p>Websites & advertising for the<br />places people buy from nearby.</p>
        <div className="footer-links"><a href="#scope">Services</a><a href="#method">Method</a><a href="#contact">Contact</a></div>
        <span>© 2026 / Built for local commerce</span>
      </footer>
    </div>
  );
}

function ArrowUpRightIcon() {
  return <span aria-hidden="true">↗</span>;
}
