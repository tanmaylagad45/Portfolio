import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Sparkles, ShieldCheck, BookOpen, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime } from '../utils/audio';

export const Achievements: React.FC = () => {
  const triggerConfetti = () => {
    playSuccessChime();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#16A34A', '#0F766E', '#F59E0B', '#334155'],
    });
  };

  return (
    <section id="achievements" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-[#0B0F17] border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            <span>05 // HONORS &amp; RECOGNITIONS</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tight">
            ACHIEVEMENTS &amp; <span className="text-emerald-700 dark:text-emerald-400">CREDENTIALS</span>
          </h2>
          <div className="h-1 w-16 bg-emerald-600 dark:bg-emerald-500 mt-3 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3 max-w-xl">
            Competitive hackathon podium finishes, verified coursework, and foundational AI credentials.
          </p>
        </div>

        {/* Milestone Flow */}
        <div className="mb-12 p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-mono-tech text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2 font-semibold">
            <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>ENGINEERING TRAJECTORY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-mono-tech font-bold text-sm shadow-2xs">
                01
              </div>
              <div>
                <div className="text-[11px] font-mono-tech text-slate-500 dark:text-slate-400 uppercase">First Hackathon</div>
                <div className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                  Internal SIH 2026
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  MGM College of Eng.
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-center gap-4 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 flex items-center justify-center font-mono-tech font-bold text-lg">
                🥉
              </div>
              <div>
                <div className="text-[11px] font-mono-tech text-amber-800 dark:text-amber-400 uppercase font-semibold">First Podium Finish</div>
                <div className="font-heading font-bold text-sm text-amber-950 dark:text-amber-200">
                  3rd Place Overall
                </div>
                <div className="text-xs text-amber-800 dark:text-amber-300">
                  With Project NEXUS
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center font-mono-tech font-bold text-sm">
                03
              </div>
              <div>
                <div className="text-[11px] font-mono-tech text-emerald-700 dark:text-emerald-400 uppercase font-semibold">Current Goal</div>
                <div className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                  Scaling Real Systems
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  AI/ML &amp; Systems Research
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Main Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-14">
          {/* Achievement 1: 3rd Place SIH */}
          <div
            onClick={triggerConfetti}
            className="bg-white dark:bg-[#111827] p-7 sm:p-8 rounded-2xl border border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer relative shadow-xs"
          >
            <div className="absolute top-4 right-4 px-3 py-1 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-full text-[11px] font-mono-tech text-amber-800 dark:text-amber-300 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Tap for Confetti</span>
            </div>

            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <span className="text-3xl">🥉</span>
                <div>
                  <span className="text-xs font-mono-tech text-amber-800 dark:text-amber-400 uppercase tracking-wider font-bold block">
                    INTERNAL SMART INDIA HACKATHON 2026
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                    3rd Place Podium Finish
                  </h3>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 mb-4">
                PROJECT: <span className="font-bold text-slate-900 dark:text-white">NEXUS</span> — AI-Powered Criminal Network Analysis System
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                "My first hackathon and first podium finish." Built NEXUS with a team of computer engineers, presenting an AI-assisted criminal entity analysis system with dynamic graph traversal and database pipelines.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium">
              <span className="text-slate-500 dark:text-slate-400">MGM College of Engineering</span>
              <span className="text-amber-800 dark:text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                Verified Hackathon Winner &gt;
              </span>
            </div>
          </div>

          {/* Achievement 2: Google AI Essentials */}
          <div className="bg-white dark:bg-[#111827] p-7 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 flex flex-col justify-between group shadow-xs">
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-mono-tech text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-bold block">
                    GOOGLE CERTIFICATION MILESTONE
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                    Google AI Essentials
                  </h3>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 mb-4">
                DOMAIN: <span className="font-bold text-slate-900 dark:text-white">Artificial Intelligence &amp; Practical Workflow Automation</span>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                Demonstrated core competencies in machine learning fundamentals, Generative AI prompting strategies, ethical AI governance, and leveraging intelligent tools for accelerated software engineering.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium">
              <span className="text-slate-500 dark:text-slate-400">Issued by Google</span>
              <span className="text-emerald-800 dark:text-emerald-400 font-semibold">Completed Milestone</span>
            </div>
          </div>
        </div>

        {/* Certifications Subsection */}
        <div>
          <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <span>ACADEMIC &amp; PROFESSIONAL CERTIFICATIONS</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.certifications.map((cert, idx) => {
              const isCompleted = cert.status === 'Completed';

              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono-tech text-slate-500 dark:text-slate-400 font-semibold">
                      ISSUER: {cert.issuer.toUpperCase()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-medium border ${
                        isCompleted
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {cert.status}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {cert.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
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
