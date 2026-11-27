import PageHero from "@/components/sections/shared/PageHero";
import { getCachedPageBlock, getCachedSiteSettings } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy | ALPIXN",
  description: "How ALPIXN collects, uses and protects personal information shared through this website.",
  path: "/privacy-policy",
});


export default async function PrivacyPolicyPage() {
  const [site, block] = await Promise.all([getCachedSiteSettings(), getCachedPageBlock("legal.privacy")]);
  const content = block as { intro: string; sections: { title: string; body: string }[] };
  const SECTIONS = content.sections.map((x) => [x.title, x.body.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean)] as [string, string[]]);
  return (
    <main>
      <PageHero eyebrow="Legal" title="Privacy Policy" accentWords={1} description={content.intro} />
      <section className="bg-canvas py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="space-y-10">
            {SECTIONS.map(([title, paras], i) => (
              <section key={title}>
                <h2 className="font-display text-[clamp(1.15rem,1.5vw,1.35rem)] font-bold text-fg">
                  <span className="mr-2 font-mono text-[13px] text-[#0878d1]">{String(i + 1).padStart(2, "0")}</span>
                  {title}
                </h2>
                {paras.map((p) => (
                  <p key={p} className="mt-3 text-[15.5px] leading-relaxed text-fg-muted">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <section className="rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
              <h2 className="font-display text-lg font-bold text-fg">Contact us</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
                For privacy questions or requests, email{" "}
                <a href={`mailto:${site.contactEmail}`} className="font-semibold text-[#0878d1] hover:underline">
                  {site.contactEmail}
                </a>{" "}
                or write to us at {site.contactAddress}.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
