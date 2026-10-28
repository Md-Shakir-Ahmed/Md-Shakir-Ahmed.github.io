"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { getAssetPath } from "@/lib/assets";
import { projects, type Project } from "@/data/portfolio";
import ProjectCaseStudyModal from "@/components/ProjectCaseStudyModal";

// ─── ARCHITECTURAL SCHEMATICS & VERIFIED FIELD DOSSIERS ───────────
interface ArchitectureNode {
  title: string;
  sub: string;
}

interface ProjectDossierData {
  flowTitle: string;
  nodes: [ArchitectureNode, ArchitectureNode, ArchitectureNode];
  connectors: [string, string];
  invariant: string;
  fieldNoteLeft: string;
  fieldNoteRight: string;
  tradeOff: string;
}

const projectDossiers: Record<string, ProjectDossierData> = {
  "btrc-lims": {
    flowTitle: "Multi-Tier Regulatory Approval Pipeline",
    nodes: [
      { title: "Applicant Portal", sub: "Idempotent REST" },
      { title: "Approval Engine", sub: "State Machine" },
      { title: "Gov Audit Vault", sub: "Relational ACID" },
    ],
    connectors: ["Submit & Validate", "Commit Audit"],
    invariant: "State machine guarantees deterministic transitions across institutional review tiers.",
    fieldNoteLeft: "✎ Architecture Invariant: Approval transitions are deterministic to prevent race conditions.",
    fieldNoteRight: "✎ Technical Result: Centralized licensing workflows established end-to-end departmental auditability.",
    tradeOff: "Prioritized strict relational transaction isolation over eventual consistency to guarantee regulatory audit trails.",
  },
  "brcp-wenp": {
    flowTitle: "Regional Commerce & Directory Linkage",
    nodes: [
      { title: "Regional Hubs", sub: "Enterprise Portal" },
      { title: "Directory Engine", sub: "Query Caching" },
      { title: "Commercial Partners", sub: "B2B Relational" },
    ],
    connectors: ["Authenticated APIs", "Match & Route"],
    invariant: "Directory query caching preserves access across varying regional network conditions.",
    fieldNoteLeft: "✎ Key Consideration: Directory queries are cached to ensure continuity under variable connectivity.",
    fieldNoteRight: "✎ Technical Result: Structured directory search provides verified commercial linkages across hub locations.",
    tradeOff: "Normalized relational storage paired with directory caching to maintain responsiveness across regional networks.",
  },
  ebs: {
    flowTitle: "Transactional ERP & Reporting Topology",
    nodes: [
      { title: "Business Modules", sub: "Financial / Ledger" },
      { title: "Core Tx Engine", sub: "Row-Level Isolation" },
      { title: "Audit Schedulers", sub: "Read Replicas" },
    ],
    connectors: ["Atomic Commits", "Async Sync"],
    invariant: "Analytical reporting is decoupled from live transactional ledgers to eliminate locks.",
    fieldNoteLeft: "✎ Optimization Note: Multi-table relational joins refactored to eliminate lock contention on core ledgers.",
    fieldNoteRight: "✎ Technical Result: Consolidated enterprise reporting with atomic consistency across accounting workflows.",
    tradeOff: "Separated read-heavy financial reporting queries from write-heavy atomic transactions using indexed read replicas.",
  },
  queuepro: {
    flowTitle: "Atomic Token Sequencer & Dispatch Topology",
    nodes: [
      { title: "Kiosk Influx", sub: "Burst Arrival" },
      { title: "Dispatch Sequencer", sub: "In-Memory Engine" },
      { title: "Service Counters", sub: "State Sync Sockets" },
    ],
    connectors: ["Atomic Increment", "Route Counter"],
    invariant: "In-memory token sequencing eliminates state drift between concurrent counter operators.",
    fieldNoteLeft: "✎ Concurrency Rule: Token allocation is atomic—two service counters never receive the same token.",
    fieldNoteRight: "✎ Technical Result: Real-time counter synchronization eliminates queue state drift across all operator desks.",
    tradeOff: "Utilized in-memory atomic token sequencing rather than polling to prevent desynchronization during customer arrival bursts.",
  },
  cricgeo: {
    flowTitle: "Spatial Trajectory Indexing & Heatmaps",
    nodes: [
      { title: "Ball Coordinates", sub: "Vector Input" },
      { title: "FastAPI Engine", sub: "Trajectory Parser" },
      { title: "Spatial Heatmap", sub: "PostgreSQL Index" },
    ],
    connectors: ["Vector Transform", "Spatial Query"],
    invariant: "Custom coordinate schemas optimized for micro-matchup queries rather than static tables.",
    fieldNoteLeft: "✎ Spatial Modeling: Raw ball delivery vectors mapped to normalized coordinates for matchup analysis.",
    fieldNoteRight: "✎ Technical Result: Indexed spatial queries power interactive visual pitch heatmaps and tactical breakdowns.",
    tradeOff: "Custom spatial coordinate schemas optimized for rapid trajectory lookups rather than static summary tables.",
  },
  identicore: {
    flowTitle: "Centralized IAM & Token Delegation Topology",
    nodes: [
      { title: "Client Bearer", sub: "RS256 JWT Token" },
      { title: "API Gateway", sub: "Token Introspection" },
      { title: "Microservice Mesh", sub: "Isolated Domains" },
    ],
    connectors: ["Cryptographic Claims", "Enforce RBAC"],
    invariant: "Stateless token verification at service boundaries paired with centralized revocation.",
    fieldNoteLeft: "✎ Security Policy: Microservices verify RS256 token claims locally without repetitive auth roundtrips.",
    fieldNoteRight: "✎ Technical Result: Unified Single Sign-On eliminates auth logic duplication across distributed services.",
    tradeOff: "Stateless cryptographic JWT verification at service boundaries paired with centralized token revocation.",
  },
  "applied-ml-pipeline": {
    flowTitle: "Containerized Inference & Pipeline Flow",
    nodes: [
      { title: "Request Payload", sub: "Feature Pipeline" },
      { title: "Inference Service", sub: "FastAPI Async" },
      { title: "Production App", sub: "Structured REST" },
    ],
    connectors: ["Validated Transform", "Deliver Inference"],
    invariant: "Feature transformation code matches offline training pipelines byte-for-byte to prevent drift.",
    fieldNoteLeft: "✎ Production Invariant: Preprocessing transformations remain identical between models and API services.",
    fieldNoteRight: "✎ Technical Result: Containerized inference pipelines deliver real-time analytical outputs to backend endpoints.",
    tradeOff: "Decoupled FastAPI inference microservice from core web processes to allow independent resource allocation.",
  },
};

