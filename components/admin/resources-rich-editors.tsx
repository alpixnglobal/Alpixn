"use client";

/* eslint-disable @next/next/no-img-element */

import type { ChangeEvent } from "react";
import { useId, useState } from "react";

import { formatBytes, prepareAdminImageUpload } from "@/components/admin/client-image-utils";
import { AdminCheckbox, AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { BlogPostRecord, InternRecord, JobOpeningRecord, PortfolioProjectRecord, PortfolioTeamMember, TeamMemberRecord } from "@/lib/content-types";

function listToMultiline(values: string[]) {
  return values.join("\n");
}

function multilineToList(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function HiddenTextField({ name, value }: { name: string; value: string }) {
  return <textarea readOnly hidden name={name} value={value} />;
}

function InlineImageUpload({ 
  value, 
  onChange, 
  label = "Profile Image" 
}: { 
  value: string; 
  onChange: (value: string) => void;
  label?: string;
}) {
  const inputId = useId();
  const [statusText, setStatusText] = useState(
    value ? "Image loaded" : "Upload or paste URL"
  );

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatusText("Only image files supported");
      return;
    }

    setStatusText("Compressing image...");

    try {
      const processed = await prepareAdminImageUpload(file);
      onChange(processed.dataUrl);
      setStatusText(
        processed.didCompress
          ? `${file.name}: ${formatBytes(processed.originalBytes)} -> ${formatBytes(processed.finalBytes)}`
          : `${file.name}: ready at ${formatBytes(processed.finalBytes)}`
      );
    } catch (error) {
      console.error("Image preparation failed:", error);
      setStatusText("Could not process that image");
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</label>
      <div className="flex gap-3 items-start">
        <label
          htmlFor={inputId}
          className="flex-shrink-0 w-20 h-20 cursor-pointer rounded-full border border-dashed border-white/20 bg-white/[0.03] flex items-center justify-center overflow-hidden hover:border-cyan-300/40 transition"
        >
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-slate-500 text-center px-1">Click to upload</span>
          )}
        </label>
        <input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setStatusText(e.target.value ? "URL/path set" : "No image");
            }}
            placeholder="https://... or /images/..."
            className="w-full h-9 rounded-lg border border-white/10 bg-white/6 px-3 text-sm text-slate-100 outline-none focus:border-cyan-300/40"
          />
          <div className="flex gap-2 items-center">
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setStatusText("Image removed");
                }}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            )}
            <span className="text-xs text-slate-500">{statusText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InternRichEditor({ values = {} }: { values?: Partial<InternRecord> }) {
  return (
    <>
      <AdminField label="Name"><AdminInput name="name" required defaultValue={values.name} placeholder="Priya Sharma" /></AdminField>
      <AdminField label="Role"><AdminInput name="role" required defaultValue={values.role} placeholder="React Developer Intern" /></AdminField>
      <AdminField label="Duration"><AdminInput name="duration" required defaultValue={values.duration} placeholder="Jul 2025 - Sep 2025" /></AdminField>
      <AdminField label="Award"><AdminInput name="award" required defaultValue={values.award} placeholder="Gold" /></AdminField>
      <AdminField label="Certificate ID"><AdminInput name="certificateId" required defaultValue={values.certificateId} placeholder="AXAON/INT/2025/03" /></AdminField>
      <AdminField label="Program"><AdminInput name="program" required defaultValue={values.program} placeholder="3 Months Program" /></AdminField>
      <AdminField label="Track"><AdminInput name="track" required defaultValue={values.track} placeholder="Developer" /></AdminField>
      <AdminField label="Initials"><AdminInput name="initials" required defaultValue={values.initials} placeholder="PS" /></AdminField>
      <AdminField label="Card accent" hint="Hex color or full CSS gradient string."><AdminInput name="accent" defaultValue={values.accent} placeholder="linear-gradient(135deg, rgba(250, 204, 21, 0.42), rgba(249, 115, 22, 0.18))" /></AdminField>
      <AdminField label="Display order"><AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} /></AdminField>
      <div className="lg:col-span-2">
        <ImageUploadField name="imageData" label="Intern image" description="Upload an image or paste a public image URL/path." defaultValue={values.imageData} />
      </div>
      <div className="lg:col-span-2"><AdminCheckbox name="isPublished" label="Published on website" defaultChecked={values.isPublished ?? true} /></div>
    </>
  );
}

