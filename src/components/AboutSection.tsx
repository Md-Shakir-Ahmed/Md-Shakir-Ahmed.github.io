"use client";

import { useRef } from "react";
import { useScrollReveal, useStaggerReveal, useTextReveal } from "@/lib/animations";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  // All animation hooks now have internal safety fallbacks
  useScrollReveal(chipRef, { delay: 0, y: 20 });
  useTextReveal(headlineRef, { triggerOnScroll: true, stagger: 0.06 });
  useScrollReveal(narrativeRef, { delay: 0.1, y: 30 });
  useScrollReveal(focusRef, { delay: 0.15, y: 30 });
  useStaggerReveal(pillarsRef, ".pillar-item", { stagger: 0.1 });

  const pillars = [
    {
      num: "01",
      code: "RESILIENCE",
      title: "Fault-Tolerant APIs & Services",
      desc: "Architecting idempotent endpoints, strict validation pipelines, and comprehensive error handling that keep business systems reliable under volatile conditions.",
    },
    {
      num: "02",
      code: "DATA_INTEGRITY",
      title: "Relational Modeling & Query Tuning",
      desc: "Designing normalized schemas, managing ACID transactions, and optimizing complex query execution plans across millions of records with MySQL and PostgreSQL.",
    },
    {
      num: "03",
      code: "ZERO_TRUST",
      title: "Identity, SSO & Token Topology",
      desc: "Integrating centralized identity with Keycloak, OAuth 2.0 / OIDC, and cryptographic JWT verification to enforce seamless access delegation across services.",
    },
    {
      num: "04",
      code: "MODULARITY",
      title: "Microservices & Clean Architecture",
      desc: "Decoupling monolithic business logic into isolated, domain-driven services communicating via structured REST protocols and asynchronous event queues.",
    },
  ];

  const focusAreas = [
    "High-Throughput RESTful APIs",
    "Relational Schema Optimization",
    "Keycloak & OAuth 2.0 / OIDC SSO",
    "Distributed Microservice Topologies",
    "Applied Machine Learning Pipelines",
  ];

  return (
    <div ref={sectionRef} className="w-full" style={{ background: "#ffffff", color: "#0f172a" }}>
      {/* Section Stage Label */}
      <div
        ref={chipRef}
        className="flex items-center gap-3 mb-8"
        style={{ opacity: 0 }}
      >
        <span
          className="font-semibold tracking-wider"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#059669" }}
        >
          02
        </span>
        <div className="w-8 h-px bg-slate-300" />
        <span
          className="tracking-widest uppercase"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "#64748b" }}
        >
          Engineering Identity
        </span>
      </div>

      {/* Section Headline */}
      <h2
        ref={headlineRef}
        className="mb-10 max-w-4xl"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.25rem, 5vw, 4rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          perspective: "600px",
          color: "#0f172a",
        }}
      >
        <span className="word inline-block" style={{ opacity: 0, color: "#0f172a" }}>Building</span>{" "}
        <span className="word inline-block" style={{ opacity: 0, color: "#0f172a" }}>the</span>{" "}
        <span className="word inline-block" style={{ opacity: 0, color: "#0f172a" }}>invisible</span>{" "}
        <span className="word inline-block" style={{ opacity: 0, color: "#0f172a" }}>systems</span>{" "}
        <span className="word inline-block" style={{ opacity: 0, color: "#0f172a" }}>that</span>{" "}
        <span
          className="word inline-block"
          style={{
            opacity: 0,
            background: "linear-gradient(135deg, #059669, #10b981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          power&nbsp;digital&nbsp;products.
        </span>
      </h2>

      {/* ─── Split Layout: Story + Focus Areas ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
        {/* Left: Personal Story (scannable paragraphs) */}
        <div
          ref={narrativeRef}
          className="lg:col-span-7 space-y-5 text-base sm:text-lg leading-relaxed"
          style={{ opacity: 0, color: "#334155" }}
        >
          <p style={{ color: "#0f172a", fontWeight: 500, fontSize: "1.125rem", lineHeight: 1.7 }}>
            I am a <strong style={{ color: "#0f172a", fontWeight: 700 }}>Backend-focused Software Engineer</strong> with a
            systems-first mindset — designing the backbone of modern web
            applications.
          </p>

          <p style={{ color: "#334155", lineHeight: 1.75 }}>
            With over <strong style={{ color: "#0f172a", fontWeight: 600 }}>4+ years</strong> of
            hands-on software engineering experience, I currently serve as Software Engineer at{" "}
            <strong style={{ color: "#0f172a", fontWeight: 600 }}>Varendra University</strong>.
            Previously at{" "}
            <strong style={{ color: "#0f172a", fontWeight: 600 }}>Business Automation Limited</strong>,
            architecting mission-critical government regulatory portals (BTRC LIMS, BRCP WENP) and
            high-throughput enterprise systems (EBS, QueuePro).
          </p>

          <p style={{ color: "#334155", lineHeight: 1.75 }}>
            My engineering philosophy is rooted in algorithmic rigor — over 300+
            problems solved on Codeforces, URI, and UVa. I treat code as state
            machines that must guarantee correctness and data integrity.
          </p>
        </div>

        {/* Right: Focus Areas List */}
        <div
          ref={focusRef}
          className="lg:col-span-5 lg:pl-4"
          style={{ opacity: 0 }}
        >
          <span
            className="uppercase tracking-widest mb-5 block font-semibold"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "#059669" }}
          >
            Core Focus Areas
          </span>

          <div className="space-y-3">
            {focusAreas.map((area, index) => (
              <div
                key={area}
                className="flex items-center gap-3 py-3 border-b border-slate-200 group hover:border-emerald-500 transition-all duration-300 cursor-default"
              >
                <span
                  className="transition-colors shrink-0"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "#64748b" }}
                >
                  0{index + 1}
                </span>
                <span
                  className="text-sm transition-colors group-hover:text-slate-900"
                  style={{ color: "#1e293b" }}
                >
                  {area}
                </span>
                <span className="ml-auto w-0 h-px bg-emerald-500 group-hover:w-6 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Architectural Pillars ─── */}
      <div
        ref={pillarsRef}
        className="pt-16 border-t border-slate-200"
        style={{ marginTop: "4rem" }}
      >
        <div className="flex items-center justify-between mb-10">
          <h3
            className="uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "#64748b" }}
          >
            Core Architectural Pillars
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.code}
              className="pillar-item relative flex flex-col items-start group cursor-default p-6 rounded-2xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all duration-500"
              style={{ opacity: 0 }}
            >
              {/* Number & Code */}
              <div className="flex items-center gap-3 mb-2.5">
                <span
                  className="font-bold transition-colors duration-500"
                  style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#cbd5e1" }}
                >
                  {pillar.num}
                </span>
                <span
                  className="tracking-widest uppercase font-semibold"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "#059669" }}
                >
                  {pillar.code}
                </span>
              </div>

              <h4
                className="text-lg sm:text-xl font-medium mb-2"
                style={{ fontFamily: "var(--font-display)", color: "#0f172a" }}
              >
                {pillar.title}
              </h4>

              <p style={{ fontSize: "0.875rem", color: "#334155", lineHeight: 1.65 }}>
                {pillar.desc}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-emerald-500 to-transparent group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
