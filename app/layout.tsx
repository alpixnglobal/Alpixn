import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import SiteChrome from "@/components/layouts/SiteChrome";
import { ThemeProvider } from "@/components/theme-provider";
import Analytics from "@/components/seo/Analytics";
import Assistant from "@/components/assistant/Assistant";
import { getCachedAssistantAiReady, getCachedPricingData } from "@/lib/pricing/store";
import { getCachedSiteSettings } from "@/lib/content-service";
import { getCachedSeoSettings } from "@/lib/seo-store";

// Brand typography (ALPIXN brand guidelines): Sora for headings, Inter for body & UI.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alpixn.com";
const siteTitle = "ALPIXN – AI, Robotics & Software Technology Company";
const siteDescription =
  "ALPIXN is an AI, robotics and software technology company delivering custom software, AI-powered solutions, intelligent automation, scalable web and mobile apps for startups and enterprises.";

const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | ALPIXN",
  },
  description: siteDescription,
  applicationName: "ALPIXN",
  keywords: ["ALPIXN", "AI development", "robotics", "intelligent automation", "software development", "web development", "mobile apps", "machine learning"],
  openGraph: {
    type: "website",
    siteName: "ALPIXN",
    title: siteTitle,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

/** Root metadata plus webmaster-tool verification codes managed in Admin → SEO. */
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getCachedSeoSettings();
  const other: Record<string, string> = {};
  if (seo.bingVerification) other["msvalidate.01"] = seo.bingVerification;
  if (seo.pinterestVerification) other["p:domain_verify"] = seo.pinterestVerification;
  if (seo.facebookVerification) other["facebook-domain-verification"] = seo.facebookVerification;
  return {
    ...baseMetadata,
    description: seo.defaultDescription || siteDescription,
    openGraph: { ...baseMetadata.openGraph, ...(seo.defaultOgImage ? { images: [seo.defaultOgImage] } : {}) },
    twitter: { ...baseMetadata.twitter, ...(seo.twitterHandle ? { site: seo.twitterHandle } : {}) },
    robots: seo.indexSite ? undefined : { index: false, follow: false },
    verification: {
      ...(seo.googleVerification ? { google: seo.googleVerification } : {}),
      ...(seo.yandexVerification ? { yandex: seo.yandexVerification } : {}),
      ...(Object.keys(other).length ? { other } : {}),
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#040d1c" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, seo, pricing, aiReady] = await Promise.all([getCachedSiteSettings(), getCachedSeoSettings(), getCachedPricingData(), getCachedAssistantAiReady()]);

  return (
    // suppressHydrationWarning: next-themes sets the theme class on <html> before hydration.
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--surface)] focus:px-4 focus:py-2 focus:text-fg focus:shadow-lg"
          >
            Skip to content
          </a>
          <SiteChrome header={<Header />} footer={<Footer settings={siteSettings} />}>
            {children}
          </SiteChrome>
          {pricing.assistant.enabled ? <Assistant catalog={pricing.catalog} config={{ name: pricing.assistant.name, greeting: pricing.assistant.greeting, mode: aiReady ? "ai" : "guided" }} /> : null}
        </ThemeProvider>
        <Analytics settings={seo} />
      </body>
    </html>
  );
}
