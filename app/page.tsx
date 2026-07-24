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
