import type { Metadata } from "next";
import "~/styles/globals.css";
import "~/styles/pixel-art.css";

export const metadata: Metadata = {
  title: "HarvestFlow — From Yield to Income, Seamlessly",
  description:
    "HarvestFlow is an offline-first agri-tech platform connecting smallholder farmers to markets, insights, and financing across emerging agricultural economies.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 90'%3E%3Crect width='80' height='90' rx='14' fill='%23059669'/%3E%3Cellipse cx='40' cy='30' rx='7' ry='14' fill='white'/%3E%3Cpath d='M40 60 C40 68 15 72 15 72 C40 80 78 72 78 72' stroke='rgba(255,255,255,.8)' stroke-width='5' fill='none'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
