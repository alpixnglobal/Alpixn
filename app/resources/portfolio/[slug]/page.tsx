import { notFound } from "next/navigation";
import PortfolioDetailsHeroSection from "@/components/sections/portfolio-details/PortfolioDetailsHeroSection";
import DetailsSection from "@/components/sections/portfolio-details/DetailsSection";
import DetailsPhotoGrid from "@/components/sections/portfolio-details/DetailsPhotoGrid";
import OurTeamSection from "@/components/sections/portfolio-details/OurTeamSection";
import ViewMoreWorkSection from "@/components/sections/portfolio-details/ViewMoreWorkSection";
import ImproveBusinessSection from "@/components/sections/portfolio/ImproveBusinessSection";
import BlackGg from "@/components/sections/interns-alumni/BlackGg";
import { getPublishedPortfolioProjectBySlug, getPublishedPortfolioProjects, getPublishedTeamMembers, getResourceUiSettings, getSiteSettings } from "@/lib/content-service";
import type { TeamMemberRecord } from "@/lib/content-types";

interface PortfolioDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const item = await getPublishedPortfolioProjectBySlug(slug);

  if (!item) {
    return {
      title: "Portfolio Project Not Found",
    };
  }

  return {
    title: `${item.title} | Portfolio`,
    description: item.summary,
  };
}

const PortfolioDetailsPage = async ({ params }: PortfolioDetailPageProps) => {
  const { slug } = await params;
  const [item, items, globalTeamMembers, siteSettings, uiSettings] = await Promise.all([
    getPublishedPortfolioProjectBySlug(slug),
    getPublishedPortfolioProjects(),
    getPublishedTeamMembers(),
    getSiteSettings(),
    getResourceUiSettings(),
  ]);

  if (!item) {
    notFound();
  }

  // Use project-specific team members if available, otherwise fall back to global team
  const projectTeamMembers: TeamMemberRecord[] = item.teamMembers && item.teamMembers.length > 0
    ? item.teamMembers.map((member, index) => ({
        _id: `project-team-${index}`,
        slug: member.name.toLowerCase().replace(/\s+/g, "-"),
        name: member.name,
        role: member.role,
        focus: "",
        initials: member.initials,
        accent: member.accent,
        imageData: member.imageData,
        order: index,
        isPublished: true,
      }))
    : globalTeamMembers;

  const relatedProjects = items.filter((project) => project.slug !== slug);
  const pageCopy = siteSettings.pageContent.portfolio;

  return (
    <>
      <PortfolioDetailsHeroSection title={item.title} description={item.summary} />
      <DetailsSection
        project={item}
        detailsTitle={uiSettings.portfolio.detailsTitle}
        objectiveTitle={uiSettings.portfolio.objectiveTitle}
        solutionsTitle={uiSettings.portfolio.solutionsTitle}
        aboutProjectTitle={uiSettings.portfolio.aboutProjectTitle}
        industryLabel={uiSettings.portfolio.industryLabelShort}
        engagementLabel={uiSettings.portfolio.engagementLabel}
        outcomeLabel={uiSettings.portfolio.outcomeLabel}
        servicesProvidedLabel={uiSettings.portfolio.servicesProvidedLabel}
        timelineLabel={uiSettings.portfolio.timelineLabel}
      />
      <DetailsPhotoGrid project={item} resultTitle={uiSettings.portfolio.resultTitle} />
      <OurTeamSection members={projectTeamMembers} title={uiSettings.portfolio.teamTitle} />
      <ViewMoreWorkSection items={relatedProjects} title={uiSettings.portfolio.moreProjectsTitle} />
      <BlackGg />
      <ImproveBusinessSection
        title={pageCopy.ctaTitle}
        description={pageCopy.ctaDescription}
        buttonLabel={pageCopy.ctaButtonLabel}
        buttonHref={pageCopy.ctaButtonHref}
      />
      <BlackGg />
    </>
  );
};

export default PortfolioDetailsPage;
