import Link from "next/link";

import type { JobOpeningRecord } from "@/lib/content-types";

interface JobDetailsSectionProps {
  job: JobOpeningRecord;
  overviewTitle?: string;
  responsibilitiesTitle?: string;
  requirementsTitle?: string;
  benefitsTitle?: string;
  applyButtonLabel?: string;
}

const JobDetailsSection = ({
  job,
  overviewTitle = "Overview:",
  responsibilitiesTitle = "Position Overview:",
  requirementsTitle = "Qualifications:",
  benefitsTitle = "Benefits:",
  applyButtonLabel = "Apply Now",
}: JobDetailsSectionProps) => {
  return (
    <div className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, #00070E 55%, #002348 100%)" }} />

      <div className="container max-w-337.25">
        <div className="flex flex-col gap-[25px]">
          <h2 className="heading-gradient-white text-xl md:text-2xl font-bold leading-snug text-start">{overviewTitle}</h2>
          <p className="text-sm leading-relaxed text-white/80 xl:text-base">{job.overview}</p>
        </div>

        <div className="mt-12.5 flex flex-col gap-[25px]">
          <h2 className="heading-gradient-white text-xl md:text-2xl font-bold leading-snug text-start">{responsibilitiesTitle}</h2>
          <ul className="flex flex-col">
            {job.responsibilities.map((point) => (
              <li key={point} className="ml-3.5 mt-2.5 flex gap-3">
                <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/80 lg:mt-4" />
                <p className="text-sm leading-relaxed text-white/80 xl:text-base">{point}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12.5 flex flex-col gap-[25px]">
          <h2 className="heading-gradient-white text-xl md:text-2xl font-bold leading-snug text-start">{requirementsTitle}</h2>
          <ul className="flex flex-col">
            {job.requirements.map((point) => (
              <li key={point} className="ml-3.5 mt-2.5 flex gap-3">
                <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/80 lg:mt-4" />
                <p className="text-sm leading-relaxed text-white/80 xl:text-base">{point}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12.5 flex flex-col gap-[25px]">
          <h2 className="heading-gradient-white text-xl md:text-2xl font-bold leading-snug text-start">{benefitsTitle}</h2>
          <ul className="flex flex-col">
            {job.benefits.map((point) => (
              <li key={point} className="ml-3.5 mt-2.5 flex gap-3">
                <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/80 lg:mt-4" />
                <p className="text-sm leading-relaxed text-white/80 xl:text-base">{point}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12.5 flex items-center justify-between gap-4">
          <div className="text-sm font-medium text-white lg:text-base">{job.posted}</div>
          <Link href={`/resources/careers/job-apply?job=${job.slug}`}>
            <button
              className="relative flex w-fit cursor-pointer items-center gap-2.5 rounded-[8px] border px-4 py-2 text-white sm:rounded-[9px] sm:px-5 sm:py-2.5 xl:rounded-[10px] xl:px-6.25 xl:py-2.5"
              style={{
                background: "linear-gradient(360deg, #002348 0%, #00141F 100%)",
                border: "1.5px solid transparent",
                backgroundImage:
                  "linear-gradient(360deg, #002348 0%, #00141F 100%), linear-gradient(166.72deg, #389DFE -20.31%, #FFFFFF 92.69%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              <span className="text-sm sm:text-base">{applyButtonLabel}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[14px] w-[14px] lg:h-[22px] lg:w-[22px]">
                <path d="M1 8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 1L15 8L8 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;
