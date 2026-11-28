import { Check, Info } from "lucide-react";
import EstimateButton from "@/components/assistant/EstimateButton";
import PageHero from "@/components/sections/shared/PageHero";
import CtaBand from "@/components/sections/shared/CtaBand";
import { BILLING_LABEL, formatINR, priceLabel } from "@/lib/pricing/catalog";
import { getCachedPricingData } from "@/lib/pricing/store";
import { pageMetadata } from "@/lib/seo";
import { withSeo } from "@/lib/seo-store";

export async function generateMetadata() {
  return withSeo(
    "/pricing",
    pageMetadata({
      title: "Pricing & Packages: Websites, Apps, AI, Branding",
      description: "Indicative ALPIXN price plans for websites, e-commerce, mobile apps, AI chatbots, AI calling, branding, social media, SEO and astrology platforms — for every budget.",
      path: "/pricing",
    })
  );
}

const TIER_TONES = ["#0878d1", "#064a87", "#d99a19", "#071a33"];

export default async function PricingPage() {
  const { catalog } = await getCachedPricingData();
  return (
    <main>
      <PageHero
        eyebrow="Pricing"
        title="Price Plans for Every Budget"
        description={
          <>
            Starter, growth, business and enterprise packages for every service we offer. Not sure what you need? Chat with our robot and get an estimate in two minutes.
            <span className="mt-6 flex flex-wrap justify-center gap-3">
              <EstimateButton label="Get my estimate" />
            </span>
          </>
        }
      />

      <nav aria-label="Services" className="sticky top-[72px] z-20 border-y border-line bg-canvas/90 backdrop-blur">
        <ul className="mx-auto flex max-w-[1320px] gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-10">
          {catalog.categories.map((c) => (
            <li key={c.id} className="shrink-0">
              <a href={`#${c.id}`} className="block rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] font-medium text-fg-muted hover:border-[#d99a19] hover:text-fg">
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-canvas">
        {catalog.categories.map((cat, ci) => (
          <section key={cat.id} id={cat.id} aria-labelledby={`${cat.id}-title`} className={`scroll-mt-32 py-14 sm:py-16 ${ci % 2 ? "bg-surface-2/50" : ""}`}>
            <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <h2 id={`${cat.id}-title`} className="font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg">
                    {cat.name.split(" ").slice(0, -1).join(" ")} <span className="text-brand-spectrum">{cat.name.split(" ").slice(-1)}</span>
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-fg-muted">{cat.description}</p>
                </div>
                {cat.id !== "third-party" ? <EstimateButton service={cat.name} label={cat.id === "products" ? "Ask for a demo" : "Estimate this"} variant="ghost" className="shrink-0 !py-2 text-[13.5px]" /> : null}
              </div>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cat.packages.map((p, i) => (
                  <li key={p.id} className="relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: TIER_TONES[i % 4] }} />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: TIER_TONES[i % 4] === "#071a33" ? undefined : TIER_TONES[i % 4] }}>
                      {p.name}
                    </p>
                    <p className="mt-2 font-display text-[19px] font-bold text-fg">{priceLabel(p)}</p>
                    {p.recurring ? <p className="mt-0.5 text-[12px] text-fg-muted">+ {p.recurring}</p> : null}
                    <p className="mt-2 text-[13px] text-fg-muted">{p.bestFor}</p>
                    <ul className="mt-4 flex-1 space-y-1.5">
                      {p.includes.map((f) => (
                        <li key={f} className="flex gap-2 text-[13px] text-fg">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1f9d55]" aria-hidden />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {p.timeline && p.timeline !== "—" ? <p className="mt-4 border-t border-line pt-3 text-[12px] text-fg-subtle">Timeline: {p.timeline}</p> : null}
                  </li>
                ))}
              </ul>

              {cat.addOns.length || cat.notes.length ? (
                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  {cat.addOns.length ? (
                    <div className="rounded-2xl border border-line bg-surface p-4">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">Add-ons</p>
                      <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                        {cat.addOns.map((a) => (
                          <li key={a.id} className="flex justify-between gap-3 text-[13px] text-fg-muted">
                            <span>{a.name}</span>
                            <span className="shrink-0 font-semibold text-fg">
                              {formatINR(a.price)}
                              {a.billing === "one-time" ? "" : BILLING_LABEL[a.billing]}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {cat.notes.length ? (
                    <div className="flex gap-2.5 rounded-2xl border border-line bg-surface p-4 text-[13px] leading-relaxed text-fg-muted">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#0878d1]" aria-hidden />
                      <div>{cat.notes.join(" ")}</div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </section>
        ))}

        <div className="mx-auto max-w-[1320px] px-4 pb-14 sm:px-6 lg:px-10">
          <div className="rounded-3xl border border-[#d99a19]/40 bg-[#f6d77a]/15 p-5 text-[13.5px] leading-relaxed text-fg-muted">
            <p className="font-semibold text-fg">Please note</p>
            <p className="mt-1">{catalog.disclaimer}</p>
            <p className="mt-1">{catalog.gstNote}</p>
          </div>
        </div>
      </div>

      <CtaBand
        eyebrow="Get started"
        title="Tell us about your project"
        description="Chat with our assistant for a quick estimate, or talk to our team directly."
        primary={{ label: "Contact our team", href: "/contact-us" }}
        secondary={{ label: "Explore our services", href: "/our-expertise/software-solution/software-development" }}
      />
    </main>
  );
}
