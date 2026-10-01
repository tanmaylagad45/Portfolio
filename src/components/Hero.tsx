import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Download,
  Cpu,
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
    const typingSpeed = isDeleting ? 30 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
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
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        {/* Left Column: Hero Typography & Info */}
        <div className="lg:col-span-6 z-10 flex flex-col justify-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono-tech mb-6 w-fit backdrop-blur-md shadow-[0_0_15px_rgba(0,255,136,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="tracking-wide">AI/ML &amp; SOFTWARE ENGINEERING INGENUITY</span>
          </div>

          {/* Prominent Name */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.08] mb-3">
            <span className="block text-slate-300 text-sm sm:text-base font-mono-tech tracking-widest text-emerald-400 mb-1">
              &lt;HELLO WORLD // I AM /&gt;
            </span>
            {PORTFOLIO_DATA.personal.name}
          </h1>

          {/* Core Subtitle */}
          <h2 className="font-heading font-semibold text-lg sm:text-xl lg:text-2xl text-slate-300 tracking-wider mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 tracking-widest font-mono-tech">
              {PORTFOLIO_DATA.personal.status.toUpperCase()}
            </span>
          </h2>

          {/* Animated Role Sequence Typewriter */}
          <div className="h-9 flex items-center mb-6">
            <div className="px-3.5 py-1.5 rounded-md bg-slate-900/90 border border-slate-800 text-sm sm:text-base font-mono-tech font-bold text-emerald-300 flex items-center gap-2 shadow-inner">
              <span className="text-slate-500">&gt;</span>
              <span>{displayText}</span>
              <span className="w-2 h-4 bg-emerald-400 animate-pulse inline-block" />
            </div>
          </div>

          {/* Main Introduction */}
          <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8 border-l-2 border-emerald-500/40 pl-4 bg-gradient-to-r from-emerald-500/5 to-transparent py-1">
            "{PORTFOLIO_DATA.personal.heroIntro}"
          </p>

          {/* Buttons: Explore My Work & Download Resume */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={handleScrollToProjects}
              className="group relative px-6 py-3.5 rounded-lg bg-emerald-400 text-slate-950 font-mono-tech font-bold text-sm tracking-wider flex items-center gap-2.5 transition-all duration-300 hover:bg-emerald-300 hover:shadow-[0_0_25px_rgba(0,255,136,0.6)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => {
                playCyberBeep(880, 0.04, 'sine');
                onOpenResume();
              }}
              className="px-6 py-3.5 rounded-lg bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400/70 text-slate-200 hover:text-cyan-300 font-mono-tech font-bold text-sm tracking-wider flex items-center gap-2.5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>DOWNLOAD RESUME</span>
            </button>
          </div>

          {/* Social Links & Location Quick Indicator */}
          <div className="flex items-center gap-5 pt-4 border-t border-slate-800/80">
            <span className="text-xs font-mono-tech text-slate-400 uppercase tracking-widest">
              UPLINKS:
            </span>

            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href={PORTFOLIO_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                onClick={() => playCyberBeep(600, 0.03, 'sine')}
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all hover:-translate-y-0.5 cursor-pointer"
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
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/50 hover:shadow-[0_0_12px_rgba(0,255,136,0.3)] transition-all hover:-translate-y-0.5 cursor-pointer"
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
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-pink-400 hover:border-pink-400/50 hover:shadow-[0_0_12px_rgba(244,114,182,0.3)] transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 ml-auto text-xs font-mono-tech text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Kharghar, Navi Mumbai</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive AI/Code Core */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <ThreeHeroScene />
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer pointer-events-auto"
        onClick={() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] font-mono-tech tracking-widest uppercase">SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-emerald-400" />
      </div>
    </section>
  );
};
