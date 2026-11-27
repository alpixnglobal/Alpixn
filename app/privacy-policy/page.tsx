import PageHero from "@/components/sections/shared/PageHero";
import { getCachedSiteSettings } from "@/lib/content-service";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy | ALPIXN",
  description: "How ALPIXN collects, uses and protects personal information shared through this website.",
  path: "/privacy-policy",
});

const SECTIONS: [string, string[]][] = [
  ["Information we collect", [
    "Details you give us through our contact, project brief, newsletter and job application forms — for example your name, email address, phone number, company, message and any CV you upload.",
    "Basic technical information when you visit the website, such as browser type, device, pages viewed and approximate location, collected through server logs and analytics tools.",
  ]],
  ["How we use your information", [
    "To reply to your enquiry, prepare proposals and deliver the services you ask for.",
    "To assess job and internship applications.",
    "To send our newsletter if you have subscribed — you can unsubscribe at any time.",
    "To keep the website secure and understand how it is used so we can improve it.",
  ]],
  ["Legal basis", [
    "We process personal information where it is needed to respond to your request or perform a contract, where we have a legitimate interest in running our business, where you have given consent, or where the law requires it.",
  ]],
  ["Sharing your information", [
    "We do not sell personal information. We share it only with service providers that help us run the website and our business (for example hosting, email and analytics providers), under appropriate confidentiality and data-protection terms, or where the law requires it.",
  ]],
  ["Cookies", [
    "The website uses essential cookies and local storage to remember preferences such as light or dark theme. Where analytics cookies are used, they help us understand visits in aggregate.",
  ]],
  ["How long we keep information", [
    "We keep enquiry and application information only as long as needed for the purpose it was collected, or as required by law, and then delete or anonymise it.",
  ]],
  ["Your rights", [
    "Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal information, to object to processing, and to withdraw consent. To make a request, contact us using the details below.",
  ]],
  ["Security", [
    "We use reasonable technical and organisational measures to protect personal information, including access controls and encrypted connections. No method of transmission over the internet is completely secure.",
  ]],
  ["Changes to this policy", [
    "We may update this policy from time to time. The latest version will always be published on this page.",
  ]],
];

export default async function PrivacyPolicyPage() {
  const site = await getCachedSiteSettings();
  return (
    <main>
      <PageHero eyebrow="Legal" title="Privacy Policy" accentWords={1} description="How ALPIXN collects, uses and protects the personal information you share with us." />
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
