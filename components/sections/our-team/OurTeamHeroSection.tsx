import { PrinciplesPanel } from "@/components/hero/HeroPanels";
import PageHero from "@/components/sections/shared/PageHero";

type OurTeamHeroSectionProps = {
  title?: string;
  description?: string;
};

const ITEMS = [
  { title: "Build what matters", text: "We start from the problem and the people it affects, not from the technology." },
  { title: "Say it plainly", text: "Honest estimates, clear trade-offs and no inflated promises." },
  { title: "Own the craft", text: "Tested, documented code that the next person can maintain." },
  { title: "Keep learning", text: "Time for research, pairing and sharing what we learn." },
];

const OurTeamHeroSection = ({ title = "The Innovators, Creators, and Dreamers", description = "Our philosophy is simple: hire great people and give them the resources and support to do their best work." }: OurTeamHeroSectionProps) => (
  <PageHero eyebrow="Our team" title={title} description={description} aside={<PrinciplesPanel items={ITEMS} />} />
);

export default OurTeamHeroSection;
