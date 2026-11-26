import { AdminCheckbox, AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import { ImageUploadField } from "@/components/admin/image-upload-field";

type InternValues = {
  name?: string;
  role?: string;
  duration?: string;
  award?: string;
  certificateId?: string;
  program?: string;
  track?: string;
  initials?: string;
  accent?: string;
  imageData?: string;
  order?: number;
  isPublished?: boolean;
};

type TeamValues = {
  name?: string;
  role?: string;
  focus?: string;
  initials?: string;
  accent?: string;
  imageData?: string;
  order?: number;
  isPublished?: boolean;
};

type PortfolioValues = {
  title?: string;
  summary?: string;
  industry?: string;
  engagement?: string;
  timeline?: string;
  outcome?: string;
  tags?: string[];
  objective?: string;
  objectivePoints?: string[];
  solutionPoints?: string[];
  resultPrimaryValue?: string;
  resultPrimaryLabel?: string;
  resultSecondaryValue?: string;
  resultSecondaryLabel?: string;
  resultBullets?: string[];
  galleryImageOne?: string;
  galleryImageTwo?: string;
  galleryImageThree?: string;
  galleryImageFour?: string;
  accent?: string;
  imageData?: string;
  order?: number;
  isPublished?: boolean;
};

type JobValues = {
  company?: string;
  title?: string;
  type?: string;
  mode?: string;
  salary?: string;
  posted?: string;
  location?: string;
  overview?: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  accent?: string;
  imageData?: string;
  order?: number;
  isPublished?: boolean;
};

type BlogValues = {
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  readTime?: string;
  category?: string;
  accent?: string;
  imageData?: string;
  order?: number;
  isPublished?: boolean;
  featured?: boolean;
};

type PageCopyValues = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  sectionEyebrow?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
};

export function InternFields({ values = {} }: { values?: InternValues }) {
  return (
    <>
      <AdminField label="Name">
        <AdminInput name="name" required defaultValue={values.name} placeholder="Priya Sharma" />
      </AdminField>
      <AdminField label="Role">
        <AdminInput name="role" required defaultValue={values.role} placeholder="React Developer Intern" />
      </AdminField>
      <AdminField label="Duration">
        <AdminInput name="duration" required defaultValue={values.duration} placeholder="Jul 2025 - Sep 2025" />
      </AdminField>
      <AdminField label="Award">
        <AdminInput name="award" required defaultValue={values.award} placeholder="Gold" />
      </AdminField>
      <AdminField label="Certificate ID">
        <AdminInput name="certificateId" required defaultValue={values.certificateId} placeholder="AXAON/INT/2025/03" />
      </AdminField>
      <AdminField label="Program">
        <AdminInput name="program" required defaultValue={values.program} placeholder="3 Months Program" />
      </AdminField>
      <AdminField label="Track">
        <AdminInput name="track" required defaultValue={values.track} placeholder="Developer" />
      </AdminField>
      <AdminField label="Initials">
        <AdminInput name="initials" required defaultValue={values.initials} placeholder="PS" />
      </AdminField>
      <AdminField label="Card accent" hint="Hex color or full CSS gradient string.">
        <AdminInput
          name="accent"
          defaultValue={values.accent}
          placeholder="linear-gradient(135deg, rgba(250, 204, 21, 0.42), rgba(249, 115, 22, 0.18))"
        />
      </AdminField>
      <AdminField label="Display order">
        <AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} />
      </AdminField>
      <div className="lg:col-span-2">
        <ImageUploadField
          name="imageData"
          label="Intern image"
          description="This file is converted to base64 before submit. Large files are auto-compressed on save without changing dimensions."
          defaultValue={values.imageData}
        />
      </div>
      <div className="lg:col-span-2">
        <AdminCheckbox name="isPublished" label="Published on website" defaultChecked={values.isPublished ?? true} />
      </div>
    </>
  );
}

