import PageHero from "@/components/sections/shared/PageHero";

type PortfolioDetailsHeroSectionProps = {
  title: string;
  description: string;
};

const PortfolioDetailsHeroSection = ({ title, description }: PortfolioDetailsHeroSectionProps) => <PageHero eyebrow="Project" title={title} description={description} />;

export default PortfolioDetailsHeroSection;