export function TeamRichEditor({ values = {} }: { values?: Partial<TeamMemberRecord> }) {
  return (
    <>
      <AdminField label="Name"><AdminInput name="name" required defaultValue={values.name} placeholder="Meena Iyer" /></AdminField>
      <AdminField label="Role"><AdminInput name="role" required defaultValue={values.role} placeholder="Chief Executive Officer" /></AdminField>
      <AdminField label="Initials"><AdminInput name="initials" required defaultValue={values.initials} placeholder="MI" /></AdminField>
      <AdminField label="Display order"><AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} /></AdminField>
      <AdminField label="Accent" hint="Used when no photo is uploaded."><AdminInput name="accent" defaultValue={values.accent} placeholder="linear-gradient(135deg, rgba(14, 165, 233, 0.42), rgba(30, 41, 59, 0.18))" /></AdminField>
      <div className="lg:col-span-2"><AdminField label="Focus / bio"><AdminTextarea name="focus" required defaultValue={values.focus} placeholder="Company strategy, client partnerships, and growth." className="min-h-24" /></AdminField></div>
      <div className="lg:col-span-2">
        <ImageUploadField name="imageData" label="Profile image" description="Upload an image or paste a public image URL/path." defaultValue={values.imageData} />
      </div>
      <div className="lg:col-span-2"><AdminCheckbox name="isPublished" label="Published on website" defaultChecked={values.isPublished ?? true} /></div>
    </>
  );
}

const defaultTeamMember: PortfolioTeamMember = {
  name: "",
  role: "",
  initials: "",
  accent: "linear-gradient(135deg, rgba(14, 165, 233, 0.42), rgba(30, 41, 59, 0.18))",
  imageData: "",
};

