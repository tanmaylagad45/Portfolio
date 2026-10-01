import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  GraduationCap,
  Sparkles,
  Trophy,
  Brain,
  Terminal,
  GitBranch
} from 'lucide-react';
import { playCyberBeep } from '../utils/audio';

export const Journey: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);

  const milestones = PORTFOLIO_DATA.journeyMilestones;
  const categories = ['All', 'Education', 'AI/ML', 'Hackathon', 'Milestone'];

  const filteredMilestones =
    filter === 'All'
      ? milestones
      : milestones.filter((m) => m.category === filter);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'school':
      case 'college':
      case 'graduation':
        return GraduationCap;
      case 'brain':
        return Brain;
      case 'trophy':
        return Trophy;
      case 'sparkles':
        return Sparkles;
      case 'git':
        return GitBranch;
      default:
        return Terminal;
    }
  };

  return (
    <section id="journey" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono-tech text-cyan-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>06 // TRAJECTORY &amp; EVOLUTION</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
            MY <span className="text-cyan-400 glow-text-cyan">JOURNEY</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-emerald-400 mt-2 rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl">
            A chronological timeline of milestones, hackathon breakthroughs, and engineering steps from school to graduation horizon.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playCyberBeep(600, 0.03, 'sine');
                setFilter(cat);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono-tech tracking-wider transition-all duration-200 cursor-pointer ${
                filter === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Timeline Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMilestones.map((milestone, idx) => {
            const Icon = getIcon(milestone.icon);
            const isTarget = milestone.year === '2028';
            const isPodium = milestone.title.includes('3rd Place');
            const isActive = activeMilestone === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => {
                  setActiveMilestone(idx);
                  playCyberBeep(650 + idx * 30, 0.02, 'sine');
                }}
                onMouseLeave={() => setActiveMilestone(null)}
                className={`glass-panel p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
                  isPodium
                    ? 'border-amber-500/50 bg-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                    : isTarget
                    ? 'border-emerald-500/50 bg-emerald-950/20'
                    : isActive
                    ? 'border-cyan-400/50 -translate-y-1 shadow-[0_0_20px_rgba(0,240,255,0.12)]'
                    : 'border-white/10 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded text-xs font-mono-tech font-bold bg-slate-900 border border-slate-800 text-cyan-300">
                      {milestone.year}
                    </span>
                    <span
                      className={`text-[10px] font-mono-tech px-2 py-0.5 rounded-full border ${
                        milestone.category === 'Hackathon'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : milestone.category === 'AI/ML'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {milestone.category}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 my-2">
                    <div
                      className={`p-2 rounded-lg mt-0.5 ${
                        isPodium
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-slate-900 text-cyan-400 border border-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                        {milestone.title}
                      </h4>
                      <p className="text-xs font-mono-tech text-slate-300 mt-1">
                        {milestone.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono-tech text-slate-500">
                  <span>STEP 0{idx + 1}</span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">
                    {isTarget ? 'HORIZON TARGET ★' : 'LOGGED ✓'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
