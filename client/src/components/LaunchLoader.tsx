/**
 * Shopfront Studio / Market Signal launch loader
 * Monocraft character shuffle and retail-signal progress strip used before the site becomes interactive.
 */
import { useEffect, useRef, useState } from "react";

type LaunchLoaderProps = {
  onComplete: () => void;
};

const target = "SHOPFRONT STUDIO";
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>*+-";

const randomCharacter = () => characters[Math.floor(Math.random() * characters.length)];

export default function LaunchLoader({ onComplete }: LaunchLoaderProps) {
  const [displayText, setDisplayText] = useState(() => target.split("").map((character) => (character === " " ? " " : randomCharacter())).join(""));
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const completed = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 140 : 3000;
    const exitDelay = reducedMotion ? 60 : 420;
    const start = performance.now();
    let frame = 0;
    let exitTimer = 0;

    const animate = (time: number) => {
      const ratio = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      const resolvedCharacters = Math.floor(eased * target.length);

      setProgress(eased);
      setDisplayText(target.split("").map((character, index) => {
        if (character === " ") return " ";
        return index < resolvedCharacters ? character : randomCharacter();
      }).join(""));

      if (ratio < 1) {
        frame = requestAnimationFrame(animate);
        return;
      }

      setDisplayText(target);
      setLeaving(true);
      exitTimer = window.setTimeout(() => {
        if (!completed.current) {
          completed.current = true;
          onComplete();
        }
      }, exitDelay);
    };

    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div className={`launch-loader${leaving ? " launch-loader--leaving" : ""}`} role="status" aria-live="polite" aria-label="Launching Shopfront Studio">
      <div className="launch-loader__rule" />
      <div className="launch-loader__topline"><span>SHOPFRONT / SIGNAL BOOT</span><span>{String(Math.round(progress * 100)).padStart(3, "0")}%</span></div>
      <div className="launch-loader__center">
        <span className="launch-loader__ticket">S</span>
        <p className="launch-loader__kicker">LOCAL RETAIL / DIGITAL DISPLAY</p>
        <h1 aria-label={target}>{displayText}</h1>
        <p className="launch-loader__subline">BUILDING THE WINDOW</p>
      </div>
      <div className="launch-loader__progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
      <div className="launch-loader__footer"><span>01 / OPENING THE DISPLAY</span><span>EST. 2026</span></div>
    </div>
  );
}
