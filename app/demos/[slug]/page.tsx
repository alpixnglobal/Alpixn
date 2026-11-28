import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FlaskConical } from "lucide-react";
import DemoRenderer from "@/components/demos/registry";
import { CONCEPT_NOTE, showcaseProjects } from "@/lib/portfolio/showcase";
import { pageMetadata } from "@/lib/seo";
import { withSeo } from "@/lib/seo-store";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return showcaseProjects.map((p) => ({ slug: p.slug }));
}

async function baseMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = showcaseProjects.find((x) => x.slug === slug);
  if (!p) return { title: "Demo not found", robots: { index: false } };
  // Interactive demos are supporting material; the case-study page is the canonical, indexable page.
  return pageMetadata({
    title: `${p.product} interactive demo (concept)`,
    description: `Try the ${p.product} concept demo — ${p.summary}`.slice(0, 155),
    path: `/demos/${p.slug}`,
    index: false,
  });
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;
  const p = showcaseProjects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <main className="bg-canvas pb-16">
      <div className="border-b border-line bg-surface-2">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-start gap-3">
            <FlaskConical aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <p className="text-[13px] leading-relaxed text-fg-muted">
              <span className="font-semibold text-fg">{p.product} · Concept project.</span> {CONCEPT_NOTE}
            </p>
          </div>
          <Link href={`/resources/portfolio/${p.slug}`} className="btn-subtle shrink-0">
            <ArrowLeft aria-hidden className="h-4 w-4" /> Case study
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6">
        <h1 className="sr-only">{p.title} — interactive demo</h1>
        <div id="demo-root">
          <DemoRenderer slug={p.slug} />
        </div>
      </div>
    </main>
  );
}

export async function generateMetadata(props: Parameters<typeof baseMetadata>[0]) {
  const p = (await props.params) as Record<string, string>;
  return withSeo(`/demos/${p.slug}`, await baseMetadata(props));
}
