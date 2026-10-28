"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { getAssetPath } from "@/lib/assets";
import { projects } from "@/data/portfolio";

export default function ProjectReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mql = window.matchMedia("(min-width: 1024px)");
    if (!mql.matches || !containerRef.current || !wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const container = containerRef.current;

    // Calculate exact horizontal travel distance to center the LAST card (07)
    // perfectly in the viewport.
    const getTravelDistance = () => {
      if (!wrapperRef.current) return 0;
      const cards = wrapperRef.current.querySelectorAll<HTMLElement>(".project-card");
      if (cards.length < 2) return 0;
      const firstCard = cards[0];
      const lastCard = cards[cards.length - 1];
      // Since firstCard is centered when wrapper is at x=0 (due to paddingLeft),
      // translating wrapper by -(lastCard.offsetLeft - firstCard.offsetLeft)
      // places lastCard at the EXACT centered position where firstCard was.
      return Math.max(0, lastCard.offsetLeft - firstCard.offsetLeft);
    };

    // Calculate scroll track length for ScrollTrigger
    // Snappy transitions between cards (~480px per card) + a dedicated 800px stationary hold on project 07
    const getScrollDuration = () => {
      const travel = getTravelDistance();
      const transitionDistance = Math.round(travel * 0.6);
      const holdDistance = 800; // Dedicated vertical scroll distance for reading Project 07
      return transitionDistance + holdDistance;
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.6, // Smooth and immediately responsive to wheel/touchpad
        invalidateOnRefresh: true,
        anticipatePin: 1,
        end: () => "+=" + getScrollDuration(),
      },
    });

    // 1. Horizontal slide across all 7 projects until project 07 is dead center
    tl.to(wrapper, {
      x: () => -getTravelDistance(),
      ease: "none",
      duration: 1,
    });

    // 2. Extended pause/hold on project 07 so the user can comfortably view and read the entire card
    // 0.35 relative duration provides ~26% of the total pinned scroll track to inspect project 07
    tl.to({}, { duration: 0.35 });

    // Refresh layout measurements after initial DOM paint and font settling
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden bg-white w-full">
      {/* Track Label Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "#047857",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Engineering Showcase Reel
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            color: "#64748b",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Scroll to explore 7 production systems →
        </span>
      </div>

      {/* Horizontal Continuous Reel Track */}
      <div
        ref={wrapperRef}
        className="flex items-center"
        style={{
          position: "relative",
          width: "max-content",
          height: "82vh",
          paddingLeft: "calc((100vw - min(860px, 76vw)) / 2)",
          paddingRight: "calc((100vw - min(860px, 76vw)) / 2 + 120px)",
          gap: "1.75rem",
          willChange: "transform",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card flex-shrink-0 group"
            style={{
              width: "min(860px, 76vw)",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "1.25rem",
              padding: "2rem 2.25rem",
              boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
              position: "relative",
              overflow: "hidden",
              transition:
                "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.borderColor = "#6ee7b7";
              e.currentTarget.style.boxShadow =
                "0 20px 35px -10px rgba(16, 185, 129, 0.12), 0 0 0 1px rgba(16, 185, 129, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.boxShadow =
                "0 4px 20px -2px rgba(0, 0, 0, 0.05)";
            }}
          >
            {/* Top Emerald Accent Bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #059669, #10b981)",
                opacity: 0.9,
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center">
              {/* Left Column (6 cols): Project identity & summary */}
              <div
                className="md:col-span-6 flex flex-col justify-between"
                style={{ gap: "1.25rem" }}
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    {project.logo && (
                      <div
                        style={{
                          position: "relative",
                          width: "3.5rem",
                          height: "3.5rem",
                          borderRadius: "0.875rem",
                          overflow: "hidden",
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                          background: "#ffffff",
                          padding: "0.25rem",
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={getAssetPath(project.logo)}
                          alt={`${project.shortName} Logo`}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          color: "#047857",
                          padding: "0.2rem 0.65rem",
                          border: "1px solid #a7f3d0",
                          borderRadius: "9999px",
                          background: "#ecfdf5",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          display: "inline-block",
                        }}
                      >
                        0{index + 1} / {project.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.4rem, 2.2vw, 1.85rem)",
                      fontWeight: 800,
                      color: "#0f172a",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.25,
                      marginBottom: "0.65rem",
                    }}
                  >
                    {project.name}
                  </h3>

                  <p
                    style={{
                      color: "#334155",
                      fontSize: "0.9rem",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {project.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        color: "#0f172a",
                        background: "#f8fafc",
                        border: "1px solid #cbd5e1",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "0.375rem",
                        fontWeight: 600,
                        transition: "all 0.2s ease",
                      }}
                      className="hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column (6 cols): Architectural Specs Box */}
              <div
                className="md:col-span-6"
                style={{
                  background: "#f8fafc",
                  borderRadius: "1rem",
                  border: "1px solid #e2e8f0",
                  padding: "1.35rem 1.6rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.1rem",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontWeight: 700,
                      display: "block",
                      marginBottom: "0.3rem",
                    }}
                  >
                    The Architectural Challenge
                  </span>
                  <p
                    style={{
                      color: "#334155",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {project.problem}
                  </p>
                </div>

                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "#047857",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontWeight: 700,
                      display: "block",
                      marginBottom: "0.3rem",
                    }}
                  >
                    Implemented Solution
                  </span>
                  <p
                    style={{
                      color: "#334155",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {project.architecture}
                  </p>
                </div>

                {project.outcome && (
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        color: "#0f766e",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        fontWeight: 700,
                        display: "block",
                        marginBottom: "0.3rem",
                      }}
                    >
                      Verifiable Outcome
                    </span>
                    <p
                      style={{
                        color: "#334155",
                        fontSize: "0.85rem",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {project.outcome}
                    </p>
                  </div>
                )}

                <div style={{ paddingTop: "0.1rem" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.25rem 0.65rem",
                      background: "#ecfdf5",
                      border: "1px solid #a7f3d0",
                      borderRadius: "0.375rem",
                      color: "#047857",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#059669",
                        display: "inline-block",
                      }}
                    />
                    RECORD VERIFIED &amp; DOCUMENTED
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
