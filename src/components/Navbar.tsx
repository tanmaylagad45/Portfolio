import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, FileText } from 'lucide-react';
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
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPos = window.scrollY + 180;

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
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-xs py-3'
          : 'bg-[#F7F8FA]/80 backdrop-blur-xs py-4 border-b border-gray-200/40'
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
          <div className="relative w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono-tech font-bold text-white shadow-xs group-hover:bg-slate-800 transition-colors">
            <span className="text-xs">TL</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-600" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              TANMAY LAGAD
            </span>
            <span className="font-mono-tech text-[10px] text-slate-500 tracking-tight">
              CE • AI &amp; ML
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200/80 shadow-xs">
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
                className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'text-slate-900 bg-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
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
            title={soundActive ? 'Mute Audio Effects' : 'Enable Audio Effects'}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-xs transition-all cursor-pointer"
            aria-label="Toggle Sound Effects"
          >
            {soundActive ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
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
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer"
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
            className="xl:hidden p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed top-[61px] left-0 right-0 bg-white/95 border-b border-slate-200 backdrop-blur-xl px-6 py-6 transition-all duration-200 shadow-lg">
          <div className="grid grid-cols-2 gap-2 mb-5">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left px-3 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold shadow-xs"
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
