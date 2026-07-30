import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupportMenu from "@/components/SupportMenu";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
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
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_BW",
    siteName: SITE_NAME,
    title: "HarvestFlow | Agricultural supply chain infrastructure",
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "HarvestFlow | Agricultural supply chain infrastructure",
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f4e4",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${dm.variable} font-sans bg-cream text-ink antialiased`}>
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
