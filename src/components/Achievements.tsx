import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Sparkles, ShieldCheck, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime } from '../utils/audio';

export const Achievements: React.FC = () => {
  const triggerConfetti = () => {
    playSuccessChime();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00FF88', '#00F0FF', '#F59E0B', '#FFFFFF'],
    });
  };

  return (
    <section id="achievements" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono-tech text-amber-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>05 // RECOGNITIONS &amp; CERTIFICATIONS</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
            ACHIEVEMENTS &amp; <span className="text-amber-400 glow-text-cyan">CREDENTIALS</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-emerald-400 mt-2 rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl">
            Competitive hackathon victories, verified coursework, and foundational AI credentials.
          </p>
        </div>

        {/* Visual Milestone Progression Sequence */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 relative overflow-hidden">
          <div className="text-xs font-mono-tech text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>TRAJECTORY MILESTONE FLOW</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Step 1: FIRST HACKATHON */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-mono-tech font-bold">
                01
              </div>
              <div>
                <div className="text-xs font-mono-tech text-slate-400">STAGE ONE</div>
                <div className="font-heading font-bold text-base text-white">
                  FIRST HACKATHON
                </div>
                <div className="text-[11px] font-mono-tech text-emerald-400">
                  Internal SIH 2026
                </div>
              </div>
            </div>

            {/* Step 2: FIRST PODIUM */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/50 flex items-center gap-4 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono-tech font-bold text-lg">
                🥉
              </div>
              <div>
                <div className="text-xs font-mono-tech text-amber-400">STAGE TWO</div>
                <div className="font-heading font-bold text-base text-white">
                  FIRST PODIUM
                </div>
                <div className="text-[11px] font-mono-tech text-amber-300">
                  3rd Place Finish
                </div>
              </div>
            </div>

            {/* Step 3: NEXT GOAL */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-cyan-500/30 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-mono-tech font-bold">
                03
              </div>
              <div>
                <div className="text-xs font-mono-tech text-cyan-400">CURRENT TARGET</div>
                <div className="font-heading font-bold text-base text-white">
                  BUILDING MORE
                </div>
                <div className="text-[11px] font-mono-tech text-cyan-300">
                  Scale Real-World AI Systems
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Main Achievements Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Achievement 1: 3rd Place SIH */}
          <div
            onClick={triggerConfetti}
            className="glass-panel p-8 rounded-3xl border border-amber-500/50 hover:border-amber-400 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-amber-500/20 border-b border-l border-amber-500/40 rounded-bl-xl text-xs font-mono-tech text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>CLICK FOR CELEBRATION</span>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🥉</span>
                <div>
                  <span className="text-xs font-mono-tech text-amber-400 uppercase tracking-widest font-bold block">
                    INTERNAL SMART INDIA HACKATHON 2026
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                    3rd Place Podium Finish
                  </h3>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono-tech text-emerald-300 mb-4">
                PROJECT: <span className="font-bold text-white">NEXUS</span> — Criminal Network Analysis System
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                "My first hackathon and first podium finish." Competed against top engineering teams, presenting an AI-assisted criminal entity analysis system with dynamic graph traversal and database pipelines.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono-tech">
              <span className="text-slate-400">MGM College of Engineering</span>
              <span className="text-amber-400 font-bold group-hover:scale-105 transition-transform">
                VERIFIED HACKATHON WINNER &gt;
              </span>
            </div>
          </div>

          {/* Achievement 2: Google AI Essentials */}
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-mono-tech text-cyan-400 uppercase tracking-widest font-bold block">
                    GOOGLE CERTIFICATION MILESTONE
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                    Google AI Essentials
                  </h3>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono-tech text-cyan-300 mb-4">
                DOMAIN: <span className="font-bold text-white">Artificial Intelligence &amp; Workflow Automation</span>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Demonstrated core competencies in machine learning fundamentals, Generative AI prompting strategies, ethical AI governance, and leveraging intelligent tools for accelerated software engineering.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono-tech">
              <span className="text-slate-400">ISSUED BY GOOGLE</span>
              <span className="text-emerald-400 font-bold">COMPLETED MILESTONE</span>
            </div>
          </div>
        </div>

        {/* Certifications Subsection */}
        <div>
          <h3 className="font-heading font-bold text-2xl text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>ACADEMIC &amp; PROFESSIONAL CERTIFICATIONS</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.certifications.map((cert, idx) => {
              const isCompleted = cert.status === 'Completed';

              return (
                <div
                  key={idx}
                  className={`glass-panel p-6 rounded-2xl border transition-all duration-300 ${
                    isCompleted
                      ? 'border-emerald-500/30 hover:border-emerald-400'
                      : 'border-purple-500/30 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono-tech text-slate-400">
                      ISSUER: {cert.issuer.toUpperCase()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono-tech font-bold border ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-purple-500/20 text-purple-300 border-purple-500/40 animate-pulse'
                      }`}
                    >
                      {cert.status}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-lg text-white mb-2">
                    {cert.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {cert.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
