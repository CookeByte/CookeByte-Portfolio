/**
 * Shopfront Studio / Market Signal launch loader
 * Monocraft character shuffle and retail-signal progress strip used before the site becomes interactive.
 */
import { useEffect, useRef, useState } from "react";
import { Radio, Volume2, VolumeX } from "lucide-react";
import { useSiteSound } from "@/contexts/SiteSoundContext";

type LaunchLoaderProps = {
  onComplete: () => void;
};

const target = "COOKEBYTE";
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>*+-";

const randomCharacter = () => characters[Math.floor(Math.random() * characters.length)];

export default function LaunchLoader({ onComplete }: LaunchLoaderProps) {
  const [displayText, setDisplayText] = useState(() => target.split("").map((character) => (character === " " ? " " : randomCharacter())).join(""));
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const completed = useRef(false);
  const { soundEnabled, setSoundEnabled } = useSiteSound();

  const playLaunchSound = async () => {
    const audio = audioRef.current;
    if (!audio || !soundEnabled) return;
    try {
      audio.currentTime = 0;
      await audio.play();
      setAudioBlocked(false);
    } catch {
      setAudioBlocked(true);
    }
  };

  const handleAudioToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!soundEnabled) {
      setSoundEnabled(true);
      void playLaunchSound();
      return;
    }
    if (audioBlocked) {
      void playLaunchSound();
      return;
    }
    audio.pause();
    setSoundEnabled(false);
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 140 : 3000;
    const exitDelay = reducedMotion ? 60 : 420;
    const start = performance.now();
    let frame = 0;
    let exitTimer = 0;

    void playLaunchSound();

    const animate = (time: number) => {
      const ratio = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      const resolvedCharacters = Math.floor(eased * target.length);
      const unstableTail = Math.max(0, 0.31 - ratio) / 0.31;

      setProgress(eased);
      setDisplayText(target.split("").map((character, index) => {
        if (character === " ") return " ";
        const shouldGlitchResolvedCharacter = index < resolvedCharacters && Math.random() < unstableTail * 0.28;
        return index < resolvedCharacters && !shouldGlitchResolvedCharacter ? character : randomCharacter();
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
    <div className={`launch-loader${leaving ? " launch-loader--leaving" : ""}`} role="status" aria-live="polite" aria-label="Launching CookeByte">
      <audio ref={audioRef} src="/manus-storage/cookebyte-launch_173034d5.mp3" preload="auto" />
      <div className="launch-loader__rule" />
      <div className="launch-loader__topline"><span>COOKEBYTE / SIGNAL BOOT</span><span>{String(Math.round(progress * 100)).padStart(3, "0")}%</span></div>
      <div className="launch-loader__center">
        <span className="launch-loader__ticket">C</span>
        <p className="launch-loader__kicker">RETAIL CREATIVE / DIGITAL DISPLAY</p>
        <h1 aria-label={target}>{displayText}</h1>
        <p className="launch-loader__subline">COMPILING THE WINDOW</p>
      </div>
      <div className="launch-loader__progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
      <div className="launch-loader__footer">
        <span>01 / OPENING THE DISPLAY</span>
        <button type="button" className="launch-loader__sound" onClick={handleAudioToggle} aria-pressed={soundEnabled} aria-label={!soundEnabled ? "Enable launch sound" : "Mute launch sound"}>
          {!soundEnabled ? <VolumeX size={13} /> : audioBlocked ? <Radio size={13} /> : <Volume2 size={13} />}
          {!soundEnabled ? "SOUND OFF" : audioBlocked ? "TAP FOR SOUND" : "SOUND ON"}
        </button>
        <span>EST. 2026</span>
      </div>
    </div>
  );
}
