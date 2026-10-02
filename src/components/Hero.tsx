import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Download,
  ChevronDown
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ThreeHeroScene } from './ThreeHeroScene';
import { playCyberBeep } from '../utils/audio';
import { LinkedinIcon, GithubIcon, InstagramIcon } from './SocialIcons';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = PORTFOLIO_DATA.personal.heroTitles;

  // Typewriter effect for animated titles
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  const handleScrollToProjects = () => {
    playCyberBeep(720, 0.05, 'triangle');
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#F7F8FA] dark:bg-[#0B0F17] light-dot-grid transition-colors duration-200"
    >
      {/* Subtle soft background accents */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/[0.04] dark:bg-emerald-500/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-teal-500/[0.03] dark:bg-teal-500/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Hero Typography & Recruiter-Friendly Info */}
        <div className="lg:col-span-6 z-10 flex flex-col justify-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium mb-6 w-fit shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500"></span>
            </span>
            <span className="tracking-normal font-sans">Computer Engineering Student • AI/ML &amp; Full-Stack</span>
          </div>

          {/* Prominent Name */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-3">
            {PORTFOLIO_DATA.personal.name}
          </h1>

          {/* Core Subtitle */}
          <h2 className="font-heading font-semibold text-lg sm:text-xl text-slate-700 dark:text-slate-300 tracking-normal mb-4 flex items-center gap-2">
            <span>3rd Year B.Tech / BE</span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">{PORTFOLIO_DATA.personal.college}</span>
          </h2>

          {/* Animated Role Sequence Typewriter */}
          <div className="h-9 flex items-center mb-6">
            <div className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm sm:text-base font-mono-tech font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">&gt;</span>
              <span>{displayText}</span>
              <span className="w-2 h-4 bg-emerald-600 dark:bg-emerald-400 animate-pulse inline-block" />
            </div>
          </div>

          {/* Main Introduction */}
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8 border-l-2 border-emerald-600 dark:border-emerald-500 pl-4 py-1">
            "{PORTFOLIO_DATA.personal.heroIntro}"
          </p>

          {/* Buttons: Explore My Work & Download Resume */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={handleScrollToProjects}
              className="group relative px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white font-semibold text-sm tracking-normal flex items-center gap-2.5 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => {
                playCyberBeep(880, 0.04, 'sine');
                onOpenResume();
              }}
              className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm tracking-normal flex items-center gap-2.5 transition-all duration-200 shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span>DOWNLOAD RESUME</span>
            </button>
          </div>

          {/* Social Links & Location Quick Indicator */}
          <div className="flex items-center gap-5 pt-4 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-mono-tech text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              CONNECT:
            </span>

            <div className="flex items-center gap-2.5">
              {/* LinkedIn */}
              <a
                href={PORTFOLIO_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                onClick={() => playCyberBeep(600, 0.03, 'sine')}
                className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              {/* GitHub */}
              <a
                href={PORTFOLIO_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                onClick={() => playCyberBeep(650, 0.03, 'sine')}
                className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              {/* Instagram */}
              <a
                href={PORTFOLIO_DATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram Profile"
                onClick={() => playCyberBeep(700, 0.03, 'sine')}
                className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="hidden sm:flex items-center gap-2 ml-auto text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              <span>Kharghar, Navi Mumbai</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Sleek Metallic Core */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <ThreeHeroScene />
        </div>
      </div>

      {/* Down indicator */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer pointer-events-auto"
        onClick={() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] font-mono-tech tracking-widest uppercase">SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-slate-500 dark:text-slate-400" />
      </div>
    </section>
  );
};
