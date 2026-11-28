import CareerDetailsHeroSection from "@/components/sections/career-details/CareerDetailsHeroSection";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JobDetailsSection from "@/components/sections/career-details/JobDetailsSection";
import ShapeFuturSection from "@/components/sections/careers/ShapeFuturSection";
import { getPublishedJobBySlug, getResourceUiSettings, getSiteSettings } from "@/lib/content-service";
import ApplicationStatusToastWrapper from "@/components/sections/job-apply/ApplicationStatusToastWrapper";
import { withSeo } from "@/lib/seo-store";

interface CareersDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function baseMetadata({ params }: CareersDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublishedJobBySlug(slug);

  if (!job) {
    return {
      title: "Job Not Found",
      description: "The requested job could not be found.",
    };
  }

  return {
    title: `${job.title} at ${job.company} | Careers`,
    description: job.overview.substring(0, 160),
    keywords: [`${job.title}`, `${job.type}`, `${job.location}`, `${job.company}`, "careers", "jobs"],
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: job.overview.substring(0, 160),
      type: "article",
      publishedTime: job.posted,
      authors: [`${job.company} Careers`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} at ${job.company}`,
      description: job.overview.substring(0, 160),
    },
  };
}

const CareerDetails = async ({ params }: CareersDetailPageProps) => {
  const { slug } = await params;

  const [job, siteSettings, uiSettings] = await Promise.all([getPublishedJobBySlug(slug), getSiteSettings(), getResourceUiSettings()]);

  if (!job) {
    notFound();
  }
  const pageCopy = siteSettings.pageContent.careers;

  return (
    <>
      <ApplicationStatusToastWrapper />
      <CareerDetailsHeroSection title={job.title} type={job.type} location={job.location} salary={job.salary} />
      <JobDetailsSection
        job={job}
        overviewTitle={uiSettings.careers.overviewTitle}
        responsibilitiesTitle={uiSettings.careers.responsibilitiesTitle}
        requirementsTitle={uiSettings.careers.requirementsTitle}
        benefitsTitle={uiSettings.careers.benefitsTitle}
        applyButtonLabel={uiSettings.careers.applyButtonLabel}
      />
      <ShapeFuturSection
        title={pageCopy.ctaTitle}
        description={pageCopy.ctaDescription}
        buttonLabel={pageCopy.ctaButtonLabel}
        buttonHref={pageCopy.ctaButtonHref}
      />
    </>
  );
};

export default CareerDetails;

export async function generateMetadata(props: Parameters<typeof baseMetadata>[0]) {
  const p = (await props.params) as Record<string, string>;
  return withSeo(`/resources/careers/${p.slug}`, await baseMetadata(props));
}
