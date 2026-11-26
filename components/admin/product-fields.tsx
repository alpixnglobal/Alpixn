import type { ReactNode } from "react";

import { AdminCheckbox, AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { ProductAudienceRecord, ProductFaqRecord, ProductFeatureRecord, ProductPageRecord, ProductSettingsRecord } from "@/lib/content-types";

function ProductSectionBlock({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
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

function getFixedItems<T>(items: T[] | undefined, count: number, fallback: T) {
  return Array.from({ length: count }, (_, index) => items?.[index] ?? fallback);
}

const emptyFeature: ProductFeatureRecord = {
  title: "",
  description: "",
  imageData: "",
  buttonLabel: "View Full Details",
  buttonHref: "#",
};

const emptyAudience: ProductAudienceRecord = {
  title: "",
  description: "",
  imageData: "",
};

const emptyFaq: ProductFaqRecord = {
  question: "",
  answer: "",
};

export function ProductEntryFields({ values = {} }: { values?: Partial<ProductPageRecord> }) {
  return (
    <>
      <AdminField label="Navigation label">
        <AdminInput name="navLabel" required defaultValue={values.navLabel} placeholder="Salon Management" />
      </AdminField>
      <AdminField label="Hero title">
        <AdminInput name="heroTitle" required defaultValue={values.heroTitle} placeholder="Salon Management Software" />
      </AdminField>
      <AdminField label="Hero subtitle">
        <AdminInput name="heroSubtitle" defaultValue={values.heroSubtitle} placeholder="Transform Your Salon Operations" />
      </AdminField>
      <AdminField label="Display order">
        <AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Hero description">
          <AdminTextarea name="heroDescription" required defaultValue={values.heroDescription} className="min-h-28" />
        </AdminField>
      </div>
      <AdminField label="Hero button label">
        <AdminInput name="heroButtonLabel" defaultValue={values.heroButtonLabel} placeholder="Book Your Demo" />
      </AdminField>
      <AdminField label="Hero button link">
        <AdminInput name="heroButtonHref" defaultValue={values.heroButtonHref} placeholder="/contact-us" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminCheckbox name="isPublished" label="Published in navbar and product pages" defaultChecked={values.isPublished ?? true} />
      </div>
    </>
  );
}

export function ProductSettingsFields({ values }: { values: ProductSettingsRecord }) {
  const features = getFixedItems(values.featureCards, 3, emptyFeature);
  const audiences = getFixedItems(values.audienceCards, 4, emptyAudience);
  const faqs = getFixedItems(values.faqs, 6, emptyFaq);

  return (
    <div className="grid gap-5">
      <ProductSectionBlock title="Navbar Dropdown" defaultOpen>
        <AdminField label="Dropdown title">
          <AdminInput name="menuTitle" defaultValue={values.menuTitle} />
        </AdminField>
        <AdminField label="Button label">
          <AdminInput name="menuButtonLabel" defaultValue={values.menuButtonLabel} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Dropdown description">
            <AdminTextarea name="menuDescription" defaultValue={values.menuDescription} className="min-h-24" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <AdminField label="Dropdown secondary description">
            <AdminTextarea name="menuDescriptionSecondary" defaultValue={values.menuDescriptionSecondary} className="min-h-24" />
          </AdminField>
        </div>
        <AdminField label="Button link">
          <AdminInput name="menuButtonHref" defaultValue={values.menuButtonHref} />
        </AdminField>
        <div className="lg:col-span-2">
          <ImageUploadField name="menuImageData" label="Dropdown image" description="Shown on the right side of the products navbar dropdown." defaultValue={values.menuImageData} />
        </div>
      </ProductSectionBlock>

      <ProductSectionBlock title="Landing Hero">
        <AdminField label="Hero subtitle">
          <AdminInput name="landingHeroSubtitle" defaultValue={values.landingHeroSubtitle} />
        </AdminField>
        <AdminField label="Hero title">
          <AdminInput name="landingHeroTitle" defaultValue={values.landingHeroTitle} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Hero description">
            <AdminTextarea name="landingHeroDescription" defaultValue={values.landingHeroDescription} className="min-h-28" />
          </AdminField>
        </div>
        <AdminField label="Hero button label">
          <AdminInput name="landingHeroButtonLabel" defaultValue={values.landingHeroButtonLabel} />
        </AdminField>
        <AdminField label="Hero button link">
          <AdminInput name="landingHeroButtonHref" defaultValue={values.landingHeroButtonHref} />
        </AdminField>
      </ProductSectionBlock>

      <ProductSectionBlock title="Custom Support Section">
        <AdminField label="Section title">
          <AdminTextarea name="customSupportTitle" defaultValue={values.customSupportTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section description">
            <AdminTextarea name="customSupportDescription" defaultValue={values.customSupportDescription} className="min-h-28" />
          </AdminField>
        </div>
        <div className="lg:col-span-2">
          <ImageUploadField name="customSupportImageData" label="Section image" description="Used on the right side of the custom support section." defaultValue={values.customSupportImageData} />
        </div>
      </ProductSectionBlock>

      <ProductSectionBlock title="Features Section">
        <AdminField label="Section title">
          <AdminTextarea name="featuresTitle" defaultValue={values.featuresTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section description">
            <AdminTextarea name="featuresDescription" defaultValue={values.featuresDescription} className="min-h-28" />
          </AdminField>
        </div>
        {features.map((feature, index) => (
          <div key={`feature-card-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Feature ${index + 1} title`}>
                <AdminInput name={`featureCardTitle${index}`} defaultValue={feature.title} />
              </AdminField>
              <AdminField label={`Feature ${index + 1} button label`}>
                <AdminInput name={`featureCardButtonLabel${index}`} defaultValue={feature.buttonLabel} />
              </AdminField>
              <AdminField label={`Feature ${index + 1} button link`}>
                <AdminInput name={`featureCardButtonHref${index}`} defaultValue={feature.buttonHref} />
              </AdminField>
              <div className="lg:col-span-2">
                <AdminField label={`Feature ${index + 1} description`}>
                  <AdminTextarea name={`featureCardDescription${index}`} defaultValue={feature.description} className="min-h-24" />
                </AdminField>
              </div>
              <div className="lg:col-span-2">
                <ImageUploadField name={`featureCardImage${index}`} label={`Feature ${index + 1} image`} description="Used inside the feature visual block." defaultValue={feature.imageData} />
              </div>
            </div>
          </div>
        ))}
      </ProductSectionBlock>

      <ProductSectionBlock title="Transform Engagement Section">
        <AdminField label="Section title">
          <AdminTextarea name="transformTitle" defaultValue={values.transformTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section description">
            <AdminTextarea name="transformDescription" defaultValue={values.transformDescription} className="min-h-28" />
          </AdminField>
        </div>
        {audiences.map((audience, index) => (
          <div key={`audience-card-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label={`Audience ${index + 1} title`}>
                <AdminInput name={`audienceCardTitle${index}`} defaultValue={audience.title} />
              </AdminField>
              <div className="lg:col-span-2">
                <AdminField label={`Audience ${index + 1} description`}>
                  <AdminTextarea name={`audienceCardDescription${index}`} defaultValue={audience.description} className="min-h-24" />
                </AdminField>
              </div>
              <div className="lg:col-span-2">
                <ImageUploadField name={`audienceCardImage${index}`} label={`Audience ${index + 1} icon`} description="Icon shown at the bottom-right of the card." defaultValue={audience.imageData} />
              </div>
            </div>
          </div>
        ))}
      </ProductSectionBlock>

      <ProductSectionBlock title="FAQ Section">
        <AdminField label="Section title">
          <AdminTextarea name="faqTitle" defaultValue={values.faqTitle} className="min-h-24" />
        </AdminField>
        {faqs.map((faq, index) => (
          <div key={`product-faq-${index}`} className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4">
            <div className="grid gap-5">
              <AdminField label={`FAQ ${index + 1} question`}>
                <AdminInput name={`productFaqQuestion${index}`} defaultValue={faq.question} />
              </AdminField>
              <AdminField label={`FAQ ${index + 1} answer`}>
                <AdminTextarea name={`productFaqAnswer${index}`} defaultValue={faq.answer} className="min-h-24" />
              </AdminField>
            </div>
          </div>
        ))}
      </ProductSectionBlock>

      <ProductSectionBlock title="Drive Customers CTA">
        <AdminField label="Section title">
          <AdminTextarea name="driveTitle" defaultValue={values.driveTitle} className="min-h-24" />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section description">
            <AdminTextarea name="driveDescription" defaultValue={values.driveDescription} className="min-h-28" />
          </AdminField>
        </div>
        <AdminField label="Button label">
          <AdminInput name="driveButtonLabel" defaultValue={values.driveButtonLabel} />
        </AdminField>
        <AdminField label="Button link">
          <AdminInput name="driveButtonHref" defaultValue={values.driveButtonHref} />
        </AdminField>
      </ProductSectionBlock>
    </div>
  );
}
