import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Cpu, Award, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { playCyberBeep } from '../utils/audio';

export const About: React.FC = () => {
  const statIcons = [GraduationCap, Calendar, Award, Cpu];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono-tech text-slate-600 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>01 // PROFILE &amp; BACKGROUND</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            ABOUT <span className="text-emerald-700">ME</span>
          </h2>
          <div className="h-1 w-16 bg-emerald-600 mt-3 rounded-full" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Bio Card in Clean Editorial Style */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#F8FAFC] p-7 sm:p-9 rounded-2xl border border-slate-200/90 shadow-xs relative">
            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p className="font-medium text-slate-900">
                I'm <span className="text-slate-900 font-bold">{PORTFOLIO_DATA.personal.name}</span>, a third-year Computer Engineering student at <span className="text-slate-900 font-semibold">{PORTFOLIO_DATA.personal.college}</span>, currently building my skills in Artificial Intelligence and Machine Learning.
              </p>

              <p>
                My interests include <strong className="text-slate-900 font-semibold">AI/ML</strong>, <strong className="text-slate-900 font-semibold">Generative AI</strong>, full-stack development, relational databases and modern interactive software development.
              </p>

              <p>
                I enjoy learning by building practical, real-world projects and experimenting with cutting-edge tools.
              </p>

              <div className="border-l-2 border-emerald-600 pl-4 py-2 text-slate-800 bg-white/80 rounded-r-lg border-y border-r border-slate-200/60 shadow-2xs font-normal">
                My current goal is to develop strong real-world AI/ML skills and build meaningful systems that combine intelligent algorithms with reliable software engineering.
              </div>
            </div>

            {/* Core Domain Chips */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <span className="text-xs font-mono-tech text-slate-500 uppercase tracking-wider block mb-3 font-semibold">
                CORE TECHNICAL FOCUS:
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
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-800 shadow-2xs transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Editorial Stats Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PORTFOLIO_DATA.personal.stats.map((stat, idx) => {
              const IconComp = statIcons[idx % statIcons.length];
              const isHackathon = stat.value.includes('3rd Place');

              return (
                <div
                  key={idx}
                  onMouseEnter={() => playCyberBeep(700 + idx * 50, 0.03, 'sine')}
                  className={`p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between group hover:-translate-y-0.5 bg-white shadow-xs ${
                    isHackathon
                      ? 'border-amber-300/80 bg-gradient-to-br from-amber-50/40 to-white'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-lg ${isHackathon ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono-tech uppercase text-slate-400 font-semibold">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <div className={`font-heading font-extrabold text-2xl sm:text-3xl tracking-tight mb-1 ${
                      isHackathon ? 'text-amber-900' : 'text-slate-900'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-slate-800 mb-0.5">
                      {stat.detail}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quick Location Verified Badge Span */}
            <div className="sm:col-span-2 p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono-tech text-slate-500 uppercase">CURRENT BASE</div>
                  <div className="text-sm font-semibold text-slate-900">Kharghar, Navi Mumbai, Maharashtra, India</div>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono-tech bg-slate-100 text-slate-600 border border-slate-200">
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
