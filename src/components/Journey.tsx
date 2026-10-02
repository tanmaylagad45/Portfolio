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
    <section id="journey" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono-tech text-slate-600 mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>06 // TRAJECTORY &amp; EVOLUTION</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            MY <span className="text-emerald-700">JOURNEY</span>
          </h2>
          <div className="h-1 w-16 bg-emerald-600 mt-3 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl">
            A chronological timeline of milestones, hackathon breakthroughs, and engineering steps from school to graduation horizon.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playCyberBeep(600, 0.03, 'sine');
                setFilter(cat);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                filter === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 border border-slate-200/80 hover:text-slate-900'
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
                className={`bg-white p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between group shadow-xs ${
                  isPodium
                    ? 'border-amber-300 bg-amber-50/20'
                    : isTarget
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : isActive
                    ? 'border-slate-300 shadow-sm -translate-y-0.5'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded text-xs font-mono-tech font-bold bg-slate-100 border border-slate-200 text-slate-800">
                      {milestone.year}
                    </span>
                    <span
                      className={`text-[10px] font-mono-tech px-2 py-0.5 rounded-full border ${
                        milestone.category === 'Hackathon'
                          ? 'bg-amber-50 text-amber-800 border-amber-200 font-semibold'
                          : milestone.category === 'AI/ML'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {milestone.category}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 my-2">
                    <div
                      className={`p-2 rounded-lg mt-0.5 ${
                        isPodium
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {milestone.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
                  <span>STEP 0{idx + 1}</span>
                  <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform">
                    {isTarget ? 'TARGET ★' : 'LOGGED ✓'}
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
