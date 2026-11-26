import Image from "next/image";

import type { TeamMemberRecord } from "@/lib/content-types";

type OurTeamSectionProps = {
  members: TeamMemberRecord[];
  title?: string;
};

const OurTeamSection = ({ members, title = "Meet Our Team" }: OurTeamSectionProps) => {
  return (
    <section className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 45%, var(--glow) 100%)" }} />

      <div className="container max-w-[1297px]">
        <div className="title heading-gradient text-left sm:text-center">{title}</div>

        <div className="mt-12.5 flex flex-wrap justify-center gap-[35px] xl:justify-around">
          {members.slice(0, 4).map((member) => (
            <div key={member._id} className="flex flex-col items-center gap-[15px]">
              <div className="relative h-[150px] w-[150px] overflow-hidden rounded-full md:h-[219px] md:w-[219px]">
                {member.imageData ? (
                  <Image
                    src={member.imageData}
                    alt={member.name}
                    fill
                    unoptimized={member.imageData.startsWith("data:") || member.imageData.startsWith("http")}
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: member.accent }}>
                    <span className="text-3xl font-semibold tracking-[0.18em] text-fg">{member.initials}</span>
                  </div>
                )}
              </div>
              <div className="text-lg font-medium text-fg xl:text-2xl">{member.name}</div>
              <div className="text-base text-fg/80 md:text-lg">{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeamSection;
