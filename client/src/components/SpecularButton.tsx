/** CookeByte specular control, following the supplied button’s proximity-shine behavior with a lightweight CSS renderer. */
import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";

type SpecularButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tint?: string;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  radius?: number;
};

export default function SpecularButton({ children, tint = "#ff5a36", textColor = "#f4f0e8", lineColor = "#d5e668", baseColor = "#f4f0e8", radius = 5, className = "", onPointerMove, style, ...props }: SpecularButtonProps) {
  const [shine, setShine] = useState("50% 50%");
  return <button {...props} className={`specular-button ${className}`} onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setShine(`${event.clientX - rect.left}px ${event.clientY - rect.top}px`); onPointerMove?.(event); }} style={{ "--sb-tint": tint, "--sb-text": textColor, "--sb-line": lineColor, "--sb-base": baseColor, "--sb-radius": `${radius}px`, "--sb-shine": shine, ...style } as React.CSSProperties}><span className="specular-button__fx" aria-hidden="true" /><span className="specular-button__label">{children}</span></button>;
}
