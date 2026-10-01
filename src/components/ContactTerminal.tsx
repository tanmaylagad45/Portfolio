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
    'TANMAY_PORTFOLIO_OS v3.8.4-RELEASE (x86_64-pc-cyber)',
    'INITIALIZING SECURE SOCKET COMMUNICATION...',
    'STATUS: READY FOR INCOMING TRANSMISSIONS',
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
        `> USER_TRANSMIT [FROM: "${formData.name}" <${formData.email}>]`,
        `> PAYLOAD: "${formData.message}"`,
        `> 200 OK: PACKET RECEIVED & LOGGED TO TANMAY'S QUEUE.`,
        `> THANK YOU FOR REACHING OUT! RESPONSE WILL BE DISPATCHED PROMPTLY.`,
      ]);
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono-tech text-emerald-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>08 // TRANSMISSION & UPLINK</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
            LET'S <span className="text-emerald-400 glow-text-green">CONNECT</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 mt-2 rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl">
            "I'm documenting my journey through AI/ML, development, projects and hackathons. Let's build something impactful together."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cyber Developer Terminal */}
          <div className="lg:col-span-7 glass-panel rounded-2xl border border-emerald-500/30 overflow-hidden shadow-[0_0_35px_rgba(0,255,136,0.1)]">
            {/* Terminal Window Chrome */}
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono-tech text-slate-400 ml-2">
                  bash: tanmay@portfolio:~
                </span>
              </div>
              <div className="text-[10px] font-mono-tech text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>SSL // ACTIVE</span>
              </div>
            </div>

            {/* Terminal Screen & Form */}
            <div className="p-6 font-mono-tech text-xs bg-[#050811]/90">
              {/* Terminal Logs Output */}
              <div className="space-y-1 mb-6 text-slate-400 max-h-36 overflow-y-auto pr-1">
                {terminalHistory.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      line.includes('USER_TRANSMIT')
                        ? 'text-cyan-400 font-bold'
                        : line.includes('200 OK')
                        ? 'text-emerald-400 font-bold'
                        : 'text-slate-400'
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* Terminal Prompt Line */}
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-4 border-t border-slate-800 pt-3">
                <span className="text-cyan-400">TANMAY@PORTFOLIO:~$</span>
                <span className="text-slate-200">./send_message.sh --interactive</span>
              </div>

              <div className="text-slate-300 mb-5">
                &gt; Let's build something. Leave a transmission below:
              </div>

              {/* Form Input Fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">
                    NAME:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Turing"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-400/80 focus:ring-1 focus:ring-emerald-400/50 transition-all font-mono-tech text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">
                    EMAIL:
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono-tech text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">
                    MESSAGE:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share project ideas, internship opportunities, or say hello..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-400/80 focus:ring-1 focus:ring-emerald-400/50 transition-all font-mono-tech text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isTransmitting}
                  className="w-full py-3 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,136,0.4)] disabled:opacity-50 cursor-pointer"
                >
                  <Send className={`w-3.5 h-3.5 ${isTransmitting ? 'animate-pulse' : ''}`} />
                  <span>
                    {isTransmitting ? 'TRANSMITTING PACKET...' : '[ SEND MESSAGE ]'}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Verified Social Uplinks & Location Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct LinkedIn Networking Card */}
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/40 hover:border-cyan-400 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono-tech text-cyan-400 uppercase tracking-widest font-bold block">
                    PROFESSIONAL NETWORK
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
                className="w-full py-2.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono-tech text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>CONNECT ON LINKEDIN</span>
                <Sparkles className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Public Verified Location Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider block">
                    CURRENT LOCATION &amp; GEO BASE
                  </span>
                  <h4 className="font-heading font-bold text-base text-white">
                    Kharghar, Navi Mumbai
                  </h4>
                  <p className="text-xs font-mono-tech text-slate-300">
                    Maharashtra, India
                  </p>
                </div>
              </div>

              {/* Stylized Futuristic Mini Radar Map Graphic */}
              <div className="relative h-28 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 cyber-dots opacity-40" />
                <div className="w-16 h-16 rounded-full border border-emerald-500/30 flex items-center justify-center animate-ping" />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#00FF88]" />
                <div className="absolute bottom-2 left-3 text-[9px] font-mono-tech text-slate-400">
                  COORDINATES: 19.0473° N, 73.0699° E
                </div>
                <div className="absolute top-2 right-3 text-[9px] font-mono-tech text-emerald-400">
                  MGM COLLEGE VICINITY
                </div>
              </div>
            </div>

            {/* Public Social Links Bar */}
            <div className="glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono-tech text-slate-400 uppercase">
                PUBLIC UPLINKS:
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={PORTFOLIO_DATA.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all cursor-pointer"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href={PORTFOLIO_DATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-400/50 transition-all cursor-pointer"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href={PORTFOLIO_DATA.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-pink-400 hover:border-pink-400/50 transition-all cursor-pointer"
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
