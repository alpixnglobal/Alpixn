import PageHero from "@/components/sections/shared/PageHero";

type JobApplyHeroSectionProps = {
  title: string;
};

const JobApplyHeroSection = ({ title }: JobApplyHeroSectionProps) => (
  <PageHero eyebrow="Apply" title={title} description="Share your details and experience below. Our team reviews every application and replies by email." />
);

export default JobApplyHeroSection;
