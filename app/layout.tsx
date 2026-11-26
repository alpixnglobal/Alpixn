import type { Metadata } from "next";
import { Manrope, Roboto } from "next/font/google";
import "./globals.css";
import DisableDarkMode from "@/components/DisableDarkMode";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { getCachedSiteSettings } from "@/lib/content-service";

const manRope = Manrope({
  variable: "--font-man-rope",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alpixn – Software, Web Development, Mobile Apps & AI Solutions Company",
  description: "Alpixn is a leading Software, web and mobile app development company offering custom software, AI-powered solutions, scalable web apps, and business automation services to help startups and enterprises grow faster.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getCachedSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manRope.variable} ${roboto.variable} antialiased`} suppressHydrationWarning>
        <DisableDarkMode />
        <Header />
        {children}
        <Footer settings={siteSettings} />
      </body>
    </html>
  );
}
