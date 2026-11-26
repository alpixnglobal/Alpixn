import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { HomeOfferingRecord } from "@/lib/content-types";

const offerings: HomeOfferingRecord[] = [
  {
    title: "Software Development",
    description:
      "We specialize in software development and customized solutions, utilizing the latest technologies (blockchain, web3, ML, AI) and industry best practices to help businesses achieve their digital goals.",
    imageData: "/images/software.svg",
    alt: "Software Development Icon",
    width: 174,
    height: 121.88,
  },
  {
    title: "Data Analytics",
    description:
      "Unlock the potential of data through advanced visualization and our team of expert data analysts. Our data analytics services harness cutting-edge technology to extract actionable insights and customize solutions for your business's success.",
    imageData: "/images/data.svg",
    alt: "Data Analytics Icon",
    width: 180.97,
    height: 121.88,
  },
  {
    title: "Cloud Engineering",
    description:
      "Our cloud engineering services facilitate the re-platforming, re-hosting, and re-engineering of applications, optimizing them for cloud environments. You can harness the power of the cloud to effectively address intricate business challenges.",
    imageData: "/images/cloud.svg",
    alt: "Cloud Engineering Icon",
    width: 114,
    height: 100,
  },
  {
    title: "Application Modernization",
    description:
      "Our application modernization services can breathe new life into your existing software, enhancing performance, security, and user experience. We're committed to supporting you every step of the way on your application modernization journey.",
    imageData: "/images/app.svg",
    alt: "Application Modernization Icon",
    width: 140,
    height: 110.11,
  },
  {
    title: "DevOps Services",
    description:
      "Streamline your development and operations with our DevOps expertise, ensuring faster deployments, better collaboration, and scalable infrastructure.",
    imageData: "/images/ai.svg",
    alt: "DevOps Services Icon",
    width: 174.97,
    height: 121.88,
  },
  {
    title: "AI Development",
    description:
      "Our AI services bring expertise and experience in natural language processing, machine learning, automated ML, generative AI, responsible AI, and more to help you deliver innovative solutions at scale.",
    imageData: "/images/devops.svg",
    alt: "AI Development Icon",
    width: 138.3,
    height: 128.22,
  },
];

const OfferingCard = ({ title, description, imageData, alt, index }: HomeOfferingRecord & { index: number }) => {
  const resolvedImage = imageData?.trim();

  return (
    <article className="border-glow group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface p-6 shadow-[var(--shadow-card)] transition-transform duration-500 hover:-translate-y-1 sm:p-7">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-tech/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
      <div className="relative flex items-start justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.2em] text-gold-ink">/{String(index + 1).padStart(2, "0")}</span>
        {resolvedImage ? (
          <span className="relative grid h-[72px] w-[84px] place-items-center rounded-2xl bg-gradient-to-br from-brand-navy to-brand-midnight p-2 ring-1 ring-line-gold">
            <Image
              src={resolvedImage}
              alt={alt || title}
              width={72}
              height={56}
              className="h-auto max-h-[56px] w-auto max-w-[68px] object-contain transition-transform duration-500 group-hover:scale-110"
              unoptimized={resolvedImage.startsWith("data:") || resolvedImage.startsWith("http")}
            />
          </span>
        ) : null}
      </div>
      <h3 className="relative mt-6 font-display text-xl font-semibold leading-snug text-fg sm:text-[1.35rem]">{title}</h3>
      <p className="relative mt-3 text-[15px] leading-relaxed text-fg-muted">{description}</p>
      <div aria-hidden className="relative mt-auto pt-6">
        <div className="h-px w-full bg-line">
          <div className="h-px w-0 bg-gradient-to-r from-gold to-tech transition-all duration-700 group-hover:w-full" />
        </div>
      </div>
    </article>
  );
};

const OfferSection = ({
  title = "Explore Our Offerings",
  subtitle = "Whether you're building from scratch or scaling up, our expert services in software, AI, and app development are designed to meet your business goals.",
  items = offerings,
}: {
  title?: string;
  subtitle?: string;
  items?: HomeOfferingRecord[];
}) => {
  const resolvedItems = items.length > 0 ? items : offerings;

  return (
    <section aria-labelledby="offerings-title" className="relative w-full overflow-hidden bg-canvas-2 py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(60%_60%_at_20%_30%,#000,transparent)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 rule-gold" />

      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10 2xl:px-[45px]">
        {/* Sticky editorial intro */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[120px]">
            <Reveal>
              <SectionHeading id="offerings-title" align="left" eyebrow="What we deliver" title={title} subtitle={subtitle} />
            </Reveal>

            {/* Orbit graphic: ALPIXN emblem with orbiting capability nodes */}
            <div aria-hidden className="relative mx-auto mt-12 hidden aspect-square w-full max-w-[300px] lg:block">
              <div className="absolute inset-0 rounded-full border border-line" />
              <div className="absolute inset-[14%] rounded-full border border-dashed border-line-gold [animation:spin_40s_linear_infinite]" />
              <div className="absolute inset-[30%] rounded-full bg-tech/10 blur-xl" />
              <Image src="/brand/alpixn-emblem.webp" alt="" width={140} height={140} className="absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_10px_30px_rgba(217,154,25,0.35)]" />
              <div className="absolute inset-0 [animation:spin_22s_linear_infinite]">
                <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_14px_var(--gold)]" />
                <span className="absolute bottom-[14%] left-[6%] h-2 w-2 rounded-full bg-tech shadow-[0_0_12px_var(--tech)]" />
                <span className="absolute bottom-[14%] right-[6%] h-2.5 w-2.5 rounded-full bg-tech-soft shadow-[0_0_12px_var(--tech)]" />
              </div>
            </div>

            <Link href="/contact-us" className="btn-ghost-brand mt-10">
              Discuss your project
              <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Module grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          {resolvedItems.map((offering, index) => (
            <Reveal key={index} delay={(index % 2) * 120} className={index % 2 === 1 ? "sm:translate-y-10" : ""}>
              <OfferingCard {...offering} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
