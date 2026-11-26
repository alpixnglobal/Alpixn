import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Minimal, safe Markdown → React renderer for ALPIXN articles.
 * - No raw HTML is ever interpreted (everything becomes React text nodes), so CMS content cannot inject markup.
 * - Supports: ## / ### / #### headings, paragraphs, - / 1. lists, > callouts, ``` code, tables, ---,
 *   **bold**, *italic*, `code`, [links](url), and ```flow diagram blocks ("Step title | description" per line).
 */

export type TocItem = { id: string; text: string; level: 2 | 3 };

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[`*_]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

/* ---------------- inline ---------------- */

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(INLINE).filter((p) => p !== "");
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={key}>{renderInline(part.slice(2, -2), key)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={key}>{part.slice(1, -1)}</code>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={key}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/") || href.startsWith("#")) {
        return (
          <Link key={key} href={href}>
            {label}
          </Link>
        );
      }
      if (/^https?:\/\//.test(href)) {
        return (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      }
      return <span key={key}>{label}</span>;
    }
    return part;
  });
}

/* ---------------- flow diagram ---------------- */

function FlowDiagram({ lines, id }: { lines: string[]; id: string }) {
  const steps = lines
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [title, ...rest] = l.split("|");
      return { title: title.trim(), text: rest.join("|").trim() };
    });
  return (
    <figure className="blog-flow" aria-labelledby={`${id}-cap`}>
      <ol>
        {steps.map((s, i) => (
          <li key={i}>
            <span className="blog-flow-index" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="blog-flow-title">{s.title}</span>
            {s.text ? <span className="blog-flow-text">{s.text}</span> : null}
          </li>
        ))}
      </ol>
      <figcaption id={`${id}-cap`} className="sr-only">
        Process diagram: {steps.map((s) => s.title).join(", then ")}.
      </figcaption>
    </figure>
  );
}

/* ---------------- blocks ---------------- */

export function renderMarkdown(markdown: string): { nodes: ReactNode[]; toc: TocItem[] } {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const nodes: ReactNode[] = [];
  const toc: TocItem[] = [];
  const usedIds = new Set<string>();
  let i = 0;
  let k = 0;
  const key = () => `b${k++}`;

  const uniqueId = (text: string) => {
    let id = slugifyHeading(text) || `section-${k}`;
    let n = 2;
    while (usedIds.has(id)) id = `${slugifyHeading(text)}-${n++}`;
    usedIds.add(id);
    return id;
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // fenced code / flow
    const fence = trimmed.match(/^```(\w+)?/);
    if (fence) {
      const lang = fence[1] ?? "";
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) body.push(lines[i++]);
      i++;
      const id = key();
      if (lang === "flow") nodes.push(<FlowDiagram key={id} id={id} lines={body} />);
      else
        nodes.push(
          <pre key={id} data-lang={lang || undefined}>
            <code>{body.join("\n")}</code>
          </pre>
        );
      continue;
    }

    // headings
    const h = trimmed.match(/^(#{2,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length as 2 | 3 | 4;
      const text = h[2].trim();
      const id = uniqueId(text);
      if (level === 2 || level === 3) toc.push({ id, text: text.replace(/[*`]/g, ""), level });
      const Tag = (`h${level}` as unknown) as "h2";
      nodes.push(
        <Tag key={key()} id={id}>
          {renderInline(text, id)}
        </Tag>
      );
      i++;
      continue;
    }

    // hr
    if (/^---+$/.test(trimmed)) {
      nodes.push(<hr key={key()} />);
      i++;
      continue;
    }

    // table
    if (trimmed.startsWith("|") && lines[i + 1]?.trim().match(/^\|?\s*:?-{2,}/)) {
      const parseRow = (r: string) =>
        r
          .trim()
          .replace(/^\||\|$/g, "")
          .split("|")
          .map((c) => c.trim());
      const header = parseRow(trimmed);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(parseRow(lines[i++]));
      const id = key();
      nodes.push(
        <div key={id} className="blog-table">
          <table>
            <thead>
              <tr>
                {header.map((c, ci) => (
                  <th key={ci} scope="col">
                    {renderInline(c, `${id}h${ci}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => (
                    <td key={ci}>{renderInline(c, `${id}r${ri}c${ci}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // blockquote / callout
    if (trimmed.startsWith(">")) {
      const body: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) body.push(lines[i++].trim().replace(/^>\s?/, ""));
      const id = key();
      nodes.push(
        <blockquote key={id}>
          {body
            .join(" ")
            .split(/\s{2,}/)
            .map((p, pi) => (
              <p key={pi}>{renderInline(p, `${id}-${pi}`)}</p>
            ))}
        </blockquote>
      );
      continue;
    }

    // lists
    const isUl = /^[-*]\s+/.test(trimmed);
    const isOl = /^\d+[.)]\s+/.test(trimmed);
    if (isUl || isOl) {
      const items: string[] = [];
      const re = isUl ? /^[-*]\s+/ : /^\d+[.)]\s+/;
      while (i < lines.length && re.test(lines[i].trim())) {
        let item = lines[i].trim().replace(re, "");
        i++;
        // continuation lines (indented)
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !re.test(lines[i].trim())) item += " " + lines[i++].trim();
        items.push(item);
      }
      const id = key();
      const ListTag = isUl ? "ul" : "ol";
      nodes.push(
        <ListTag key={id}>
          {items.map((it, ii) => (
            <li key={ii}>{renderInline(it, `${id}-${ii}`)}</li>
          ))}
        </ListTag>
      );
      continue;
    }

    // paragraph (merge consecutive text lines)
    const para: string[] = [trimmed];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{2,4}\s|```|>|[-*]\s|\d+[.)]\s|\||---+$)/.test(lines[i].trim())
    ) {
      para.push(lines[i++].trim());
    }
    const id = key();
    nodes.push(<p key={id}>{renderInline(para.join(" "), id)}</p>);
  }

  return { nodes, toc };
}

/** Plain-text extraction for search indexes / descriptions. */
export function markdownToPlainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
