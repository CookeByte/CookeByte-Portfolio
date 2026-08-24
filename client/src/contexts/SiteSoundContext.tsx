/** CookeByte sound system: persists preference and gives interactive controls a restrained digital hover cue. */
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type SiteSoundContextValue = {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
};

const SiteSoundContext = createContext<SiteSoundContextValue | null>(null);
const preferenceKey = "cookebyte-sound-enabled";

export function SiteSoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabledState] = useState(() => window.localStorage.getItem(preferenceKey) !== "false");
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const lastHoverRef = useRef(0);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setSoundEnabledState(enabled);
    window.localStorage.setItem(preferenceKey, String(enabled));
  }, []);

  const toggleSound = useCallback(() => setSoundEnabled(!soundEnabled), [setSoundEnabled, soundEnabled]);

  useEffect(() => {
    const sound = new Audio("/manus-storage/cookebyte-hover_901dca33.mp3");
    sound.volume = 0.12;
    sound.preload = "auto";
    hoverSoundRef.current = sound;

    const onPointerOver = (event: PointerEvent) => {
      if (!soundEnabled || !(event.target instanceof Element)) return;
      const target = event.target.closest("a, button, [role='button']");
      if (!target || target.closest(".launch-loader")) return;
      const now = performance.now();
      if (now - lastHoverRef.current < 120) return;
      lastHoverRef.current = now;
      sound.currentTime = 0;
      void sound.play().catch(() => undefined);
    };

    document.addEventListener("pointerover", onPointerOver, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      sound.pause();
      hoverSoundRef.current = null;
    };
  }, [soundEnabled]);

  return <SiteSoundContext.Provider value={{ soundEnabled, setSoundEnabled, toggleSound }}>{children}</SiteSoundContext.Provider>;
}

export function useSiteSound() {
  const context = useContext(SiteSoundContext);
  if (!context) throw new Error("useSiteSound must be used within SiteSoundProvider");
  return context;
}
