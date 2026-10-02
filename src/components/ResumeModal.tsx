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
        `ACADEMIC PROFILE:\n` +
        `• 2024-Present: MGM College of Engineering - B.Tech / BE Computer Engineering (3rd Year, Exp. 2028)\n` +
        `• 2024: Sanjivni Junior College - Higher Secondary (12th)\n` +
        `• 2022: Convent of Jesus and Mary High School - Secondary (10th)\n\n` +
        `HONORS & ACHIEVEMENTS:\n` +
        `• 3rd Place - Internal Smart India Hackathon 2026 (Project NEXUS)\n` +
        `• Google AI Essentials Certification\n\n` +
        `FEATURED PROJECTS:\n` +
        `• NEXUS: AI-Powered Criminal Network Analysis Platform\n` +
        `• Velocity Sports Shop: Dynamic E-Commerce Web Application\n\n` +
        `TECHNICAL PROFICIENCIES:\n` +
        `• Languages: Python, JavaScript, SQL, HTML5, CSS3\n` +
        `• AI/ML: Machine Learning, Generative AI, NLP, NumPy, Pandas, scikit-learn\n` +
        `• Engineering: React, Node.js, FastAPI, PostgreSQL, Git, GitHub, Docker\n`
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <h3 className="font-heading font-bold text-base text-slate-900">
              Curriculum Vitae • {PORTFOLIO_DATA.personal.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-2xs transition-colors cursor-pointer"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-2xs transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="overflow-y-auto p-8 font-sans bg-white text-slate-700 space-y-6 text-sm">
          {/* Header block */}
          <div className="border-b border-slate-200 pb-5">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            <div className="text-emerald-800 font-semibold text-xs sm:text-sm mt-1">
              {PORTFOLIO_DATA.personal.status} • {PORTFOLIO_DATA.personal.college}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                {PORTFOLIO_DATA.personal.location}
              </span>
              <span>•</span>
              <a
                href={PORTFOLIO_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-emerald-700 underline font-medium"
              >
                LinkedIn Profile
              </a>
              <span>•</span>
              <a
                href={PORTFOLIO_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-emerald-700 underline font-medium"
              >
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono-tech uppercase font-bold text-slate-900 tracking-wider mb-3">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {PORTFOLIO_DATA.education.map((edu, i) => (
                <div key={i} className="border-l-2 border-slate-200 pl-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-sm">{edu.institution}</span>
                    <span className="text-xs font-mono-tech text-emerald-800 font-semibold">{edu.year}</span>
                  </div>
                  <div className="text-xs text-slate-700">{edu.level}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{edu.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Hackathon */}
          <div>
            <h2 className="text-xs font-mono-tech uppercase font-bold text-slate-900 tracking-wider mb-3">
              HONORS &amp; AWARDS
            </h2>
            <div className="border-l-2 border-amber-400 pl-3 space-y-1">
              <div className="font-bold text-slate-900 text-sm">
                🥉 3rd Place — Internal Smart India Hackathon 2026
              </div>
              <div className="text-xs text-slate-700">
                Project NEXUS — AI-Powered Criminal Network Analysis Platform
              </div>
              <div className="text-xs text-slate-500">
                "My first hackathon and first podium finish."
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-xs font-mono-tech uppercase font-bold text-slate-900 tracking-wider mb-3">
              SELECTED PROJECTS
            </h2>
            <div className="space-y-4">
              <div>
                <div className="font-bold text-slate-900 text-sm">
                  NEXUS — AI Criminal Network Analysis Platform
                </div>
                <div className="text-xs text-emerald-800 font-semibold font-mono-tech">
                  Role: Database Design, Data Management, AI/ML Research
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Engineered entity association pipelines and relational hypergraph structures to detect criminal clusters and anomalies from scattered records.
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-900 text-sm">
                  Velocity Sports Shop — Dynamic E-Commerce Application
                </div>
                <div className="text-xs text-slate-700 font-mono-tech font-semibold">
                  Technologies: HTML5, CSS3, JavaScript
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Created an interactive sports equipment store featuring real-time shopping cart calculations, category filtering, and responsive interfaces.
                </p>
              </div>
            </div>
          </div>

          {/* Verified Technical Skills */}
          <div>
            <h2 className="text-xs font-mono-tech uppercase font-bold text-slate-900 tracking-wider mb-2">
              TECHNICAL PROFICIENCIES
            </h2>
            <div className="text-xs text-slate-700 space-y-1">
              <div><strong className="text-slate-900">Languages:</strong> Python, JavaScript, SQL, HTML5, CSS3</div>
              <div><strong className="text-slate-900">AI / Data:</strong> Machine Learning, Generative AI, NLP, NumPy, Pandas, scikit-learn, PostgreSQL</div>
              <div><strong className="text-slate-900">Frameworks &amp; Tools:</strong> React, Node.js, FastAPI, Git, GitHub, Docker</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F8FAFC] border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Official Resume Sheet // 2026</span>
          <button
            onClick={onClose}
            className="text-slate-800 font-semibold hover:underline cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
