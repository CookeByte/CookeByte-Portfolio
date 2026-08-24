/**
 * Shopfront Studio / Market Signal profile card
 * Temporary retail imagery, shop-window depth, and Monocraft utility labels support the team showcase.
 */
import type { CSSProperties, PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";

type InteractiveSkillCardProps = {
  number: string;
  name: string;
  role: string;
  handle: string;
  status: string;
  skills: string[];
  imageUrl: string;
  imageAlt: string;
  accent: string;
  theme: "ink" | "cream";
};

export default function InteractiveSkillCard({
  number,
  name,
  role,
  handle,
  status,
  skills,
  imageUrl,
  imageAlt,
  accent,
  theme,
}: InteractiveSkillCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty("--profile-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--profile-y", `${y * 100}%`);
    event.currentTarget.style.setProperty("--profile-rx", `${(0.5 - y) * 7}deg`);
    event.currentTarget.style.setProperty("--profile-ry", `${(x - 0.5) * 8}deg`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--profile-x", "50%");
    event.currentTarget.style.setProperty("--profile-y", "50%");
    event.currentTarget.style.setProperty("--profile-rx", "0deg");
    event.currentTarget.style.setProperty("--profile-ry", "0deg");
  };

  return (
    <article
      className={`skill-profile skill-profile--${theme}`}
      style={{ "--profile-accent": accent } as CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="skill-profile__shell">
        <div className="skill-profile__glow" aria-hidden="true" />
        <div className="skill-profile__image-wrap">
          <img src={imageUrl} alt={imageAlt} />
          <span className="skill-profile__image-label">TEMP IMAGE / REPLACE LATER</span>
          <span className="skill-profile__number">{number}</span>
        </div>
        <div className="skill-profile__body">
          <div className="skill-profile__meta"><span>{role}</span><ArrowUpRight size={18} /></div>
          <h3>{name}</h3>
          <div className="skill-profile__presence"><span className="skill-profile__dot" /> @{handle} <i>{status}</i></div>
          <div className="skill-profile__skills" aria-label={`${name} skills`}>
            {skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </div>
        <div className="skill-profile__edge" aria-hidden="true" />
      </div>
    </article>
  );
}
