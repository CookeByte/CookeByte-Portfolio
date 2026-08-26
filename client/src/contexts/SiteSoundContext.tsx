/** CookeByte sound system: persists one continuous soundscape without hover restarts. */
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type SiteSoundContextValue = {
  soundEnabled: boolean;
  audioBlocked: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
};

const SiteSoundContext = createContext<SiteSoundContextValue | null>(null);
const preferenceKey = "cookebyte-sound-enabled";

export function SiteSoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabledState] = useState(() => window.localStorage.getItem(preferenceKey) !== "false");
  const [audioBlocked, setAudioBlocked] = useState(false);
  const soundscapeRef = useRef<HTMLAudioElement | null>(null);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setSoundEnabledState(enabled);
    window.localStorage.setItem(preferenceKey, String(enabled));
    if (!enabled) soundscapeRef.current?.pause();
  }, []);

  const toggleSound = useCallback(() => setSoundEnabled(!soundEnabled), [setSoundEnabled, soundEnabled]);

  useEffect(() => {
    const soundscape = new Audio("/manus-storage/cookebyte-launch_173034d5_7cd4f2c3.mp3");
    soundscape.loop = true;
    soundscape.volume = 0.11;
    soundscape.preload = "auto";
    soundscapeRef.current = soundscape;

    const startSoundscape = () => {
      if (!soundEnabled) return;
      void soundscape.play().then(() => setAudioBlocked(false)).catch(() => setAudioBlocked(true));
    };
    startSoundscape();
    window.addEventListener("pointerdown", startSoundscape, { passive: true, once: true });
    return () => {
      window.removeEventListener("pointerdown", startSoundscape);
      soundscape.pause();
      soundscapeRef.current = null;
    };
  }, [soundEnabled]);

  return <SiteSoundContext.Provider value={{ soundEnabled, audioBlocked, setSoundEnabled, toggleSound }}>{children}</SiteSoundContext.Provider>;
}

export function useSiteSound() {
  const context = useContext(SiteSoundContext);
  if (!context) throw new Error("useSiteSound must be used within SiteSoundProvider");
  return context;
}
