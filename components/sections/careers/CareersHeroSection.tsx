import { OpenRolesPanel } from "@/components/hero/HeroPanels";
import PageHero from "@/components/sections/shared/PageHero";

type CareersHeroSectionProps = {
  title?: string;
  description?: string;
  jobs?: { slug: string; title: string; type: string; mode: string; location: string }[];
};

const CareersHeroSection = ({
  title = "Innovate With Us",
  description = "We build software for AI, robotics and growing businesses. If you enjoy solving real problems, you can make a difference here.",
  jobs = [],
}: CareersHeroSectionProps) => (
  <PageHero
    eyebrow="Careers"
    title={title}
    description={description}
    primary={{ label: "See open roles", href: "#open-roles" }}
    secondary={{ label: "Meet the team", href: "/resources/our-team" }}
    aside={<OpenRolesPanel jobs={jobs} />}
  />
);

export default CareersHeroSection;
