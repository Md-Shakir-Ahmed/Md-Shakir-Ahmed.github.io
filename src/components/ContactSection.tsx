"use client";

import { useState, useRef } from "react";
import { social } from "@/data/portfolio";
import { getAssetPath } from "@/lib/assets";
import { useScrollReveal, useTextReveal } from "@/lib/animations";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const chipRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useScrollReveal(chipRef, { y: 20 });
  useTextReveal(headlineRef, { triggerOnScroll: true, stagger: 0.06 });
  useScrollReveal(leftRef, { delay: 0.1, y: 40 });
  useScrollReveal(formRef, { delay: 0.2, y: 40 });

  const copyEmail = () => {
    navigator.clipboard.writeText(social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() && !message.trim()) {
      setValidationError("Please enter a subject or message payload.");
      return;
    }
    setValidationError(null);
    const mailtoUrl = `mailto:${social.email}?subject=${encodeURIComponent(
      subject.trim() || "Engineering Collaboration Inquiry"
    )}&body=${encodeURIComponent(message.trim())}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="w-full text-[var(--color-text)]">
      {/* ─── HERO HEADER ─── */}
      <div className="mb-6 sm:mb-8">
        {/* Baseline-aligned Stage Header */}
        <div
          ref={chipRef}
          className="flex flex-wrap items-center gap-2 mb-2 sm:mb-2.5 select-none"
          style={{ opacity: 0 }}
        >
          <span className="font-mono text-xs text-[var(--color-primary)] font-semibold tracking-wider uppercase">
            05 // RESPONSE
          </span>
          <span className="text-[rgba(255,255,255,0.2)]">·</span>
          <span className="font-mono text-[0.6875rem] sm:text-xs text-[var(--color-muted)] tracking-widest uppercase">
            ROUNDTRIP COMPLETED · DIRECT HANDSHAKE
          </span>
        </div>

        {/* Scaled Editorial Headline — Single line on desktop, wrapping cleanly on mobile */}
        <h2
          ref={headlineRef}
          className="mb-3 text-[var(--color-text)] max-w-4xl font-bold tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
            lineHeight: 1.15,
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
            Let&apos;s
          </span>{" "}
          <span
            className="word inline-block"
            style={{
              willChange: "transform, opacity",
              transformOrigin: "center bottom",
              opacity: 0,
            }}
          >
            build
          </span>{" "}
          <span
            className="word inline-block"
            style={{
              willChange: "transform, opacity",
              transformOrigin: "center bottom",
              opacity: 0,
            }}
          >
            something
          </span>{" "}
          <span
            className="word inline-block text-gradient"
            style={{
              willChange: "transform, opacity",
              transformOrigin: "center bottom",
              opacity: 0,
            }}
          >
            useful.
          </span>
        </h2>

        {/* Intro Paragraph with Architecture Pipeline Motif */}
        <p className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed max-w-[65ch]">
          The request packet has completed its journey through the system:{" "}
          <span className="font-mono text-xs text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded border border-[var(--color-primary)]/20 whitespace-nowrap font-medium inline-block my-0.5">
            CLIENT → API → IDENTITY → DATA → RESPONSE
          </span>
          . If you have distributed systems to architect, API infrastructure to
          scale, or a mission-critical backend role, let&apos;s connect.
        </p>
      </div>

      {/* ─── BALANCED TWO-COLUMN CONTACT LAYOUT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Direct Endpoints & Network Profiles */}
        <div
          ref={leftRef}
          className="lg:col-span-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 sm:p-6 lg:p-7 flex flex-col gap-4 sm:gap-5"
          style={{ opacity: 0 }}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[rgba(255,255,255,0.06)]">
            <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-wider font-semibold">
              {"// DIRECT CHANNELS"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[0.6875rem] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AVAILABLE FOR HIRE
            </span>
          </div>

          {/* Primary Email Card */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[var(--color-bg)]/80 border border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <span className="text-[0.6875rem] font-mono text-[var(--color-muted-dim)] uppercase tracking-wider block mb-0.5">
                PRIMARY EMAIL
              </span>
              <a
                href={`mailto:${social.email}`}
                className="text-sm sm:text-base font-mono text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors select-all font-medium break-all block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] rounded"
              >
                {social.email}
              </a>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              data-magnetic
              className={`min-h-[34px] px-3.5 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition-all shrink-0 w-fit flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                copied
                  ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-400 font-bold"
                  : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text-secondary)] hover:text-white"
              }`}
              aria-label="Copy email address"
            >
              {copied ? "✓ COPIED" : "COPY EMAIL"}
            </button>
          </div>

          {/* Key Action Rows: CV Download & Cal.com Booking */}
          <div className="space-y-2">
            {/* CV Download Link */}
            <a
              href={getAssetPath(social.cvDownloadUrl)}
              download="MD.Shakir-Ahmed.pdf"
              data-magnetic
              className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-bg)]/50 border border-[rgba(255,255,255,0.06)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-bg)] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-xs font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors block truncate">
                    Download Curriculum Vitae
                  </span>
                  <span className="font-mono text-[0.6875rem] text-[var(--color-muted-dim)] block">
                    Verified PDF · Technical Dossier
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-[var(--color-primary)] group-hover:translate-y-0.5 transition-transform shrink-0 ml-2">
                ↓ PDF
              </span>
            </a>

            {/* Cal.com Booking Link */}
            <a
              href="https://cal.com/shakir-ahmed"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-bg)]/50 border border-[rgba(255,255,255,0.06)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-bg)] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-xs font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors block truncate">
                    Schedule Technical Screen
                  </span>
                  <span className="font-mono text-[0.6875rem] text-[var(--color-muted-dim)] block">
                    Cal.com · 30-min Technical Sync
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-[var(--color-primary)] group-hover:translate-x-0.5 transition-transform shrink-0 ml-2">
                CAL.COM ↗
              </span>
            </a>
          </div>

          {/* Network Profiles (GitHub, LinkedIn, WhatsApp) — Close to action rows, zero dead vertical space */}
          <div className="pt-3.5 border-t border-[rgba(255,255,255,0.06)]">
            <span className="text-[0.6875rem] font-mono text-[var(--color-muted-dim)] uppercase tracking-wider block mb-2">
              NETWORK PROFILES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
              {[
                {
                  name: "GitHub",
                  href: social.github,
                  icon: (
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  href: social.linkedin,
                  icon: (
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.59 1.59 0 0 0 1.58-1.59c0-.88-.71-1.59-1.58-1.59a1.59 1.59 0 0 0-1.59 1.59c0 .88.71 1.59 1.59 1.59M7.85 18.5V10.13H5.06V18.5h2.79z" />
                    </svg>
                  ),
                },
                {
                  name: "WhatsApp",
                  href: social.whatsapp,
                  icon: (
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.33C9.33 7.33 9.07 7.4 8.87 7.62C8.65 7.85 8.04 8.42 8.04 9.58C8.04 10.74 8.89 11.85 9.01 12.01C9.13 12.18 10.66 14.54 13.04 15.56C15.01 16.41 15.42 16.24 15.86 16.2C16.48 16.14 17.26 15.71 17.43 15.24C17.6 14.77 17.6 14.37 17.55 14.28C17.5 14.2 17.34 14.14 17.06 14C16.78 13.86 15.44 13.2 15.19 13.11C14.94 13.02 14.76 12.97 14.58 13.25C14.4 13.53 13.88 14.14 13.72 14.32C13.56 14.5 13.4 14.53 13.12 14.39C12.84 14.25 11.94 13.95 10.87 13C10.04 12.26 9.48 11.35 9.32 11.07C9.16 10.79 9.3 10.64 9.44 10.5C9.57 10.37 9.73 10.16 9.87 10C10.01 9.84 10.06 9.73 10.15 9.55C10.24 9.37 10.19 9.21 10.12 9.07C10.05 8.93 9.53 7.65 9.31 7.13C9.1 6.62 8.89 6.69 8.73 6.68C8.58 6.67 8.41 6.67 8.24 6.67" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[var(--color-bg)]/60 border border-[rgba(255,255,255,0.06)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[0.625rem] text-[var(--color-muted-dim)] group-hover:text-[var(--color-primary)]">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Transmission Form */}
        <div
          ref={formRef}
          className="lg:col-span-7 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 sm:p-6 lg:p-7 flex flex-col gap-4"
          style={{ opacity: 0 }}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[rgba(255,255,255,0.06)]">
            <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-wider font-semibold">
              {"// DISPATCH MESSAGE"}
            </span>
            <span className="font-mono text-[0.6875rem] text-[var(--color-muted-dim)]">
              MAIL PROTOCOL
            </span>
          </div>

          <form onSubmit={handleSendEmail} className="space-y-3.5">
            {/* Subject Field */}
            <div>
              <label
                htmlFor="inquiry-subject"
                className="block text-xs font-mono mb-1.5 uppercase tracking-wider text-[var(--color-muted)] font-medium"
              >
                Subject / Scope
              </label>
              <input
                id="inquiry-subject"
                type="text"
                required
                aria-required="true"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="e.g. Distributed Systems Architecture / Backend Role"
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[var(--color-bg)]/80 border border-[rgba(255,255,255,0.1)] text-sm text-[var(--color-text)] placeholder-[var(--color-muted-dim)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none font-mono transition-colors"
              />
            </div>

            {/* Message Payload Field */}
            <div>
              <label
                htmlFor="inquiry-message"
                className="block text-xs font-mono mb-1.5 uppercase tracking-wider text-[var(--color-muted)] font-medium"
              >
                Message Payload
              </label>
              <textarea
                id="inquiry-message"
                rows={4}
                required
                aria-required="true"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="Describe project requirements, tech stack, or engineering inquiry..."
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[var(--color-bg)]/80 border border-[rgba(255,255,255,0.1)] text-sm text-[var(--color-text)] placeholder-[var(--color-muted-dim)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none font-mono resize-none transition-colors"
              />
            </div>

            {/* Validation Error Feedback */}
            {validationError && (
              <p role="alert" className="font-mono text-xs text-rose-400">
                {validationError}
              </p>
            )}

            {/* Submit Action */}
            <div className="pt-1">
              <button
                type="submit"
                data-magnetic
                className="w-full sm:w-auto px-5.5 py-3 rounded-xl bg-[var(--color-primary)] text-slate-950 hover:bg-[#7dd3fc] text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] active:scale-[0.98]"
              >
                <span>[ DISPATCH VIA MAIL CLIENT ↗ ]</span>
              </button>
              <p className="font-mono text-[0.6875rem] text-[var(--color-muted)] mt-2 leading-normal">
                Triggers your default mail client with pre-filled subject and payload.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
