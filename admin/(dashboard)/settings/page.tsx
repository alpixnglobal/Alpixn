import type { Metadata } from "next";

import { saveResourceUiSettingsAction, saveSiteSettingsAction } from "@/admin/actions/admin-actions";
import { FormActions } from "@/components/admin/admin-form-helpers";
import { FooterSettingsRichEditor } from "@/components/admin/footer-settings-rich-editor";
import { SettingsPageCopyFields } from "@/components/admin/entity-forms";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { AdminField, AdminInput, AdminSectionCard, AdminTextarea, StatusNotice, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { AdminShell } from "@/components/admin/admin-shell";
import { SubmitButton } from "@/components/admin/submit-button";
import { getResourceUiSettings, getSiteSettings } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin Settings",
};

type PageProps = {
  searchParams: Promise<{
    status?: string;
    error?: string;
  }>;
};

export default async function AdminSettingsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = getAdminFlashMessage(params.status, params.error);
  const [siteSettings, resourceUiSettings] = await Promise.all([getSiteSettings(), getResourceUiSettings()]);

  return (
    <AdminShell
      activePath="/admin/settings"
      title="Site settings"
      description="Update shared brand text, newsletter copy, office locations, and the hero/section/CTA content used across every public page."
    >
      {message ? <StatusNotice tone={message.tone} message={message.message} /> : null}

      <AdminSectionCard
        title="Brand and shell content"
        description="These values are shared across the header, footer, newsletter area, and brand identity shown throughout the public site.">
        <form action={saveSiteSettingsAction} className="grid gap-6">
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminField label="Company name">
              <AdminInput name="companyName" defaultValue={siteSettings.companyName} />
            </AdminField>
            <AdminField label="Short brand label">
              <AdminInput name="shortName" defaultValue={siteSettings.shortName} />
            </AdminField>
            <AdminField label="Experience label">
              <AdminInput name="experienceLabel" defaultValue={siteSettings.experienceLabel} />
            </AdminField>
            <AdminField label="Header tagline">
              <AdminInput name="headerTagline" defaultValue={siteSettings.headerTagline} />
            </AdminField>
            <div className="lg:col-span-2">
              <ImageUploadField
                name="logoUrl"
                label="Site Logo"
                description="Upload your company logo. Large images will be automatically compressed and optimized for web."
                defaultValue={siteSettings.logoUrl || "/images/logo.png"}
              />
            </div>
            <AdminField label="Logo alt text">
              <AdminInput name="logoAlt" defaultValue={siteSettings.logoAlt || "Logo"} />
            </AdminField>
            <div className="lg:col-span-2">
              <FooterSettingsRichEditor settings={siteSettings} />
            </div>
          </div>

          <div className="grid gap-4">
            <SettingsPageCopyFields prefix="home" title="Home page" values={siteSettings.pageContent.home} defaultOpen />
            <SettingsPageCopyFields prefix="resources" title="Resources overview" values={siteSettings.pageContent.resources} />
            <SettingsPageCopyFields prefix="interns" title="Interns page" values={siteSettings.pageContent.interns} />
            <SettingsPageCopyFields prefix="team" title="Team page" values={siteSettings.pageContent.team} />
            <SettingsPageCopyFields prefix="portfolio" title="Portfolio page" values={siteSettings.pageContent.portfolio} />
            <SettingsPageCopyFields prefix="careers" title="Careers page" values={siteSettings.pageContent.careers} />
            <SettingsPageCopyFields prefix="blogs" title="Blogs page" values={siteSettings.pageContent.blogs} />
          </div>

          <FormActions>
            <SubmitButton label="Save site settings" pendingLabel="Saving settings..." />
          </FormActions>
        </form>
      </AdminSectionCard>

      <AdminSectionCard
        title="Resource UI copy"
        description="Manage the remaining listing/detail UI text used across interns, portfolio, careers, job apply, and blogs without changing the design."
      >
        <form action={saveResourceUiSettingsAction} className="grid gap-6">
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminField label="Interns search placeholder"><AdminInput name="internsSearchPlaceholder" defaultValue={resourceUiSettings.interns.searchPlaceholder} /></AdminField>
            <AdminField label="Interns program label"><AdminInput name="internsProgramLabel" defaultValue={resourceUiSettings.interns.programLabel} /></AdminField>
            <AdminField label="Interns all programs label"><AdminInput name="internsAllProgramsLabel" defaultValue={resourceUiSettings.interns.allProgramsLabel} /></AdminField>
            <AdminField label="Interns track label"><AdminInput name="internsTrackLabel" defaultValue={resourceUiSettings.interns.trackLabel} /></AdminField>
            <AdminField label="Interns all tracks label"><AdminInput name="internsAllTracksLabel" defaultValue={resourceUiSettings.interns.allTracksLabel} /></AdminField>
            <AdminField label="Interns results label"><AdminInput name="internsResultsLabel" defaultValue={resourceUiSettings.interns.resultsLabel} /></AdminField>
            <AdminField label="Interns clear all label"><AdminInput name="internsClearAllLabel" defaultValue={resourceUiSettings.interns.clearAllLabel} /></AdminField>
            <div className="lg:col-span-2"><AdminField label="Interns empty message"><AdminTextarea name="internsEmptyMessage" defaultValue={resourceUiSettings.interns.emptyMessage} /></AdminField></div>

            <AdminField label="Portfolio search placeholder"><AdminInput name="portfolioSearchPlaceholder" defaultValue={resourceUiSettings.portfolio.searchPlaceholder} /></AdminField>
            <AdminField label="Portfolio industry label"><AdminInput name="portfolioIndustryLabel" defaultValue={resourceUiSettings.portfolio.industryLabel} /></AdminField>
            <AdminField label="Portfolio all industries label"><AdminInput name="portfolioAllIndustriesLabel" defaultValue={resourceUiSettings.portfolio.allIndustriesLabel} /></AdminField>
            <AdminField label="Portfolio tag label"><AdminInput name="portfolioTagLabel" defaultValue={resourceUiSettings.portfolio.tagLabel} /></AdminField>
            <AdminField label="Portfolio all tags label"><AdminInput name="portfolioAllTagsLabel" defaultValue={resourceUiSettings.portfolio.allTagsLabel} /></AdminField>
            <AdminField label="Portfolio results label"><AdminInput name="portfolioResultsLabel" defaultValue={resourceUiSettings.portfolio.resultsLabel} /></AdminField>
            <AdminField label="Portfolio clear all label"><AdminInput name="portfolioClearAllLabel" defaultValue={resourceUiSettings.portfolio.clearAllLabel} /></AdminField>
            <div className="lg:col-span-2"><AdminField label="Portfolio empty message"><AdminTextarea name="portfolioEmptyMessage" defaultValue={resourceUiSettings.portfolio.emptyMessage} /></AdminField></div>
            <AdminField label="Portfolio details title"><AdminInput name="portfolioDetailsTitle" defaultValue={resourceUiSettings.portfolio.detailsTitle} /></AdminField>
            <AdminField label="Portfolio objective title"><AdminInput name="portfolioObjectiveTitle" defaultValue={resourceUiSettings.portfolio.objectiveTitle} /></AdminField>
            <AdminField label="Portfolio solutions title"><AdminInput name="portfolioSolutionsTitle" defaultValue={resourceUiSettings.portfolio.solutionsTitle} /></AdminField>
            <AdminField label="Portfolio about project title"><AdminInput name="portfolioAboutProjectTitle" defaultValue={resourceUiSettings.portfolio.aboutProjectTitle} /></AdminField>
            <AdminField label="Portfolio industry label"><AdminInput name="portfolioIndustryLabelShort" defaultValue={resourceUiSettings.portfolio.industryLabelShort} /></AdminField>
            <AdminField label="Portfolio engagement label"><AdminInput name="portfolioEngagementLabel" defaultValue={resourceUiSettings.portfolio.engagementLabel} /></AdminField>
            <AdminField label="Portfolio outcome label"><AdminInput name="portfolioOutcomeLabel" defaultValue={resourceUiSettings.portfolio.outcomeLabel} /></AdminField>
            <AdminField label="Portfolio services label"><AdminInput name="portfolioServicesProvidedLabel" defaultValue={resourceUiSettings.portfolio.servicesProvidedLabel} /></AdminField>
            <AdminField label="Portfolio timeline label"><AdminInput name="portfolioTimelineLabel" defaultValue={resourceUiSettings.portfolio.timelineLabel} /></AdminField>
            <AdminField label="Portfolio result title"><AdminInput name="portfolioResultTitle" defaultValue={resourceUiSettings.portfolio.resultTitle} /></AdminField>
            <AdminField label="Portfolio team title"><AdminInput name="portfolioTeamTitle" defaultValue={resourceUiSettings.portfolio.teamTitle} /></AdminField>
            <AdminField label="Portfolio more projects title"><AdminInput name="portfolioMoreProjectsTitle" defaultValue={resourceUiSettings.portfolio.moreProjectsTitle} /></AdminField>

            <AdminField label="Careers search placeholder"><AdminInput name="careersSearchPlaceholder" defaultValue={resourceUiSettings.careers.searchPlaceholder} /></AdminField>
            <AdminField label="Careers type label"><AdminInput name="careersTypeLabel" defaultValue={resourceUiSettings.careers.typeLabel} /></AdminField>
            <AdminField label="Careers all types label"><AdminInput name="careersAllTypesLabel" defaultValue={resourceUiSettings.careers.allTypesLabel} /></AdminField>
            <AdminField label="Careers mode label"><AdminInput name="careersModeLabel" defaultValue={resourceUiSettings.careers.modeLabel} /></AdminField>
            <AdminField label="Careers all modes label"><AdminInput name="careersAllModesLabel" defaultValue={resourceUiSettings.careers.allModesLabel} /></AdminField>
            <AdminField label="Careers view details label"><AdminInput name="careersViewDetailsLabel" defaultValue={resourceUiSettings.careers.viewDetailsLabel} /></AdminField>
            <div className="lg:col-span-2"><AdminField label="Careers empty message"><AdminTextarea name="careersEmptyMessage" defaultValue={resourceUiSettings.careers.emptyMessage} /></AdminField></div>
            <AdminField label="Career detail overview title"><AdminInput name="careersOverviewTitle" defaultValue={resourceUiSettings.careers.overviewTitle} /></AdminField>
            <AdminField label="Career responsibilities title"><AdminInput name="careersResponsibilitiesTitle" defaultValue={resourceUiSettings.careers.responsibilitiesTitle} /></AdminField>
            <AdminField label="Career requirements title"><AdminInput name="careersRequirementsTitle" defaultValue={resourceUiSettings.careers.requirementsTitle} /></AdminField>
            <AdminField label="Career benefits title"><AdminInput name="careersBenefitsTitle" defaultValue={resourceUiSettings.careers.benefitsTitle} /></AdminField>
            <AdminField label="Career apply button label"><AdminInput name="careersApplyButtonLabel" defaultValue={resourceUiSettings.careers.applyButtonLabel} /></AdminField>
            <AdminField label="Apply intro title"><AdminInput name="careersApplyIntroTitle" defaultValue={resourceUiSettings.careers.applyIntroTitle} /></AdminField>
            <div className="lg:col-span-2"><AdminField label="Apply intro description"><AdminTextarea name="careersApplyIntroDescription" defaultValue={resourceUiSettings.careers.applyIntroDescription} /></AdminField></div>
            <AdminField label="Apply full name placeholder"><AdminInput name="careersApplyFullNamePlaceholder" defaultValue={resourceUiSettings.careers.applyFullNamePlaceholder} /></AdminField>
            <AdminField label="Apply phone placeholder"><AdminInput name="careersApplyPhonePlaceholder" defaultValue={resourceUiSettings.careers.applyPhonePlaceholder} /></AdminField>
            <AdminField label="Apply email placeholder"><AdminInput name="careersApplyEmailPlaceholder" defaultValue={resourceUiSettings.careers.applyEmailPlaceholder} /></AdminField>
            <AdminField label="Apply location placeholder"><AdminInput name="careersApplyLocationPlaceholder" defaultValue={resourceUiSettings.careers.applyLocationPlaceholder} /></AdminField>
            <AdminField label="Apply LinkedIn placeholder"><AdminInput name="careersApplyLinkedInPlaceholder" defaultValue={resourceUiSettings.careers.applyLinkedInPlaceholder} /></AdminField>
            <AdminField label="Apply portfolio placeholder"><AdminInput name="careersApplyPortfolioPlaceholder" defaultValue={resourceUiSettings.careers.applyPortfolioPlaceholder} /></AdminField>
            <AdminField label="Apply CV placeholder"><AdminInput name="careersApplyCvPlaceholder" defaultValue={resourceUiSettings.careers.applyCvPlaceholder} /></AdminField>
            <AdminField label="Apply cover letter placeholder"><AdminInput name="careersApplyCoverLetterPlaceholder" defaultValue={resourceUiSettings.careers.applyCoverLetterPlaceholder} /></AdminField>
            <AdminField label="Apply summary prefix"><AdminInput name="careersApplySummaryPrefix" defaultValue={resourceUiSettings.careers.applySummaryPrefix} /></AdminField>
            <AdminField label="Apply submit label"><AdminInput name="careersApplySubmitLabel" defaultValue={resourceUiSettings.careers.applySubmitLabel} /></AdminField>

            <AdminField label="Blogs hero read button label"><AdminInput name="blogsHeroReadButtonLabel" defaultValue={resourceUiSettings.blogs.heroReadButtonLabel} /></AdminField>
            <AdminField label="Blogs search placeholder"><AdminInput name="blogsSearchPlaceholder" defaultValue={resourceUiSettings.blogs.searchPlaceholder} /></AdminField>
            <AdminField label="Blogs all categories label"><AdminInput name="blogsAllCategoriesLabel" defaultValue={resourceUiSettings.blogs.allCategoriesLabel} /></AdminField>
            <AdminField label="Blogs articles found suffix"><AdminInput name="blogsArticlesFoundSuffix" defaultValue={resourceUiSettings.blogs.articlesFoundSuffix} /></AdminField>
            <div className="lg:col-span-2"><AdminField label="Blogs empty search message"><AdminTextarea name="blogsEmptyExploreMessage" defaultValue={resourceUiSettings.blogs.emptyExploreMessage} /></AdminField></div>
            <AdminField label="Blogs latest title"><AdminInput name="blogsLatestTitle" defaultValue={resourceUiSettings.blogs.latestTitle} /></AdminField>
            <AdminField label="Blogs categories title"><AdminInput name="blogsCategoriesTitle" defaultValue={resourceUiSettings.blogs.categoriesTitle} /></AdminField>
            <AdminField label="Blogs latest empty message"><AdminInput name="blogsLatestEmptyMessage" defaultValue={resourceUiSettings.blogs.latestEmptyMessage} /></AdminField>
            <div className="lg:col-span-2"><AdminField label="Blog author summary template"><AdminTextarea name="blogsAuthorSummaryTemplate" defaultValue={resourceUiSettings.blogs.authorSummaryTemplate} /></AdminField></div>
            <AdminField label="Blog details title"><AdminInput name="blogsDetailsTitle" defaultValue={resourceUiSettings.blogs.detailsTitle} /></AdminField>
            <AdminField label="Blog related title"><AdminInput name="blogsRelatedTitle" defaultValue={resourceUiSettings.blogs.relatedTitle} /></AdminField>
            <AdminField label="Blog no related message"><AdminInput name="blogsNoRelatedMessage" defaultValue={resourceUiSettings.blogs.noRelatedMessage} /></AdminField>
          </div>

          <FormActions>
            <SubmitButton label="Save resource UI settings" pendingLabel="Saving resource UI..." />
          </FormActions>
        </form>
      </AdminSectionCard>
    </AdminShell>
  );
}
