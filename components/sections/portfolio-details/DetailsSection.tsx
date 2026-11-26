import Image from "next/image";

import { Button } from "@/components/ui/buttonBtn";
import type { PortfolioProjectRecord } from "@/lib/content-types";

type DetailsSectionProps = {
  project: PortfolioProjectRecord;
  detailsTitle?: string;
  objectiveTitle?: string;
  solutionsTitle?: string;
  aboutProjectTitle?: string;
  industryLabel?: string;
  engagementLabel?: string;
  outcomeLabel?: string;
  servicesProvidedLabel?: string;
  timelineLabel?: string;
};

const DetailsSection = ({
  project,
  detailsTitle = "Details",
  objectiveTitle = "Objective",
  solutionsTitle = "Solutions",
  aboutProjectTitle = "About The Project",
  industryLabel = "Industry",
  engagementLabel = "Engagement",
  outcomeLabel = "Outcome",
  servicesProvidedLabel = "Services Provided",
  timelineLabel = "Timeline",
}: DetailsSectionProps) => {
  const objectivePoints = project.objectivePoints ?? [];
  const solutionPoints = project.solutionPoints ?? [];

  return (
    <section className="relative w-full py-12.5">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 15%, var(--glow) 100%)" }} />

      <div className="relative mx-auto w-full max-w-337.5">
        <div className="grid grid-cols-1 gap-[35px] px-4 lg:grid-cols-[545px_1fr] xl:px-0">
          <div className="relative h-[300px] w-full rounded-[20px] md:h-[370px] xl:h-138.75 xl:w-[545px]">
            {project.imageData ? (
              <Image
                src={project.imageData}
                alt={project.title}
                fill
                priority
                unoptimized={project.imageData.startsWith("data:") || project.imageData.startsWith("http")}
                className="rounded-[20px] object-cover"
              />
            ) : (
              <div className="absolute inset-0 rounded-[20px]" style={{ background: project.accent }} />
            )}
          </div>

          <div className="flex flex-col gap-6.25">
            <Button
              variant="outlined"
              className="h-[41px] w-[134px] rounded-full border-tech/45 bg-tech/5 text-xs font-normal leading-relaxed text-white sm:text-sm"
            >
              {project.timeline}
            </Button>

            <h2 className="title heading-gradient-white text-start">{detailsTitle}</h2>
            <p className="subtitleMeXl80 text-left leading-relaxed">{project.summary}</p>

            <ul className="ml-2 space-y-1">
              <li className="grid grid-cols-[auto_1fr] gap-4 text-base leading-relaxed text-fg/80">
                <div className="mt-3.5 h-1 w-1 rounded-full bg-white" />
                <span className="subtitleMeXl80 text-left">{industryLabel}: {project.industry}</span>
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-4 text-base leading-relaxed text-fg/80">
                <div className="mt-3.5 h-1 w-1 rounded-full bg-white" />
                <span className="subtitleMeXl80 text-left">{engagementLabel}: {project.engagement}</span>
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-4 text-base leading-relaxed text-fg/80">
                <div className="mt-3.5 h-1 w-1 rounded-full bg-white" />
                <span className="subtitleMeXl80 text-left">{outcomeLabel}: {project.outcome}</span>
              </li>
              {project.tags.map((tag) => (
                <li key={tag} className="grid grid-cols-[auto_1fr] gap-4 text-base leading-relaxed text-fg/80">
                  <div className="mt-3.5 h-1 w-1 rounded-full bg-white" />
                  <span className="subtitleMeXl80 text-left">{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12.5 grid grid-cols-1 gap-6.25 px-4 xl:grid-cols-[770px_1fr] xl:px-0">
          <div className="flex flex-col gap-6.25">
            <h2 className="title heading-gradient-white text-start">{objectiveTitle}</h2>
            <p className="subtitleMeXl80 text-left leading-relaxed">{project.objective}</p>

            {objectivePoints.length > 0 ? (
              <ul className="ml-2 space-y-1">
                {objectivePoints.map((point) => (
                  <li key={point} className="grid grid-cols-[auto_1fr] gap-4 text-fg/80 text-base leading-relaxed">
                    <div className="w-1 h-1 rounded-full bg-white mt-3.5"></div>
                    <span className="subtitleMeXl80 text-left ">{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <h2 className="title heading-gradient-white mt-12.5 text-start">{solutionsTitle}</h2>
            <ol className="ml-2.5 space-y-4">
              {solutionPoints.map((point, index) => (
                <li key={point} className="grid grid-cols-[auto_1fr] gap-4">
                  <div className="flex items-start">
                    <span className="text-sm font-medium text-fg sm:text-base xl:text-lg">{index + 1}.</span>
                  </div>
                  <div>
                    <p className="subtitleMeXl80 text-left leading-relaxed">{point}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div
            className="sticky top-0 mt-8 h-fit self-start rounded-[15px] p-5 lg:mt-0"
            style={{
              background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 44.95%, var(--glow) 100%)",
              border: "1px solid #FFFFFF26",
              boxShadow: "0px 0px 15px 0px #FFFFFF40",
            }}
          >
<h3 className="border-b border-fg/20 py-[15px] text-base font-semibold text-fg md:text-lg">{aboutProjectTitle}</h3>

            <div className="mt-6.25 flex flex-col">
              <span className="text-sm font-semibold md:text-base">{industryLabel}:</span>
              <span className="text-sm text-fg/90 md:text-base">{project.industry}</span>
            </div>

            <div className="mt-6.25 flex flex-col">
              <span className="text-sm font-semibold md:text-base">{servicesProvidedLabel}:</span>
              <div className="mt-2.5 flex flex-wrap gap-5">
                {project.tags.map((tag) => (
                  <div key={tag} className="text-base text-fg/90">
                    <div
                      className="w-fit rounded-[5px] px-[15px] py-2.5 text-xs md:text-base"
                      style={{
                        background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)",
                        border: "1px solid #FFFFFF40",
                      }}
                    >
                      {tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6.25 flex flex-col">
              <span className="text-sm font-semibold md:text-base">{timelineLabel}:</span>
              <span className="text-sm text-fg/90 md:text-base">{project.timeline}</span>
            </div>

            <div className="mt-6.25 flex flex-col">
              <span className="text-sm font-semibold md:text-base">{outcomeLabel}:</span>
              <span className="text-sm text-fg/90 md:text-base">{project.outcome}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
