import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupportMenu from "@/components/SupportMenu";
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
        <SupportMenu />
      </body>
    </html>
  );
}
