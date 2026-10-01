import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, FileText, Terminal } from 'lucide-react';
import { toggleAudio, playCyberBeep } from '../utils/audio';

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'ACHIEVEMENTS', href: '#achievements' },
  { label: 'JOURNEY', href: '#journey' },
  { label: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleAudio();
    setSoundActive(newState);
  };

  const handleNavClick = (href: string) => {
    playCyberBeep(620, 0.04, 'sine');
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070d]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Monogram */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-9 h-9 rounded-lg bg-slate-900 border border-emerald-500/40 flex items-center justify-center font-mono-tech font-bold text-emerald-400 group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(0,255,136,0.4)] transition-all">
            <span className="text-xs">TL</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm tracking-wider text-slate-100 group-hover:text-emerald-400 transition-colors">
              TANMAY LAGAD
            </span>
            <span className="font-mono-tech text-[10px] text-slate-400 tracking-tight flex items-center gap-1">
              <Terminal className="w-2.5 h-2.5 text-cyan-400" />
              CE // AI &amp; ML
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono-tech tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_12px_rgba(0,255,136,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Sound Toggle + Resume CTA + Mobile Menu Button */}
        <div className="flex items-center gap-2.5">
          {/* Audio toggle button */}
          <button
            onClick={handleSoundToggle}
            title={soundActive ? 'Mute Cyber Audio' : 'Enable Cyber Audio'}
            className="p-2 rounded-lg bg-slate-900/70 border border-slate-700/60 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer"
            aria-label="Toggle Sound Effects"
          >
            {soundActive ? (
              <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Download Resume Button */}
          <button
            onClick={() => {
              playCyberBeep(880, 0.05, 'sine');
              onOpenResume();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono-tech hover:from-emerald-500/30 hover:to-cyan-500/30 hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => {
              playCyberBeep(520, 0.03, 'sine');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="xl:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-emerald-400"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed top-[60px] left-0 right-0 bg-[#070b14]/95 border-b border-emerald-500/20 backdrop-blur-2xl px-6 py-6 transition-all duration-300 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 mb-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left px-3 py-2.5 rounded-lg text-xs font-mono-tech tracking-wider transition-colors ${
                    isActive
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono-tech font-semibold"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD RESUME</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