// ─── READABLE RESPONSIVE ARCHITECTURE DIAGRAM COMPONENT ───────────
function ArchitectureDiagram({ dossier }: { dossier: ProjectDossierData }) {
  return (
    <div className="w-full my-2.5 p-3 rounded-lg bg-[#f5f0e4] border border-[#ded5bf] select-none">
      {/* Schematic Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#e5decb] text-[0.5625rem] font-mono">
        <span className="font-bold text-[#44403c] uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#047857]" />
          <span>// {dossier.flowTitle}</span>
        </span>
        <span className="text-[#047857] font-semibold tracking-widest text-[0.5rem] bg-[#ecfdf5] px-1.5 py-0.5 rounded border border-[#a7f3d0]">
          IMPLEMENTED TOPOLOGY
        </span>
      </div>

      {/* 3-Node Architecture Flow */}
      <div className="flex items-center justify-between gap-1.5">
        {dossier.nodes.map((node, idx) => (
          <div key={node.title} className="flex items-center flex-1 min-w-0">
            {/* Node Card */}
            <div className="flex-1 min-w-0 px-2 py-1.5 rounded bg-[#fdfbf7] border border-[#dcd4be] shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-center">
              <span className="block font-mono text-[0.625rem] font-bold text-[#1c1917] truncate leading-tight">
                {node.title}
              </span>
              <span className="block font-mono text-[0.5rem] text-[#78716c] truncate mt-0.5">
                {node.sub}
              </span>
            </div>

            {/* Directional Connector Arrow */}
            {idx < 2 && (
              <div className="flex flex-col items-center px-1 flex-shrink-0 text-[#047857]">
                <span className="text-[0.45rem] font-mono font-semibold uppercase tracking-tighter truncate max-w-[55px] text-center mb-0.5 text-[#57534e]">
                  {dossier.connectors[idx]}
                </span>
                <svg className="w-3.5 h-2 text-[#047857]" viewBox="0 0 14 8" fill="none">
                  <path d="M0 4H12M12 4L8.5 1M12 4L8.5 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Invariant Note */}
      <div className="mt-2 pt-1.5 border-t border-[#e5decb] flex items-center gap-1.5 text-[0.5625rem] font-mono text-[#57534e]">
        <span className="font-bold text-[#1c1917] flex-shrink-0">Invariant:</span>
        <span className="truncate">{dossier.invariant}</span>
      </div>
    </div>
  );
}

// ─── LEFT PAGE (VERSO): ARCHITECTURAL IDENTITY & SPECIFICATIONS ────
interface LeftPageProps {
  project: Project;
  pageNumber: number;
  chapterIndex: number;
}

function LeftPage({ project, pageNumber, chapterIndex }: LeftPageProps) {
  const dossier = projectDossiers[project.id] ?? {
    flowTitle: "System Architecture Flow",
    nodes: [
      { title: "Client Layer", sub: "REST Protocol" },
      { title: "Service Engine", sub: "Domain Logic" },
      { title: "Data Storage", sub: "Relational DB" },
    ],
    connectors: ["Send Request", "Execute Query"],
    invariant: "System guarantees data integrity across transaction boundaries.",
    fieldNoteLeft: "✎ Architectural observation: Validated backend pipeline.",
    fieldNoteRight: "✎ Technical result: Verified implementation.",
    tradeOff: "Optimized for high-throughput reliability.",
  };

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between select-none"
      style={{
        background: "linear-gradient(135deg, #fcfaf6 0%, #f6f1e6 100%)",
        padding: "1.75rem 2.25rem 1.5rem 2rem",
        borderRight: "1px solid #e5dcce",
        boxShadow: "inset -10px 0 18px -8px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Spine Gutter Shadow on right edge */}
      <div
        className="pointer-events-none absolute top-0 right-0 bottom-0 w-8 z-20"
        style={{
          background: "linear-gradient(to left, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0))",
        }}
      />

      {/* Top Folio Header */}
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[#e2d8c3] text-[0.625rem] font-mono tracking-wider text-[#78716c]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>THE ENGINEERING MONOGRAPH // VOL. 04</span>
          </span>
          <span className="font-bold text-[#047857] uppercase tracking-widest">
            CHAPTER 0{chapterIndex + 1}
          </span>
          <span className="font-bold text-[#1c1917]">P. 0{pageNumber}</span>
        </div>

        {/* Project Monogram & Identification */}
        <div className="mt-3 flex items-center gap-3">
          {project.logo && (
            <div
              className="relative w-11 h-11 rounded-lg overflow-hidden border border-[#ded5bf] bg-white flex-shrink-0 shadow-sm"
              style={{ padding: "0.15rem" }}
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
                fontSize: "0.5625rem",
                color: "#047857",
                padding: "0.1rem 0.5rem",
                border: "1px solid #a7f3d0",
                borderRadius: "9999px",
                background: "#ecfdf5",
                fontWeight: 700,
                letterSpacing: "0.08em",
                display: "inline-block",
              }}
            >
              SPEC NO. 0{chapterIndex + 1} // {project.category.toUpperCase()}
            </span>
            <div className="text-[0.625rem] font-mono text-[#78716c] mt-0.5">
              DISCIPLINE: {project.categoryLabel}
            </div>
          </div>
        </div>

        {/* Project Title */}
        <h3
          className="mt-2.5 text-[#1c1917]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.15rem, 1.5vw, 1.4rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
          }}
        >
          {project.name}
        </h3>

        {/* Executive Summary Paragraph (Natural wrap, no line-clamp!) */}
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#292524]">
          {project.summary}
        </p>

        {/* Readable Architecture Flow Diagram */}
        <ArchitectureDiagram dossier={dossier} />

        {/* Handwritten Style Margin Observation */}
        <div className="mt-2 flex items-start gap-1 text-[0.625rem] font-mono italic text-[#047857] bg-[#ecfdf5]/70 px-2 py-1 rounded border-l-2 border-[#10b981]">
          <span>{dossier.fieldNoteLeft}</span>
        </div>
      </div>

      {/* Footer Area: Authorized Tech Stack & Role */}
      <div className="mt-auto pt-2.5 border-t border-[#e2d8c3]">
        <div className="flex items-center justify-between gap-2 mb-1.5 text-[0.5625rem] font-mono text-[#78716c]">
          <span className="uppercase font-bold text-[#44403c]">
            // Authorized System Stack
          </span>
          <span className="truncate max-w-[60%]">
            ROLE: {project.role}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5625rem",
                color: "#1c1917",
                background: "#ede5d4",
                border: "1px solid #ded5bf",
                padding: "0.15rem 0.45rem",
                borderRadius: "0.2rem",
                fontWeight: 600,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── RIGHT PAGE (RECTO): TECHNICAL DOSSIER & VERIFICATION ────────
interface RightPageProps {
  project: Project;
  pageNumber: number;
  onInspect: (project: Project) => void;
}

function RightPage({ project, pageNumber, onInspect }: RightPageProps) {
  const dossier = projectDossiers[project.id] ?? {
    flowTitle: "",
    nodes: [{ title: "", sub: "" }, { title: "", sub: "" }, { title: "", sub: "" }],
    connectors: ["", ""],
    invariant: "",
    fieldNoteLeft: "",
    fieldNoteRight: "✎ Technical result: Verified implementation.",
    tradeOff: "Optimized for high-throughput reliability.",
  };

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between select-none"
      style={{
        background: "linear-gradient(135deg, #fcfaf6 0%, #f6f1e6 100%)",
        padding: "1.75rem 2rem 1.5rem 2.25rem",
        borderLeft: "1px solid #e5dcce",
        boxShadow: "inset 10px 0 18px -8px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Spine Gutter Shadow on left edge */}
      <div
        className="pointer-events-none absolute top-0 left-0 bottom-0 w-8 z-20"
        style={{
          background: "linear-gradient(to right, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0))",
        }}
      />

      {/* Top Folio Header */}
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[#e2d8c3] text-[0.625rem] font-mono tracking-wider text-[#78716c]">
          <span className="uppercase font-semibold text-[#0f766e]">
            SYSTEM BLUEPRINT &amp; AUDIT TRAIL
          </span>
          <span className="font-bold text-[#1c1917]">P. 0{pageNumber}</span>
        </div>

        {/* Section 1: The Architectural Challenge (Natural wrap, no line-clamp!) */}
        <div className="mt-3">
          <span className="block font-mono text-[0.5625rem] uppercase tracking-wider text-[#78716c] font-bold mb-1">
            01 // The Architectural Challenge
          </span>
          <p className="text-[0.8125rem] leading-relaxed text-[#292524]">
            {project.problem}
          </p>
        </div>

        {/* Section 2: Implemented Architecture (Natural wrap, no line-clamp!) */}
        <div className="mt-3">
          <span className="block font-mono text-[0.5625rem] uppercase tracking-wider text-[#047857] font-bold mb-1">
            02 // Implemented Architecture &amp; Decisions
          </span>
          <p className="text-[0.8125rem] leading-relaxed text-[#292524]">
            {project.architecture}
          </p>
          <div className="mt-1.5 text-[0.6875rem] font-mono text-[#44403c] bg-[#f4eee1] p-2 rounded border border-[#ded5bf]">
            <span className="font-bold text-[#1c1917]">Trade-off Analysis: </span>
            <span>{dossier.tradeOff}</span>
          </div>
        </div>

        {/* Section 3: Verifiable Outcome (Natural wrap, no line-clamp!) */}
        {project.outcome && (
          <div className="mt-3">
            <span className="block font-mono text-[0.5625rem] uppercase tracking-wider text-[#0f766e] font-bold mb-1">
              03 // Verifiable Production Outcome
            </span>
            <p className="text-[0.8125rem] leading-relaxed text-[#292524]">
              {project.outcome}
            </p>
          </div>
        )}

        {/* Handwritten Margin Observation Right */}
        <div className="mt-2.5 flex items-start gap-1 text-[0.625rem] font-mono italic text-[#b45309] bg-[#fffbeb] px-2 py-1 rounded border-l-2 border-[#f59e0b]">
          <span>{dossier.fieldNoteRight}</span>
        </div>
      </div>

      {/* Footer Area: Verification Seal & Action */}
      <div className="mt-auto pt-2.5 border-t border-[#e2d8c3] flex items-center justify-between gap-3">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.2rem 0.55rem",
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            borderRadius: "0.25rem",
            color: "#047857",
            fontFamily: "var(--font-mono)",
            fontSize: "0.5625rem",
            fontWeight: 700,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>VERIFIED ARCHITECTURE</span>
        </div>

        <button
          onClick={() => onInspect(project)}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded text-[0.6875rem] font-mono font-bold text-[#1c1917] bg-[#ede5d4] hover:bg-[#047857] hover:text-white border border-[#ded5bf] hover:border-[#047857] transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-[#047857]"
        >
          <span>Inspect Case Study</span>
          <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
        </button>
      </div>
    </div>
  );
}

// ─── FRONT COVER (RECTO): CLOSED HARDCOVER NOTEBOOK ────────────────
interface FrontCoverProps {
  onOpenClick?: () => void;
}

function FrontCover({ onOpenClick }: FrontCoverProps) {
  return (
    <div
      className="relative w-full h-full select-none rounded-r-lg overflow-hidden flex flex-col justify-between"
      style={{
        background: "radial-gradient(circle at 45% 35%, #27272a 0%, #18181b 75%, #09090b 100%)",
        padding: "2.5rem 2.25rem 2.25rem 2.5rem",
        boxShadow:
          "inset -8px 0 20px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.12)",
      }}
    >
      {/* Decorative Embossed Gold Foil Border */}
      <div
        className="pointer-events-none absolute inset-2.5 rounded-md border border-[#d97706]/35"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(217, 119, 6, 0.12)",
        }}
      />

      {/* Left Spine Leather Strip Overlay with Stitch Rivets */}
      <div
        className="pointer-events-none absolute top-0 left-0 bottom-0 w-6 flex flex-col justify-between py-6 items-center"
        style={{
          background: "linear-gradient(to right, #09090b 0%, #18181b 70%, rgba(24, 24, 27, 0) 100%)",
          borderRight: "1px solid rgba(217, 119, 6, 0.15)",
        }}
      >
        <span className="w-1 h-2.5 rounded-full bg-[#d97706]/70 shadow-sm" />
        <span className="w-1 h-2.5 rounded-full bg-[#d97706]/70 shadow-sm" />
        <span className="w-1 h-2.5 rounded-full bg-[#d97706]/70 shadow-sm" />
        <span className="w-1 h-2.5 rounded-full bg-[#d97706]/70 shadow-sm" />
      </div>

      {/* Top Foil Insignia */}
      <div className="relative z-10 pl-3">
        <div className="flex items-center justify-between text-[0.625rem] font-mono tracking-widest text-[#d97706]">
          <span className="font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] inline-block shadow-[0_0_6px_#d97706]" />
            VOL. 04 // ENGINEERING ARCHIVE
          </span>
          <span className="text-[#a8a29e] tracking-wider text-[0.5625rem]">
            TECHNICAL RECORD
          </span>
        </div>
        <div className="w-10 h-0.5 bg-[#d97706]/40 mt-1.5" />
      </div>

      {/* Center Title & Monograph Identity */}
      <div className="relative z-10 pl-3 my-auto">
        <span className="block font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#a8a29e] mb-1 font-semibold">
          Selected Engineering Works
        </span>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 2.1vw, 1.85rem)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            color: "#f5f5f4",
            lineHeight: 1.2,
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          THE ENGINEERING MONOGRAPH
        </h1>

        {/* Technical Diamond Separator */}
        <div className="flex items-center gap-2.5 my-3">
          <div className="h-px flex-1 bg-gradient-to-r from-[#d97706]/40 to-transparent" />
          <span className="text-[#d97706] text-[0.625rem]">◈</span>
          <div className="h-px flex-1 bg-gradient-to-l from-[#d97706]/40 to-transparent" />
        </div>

        {/* Subtitle */}
        <p
          className="text-[0.8125rem] leading-relaxed text-[#a8a29e] italic max-w-sm"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          &ldquo;A record of systems, decisions, and the engineering behind them.&rdquo;
        </p>

        {/* Author Signature Line */}
        <div className="mt-4 pt-2.5 border-t border-white/10">
          <span className="block font-mono text-[0.75rem] font-bold text-[#f59e0b] tracking-wider">
            MD. SHAKIR AHMED
          </span>
          <span className="block font-mono text-[0.5625rem] text-[#78716c] mt-0.5">
            Software Engineer • Systems &amp; Backend Architecture
          </span>
          <span className="block font-mono text-[0.5rem] text-[#52525b] mt-0.5">
            Varendra University • Business Automation Limited
          </span>
        </div>
      </div>

      {/* Bottom Insignia & Scroll Hint */}
      <div className="relative z-10 pl-3 pt-3 border-t border-white/10 flex items-center justify-between text-[0.5625rem] font-mono text-[#78716c]">
        <div>
          <span className="block text-[#a8a29e] font-semibold">
            7 PRODUCTION CASE STUDIES
          </span>
          <span className="text-[#52525b]">BTRC • WENP • EBS • QUEUEPRO • CRICGEO • IDENTICORE • ML</span>
        </div>

        <button
          onClick={onOpenClick}
          className="flex items-center gap-1 text-[#d97706] hover:text-[#f59e0b] cursor-pointer transition-colors focus-visible:ring-1 focus-visible:ring-[#d97706]"
        >
          <span>Scroll to open</span>
          <span className="animate-bounce">↓</span>
        </button>
      </div>

      {/* Hanging Emerald Bookmark Ribbon */}
      <div
        className="pointer-events-none absolute -bottom-2.5 right-10 w-3.5 h-6 bg-emerald-700 shadow-sm"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)",
        }}
      />
    </div>
  );
}

// ─── MAIN BOOK EXPERIENCE COMPONENT ────────────────────────────────
export default function ProjectReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookSpreadRef = useRef<HTMLDivElement>(null);
  const coverLeafRef = useRef<HTMLDivElement>(null);
  const pageLeavesRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

  const [activeChapter, setActiveChapter] = useState(0); // 0 = Closed Book, 1..7 = Chapters 1..7
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isBookOpen, setIsBookOpen] = useState(false);

  // Chapters: projects length (7)
  const totalChapters = projects.length;

  // Function to smoothly navigate to a specific chapter/state
  const goToState = useCallback((targetChapter: number) => {
    if (!scrollTriggerInstance.current) return;
    const st = scrollTriggerInstance.current;
    const scrollRange = st.end - st.start;

    const coverTurnDuration = 1.2;
    const coverPause = 0.5;
    const pageTurnDuration = 1.0;
    const pagePause = 0.4;
    const finalHoldDuration = 1.4;
    const totalT = coverTurnDuration + coverPause + (totalChapters - 1) * (pageTurnDuration + pagePause) + finalHoldDuration;

    let targetTime = 0;
    if (targetChapter === 0) {
      targetTime = 0; // Closed Cover
    } else if (targetChapter === 1) {
      targetTime = coverTurnDuration + coverPause / 2; // Chapter 1 Open
    } else {
      const pageIndex = targetChapter - 2; // 0 for Ch2, 1 for Ch3...
      targetTime = coverTurnDuration + coverPause + pageIndex * (pageTurnDuration + pagePause) + pageTurnDuration + pagePause / 2;
    }

    const targetProgress = Math.min(1, Math.max(0, targetTime / totalT));
    const targetY = st.start + targetProgress * scrollRange;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, [totalChapters]);

  // Set up GSAP 3D Scroll-Driven Book Page Turning on Desktop
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mql = window.matchMedia("(min-width: 1024px)");
    if (!mql.matches || !containerRef.current || !coverLeafRef.current || !bookSpreadRef.current) return;

    const coverLeaf = coverLeafRef.current;
    const spreadContainer = bookSpreadRef.current;

    const coverTurnDuration = 1.2;
    const coverPause = 0.5;
    const pageTurnDuration = 1.0;
    const pagePause = 0.4;
    const finalHoldDuration = 1.4;

    const totalTimelineDuration =
      coverTurnDuration +
      coverPause +
      (totalChapters - 1) * (pageTurnDuration + pagePause) +
      finalHoldDuration;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.7,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        end: () => "+=" + (800 + (totalChapters - 1) * 550 + 900),
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress < 0.08) {
            setActiveChapter(0); // Closed Book
            setIsBookOpen(false);
          } else {
            setIsBookOpen(true);
            const normalizedP = (progress - 0.08) / 0.92;
            const chIdx = Math.min(
              totalChapters,
              Math.max(1, Math.floor(normalizedP * totalChapters) + 1)
            );
            setActiveChapter(chIdx);
          }
        },
      },
    });

    scrollTriggerInstance.current = tl.scrollTrigger ?? null;

    // ─────────────────────────────────────────────────────────────
    // 1. STATE A -> STATE B -> STATE C: COVER OPENING SEQUENCE
    // ─────────────────────────────────────────────────────────────
    gsap.set(spreadContainer, { xPercent: -25 });

    gsap.set(coverLeaf, {
      rotateY: 0,
      zIndex: 50,
      transformOrigin: "left center",
      transformStyle: "preserve-3d",
    });

    tl.to(
      spreadContainer,
      {
        xPercent: 0,
        ease: "power2.inOut",
        duration: coverTurnDuration,
      },
      0
    );

    tl.to(
      coverLeaf,
      {
        rotateY: -180,
        ease: "power2.inOut",
        duration: coverTurnDuration,
      },
      0
    );

    tl.set(coverLeaf, { zIndex: 65 }, 0);
    tl.set(coverLeaf, { zIndex: 25 }, coverTurnDuration * 0.5);

    const coverFrontShadow = coverLeaf.querySelector<HTMLElement>(".cover-shadow-front");
    const coverBackShadow = coverLeaf.querySelector<HTMLElement>(".cover-shadow-back");

    if (coverFrontShadow) {
      tl.fromTo(
        coverFrontShadow,
        { opacity: 0 },
        { opacity: 0.4, ease: "power1.in", duration: coverTurnDuration * 0.5 },
        0
      );
      tl.to(coverFrontShadow, { opacity: 0, duration: 0.01 }, coverTurnDuration * 0.5);
    }

    if (coverBackShadow) {
      tl.fromTo(
        coverBackShadow,
        { opacity: 0.4 },
        { opacity: 0, ease: "power1.out", duration: coverTurnDuration * 0.5 },
        coverTurnDuration * 0.5
      );
    }

    // ─────────────────────────────────────────────────────────────
    // 2. STATE D: CHAPTER-BY-CHAPTER PAGE TURNING (LEAVES 1 TO 6)
    // ─────────────────────────────────────────────────────────────
    pageLeavesRefs.current.forEach((leafEl, i) => {
      if (!leafEl) return;

      const leafStartTime =
        coverTurnDuration + coverPause + i * (pageTurnDuration + pagePause);

      gsap.set(leafEl, {
        rotateY: 0,
        zIndex: 40 - i,
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
      });

      tl.to(
        leafEl,
        {
          rotateY: -180,
          ease: "power2.inOut",
          duration: pageTurnDuration,
        },
        leafStartTime
      );

      tl.set(leafEl, { zIndex: 60 }, leafStartTime);
      tl.set(leafEl, { zIndex: 26 + i }, leafStartTime + pageTurnDuration * 0.5);

      const pageFrontShadow = leafEl.querySelector<HTMLElement>(".page-shadow-front");
      const pageBackShadow = leafEl.querySelector<HTMLElement>(".page-shadow-back");

      if (pageFrontShadow) {
        tl.fromTo(
          pageFrontShadow,
          { opacity: 0 },
          { opacity: 0.35, ease: "power1.in", duration: pageTurnDuration * 0.5 },
          leafStartTime
        );
        tl.to(pageFrontShadow, { opacity: 0, duration: 0.01 }, leafStartTime + pageTurnDuration * 0.5);
      }

      if (pageBackShadow) {
        tl.fromTo(
          pageBackShadow,
          { opacity: 0.35 },
          { opacity: 0, ease: "power1.out", duration: pageTurnDuration * 0.5 },
          leafStartTime + pageTurnDuration * 0.5
        );
      }
    });

    // ─────────────────────────────────────────────────────────────
    // 3. STATE E: FINAL CHAPTER HOLD (CHAPTER 07) & SMOOTH RELEASE
    // ─────────────────────────────────────────────────────────────
    const finalStartTime =
      coverTurnDuration +
      coverPause +
      (totalChapters - 1) * (pageTurnDuration + pagePause);

    tl.to({}, { duration: finalHoldDuration }, finalStartTime);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      tl.scrollTrigger?.kill();
      tl.kill();
      scrollTriggerInstance.current = null;
    };
  }, [totalChapters]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;

      if (e.key === "ArrowRight" || e.key === "PageDown") {
        if (activeChapter < totalChapters) {
          e.preventDefault();
          goToState(activeChapter + 1);
        }
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (activeChapter > 0) {
          e.preventDefault();
          goToState(activeChapter - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeChapter, totalChapters, goToState]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-6 px-4 md:px-8 bg-white overflow-hidden flex flex-col items-center justify-center min-h-[94vh]"
    >
      {/* ─── CASE STUDY MODAL ────────────────────────────────────── */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* ─── TOP DIRECT CHAPTER NAVIGATION RIBBON ────────────────── */}
      <div className="w-full max-w-5xl mx-auto mb-3.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs font-bold text-[#047857] uppercase tracking-widest">
            The Engineering Monograph
          </span>
          <span className="text-[0.6875rem] font-mono text-[#a8a29e] hidden sm:inline">
            • Archival Engineering Volume 04
          </span>
        </div>

        {/* Primary Direct Chapter Navigation Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 md:pb-0 scrollbar-none">
          <button
            onClick={() => goToState(0)}
            className={`px-2.5 py-1 rounded font-mono text-[0.625rem] font-bold uppercase transition-all cursor-pointer whitespace-nowrap border ${
              activeChapter === 0
                ? "bg-[#18181b] text-amber-400 border-amber-500/50 shadow-sm"
                : "bg-[#f5f1e6] text-[#57534e] border-[#ded5bf] hover:bg-[#ede5d0]"
            }`}
          >
            Cover
          </button>

          {projects.map((p, idx) => {
            const chNum = idx + 1;
            const isActive = activeChapter === chNum;
            return (
              <button
                key={p.id}
                onClick={() => goToState(chNum)}
                className={`px-2.5 py-1 rounded font-mono text-[0.625rem] font-bold uppercase transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? "bg-[#047857] text-white border-[#047857] shadow-sm"
                    : "bg-[#f5f1e6] text-[#57534e] border-[#ded5bf] hover:bg-[#ede5d0]"
                }`}
                title={p.name}
              >
                0{chNum} {p.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── DESKTOP 3D HARDCOVER NOTEBOOK SPREAD (min-width: 1024px) ─── */}
      <div className="hidden lg:flex justify-center items-center w-full max-w-5xl">
        {/* Desk Surface & Book Casing with Soft, Refined Ambient Shadow */}
        <div
          ref={bookSpreadRef}
          className="relative w-full rounded-xl p-2 bg-[#1c1917]"
          style={{
            boxShadow:
              "0 14px 30px -8px rgba(15, 23, 42, 0.15), 0 2px 8px -2px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(28, 25, 23, 0.06)",
            willChange: "transform",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* Deckle Page Stack Edges */}
          <div
            className="relative w-full rounded-lg overflow-visible"
            style={{
              height: "clamp(490px, 64vh, 560px)",
              perspective: "2200px",
              perspectiveOrigin: "center center",
              boxShadow: isBookOpen
                ? "-2px 0 0 #ece4d2, -4px 0 0 #dfd6c2, 2px 0 0 #ece4d2, 4px 0 0 #dfd6c2, 0 2px 0 #ded5bf"
                : "2px 0 0 #ece4d2, 4px 0 0 #dfd6c2, 6px 0 0 #d4cab4, 0 2px 0 #ded5bf",
            }}
          >
            {/* ─── BASE LEFT PAGE (UNDERNEATH ALL LEFT LEAVES) ──── */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full rounded-l-md overflow-hidden bg-[#f4efe4] border-r border-[#ded5bf]"
              style={{ zIndex: 1 }}
            >
              <div className="w-full h-full p-6 flex flex-col justify-between text-[#78716c] font-mono select-none">
                <div className="pb-2 border-b border-[#ded5bf] text-[0.6rem] flex justify-between">
                  <span>EX LIBRIS // TECHNICAL ENDPAPERS</span>
                  <span>MD. SHAKIR AHMED</span>
                </div>
                <div className="my-auto space-y-2 opacity-85">
                  <span className="block text-xs font-bold text-[#1c1917] tracking-widest uppercase">
                    The Engineering Monograph
                  </span>
                  <p className="text-[0.75rem] leading-relaxed text-[#44403c]">
                    Architectural documentation covering distributed transaction management, zero-trust SSO topology, high-throughput microservices, and applied predictive machine learning.
                  </p>
                  <div className="pt-1.5 text-[0.625rem] text-[#047857] font-semibold">
                    ✔ 7 Production Platforms Audited &amp; Documented
                  </div>
                </div>
                <div className="pt-2 border-t border-[#ded5bf] text-[0.55rem] flex justify-between text-[#a8a29e]">
                  <span>ARCHIVAL BINDING VOL. 04</span>
                  <span>VERIFIED CODE REPOSITORY</span>
                </div>
              </div>
            </div>

            {/* ─── BASE RIGHT PAGE (UNDERNEATH ALL RIGHT LEAVES) ─── */}
            <div
              className="absolute top-0 left-1/2 w-1/2 h-full rounded-r-md overflow-hidden"
              style={{ zIndex: 1 }}
            >
              <RightPage
                project={projects[projects.length - 1]}
                pageNumber={projects.length * 2}
                onInspect={setSelectedProject}
              />
            </div>

            {/* ─── LEAF 0: THE FRONT COVER (Hardcover Front / Ch 1 Left Back) ─── */}
            <div
              ref={coverLeafRef}
              className="absolute top-0 left-1/2 w-1/2 h-full select-none"
              style={{
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                zIndex: 50,
                willChange: "transform",
              }}
            >
              {/* FRONT FACE (Recto): Hardcover Front Cover */}
              <div
                className="absolute inset-0 rounded-r-md overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
              >
                <FrontCover onOpenClick={() => goToState(1)} />
                <div
                  className="cover-shadow-front pointer-events-none absolute inset-0 opacity-0"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.08) 60%, rgba(255,255,255,0.18) 100%)",
                  }}
                />
              </div>

              {/* BACK FACE (Verso): Chapter 01 (BTRC LIMS) Left Page */}
              <div
                className="absolute inset-0 rounded-l-md overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <LeftPage
                  project={projects[0]}
                  pageNumber={1}
                  chapterIndex={0}
                />
                <div
                  className="cover-shadow-back pointer-events-none absolute inset-0 opacity-0"
                  style={{
                    background:
                      "linear-gradient(to left, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.06) 50%, rgba(255,255,255,0.18) 100%)",
                  }}
                />
              </div>
            </div>

            {/* ─── LEAVES 1 TO 6: INTERIOR CHAPTER TURNING SHEETS ───────── */}
            {Array.from({ length: totalChapters - 1 }).map((_, i) => {
              const frontProject = projects[i];
              const backProject = projects[i + 1];

              return (
                <div
                  key={`page-leaf-${i}`}
                  ref={(el) => {
                    pageLeavesRefs.current[i] = el;
                  }}
                  className="absolute top-0 left-1/2 w-1/2 h-full select-none"
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    zIndex: 40 - i,
                    willChange: "transform",
                  }}
                >
                  {/* FRONT FACE (Recto): Chapter (i+1) Right Page */}
                  <div
                    className="absolute inset-0 rounded-r-md overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(0deg)",
                    }}
                  >
                    <RightPage
                      project={frontProject}
                      pageNumber={2 * (i + 1)}
                      onInspect={setSelectedProject}
                    />
                    <div
                      className="page-shadow-front pointer-events-none absolute inset-0 opacity-0"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.06) 50%, rgba(255,255,255,0.2) 80%, rgba(0,0,0,0.12) 100%)",
                      }}
                    />
                  </div>

                  {/* BACK FACE (Verso): Chapter (i+2) Left Page */}
                  <div
                    className="absolute inset-0 rounded-l-md overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <LeftPage
                      project={backProject}
                      pageNumber={2 * (i + 1) + 1}
                      chapterIndex={i + 1}
                    />
                    <div
                      className="page-shadow-back pointer-events-none absolute inset-0 opacity-0"
                      style={{
                        background:
                          "linear-gradient(to left, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.06) 50%, rgba(255,255,255,0.2) 80%, rgba(0,0,0,0.12) 100%)",
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {/* ─── PHYSICAL CENTER SPINDLE / BINDING SEAM ──────── */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 z-50 flex flex-col justify-between py-6 items-center"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.15), rgba(0,0,0,0.01) 45%, rgba(0,0,0,0.01) 55%, rgba(0,0,0,0.15))",
                borderLeft: "1px solid rgba(0,0,0,0.08)",
                borderRight: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <span className="w-1 h-2 rounded-full bg-[#b45309] opacity-75 shadow-sm" />
              <span className="w-1 h-2 rounded-full bg-[#b45309] opacity-75 shadow-sm" />
              <span className="w-1 h-2 rounded-full bg-[#b45309] opacity-75 shadow-sm" />
              <span className="w-1 h-2 rounded-full bg-[#b45309] opacity-75 shadow-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE & TABLET VIEW (< 1024px) ─────────────────────── */}
      <div className="flex lg:hidden flex-col w-full max-w-xl mx-auto gap-3.5">
        <div
          className="relative rounded-2xl bg-[#1c1917] p-2 shadow-xl"
          style={{
            boxShadow: "0 14px 30px -8px rgba(0, 0, 0, 0.25)",
          }}
        >
          {activeChapter === 0 ? (
            <div className="h-[460px]">
              <FrontCover onOpenClick={() => goToState(1)} />
            </div>
          ) : (
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #fcfaf6 0%, #f6f1e6 100%)",
                padding: "1.5rem 1.25rem",
                border: "1px solid #e7dfcc",
              }}
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#e5decb] text-xs font-mono text-[#78716c]">
                <span className="flex items-center gap-1.5 font-bold text-[#047857]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  CHAPTER 0{activeChapter} OF 0{totalChapters}
                </span>
                <span className="font-bold text-[#1c1917]">
                  {projects[activeChapter - 1].category.toUpperCase()}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2.5">
                {projects[activeChapter - 1].logo && (
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#ded5bf] bg-white flex-shrink-0 p-1">
                    <Image
                      src={getAssetPath(projects[activeChapter - 1].logo!)}
                      alt={`${projects[activeChapter - 1].shortName} Logo`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <div>
                  <span className="font-mono text-[0.5625rem] text-[#047857] font-bold px-2 py-0.5 rounded-full bg-[#ecfdf5] border border-[#a7f3d0]">
                    SPECIFICATION 0{activeChapter}
                  </span>
                  <h3 className="text-sm font-bold text-[#1c1917] mt-0.5 leading-snug">
                    {projects[activeChapter - 1].name}
                  </h3>
                </div>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-[#292524]">
                {projects[activeChapter - 1].summary}
              </p>

              <div className="flex flex-wrap gap-1 mt-2.5">
                {projects[activeChapter - 1].technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.5625rem] font-semibold px-1.5 py-0.5 rounded bg-[#f0e9d7] text-[#1c1917] border border-[#ded5bf]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-[#e5decb] space-y-2.5">
                <div>
                  <span className="block font-mono text-[0.5625rem] font-bold text-[#78716c] uppercase">
                    01 // Architectural Challenge
                  </span>
                  <p className="text-xs text-[#292524] mt-0.5 leading-relaxed">
                    {projects[activeChapter - 1].problem}
                  </p>
                </div>

                <div>
                  <span className="block font-mono text-[0.5625rem] font-bold text-[#047857] uppercase">
                    02 // Implemented Architecture
                  </span>
                  <p className="text-xs text-[#292524] mt-0.5 leading-relaxed">
                    {projects[activeChapter - 1].architecture}
                  </p>
                </div>

                {projects[activeChapter - 1].outcome && (
                  <div>
                    <span className="block font-mono text-[0.5625rem] font-bold text-[#0f766e] uppercase">
                      03 // Verifiable Outcome
                    </span>
                    <p className="text-xs text-[#292524] mt-0.5 leading-relaxed">
                      {projects[activeChapter - 1].outcome}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#e5decb] flex items-center justify-between">
                <span className="font-mono text-[0.5625rem] text-[#047857] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  VERIFIED ARCHITECTURE
                </span>

                <button
                  onClick={() => setSelectedProject(projects[activeChapter - 1])}
                  className="px-3 py-1.5 rounded text-xs font-mono font-bold bg-[#047857] text-white hover:bg-[#065f46] transition-colors focus-visible:ring-2 focus-visible:ring-[#047857]"
                >
                  Inspect Case Study ↗
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-2 text-xs font-mono font-bold text-[#78716c]">
          <button
            onClick={() => goToState(Math.max(0, activeChapter - 1))}
            disabled={activeChapter === 0}
            className={`min-h-[38px] px-3 py-1.5 rounded-lg border border-[#ded5bf] bg-[#fdfbf7] hover:bg-[#ede5d0] transition-colors focus-visible:ring-2 focus-visible:ring-[#047857] ${
              activeChapter === 0 ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            ← {activeChapter === 1 ? "Close Cover" : "Previous"}
          </button>

          <span className="text-center">
            {activeChapter === 0 ? "Closed Cover" : `Ch 0${activeChapter} / 0${totalChapters}`}
          </span>

          <button
            onClick={() => goToState(Math.min(totalChapters, activeChapter + 1))}
            disabled={activeChapter === totalChapters}
            className={`min-h-[38px] px-3 py-1.5 rounded-lg border border-[#ded5bf] bg-[#fdfbf7] hover:bg-[#ede5d0] transition-colors focus-visible:ring-2 focus-visible:ring-[#047857] ${
              activeChapter === totalChapters ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {activeChapter === 0 ? "Open Monograph →" : "Next →"}
          </button>
        </div>
      </div>

      {/* ─── SIMPLIFIED SINGLE BOTTOM NAVIGATION ROW ───────────────── */}
      <div className="hidden lg:flex w-full max-w-5xl mx-auto mt-5 z-30 relative items-center justify-between gap-4 select-none">
        {/* Left: Previous Chapter */}
        <button
          onClick={() => goToState(Math.max(0, activeChapter - 1))}
          disabled={activeChapter === 0}
          className={`flex items-center gap-2 h-9 px-3.5 rounded-lg border font-mono text-xs font-bold transition-all ${
            activeChapter === 0
              ? "opacity-30 cursor-not-allowed border-[#e5decb] bg-[#fbf9f4] text-[#a8a29e]"
              : "cursor-pointer border-[#ded5bf] bg-[#fdfbf7] hover:bg-[#ede5d0] text-[#1c1917] shadow-sm hover:border-[#047857]/40 focus-visible:ring-2 focus-visible:ring-[#047857]"
          }`}
          aria-label={activeChapter === 1 ? "Close Cover" : "Previous Chapter"}
        >
          <span className="text-sm">◂</span>
          <span>{activeChapter === 1 ? "Close Cover" : "Previous Chapter"}</span>
        </button>

        {/* Center: Clean Active Chapter Status with Subtle Progress Line */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-[0.8125rem]">
            <span className="font-mono text-[0.6875rem] font-bold text-[#047857] uppercase tracking-wider">
              {activeChapter === 0
                ? "HARDCOVER"
                : `CH 0${activeChapter}`}
            </span>
            <span className="text-[#a8a29e]">•</span>
            <span className="font-display font-extrabold text-[#1c1917] tracking-tight">
              {activeChapter === 0
                ? "The Engineering Monograph"
                : projects[activeChapter - 1]?.name}
            </span>
          </div>

          {/* Clean Subtle Progress Line */}
          <div className="w-36 h-1 rounded-full bg-[#e5decb] overflow-hidden mt-1.5">
            <div
              className="h-full bg-[#047857] rounded-full transition-all duration-300"
              style={{
                width: `${activeChapter === 0 ? 0 : (activeChapter / totalChapters) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Right: Next Chapter */}
        <button
          onClick={() => goToState(Math.min(totalChapters, activeChapter + 1))}
          disabled={activeChapter === totalChapters}
          className={`flex items-center gap-2 h-9 px-3.5 rounded-lg border font-mono text-xs font-bold transition-all ${
            activeChapter === totalChapters
              ? "opacity-30 cursor-not-allowed border-[#e5decb] bg-[#fbf9f4] text-[#a8a29e]"
              : "cursor-pointer border-[#ded5bf] bg-[#fdfbf7] hover:bg-[#ede5d0] text-[#1c1917] shadow-sm hover:border-[#047857]/40 focus-visible:ring-2 focus-visible:ring-[#047857]"
          }`}
          aria-label={activeChapter === 0 ? "Open Monograph" : "Next Chapter"}
        >
          <span>{activeChapter === 0 ? "Open Monograph" : "Next Chapter"}</span>
          <span className="text-sm">▸</span>
        </button>
      </div>
    </div>
  );
}
