/** CookeByte sidebar: scroll to select a route, then commit via the bottom Enter control. */
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import OptionWheel from "./OptionWheel";
import SpecularButton from "./SpecularButton";

const routes = [
  { label: "Selected work", target: "#work" },
  { label: "What we do", target: "#scope" },
  { label: "The team", target: "#team" },
  { label: "Work with us", target: "#work-with-us" },
  { label: "Our method", target: "#method" },
  { label: "Let’s talk", target: "#contact" },
];

export default function RouteSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState(0);
  useEffect(() => { if (!open) return; const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); if (event.key === "ArrowDown" || event.key === "ArrowRight") { event.preventDefault(); setSelected((current) => Math.min(current + 1, routes.length - 1)); } if (event.key === "ArrowUp" || event.key === "ArrowLeft") { event.preventDefault(); setSelected((current) => Math.max(current - 1, 0)); } if (event.key === "Enter") { event.preventDefault(); document.querySelector(routes[selected].target)?.scrollIntoView({ behavior: "smooth", block: "start" }); onClose(); } }; document.body.style.overflow = "hidden"; window.addEventListener("keydown", onKey); return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); }; }, [open, onClose, selected]);
  if (!open) return null;
  const enterRoute = () => { document.querySelector(routes[selected].target)?.scrollIntoView({ behavior: "smooth", block: "start" }); onClose(); };
  return <div className="route-sidebar-overlay" role="presentation"><button className="route-sidebar-backdrop" aria-label="Close route navigator" onClick={onClose} /><aside className="route-sidebar" aria-label="CookeByte route navigator">
    <div className="route-sidebar__top"><div className="route-sidebar__brand"><span className="cookebyte-sigil">C</span><span className="cookebyte-wordmark">COOKE<b>BYTE</b><small>CREATIVE SYSTEMS</small></span></div><button className="route-sidebar__close" onClick={onClose} aria-label="Close route navigator"><X size={22} /></button></div>
    <p className="route-sidebar__instruction">SCROLL TO SELECT / PRESS ENTER TO GO</p>
    <div className="route-sidebar__wheel"><OptionWheel items={routes.map((route) => route.label)} defaultSelected={selected} onChange={(index) => setSelected(index)} textColor="#636363" activeColor="#f4f0e8" /><div className="route-sidebar__position" aria-live="polite"><span>ROUTE POSITION</span><strong>{selected + 1} <i>OF</i> {routes.length}</strong></div></div>
    <div className="route-sidebar__selected"><span>SELECTED ROUTE</span><strong>{String(selected + 1).padStart(2, "0")} / {routes[selected].label}</strong></div>
    <SpecularButton className="route-sidebar__enter" onClick={enterRoute} tint="#ff5a36" lineColor="#d5e668" baseColor="#f4f0e8" textColor="#f4f0e8">ENTER <ArrowRight size={20} /></SpecularButton>
  </aside></div>;
}
