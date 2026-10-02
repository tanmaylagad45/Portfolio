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
    <section id="education" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-[#0B0F17] border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-200 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            <span>02 // ACADEMIC CHRONOLOGY</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tight">
            EDUCATION <span className="text-emerald-700 dark:text-emerald-400">TIMELINE</span>
          </h2>
          <div className="h-1 w-16 bg-emerald-600 dark:bg-emerald-500 mt-3 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3 max-w-xl">
            Verified academic milestones spanning high school, higher secondary, and ongoing Computer Engineering degree.
          </p>
        </div>

        {/* Thin Elegant Timeline Spine */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 space-y-10">
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
                {/* Node on Timeline Spine */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-6 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
                    isCurrent
                      ? 'bg-white dark:bg-slate-900 border-2 border-emerald-600 dark:border-emerald-500 shadow-xs'
                      : isHovered
                      ? 'bg-white dark:bg-slate-900 border-2 border-emerald-500 dark:border-emerald-400 shadow-xs scale-105'
                      : 'bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-400 group-hover:border-slate-400'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isCurrent
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : isHovered
                        ? 'text-emerald-600 dark:text-emerald-300'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  />
                </div>

                {/* Timeline Card */}
                <div
                  className={`bg-white dark:bg-[#111827] p-6 sm:p-7 rounded-2xl border transition-all duration-200 shadow-xs ${
                    isCurrent
                      ? 'border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-50/20 via-white to-white dark:from-emerald-950/20 dark:via-[#111827] dark:to-[#111827] shadow-sm'
                      : isHovered
                      ? 'border-slate-300 dark:border-slate-700 shadow-sm -translate-y-0.5'
                      : 'border-slate-200/90 dark:border-slate-800'
                  }`}
                >
                  {/* Top Bar with Year badge & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-md text-xs font-mono-tech font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                        {item.year}
                      </span>
                      {isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          Currently Enrolled
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono-tech text-slate-500 dark:text-slate-400 font-medium">
                      {item.status}
                    </span>
                  </div>

                  {/* Level & Institution Name */}
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {item.institution}
                  </h3>
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">
                    {item.level}
                  </div>

                  {/* Additional details */}
                  <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer metadata chip */}
                  {item.expectedGrad && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono-tech">
                      <span className="text-slate-500 dark:text-slate-400">Projected Degree Completion:</span>
                      <span className="text-emerald-800 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
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
