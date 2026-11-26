import type { ReactNode } from "react";

import { AdminCheckbox, AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type {
  TechnologyCaseStudyRecord,
  TechnologyChallengeCardRecord,
  TechnologyEngagementModelRecord,
  TechnologyFaqRecord,
  TechnologyLogoRecord,
  TechnologyPageRecord,
  TechnologySimpleCardRecord,
  TechnologyStackItemRecord,
  TechnologyStatRecord,
} from "@/lib/content-types";

function SectionBlock({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-[#00070e] dark:text-[#00070e] dark:text-white">{title}</h3>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500 dark:text-slate-400">
            Expand
          </span>
        </div>
      </summary>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">{children}</div>
    </details>
  );
}

const emptyLogo: TechnologyLogoRecord = { label: "", imageData: "", href: "#" };
const emptySimpleCard: TechnologySimpleCardRecord = { title: "", description: "" };
const emptyChallengeCard: TechnologyChallengeCardRecord = { title: "", description: "", imageData: "", linkLabel: "" };
const emptyCaseStudy: TechnologyCaseStudyRecord = { title: "", description: "", imageData: "", featuresLeft: [], featuresRight: [] };
const emptyStackItem: TechnologyStackItemRecord = { label: "", imageData: "" };
const emptyStat: TechnologyStatRecord = { value: "", label: "" };
const emptyEngagementModel: TechnologyEngagementModelRecord = { title: "", description: "", bullets: [] };
const emptyFaq: TechnologyFaqRecord = { question: "", answer: "" };

function getFixedItems<T>(items: T[] | undefined, count: number, fallback: T) {
  return Array.from({ length: count }, (_, index) => items?.[index] ?? fallback);
}

export function TechnologyFields({ values = {} }: { values?: Partial<TechnologyPageRecord> }) {
  const heroLogos = getFixedItems(values.heroLogos, 7, emptyLogo);
  const challengeCards = getFixedItems(values.challengeCards, 4, emptyChallengeCard);
  const talkCards = getFixedItems(values.talkCards, 4, emptySimpleCard);
  const successCards = getFixedItems(values.successCards, 9, emptySimpleCard);
  const caseStudies = getFixedItems(values.provenCaseStudies, 5, emptyCaseStudy);
  const qualityPoints = getFixedItems(values.qualityPoints, 8, emptySimpleCard);
  const stackItems = getFixedItems(values.stackItems, 10, emptyStackItem);
  const leaderStats = getFixedItems(values.leaderStats, 5, emptyStat);
  const engagementModels = getFixedItems(values.engagementModels, 3, emptyEngagementModel);
  const faqs = getFixedItems(values.faqs, 5, emptyFaq);

  return (
    <>
      <AdminField label="Slug">
        <AdminInput name="slug" required defaultValue={values.slug} placeholder="node-js" />
      </AdminField>
      <AdminField label="Category">
        <AdminInput name="category" required defaultValue={values.category} placeholder="backend" />
      </AdminField>
      <AdminField label="Display order">
        <AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} />
      </AdminField>
      <div className="lg:col-span-2 flex flex-wrap gap-3">
        <AdminCheckbox name="isPublished" label="Published on website" defaultChecked={values.isPublished ?? true} />
        <AdminCheckbox name="isLanding" label="Use as /technologies landing page" defaultChecked={values.isLanding ?? false} />
      </div>

      <div className="lg:col-span-2">
        <SectionBlock title="Hero Section" defaultOpen>
          <AdminField label="Hero subtitle">
            <AdminInput name="heroSubtitle" defaultValue={values.heroSubtitle} />
          </AdminField>
          <AdminField label="Hero title">
            <AdminInput name="heroTitle" defaultValue={values.heroTitle} />
          </AdminField>
          <div className="lg:col-span-2">
            <AdminField label="Hero description">
              <AdminTextarea name="heroDescription" defaultValue={values.heroDescription} />
            </AdminField>
          </div>
          <AdminField label="Primary button label">
            <AdminInput name="heroPrimaryButtonLabel" defaultValue={values.heroPrimaryButtonLabel} />
          </AdminField>
          <AdminField label="Primary button link">
            <AdminInput name="heroPrimaryButtonHref" defaultValue={values.heroPrimaryButtonHref} />
          </AdminField>
          <AdminField label="Secondary button label">
            <AdminInput name="heroSecondaryButtonLabel" defaultValue={values.heroSecondaryButtonLabel} />
          </AdminField>
          <AdminField label="Secondary button link">
            <AdminInput name="heroSecondaryButtonHref" defaultValue={values.heroSecondaryButtonHref} />
          </AdminField>
          {heroLogos.map((logo, index) => (
            <div key={`hero-logo-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
              <div className="grid gap-5 lg:grid-cols-2">
                <AdminField label={`Logo ${index + 1} label`}>
                  <AdminInput name={`heroLogoLabel${index}`} defaultValue={logo.label} />
                </AdminField>
                <AdminField label={`Logo ${index + 1} link`}>
                  <AdminInput name={`heroLogoHref${index}`} defaultValue={logo.href} />
                </AdminField>
                <div className="lg:col-span-2">
                  <ImageUploadField
                    name={`heroLogoImage${index}`}
                    label={`Logo ${index + 1} image`}
                    description="Upload partner logo or keep the existing static image path."
                    defaultValue={logo.imageData}
                  />
                </div>
              </div>
            </div>
          ))}
        </SectionBlock>
      </div>

      <div className="lg:col-span-2">
        <SectionBlock title="Challenges Section">
          <div className="lg:col-span-2">
            <AdminField label="Section title">
              <AdminTextarea name="challengesTitle" defaultValue={values.challengesTitle} className="min-h-24" />
            </AdminField>
          </div>
          {challengeCards.map((card, index) => (
            <div key={`challenge-card-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
              <div className="grid gap-5 lg:grid-cols-2">
                <AdminField label={`Card ${index + 1} title`}>
                  <AdminInput name={`challengeCardTitle${index}`} defaultValue={card.title} />
                </AdminField>
                <AdminField label={`Card ${index + 1} link label`}>
                  <AdminInput name={`challengeCardLinkLabel${index}`} defaultValue={card.linkLabel} />
                </AdminField>
                <div className="lg:col-span-2">
                  <AdminField label={`Card ${index + 1} description`}>
                    <AdminTextarea name={`challengeCardDescription${index}`} defaultValue={card.description} className="min-h-24" />
                  </AdminField>
                </div>
                <div className="lg:col-span-2">
                  <ImageUploadField
                    name={`challengeCardImage${index}`}
                    label={`Card ${index + 1} image`}
                    description="Used inside the challenge card visual area."
                    defaultValue={card.imageData}
                  />
                </div>
              </div>
            </div>
          ))}
        </SectionBlock>
      </div>

      <div className="lg:col-span-2">
        <SectionBlock title="Unlock CTA">
          <div className="lg:col-span-2">
            <AdminField label="CTA title">
              <AdminTextarea name="unlockTitle" defaultValue={values.unlockTitle} className="min-h-24" />
            </AdminField>
          </div>
          <AdminField label="Button label">
            <AdminInput name="unlockButtonLabel" defaultValue={values.unlockButtonLabel} />
          </AdminField>
          <AdminField label="Button link">
            <AdminInput name="unlockButtonHref" defaultValue={values.unlockButtonHref} />
          </AdminField>
        </SectionBlock>
      </div>

      <div className="lg:col-span-2">
        <SectionBlock title="Talk To Expert Section">
          <div className="lg:col-span-2">
            <AdminField label="Section title">
              <AdminTextarea name="talkTitle" defaultValue={values.talkTitle} className="min-h-24" />
            </AdminField>
          </div>
          <AdminField label="Button label">
            <AdminInput name="talkButtonLabel" defaultValue={values.talkButtonLabel} />
          </AdminField>
          <AdminField label="Button link">
            <AdminInput name="talkButtonHref" defaultValue={values.talkButtonHref} />
          </AdminField>
          {talkCards.map((card, index) => (
            <div key={`talk-card-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
              <div className="grid gap-5 lg:grid-cols-2">
                <AdminField label={`Card ${index + 1} title`}>
                  <AdminInput name={`talkCardTitle${index}`} defaultValue={card.title} />
                </AdminField>
                <div className="lg:col-span-2">
                  <AdminField label={`Card ${index + 1} description`}>
                    <AdminTextarea name={`talkCardDescription${index}`} defaultValue={card.description} className="min-h-24" />
                  </AdminField>
                </div>
              </div>
            </div>
          ))}
        </SectionBlock>
      </div>

      <div className="lg:col-span-2">
        <SectionBlock title="Success Cards Section">
          <div className="lg:col-span-2">
            <AdminField label="Section title">
              <AdminTextarea name="successTitle" defaultValue={values.successTitle} className="min-h-24" />
            </AdminField>
          </div>
          {successCards.map((card, index) => (
            <div key={`success-card-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
              <div className="grid gap-5 lg:grid-cols-2">
                <AdminField label={`Card ${index + 1} title`}>
                  <AdminInput name={`successCardTitle${index}`} defaultValue={card.title} />
                </AdminField>
                <div className="lg:col-span-2">
                  <AdminField label={`Card ${index + 1} description`}>
                    <AdminTextarea name={`successCardDescription${index}`} defaultValue={card.description} className="min-h-24" />
                  </AdminField>
                </div>
              </div>
            </div>
          ))}
        </SectionBlock>
      </div>

      <div className="lg:col-span-2">
        <SectionBlock title="Proven Pioneers Section">
          <AdminField label="Section title">
            <AdminTextarea name="provenTitle" defaultValue={values.provenTitle} className="min-h-24" />
          </AdminField>
          <div className="lg:col-span-2">
            <AdminField label="Section description">
              <AdminTextarea name="provenDescription" defaultValue={values.provenDescription} className="min-h-28" />
            </AdminField>
          </div>
          {caseStudies.map((study, index) => (
            <div key={`case-study-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
              <div className="grid gap-5 lg:grid-cols-2">
                <AdminField label={`Case study ${index + 1} title`}>
                  <AdminInput name={`caseStudyTitle${index}`} defaultValue={study.title} />
                </AdminField>
                <div className="lg:col-span-2">
                  <AdminField label={`Case study ${index + 1} description`}>
                    <AdminTextarea name={`caseStudyDescription${index}`} defaultValue={study.description} className="min-h-24" />
                  </AdminField>
                </div>
                <div className="lg:col-span-2">
                  <AdminField label={`Case study ${index + 1} left bullets`} hint="Use one bullet per line.">
                    <AdminTextarea name={`caseStudyFeaturesLeft${index}`} defaultValue={study.featuresLeft.join("\n")} className="min-h-24" />
                  </AdminField>
                </div>
                <div className="lg:col-span-2">
                  <AdminField label={`Case study ${index + 1} right bullets`} hint="Use one bullet per line.">
                    <AdminTextarea name={`caseStudyFeaturesRight${index}`} defaultValue={study.featuresRight.join("\n")} className="min-h-24" />
                  </AdminField>
                </div>
                <div className="lg:col-span-2">
                  <ImageUploadField
                    name={`caseStudyImage${index}`}
                    label={`Case study ${index + 1} image`}
                    description="Main visual shown on the case study slider."
                    defaultValue={study.imageData}
                  />
                </div>
              </div>
            </div>
          ))}
        </SectionBlock>
      </div>

      <div className="lg:col-span-2">
        <SectionBlock title="Expert Guidance CTA">
          <div className="lg:col-span-2">
            <AdminField label="CTA title">
              <AdminTextarea name="guidanceTitle" defaultValue={values.guidanceTitle} className="min-h-24" />
            </AdminField>
          </div>
          <AdminField label="Button label">
            <AdminInput name="guidanceButtonLabel" defaultValue={values.guidanceButtonLabel} />
          </AdminField>
          <AdminField label="Button link">
            <AdminInput name="guidanceButtonHref" defaultValue={values.guidanceButtonHref} />
          </AdminField>
        </SectionBlock>
      </div>

      <div className="lg:col-span-2">
        <SectionBlock title="Quality Section">
          <AdminField label="Eyebrow">
            <AdminInput name="qualityEyebrow" defaultValue={values.qualityEyebrow} />
          </AdminField>
          <AdminField label="Title">
            <AdminTextarea name="qualityTitle" defaultValue={values.qualityTitle} className="min-h-24" />
          </AdminField>
          <div className="lg:col-span-2">
            <AdminField label="Description">
              <AdminTextarea name="qualityDescription" defaultValue={values.qualityDescription} className="min-h-28" />
            </AdminField>
          </div>
          {qualityPoints.map((point, index) => (
            <div key={`quality-point-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
              <div className="grid gap-5 lg:grid-cols-2">
                <AdminField label={`Point ${index + 1} title`}>
                  <AdminInput name={`qualityPointTitle${index}`} defaultValue={point.title} />
                </AdminField>
                <div className="lg:col-span-2">
                  <AdminField label={`Point ${index + 1} description`}>
                    <AdminTextarea name={`qualityPointDescription${index}`} defaultValue={point.description} className="min-h-24" />
                  </AdminField>
                </div>
              </div>
            </div>
          ))}
        </SectionBlock>
      </div>

      <div className="lg:col-span-2">
        <SectionBlock title="Technology Stack Section">
          <div className="lg:col-span-2">
            <AdminField label="Section title">
              <AdminTextarea name="stackTitle" defaultValue={values.stackTitle} className="min-h-24" />
            </AdminField>
          </div>
          {stackItems.map((item, index) => (
            <div key={`stack-item-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
              <div className="grid gap-5 lg:grid-cols-2">
                <AdminField label={`Stack item ${index + 1} label`}>
                  <AdminInput name={`stackItemLabel${index}`} defaultValue={item.label} />
                </AdminField>
                <div className="lg:col-span-2">
                  <ImageUploadField
                    name={`stackItemImage${index}`}
                    label={`Stack item ${index + 1} image`}
                    description="Icon used in the technology stack grid."
                    defaultValue={item.imageData}
                  />
                </div>
              </div>
            </div>
          ))}
        </SectionBlock>
      </div>

      <div className="lg:col-span-2">
        <SectionBlock title="Industry Leader Stats">
          <div className="lg:col-span-2">
            <AdminField label="Section title">
              <AdminTextarea name="leaderTitle" defaultValue={values.leaderTitle} className="min-h-24" />
            </AdminField>
          </div>
          {leaderStats.map((item, index) => (
            <div key={`leader-stat-${index}`} className="rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
              <div className="grid gap-5">
                <AdminField label={`Stat ${index + 1} value`}>
                  <AdminInput name={`leaderStatValue${index}`} defaultValue={item.value} />
                </AdminField>
                <AdminField label={`Stat ${index + 1} label`}>
                  <AdminInput name={`leaderStatLabel${index}`} defaultValue={item.label} />
                </AdminField>
              </div>
            </div>
          ))}
        </SectionBlock>
      </div>

      <div className="lg:col-span-2">
        <SectionBlock title="Engagement Models Section">
          <AdminField label="Section title">
            <AdminTextarea name="engagementTitle" defaultValue={values.engagementTitle} className="min-h-24" />
          </AdminField>
          <div className="lg:col-span-2">
            <AdminField label="Section description">
              <AdminTextarea name="engagementDescription" defaultValue={values.engagementDescription} className="min-h-28" />
            </AdminField>
          </div>
          {engagementModels.map((model, index) => (
            <div key={`engagement-model-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
              <div className="grid gap-5 lg:grid-cols-2">
                <AdminField label={`Model ${index + 1} title`}>
                  <AdminInput name={`engagementModelTitle${index}`} defaultValue={model.title} />
                </AdminField>
                <div className="lg:col-span-2">
                  <AdminField label={`Model ${index + 1} description`}>
                    <AdminTextarea name={`engagementModelDescription${index}`} defaultValue={model.description} className="min-h-24" />
                  </AdminField>
                </div>
                <div className="lg:col-span-2">
                  <AdminField label={`Model ${index + 1} bullets`} hint="Use one bullet per line.">
                    <AdminTextarea name={`engagementModelBullets${index}`} defaultValue={model.bullets.join("\n")} className="min-h-24" />
                  </AdminField>
                </div>
              </div>
            </div>
          ))}
        </SectionBlock>
      </div>

      <div className="lg:col-span-2">
        <SectionBlock title="FAQ Section">
          <div className="lg:col-span-2">
            <AdminField label="FAQ title">
              <AdminTextarea name="faqTitle" defaultValue={values.faqTitle} className="min-h-24" />
            </AdminField>
          </div>
          {faqs.map((faq, index) => (
            <div key={`faq-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
              <div className="grid gap-5">
                <AdminField label={`FAQ ${index + 1} question`}>
                  <AdminInput name={`faqQuestion${index}`} defaultValue={faq.question} />
                </AdminField>
                <AdminField label={`FAQ ${index + 1} answer`}>
                  <AdminTextarea name={`faqAnswer${index}`} defaultValue={faq.answer} className="min-h-24" />
                </AdminField>
              </div>
            </div>
          ))}
        </SectionBlock>
      </div>
    </>
  );
}
