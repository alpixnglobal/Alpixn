import Image from "next/image";

import type { TeamMemberRecord } from "@/lib/content-types";

type TeamPersonelSectionProps = {
  members: TeamMemberRecord[];
};

const TeamPersonelSection = ({ members }: TeamPersonelSectionProps) => {
  return (
    <section className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, #00070E 55%, #002348 100%)" }} />

      <div className="mx-auto w-full max-w-272.75">
        <div className="grid grid-cols-1 gap-6.25 px-4 lg:grid-cols-2 xl:grid-cols-3 xl:px-0">
          {members.map((member) => {
            const hasImage = Boolean(member.imageData);

            return (
              <div key={member._id} className="group relative h-88.5 w-full overflow-hidden rounded-[15px]">
                <div className="absolute inset-0">
                  {hasImage ? (
                    <Image
                      src={member.imageData}
                      alt={member.name}
                      fill
                      unoptimized={member.imageData.startsWith("data:") || member.imageData.startsWith("http")}
                      className="rounded-[15px] object-cover grayscale transition-all duration-1000 ease-out group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center rounded-[15px]" style={{ background: member.accent }}>
                      <span className="text-3xl md:text-4xl font-semibold leading-snug tracking-[0.24em] text-white">{member.initials}</span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-2.5 left-1/2 z-10 flex h-18 w-81.75 -translate-x-1/2 translate-y-0 flex-col justify-center rounded-[10px] bg-white p-2.5 opacity-100 lg:translate-y-6 lg:opacity-0 lg:transition-all lg:duration-700 lg:ease-out lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                  <h6 className="text-sm md:text-base font-semibold leading-snug text-black">{member.name}</h6>
                  <p className="text-sm font-normal leading-relaxed text-black/80">{member.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamPersonelSection;
