import Image from "next/image";
import { Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

/** Editorial testimonial ("Why choose us"). Quote, author, role and photo come from Home Settings. */
const WhyChooseUsSection = ({
  quote = "Not only would I hire them again without hesitation, but I will point out that after the first two test projects were done, they earned my repeat business and became the only contractors I worked with the whole time I was upgrading my site.",
  author = "KARL MARGRAIN",
  role = "Founder and Managing Director",
  managerImage = "/images/manager.png",
}: {
  quote?: string;
  author?: string;
  role?: string;
  managerImage?: string;
}) => {
  return (
    <section aria-labelledby="why-title" className="relative w-full overflow-hidden bg-canvas py-24 sm:py-28 lg:py-36">
      {/* Background: concentric rings + emblem watermark */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-12%] top-1/2 h-[900px] w-[900px] -translate-y-1/2 rounded-full border border-line" />
        <div className="absolute right-[-4%] top-1/2 h-[680px] w-[680px] -translate-y-1/2 rounded-full border border-dashed border-line-gold [animation:spin_90s_linear_infinite]" />
        <div className="absolute right-[6%] top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-tech/15 blur-[100px]" />
        <Image src="/brand/alpixn-emblem.webp" alt="" width={520} height={520} className="absolute right-[2%] top-1/2 w-[440px] -translate-y-1/2 opacity-[0.07] dark:opacity-[0.09]" />
      </div>

      <div className="relative mx-auto grid max-w-[1350px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-10 xl:px-0">
        <Reveal className="lg:col-span-8">
          <span className="eyebrow">Why choose us</span>
          <h2 id="why-title" className="sr-only">
            Why choose ALPIXN
          </h2>
          <span aria-hidden className="mt-6 block font-display text-[110px] leading-[0.6] text-gold-metal sm:text-[150px]">
            &ldquo;
          </span>
          <blockquote className="mt-2">
            <p className="font-display text-[1.45rem] font-medium leading-[1.4] text-fg sm:text-3xl lg:text-[2.15rem]">{quote}</p>
            <footer className="mt-10 flex items-center gap-5">
              <span className="relative block h-16 w-16 shrink-0 rounded-full p-[2px] [background:conic-gradient(from_200deg,var(--gold),var(--tech),var(--gold-soft),var(--gold))] lg:hidden">
                <span className="relative block h-full w-full overflow-hidden rounded-full bg-canvas">
                  <Image src={managerImage} alt={author} fill sizes="64px" className="object-cover" unoptimized={managerImage.startsWith("data:") || managerImage.startsWith("http")} />
                </span>
              </span>
              <span aria-hidden className="hidden h-px w-14 bg-gradient-to-r from-gold to-transparent lg:block" />
              <div>
                <cite className="not-italic font-display text-base font-semibold tracking-[0.12em] text-fg">{author}</cite>
                <p className="mt-1 text-sm text-fg-muted">{role}</p>
                <div className="mt-2 flex gap-1" role="img" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </footer>
          </blockquote>
        </Reveal>

        {/* Portrait */}
        <Reveal delay={150} className="hidden lg:col-span-4 lg:block">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px]">
            <div aria-hidden className="absolute -inset-3 rounded-[36px] [background:conic-gradient(from_140deg,var(--gold),transparent_30%,var(--tech)_55%,transparent_80%,var(--gold))] opacity-70" />
            <div className="relative h-full w-full overflow-hidden rounded-[30px] border border-line bg-surface">
              <Image src={managerImage} alt={`${author}, ${role}`} fill sizes="360px" className="object-cover" unoptimized={managerImage.startsWith("data:") || managerImage.startsWith("http")} />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#040d1c]/70 to-transparent" />
              <span aria-hidden className="hud-corners" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
