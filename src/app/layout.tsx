import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { Fingerprint } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], display: "swap", variable: "--font-fraunces" });
const dm = DM_Sans({ subsets: ["latin"], style: ["normal", "italic"], display: "swap", variable: "--font-dmsans" });

export const metadata: Metadata = {
  title: "HarvestFlow | The Complete Agricultural Supply Chain",
  description:
    "A centralized ecosystem connecting farmers, suppliers, logistics, and enterprise buyers. Powered by secure escrow, offline-first trading, and algorithmic quality control.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${dm.variable} font-sans bg-cream text-ink antialiased`}>
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <Navbar />
        {children}
        <Footer />
        <div className="fixed bottom-6 left-6 z-50">
          <span className="relative grid h-14 w-14 place-items-center">
            <span className="pulse-ring absolute inline-flex h-14 w-14 rounded-full bg-lav" />
            <button
              type="button"
              aria-label="HarvestFlow assistant"
              className="relative grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-lav text-ink shadow-[0_14px_34px_-10px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Fingerprint className="h-6 w-6" aria-hidden="true" />
            </button>
          </span>
        </div>
      </body>
    </html>
  );
}
