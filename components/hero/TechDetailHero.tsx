import Image from "next/image";
import Link from "next/link";

/**
 * Technology page hero: the technology's own logo, accent colour and a real code sample
 * in its language, plus links to related technologies — so every technology page looks different.
 */
const KEYWORDS =
  /\b(public|private|final|class|interface|record|static|async|await|return|const|let|var|function|export|default|import|from|new|if|else|for|of|in|def|self|struct|func|type|package|trigger|insert|resource|SELECT|FROM|JOIN|WHERE|GROUP BY|ORDER BY|ON|AS|DESC|extends|override|val|fun|void|true|false|null|this|super|required)\b/g;

function highlight(line: string) {
  const parts: React.ReactNode[] = [];
  const re = /("[^"]*"|'[^']*'|`[^`]*`|\/\/.*$|#.*$|@\w+|\b\d+\b)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  const pushPlain = (text: string) => {
    let l = 0;
    let km: RegExpExecArray | null;
    KEYWORDS.lastIndex = 0;
    while ((km = KEYWORDS.exec(text))) {
      if (km.index > l) parts.push(<span key={k++}>{text.slice(l, km.index)}</span>);
      parts.push(
        <span key={k++} className="text-[#7cc6ff]">
          {km[0]}
        </span>
      );
      l = km.index + km[0].length;
    }
    if (l < text.length) parts.push(<span key={k++}>{text.slice(l)}</span>);
  };
  while ((m = re.exec(line))) {
    if (m.index > last) pushPlain(line.slice(last, m.index));
    const tok = m[0];
    const cls = tok.startsWith("//") || (tok.startsWith("#") && !line.includes("#include")) ? "text-[#6f84a6] italic" : tok.startsWith("@") ? "text-[#f0c14b]" : /^\d/.test(tok) ? "text-[#e3a52a]" : "text-[#f6d77a]";
    parts.push(
      <span key={k++} className={cls}>
        {tok}
      </span>
    );
    last = m.index + tok.length;
  }
  if (last < line.length) pushPlain(line.slice(last));
  return parts;
}

export default function TechDetailHero({
  name,
  category,
  title,
  subtitle,
  description,
  icon,
  accent,
  file,
  code,
  related,
}: {
  name: string;
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
  accent: string;
  file: string;
  code: string[];
  related: { name: string; href: string; icon: string }[];
}) {
  const words = title.trim().split(/\s+/);
  const lead = words.slice(0, -2).join(" ");
  const tail = words.slice(-2).join(" ");

  return (
    <section aria-labelledby="tech-detail-title" className="relative overflow-hidden bg-canvas">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_70%_at_30%_30%,#000_30%,transparent_80%)]" />
        <div className="absolute -left-40 -top-32 h-[440px] w-[440px] rounded-full opacity-20 blur-[130px]" style={{ background: accent }} />
        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#f6d77a]/35 blur-[130px] dark:bg-[#d99a19]/12" />
      </div>

      <div className="relative mx-auto grid max-w-[1320px] gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-10 lg:py-20">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
              <Image src={icon} alt={`${name} logo`} width={34} height={34} className="h-8 w-8 object-contain" />
            </span>
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-subtle">
              {`technologies / ${category}`}
            </span>
          </div>
          <h1 id="tech-detail-title" className="mt-6 font-display text-[clamp(1.55rem,2.5vw,2.2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-fg">
            {lead ? `${lead} ` : null}
            <span className="text-brand-spectrum">{tail}</span>
          </h1>
          {subtitle ? (
            <p className="mt-3 inline-flex items-center gap-2 text-[15px] font-semibold text-fg">
              <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
              {subtitle}
            </p>
          ) : null}
          <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-fg-muted">{description}</p>

          {related.length ? (
            <div className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">Related technologies</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-fg transition-colors hover:border-[#d99a19]/60">
                      <Image src={r.icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#071a33] shadow-[0_40px_90px_-40px_rgba(7,26,51,0.8)]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#0a2140] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 truncate font-mono text-[11px] text-[#c7d3e6]">{file}</span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10.5px] font-semibold text-white/80">
                <Image src={icon} alt="" width={12} height={12} className="h-3 w-3 object-contain" /> {name}
              </span>
            </div>
            <pre className="overflow-x-auto px-0 py-4 font-mono text-[12px] leading-[1.75] text-[#c7d3e6] sm:text-[12.5px]">
              {code.map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-10 shrink-0 select-none pr-4 text-right text-[#3d5478]">{i + 1}</span>
                  <code className="whitespace-pre">{highlight(line)}</code>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
      <div aria-hidden className="h-1 bg-brand-spectrum" />
    </section>
  );
}
