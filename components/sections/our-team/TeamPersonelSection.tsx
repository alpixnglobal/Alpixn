import Accent from "@/components/ui/Accent";
import Image from "next/image";

import type { TeamMemberRecord } from "@/lib/content-types";

type TeamPersonelSectionProps = {
  members: TeamMemberRecord[];
};

const TeamPersonelSection = ({ members }: TeamPersonelSectionProps) => {
  const tones = ["#0878d1", "#d99a19", "#064a87", "#9a5b08", "#071a33", "#f6d77a"];
  return (
    <section aria-labelledby="team-title" className="bg-canvas py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0878d1]/30 bg-[#0878d1]/10 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#064a87] dark:text-[#7cc6ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-current" /> The team
          </span>
          <h2 id="team-title" className="mt-4 font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg">
            People behind <span className="text-brand-spectrum">the work</span>
          </h2>
        </div>
        {members.length === 0 ? (
          <p className="mx-auto mt-10 max-w-xl rounded-3xl border border-line bg-surface p-8 text-center text-fg-muted shadow-[var(--shadow-card)]">
            Team profiles will be published here soon. Meanwhile, tell us about your project and we will introduce the people who would work on it.
          </p>
        ) : null}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((member, i) => {
            const bg = tones[i % tones.length];
            const lightBg = bg === "#d99a19" || bg === "#f6d77a";
            return (
              <li key={member._id} className="group overflow-hidden rounded-[28px] border border-line bg-surface shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/4.2] overflow-hidden" style={{ background: bg }}>
                  {member.imageData ? (
                    <Image src={member.imageData} alt={member.name} fill sizes="(max-width: 640px) 100vw, 25vw" unoptimized={member.imageData.startsWith("data:") || member.imageData.startsWith("http")} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <span className={`absolute inset-0 grid place-items-center font-display text-4xl font-bold tracking-[0.12em] ${lightBg ? "text-[#071a33]" : "text-white"}`}>{member.initials}</span>
                  )}
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-brand-spectrum" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold text-fg">{member.name}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{member.role}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default TeamPersonelSection;
