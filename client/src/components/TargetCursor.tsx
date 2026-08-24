/** CookeByte target cursor, adapted from the provided React Bits TargetCursor reference. */
import { useCallback, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

type TargetCursorProps = {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
  cursorColor?: string;
  cursorColorOnTarget?: string;
};

const getContainingBlock = (element: HTMLElement | null) => {
  let node = element?.parentElement;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    if (style.transform !== "none" || style.perspective !== "none" || style.filter !== "none" || style.willChange.includes("transform") || style.willChange.includes("perspective") || style.willChange.includes("filter") || /paint|layout|strict|content/.test(style.contain)) return node;
    node = node.parentElement;
  }
  return null;
};

export default function TargetCursor({
  targetSelector = "a, button, input, select, textarea, label, [role='button'], [tabindex]:not([tabindex='-1'])",
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
  cursorColor = "#f4f0e8",
  cursorColorOnTarget = "#d5e668",
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const isMobile = useMemo(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return (touch && window.innerWidth <= 768) || /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
  }, []);

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, { x, y, duration: 0.1, ease: "power3.out" });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;
    const cursor = cursorRef.current;
    const originalCursor = document.body.style.cursor;
    const containingBlock = getContainingBlock(cursor);
    const getOffset = () => {
      if (!containingBlock) return { x: 0, y: 0 };
      const rect = containingBlock.getBoundingClientRect();
      return { x: rect.left + containingBlock.clientLeft, y: rect.top + containingBlock.clientTop };
    };
    if (hideDefaultCursor) document.body.style.cursor = "none";

    const corners = Array.from(cursor.querySelectorAll<HTMLDivElement>(".target-cursor-corner"));
    cornersRef.current = corners;
    const offset = getOffset();
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2 - offset.x, y: window.innerHeight / 2 - offset.y });
    spinTl.current = gsap.timeline({ repeat: -1 }).to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

    let activeTarget: Element | null = null;
    let activeStrength = 0;
    let targetCorners: { x: number; y: number }[] | null = null;
    const moveHandler = (event: MouseEvent) => moveCursor(event.clientX - getOffset().x, event.clientY - getOffset().y);
    const ticker = () => {
      if (!activeTarget || !targetCorners || activeStrength === 0) return;
      const cursorX = Number(gsap.getProperty(cursor, "x"));
      const cursorY = Number(gsap.getProperty(cursor, "y"));
      corners.forEach((corner, index) => {
        const target = targetCorners?.[index];
        if (!target) return;
        gsap.to(corner, { x: target.x - cursorX, y: target.y - cursorY, duration: parallaxOn ? 0.2 : 0, ease: "power1.out", overwrite: "auto" });
      });
    };
    gsap.ticker.add(ticker);

    const leaveTarget = () => {
      activeTarget = null;
      targetCorners = null;
      activeStrength = 0;
      gsap.to(corners, { borderColor: cursorColor, duration: 0.15, ease: "power2.out" });
      if (dotRef.current) gsap.to(dotRef.current, { backgroundColor: cursorColor, duration: 0.15 });
      corners.forEach((corner, index) => {
        const positions = [{ x: -18, y: -18 }, { x: 6, y: -18 }, { x: 6, y: 6 }, { x: -18, y: 6 }];
        gsap.to(corner, { ...positions[index], duration: 0.25, ease: "power3.out" });
      });
      spinTl.current?.resume();
    };

    const enterHandler = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest(targetSelector);
      if (!target || target === activeTarget) return;
      activeTarget = target;
      const rect = target.getBoundingClientRect();
      const currentOffset = getOffset();
      targetCorners = [
        { x: rect.left - 3 - currentOffset.x, y: rect.top - 3 - currentOffset.y },
        { x: rect.right - 9 - currentOffset.x, y: rect.top - 3 - currentOffset.y },
        { x: rect.right - 9 - currentOffset.x, y: rect.bottom - 9 - currentOffset.y },
        { x: rect.left - 3 - currentOffset.x, y: rect.bottom - 9 - currentOffset.y },
      ];
      activeStrength = 1;
      spinTl.current?.pause();
      gsap.to(cursor, { rotation: 0, duration: hoverDuration, ease: "power2.out" });
      gsap.to(corners, { borderColor: cursorColorOnTarget, duration: 0.15, ease: "power2.out" });
      if (dotRef.current) gsap.to(dotRef.current, { backgroundColor: cursorColorOnTarget, duration: 0.15 });
      target.addEventListener("mouseleave", leaveTarget, { once: true });
    };

    const downHandler = () => { if (dotRef.current) gsap.to(dotRef.current, { scale: 0.7, duration: 0.2 }); gsap.to(cursor, { scale: 0.9, duration: 0.2 }); cursor.classList.add("target-cursor--pressed"); };
    const upHandler = () => { if (dotRef.current) gsap.to(dotRef.current, { scale: 1, duration: 0.2 }); gsap.to(cursor, { scale: 1, duration: 0.2 }); cursor.classList.remove("target-cursor--pressed"); };
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseover", enterHandler, { passive: true });
    window.addEventListener("mousedown", downHandler);
    window.addEventListener("mouseup", upHandler);
    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("mousedown", downHandler);
      window.removeEventListener("mouseup", upHandler);
      gsap.ticker.remove(ticker);
      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
    };
  }, [cursorColor, cursorColorOnTarget, hideDefaultCursor, hoverDuration, isMobile, moveCursor, parallaxOn, spinDuration, targetSelector]);

  if (isMobile) return null;
  return <div ref={cursorRef} className="target-cursor-wrapper"><div ref={dotRef} className="target-cursor-dot" style={{ backgroundColor: cursorColor }} /><div className="target-cursor-corner corner-tl" style={{ borderColor: cursorColor }} /><div className="target-cursor-corner corner-tr" style={{ borderColor: cursorColor }} /><div className="target-cursor-corner corner-br" style={{ borderColor: cursorColor }} /><div className="target-cursor-corner corner-bl" style={{ borderColor: cursorColor }} /></div>;
}
