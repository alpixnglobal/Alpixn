import PageHero from "@/components/sections/shared/PageHero";

type PortfolioHeroSectionProps = {
  title?: string;
  description?: string;
};

const PortfolioHeroSection = ({ title = "Our Work", description = "Concept and client projects across AI, robotics, web and mobile — each one clearly labelled." }: PortfolioHeroSectionProps) => <PageHero eyebrow="Portfolio" title={title} description={description} />;

export default PortfolioHeroSection;
