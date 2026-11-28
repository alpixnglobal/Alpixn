import { notFound } from "next/navigation";

import JobApplyFormSection from "@/components/sections/job-apply/JobApplyFormSection";
import JobApplyHeroSection from "@/components/sections/job-apply/JobApplyHeroSection";
import { getPublishedJobBySlug, getResourceUiSettings } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";
import { withSeo } from "@/lib/seo-store";

export async function generateMetadata() {
  return withSeo("/resources/careers/job-apply", pageMetadata({
    title: "Apply for a Job",
    description: "Apply for an open role at ALPIXN.",
    path: "/resources/careers/job-apply",
    index: false,
  }));
}

type JobApplyPageProps = {
  searchParams: Promise<{
    job?: string;
  }>;
};

const JobApplyPage = async ({ searchParams }: JobApplyPageProps) => {
  const params = await searchParams;
  const jobSlug = params.job ?? "";
  const [job, uiSettings] = await Promise.all([jobSlug ? getPublishedJobBySlug(jobSlug) : Promise.resolve(null), getResourceUiSettings()]);

  if (!job) {
    notFound();
  }

  return (
    <>
      <JobApplyHeroSection title={job.title} />
      <JobApplyFormSection
        job={job}
        introTitle={uiSettings.careers.applyIntroTitle}
        introDescription={uiSettings.careers.applyIntroDescription}
        fullNamePlaceholder={uiSettings.careers.applyFullNamePlaceholder}
        phonePlaceholder={uiSettings.careers.applyPhonePlaceholder}
        emailPlaceholder={uiSettings.careers.applyEmailPlaceholder}
        locationPlaceholder={uiSettings.careers.applyLocationPlaceholder}
        linkedInPlaceholder={uiSettings.careers.applyLinkedInPlaceholder}
        portfolioPlaceholder={uiSettings.careers.applyPortfolioPlaceholder}
        cvPlaceholder={uiSettings.careers.applyCvPlaceholder}
        coverLetterPlaceholder={uiSettings.careers.applyCoverLetterPlaceholder}
        summaryPrefix={uiSettings.careers.applySummaryPrefix}
        submitLabel={uiSettings.careers.applySubmitLabel}
      />
    </>
  );
};

export default JobApplyPage;
