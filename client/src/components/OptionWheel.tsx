/** CookeByte route wheel, adapted from the supplied React Bits OptionWheel interaction. */
import { useCallback, useEffect, useRef, useState } from "react";

type OptionWheelProps = {
  items: string[];
  defaultSelected?: number;
  onChange?: (index: number, item: string) => void;
  textColor?: string;
  activeColor?: string;
  fontSize?: number;
  spacing?: number;
  curve?: number;
  tilt?: number;
  blur?: number;
  fade?: number;
  inset?: number;
};

export default function OptionWheel({ items, defaultSelected = 0, onChange, textColor = "#6d6d6d", activeColor = "#f4f0e8", fontSize = 2.15, spacing = 1.35, curve = 1, tilt = 6, blur = 1.2, fade = 0.21, inset = 32 }: OptionWheelProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const position = useRef(defaultSelected);
  const target = useRef(defaultSelected);
  const raf = useRef<number | null>(null);
  const dragging = useRef<{ y: number; start: number } | null>(null);
  const [selected, setSelected] = useState(defaultSelected);

  const setTarget = useCallback((value: number, snap = false) => {
    const next = Math.max(0, Math.min(items.length - 1, snap ? Math.round(value) : value));
    target.current = next;
    const index = Math.round(next);
    if (index !== selected) {
      setSelected(index);
      onChange?.(index, items[index]);
    }
  }, [items, onChange, selected]);

  const beginFrame = useCallback(() => {
    if (raf.current !== null) return;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const ease = 1 - Math.exp(-dt / 0.18);
      const next = position.current + (target.current - position.current) * ease;
      position.current = Math.abs(target.current - next) < 0.001 ? target.current : next;
      const rowHeight = fontSize * spacing * 16;
      const tiltRadians = (tilt * Math.PI) / 180;
      const radius = tiltRadians > 0.001 ? rowHeight / tiltRadians : 0;
      itemRefs.current.forEach((element, index) => {
        if (!element) return;
        const distance = index - position.current;
        const angle = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, distance * tiltRadians));
        const y = radius ? radius * Math.sin(angle) : distance * rowHeight;
        const x = radius ? -radius * (1 - Math.cos(angle)) * curve : 0;
        const rotation = radius ? angle * 180 / Math.PI : 0;
        const magnitude = Math.abs(distance);
        element.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rotation.toFixed(2)}deg)`;
        element.style.opacity = String(Math.max(0.12, 1 - magnitude * fade));
        element.style.filter = `blur(${(magnitude * blur).toFixed(2)}px)`;
      });
      if (Math.abs(target.current - position.current) > 0.001) raf.current = requestAnimationFrame(frame);
      else raf.current = null;
    };
    raf.current = requestAnimationFrame(frame);
  }, [blur, curve, fade, fontSize, spacing, tilt]);

  useEffect(() => { beginFrame(); return () => { if (raf.current) cancelAnimationFrame(raf.current); }; }, [beginFrame]);

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    setTarget(target.current + Math.max(-1, Math.min(1, event.deltaY / 80)));
    beginFrame();
  };
  const pointerDown = (event: React.PointerEvent) => { dragging.current = { y: event.clientY, start: target.current }; event.currentTarget.setPointerCapture(event.pointerId); };
  const pointerMove = (event: React.PointerEvent) => { if (!dragging.current) return; setTarget(dragging.current.start - (event.clientY - dragging.current.y) / (fontSize * spacing * 16)); beginFrame(); };
  const pointerUp = () => { if (!dragging.current) return; dragging.current = null; setTarget(target.current, true); beginFrame(); };
  const keyDown = (event: React.KeyboardEvent) => { if (event.key === "ArrowDown" || event.key === "ArrowRight") { event.preventDefault(); setTarget(target.current + 1, true); beginFrame(); } if (event.key === "ArrowUp" || event.key === "ArrowLeft") { event.preventDefault(); setTarget(target.current - 1, true); beginFrame(); } };

  return <div ref={rootRef} className="option-wheel" role="listbox" aria-label="CookeByte destinations" tabIndex={0} onWheel={handleWheel} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onKeyDown={keyDown} style={{ "--ow-text": textColor, "--ow-active": activeColor, "--ow-size": `${fontSize}rem`, "--ow-inset": `${inset}px` } as React.CSSProperties}>
    {items.map((item, index) => <button ref={(node) => { itemRefs.current[index] = node; }} key={item} role="option" aria-selected={selected === index} className={`option-wheel__item${selected === index ? " option-wheel__item--selected" : ""}`} onClick={() => { setTarget(index, true); beginFrame(); }}>{item}<span>→</span></button>)}
  </div>;
}
