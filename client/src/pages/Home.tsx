/**
 * Shopfront Studio / Market Signal
 * Swiss retail wayfinding meets contemporary editorial art direction.
 * Use ink, counter cream, and signal tangerine; preserve the asymmetric aisle-map rhythm.
 */
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronRight,
  Menu,
  MoveUpRight,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import InteractiveSkillCard from "@/components/InteractiveSkillCard";
import LaunchLoader from "@/components/LaunchLoader";
import RouteSidebar from "@/components/RouteSidebar";
import ScrollExpand from "@/components/ScrollExpand";
import { useSiteSound } from "@/contexts/SiteSoundContext";
import { trpc } from "@/lib/trpc";

type BriefReceipt = {
  receiptId: string;
  createdAt: Date;
  name: string;
  business: string;
  email: string;
  projectType: string;
  budget: string;
  details: string;
};

type ProjectType = "Basic shop website" | "E-commerce setup" | "3D website" | "Video ad campaign" | "Dealership or partnership" | "Not sure yet";
type BudgetRange = "Up to ₹10K" | "₹10K–₹25K" | "₹25K–₹50K" | "₹50K+" | "Let's discuss";

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

const packages = [
  {
    number: "01",
    kind: "SHOP SHOWCASE",
    title: "Basic shop<br />website",
    price: "₹10K",
    note: "Starting package",
    description: "A focused digital shopfront for presenting your business, story, features, and the reasons customers should walk in.",
    points: ["Shop-first presentation", "Feature-led layout", "Built for enquiries"],
    tone: "showcase-plan",
  },
  {
    number: "02",
    kind: "E-COMMERCE",
    title: "Online shop<br />setup",
    price: "₹10K+",
    note: "Flexible to your scope",
    description: "For a selling-ready storefront shaped around your catalogue, customer journey, and the complexity of your setup.",
    points: ["Catalogue-ready structure", "Scope-led build", "Designed to sell"],
    tone: "commerce-plan",
  },
  {
    number: "03",
    kind: "3D WEBSITE",
    title: "Immersive<br />shopfront",
    price: "₹13K+",
    note: "Flexible to your spec",
    description: "For stores that need motion, depth, and a memorable digital window experience built around a more ambitious brief.",
    points: ["Interactive depth", "3D-led direction", "Custom scope"],
    tone: "immersive-plan",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [siteReady, setSiteReady] = useState(false);
  const [briefStatus, setBriefStatus] = useState("");
  const [briefReceipt, setBriefReceipt] = useState<BriefReceipt | null>(null);
  const [privatePanel, setPrivatePanel] = useState<"terms" | "pricing" | "brief" | null>(null);
  const { soundEnabled, toggleSound } = useSiteSound();
  const heroSceneRef = useRef<HTMLElement>(null);
  const teamSectionRef = useRef<HTMLElement>(null);

  const submitProjectBrief = trpc.projectBrief.submit.useMutation();

  const closeMenu = () => setMenuOpen(false);

  const openPrivatePanel = (panel: "terms" | "pricing" | "brief") => {
    setBriefStatus("");
    if (panel === "brief") setBriefReceipt(null);
    setPrivatePanel(panel);
  };

  const closePrivatePanel = () => setPrivatePanel(null);

  const handleBriefSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const submission = {
      name: String(values.get("name") || "").trim(),
      business: String(values.get("business") || "").trim(),
      email: String(values.get("email") || "").trim(),
      projectType: String(values.get("projectType") || "") as ProjectType,
      budget: String(values.get("budget") || "") as BudgetRange,
      details: String(values.get("details") || "").trim(),
      receiptConsent: (values.get("receiptConsent") === "on") as true,
    };

    setBriefStatus("");
    submitProjectBrief.mutate(submission, {
      onSuccess: (receipt) => {
        setBriefReceipt({
          ...submission,
          receiptId: receipt.receiptId,
          createdAt: new Date(receipt.createdAt),
        });
      },
      onError: (error) => {
        setBriefStatus(error.message || "Your brief could not be recorded right now. Please try again in a moment.");
      },
    });
  };

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

  useEffect(() => {
    if (!privatePanel) return;
    const originalOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePrivatePanel();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [privatePanel]);

  return (
    <div className={`site-shell${siteReady ? " site-shell--ready" : " site-shell--loading"}`}>
      {!siteReady && <LaunchLoader onComplete={() => setSiteReady(true)} />}
      <div className="top-rule" />
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="CookeByte home" onClick={closeMenu}>
          <img className="cookebyte-header-logo" src="/manus-storage/cookebyte-header-logo_097e440a.png" alt="CookeByte" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">Selected work</a>
          <a href="#scope">What we do</a>
          <a href="#team">The team</a>
          <a href="#work-with-us">Work with us</a>
          <a href="#method">Our method</a>
        </nav>

        <a className="header-cta mono-glitch" href="#contact">
          Let&apos;s talk <ArrowUpRightIcon />
        </a>
        <button type="button" className="header-sound-toggle mono-glitch" onClick={toggleSound} aria-pressed={soundEnabled} aria-label={soundEnabled ? "Mute site sounds" : "Enable site sounds"}>
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}<span>{soundEnabled ? "SOUND" : "MUTED"}</span>
        </button>

        <button
          className="menu-button sidebar-trigger"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <RouteSidebar open={menuOpen} onClose={closeMenu} />
      </header>

      <main>
        {siteReady && <ScrollExpand src="/media/cookebyte-entrance-retail-creative_e936c541.jpg" alt="CookeByte digital retail creative installation" title="SCROLL TO COOK"><p>WEBSITES / CAMPAIGNS / VIDEO / IDENTITY</p><strong className="partner-callout"><span>BECOME A PARTNER</span><em>OF COOKEBYTES</em></strong></ScrollExpand>}
        <section ref={heroSceneRef} className="scroll-hero-section" aria-labelledby="hero-title">
          <div className="scroll-hero-stage">
          <div className="hero-rail" aria-hidden="true">
            <span>SCROLL THE DISPLAY</span>
            <ArrowDownRight size={19} />
          </div>
          <div className="retail-scene" aria-hidden="true">
            <img className="scene-atmosphere" src="/media/shopfront-3d-window-keyframe_a6906135.jpg" alt="" />
            <div className="scene-window-crop">
              <img src="/media/shopfront-hero_9ab16615.jpg" alt="" />
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
              What are we<br />
              <em>Gonna Cook?</em>
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

        <section className="feature-panel feature-panel--text" id="work" aria-labelledby="feature-title">
          <span className="feature-stamp" aria-hidden="true">C</span>
          <div className="feature-copy">
            <div className="feature-counter"><span>01</span><span>—</span><span>Featured system</span></div>
            <h2 id="feature-title">Give every<br /><em>offer</em> a point<br />of view.</h2>
            <p>One campaign language, working across the website, paid ads, social, short-form cuts, menus, posters, and the place where customers make their final decision.</p>
            <div className="feature-tags">
              <span>Campaign creative</span><span>Retail launch</span><span>Content system</span>
            </div>
          </div>
        </section>

        <section className="services-section" id="scope">
          <span className="section-ticket services-ticket" aria-hidden="true">C</span>
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
            <div><span className="inline-cookebyte-sigil">C</span><span>AISLE 03 / TWO-PERSON STUDIO</span></div>
            <span>DEV ↔ VISUAL</span>
          </div>
          <div className="team-heading">
            <div className="intro-label">/ 03 — THE TEAM</div>
            <h2 id="team-title">Two people.<br />Two <em>skill sets.</em><br />One signal.</h2>
            <p>Two sides of the same shopfront: Benitto builds what customers use; Abisheik shapes what customers notice and remember.</p>
          </div>
          <div className="skills-profiles">
            <InteractiveSkillCard
              number="01"
              name="Benitto Joshua"
              role="Development lead"
              handle="benitto.builds"
              status="Building live"
              skills={["Game Dev", "Web Dev", "AI LLMs"]}
              links={[
                { label: "MAIL", href: "mailto:joshua072308@gmail.com" },
                { label: "GITHUB", href: "https://github.com/Joshua-zlitch" },
                { label: "PORTFOLIO", href: "https://portfolio-2-0-gamma-blue.vercel.app/" },
              ]}
              imageUrl="/media/shopfront-work_afd5a85a.jpg"
              imageAlt="Temporary retail storefront image for Benitto Joshua"
              accent="#d5e668"
              theme="ink"
            />
            <InteractiveSkillCard
              number="02"
              name="Abisheik"
              role="Visual lead"
              handle="abisheik.edits"
              status="Cutting fresh"
              skills={["Video Editor", "Web Designer", "Graphic Designer"]}
              links={[
                { label: "MAIL", href: "mailto:aacreations007@gmail.com" },
                { label: "GITHUB", href: "https://github.com/abisheik-cmd" },
                { label: "INSTAGRAM", href: "https://www.instagram.com/abizk.ae/" },
              ]}
              imageUrl="/media/shopfront-campaign_ec6714db.jpg"
              imageAlt="Temporary retail campaign image for Abisheik"
              accent="#ff5a36"
              theme="cream"
            />
          </div>
          <p className="team-connector"><span>Move across each card to read the skill signal.</span><ArrowRight size={18} /></p>
        </section>

        <section className="work-with-us-section" id="work-with-us" aria-labelledby="work-with-us-title">
          <div className="work-route-bar">
            <span><span className="inline-cookebyte-sigil">C</span> ROUTE 04 / WORK WITH US</span>
            <span>PROJECT · PRICING · PARTNERS</span>
          </div>
          <div className="work-with-us-heading">
            <div>
              <div className="intro-label">/ 04 — MAKE THE MOVE</div>
              <h2 id="work-with-us-title">One shop.<br />A whole <em>network.</em></h2>
            </div>
            <p>Whether you need a better digital shopfront, a clear estimate, or one visual system across multiple locations, choose the route that fits.</p>
          </div>
          <div className="enquiry-grid">
            <article className="enquiry-card project-route terms-route">
              <div className="enquiry-card-top"><span>01 / TERMS & CONDITIONS</span><MoveUpRight size={21} /></div>
              <h3>Know the<br />terms.</h3>
              <p>Clear scope, working rhythm, and handover expectations before the work begins.</p>
              <button type="button" className="enquiry-link mono-glitch" onClick={() => openPrivatePanel("terms")}>View terms <ArrowRight size={17} /></button>
            </article>
            <article className="enquiry-card pricing-route">
              <div className="enquiry-card-top"><span>02 / PRICING GUIDE</span><span className="route-count">₹</span></div>
              <h3>Get the<br /><em>right</em> quote.</h3>
              <p>We price around your scope, retail footprint, and launch timeline—not a one-size package.</p>
              <button type="button" className="enquiry-link mono-glitch" onClick={() => openPrivatePanel("pricing")}>View starting packages <ArrowRight size={17} /></button>
            </article>
            <article className="enquiry-card partner-route">
              <div className="enquiry-card-top"><span>03 / BRING US THE BRIEF</span><span className="route-count">03</span></div>
              <h3>Bring us the<br /><em>brief.</em></h3>
              <p>For a new website, campaign, video edit, or a full shopfront refresh.</p>
              <button type="button" className="enquiry-link mono-glitch" onClick={() => openPrivatePanel("brief")}>Open project brief <ArrowRight size={17} /></button>
            </article>
          </div>
          <p className="work-with-us-footnote"><span>Need a different route?</span> Send the short version. We&apos;ll map the right next move together. <ArrowRight size={16} /></p>
        </section>

        <section className="method-section" id="method">
          <span className="section-ticket method-ticket" aria-hidden="true">C</span>
          <div className="method-top">
            <div>
              <div className="intro-label">/ 05 — THE METHOD</div>
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
          <span className="section-ticket contact-ticket" aria-hidden="true">C</span>
          <div className="contact-orb" aria-hidden="true"><span>GET<br />VISIBLE</span></div>
          <div className="contact-copy">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Let&apos;s make it visible</div>
            <h2>Ready to put<br />your shop <em>out front?</em></h2>
            <p>Bring the launch, refresh, promotion, or bigger retail question. You&apos;ll work directly with a developer and a designer-editor from the first move.</p>
          </div>
          <a className="contact-link mono-glitch" href="mailto:cookebyte@gmail.com" aria-label="Email CookeByte at cookebyte@gmail.com">
            <span>START A<br />CONVERSATION</span>
            <ArrowRight size={28} />
          </a>
        </section>
      </main>

      {privatePanel && (
        <div className="private-panel-overlay" role="presentation">
          <button type="button" className="private-panel-backdrop" aria-label="Close private panel" onClick={closePrivatePanel} />
          <section className="private-panel" role="dialog" aria-modal="true" aria-labelledby="private-panel-title">
            <button type="button" className="private-panel-close" onClick={closePrivatePanel} aria-label="Close private panel"><X size={21} /></button>
            {privatePanel === "pricing" ? (
              <div className="private-panel-content">
                <div className="private-panel-label"><span className="inline-cookebyte-sigil">C</span> PRIVATE STARTING PACKAGES</div>
                <div className="pricing-heading private-pricing-heading">
                  <div>
                    <div className="intro-label">/ PRIVATE PRICE GUIDE</div>
                    <h2 id="private-panel-title">Pick the<br />right <em>entry point.</em></h2>
                  </div>
                  <p>These starting points are shared for a clearer first conversation. Final pricing adjusts to your exact scope, specifications, and retail ambitions.</p>
                </div>
                <div className="pricing-grid">
                  {packages.map((plan) => (
                    <article className={`pricing-card ${plan.tone}`} key={plan.number}>
                      <div className="pricing-card-top"><span>{plan.number} / {plan.kind}</span><span className="price-stamp">₹</span></div>
                      <div className="price-lockup"><span>{plan.note}</span><strong>{plan.price}</strong></div>
                      <h3 dangerouslySetInnerHTML={{ __html: plan.title }} />
                      <p>{plan.description}</p>
                      <div className="package-points">{plan.points.map((point) => <span key={point}>{point}</span>)}</div>
                      <button type="button" className="plan-cta mono-glitch" onClick={() => openPrivatePanel("brief")}>Choose this route <ArrowRight size={17} /></button>
                    </article>
                  ))}
                </div>
                <p className="pricing-footnote"><span>Video ad campaigns</span> are quoted to the runtime, edit volume, and campaign requirements of your brief.</p>
              </div>
            ) : privatePanel === "terms" ? (
              <div className="private-panel-content legal-suite-panel-content">
                <div className="private-panel-label"><span className="inline-cookebyte-sigil">C</span> TERMS & CONDITIONS</div>
                <div className="pricing-heading private-pricing-heading">
                  <div>
                    <div className="intro-label">/ COOKEBYTE LEGAL SUITE</div>
                    <h2 id="private-panel-title">Read the<br /><em>legal suite.</em></h2>
                  </div>
                  <p>Read the complete CookeByte terms and conditions in the viewer below. It stays on this page so you can review the document without leaving the site.</p>
                </div>
                <div className="legal-suite-viewer">
                  <iframe src="/legal/cookebyte-legal-suite.pdf#view=FitH" title="CookeByte Legal Suite" />
                </div>
                <p className="legal-suite-fallback">Having trouble viewing the document? <a href="/legal/cookebyte-legal-suite.pdf" target="_blank" rel="noreferrer">Open the legal suite in a new tab</a>.</p>
              </div>
            ) : (
              <div className="brief-form-shell private-brief-form">
                <div className="brief-form-heading">
                  <div className="eyebrow"><span className="eyebrow-dot" /> Private project brief</div>
                  <h3 id="private-panel-title">{briefReceipt ? <>Brief<br /><em>received.</em></> : <>Send the<br /><em>short version.</em></>}</h3>
                  <p>{briefReceipt ? "Your project brief is recorded with a CookeByte receipt ID. Email delivery is not active yet, so this is your on-screen confirmation." : "Tell us what you are making. We’ll record the project brief and generate an in-site CookeByte receipt."}</p>
                </div>
                {briefReceipt ? (
                  <section className="brief-receipt" aria-live="polite" aria-label="CookeByte project brief receipt">
                    <div className="receipt-masthead">
                      <span className="receipt-stamp" aria-hidden="true">C</span>
                      <span>PROJECT RECEIPT / 01</span>
                    </div>
                    <div className="receipt-id-row"><span>RECEIPT ID</span><strong>{briefReceipt.receiptId}</strong></div>
                    <div className="receipt-grid">
                      <div><span>LOGGED</span><strong>{new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(briefReceipt.createdAt)}</strong></div>
                      <div><span>CONTACT</span><strong>{briefReceipt.name}</strong></div>
                      <div><span>BUSINESS</span><strong>{briefReceipt.business}</strong></div>
                      <div><span>PROJECT TYPE</span><strong>{briefReceipt.projectType}</strong></div>
                      <div><span>BUDGET</span><strong>{briefReceipt.budget}</strong></div>
                      <div><span>EMAIL ON FILE</span><strong>{briefReceipt.email}</strong></div>
                    </div>
                    <div className="receipt-brief"><span>THE SHORT VERSION</span><p>{briefReceipt.details}</p></div>
                    <p className="receipt-delivery-note"><span aria-hidden="true">●</span> In-site receipt created. Automated email delivery will be available once CookeByte connects an email service.</p>
                    <div className="receipt-actions">
                      <button type="button" className="receipt-action receipt-action--primary mono-glitch" onClick={closePrivatePanel}>Back to the site <ArrowRight size={18} /></button>
                      <button type="button" className="receipt-action mono-glitch" onClick={() => { setBriefReceipt(null); setBriefStatus(""); }}>Send another brief</button>
                    </div>
                  </section>
                ) : (
                  <form className="project-brief-form" onSubmit={handleBriefSubmit}>
                    <label><span>Your name</span><input name="name" type="text" required minLength={2} maxLength={120} placeholder="Your name" /></label>
                    <label><span>Shop or business</span><input name="business" type="text" required minLength={2} maxLength={160} placeholder="Business name" /></label>
                    <label className="details-field email-field"><span>Email for your receipt record</span><input name="email" type="email" required maxLength={320} placeholder="you@business.com" /><small>Automated email is not active yet. This address is recorded only with your project brief.</small></label>
                    <label><span>Project type</span><select name="projectType" required defaultValue=""><option value="" disabled>Choose a route</option><option>Basic shop website</option><option>E-commerce setup</option><option>3D website</option><option>Video ad campaign</option><option>Dealership or partnership</option><option>Not sure yet</option></select></label>
                    <label><span>Budget range</span><select name="budget" required defaultValue=""><option value="" disabled>Select a range</option><option>Up to ₹10K</option><option>₹10K–₹25K</option><option>₹25K–₹50K</option><option>Let&apos;s discuss</option></select></label>
                    <label className="details-field"><span>What needs to move?</span><textarea name="details" required minLength={15} maxLength={4000} rows={4} placeholder="Tell us about the shop, offer, timeline, or the next problem to solve." /></label>
                    <label className="brief-consent"><input name="receiptConsent" type="checkbox" required /><span>I understand CookeByte will record this brief and my contact details to prepare the project receipt. No automated email will be sent yet.</span></label>
                    <button className="brief-submit mono-glitch" type="submit" disabled={submitProjectBrief.isPending}>{submitProjectBrief.isPending ? "Recording your brief…" : <>Create project receipt <ArrowRight size={19} /></>}</button>
                    {briefStatus && <p className="brief-status brief-status--error" role="alert">{briefStatus}</p>}
                  </form>
                )}
              </div>
            )}
          </section>
        </div>
      )}

      <footer className="site-footer">
        <a className="footer-brand" href="#top"><span className="cookebyte-sigil" aria-hidden="true">C</span> <span className="cookebyte-wordmark">COOKE<b>BYTE</b><small>CREATIVE SYSTEMS</small></span></a>
        <p>Development, design & video for the<br />places people buy from nearby.</p>
        <div className="footer-links"><a href="#scope">Services</a><a href="#team">Team</a><a href="#method">Method</a><a href="#contact">Contact</a><a href="https://github.com/CookeByte" target="_blank" rel="noreferrer">GitHub ↗</a></div>
        <span>© 2026 / Built for local commerce</span>
      </footer>
    </div>
  );
}

function ArrowUpRightIcon() {
  return <span aria-hidden="true">↗</span>;
}
