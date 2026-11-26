import PageVisual from "@/components/hero/PageVisuals";
import PageHero from "@/components/sections/shared/PageHero";

type OurTeamHeroSectionProps = {
  title?: string;
  description?: string;
};

const OurTeamHeroSection = ({ title = "The Innovators, Creators, and Dreamers", description = "Our philosophy is simple: hire great people and give them the resources and support to do their best work." }: OurTeamHeroSectionProps) => <PageHero eyebrow="Our team" title={title} description={description} aside={<PageVisual kind="team" />} />;

export default OurTeamHeroSection;
