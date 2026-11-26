import PageHero from "@/components/sections/shared/PageHero";

type CareersHeroSectionProps = {
  title?: string;
  description?: string;
};

const CareersHeroSection = ({ title = "Innovate With Us", description = "We build software for AI, robotics and growing businesses. If you enjoy solving real problems, you can make a difference here." }: CareersHeroSectionProps) => <PageHero eyebrow="Careers" title={title} description={description} />;

export default CareersHeroSection;
