import Link from "next/link";
import PageHero from "@/components/sections/shared/PageHero";
import { getCachedSiteSettings } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms and Conditions | ALPIXN",
  description: "The terms that apply when you use the ALPIXN website and its content.",
  path: "/terms-and-conditions",
});

const SECTIONS: [string, string[]][] = [
  ["About these terms", [
    "These terms apply to your use of the ALPIXN website (alpixn.com and its pages). By using the website you agree to them. If you do not agree, please do not use the website.",
    "Software development, consulting or staffing services are provided under a separate written agreement or statement of work. If that agreement conflicts with these terms, the agreement applies.",
  ]],
  ["Using the website", [
    "You may browse the website and share links to it for lawful, personal or business purposes.",
    "You must not misuse the website — for example by trying to gain unauthorised access, interfering with its operation, introducing malicious code, scraping it in a way that overloads it, or using it to send spam.",
  ]],
  ["Information on the website", [
    "We aim to keep information accurate and up to date, but it is provided for general information only and may change without notice. It is not professional advice for your specific situation.",
    "Concept projects and interactive demos shown in our portfolio are clearly labelled. They demonstrate our capabilities and are not client engagements; any names, data and figures in them are fictional.",
    "Articles on our blog are written by the ALPIXN Editorial Team for general education and may cite third-party sources.",
  ]],
  ["Intellectual property", [
    "The website design, text, graphics, logos and code are owned by ALPIXN or used with permission, and are protected by intellectual property laws. You may not copy, reproduce or republish them for commercial purposes without our written permission.",
    "Third-party names, logos and trademarks (such as technology brands) belong to their owners and are used only to identify those technologies.",
  ]],
  ["Enquiries, briefs and applications", [
    "When you send us an enquiry, project brief or job application, you confirm that the information is accurate and that you are allowed to share it. Sending a brief does not create a contract or an obligation for either side.",
    "We handle personal information as described in our Privacy Policy.",
  ]],
  ["Links to other websites", [
    "The website may link to third-party websites. We do not control them and are not responsible for their content, policies or availability.",
  ]],
  ["Limitation of liability", [
    "The website is provided on an \"as is\" and \"as available\" basis. To the extent permitted by law, ALPIXN is not liable for any indirect or consequential loss, or for loss of data, revenue or profit, arising from your use of the website or reliance on its content.",
    "Nothing in these terms limits liability that cannot be limited by law.",
  ]],
  ["Changes to these terms", [
    "We may update these terms from time to time. The current version is always published on this page, and continued use of the website means you accept the updated terms.",
  ]],
  ["Governing law", [
    "These terms are governed by the laws of India, and the courts of Gurugram, Haryana have jurisdiction, unless a separate written agreement with you says otherwise.",
  ]],
];

export default async function TermsPage() {
  const site = await getCachedSiteSettings();
  return (
    <main>
      <PageHero eyebrow="Legal" title="Terms and Conditions" accentWords={1} description="The terms that apply when you use the ALPIXN website and its content." />
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
