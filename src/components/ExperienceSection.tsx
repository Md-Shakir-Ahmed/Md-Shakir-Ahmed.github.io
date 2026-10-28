"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getAssetPath } from "@/lib/assets";
import {
  experience,
  education,
  type Experience,
  type EducationItem,
} from "@/data/portfolio";
import {
  useScrollReveal,
  useStaggerReveal,
  useTextReveal,
  useCountUp,
} from "@/lib/animations";

export default function ExperienceSection() {
  // Detailed responsibilities collapsed by default for clean initial scan
  const [activeExpId, setActiveExpId] = useState<string | null>(null);
  const [activeAchievementIndex, setActiveAchievementIndex] =
    useState<number>(0);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const careerRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const algoRef = useRef<HTMLDivElement>(null);
  const constRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useTextReveal(headlineRef, { triggerOnScroll: true, stagger: 0.06 });
  useStaggerReveal(careerRef, ".career-item", { stagger: 0.15 });
  useStaggerReveal(eduRef, ".edu-item", { stagger: 0.2 });
  useScrollReveal(algoRef, { y: 50 });
  useScrollReveal(constRef, { y: 40 });
  useCountUp(counterRef, 300, 2.5, "+");

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Algorithm footprint platform records (Preserving verified metrics & platform URLs)
  const platforms = [
    {
      id: "codeforces",
      name: "Codeforces",
      stat: "Max Rating 1370",
      sub: "50+ Online Contests",
      detail:
        "Pre-Rating 909 · Participated in 50+ official rated rounds.",
      url: "https://codeforces.com",
    },
    {
      id: "uri",
      name: "URI / beecrowd",
      stat: "150+ Solved",
      sub: "C, C++, Python",
      detail:
        "150+ problems in data structures, math & ad-hoc logic.",
      url: "https://judge.beecrowd.com",
    },
    {
      id: "uva",
      name: "UVa Online Judge",
      stat: "70+ Solved",
      sub: "Graph & DP",
      detail:
        "70+ classical algorithmic problems focused on graph theory.",
      url: "https://onlinejudge.org",
    },
    {
      id: "lightoj",
      name: "LightOJ",
      stat: "60+ Solved",
      sub: "Combinatorics",
      detail:
        "60+ problem submissions in number theory and dynamic programming.",
      url: "https://lightoj.com",
    },
  ];

  // Leadership & Awards Constellation nodes
  const constellationNodes = [
    {
      id: "vupc-pres",
      label: "CLUB LEADERSHIP",
      shortLabel: "VUPC President",
      title: "President, Varendra University Programming Club",
      category: "Leadership",
      year: "2022 — 2023",
      detail:
        "Organized competitive programming training camps, intra-university workshops, and contest coaching for junior student engineers.",
      x: 180,
      y: 80,
    },
    {
      id: "icpc-regional",
      label: "ICPC REGIONAL",
      shortLabel: "ICPC Regional",
      title: "ICPC Regional Contestant (4+ Onsite Competitions)",
      category: "Competitive Programming",
      year: "2020",
      detail:
        "Represented university in ICPC 2020 and multiple national contest arenas across Bangladesh.",
      x: 80,
      y: 200,
    },
    {
      id: "intra-univ",
      label: "CONTEST CHAMPION",
      shortLabel: "Intra Champion",
      title: "Champion, Intra University Programming Contest",
      category: "Contest Champion",
      year: "2021",
      detail:
        "Achieved First Place among all university teams in algorithmic problem solving and time efficiency.",
      x: 340,
      y: 110,
    },
    {
      id: "it-quiz",
      label: "IT & TECH FEST",
      shortLabel: "IT Quiz Champion",
      title: "Champion, IT QUIZ 2022 & Project Showcase",
      category: "Honors",
      year: "2020, 2022",
      detail:
        "Won first place in IT Quiz 2022 and Virtual Tech Fest Project Showcase 2020.",
      x: 270,
      y: 240,
    },
    {
      id: "debate-robo",
      label: "DEBATE & ROBOTICS",
      shortLabel: "Robo & Debate",
      title: "Runner-up Tech Debate 2022 & Robo Soccer Champion",
      category: "Co-curricular",
      year: "2020, 2022",
      detail:
        "Runner-up in Tech Debate 2022 and Champion in Intra Department Robo Soccer 2020 at Varendra University.",
      x: 160,
      y: 320,
    },
  ];

  const activeAchievement =
    constellationNodes[activeAchievementIndex] || constellationNodes[0];

  return (
    <div className="w-full text-[var(--color-text)] flex flex-col gap-20 sm:gap-28">
      {/* ─── SECTION HEADER ─── */}
      <div>
        <span
          className="font-mono text-xs text-[var(--color-primary)] tracking-widest uppercase block mb-3"
          style={{ letterSpacing: "0.15em" }}
        >
          {"// TRAJECTORY & ALGORITHMIC FOUNDATION"}
        </span>
        <h2
          ref={headlineRef}
          className="text-[var(--color-text)] font-extrabold tracking-tight max-w-2xl"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            perspective: "600px",
          }}
        >
          <span
            className="word inline-block"
            style={{
              willChange: "transform, opacity",
              transformOrigin: "center bottom",
              opacity: 0,
            }}
          >
            Career
          </span>{" "}
          <span
            className="word inline-block"
            style={{
              willChange: "transform, opacity",
              transformOrigin: "center bottom",
              opacity: 0,
            }}
          >
            path,
          </span>{" "}
          <span
            className="word inline-block"
            style={{
              willChange: "transform, opacity",
              transformOrigin: "center bottom",
              opacity: 0,
            }}
          >
            academics
          </span>{" "}
          <span
            className="word inline-block"
            style={{
              willChange: "transform, opacity",
              transformOrigin: "center bottom",
              opacity: 0,
            }}
          >
            &
          </span>{" "}
          <span
            className="word inline-block text-gradient"
            style={{
              willChange: "transform, opacity",
              transformOrigin: "center bottom",
              opacity: 0,
            }}
          >
            algorithmic&nbsp;footprint.
          </span>
        </h2>
      </div>

      {/* ─── PART 1: EXPERIENCE — VISUAL TIMELINE ─── */}
      <div className="w-full">
        <div className="flex items-center gap-4 mb-10 sm:mb-14">
          <span className="font-mono text-xs text-[var(--color-muted)] tracking-widest uppercase">
            01 / CAREER PATH
          </span>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
        </div>

        {/* Vertical Career Path with Aligned Rail & Node Coordinates */}
        <div ref={careerRef} className="relative">
          {/* Continuous Vertical Signal Rail */}
          <div className="absolute left-[15px] sm:left-[21px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[var(--color-primary)]/40 via-[rgba(255,255,255,0.08)] to-transparent pointer-events-none">
            {/* Animated traveling signal pulse */}
            {!reducedMotion && (
              <motion.div
                animate={{ y: ["0%", "100%"] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-[2px] h-14 absolute bg-gradient-to-b from-transparent via-[var(--color-primary)] to-transparent"
                style={{ filter: "blur(1px)" }}
              />
            )}
          </div>

          <div className="space-y-12 sm:space-y-16">
            {experience.map((exp: Experience) => {
              const isExpanded = activeExpId === exp.id;

              return (
                <div
                  key={exp.id}
                  className="career-item relative pl-10 sm:pl-14 group"
                  style={{ opacity: 0 }}
                >
                  {/* Station Node on Career Path (Mathematically centered on rail) */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveExpId(isExpanded ? null : exp.id)
                    }
                    className="absolute left-[16px] sm:left-[22px] -translate-x-1/2 top-2 cursor-pointer z-10 p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-full transition-transform active:scale-95"
                    aria-label={`Toggle details for ${exp.company}`}
                    aria-expanded={isExpanded}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                        exp.current
                          ? "bg-[var(--color-bg)] border-2 border-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary-glow)]"
                          : "bg-[var(--color-bg)] border border-[rgba(255,255,255,0.3)] group-hover:border-[var(--color-primary)]"
                      }`}
                    >
                      {exp.current ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                      ) : (
                        <div className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-[var(--color-primary)]" />
                      )}
                    </div>
                  </button>

                  {/* ─── Clear 5-Level Milestone Hierarchy ─── */}
                  <div>
                    {/* 1. Timeline/date and location metadata */}
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--color-muted)] mb-2">
                      <span className="text-[var(--color-primary)] font-semibold whitespace-nowrap">
                        {exp.dates}
                      </span>
                      <span className="text-[rgba(255,255,255,0.2)]">·</span>
                      <span className="whitespace-nowrap">{exp.location}</span>
                    </div>

                    {/* 2. Company name and logo */}
                    <div className="flex items-center gap-3.5 mb-2 select-none">
                      {exp.logo && (
                        <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-xl overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[var(--color-surface)] shadow-sm">
                          <Image
                            src={getAssetPath(exp.logo)}
                            alt={`${exp.company} Logo`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <h3
                        className="text-xl sm:text-2xl text-[var(--color-text)] font-bold tracking-tight"
                        style={{
                          fontFamily: "var(--font-display)",
                          lineHeight: 1.2,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {exp.company}
                      </h3>
                    </div>

                    {/* 3. Job title and status */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="font-mono text-sm sm:text-base text-[var(--color-primary)] font-medium">
                        {exp.title}
                      </span>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.6875rem] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          ACTIVE ROLE
                        </span>
                      )}
                    </div>

                    {/* 4. Short responsibility summary (Controlled reading measure) */}
                    <p className="text-[var(--color-muted)] text-sm sm:text-base max-w-[65ch] leading-relaxed mb-3.5">
                      {exp.summary}
                    </p>

                    {/* 5. Expandable detailed responsibilities */}
                    <button
                      type="button"
                      onClick={() =>
                        setActiveExpId(isExpanded ? null : exp.id)
                      }
                      aria-expanded={isExpanded}
                      aria-controls={`exp-details-${exp.id}`}
                      data-magnetic
                      className="font-mono text-xs text-[var(--color-primary)] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2 py-1 px-2.5 rounded-md border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] group/btn"
                    >
                      <span>
                        {isExpanded
                          ? "[ HIDE DETAILED RESPONSIBILITIES ]"
                          : "[ VIEW DETAILED RESPONSIBILITIES ]"}
                      </span>
                      <span className="text-[0.6875rem] transition-transform duration-200 group-hover/btn:translate-x-0.5">
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    </button>

                    {/* Responsibilities list (Smooth accordion reveal) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          id={`exp-details-${exp.id}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3.5 pb-2 space-y-3 max-w-[65ch] border-l-2 border-[var(--color-primary)]/30 pl-4 sm:pl-5 my-2.5">
                            {exp.responsibilities.map((resp, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: i * 0.06,
                                  duration: 0.25,
                                }}
                                className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)] leading-relaxed"
                              >
                                <span className="text-[var(--color-primary)] font-mono text-[0.6875rem] mt-0.5 shrink-0 bg-[var(--color-primary)]/10 px-1.5 py-0.5 rounded font-bold">
                                  0{i + 1}
                                </span>
                                <span>{resp}</span>
                              </motion.div>
                            ))}

                            {/* Tech Stack tags */}
                            <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-[rgba(255,255,255,0.06)]">
                              <span className="font-mono text-[0.6875rem] uppercase text-[var(--color-muted-dim)] mr-1">
                                STACK:
                              </span>
                              {exp.technologies.map((t) => (
                                <span
                                  key={t}
                                  className="font-mono text-xs text-[var(--color-muted)] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] px-2.5 py-0.5 rounded-md"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── PART 2: EDUCATION — EDITORIAL LAYOUT ─── */}
      <div className="w-full">
        <div className="flex items-center gap-4 mb-10 sm:mb-14">
          <span className="font-mono text-xs text-[var(--color-muted)] tracking-widest uppercase">
            02 / ACADEMIC MILESTONES
          </span>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
        </div>

        <div ref={eduRef} className="space-y-8 sm:space-y-10">
          {education.map((edu: EducationItem, idx: number) => (
            <div
              key={edu.id}
              className="edu-item relative group"
              style={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                {/* Milestone Index */}
                <div className="md:col-span-1 pt-0.5">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[rgba(255,255,255,0.15)] group-hover:text-[var(--color-primary)] transition-colors duration-300 select-none">
                    0{idx + 1}
                  </span>
                </div>

                {/* Degree, Department & Highlights */}
                <div className="md:col-span-7 lg:col-span-8 max-w-[55ch]">
                  <h3
                    className="text-[var(--color-text)] font-bold mb-1 tracking-tight"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.125rem, 1.8vw, 1.45rem)",
                      lineHeight: 1.35,
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <p className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-wider mb-2.5 font-medium">
                    {edu.department}
                  </p>
                  <div className="space-y-1.5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {edu.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)]/60 text-xs mt-0.5 shrink-0 select-none">
                          ▸
                        </span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Institution & Completion Badge */}
                <div className="md:col-span-4 lg:col-span-3 flex flex-col md:items-end text-left md:text-right gap-1.5 pt-0.5">
                  <span
                    className="text-sm sm:text-base font-semibold text-[var(--color-text)] tracking-tight"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {edu.institution}
                  </span>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {edu.status}
                  </span>
                </div>
              </div>

              {idx < education.length - 1 && (
                <div className="w-full h-px bg-[rgba(255,255,255,0.06)] mt-8 sm:mt-10" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── PART 3: COMPETITIVE PROGRAMMING — ALGORITHMIC FOOTPRINT ─── */}
      <div className="w-full">
        <div className="flex items-center gap-4 mb-10 sm:mb-14">
          <span className="font-mono text-xs text-[var(--color-muted)] tracking-widest uppercase">
            03 / ALGORITHMIC FOOTPRINT
          </span>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
        </div>

        <div
          ref={algoRef}
          className="relative py-8 sm:py-12 px-5 sm:px-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Center Hub: 300+ Counter (Primary Visual Anchor) */}
          <div className="relative z-10 text-center my-2 sm:my-4">
            <div
              className="font-extrabold text-[var(--color-text)] tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.5rem, 7vw, 5rem)",
                lineHeight: 1,
              }}
            >
              <span ref={counterRef}>0</span>
            </div>
            <p
              className="font-mono text-xs sm:text-sm tracking-widest text-[var(--color-primary)] font-semibold uppercase mt-3"
              style={{ letterSpacing: "0.15em" }}
            >
              ALGORITHMIC PROBLEMS SOLVED
            </p>
            <p className="text-xs sm:text-sm text-[var(--color-muted)] max-w-lg mx-auto mt-2 leading-relaxed">
              Competitive programming across international online judges building core
              algorithmic efficiency, discrete math models, and deterministic thinking.
            </p>
          </div>

          {/* Platform Cards in Clean Responsive Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-[rgba(255,255,255,0.06)]">
            {platforms.map((p) => {
              const isHovered = hoveredPlatform === p.id;
              return (
                <div
                  key={p.id}
                  onMouseEnter={() => setHoveredPlatform(p.id)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                  className="p-5 sm:p-6 rounded-2xl bg-[var(--color-bg)]/80 border border-[rgba(255,255,255,0.08)] hover:border-[var(--color-primary)]/40 transition-colors duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Platform Name & Record Link */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                            isHovered
                              ? "bg-[var(--color-primary)]"
                              : "bg-[rgba(255,255,255,0.25)]"
                          }`}
                        />
                        <span className="font-mono text-xs text-[var(--color-text)] font-semibold">
                          {p.name}
                        </span>
                      </div>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${p.name}`}
                        className="font-mono text-[0.6875rem] text-[var(--color-primary)] hover:text-white flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20"
                      >
                        <span>RECORD</span>
                        <span className="text-[0.625rem]">↗</span>
                      </a>
                    </div>

                    {/* Primary Solved / Rating Metric */}
                    <div className="font-mono text-xl sm:text-2xl text-[var(--color-primary)] font-bold tracking-tight my-1.5">
                      {p.stat}
                    </div>

                    {/* Languages / Topic Tag */}
                    <div className="font-mono text-xs text-[var(--color-text-secondary)] mb-3 font-medium">
                      {p.sub}
                    </div>
                  </div>

                  {/* Concise Description */}
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed pt-2.5 border-t border-[rgba(255,255,255,0.04)]">
                    {p.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── PART 4: LEADERSHIP & ACHIEVEMENTS — CONSTELLATION ─── */}
      <div ref={constRef} className="w-full" style={{ opacity: 0 }}>
        <div className="flex items-center gap-4 mb-10 sm:mb-14">
          <span className="font-mono text-xs text-[var(--color-muted)] tracking-widest uppercase">
            04 / LEADERSHIP & HONORS
          </span>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Constellation Visual Graph (Desktop & Tablet) */}
          <div className="lg:col-span-7 relative h-[360px] sm:h-[390px] w-full rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden flex flex-col justify-between p-4 sm:p-6">
            {/* Desktop SVG Visual Graph */}
            <div className="hidden sm:flex flex-1 items-center justify-center relative">
              <svg
                viewBox="0 0 440 380"
                className="w-full h-full select-none max-h-[300px]"
              >
                <defs>
                  <radialGradient id="hub-glow-lead" cx="50%" cy="50%" r="50%">
                    <stop
                      offset="0%"
                      stopColor="#38BDF8"
                      stopOpacity="0.3"
                    />
                    <stop
                      offset="100%"
                      stopColor="#38BDF8"
                      stopOpacity="0"
                    />
                  </radialGradient>
                </defs>

                {/* Connecting lines */}
                <line
                  x1="180"
                  y1="80"
                  x2="340"
                  y2="110"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <line
                  x1="180"
                  y1="80"
                  x2="80"
                  y2="200"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <line
                  x1="80"
                  y1="200"
                  x2="160"
                  y2="320"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <line
                  x1="340"
                  y1="110"
                  x2="270"
                  y2="240"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <line
                  x1="270"
                  y1="240"
                  x2="160"
                  y2="320"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <line
                  x1="80"
                  y1="200"
                  x2="270"
                  y2="240"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />

                {/* Constellation Nodes */}
                {constellationNodes.map((node, index) => {
                  const isActive = activeAchievementIndex === index;
                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      className="cursor-pointer"
                      onClick={() => setActiveAchievementIndex(index)}
                      onMouseEnter={() => setActiveAchievementIndex(index)}
                    >
                      {isActive && (
                        <circle
                          r="24"
                          fill="url(#hub-glow-lead)"
                          className="animate-pulse"
                        />
                      )}

                      <circle
                        r={isActive ? "13" : "8"}
                        fill="#0E1015"
                        stroke={isActive ? "#38BDF8" : "rgba(255,255,255,0.25)"}
                        strokeWidth={isActive ? "2" : "1"}
                        className="transition-all duration-300"
                      />

                      <circle
                        r={isActive ? "5" : "3"}
                        fill={isActive ? "#38BDF8" : "rgba(255,255,255,0.5)"}
                      />

                      <text
                        y={isActive ? "26" : "20"}
                        textAnchor="middle"
                        fill={isActive ? "#FFFFFF" : "rgba(255,255,255,0.4)"}
                        fontSize={isActive ? "10" : "8"}
                        fontFamily="var(--font-mono)"
                        letterSpacing="0.08em"
                        className="transition-all duration-200 select-none"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Mobile-Friendly List Selector (Clean touch targets) */}
            <div className="flex sm:hidden flex-col justify-center space-y-2 flex-1">
              <span className="font-mono text-[0.6875rem] text-[var(--color-primary)] uppercase tracking-wider mb-1">
                SELECT MILESTONE:
              </span>
              {constellationNodes.map((node, index) => {
                const isActive = activeAchievementIndex === index;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveAchievementIndex(index)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-mono text-xs transition-colors ${
                      isActive
                        ? "bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/40 text-white font-bold"
                        : "bg-[var(--color-bg)]/40 border border-white/5 text-[var(--color-muted)] hover:text-white"
                    }`}
                  >
                    <span>{node.shortLabel}</span>
                    <span className="text-[0.6875rem] opacity-75">{node.year}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.06)]">
              <span className="font-mono text-[0.625rem] text-[var(--color-muted-dim)]">
                {"// HOVER OR CLICK NODES TO INSPECT"}
              </span>
              <span className="font-mono text-[0.625rem] text-[var(--color-primary)]">
                {activeAchievementIndex + 1} OF {constellationNodes.length}
              </span>
            </div>
          </div>

          {/* Right: Selected Node Detail */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Unified Milestone Selector Bar (Accessible with keyboard tabs/arrows) */}
            <div
              role="tablist"
              aria-label="Leadership Milestones"
              className="flex flex-wrap items-center gap-1.5 mb-5 pb-3 border-b border-[rgba(255,255,255,0.06)]"
            >
              <span className="font-mono text-[0.6875rem] text-[var(--color-muted-dim)] mr-1">
                RECORD:
              </span>
              {constellationNodes.map((n, i) => (
                <button
                  key={n.id}
                  role="tab"
                  aria-selected={activeAchievementIndex === i}
                  type="button"
                  onClick={() => setActiveAchievementIndex(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      setActiveAchievementIndex(
                        (i + 1) % constellationNodes.length
                      );
                    } else if (e.key === "ArrowLeft") {
                      setActiveAchievementIndex(
                        (i - 1 + constellationNodes.length) %
                          constellationNodes.length
                      );
                    }
                  }}
                  className={`font-mono text-xs px-2.5 py-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                    activeAchievementIndex === i
                      ? "text-white bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/50 font-bold"
                      : "text-[var(--color-muted)] hover:text-white bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]"
                  }`}
                  aria-label={`Select ${n.title}`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeAchievement.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3.5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-wider font-semibold">
                    {activeAchievement.category}
                  </span>
                  <span className="text-[var(--color-muted-dim)]">·</span>
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {activeAchievement.year}
                  </span>
                </div>

                <h4
                  className="text-[var(--color-text)] font-bold tracking-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.25rem, 2.2vw, 1.625rem)",
                    lineHeight: 1.25,
                  }}
                >
                  {activeAchievement.title}
                </h4>

                <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
                  {activeAchievement.detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
