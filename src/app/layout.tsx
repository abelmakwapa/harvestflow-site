import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupportMenu from "@/components/SupportMenu";
import { SITE_DESCRIPTION, SITE_FAVICON_PATH, SITE_LOGO_PATH, SITE_NAME, SITE_URL, SOCIAL_IMAGE_PATH } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], display: "swap", variable: "--font-fraunces" });
const dm = DM_Sans({ subsets: ["latin"], style: ["normal", "italic"], display: "swap", variable: "--font-dmsans" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HarvestFlow | Agricultural supply chain infrastructure",
    template: "%s | HarvestFlow",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "agricultural technology",
  keywords: ["agriculture", "supply chain", "escrow", "logistics", "offline-first", "quality grading"],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  icons: {
    icon: [{ url: SITE_FAVICON_PATH, type: "image/svg+xml", sizes: "any" }],
    shortcut: SITE_FAVICON_PATH,
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_BW",
    siteName: SITE_NAME,
    title: "HarvestFlow | Agricultural supply chain infrastructure",
    description: SITE_DESCRIPTION,
    url: "/",
    images: [{ url: SOCIAL_IMAGE_PATH, width: 1200, height: 630, alt: `${SITE_NAME} — connected agricultural supply chains` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HarvestFlow | Agricultural supply chain infrastructure",
    description: SITE_DESCRIPTION,
    images: [SOCIAL_IMAGE_PATH],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f4e4",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: new URL(SITE_LOGO_PATH, SITE_URL).toString(),
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${dm.variable} font-sans bg-cream text-ink antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
        <SupportMenu />
      </body>
    </html>
  );
}
