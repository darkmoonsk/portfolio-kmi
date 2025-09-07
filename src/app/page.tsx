"use client";

import React, { useEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { GalleryModal } from "@/components/GalleryModal";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { GalleryItem } from "./constants/gallery";
import VideoBackground from "@/components/VideoBackground";
import CircleOfPower from "@/components/CircleOfPower";
import { useCountdownSofa } from "@/hooks/useCountdownSofa";
import Link from "next/link";

function CosplayPortfolioContent({
  setPageLoaded,
}: {
  setPageLoaded: (loaded: boolean) => void;
}) {
  const { mounted, themeDark } = useTheme();
  const [active, setActive] = useState<GalleryItem | null>(null);
  const { days, hours, minutes, seconds } = useCountdownSofa();

  useEffect(() => {
    setPageLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div className="flex flex-col items-center justify-center px-4 mb-4 -mt-16">
            <Link href="https://www.enelsofa.com/sofa2025/" target="_blank">
              <CircleOfPower
                src="/SOFA.jpg"
                size={480}
                ringWidth={60}
                speed={2}
              />
            </Link>
            <p className="text-2xl font-poppins text-center -mt-12 font-extrabold bg-gradient-to-r from-purple-700 via-pink-700 to-blue-500 bg-clip-text text-transparent">
              Presencia confirmada en SOFA 2025
            </p>
            <h3 className="text-4xl font-bangers text-center mt-2 ">
              Faltan <span className="text-blue-500">{days}</span> días{" "}
              <span className="text-blue-500">{hours}</span> horas{" "}
              <span className="text-blue-500">{minutes}</span> minutos{" "}
              <span className="text-blue-500">{seconds}</span> segundos{" "}
            </h3>
          </div>
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
  const [pageLoaded, setPageLoaded] = useState(false);

  return (
    <ThemeProvider>
      <div className="max-w-full overflow-x-hidden">
        {pageLoaded && <VideoBackground />}
        <CosplayPortfolioContent setPageLoaded={setPageLoaded} />
      </div>
    </ThemeProvider>
  );
}
