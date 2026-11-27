import Link from "next/link";
import PageHero from "@/components/sections/shared/PageHero";
import { getCachedPageBlock, getCachedSiteSettings } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms and Conditions | ALPIXN",
  description: "The terms that apply when you use the ALPIXN website and its content.",
  path: "/terms-and-conditions",
});


export default async function TermsPage() {
  const [site, block] = await Promise.all([getCachedSiteSettings(), getCachedPageBlock("legal.terms")]);
  const content = block as { intro: string; sections: { title: string; body: string }[] };
  const SECTIONS = content.sections.map((x) => [x.title, x.body.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean)] as [string, string[]]);
  return (
    <main>
      <PageHero eyebrow="Legal" title="Terms and Conditions" accentWords={1} description={content.intro} />
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
                Questions about these terms? Email{" "}
                <a href={`mailto:${site.contactEmail}`} className="font-semibold text-[#0878d1] hover:underline">
                  {site.contactEmail}
                </a>{" "}
                or write to us at {site.contactAddress}. See also our{" "}
                <Link href="/privacy-policy" className="font-semibold text-[#0878d1] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
