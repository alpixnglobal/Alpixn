import { notFound } from "next/navigation";

import JobApplyFormSection from "@/components/sections/job-apply/JobApplyFormSection";
import JobApplyHeroSection from "@/components/sections/job-apply/JobApplyHeroSection";
import { getPublishedJobBySlug } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";
import { withSeo } from "@/lib/seo-store";

export async function generateMetadata() {
  return withSeo("/products/careers/job-apply", pageMetadata({
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
  const job = jobSlug ? await getPublishedJobBySlug(jobSlug) : null;

  if (!job) {
    notFound();
  }

  return (
    <>
      <JobApplyHeroSection title={job.title} />
      <JobApplyFormSection job={job} />
    </>
  );
};

export default JobApplyPage;