export function TeamFields({ values = {} }: { values?: TeamValues }) {
  return (
    <>
      <AdminField label="Name">
        <AdminInput name="name" required defaultValue={values.name} placeholder="Meena Iyer" />
      </AdminField>
      <AdminField label="Role">
        <AdminInput name="role" required defaultValue={values.role} placeholder="Chief Executive Officer" />
      </AdminField>
      <AdminField label="Initials">
        <AdminInput name="initials" required defaultValue={values.initials} placeholder="MI" />
      </AdminField>
      <AdminField label="Display order">
        <AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} />
      </AdminField>
      <AdminField label="Accent" hint="Used when no photo is uploaded.">
        <AdminInput
          name="accent"
          defaultValue={values.accent}
          placeholder="linear-gradient(135deg, rgba(14, 165, 233, 0.42), rgba(30, 41, 59, 0.18))"
        />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Focus / bio">
          <AdminTextarea name="focus" required defaultValue={values.focus} placeholder="Company strategy, client partnerships, and growth." />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <ImageUploadField
          name="imageData"
          label="Profile image"
          description="If empty, the public page falls back to the accent and initials card style."
          defaultValue={values.imageData}
        />
      </div>
      <div className="lg:col-span-2">
        <AdminCheckbox name="isPublished" label="Published on website" defaultChecked={values.isPublished ?? true} />
      </div>
    </>
  );
}

export function PortfolioFields({ values = {} }: { values?: PortfolioValues }) {
  return (
    <>
      <AdminField label="Project title">
        <AdminInput name="title" required defaultValue={values.title} placeholder="Leap Into Digitalized Referrals" />
      </AdminField>
      <AdminField label="Industry">
        <AdminInput name="industry" required defaultValue={values.industry} placeholder="Construction CRM" />
      </AdminField>
      <AdminField label="Engagement">
        <AdminInput name="engagement" required defaultValue={values.engagement} placeholder="UX/UI + Platform Build" />
      </AdminField>
      <AdminField label="Timeline">
        <AdminInput name="timeline" required defaultValue={values.timeline} placeholder="14 weeks" />
      </AdminField>
      <AdminField label="Outcome">
        <AdminInput name="outcome" required defaultValue={values.outcome} placeholder="+38% partner participation" />
      </AdminField>
      <AdminField label="Tags" hint="Use commas or new lines.">
        <AdminTextarea
          name="tags"
          defaultValue={values.tags?.join(", ")}
          placeholder="Web Application, Dashboard, CRM"
          className="min-h-24"
        />
      </AdminField>
      <AdminField label="Accent">
        <AdminInput
          name="accent"
          defaultValue={values.accent}
          placeholder="linear-gradient(160deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.12))"
        />
      </AdminField>
      <AdminField label="Display order">
        <AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Summary">
          <AdminTextarea name="summary" required defaultValue={values.summary} placeholder="Describe the problem, work, and result." />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Objective">
          <AdminTextarea name="objective" defaultValue={values.objective} placeholder="Explain the project objective and overall direction." />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Objective points" hint="Use one point per line.">
          <AdminTextarea name="objectivePoints" defaultValue={values.objectivePoints?.join("\n")} className="min-h-28" />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Solution points" hint="Use one point per line.">
          <AdminTextarea name="solutionPoints" defaultValue={values.solutionPoints?.join("\n")} className="min-h-28" />
        </AdminField>
      </div>
      <AdminField label="Primary result value">
        <AdminInput name="resultPrimaryValue" defaultValue={values.resultPrimaryValue} placeholder="71.4%" />
      </AdminField>
      <AdminField label="Primary result label">
        <AdminInput name="resultPrimaryLabel" defaultValue={values.resultPrimaryLabel} placeholder="Conversion Increase" />
      </AdminField>
      <AdminField label="Secondary result value">
        <AdminInput name="resultSecondaryValue" defaultValue={values.resultSecondaryValue} placeholder="342.4%" />
      </AdminField>
      <AdminField label="Secondary result label">
        <AdminInput name="resultSecondaryLabel" defaultValue={values.resultSecondaryLabel} placeholder="Revenue Increase" />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Result bullets" hint="Use one point per line.">
          <AdminTextarea name="resultBullets" defaultValue={values.resultBullets?.join("\n")} className="min-h-28" />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <ImageUploadField
          name="imageData"
          label="Cover image"
          description="Used for the top visual of the public portfolio card."
          defaultValue={values.imageData}
        />
      </div>
      <div className="lg:col-span-2">
        <ImageUploadField name="galleryImageOne" label="Gallery image 1" description="First detail-gallery image." defaultValue={values.galleryImageOne} />
      </div>
      <div className="lg:col-span-2">
        <ImageUploadField name="galleryImageTwo" label="Gallery image 2" description="Second detail-gallery image." defaultValue={values.galleryImageTwo} />
      </div>
      <div className="lg:col-span-2">
        <ImageUploadField name="galleryImageThree" label="Gallery image 3" description="Third detail-gallery image." defaultValue={values.galleryImageThree} />
      </div>
      <div className="lg:col-span-2">
        <ImageUploadField name="galleryImageFour" label="Gallery image 4" description="Fourth detail-gallery image." defaultValue={values.galleryImageFour} />
      </div>
      <div className="lg:col-span-2">
        <AdminCheckbox name="isPublished" label="Published on website" defaultChecked={values.isPublished ?? true} />
      </div>
    </>
  );
}