export function PortfolioRichEditor({ values = {} }: { values?: Partial<PortfolioProjectRecord> }) {
  const [tags, setTags] = useState(values.tags ?? []);
  const [objectivePoints, setObjectivePoints] = useState(values.objectivePoints ?? []);
  const [solutionPoints, setSolutionPoints] = useState(values.solutionPoints ?? []);
  const [resultBullets, setResultBullets] = useState(values.resultBullets ?? []);
  const [teamMembers, setTeamMembers] = useState<PortfolioTeamMember[]>(values.teamMembers ?? []);

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { ...defaultTeamMember }]);
  };

  const updateTeamMember = (index: number, field: keyof PortfolioTeamMember, value: string) => {
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], [field]: value };
    setTeamMembers(updated);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  return (
    <>
      <HiddenTextField name="tags" value={listToMultiline(tags)} />
      <HiddenTextField name="objectivePoints" value={listToMultiline(objectivePoints)} />
      <HiddenTextField name="solutionPoints" value={listToMultiline(solutionPoints)} />
      <HiddenTextField name="resultBullets" value={listToMultiline(resultBullets)} />
      <textarea readOnly hidden name="teamMembers" value={JSON.stringify(teamMembers)} />

      <AdminField label="Project title"><AdminInput name="title" required defaultValue={values.title} placeholder="Leap Into Digitalized Referrals" /></AdminField>
      <AdminField label="Industry"><AdminInput name="industry" required defaultValue={values.industry} placeholder="Construction CRM" /></AdminField>
      <AdminField label="Engagement"><AdminInput name="engagement" required defaultValue={values.engagement} placeholder="UX/UI + Platform Build" /></AdminField>
      <AdminField label="Timeline"><AdminInput name="timeline" required defaultValue={values.timeline} placeholder="14 weeks" /></AdminField>
      <AdminField label="Outcome"><AdminInput name="outcome" required defaultValue={values.outcome} placeholder="+38% partner participation" /></AdminField>
      <AdminField label="Accent"><AdminInput name="accent" defaultValue={values.accent} placeholder="linear-gradient(160deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.12))" /></AdminField>
      <AdminField label="Display order"><AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} /></AdminField>
      <div className="lg:col-span-2"><AdminField label="Summary"><AdminTextarea name="summary" required defaultValue={values.summary} className="min-h-24" /></AdminField></div>
      <div className="lg:col-span-2"><AdminField label="Objective"><AdminTextarea name="objective" defaultValue={values.objective} className="min-h-24" /></AdminField></div>

      <div className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
        <AdminField label="Tags" hint="One tag per line">
          <AdminTextarea value={listToMultiline(tags)} onChange={(event) => setTags(multilineToList(event.target.value))} className="min-h-24" />
        </AdminField>
      </div>
      <div className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
        <AdminField label="Objective points" hint="One point per line"><AdminTextarea value={listToMultiline(objectivePoints)} onChange={(event) => setObjectivePoints(multilineToList(event.target.value))} className="min-h-24" /></AdminField>
      </div>
      <div className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
        <AdminField label="Solution points" hint="One point per line"><AdminTextarea value={listToMultiline(solutionPoints)} onChange={(event) => setSolutionPoints(multilineToList(event.target.value))} className="min-h-24" /></AdminField>
      </div>
      <AdminField label="Primary result value"><AdminInput name="resultPrimaryValue" defaultValue={values.resultPrimaryValue} placeholder="71.4%" /></AdminField>
      <AdminField label="Primary result label"><AdminInput name="resultPrimaryLabel" defaultValue={values.resultPrimaryLabel} placeholder="Conversion Increase" /></AdminField>
      <AdminField label="Secondary result value"><AdminInput name="resultSecondaryValue" defaultValue={values.resultSecondaryValue} placeholder="342.4%" /></AdminField>
      <AdminField label="Secondary result label"><AdminInput name="resultSecondaryLabel" defaultValue={values.resultSecondaryLabel} placeholder="Revenue Increase" /></AdminField>
      <div className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5">
        <AdminField label="Result bullets" hint="One point per line"><AdminTextarea value={listToMultiline(resultBullets)} onChange={(event) => setResultBullets(multilineToList(event.target.value))} className="min-h-24" /></AdminField>
      </div>

      <div className="lg:col-span-2"><ImageUploadField name="imageData" label="Cover image" description="Upload image or paste URL/path." defaultValue={values.imageData} /></div>
      <div className="lg:col-span-2"><ImageUploadField name="galleryImageOne" label="Gallery image 1" description="Upload image or paste URL/path." defaultValue={values.galleryImageOne} /></div>
      <div className="lg:col-span-2"><ImageUploadField name="galleryImageTwo" label="Gallery image 2" description="Upload image or paste URL/path." defaultValue={values.galleryImageTwo} /></div>
      <div className="lg:col-span-2"><ImageUploadField name="galleryImageThree" label="Gallery image 3" description="Upload image or paste URL/path." defaultValue={values.galleryImageThree} /></div>
      <div className="lg:col-span-2"><ImageUploadField name="galleryImageFour" label="Gallery image 4" description="Upload image or paste URL/path." defaultValue={values.galleryImageFour} /></div>

      {/* Team Members Section */}
      <div className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Project Team Members</h3>
            <p className="text-sm text-slate-400">Add team members specific to this portfolio project (up to 4 shown on detail page)</p>
          </div>
          <button
            type="button"
            onClick={addTeamMember}
            className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            + Add Member
          </button>
        </div>

        {teamMembers.length === 0 ? (
          <p className="text-sm text-slate-500 italic">No team members added. Click &quot;Add Member&quot; to add team members for this project.</p>
        ) : (
          <div className="grid gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="rounded-xl border border-white/8 bg-black/20 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-300">Team Member {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="text-xs text-red-400 hover:text-red-300 transition"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <AdminField label="Name">
                    <AdminInput
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                      placeholder="John Doe"
                    />
                  </AdminField>
                  <AdminField label="Role">
                    <AdminInput
                      value={member.role}
                      onChange={(e) => updateTeamMember(index, "role", e.target.value)}
                      placeholder="Lead Developer"
                    />
                  </AdminField>
                  <AdminField label="Initials">
                    <AdminInput
                      value={member.initials}
                      onChange={(e) => updateTeamMember(index, "initials", e.target.value)}
                      placeholder="JD"
                    />
                  </AdminField>
                  <AdminField label="Accent (fallback color)">
                    <AdminInput
                      value={member.accent}
                      onChange={(e) => updateTeamMember(index, "accent", e.target.value)}
                      placeholder="linear-gradient(135deg, ...)"
                    />
                  </AdminField>
                  <div className="md:col-span-2">
                    <InlineImageUpload
                      value={member.imageData}
                      onChange={(value) => updateTeamMember(index, "imageData", value)}
                      label="Profile Photo"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-2"><AdminCheckbox name="isPublished" label="Published on website" defaultChecked={values.isPublished ?? true} /></div>
    </>
  );
}

