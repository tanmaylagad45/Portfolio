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
  Maximize2
} from 'lucide-react';
import { playCyberBeep } from '../utils/audio';
import { GithubIcon } from './SocialIcons';

export const Projects: React.FC = () => {
  const [isNexusModalOpen, setIsNexusModalOpen] = useState(false);

  const nexus = PORTFOLIO_DATA.featuredProjects[0];
  const velocity = PORTFOLIO_DATA.featuredProjects[1];

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono-tech text-emerald-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>04 // FEATURED WORKS &amp; LABS</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
            FEATURED <span className="text-emerald-400 glow-text-green">PROJECTS</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 mt-2 rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl">
            Practical systems exploring artificial intelligence, graph relational modeling, and interactive web architecture.
          </p>
        </div>

        {/* Flagship Project 1: NEXUS */}
        <div
          className="relative glass-panel rounded-3xl border border-emerald-500/40 p-6 sm:p-10 mb-12 overflow-hidden group hover:border-emerald-400/80 hover:shadow-[0_0_40px_rgba(0,255,136,0.18)] transition-all duration-500"
        >
          {/* Top highlight ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono-tech font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-300 text-xs font-mono-tech hover:bg-emerald-500/20 transition-all cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>EXPAND CASE STUDY</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Description & Metadata */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h3 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                  {nexus.title}
                </h3>
                <p className="text-sm sm:text-base font-mono-tech text-cyan-400 font-semibold mt-1">
                  {nexus.subtitle}
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                "{nexus.description}"
              </p>

              <blockquote className="text-xs font-mono-tech text-amber-300/90 border-l-2 border-amber-400/60 pl-3 py-1 bg-amber-950/20">
                "{nexus.achievement?.note}"
              </blockquote>

              {/* Involvement Tags */}
              <div>
                <span className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider block mb-2">
                  MY INVOLVEMENT:
                </span>
                <div className="flex flex-wrap gap-2">
                  {nexus.involvement.map((inv, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md text-xs font-mono-tech bg-slate-900/90 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5"
                    >
                      <Cpu className="w-3 h-3 text-emerald-400" />
                      <span>{inv}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-2">
                <span className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider block mb-2">
                  TECHNOLOGIES:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {nexus.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded text-xs font-mono-tech bg-slate-950 border border-slate-800 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-4">
                <button
                  onClick={() => {
                    playCyberBeep(900, 0.05, 'triangle');
                    setIsNexusModalOpen(true);
                  }}
                  className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono-tech font-bold text-xs tracking-wider flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,136,0.4)] cursor-pointer"
                >
                  <span>VIEW FULL ARCHITECTURE &amp; DEMO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Interactive miniature hypergraph preview */}
            <div className="lg:col-span-6 rounded-2xl border border-emerald-500/30 bg-[#060a14] overflow-hidden p-2 relative shadow-inner">
              <div className="absolute top-3 left-4 z-10 flex items-center gap-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono-tech text-emerald-400 uppercase tracking-wider">
                  MINIATURE NETWORK GRAPH // HOVER ENTITIES
                </span>
              </div>
              <NexusNetworkCanvas interactive={true} className="w-full h-80" />
            </div>
          </div>
        </div>

        {/* Project 2: Velocity Sports Shop */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 mb-16 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Preview / Cyber card mockup */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-6 flex flex-col justify-between h-72">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-400">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-xs font-mono-tech font-bold uppercase">
                    E-COMMERCE INTERACTION
                  </span>
                </div>
                <span className="text-[10px] font-mono-tech text-slate-500">v1.0.0</span>
              </div>

              <div className="space-y-2 py-4">
                <div className="text-xl font-heading font-black text-white">
                  VELOCITY SPORTS
                </div>
                <div className="text-xs font-mono-tech text-slate-400">
                  Interactive Sports Equipment Showcase with Real-Time Cart, Filter Categories &amp; Dynamic Checkout.
                </div>
                <div className="flex gap-2 pt-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400/40" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/40" />
                  <span className="w-3 h-3 rounded-full bg-purple-400/40" />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono-tech text-slate-400 border-t border-slate-800/80 pt-3">
                <span>RESPONSIVE DOM</span>
                <span className="text-emerald-400">INTERACTIVE READY</span>
              </div>
            </div>

            {/* Description & Buttons */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono-tech">
                <span>DYNAMIC WEB INTERACTION</span>
              </div>

              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                {velocity.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                "{velocity.description}"
              </p>

              {/* Features List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2">
                {velocity.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono-tech text-slate-300 flex items-center gap-1.5"
                  >
                    <span className="text-cyan-400">•</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-mono-tech text-slate-400">TECH:</span>
                {velocity.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded text-xs font-mono-tech bg-slate-900 border border-slate-800 text-slate-300"
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
                  className="px-5 py-2.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono-tech font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>VIEW PROJECT</span>
                </a>

                <a
                  href={PORTFOLIO_DATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playCyberBeep(700, 0.03, 'sine')}
                  className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono-tech font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>VIEW CODE</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Future Projects: Coming Soon Slots */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="font-heading font-bold text-xl text-white">
              FUTURE HORIZONS // IN RESEARCH &amp; PROTOTYPING
            </h3>
            <span className="text-xs font-mono-tech text-slate-500 hidden sm:inline">
              (Upcoming AI/ML projects)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.futureProjects.map((fProj, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-dashed border-slate-700/80 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle blueprint grid overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono-tech font-bold bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                      COMING SOON
                    </span>
                    <span className="text-[10px] font-mono-tech text-slate-500">
                      PROTOTYPE // 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-lg text-white group-hover:text-cyan-300 transition-colors mb-1">
                    {fProj.title}
                  </h4>
                  <div className="text-xs font-mono-tech text-emerald-400 mb-3">
                    {fProj.category}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                    {fProj.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono-tech text-slate-400 block mb-1.5">
                    PLANNED STACK:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {fProj.plannedStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-slate-900 border border-slate-800 text-slate-400"
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