export function JobFields({ values = {} }: { values?: JobValues }) {
  return (
    <>
      <AdminField label="Company">
        <AdminInput name="company" required defaultValue={values.company} placeholder="Future Vision Inc." />
      </AdminField>
      <AdminField label="Job title">
        <AdminInput name="title" required defaultValue={values.title} placeholder="UX Researcher" />
      </AdminField>
      <AdminField label="Type">
        <AdminInput name="type" required defaultValue={values.type} placeholder="Full Time" />
      </AdminField>
      <AdminField label="Work mode">
        <AdminInput name="mode" required defaultValue={values.mode} placeholder="On Site" />
      </AdminField>
      <AdminField label="Salary">
        <AdminInput name="salary" required defaultValue={values.salary} placeholder="Monthly INR 30,000 - 45,000" />
      </AdminField>
      <AdminField label="Posted date">
        <AdminInput name="posted" required defaultValue={values.posted} placeholder="Oct 24, 2025" />
      </AdminField>
      <AdminField label="Location">
        <AdminInput name="location" required defaultValue={values.location} placeholder="Ahmedabad" />
      </AdminField>
      <AdminField label="Card accent">
        <AdminInput
          name="accent"
          defaultValue={values.accent}
          placeholder="linear-gradient(160deg, rgba(56, 189, 248, 0.24), rgba(14, 165, 233, 0.08))"
        />
      </AdminField>
      <AdminField label="Display order">
        <AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Role overview">
          <AdminTextarea
            name="overview"
            defaultValue={values.overview}
            placeholder="Summarize what the role owns and why it matters."
          />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Responsibilities" hint="Use one responsibility per line.">
          <AdminTextarea
            name="responsibilities"
            defaultValue={values.responsibilities?.join("\n")}
            placeholder="Plan interviews and research sessions"
            className="min-h-28"
          />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Requirements" hint="Use one requirement per line.">
          <AdminTextarea
            name="requirements"
            defaultValue={values.requirements?.join("\n")}
            placeholder="Experience with product discovery and research"
            className="min-h-28"
          />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Benefits" hint="Use one benefit per line.">
          <AdminTextarea
            name="benefits"
            defaultValue={values.benefits?.join("\n")}
            placeholder="Hybrid work model"
            className="min-h-28"
          />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <ImageUploadField
          name="imageData"
          label="Company visual"
          description="Optional artwork or logo block shown on the public jobs page."
          defaultValue={values.imageData}
        />
      </div>
      <div className="lg:col-span-2">
        <AdminCheckbox name="isPublished" label="Published on website" defaultChecked={values.isPublished ?? true} />
      </div>
    </>
  );
}

