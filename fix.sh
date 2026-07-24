#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════════
# FIX: TanStack Start → Next.js 15 (static export)
# Right tool for a landing page + simple form
# ═══════════════════════════════════════════════════════════════

echo "🔧 Converting to Next.js 15 (static export)..."

# ─── 1. Replace package.json ───────────────────────────────────
cat > package.json << 'EOF'
{
  "name": "harvestflow-site",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export"
  },
  "dependencies": {
    "next": "^15.3.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "gsap": "^3.12.7"
  },
  "devDependencies": {
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "typescript": "^5.8.0"
  }
}
EOF

# ─── 2. next.config.ts ─────────────────────────────────────────
cat > next.config.ts << 'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
EOF

# ─── 3. tsconfig.json (Next.js style) ──────────────────────────
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "~/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# ─── 4. Remove TanStack-specific files ─────────────────────────
rm -f app.config.ts vite.config.ts
rm -rf app/routes app/router.tsx app/client.tsx app/ssr.tsx app/routeTree.gen.ts

# ─── 5. Create Next.js App Router structure ────────────────────
mkdir -p app

# Root layout
cat > app/layout.tsx << 'EOF'
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
EOF

# Home page
cat > app/page.tsx << 'EOF'
"use client";

import { useState, useCallback } from "react";
import { Loader } from "~/components/layout/Loader";
import { Nav } from "~/components/layout/Nav";
import { Footer } from "~/components/layout/Footer";
import { Hero } from "~/components/sections/Hero";
import { Profile } from "~/components/sections/Profile";
import { Solutions } from "~/components/sections/Solutions";
import { ProductProof } from "~/components/sections/ProductProof";
import { Engineering } from "~/components/sections/Engineering";
import { PixelHarvest } from "~/components/sections/PixelHarvest";
import { Team } from "~/components/sections/Team";
import { Impact } from "~/components/sections/Impact";
import { Contact } from "~/components/sections/Contact";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <Loader onComplete={handleLoadComplete} />}
      <Nav />
      <main id="top">
        <Hero />
        <Profile />
        <Solutions />
        <ProductProof />
        <Engineering />
        <PixelHarvest />
        <Team />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
EOF

# ─── 6. Add "use client" to components that use hooks/state ────
# These files use useState/useEffect/useRef so they need the directive

for f in \
  components/layout/Loader.tsx \
  components/layout/Nav.tsx \
  components/sections/Hero.tsx \
  components/sections/Solutions.tsx \
  components/sections/PixelHarvest.tsx \
  components/sections/Contact.tsx \
  components/ui/PixelCanvas.tsx \
  components/ui/PixelDissolve.tsx; do
  if [ -f "$f" ] && ! head -1 "$f" | grep -q '"use client"'; then
    sed -i '1i "use client";\n' "$f"
  fi
done

# ─── 7. Fix image paths (Next.js public/ → /) ──────────────────
# Already using /assets/... which maps to public/assets/ ✓

# ─── 8. Remove old lock files ──────────────────────────────────
rm -f pnpm-lock.yaml package-lock.json

# ─── 9. .gitignore ─────────────────────────────────────────────
cat > .gitignore << 'EOF'
node_modules/
.next/
out/
*.local
.env
EOF

# ─── Done ──────────────────────────────────────────────────────
echo ""
echo "✅ Fixed. Now run:"
echo ""
echo "   pnpm install"
echo "   pnpm dev"
echo ""
echo "   Build for deploy:"
echo "   pnpm build    →  outputs to out/"
echo ""
