"use client";

import ParticlesBackground from "./components/ParticlesBackground";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ComparisonSection from "./components/ComparisonSection";
import TimelineSection from "./components/TimelineSection";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative font-sans text-[var(--foreground)] bg-[var(--background)]">

      {/* Background Layer */}
      {/* <ParticlesBackground /> -- Removed per user request for clean look */}

      {/* Content Layer */}
      <div className="relative z-[2]">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <ComparisonSection />
        <TimelineSection />
        <PricingSection />
        <Footer />
      </div>

    </main>
  );
}
