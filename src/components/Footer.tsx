import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUp, Terminal } from 'lucide-react';
import { playCyberBeep } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playCyberBeep(850, 0.04, 'sine');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-[#03050a] text-slate-400 font-mono-tech text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Built with curiosity, code & AI + Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
          <div className="flex items-center gap-2 text-white font-medium">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Built with curiosity, code &amp; AI.</span>
          </div>
          <div>
            &copy; 2026 <span className="text-slate-200">{PORTFOLIO_DATA.personal.name}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            {PORTFOLIO_DATA.personal.location}
          </div>
        </div>

        {/* Center: Social links row */}
        <div className="flex items-center gap-4 text-xs">
          <a
            href={PORTFOLIO_DATA.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCyberBeep(600, 0.02, 'sine')}
            className="hover:text-cyan-400 transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={PORTFOLIO_DATA.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCyberBeep(650, 0.02, 'sine')}
            className="hover:text-emerald-400 transition-colors"
          >
            GitHub
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={PORTFOLIO_DATA.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCyberBeep(700, 0.02, 'sine')}
            className="hover:text-pink-400 transition-colors"
          >
            Instagram
          </a>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