export function BlogFields({ values = {} }: { values?: BlogValues }) {
  return (
    <>
      <AdminField label="Title">
        <AdminInput name="title" required defaultValue={values.title} placeholder="Understanding Similarity Scoring in RAG Systems" />
      </AdminField>
      <AdminField label="Category">
        <AdminInput name="category" required defaultValue={values.category} placeholder="AI Engineering" />
      </AdminField>
      <AdminField label="Author">
        <AdminInput name="author" required defaultValue={values.author} placeholder="Axaon Company" />
      </AdminField>
      <AdminField label="Read time">
        <AdminInput name="readTime" required defaultValue={values.readTime} placeholder="2 min read" />
      </AdminField>
      <AdminField label="Accent">
        <AdminInput
          name="accent"
          defaultValue={values.accent}
          placeholder="linear-gradient(160deg, rgba(56, 189, 248, 0.28), rgba(14, 116, 144, 0.12))"
        />
      </AdminField>
      <AdminField label="Display order">
        <AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} />
      </AdminField>
      <div className="lg:col-span-2">
        <AdminField label="Excerpt">
          <AdminTextarea name="excerpt" required defaultValue={values.excerpt} placeholder="Short article summary..." />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <AdminField label="Article content" hint="Use blank lines to separate paragraphs.">
          <AdminTextarea
            name="content"
            required
            defaultValue={values.content}
            placeholder="Write the article body here..."
            className="min-h-44"
          />
        </AdminField>
      </div>
      <div className="lg:col-span-2">
        <ImageUploadField
          name="imageData"
          label="Article cover"
          description="Used for featured article and list cards on the blogs page."
          defaultValue={values.imageData}
        />
      </div>
      <div className="lg:col-span-2 flex flex-wrap gap-3">
        <AdminCheckbox name="featured" label="Featured article" defaultChecked={values.featured ?? false} />
        <AdminCheckbox name="isPublished" label="Published on website" defaultChecked={values.isPublished ?? true} />
      </div>
    </>
  );
}

export function SettingsPageCopyFields({
  prefix,
  title,
  values,
  defaultOpen = false,
}: {
  prefix: string;
  title: string;
  values?: PageCopyValues;
  defaultOpen?: boolean;
}) {
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
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <AdminField label="Hero eyebrow">
          <AdminInput name={`${prefix}HeroEyebrow`} defaultValue={values?.heroEyebrow} />
        </AdminField>
        <AdminField label="Hero title">
          <AdminInput name={`${prefix}HeroTitle`} defaultValue={values?.heroTitle} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Hero description">
            <AdminTextarea name={`${prefix}HeroDescription`} defaultValue={values?.heroDescription} />
          </AdminField>
        </div>
        <AdminField label="Section eyebrow">
          <AdminInput name={`${prefix}SectionEyebrow`} defaultValue={values?.sectionEyebrow} />
        </AdminField>
        <AdminField label="Section title">
          <AdminInput name={`${prefix}SectionTitle`} defaultValue={values?.sectionTitle} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="Section description">
            <AdminTextarea name={`${prefix}SectionDescription`} defaultValue={values?.sectionDescription} />
          </AdminField>
        </div>
        <AdminField label="CTA eyebrow">
          <AdminInput name={`${prefix}CtaEyebrow`} defaultValue={values?.ctaEyebrow} />
        </AdminField>
        <AdminField label="CTA title">
          <AdminInput name={`${prefix}CtaTitle`} defaultValue={values?.ctaTitle} />
        </AdminField>
        <div className="lg:col-span-2">
          <AdminField label="CTA description">
            <AdminTextarea name={`${prefix}CtaDescription`} defaultValue={values?.ctaDescription} />
          </AdminField>
        </div>
        <AdminField label="CTA button label">
          <AdminInput name={`${prefix}CtaButtonLabel`} defaultValue={values?.ctaButtonLabel} />
        </AdminField>
        <AdminField label="CTA button link">
          <AdminInput name={`${prefix}CtaButtonHref`} defaultValue={values?.ctaButtonHref} placeholder="/contact-us" />
        </AdminField>
      </div>
    </details>
  );
}
