import { PrinciplesPanel } from "@/components/hero/HeroPanels";
import PageHero from "@/components/sections/shared/PageHero";

type IntensAlumniHeroSectionProps = {
  title?: string;
  description?: string;
};

const ITEMS = [
  { title: "Real projects", text: "Interns work on live features with a mentor, not on throwaway tasks." },
  { title: "Weekly mentoring", text: "Code reviews and one-to-one sessions every week." },
  { title: "Clear tracks", text: "Web, mobile, AI and design tracks with defined learning goals." },
  { title: "A certificate that means something", text: "Awarded on completion of a reviewed final project." },
];

const IntensAlumniHeroSection = ({ title = "Our Internship Candidates", description = "We are proud of the interns who started their journey with ALPIXN and completed their training with us." }: IntensAlumniHeroSectionProps) => (
  <PageHero eyebrow="Interns & alumni" title={title} description={description} aside={<PrinciplesPanel items={ITEMS} />} />
);

export default IntensAlumniHeroSection;
