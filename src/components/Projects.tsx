import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { NexusNetworkCanvas } from './NexusNetworkCanvas';
import { NexusModal } from './NexusModal';
import {
  ExternalLink,
  Cpu,
  ArrowUpRight,
  Clock,
  ShoppingCart,
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import { playCyberBeep } from '../utils/audio';
import { GithubIcon } from './SocialIcons';

export const Projects: React.FC = () => {
  const [isNexusModalOpen, setIsNexusModalOpen] = useState(false);

  const nexus = PORTFOLIO_DATA.featuredProjects[0];
  const velocity = PORTFOLIO_DATA.featuredProjects[1];

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono-tech text-slate-600 mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>04 // FEATURED WORKS &amp; SYSTEMS</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            FEATURED <span className="text-emerald-700">PROJECTS</span>
          </h2>
          <div className="h-1 w-16 bg-emerald-600 mt-3 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl">
            Practical systems exploring artificial intelligence, graph relational modeling, and interactive web architecture. Built for real-world utility and verified at competitive podiums.
          </p>
        </div>

        {/* Flagship Project 1: NEXUS (Sophisticated Technology Aesthetic) */}
        <div
          className="relative bg-[#0F172A] rounded-3xl border border-slate-800 p-7 sm:p-10 mb-14 text-white shadow-lg overflow-hidden group hover:border-slate-700 transition-all duration-300"
        >
          {/* Top highlight ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <span>🥉</span>
                <span>3rd Place — Internal Smart India Hackathon 2026</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono-tech bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                FLAGSHIP AI SYSTEM
              </span>
            </div>

            <button
              onClick={() => {
                playCyberBeep(880, 0.04, 'triangle');
                setIsNexusModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Case Study</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Description & Recruiter Details */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  {nexus.title}
                </h3>
                <p className="text-sm sm:text-base text-emerald-400 font-semibold mt-1">
                  {nexus.subtitle}
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {nexus.description}
              </p>

              {/* Achievement Note */}
              <div className="text-xs text-amber-200/90 border-l-2 border-amber-400/80 pl-3 py-1.5 bg-amber-500/10 rounded-r-md">
                "{nexus.achievement?.note}"
              </div>

              {/* Key Features (Requested in prompt) */}
              <div>
                <span className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                  KEY CAPABILITIES:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Network Analysis",
                    "Entity Extraction",
                    "Anomaly Detection",
                    "Timeline Analysis",
                    "Geographic Analysis",
                    "Evidence Management",
                  ].map((feat, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* My Contribution (Crucial for recruiters) */}
              <div className="pt-1">
                <span className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                  MY CONTRIBUTION:
                </span>
                <div className="flex flex-wrap gap-2">
                  {nexus.involvement.map((inv, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md text-xs font-medium bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5"
                    >
                      <Cpu className="w-3 h-3 text-emerald-400" />
                      <span>{inv}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <span className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                  TECH STACK:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {nexus.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded text-xs font-mono-tech bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    playCyberBeep(900, 0.05, 'triangle');
                    setIsNexusModalOpen(true);
                  }}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <span>VIEW FULL ARCHITECTURE &amp; DEMO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Interactive miniature hypergraph preview */}
            <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#060a14] overflow-hidden p-2 relative shadow-inner">
              <div className="absolute top-3 left-4 z-10 flex items-center gap-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono-tech text-slate-300 uppercase tracking-wider">
                  Interactive Knowledge Graph • Click Nodes
                </span>
              </div>
              <NexusNetworkCanvas interactive={true} className="w-full h-80" theme="dark" />
            </div>
          </div>
        </div>

        {/* Project 2: Velocity Sports Shop (Premium Editorial Card) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-9 mb-16 shadow-xs hover:border-slate-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Preview Card */}
            <div className="lg:col-span-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 p-6 flex flex-col justify-between h-72">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800">
                  <ShoppingCart className="w-5 h-5 text-emerald-700" />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    E-Commerce Web Platform
                  </span>
                </div>
                <span className="text-xs font-mono-tech text-slate-400">v1.0.0</span>
              </div>

              <div className="space-y-2 py-4">
                <div className="text-2xl font-heading font-extrabold text-slate-900">
                  VELOCITY SPORTS
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Interactive sports equipment showcase with dynamic cart calculations, filter categories, quantity adjustment, and responsive checkout interface.
                </div>
                <div className="flex gap-2 pt-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="w-3 h-3 rounded-full bg-teal-500/60" />
                  <span className="w-3 h-3 rounded-full bg-slate-400/60" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500 border-t border-slate-200 pt-3">
                <span>RESPONSIVE UI</span>
                <span className="text-emerald-700 font-semibold">PRODUCTION READY</span>
              </div>
            </div>

            {/* Description & Recruiter Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
                <span>INTERACTIVE FULL-STACK WEB</span>
              </div>

              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900">
                {velocity.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {velocity.description}
              </p>

              {/* Features List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-1">
                {velocity.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 flex items-center gap-1.5"
                  >
                    <span className="text-emerald-600">•</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* My Contribution */}
              <div>
                <span className="text-xs font-mono-tech text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                  MY CONTRIBUTION:
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-slate-700">
                  {velocity.involvement.map((inv, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-medium">
                      {inv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-mono-tech text-slate-500 font-semibold">TECH STACK:</span>
                {velocity.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded text-xs font-mono-tech bg-slate-100 border border-slate-200 text-slate-800 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons: VIEW PROJECT & VIEW CODE */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={PORTFOLIO_DATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playCyberBeep(650, 0.03, 'sine')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>VIEW PROJECT</span>
                </a>

                <a
                  href={PORTFOLIO_DATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playCyberBeep(700, 0.03, 'sine')}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>VIEW CODE</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Future Projects: Planned Horizons */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-4 h-4 text-emerald-700" />
            <h3 className="font-heading font-bold text-xl text-slate-900">
              UPCOMING PROJECTS // IN PROTOTYPING
            </h3>
            <span className="text-xs text-slate-500 hidden sm:inline">
              (Upcoming AI/ML &amp; Systems Engineering)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.futureProjects.map((fProj, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-dashed border-slate-300 hover:border-emerald-500/70 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-emerald-50 border border-emerald-200 text-emerald-800">
                      Planned
                    </span>
                    <span className="text-[10px] font-mono-tech text-slate-400">
                      PROTOTYPE // 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors mb-1">
                    {fProj.title}
                  </h4>
                  <div className="text-xs font-medium text-emerald-700 mb-3">
                    {fProj.category}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {fProj.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="text-[10px] font-mono-tech text-slate-400 block mb-1.5 font-semibold">
                    PLANNED STACK:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {fProj.plannedStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-slate-100 border border-slate-200 text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEXUS Deep-Dive Modal */}
      <NexusModal
        isOpen={isNexusModalOpen}
        onClose={() => setIsNexusModalOpen(false)}
      />
    </section>
  );
};
