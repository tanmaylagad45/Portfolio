import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Send, MapPin, Sparkles } from 'lucide-react';
import { playCyberBeep, playSuccessChime } from '../utils/audio';
import { LinkedinIcon, GithubIcon, InstagramIcon } from './SocialIcons';

export const ContactTerminal: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'SYSTEM: Ready to receive direct transmissions.',
    'STATUS: Connected via secure queue.',
  ]);
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsTransmitting(true);
    playCyberBeep(750, 0.05, 'triangle');

    setTimeout(() => {
      setIsTransmitting(false);
      playSuccessChime();
      setTerminalHistory((prev) => [
        ...prev,
        `> Transmitted message from "${formData.name}" <${formData.email}>`,
        `> 200 OK: Message received and logged. Thank you! I will reply shortly.`,
      ]);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#111827] text-white border-t border-slate-800 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-mono-tech text-emerald-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>08 // GET IN TOUCH</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            LET'S <span className="text-emerald-400">CONNECT</span>
          </h2>
          <div className="h-1 w-16 bg-emerald-500 mt-3 rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
            "I'm documenting my journey through AI/ML, development, projects and hackathons. Let's build something impactful together."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Modern SaaS Contact Interface */}
          <div className="lg:col-span-7 bg-[#1F2937] rounded-2xl border border-slate-700/80 overflow-hidden shadow-xl">
            {/* Window Bar */}
            <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <span className="text-xs font-mono-tech text-slate-400 ml-2">
                  dispatch_message.sh
                </span>
              </div>
              <div className="text-[11px] font-mono-tech text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>ACTIVE</span>
              </div>
            </div>

            {/* Form & Terminal Output */}
            <div className="p-6 sm:p-7">
              {/* Form Input Fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-1.5 text-xs font-medium">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Smith"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5 text-xs font-medium">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5 text-xs font-medium">
                    MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share project opportunities, internships, or say hello..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isTransmitting}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  <Send className={`w-3.5 h-3.5 ${isTransmitting ? 'animate-pulse' : ''}`} />
                  <span>
                    {isTransmitting ? 'SENDING TRANSMISSION...' : 'SEND MESSAGE'}
                  </span>
                </button>
              </form>

              {/* Terminal Logs Output */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono-tech text-slate-400 space-y-1">
                {terminalHistory.map((line, idx) => (
                  <div
                    key={idx}
                    className={line.includes('200 OK') ? 'text-emerald-400 font-semibold' : ''}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Network Links & Geo Location Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct LinkedIn Card */}
            <div className="bg-[#1F2937] p-6 rounded-2xl border border-slate-700/80 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono-tech text-emerald-400 uppercase tracking-wider font-semibold block">
                    PROFESSIONAL PROFILE
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Connect on LinkedIn
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                "I'm documenting my journey through AI/ML, development, projects and hackathons. Let's expand our engineering network."
              </p>

              <a
                href={PORTFOLIO_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playCyberBeep(700, 0.04, 'triangle')}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>OPEN LINKEDIN PROFILE</span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            </div>

            {/* Public Verified Location Card */}
            <div className="bg-[#1F2937] p-6 rounded-2xl border border-slate-700/80 space-y-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono-tech text-slate-400 uppercase tracking-wider block">
                    LOCATION &amp; BASE
                  </span>
                  <h4 className="font-heading font-bold text-base text-white">
                    Kharghar, Navi Mumbai
                  </h4>
                  <p className="text-xs text-slate-300">
                    Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Near MGM College of Eng.</span>
                <span className="text-emerald-400 font-mono-tech">19.0473° N, 73.0699° E</span>
              </div>
            </div>

            {/* Public Social Links Bar */}
            <div className="bg-[#1F2937] p-4 rounded-2xl border border-slate-700/80 flex items-center justify-between shadow-md">
              <span className="text-xs font-mono-tech text-slate-400 uppercase font-semibold">
                SOCIAL UPLINKS:
              </span>

              <div className="flex items-center gap-2.5">
                <a
                  href={PORTFOLIO_DATA.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href={PORTFOLIO_DATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 transition-all cursor-pointer"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href={PORTFOLIO_DATA.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-pink-400 hover:border-slate-700 transition-all cursor-pointer"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
