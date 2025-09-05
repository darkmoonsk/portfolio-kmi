"use client";

import React, { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { GalleryModal } from "@/components/GalleryModal";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Background3D } from "@/components/Background3D";
import { GalleryItem } from "./constants/gallery";
import EnergyBeamBackground from "@/components/EnergyBeamBackground";

function CosplayPortfolioContent() {
  const { mounted, themeDark } = useTheme();
  const [active, setActive] = useState<GalleryItem | null>(null);

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-b from-background to-background/70 text-foreground transition-colors [--primary:#6b21a8] [--primary-foreground:#faf5ff]">
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div
        className={`min-h-screen bg-gradient-to-b from-background/90 to-background/90 text-foreground transition-colors [--primary:#6b21a8] [--primary-foreground:#faf5ff] relative ${
          themeDark ? "dark" : ""
        }`}
      >
        {/* <Background3D /> */}
        <Navbar />
        <div>
          <Hero />
          <Gallery onItemClick={setActive} />
        </div>
        <GalleryModal active={active} onClose={() => setActive(null)} />
        <About />
        {/* <Contact /> */}
        <Footer />
      </div>
    </TooltipProvider>
  );
}

export default function CosplayPortfolio() {
  return (
    <ThemeProvider>
      <EnergyBeamBackground
        beamColorA="#6b21a8" // roxo escuro
        beamColorB="#c026d3" // magenta para as listras
        coreColor="#f5e1ff" // quase branco
        speed={1.0}
        intensity={1.1}
        opacity={0.9}
      />
      <CosplayPortfolioContent />
    </ThemeProvider>
  );
}
