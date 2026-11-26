import { notFound } from "next/navigation";

import { TechnologyPageSections } from "@/components/sections/technologies/TechnologyPageSections";
import { getCachedLandingTechnologyPage } from "@/lib/content-service";

const TechnologiesPage = async () => {
  const page = await getCachedLandingTechnologyPage();

  if (!page) {
    notFound();
  }

  return (
    <TechnologyPageSections page={page} />
  );
};

export default TechnologiesPage;
