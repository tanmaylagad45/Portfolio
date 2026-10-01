import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { X, Download, Printer, MapPin } from 'lucide-react';
import { playCyberBeep } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    playCyberBeep(700, 0.04, 'sine');
    window.print();
  };

  const handleDownload = () => {
    playCyberBeep(880, 0.05, 'triangle');
    const element = document.createElement('a');
    const file = new Blob(
      [
        `TANMAY RAVIKIRAN LAGAD\n` +
        `Kharghar, Navi Mumbai, Maharashtra, India\n` +
        `LinkedIn: ${PORTFOLIO_DATA.socials.linkedin}\n` +
        `GitHub: ${PORTFOLIO_DATA.socials.github}\n\n` +
        `EDUCATION:\n` +
        `• 2024-Present: MGM College of Engineering - B.Tech / BE Computer Engineering (3rd Year, Exp. 2028)\n` +
        `• 2024: Sanjivni Junior College - 12th\n` +
        `• 2022: Convent of Jesus and Mary High School - 10th\n\n` +
        `HONORS & ACHIEVEMENTS:\n` +
        `• 3rd Place - Internal Smart India Hackathon 2026 (NEXUS)\n` +
        `• Google AI Essentials Certification\n\n` +
        `PROJECTS:\n` +
        `• NEXUS: AI-Powered Criminal Network Analysis System\n` +
        `• Velocity Sports Shop: Dynamic E-Commerce Web Application\n`
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = 'Tanmay_Lagad_Resume_Summary.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-xl">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,255,136,0.2)] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="font-heading font-bold text-lg text-white">
              CURRICULUM VITAE // TANMAY RAVIKIRAN LAGAD
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono-tech flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="overflow-y-auto p-8 font-sans bg-slate-950 text-slate-300 space-y-6 text-sm">
          {/* Header block */}
          <div className="border-b border-slate-800 pb-5">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            <div className="text-cyan-400 font-mono-tech text-xs sm:text-sm font-semibold mt-1">
              {PORTFOLIO_DATA.personal.status} • {PORTFOLIO_DATA.personal.college}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {PORTFOLIO_DATA.personal.location}
              </span>
              <span>•</span>
              <a
                href={PORTFOLIO_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                LinkedIn Profile
              </a>
              <span>•</span>
              <a
                href={PORTFOLIO_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono-tech uppercase font-bold text-emerald-400 tracking-wider mb-3">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {PORTFOLIO_DATA.education.map((edu, i) => (
                <div key={i} className="border-l-2 border-slate-800 pl-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-white text-sm">{edu.institution}</span>
                    <span className="text-xs font-mono-tech text-cyan-400">{edu.year}</span>
                  </div>
                  <div className="text-xs text-slate-300">{edu.level}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{edu.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Hackathon */}
          <div>
            <h2 className="text-xs font-mono-tech uppercase font-bold text-amber-400 tracking-wider mb-3">
              HONORS &amp; AWARDS
            </h2>
            <div className="border-l-2 border-amber-500/40 pl-3 space-y-1">
              <div className="font-bold text-white text-sm">
                🥉 3rd Place — Internal Smart India Hackathon 2026
              </div>
              <div className="text-xs text-slate-300">
                Project NEXUS — AI-Powered Criminal Network Analysis Platform
              </div>
              <div className="text-xs text-slate-400">
                "My first hackathon and first podium finish."
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-xs font-mono-tech uppercase font-bold text-cyan-400 tracking-wider mb-3">
              SELECTED PROJECTS
            </h2>
            <div className="space-y-4">
              <div>
                <div className="font-bold text-white text-sm">
                  NEXUS — AI Criminal Network Analysis Platform
                </div>
                <div className="text-xs text-emerald-400 font-mono-tech">
                  Role: Database Design, Data Management, AI/ML Research
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Engineered entity association pipelines and relational hypergraph structures to detect criminal clusters and anomalies from scattered records.
                </p>
              </div>

              <div>
                <div className="font-bold text-white text-sm">
                  Velocity Sports Shop — Dynamic E-Commerce Application
                </div>
                <div className="text-xs text-cyan-400 font-mono-tech">
                  Technologies: HTML5, CSS3, JavaScript
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Created an interactive sports equipment store featuring real-time shopping cart calculations, category filtering, and responsive interfaces.
                </p>
              </div>
            </div>
          </div>

          {/* Verified Technical Skills */}
          <div>
            <h2 className="text-xs font-mono-tech uppercase font-bold text-emerald-400 tracking-wider mb-2">
              TECHNICAL PROFICIENCIES
            </h2>
            <div className="text-xs text-slate-300 space-y-1">
              <div><strong className="text-white">Languages:</strong> Python, JavaScript, SQL, HTML5, CSS3</div>
              <div><strong className="text-white">AI / Data:</strong> Machine Learning, Generative AI, NLP, NumPy, Pandas, scikit-learn, PostgreSQL</div>
              <div><strong className="text-white">Frameworks &amp; Tools:</strong> React, Node.js, FastAPI, Git, GitHub, Docker</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono-tech text-slate-400">
          <span>Official Resume Sheet // Last Updated 2026</span>
          <button
            onClick={onClose}
            className="text-emerald-400 hover:underline cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
