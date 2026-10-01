import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Cpu, Award, Calendar, GraduationCap, Terminal, MapPin } from 'lucide-react';
import { playCyberBeep } from '../utils/audio';

export const About: React.FC = () => {
  const statIcons = [GraduationCap, Calendar, Award, Cpu];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono-tech text-emerald-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>01 // DOSSIER &amp; PROFILE</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
            ABOUT <span className="text-emerald-400 glow-text-green">ME</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 mt-2 rounded-full" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Bio Card with Cyber Panels */}
          <div className="lg:col-span-7 flex flex-col justify-between glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
            {/* Top corner accent badge */}
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-slate-900 border-b border-l border-white/10 rounded-bl-xl text-[11px] font-mono-tech text-cyan-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>SYS_IDENTITY_VERIFIED</span>
            </div>

            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed pt-4">
              <p className="font-medium text-white">
                I'm <span className="text-emerald-300 font-semibold">{PORTFOLIO_DATA.personal.name}</span>, a third-year Computer Engineering student at <span className="text-cyan-300 font-semibold">{PORTFOLIO_DATA.personal.college}</span>, currently building my skills in Artificial Intelligence and Machine Learning.
              </p>

              <p>
                My interests include <span className="text-emerald-400 font-medium">AI/ML</span>, <span className="text-emerald-400 font-medium">Generative AI</span>, full-stack development, databases and modern interactive web development.
              </p>

              <p>
                I enjoy learning by building practical projects and experimenting with new technologies.
              </p>

              <p className="border-l-2 border-cyan-400/80 pl-4 py-1 text-slate-200 bg-cyan-950/20 rounded-r-md">
                My current goal is to develop strong real-world AI/ML skills and build meaningful projects that combine intelligent systems with software development.
              </p>
            </div>

            {/* Core Domain Chips */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <span className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider block mb-3">
                CORE EXPLORATION VECTORS:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Artificial Intelligence',
                  'Machine Learning',
                  'Generative AI',
                  'Full-Stack Architecture',
                  'Relational Databases',
                  'Interactive Web Design'
                ].map((item, idx) => (
                  <span
                    key={idx}
                    onMouseEnter={() => playCyberBeep(600 + idx * 40, 0.02, 'sine')}
                    className="px-3 py-1 rounded-md text-xs font-mono-tech bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-emerald-300 hover:border-emerald-400/50 hover:bg-emerald-950/30 transition-all cursor-default"
                  >
                    #{item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Animated Stats Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PORTFOLIO_DATA.personal.stats.map((stat, idx) => {
              const IconComp = statIcons[idx % statIcons.length];
              const isHackathon = stat.value.includes('3rd Place');

              return (
                <div
                  key={idx}
                  onMouseEnter={() => playCyberBeep(700 + idx * 50, 0.03, 'sine')}
                  className={`glass-panel p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                    isHackathon
                      ? 'border-emerald-500/50 bg-emerald-950/20 shadow-[0_0_20px_rgba(0,255,136,0.15)]'
                      : 'border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-lg ${isHackathon ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono-tech uppercase text-slate-400">
                      0{idx + 1} // STAT
                    </span>
                  </div>

                  <div>
                    <div className={`font-heading font-black text-2xl sm:text-3xl tracking-tight mb-1 ${
                      isHackathon ? 'text-emerald-300' : 'text-white'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono-tech text-slate-300 font-semibold mb-1">
                      {stat.detail}
                    </div>
                    <div className="text-[11px] font-mono-tech text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quick Location Verified Badge Span */}
            <div className="sm:col-span-2 glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono-tech text-slate-400">CURRENT BASE</div>
                  <div className="text-sm font-semibold text-white">Kharghar, Navi Mumbai, Maharashtra, India</div>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  IST (UTC+5:30)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
