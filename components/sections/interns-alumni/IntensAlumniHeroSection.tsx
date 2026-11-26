import PageHero from "@/components/sections/shared/PageHero";

type IntensAlumniHeroSectionProps = {
  title?: string;
  description?: string;
};

const IntensAlumniHeroSection = ({ title = "Our Internship Candidates", description = "We are proud of the interns who started their journey with ALPIXN and completed their training with us." }: IntensAlumniHeroSectionProps) => <PageHero eyebrow="Interns & alumni" title={title} description={description} />;

export default IntensAlumniHeroSection;
