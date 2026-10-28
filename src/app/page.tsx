"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import SpatialNavigation from "@/components/SpatialNavigation";
import GuideSignal from "@/components/GuideSignal";
import MemoryBanner from "@/components/MemoryBanner";
import AboutSection from "@/components/AboutSection";
import StackSection from "@/components/StackSection";
import IdentiCoreArchitecture from "@/components/IdentiCoreArchitecture";
import ProjectGraph from "@/components/ProjectGraph";
import ProjectReel from "@/components/ProjectReel";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import SmoothScroll from "@/components/SmoothScroll";
import CommandPalette from "@/components/CommandPalette";
import { systemSections, identity, social, type SystemStage } from "@/data/portfolio";
import { getAssetPath } from "@/lib/assets";

// Lazy load MagneticCursor to avoid SSR issues and improve initial load
const MagneticCursor = dynamic(() => import("@/components/MagneticCursor"), {
  ssr: false,
});

export default function Home() {
  const [activeStage, setActiveStage] = useState<SystemStage>("CLIENT");
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, currentScrollY / docHeight)) : 0;
    setScrollProgress(progress);

    // Track active stage based on section positioning
    for (let i = systemSections.length - 1; i >= 0; i--) {
      const el = document.getElementById(systemSections[i].sectionId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          setActiveStage(systemSections[i].stage);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    const timer = setTimeout(handleScroll, 0);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleEnterSystem = () => {
    scrollToSection("about");
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col overflow-x-hidden">
        {/* ─── Custom Magnetic Cursor ─────────────────────────── */}
        <MagneticCursor />

        {/* ─── Command Palette (Cmd+K) ─────────────────────── */}
        <CommandPalette onNavigate={scrollToSection} />

        {/* ─── Spatial Floating Navigation ─────────────────── */}
        <SpatialNavigation
          activeStage={activeStage}
          onNavigate={scrollToSection}
          scrollProgress={scrollProgress}
        />

        {/* ─── The Guide Signal (Living Request Packet) ────── */}
        <GuideSignal
          activeStage={activeStage}
          scrollProgress={scrollProgress}
        />

        {/* ─── Returning Visitor Memory System ─────────────── */}
        <MemoryBanner />

        {/* ─── Main Content Canvas ─── */}
        <main className="flex-1 w-full">
          {/* 01 // CLIENT — Hero Spatial Initialization & Portrait */}
          <HeroSection onEnterSystem={handleEnterSystem} />

          {/* 02 // API — Engineering Identity & Mindset */}
          <div style={{ background: "#ffffff", width: "100%" }}>
          <section
            id="about"
            className="system-section"
            aria-label="Engineering Identity"
          >
            <AboutSection />
          </section>
          </div>

          {/* 03 // IDENTITY — Stack & IdentiCore Architecture */}
          <section
            id="stack"
            className="system-section"
            aria-label="Stack and Architecture"
          >
            <StackSection />
            <IdentiCoreArchitecture />
          </section>

          {/* 04 // DATA — Project Graph & Reel */}
          <div style={{ background: "#ffffff", width: "100%" }}>
            <section
              id="projects"
              className="system-section"
              aria-label="Projects and Telemetry"
            >
              <ProjectGraph />
              <div className="mt-32">
                <ProjectReel />
              </div>
            </section>
          </div>

          {/* 04.5 // EXPERIENCE — Career & Achievements */}
          <section
            id="experience"
            className="system-section"
            aria-label="Experience and Career"
          >
            <ExperienceSection />
          </section>

          {/* 05 // RESPONSE — Handshake & Direct Endpoints */}
          <section
            id="contact"
            className="system-section"
            aria-label="Contact and Handshake"
          >
            <ContactSection />
          </section>
        </main>

        {/* ─── Minimal Telemetry Footer ────────────────────── */}
        <footer className="w-full py-10 pb-16 sm:py-12 px-4 sm:px-6 md:px-8 border-t border-[var(--color-border)] bg-[var(--color-bg)] text-xs font-mono text-[var(--color-muted-dim)] relative z-20">
          <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)] shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
              <span className="text-[var(--color-text)] font-medium">
                {identity.name}
              </span>
              <span>—</span>
              <span>{identity.positioning}</span>
            </div>
            <div className="flex items-center gap-4 text-[var(--color-muted)]">
              <a href={`mailto:${social.email}`} className="hover:text-[var(--color-text)] transition-colors duration-200">
                EMAIL
              </a>
              <span>·</span>
              <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-[var(--color-text)] transition-colors duration-200">
                GITHUB
              </a>
              <span>·</span>
              <a href={social.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--color-text)] transition-colors duration-200">
                LINKEDIN
              </a>
              <span>·</span>
              <a href={getAssetPath(social.cvDownloadUrl)} download="MD.Shakir-Ahmed.pdf" className="text-[var(--color-primary)] hover:underline">
                CV.PDF
              </a>
            </div>
          </div>
          {/* Keyboard shortcut hint */}
          <div className="w-full max-w-7xl mx-auto mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-center gap-2 text-[var(--color-muted-dim)]">
            <span className="px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[0.625rem]">⌘K</span>
            <span className="text-[0.625rem]">Command Palette</span>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
