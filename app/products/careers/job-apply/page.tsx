import { notFound } from "next/navigation";

import JobApplyFormSection from "@/components/sections/job-apply/JobApplyFormSection";
import JobApplyHeroSection from "@/components/sections/job-apply/JobApplyHeroSection";
import { getPublishedJobBySlug } from "@/lib/content-service";

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
