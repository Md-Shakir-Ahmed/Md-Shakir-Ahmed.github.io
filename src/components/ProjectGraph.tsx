"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getAssetPath } from "@/lib/assets";
import { projects, type Project } from "@/data/portfolio";
import ProjectCaseStudyModal from "./ProjectCaseStudyModal";
import { useScrollReveal, useTextReveal, useStaggerReveal } from "@/lib/animations";

export default function ProjectGraph() {
  const [selectedModalProject, setSelectedModalProject] =
    useState<Project | null>(null);
  const [focusedProjectId, setFocusedProjectId] = useState<string>("btrc-lims");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const chipRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const dossierRef = useRef<HTMLDivElement>(null);
  const projectListRef = useRef<HTMLDivElement>(null);

  useScrollReveal(chipRef, { y: 20 });
  useTextReveal(headlineRef, { triggerOnScroll: true, stagger: 0.06 });
  useScrollReveal(graphRef, { delay: 0.1, y: 40 });
  useStaggerReveal(projectListRef, ".project-item", { stagger: 0.08 });

  // Positions for nodes on the desktop SVG graph canvas (800x420)
  const nodeCoordinates: Record<string, { x: number; y: number }> = {
    "btrc-lims": { x: 180, y: 120 },
    "brcp-wenp": { x: 140, y: 280 },
    ebs: { x: 380, y: 100 },
    queuepro: { x: 340, y: 330 },
    identicore: { x: 500, y: 210 },
    cricgeo: { x: 680, y: 140 },
    "applied-ml-pipeline": { x: 670, y: 310 },
  };

  const categoryColors: Record<string, string> = {
    Government: "#0284c7",
    Enterprise: "#2563eb",
    Product: "#059669",
    Identity: "#7c3aed",
    ML: "#d97706",
  };

  const activeProject =
    projects.find((p) => p.id === focusedProjectId) || projects[0];

  const hoveredNode = projects.find((p) => p.id === hoveredNodeId);

  return (
    <div className="w-full" style={{ background: "#ffffff", color: "#0f172a" }}>
      {/* Stage subhead */}
      <div ref={chipRef} className="flex items-center gap-3 mb-4">
        <span
          className="font-semibold tracking-wider"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#059669" }}
        >
          04
        </span>
        <div className="w-10 h-px bg-slate-300" />
        <span
          className="tracking-widest uppercase font-semibold"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "#64748b" }}
        >
          System Records & Spatial Node Graph
        </span>
      </div>

      <h2
        ref={headlineRef}
        className="mb-4 max-w-4xl"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
          lineHeight: 1.12,
          letterSpacing: "-0.03em",
          perspective: "600px",
          color: "#0f172a",
        }}
      >
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", color: "#0f172a" }}>Verified</span>{" "}
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", color: "#0f172a" }}>system</span>{" "}
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", color: "#0f172a" }}>records</span>{" "}
        <span className="word inline-block" style={{ willChange: "transform, opacity", transformOrigin: "center bottom", color: "#0f172a" }}>&</span>{" "}
        <span
          className="word inline-block"
          style={{
            willChange: "transform, opacity",
            transformOrigin: "center bottom",
            background: "linear-gradient(135deg, #059669, #10b981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          node&nbsp;architecture.
        </span>
      </h2>

      <p className="mb-6 max-w-3xl text-sm sm:text-base leading-relaxed" style={{ color: "#334155" }}>
        Projects in this system exist as data nodes within an interconnected
        graph. Connections indicate shared architecture patterns, identity
        tokens, or business integrations. Select any node or project to unpack
        its architectural dossier.
      </p>

      {/* ─── Desktop Interactive Node Graph Canvas with Smart Proportions ─── */}
      <div
        ref={graphRef}
        className="hidden md:block group"
        style={{
          marginTop: "1.25rem",
          marginBottom: "2.5rem",
          padding: "1rem 1.25rem 1.25rem 1.25rem",
          borderRadius: "0.875rem",
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          position: "relative",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#cbd5e1";
          e.currentTarget.style.boxShadow = "0 8px 24px -4px rgba(0,0,0,0.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.03)";
        }}
      >
        {/* Top Header Bar with Smart Spacing */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "0.75rem",
            marginBottom: "0.875rem",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#059669", display: "inline-block" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "#64748b",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Interactive Graph // Hover to Trace · Click to Inspect
            </span>
          </div>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              color: "#047857",
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              padding: "0.2rem 0.65rem",
              borderRadius: "0.375rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {hoveredNode
              ? `Focused: ${hoveredNode.shortName}`
              : `Active: ${activeProject.shortName}`}
          </span>
        </div>

        {/* SVG Canvas Inner Box */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxHeight: "400px",
            background: "#ffffff",
            borderRadius: "0.75rem",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
            overflow: "hidden",
          }}
          className="aspect-[16/8]"
        >
          <svg viewBox="0 0 800 420" className="w-full h-full select-none">
            <defs>
              <pattern
                id="graph-grid"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="1"
                  cy="1"
                  r="1"
                  fill="#cbd5e1"
                />
              </pattern>
              {/* Glow filters for different categories */}
              <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#graph-grid)" />

            {/* Connection Lines between nodes */}
            {projects.map((sourceProject) => {
              const sourceCoord = nodeCoordinates[sourceProject.id];
              if (!sourceCoord) return null;

              return sourceProject.connectionIds.map((targetId) => {
                const targetCoord = nodeCoordinates[targetId];
                if (!targetCoord) return null;

                const isConnected =
                  focusedProjectId === sourceProject.id ||
                  focusedProjectId === targetId ||
                  hoveredNodeId === sourceProject.id ||
                  hoveredNodeId === targetId;

                return (
                  <line
                    key={`${sourceProject.id}-${targetId}`}
                    x1={sourceCoord.x}
                    y1={sourceCoord.y}
                    x2={targetCoord.x}
                    y2={targetCoord.y}
                    stroke={
                      isConnected
                        ? categoryColors[sourceProject.category] || "#059669"
                        : "#e2e8f0"
                    }
                    strokeWidth={isConnected ? "2.5" : "1"}
                    strokeDasharray={isConnected ? "6 3" : "2 3"}
                    filter={isConnected ? "url(#glow-blue)" : undefined}
                    className="transition-all duration-500"
                  />
                );
              });
            })}

            {/* Project Nodes */}
            {projects.map((project) => {
              const coord = nodeCoordinates[project.id];
              if (!coord) return null;

              const isSelected = focusedProjectId === project.id;
              const isHovered = hoveredNodeId === project.id;
              const color = categoryColors[project.category] || "#059669";

              return (
                <g
                  key={project.id}
                  transform={`translate(${coord.x}, ${coord.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNodeId(project.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => setFocusedProjectId(project.id)}
                >
                  {/* Outer pulse aura */}
                  {(isSelected || isHovered) && (
                    <>
                      <circle
                        r="36"
                        fill="none"
                        stroke={color}
                        strokeWidth="1"
                        strokeOpacity="0.4"
                        className="animate-ping"
                      />
                      <circle
                        r="28"
                        fill={`${color}12`}
                        filter="url(#glow-strong)"
                      />
                    </>
                  )}

                  {/* Node Circle */}
                  <circle
                    r={isSelected ? "24" : "18"}
                    fill={isSelected ? `${color}25` : "#ffffff"}
                    stroke={color}
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    strokeOpacity={isSelected || isHovered ? 1 : 0.8}
                    className="transition-all duration-300"
                  />

                  {/* Center Dot */}
                  <circle r="4" fill={color} />

                  {/* Label */}
                  <text
                    y={isSelected ? "38" : "32"}
                    fill={isSelected ? "#0f172a" : "#475569"}
                    fontSize={isSelected ? "11" : "10"}
                    fontFamily="var(--font-mono)"
                    fontWeight={isSelected ? "700" : "500"}
                    textAnchor="middle"
                    className="transition-all duration-200 select-none"
                  >
                    {project.shortName}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ─── Editorial Architectural Dossier ─── */}
      <div className="pt-8 border-t border-slate-200" style={{ marginTop: "2rem" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Project Index Rail with Modern Hover Effects */}
          <div ref={projectListRef} className="lg:col-span-5 flex flex-col space-y-1.5">
            <span
              className="font-mono text-xs uppercase tracking-widest mb-3 block font-bold"
              style={{ color: "#059669" }}
            >
              Project Directory
            </span>

            {projects.map((p, index) => {
              const isSelected = p.id === focusedProjectId;
              const color = categoryColors[p.category] || "#059669";
              return (
                <button
                  key={p.id}
                  onClick={() => setFocusedProjectId(p.id)}
                  data-magnetic
                  className="project-item flex items-center justify-between text-left cursor-pointer"
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "0.75rem",
                    transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                    border: isSelected ? "1px solid #10b981" : "1px solid transparent",
                    background: isSelected ? "#ecfdf5" : "transparent",
                    boxShadow: isSelected ? "0 2px 8px rgba(16, 185, 129, 0.08)" : "none",
                    transform: isSelected ? "translateX(3px)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                      e.currentTarget.style.transform = "translateX(3px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: isSelected ? "#059669" : "#64748b",
                        fontWeight: isSelected ? 700 : 500,
                      }}
                    >
                      0{index + 1}
                    </span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? "#0f172a" : "#334155",
                      }}
                    >
                      {p.name}
                    </span>
                  </div>

                  <span
                    className="font-mono text-[0.625rem] px-2 py-0.5 rounded uppercase font-bold"
                    style={{
                      color,
                      backgroundColor: `${color}15`,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    {p.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Architectural Dossier Card with Smart Padding & Modern Hover */}
          <div
            ref={dossierRef}
            className="lg:col-span-7 flex flex-col justify-between"
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "1rem",
              padding: "1.75rem 2rem",
              boxShadow: "0 4px 16px -2px rgba(0,0,0,0.04)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.borderColor = "#a7f3d0";
              e.currentTarget.style.boxShadow = "0 12px 28px -6px rgba(16, 185, 129, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.boxShadow = "0 4px 16px -2px rgba(0,0,0,0.04)";
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="font-mono text-xs uppercase tracking-wider font-bold"
                      style={{
                        color:
                          categoryColors[activeProject.category] || "#059669",
                      }}
                    >
                      {activeProject.categoryLabel}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="font-mono text-xs text-slate-500 font-medium">
                      {activeProject.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    {activeProject.logo && (
                      <div className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-white p-1">
                        <Image 
                          src={getAssetPath(activeProject.logo)} 
                          alt={`${activeProject.shortName} Logo`} 
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <h3
                      className="text-xl sm:text-2xl text-slate-900 font-bold tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {activeProject.name}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
                    {activeProject.summary}
                  </p>
                </div>

                {/* Problem vs Architecture Solution */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div>
                    <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                      The Architectural Challenge
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {activeProject.problem}
                    </p>
                  </div>

                  <div>
                    <span
                      className="font-mono text-xs uppercase tracking-wider block mb-1 font-semibold"
                      style={{
                        color:
                          categoryColors[activeProject.category] || "#059669",
                      }}
                    >
                      Implemented Solution
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {activeProject.architecture}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Tokens */}
                <div className="pt-4 border-t border-slate-200">
                  <span className="font-mono text-[0.6875rem] text-slate-500 uppercase tracking-wider block mb-2 font-semibold">
                    Engineered With:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 font-mono text-[0.6875rem] text-slate-800 font-medium hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Unpack Full Case Study Modal Button with Modern Pill Interaction */}
                <div className="pt-3">
                  <button
                    onClick={() => setSelectedModalProject(activeProject)}
                    data-magnetic
                    data-cursor-label="VIEW"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold transition-all cursor-pointer group"
                    style={{
                      background: "#ecfdf5",
                      border: "1px solid #a7f3d0",
                      color: "#047857",
                      padding: "0.55rem 1.15rem",
                      borderRadius: "0.5rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#059669";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderColor = "#059669";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#ecfdf5";
                      e.currentTarget.style.color = "#047857";
                      e.currentTarget.style.borderColor = "#a7f3d0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span>
                      [ UNPACK FULL CASE STUDY SPECIFICATIONS ]
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </div>
  );
}
