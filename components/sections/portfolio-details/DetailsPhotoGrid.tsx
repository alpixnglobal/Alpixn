"use client";

import Image from "next/image";
import { useState } from "react";

import type { PortfolioProjectRecord } from "@/lib/content-types";

type DetailsPhotoGridProps = {
  project: PortfolioProjectRecord;
  resultTitle?: string;
};

function GalleryCard({ image, alt, accent }: { image: string; alt: string; accent?: string }) {
  const [hasError, setHasError] = useState(false);
  const showImage = image && !hasError;
  const fallbackGradient = accent || "linear-gradient(160deg, color-mix(in srgb, var(--tech) 28%, transparent), color-mix(in srgb, var(--canvas-2) 82%, transparent))";

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-[20px] xl:h-[564px]">
      {showImage ? (
        <Image
          src={image}
          alt={alt}
          fill
          priority
          unoptimized={image.startsWith("data:") || image.startsWith("http")}
          className="rounded-[20px] object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="absolute inset-0 rounded-[20px]" style={{ background: fallbackGradient }} />
      )}
    </div>
  );
}

const DetailsPhotoGrid = ({ project, resultTitle = "Result" }: DetailsPhotoGridProps) => {
  const resultBullets = project.resultBullets ?? [];

  return (
    <section className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 45%, var(--glow) 100%)" }} />

      <div className="container max-w-337.5">
        <div className="grid grid-cols-1 gap-[35px] xl:grid-cols-[914px_1fr]">
          <GalleryCard image={project.galleryImageOne} alt={`${project.title} gallery one`} accent={project.accent} />
          <GalleryCard image={project.galleryImageTwo} alt={`${project.title} gallery two`} accent={project.accent} />
        </div>

        <div className="mt-[35px] grid grid-cols-1 gap-[35px] px-4 xl:grid-cols-[1fr_914px] xl:px-0">
          <GalleryCard image={project.galleryImageThree} alt={`${project.title} gallery three`} accent={project.accent} />
          <GalleryCard image={project.galleryImageFour} alt={`${project.title} gallery four`} accent={project.accent} />
        </div>

        <div className="mx-4 mt-[75px] grid grid-cols-1 gap-[25px] xl:grid-cols-[auto_550px] xl:px-0">
          <h2 className="title heading-gradient-white text-start">{resultTitle}</h2>

          <div className="mt-4 lg:mt-0">
            <div className="flex gap-[35px]">
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-semibold text-tech lg:text-4xl">{project.resultPrimaryValue}</div>
                <div className="text-base text-fg/80 lg:text-xl">{project.resultPrimaryLabel}</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-semibold text-tech lg:text-4xl">{project.resultSecondaryValue}</div>
                <div className="text-base text-fg/80 lg:text-xl">{project.resultSecondaryLabel}</div>
              </div>
            </div>

            <ul className="ml-2 mt-6.25 space-y-2">
              {resultBullets.map((bullet) => (
                <li key={bullet} className="grid grid-cols-[auto_1fr] gap-4 text-xl leading-relaxed text-fg/80">
                  <div className="mt-3.5 h-1 w-1 rounded-full bg-white" />
                  <span className="text-xs leading-relaxed sm:text-lg xl:text-xl">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsPhotoGrid;
