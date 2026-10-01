import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, School, BookOpen, CheckCircle } from 'lucide-react';
import { playCyberBeep } from '../utils/audio';

export const Education: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return School;
      case 1:
        return BookOpen;
      default:
        return GraduationCap;
    }
  };

  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono-tech text-cyan-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>02 // ACADEMIC CHRONOLOGY</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
            EDUCATION <span className="text-cyan-400 glow-text-cyan">TIMELINE</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-emerald-400 mt-2 rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl">
            Verified academic milestones spanning high school, higher secondary, and ongoing Computer Engineering degree.
          </p>
        </div>

        {/* Vertical Glowing Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12">
          {/* Glowing vertical spine overlay */}
          <div className="absolute top-0 bottom-0 -left-[2px] w-[2px] bg-gradient-to-b from-cyan-400 via-emerald-400 to-slate-800 pointer-events-none" />

          {PORTFOLIO_DATA.education.map((item, idx) => {
            const Icon = getIcon(idx);
            const isHovered = hoveredIndex === idx;
            const isCurrent = idx === 2; // MGM College of Engineering

            return (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  playCyberBeep(650 + idx * 60, 0.03, 'sine');
                }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glowing Node on Timeline Spine */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-6 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                    isCurrent
                      ? 'bg-slate-950 border-2 border-emerald-400 shadow-[0_0_20px_rgba(0,255,136,0.8)]'
                      : isHovered
                      ? 'bg-slate-900 border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.6)] scale-110'
                      : 'bg-slate-950 border border-slate-700 text-slate-400 group-hover:border-slate-500'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isCurrent
                        ? 'text-emerald-400'
                        : isHovered
                        ? 'text-cyan-400'
                        : 'text-slate-400'
                    }`}
                  />
                  {isCurrent && (
                    <span className="absolute -inset-1 rounded-full border border-emerald-400/40 animate-ping" />
                  )}
                </div>

                {/* Timeline Card */}
                <div
                  className={`glass-panel p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                    isCurrent
                      ? 'border-emerald-500/40 bg-gradient-to-r from-emerald-950/20 via-slate-900/60 to-slate-900/40 shadow-[0_0_25px_rgba(0,255,136,0.1)]'
                      : isHovered
                      ? 'border-cyan-500/40 bg-slate-900/70 shadow-[0_0_20px_rgba(0,240,255,0.12)]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Top Bar with Year badge & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-md text-xs font-mono-tech font-bold bg-slate-900 border border-slate-700 text-cyan-300">
                        {item.year}
                      </span>
                      {isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                          CURRENTLY ENROLLED
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono-tech text-slate-400">
                      {item.status}
                    </span>
                  </div>

                  {/* Level & Institution Name */}
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight mb-1 group-hover:text-emerald-300 transition-colors">
                    {item.institution}
                  </h3>
                  <div className="text-sm font-mono-tech font-medium text-cyan-400 mb-4">
                    {item.level}
                  </div>

                  {/* Additional details */}
                  <div className="space-y-2 border-t border-slate-800/80 pt-4">
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-1 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer metadata chip */}
                  {item.expectedGrad && (
                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono-tech">
                      <span className="text-slate-400">Projected Degree Completion:</span>
                      <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                        CLASS OF {item.expectedGrad}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
