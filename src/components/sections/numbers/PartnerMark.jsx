import { RiOpenaiFill } from "react-icons/ri";
import { SiNextdotjs, SiNodedotjs, SiPostgresql, SiReact, SiTypescript } from "react-icons/si";

/** Brand logo and colour per technology. Logos without a `color` follow the text colour. */
const MARKS = {
  react: { Icon: SiReact, color: "#61dafb" },
  nextjs: { Icon: SiNextdotjs },
  typescript: { Icon: SiTypescript, color: "#3178c6" },
  openai: { Icon: RiOpenaiFill },
  nodejs: { Icon: SiNodedotjs, color: "#5fa04e" },
  postgres: { Icon: SiPostgresql, color: "#4169e1" },
};

/** Technology logo + name, as shown in the tech stack strip. */
export default function PartnerMark({ partner }) {
  const { Icon, color } = MARKS[partner.mark] ?? {};

  return (
    <span className="flex items-center gap-[0.45em] font-bold text-ink">
      {Icon && <Icon aria-hidden className="h-[1.35em] w-[1.35em] shrink-0" style={color ? { color } : undefined} />}
      <span className="text-[1.1em] tracking-[-0.02em]">{partner.name}</span>
    </span>
  );
}
