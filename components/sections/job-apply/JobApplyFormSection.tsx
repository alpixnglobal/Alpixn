import Accent from "@/components/ui/Accent";
import { submitJobApplicationAction } from "@/admin/actions/admin-actions";

import type { JobOpeningRecord } from "@/lib/content-types";

type JobApplyFormSectionProps = {
  job: JobOpeningRecord;
  introTitle?: string;
  introDescription?: string;
  fullNamePlaceholder?: string;
  phonePlaceholder?: string;
  emailPlaceholder?: string;
  locationPlaceholder?: string;
  linkedInPlaceholder?: string;
  portfolioPlaceholder?: string;
  cvPlaceholder?: string;
  coverLetterPlaceholder?: string;
  summaryPrefix?: string;
  submitLabel?: string;
};

const fieldClassName =
  "w-full rounded-[10px] border border-fg/10 bg-canvas-2 px-4 py-3 text-sm text-fg outline-none placeholder:text-fg/45";

const JobApplyFormSection = ({
  job,
  introTitle = "Apply Now & Grow With Us",
  introDescription = "Start your journey with us today! Fill out the form below and take the first step toward an exciting career opportunity.",
  fullNamePlaceholder = "Full Name",
  phonePlaceholder = "Contact Number",
  emailPlaceholder = "Email Address",
  locationPlaceholder = "Location",
  linkedInPlaceholder = "LinkedIn URL",
  portfolioPlaceholder = "Portfolio / Project URL",
  cvPlaceholder = "CV Google Drive Link",
  coverLetterPlaceholder = `Tell us why you are a fit for ${job.title}`,
  summaryPrefix = "Applying for",
  submitLabel = "Submit Application",
}: JobApplyFormSectionProps) => {
  const action = submitJobApplicationAction.bind(null, job.slug);

  return (
    <section className="relative w-full py-12.5">
      {/* Background Color */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 55%, var(--glow) 100%)" }} />

      {/* Content */}
      <div className="relative w-full max-w-[1350px] mx-auto px-4 xl:px-0">
        {/* Grid */}
        <div className="grid grid-cols-1 justify-between xl:grid-cols-[572px_1fr]">
          {/* Left */}
          <div className="flex flex-col gap-[25px]">
            <h2 className="text-left font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text={introTitle} /></h2>
            <p className="text-fg/80 text-base md:text-lg leading-relaxed">
              {introDescription}
            </p>
          </div>
          {/* Right */}
            <div className="mt-4 flex justify-end xl:mt-0">
              <form action={action} className="w-full px-2 md:px-0 lg:w-[720px] lg:px-0">
                <input type="hidden" name="redirectTo" value={`/resources/careers/${job.slug}`} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[20px]">
                  <div className="col-span-1">
                    <input name="fullName" type="text" required placeholder={fullNamePlaceholder} className={fieldClassName} />
                  </div>
                  <div className="col-span-1">
                    <input name="phone" type="text" required placeholder={phonePlaceholder} className={fieldClassName} />
                  </div>
                  <div className="col-span-1">
                    <input name="email" type="email" required placeholder={emailPlaceholder} className={fieldClassName} />
                  </div>
                  <div className="col-span-1">
                    <input name="location" type="text" required placeholder={locationPlaceholder} className={fieldClassName} />
                  </div>
                  <div className="col-span-1">
                    <input name="linkedInUrl" type="url" placeholder={linkedInPlaceholder} className={fieldClassName} />
                  </div>
                  <div className="col-span-1">
                    <input name="portfolioUrl" type="url" placeholder={portfolioPlaceholder} className={fieldClassName} />
                  </div>
                  <div className="col-span-1 lg:col-span-2">
                    <input name="cvDriveLink" type="url" required placeholder={cvPlaceholder} className={fieldClassName} />
                  </div>
                  <div className="col-span-1 lg:col-span-2">
                    <textarea
                      name="coverLetter"
                      placeholder={coverLetterPlaceholder.replace("{jobTitle}", job.title)}
                      className={`${fieldClassName} min-h-[180px]`}
                    />
                  </div>
                  <div className="col-span-1 lg:col-span-2 rounded-[10px] border border-fg/10 bg-canvas-2 px-4 py-3 text-sm text-fg/70">
                    {summaryPrefix} <span className="font-semibold text-fg">{job.title}</span> at <span className="font-semibold text-fg">{job.company}</span>
                  </div>
                  <div className="col-span-1 lg:col-span-2">
                    <button type="submit" className="h-12 w-full rounded-[10px] bg-tech px-6.25 py-2.5 text-sm text-[#071a33]">
                      {submitLabel}
                    </button>
                  </div>
                </div>
              </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default JobApplyFormSection;
