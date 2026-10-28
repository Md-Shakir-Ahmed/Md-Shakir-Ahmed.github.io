"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getAssetPath } from "@/lib/assets";
import type { Project } from "@/data/portfolio";

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectCaseStudyModal({
  project,
  onClose,
}: ProjectCaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  // When a project is opened, record to localStorage for the "Remembers You" feature!
  useEffect(() => {
    if (project) {
      try {
        localStorage.setItem("shuv0_last_viewed_project", project.shortName);
        localStorage.setItem("shuv0_last_viewed_time", Date.now().toString());
      } catch (err) {
        // Graceful fallback for blocked storage
        console.warn("Storage restricted or unavailable", err);
      }
    }
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window / System Packet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative w-full max-w-3xl my-8 p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-slate-900"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between pb-4 mb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.12em",
                    color: "#059669",
                    fontWeight: 700,
                  }}
                >
                  SYSTEM_RECORD // {project.id.toUpperCase()}
                </span>

                {project.confidential && (
                  <span className="px-2 py-0.5 rounded text-[0.625rem] font-mono bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                    {project.categoryLabel}
                  </span>
                )}

                {!project.confidential && (
                  <span className="px-2 py-0.5 rounded text-[0.625rem] font-mono bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                    {project.categoryLabel}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-5">
                {project.logo && (
                  <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white p-1">
                    <Image 
                      src={getAssetPath(project.logo)} 
                      alt={`${project.shortName} Logo`} 
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                <h3
                  id="modal-title"
                  className="text-2xl sm:text-3xl text-slate-900 font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {project.name}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 transition-all cursor-pointer font-semibold"
              style={{ fontFamily: "var(--font-mono)" }}
              aria-label="Close record"
            >
              [ ESC / CLOSE ]
            </button>
          </div>

          {/* Overview summary */}
          <p className="text-slate-700 text-base mb-8 leading-relaxed">
            {project.summary}
          </p>

          {/* Case Study Sections */}
          <div className="space-y-6 text-sm">
            {/* Role */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span
                className="block text-slate-500 mb-1 font-mono text-xs uppercase font-semibold"
                style={{ letterSpacing: "0.08em" }}
              >
                01 // Role & Responsibility
              </span>
              <p className="text-slate-800 font-medium">
                {project.role}
              </p>
            </div>

            {/* Problem */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span
                className="block text-slate-500 mb-1 font-mono text-xs uppercase font-semibold"
                style={{ letterSpacing: "0.08em" }}
              >
                02 // The Problem
              </span>
              <p className="text-slate-700 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Architecture */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span
                className="block text-slate-500 mb-1 font-mono text-xs uppercase font-semibold"
                style={{ letterSpacing: "0.08em" }}
              >
                03 // System Architecture
              </span>
              <p className="text-slate-700 leading-relaxed">
                {project.architecture}
              </p>
            </div>

            {/* Technologies */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span
                className="block text-slate-500 mb-2 font-mono text-xs uppercase font-semibold"
                style={{ letterSpacing: "0.08em" }}
              >
                04 // Core Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-white border border-slate-200 text-xs text-emerald-800 font-mono font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenge & Outcome */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span
                  className="block text-slate-500 mb-1 font-mono text-xs uppercase font-semibold"
                  style={{ letterSpacing: "0.08em" }}
                >
                  05 // Engineering Challenge
                </span>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span
                  className="block text-slate-500 mb-1 font-mono text-xs uppercase font-semibold"
                  style={{ letterSpacing: "0.08em" }}
                >
                  06 // Operational Outcome
                </span>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            </div>

            {/* Verification Status Banner */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-mono text-xs text-amber-800 uppercase tracking-wider font-semibold">
                  Verification Status // Input Pending
                </span>
              </div>
              <p className="text-xs text-amber-700 font-mono">
                {project.todoNotes}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
