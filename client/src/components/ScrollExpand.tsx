/** CookeByte post-loader ScrollExpand entrance, adapted from the supplied React Bits reference. */
import { useCallback, useEffect, useRef, type ReactNode } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const smoothstep = (start: number, end: number, value: number) => {
  const t = clamp((value - start) / (end - start || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

type ScrollExpandProps = { src: string; alt: string; title: string; children?: ReactNode };

export default function ScrollExpand({ src, alt, title, children }: ScrollExpandProps) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const applyProgress = useCallback((progress: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const eased = smoothstep(0, 1, progress);
    const width = 46 + 54 * eased;
    const height = 54 + 46 * eased;
    const x = (100 - width) / 2;
    const y = (100 - height) / 2;
    frame.style.clipPath = `inset(${y}% ${x}% ${y}% ${x}% round ${28 * (1 - eased)}px)`;
    media.style.transform = `scale(${1.28 - .28 * eased})`;
    if (titleRef.current) {
      const out = smoothstep(.34, .82, progress);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-34 * out}px, 0) scale(${1 + .05 * out})`;
    }
    if (hintRef.current) {
      const out = smoothstep(0, .16, progress);
      hintRef.current.style.opacity = `${1 - out}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * out}px, 0)`;
    }
    if (overlayRef.current) {
      const incoming = smoothstep(.68, 1, progress);
      overlayRef.current.style.opacity = `${incoming}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - incoming)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 0;
    let target = 0;
    let raf = 0;
    let stageHeight = 0;

    const measure = () => {
      stageHeight = window.innerHeight;
      stage.style.height = `${stageHeight}px`;
      track.style.height = `${stageHeight * (reducedMotion ? 1 : 2.2)}px`;
    };
    const readProgress = () => clamp(-track.getBoundingClientRect().top / (stageHeight * 1.2), 0, 1);
    const tick = () => {
      current += (target - current) * .14;
      if (Math.abs(target - current) < .0005) current = target;
      applyProgress(current);
      if (current !== target) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const onScroll = () => {
      target = readProgress();
      if (reducedMotion) { current = target; applyProgress(current); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => { measure(); target = readProgress(); current = target; applyProgress(current); };
    measure();
    if (reducedMotion) { current = 1; target = 1; applyProgress(1); }
    else onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { if (raf) cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, [applyProgress]);

  return <section ref={rootRef} className="scroll-expand" aria-label="CookeByte entrance"><div ref={trackRef} className="scroll-expand__track"><div ref={stageRef} className="scroll-expand__stage"><div ref={frameRef} className="scroll-expand__frame"><img ref={mediaRef} className="scroll-expand__media" src={src} alt={alt} draggable={false} /><div ref={overlayRef} className="scroll-expand__overlay">{children}</div></div><h2 ref={titleRef} className="scroll-expand__title">{title}</h2><div className="scroll-expand__route-rail" aria-hidden="true"><span>00 / ENTRY GATE</span><span>WINDOW IS OPENING</span><span>COOKEBYTE / 2026</span></div><div ref={hintRef} className="scroll-expand__hint">SCROLL TO OPEN <span>↓</span></div></div></div></section>;
}