export function JobRichEditor({ values = {} }: { values?: Partial<JobOpeningRecord> }) {
  const [responsibilities, setResponsibilities] = useState(values.responsibilities ?? []);
  const [requirements, setRequirements] = useState(values.requirements ?? []);
  const [benefits, setBenefits] = useState(values.benefits ?? []);

  return (
    <>
      <HiddenTextField name="responsibilities" value={listToMultiline(responsibilities)} />
      <HiddenTextField name="requirements" value={listToMultiline(requirements)} />
      <HiddenTextField name="benefits" value={listToMultiline(benefits)} />

      <AdminField label="Company"><AdminInput name="company" required defaultValue={values.company} placeholder="Future Vision Inc." /></AdminField>
      <AdminField label="Job title"><AdminInput name="title" required defaultValue={values.title} placeholder="UX Researcher" /></AdminField>
      <AdminField label="Type"><AdminInput name="type" required defaultValue={values.type} placeholder="Full Time" /></AdminField>
      <AdminField label="Work mode"><AdminInput name="mode" required defaultValue={values.mode} placeholder="On Site" /></AdminField>
      <AdminField label="Salary"><AdminInput name="salary" required defaultValue={values.salary} placeholder="Monthly INR 30,000 - 45,000" /></AdminField>
      <AdminField label="Posted date"><AdminInput name="posted" required defaultValue={values.posted} placeholder="Oct 24, 2025" /></AdminField>
      <AdminField label="Location"><AdminInput name="location" required defaultValue={values.location} placeholder="Ahmedabad" /></AdminField>
      <AdminField label="Card accent"><AdminInput name="accent" defaultValue={values.accent} placeholder="linear-gradient(160deg, rgba(56, 189, 248, 0.24), rgba(14, 165, 233, 0.08))" /></AdminField>
      <AdminField label="Display order"><AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} /></AdminField>
      <div className="lg:col-span-2"><AdminField label="Role overview"><AdminTextarea name="overview" defaultValue={values.overview} className="min-h-24" /></AdminField></div>
      <div className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5"><AdminField label="Responsibilities" hint="One per line"><AdminTextarea value={listToMultiline(responsibilities)} onChange={(event) => setResponsibilities(multilineToList(event.target.value))} className="min-h-24" /></AdminField></div>
      <div className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5"><AdminField label="Requirements" hint="One per line"><AdminTextarea value={listToMultiline(requirements)} onChange={(event) => setRequirements(multilineToList(event.target.value))} className="min-h-24" /></AdminField></div>
      <div className="lg:col-span-2 rounded-[24px] border border-white/10 bg-[#0f172a]/45 p-4 grid gap-5"><AdminField label="Benefits" hint="One per line"><AdminTextarea value={listToMultiline(benefits)} onChange={(event) => setBenefits(multilineToList(event.target.value))} className="min-h-24" /></AdminField></div>
      <div className="lg:col-span-2"><ImageUploadField name="imageData" label="Company visual" description="Upload image or paste URL/path." defaultValue={values.imageData} /></div>
      <div className="lg:col-span-2"><AdminCheckbox name="isPublished" label="Published on website" defaultChecked={values.isPublished ?? true} /></div>
    </>
  );
}

export function BlogRichEditor({ values = {} }: { values?: Partial<BlogPostRecord> }) {
  return (
    <>
      <AdminField label="Title"><AdminInput name="title" required defaultValue={values.title} placeholder="Understanding Similarity Scoring in RAG Systems" /></AdminField>
      <AdminField label="Category"><AdminInput name="category" required defaultValue={values.category} placeholder="AI Engineering" /></AdminField>
      <AdminField label="Author"><AdminInput name="author" required defaultValue={values.author} placeholder="Axaon Company" /></AdminField>
      <AdminField label="Read time"><AdminInput name="readTime" required defaultValue={values.readTime} placeholder="2 min read" /></AdminField>
      <AdminField label="Accent"><AdminInput name="accent" defaultValue={values.accent} placeholder="linear-gradient(160deg, rgba(56, 189, 248, 0.28), rgba(14, 116, 144, 0.12))" /></AdminField>
      <AdminField label="Display order"><AdminInput name="order" type="number" min="0" defaultValue={String(values.order ?? 1)} /></AdminField>
      <div className="lg:col-span-2"><AdminField label="Excerpt"><AdminTextarea name="excerpt" required defaultValue={values.excerpt} className="min-h-24" /></AdminField></div>
      <div className="lg:col-span-2"><AdminField label="Article content" hint="Use blank lines to separate paragraphs."><AdminTextarea name="content" required defaultValue={values.content} className="min-h-56" /></AdminField></div>
      <div className="lg:col-span-2"><ImageUploadField name="imageData" label="Cover image" description="Upload image or paste URL/path." defaultValue={values.imageData} /></div>
      <div className="lg:col-span-2 flex flex-wrap gap-4"><AdminCheckbox name="featured" label="Feature on blog hero" defaultChecked={values.featured ?? false} /><AdminCheckbox name="isPublished" label="Published on website" defaultChecked={values.isPublished ?? true} /></div>
    </>
  );
}
